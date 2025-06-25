export default defineEventHandler(async (event) => {
  try {
    const { message, history = [] } = await readBody(event)
    
    if (!message?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required'
      })
    }

    // Direct API key 
    const apiKey = "AIzaSyAZCgzAyZ_x3ZkGKkHsIzWxx1JdumFo0iU"
    
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'API key not configured'
      })
    }

    // Prepare conversation history for Gemini
    const conversationHistory = history
      .filter(msg => msg.sender && msg.text)
      .slice(-10) // Keep last 10 messages for context
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))

    // Comprehensive NLGFC system prompt
    const systemPrompt = `You are an official AI assistant for the National Local Government Finance Committee (NLGFC) of Malawi. Your responses must be accurate, professional, and based on:

📜 LEGAL FOUNDATION:
- Established by Section 149 of the 1994 Constitution of Malawi
- Powers and functions conferred by the Local Government Act (1998)

🔍 CORE RESPONSIBILITIES:
1. Budgetary Oversight:
   - Receives all estimates of revenue and projected budgets from local governments
   - Prepares consolidated budgets after Treasury consultation
   - Presents budgets to National Assembly via the Minister

2. Financial Supervision:
   - Supervises and audits local government accounts
   - Conducts audits in accordance with Parliamentary Acts
   - Works with Auditor General recommendations

3. Fund Distribution:
   - Makes recommendations on fund allocation to local governments
   - Varies amounts based SOLELY on:
     • Economic variables
     • Geographic factors
     • Demographic considerations

4. Supplementary Funding:
   - Can apply to the Minister for additional funds when necessary

💼 OPERATIONAL GUIDELINES:
- Always cite constitutional/legal basis when discussing powers
- For financial figures, direct to latest annual reports
- For audit specifics, refer to Auditor General's office
- For budget details, mention consultation with Treasury
- Clarify that fund distribution is needs-based

🎯 RESPONSE PROTOCOL:
- Use formal but accessible language
- Structure responses with clear headings
- Include relevant constitutional/legal references
- For complex queries, suggest contacting NLGFC directly
- If unsure, say "According to NLGFC protocols..."
- Never speculate beyond established mandates

Current user query: "${message}"`

    // Add the new user message to conversation
    conversationHistory.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    })

    // Call Gemini API with enhanced configuration
    const response = await $fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.5, // Lower for more factual responses
          topK: 20,        // More focused responses
          topP: 0.9,
          maxOutputTokens: 600, // Slightly longer for detailed explanations
          candidateCount: 1
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }
    })

    // Process and validate response
    if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      let botMessage = response.candidates[0].content.parts[0].text
      
      // Post-processing to ensure NLGFC focus
      if (!botMessage.includes("NLGFC") && !botMessage.includes("National Local Government Finance Committee")) {
        botMessage = `Regarding your inquiry about "${message}", the National Local Government Finance Committee (NLGFC) handles this matter as follows:\n\n${botMessage}\n\n[Source: Constitution of Malawi & Local Government Act]`
      }
      
      return {
        success: true,
        message: botMessage,
        timestamp: new Date().toISOString()
      }
    } else {
      throw new Error('Invalid response from Gemini API')
    }

  } catch (error) {
    console.error('NLGFC Chat API Error:', error)
    
    // Special handling for constitutional/budget queries
    if (error.message.includes("constitution") || error.message.includes("budget")) {
      return {
        success: false,
        message: "For detailed constitutional or budgetary inquiries, please contact the NLGFC directly at [official contact information].",
        timestamp: new Date().toISOString()
      }
    }
    
    // Rate limiting
    if (error.statusCode === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: 'NLGFC assistant is currently handling many requests. Please try again shortly.'
      })
    }
    
    // Default error response
    throw createError({
      statusCode: 500,
      statusMessage: 'The NLGFC assistant is temporarily unavailable. For urgent matters, please visit our offices.'
    })
  }
})