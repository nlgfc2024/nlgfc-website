<template>
  <!-- Chatbot Root -->
  <div id="chatbot-root">
    <!-- Floating Chat Button -->
    <button @click="open = !open"
            aria-label="Toggle chat"
            class="fixed bottom-4 right-4 rounded-full shadow-lg bg-gray-800 text-white px-4 py-3 font-semibold hover:bg-gray-700 focus:outline-none">
      {{ open ? 'Close Chat' : 'Chat with NLGFC' }}
    </button>

    <!-- Chat Panel -->
    <div v-show="open" class="fixed bottom-20 right-4 w-80 max-h-[70vh] flex flex-col bg-white border border-gray-800 shadow-2xl rounded-2xl overflow-hidden">
      <!-- Header -->
      <div class="bg-gray-800 text-white p-3 text-sm font-semibold flex">
        💬 NLGFC Chat Assistant
      </div>

      <!-- Messages -->
      <div ref="chatWindow" class="chat-scroll flex-1 p-3 space-y-2 overflow-y-auto text-sm">
        <div v-for="(msg, i) in messages" :key="i" :class="msg.type === 'bot' ? 'text-left' : 'text-right'">
          <div :class="msg.type === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white'"
               class="inline-block max-w-[90%] rounded-xl px-3 py-2">
            <span v-html="msg.text"></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 flex items-center">
        <input v-model="userInput" @keyup.enter="sendMessage" 
               placeholder="Ask me anything related to NLGFC..."
               class="flex-1 p-2 text-sm outline-none" />
        <button @click="sendMessage" class="px-4 py-2 text-sm bg-gray-800 text-white hover:bg-gray-700">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// WhatsApp config
const whatsappNumber = '265996483422'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello NLGFC Team, I have an inquiry.')}`

// Knowledge base
const knowledgeBase = [
  {
    q: ['what is nlgfc', 'about nlgfc', 'nlgfc role', 'mandate'],
    a: 'NLGFC is a Government of Malawi agency responsible for intergovernmental fiscal transfers, financing District Councils, and monitoring their performance and compliance.'
  },
  {
    q: ['hi', 'hallo', 'hey', 'hello'],
    a: 'Hello! I’m the NLGFC Assistant. How may I be of help to you?'
  },
  {
    q: ['funding process', 'how funding works', 'grants', 'funding', 'allocation'],
    a: 'Funding is allocated to councils based on approved budgets, fiscal frameworks, and performance benchmarks. Disbursements are monitored to ensure compliance.'
  },
  {
    q: ['reports', 'publications', 'documents'],
    a: 'Key reports and publications are available on the Publications page. You can browse annual reports, grant guidelines, and monitoring dashboards.'
  }
]

// State
const messages = ref([
  { type: 'bot', text: "Hello! I’m the NLGFC Assistant. How can I help you today?" }
])
const userInput = ref('')
const open = ref(false)
const chatWindow = ref(null)

// Helpers
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
const findAnswer = (query) => {
  const nq = normalize(query)
  for (const item of knowledgeBase) {
    if (item.q.some(key => nq.includes(normalize(key)))) {
      return item.a
    }
  }
  return null
}

const sendMessage = async () => {
  const text = userInput.value.trim()
  if (!text) return

  messages.value.push({ type: 'user', text })
  await nextTick()
  scrollToBottom()

  const answer = findAnswer(text)
  if (answer) {
    messages.value.push({ type: 'bot', text: answer })
  } else {
    // Fallback WhatsApp contact response
    messages.value.push({
      type: 'bot',
      text: `Sorry, I don’t have an answer for that. Please contact us directly here: <a href="${whatsappLink}" target="_blank" class="text-green-500 text-lg"><i class="fab fa-whatsapp"></i> WhatsApp NLGFC</a>`
    })
  }

  userInput.value = ''
  await nextTick()
  scrollToBottom()
}

const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
}

onMounted(() => {
  open.value = true
})
</script>

<style scoped>
.chat-scroll::-webkit-scrollbar {
  width: 5px;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.chat-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
