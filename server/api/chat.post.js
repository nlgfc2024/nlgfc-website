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

    // Enhanced system prompt
    const systemPrompt = `You are an expert AI assistant for NLGFC (National Local Government Finance Committee). You provide helpful, accurate, and professional information about:

🏦 FINANCIAL SERVICES:
- Microfinance and small business loans
- Savings programs and financial planning
- Investment opportunities and guidance
- Credit facilities and loan applications

🎓 EDUCATIONAL PROGRAMS:
- Financial literacy training
- Business development workshops
- Investment education
- Community outreach programs

🏘️ COMMUNITY DEVELOPMENT:
- Local government financial support
- Rural development initiatives
- Infrastructure financing
- Public-private partnerships

📊 ORGANIZATIONAL INFO:
- NLGFC mission and vision
- Service areas and eligibility
- Application processes
- Success stories and impact

RESPONSE GUIDELINES:
- Keep responses concise but informative (150-300 words)
- Use a professional yet friendly tone
- Include relevant emojis for visual appeal
- Provide actionable advice when possible
- If you don't know specific details, guide users to official NLGFC resources
- For complex financial matters, recommend consulting with NLGFC advisors

IMPORTANT: If asked about topics outside NLGFC's scope, politely redirect to NLGFC-related services or suggest contacting the organization directly.

Current user message: ${message}`

    // Add the new user message to conversation
    conversationHistory.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    })

    // Call Gemini API
    const response = await $fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
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

    // Extract response
    if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      const botMessage = response.candidates[0].content.parts[0].text
      
      return {
        success: true,
        message: botMessage,
        timestamp: new Date().toISOString()
      }
    } else {
      throw new Error('Invalid response from Gemini API')
    }

  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Handle different error types
    if (error.statusCode === 400) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request format'
      })
    }
    
    if (error.statusCode === 401 || error.statusCode === 403) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication error'
      })
    }
    
    if (error.statusCode === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Rate limit exceeded. Please try again later.'
      })
    }
    
    // Generic error response
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to process your request at this time'
    })
  }
})