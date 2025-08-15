<template>
  <div>
    <!-- Floating Chat Button with NLGFC Branding -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="fixed right-6 bottom-6 z-50 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-400/30 group"
      aria-label="Open NLGFC Assistant"
    >
      <div class="relative">
        <Icon name="heroicons:chat-bubble-bottom-center-text" class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span 
          v-if="hasNewMessage"
          class="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-ping"
        ></span>
      </div>
    </button>

    <!-- Chat Window with NLGFC Branding -->
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-96 h-[32rem] bg-white backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transform transition-all duration-300"
      :class="{
        'scale-100 opacity-100': isOpen,
        'scale-95 opacity-0 pointer-events-none': !isOpen,
        'ring-2 ring-gray-400/50': isTyping
      }"
    >
      <!-- Header with NLGFC Branding -->
      <div class="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex justify-between items-center rounded-t-2xl">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-white" />
            </div>
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></span>
          </div>
          <div>
            <h3 class="font-bold text-lg">NLGFC Assistant</h3>
            <p class="text-gray-100 text-xs flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
              {{ isTyping ? 'Researching...' : 'Official Government Service' }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="minimizeChat"
            class="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
            aria-label="Minimize chat"
          >
            <Icon name="heroicons:minus" class="w-4 h-4" />
          </button>
          <button
            @click="toggleChat"
            class="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
            aria-label="Close chat"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white/30 custom-scrollbar"
      >
        <TransitionGroup name="message" tag="div">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-[85%] p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md relative',
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200/80 text-gray-800 rounded-bl-sm'
              ]"
            >
              <!-- Message Tail -->
              <div
                v-if="message.sender === 'user'"
                class="absolute -right-1 bottom-0 w-3 h-3 overflow-hidden"
              >
                <div class="w-3 h-3 bg-gray-800 rotate-45 transform origin-bottom-left"></div>
              </div>
              <div
                v-else
                class="absolute -left-1 bottom-0 w-3 h-3 overflow-hidden"
              >
                <div class="w-3 h-3 bg-white border-l border-b border-gray-200/80 rotate-45 transform origin-bottom-right"></div>
              </div>
              
              <p class="text-sm leading-relaxed" v-html="formatMessage(message.text)"></p>
              <div class="flex items-center justify-between mt-2 text-xs opacity-70">
                <span>{{ formatTime(message.timestamp) }}</span>
                <div v-if="message.sender === 'user'" class="flex items-center space-x-1">
                  <Icon
                    name="heroicons:check"
                    class="w-3 h-3"
                    :class="{ 'text-gray-300': !message.read, 'text-green-300': message.read }"
                  />
                </div>
                <div v-else class="text-gray-600 font-medium">
                  NLGFC Official
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white border border-gray-200/80 p-3 rounded-2xl rounded-bl-sm shadow-sm relative">
            <div class="absolute -left-1 bottom-0 w-3 h-3 overflow-hidden">
              <div class="w-3 h-3 bg-white border-l border-b border-gray-200/80 rotate-45 transform origin-bottom-right"></div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="flex space-x-1.5 px-1.5">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
              <span class="text-xs text-gray-500">Researching NLGFC policies...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area with Disclaimer -->
      <div class="p-4 bg-white/80 backdrop-blur-md border-t border-gray-200/50 rounded-b-2xl">
        <form @submit.prevent="sendMessage" class="flex items-end space-x-2">
          <div class="flex-1 relative">
            <textarea
              v-model="userInput"
              ref="messageInput"
              @keydown="handleKeydown"
              @input="adjustTextareaHeight"
              placeholder="Ask about NLGFC powers, budgets, or local government finance..."
              rows="1"
              class="w-full p-3 pr-10 border border-gray-300/80 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/30 focus:border-gray-500 transition-all duration-200 max-h-32 bg-white/90 backdrop-blur-sm custom-scrollbar"
              :disabled="isLoading"
              style="min-height: 44px;"
            ></textarea>
            <div class="absolute right-2 bottom-2 flex space-x-1">
              <button
                type="button"
                @click="showNLGFCFunctions"
                class="text-gray-600 hover:text-gray-800 transition-colors p-1.5 rounded-full hover:bg-gray-100"
                title="NLGFC Functions"
              >
                <Icon name="heroicons:information-circle" class="w-4 h-4" />
              </button>
              <button
                type="submit"
                :disabled="!userInput.trim() || isLoading"
                class="text-gray-600 hover:text-gray-800 transition-colors p-1.5 rounded-full hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Send message"
              >
                <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
        <p class="text-xs text-gray-500 mt-2">
          The NLGFC Assistant provides information based on the Constitution of Malawi and Local Government Act.
          <a :href="whatsappLink" target="_blank" class="text-gray-700 font-medium hover:underline">Contact us on WhatsApp</a> for direct assistance.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'

// WhatsApp configuration
const whatsappNumber = '265996483422' // Replace with official NLGFC number
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello NLGFC Team, I have an inquiry:')}`

// NLGFC Institutional Knowledge Base
const nlgfcKnowledge = {
  powers: [
    "Receive all estimates of revenue and all projected budgets of all local government authorities",
    "Supervise and audit accounts of local government authorities, in accordance with any Act of Parliament",
    "Make recommendations relating to the distribution of funds allocated to local government authorities",
    "Prepare a consolidated budget for all local government authorities",
    "Make application to the Minister for supplementary funds where necessary"
  ],
  establishment: "The National Local Government Finance Committee (NLGFC) was established by Section 149 of the 1994 Constitution of the Republic of Malawi",
  legalBasis: "The NLGFC assumes powers and functions as conferred by the Local Government Act (1998)",
  budgetProcess: "The NLGFC prepares consolidated budgets after consultation with the Treasury, presented to the National Assembly by the Minister responsible for Local Government",
  fundingPrinciples: "Fund distribution varies by economic, geographic and demographic variables as the sole consideration"
}

// General knowledge base for common questions
const generalKnowledge = [
  {
    q: ['what is nlgfc', 'about nlgfc', 'nlgfc role', 'mandate'],
    a: 'NLGFC is a Government of Malawi agency responsible for intergovernmental fiscal transfers, financing District Councils, and monitoring their performance and compliance.'
  },
  {
    q: ['funding process', 'how funding works', 'grants'],
    a: 'Funding is allocated to councils based on approved budgets, fiscal frameworks, and performance benchmarks. Disbursements are monitored to ensure compliance.'
  },
  {
    q: ['contact', 'phone', 'email', 'whatsapp'],
    a: `For direct assistance, you can reach us via <a href="${whatsappLink}" target="_blank" class="underline">WhatsApp</a>.`
  },
  {
    q: ['reports', 'publications', 'documents'],
    a: 'Key reports and publications are available on the Publications page. You can browse annual reports, grant guidelines, and monitoring dashboards.'
  }
]

// Reactive state
const isOpen = ref(false)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const hasNewMessage = ref(false)
const messagesContainer = ref(null)
const messageInput = ref(null)

// Initialize with NLGFC welcome message
onMounted(() => {
  messages.value.push({
    id: Date.now(),
    text: `Welcome to the <strong>NLGFC Assistant</strong>.<br><br>I can provide information about:<br>- NLGFC powers and functions<br>- Budget preparation processes<br>- Local government fund distribution<br><br>For direct assistance, <a href="${whatsappLink}" target="_blank" class="underline">contact us on WhatsApp</a>.`,
    sender: 'bot',
    timestamp: new Date(),
    read: false
  })
})

// Auto-scroll to bottom when new messages arrive
watch(messages, async () => {
  await nextTick()
  scrollToBottom()
}, { deep: true })

// Toggle chat window
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasNewMessage.value = false
    nextTick(() => {
      messageInput.value?.focus()
      scrollToBottom()
    })
  }
}

const minimizeChat = () => {
  isOpen.value = false
}

// Handle keyboard events
const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// Auto-adjust textarea height
const adjustTextareaHeight = () => {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`
  }
}

// Show NLGFC functions
const showNLGFCFunctions = () => {
  const functionList = nlgfcKnowledge.powers.map(power => `• ${power}`).join('\n')
  messages.value.push({
    id: Date.now(),
    text: `<strong>NLGFC Key Powers and Functions</strong>:<br><br>${functionList}<br><br><em>As established by ${nlgfcKnowledge.establishment} and ${nlgfcKnowledge.legalBasis}</em>`,
    sender: 'bot',
    timestamp: new Date(),
    read: false
  })
  scrollToBottom()
}

// Normalize query for matching
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()

// Process general queries
const processGeneralQuery = (query) => {
  const nq = normalize(query)
  for (const item of generalKnowledge) {
    if (item.q.some(key => nq.includes(normalize(key)))) {
      return item.a
    }
  }
  return null
}

// Process NLGFC-specific queries
const processNLGFCQuery = (query) => {
  const lowerQuery = query.toLowerCase()
  
  if (lowerQuery.includes('power') || lowerQuery.includes('function')) {
    return nlgfcKnowledge.powers
  } 
  else if (lowerQuery.includes('establish') || lowerQuery.includes('create')) {
    return nlgfcKnowledge.establishment
  }
  else if (lowerQuery.includes('legal') || lowerQuery.includes('law') || lowerQuery.includes('act')) {
    return nlgfcKnowledge.legalBasis
  }
  else if (lowerQuery.includes('budget') || lowerQuery.includes('consolidat')) {
    return `The NLGFC budget process: ${nlgfcKnowledge.budgetProcess}`
  }
  else if (lowerQuery.includes('fund') || lowerQuery.includes('distribut') || lowerQuery.includes('allocat')) {
    return `Fund distribution principles: ${nlgfcKnowledge.fundingPrinciples}`
  }
  else {
    return null
  }
}

// Send message function with NLGFC knowledge integration
const sendMessage = async () => {
  const message = userInput.value.trim()
  if (!message || isLoading.value) return

  // Add user message
  const userMessage = {
    id: Date.now(),
    text: message,
    sender: 'user',
    timestamp: new Date(),
    read: false
  }
  messages.value.push(userMessage)
  userInput.value = ''
  adjustTextareaHeight()

  // Show typing indicator
  isLoading.value = true
  isTyping.value = true

  try {
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Check if query matches general knowledge
    const generalResponse = processGeneralQuery(message)
    
    if (generalResponse) {
      messages.value.push({
        id: Date.now() + 1,
        text: generalResponse,
        sender: 'bot',
        timestamp: new Date(),
        read: false
      })
    } 
    // Check if query matches NLGFC knowledge
    else {
      const institutionalResponse = processNLGFCQuery(message)
      
      if (institutionalResponse) {
        // Format array responses
        const responseText = Array.isArray(institutionalResponse) 
          ? `<strong>NLGFC Authority</strong>:<br><br>${institutionalResponse.map(item => `• ${item}`).join('<br>')}`
          : institutionalResponse

        messages.value.push({
          id: Date.now() + 1,
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
          read: false
        })
      } else {
        // Fallback for unknown queries
        messages.value.push({
          id: Date.now() + 1,
          text: `I couldn't find specific information about that. For direct assistance, please <a href="${whatsappLink}" target="_blank" class="underline">contact us on WhatsApp</a> and our team will assist you.`,
          sender: 'bot',
          timestamp: new Date(),
          read: false
        })
      }
    }

    if (!isOpen.value) {
      hasNewMessage.value = true
    }

  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({
      id: Date.now() + 1,
      text: `I'm unable to access the NLGFC policy database at this time. For official information, please <a href="${whatsappLink}" target="_blank" class="underline">contact us on WhatsApp</a>.`,
      sender: 'bot',
      timestamp: new Date(),
      read: false
    })
  } finally {
    isLoading.value = false
    isTyping.value = false
    userMessage.read = true
  }
}

// Utility functions
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

const formatMessage = (text) => {
  // Enhanced markdown formatting for official documents
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-700">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100/80 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-gray-600 hover:underline font-medium" target="_blank">$1</a>')
    .replace(/\n/g, '<br>')
    .replace(/•/g, '•')
}
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

/* Message animations */
.message-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.message-move {
  transition: transform 0.3s ease;
}

/* Responsive design */
@media (max-width: 640px) {
  .fixed.bottom-24.right-6 {
    bottom: 1rem;
    right: 1rem;
    width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    height: 80vh;
  }
}
</style>