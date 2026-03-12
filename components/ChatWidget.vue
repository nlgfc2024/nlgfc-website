<template>
  <div>
    <!-- Floating Chat Button -->
    <button
      @click="toggleChat"
      aria-label="Toggle chat"
      class="fixed bottom-4 right-4 rounded-full shadow-lg bg-gray-900 text-white px-4 py-3 font-semibold hover:bg-emerald-700 focus:outline-none z-50"
    >
      {{ open ? 'Close Chat' : 'NLGFC Chat' }}
    </button>
    
    <!-- Chat Panel -->
    <div
      v-show="open"
      ref="chatContainer"
      class="fixed bottom-20 right-4 w-80 max-h-[70vh] flex flex-col bg-white border border-gray-800 shadow-2xl rounded-2xl overflow-hidden z-40"
    >
      <div class="bg-gray-800 text-white p-3 text-sm font-semibold">
        💬 NLGFC Chat Assistant
      </div>

      <div
        ref="chatWindow"
        class="chat-scroll flex-1 p-3 space-y-2 overflow-y-auto text-sm"
      >
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="msg.type === 'bot' ? 'text-left' : 'text-right'"
        >
          <div
            :class="msg.type === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white'"
            class="inline-block max-w-[90%] rounded-xl px-3 py-2"
          >
            <span v-html="msg.text"></span>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="text-left">
          <div
            class="bg-gray-100 text-gray-800 inline-block rounded-xl px-3 py-2 animate-pulse"
          >
            ...
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 flex items-center">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Ask me anything related to NLGFC..."
          class="flex-1 p-2 text-sm outline-none"
        />
        <button
          @click="sendMessage"
          :disabled="isLoading || !userInput.trim()"
          class="px-4 py-2 text-sm bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const whatsappNumber = '265996483422'

const knowledgeBase = [
  {
    q: ['what is nlgfc', 'about nlgfc', 'nlgfc role', 'mandate'],
    a: 'NLGFC is a Government of Malawi agency responsible for intergovernmental fiscal transfers, financing District Councils, and monitoring their performance and compliance.'
  },
  {
    q: ['hi', 'hallo', 'hey', 'hello'],
    a: 'Hello! I’m the NLGFC Assistant. How may I help you?'
  },
  {
    q: ['thank you', 'zikomo', 'okay', 'alright'],
    a: 'You are most welcome!'
  },
  {
    q: ['funding process', 'how funding works', 'grants', 'funding', 'allocation'],
    a: 'Funding is allocated to councils based on approved budgets, fiscal frameworks, and performance benchmarks. Disbursements are monitored to ensure compliance.'
  },
  {
    q: ['contact', 'phone', 'email', 'whatsapp'],
    a: `For direct assistance, click here: <br>
        <a href="https://wa.me/${whatsappNumber}" target="_blank" class="text-green-500 text-lg">
            <i class="fab fa-whatsapp"></i> WhatsApp NLGFC
        </a>`
  },
  {
    q: ['reports', 'publications', 'documents'],
    a: 'Key reports and publications are available on the Publications page. You can browse annual reports, grant guidelines, and monitoring dashboards.'
  }
]

const messages = ref([
  { type: 'bot', text: "Hello! I’m the NLGFC Assistant. How can I help you today?" }
])
const userInput = ref('')
const open = ref(false)
const isLoading = ref(false)
const chatWindow = ref(null)
const chatContainer = ref(null)

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()

const findAnswer = (query) => {
  const nq = normalize(query)
  for (const item of knowledgeBase) {
    if (item.q.some((key) => nq.includes(normalize(key)))) {
      return item.a
    }
  }
  return null
}

const sendMessage = async () => {
  const text = userInput.value.trim()
  if (!text) return

  messages.value.push({ type: 'user', text })
  userInput.value = ''
  isLoading.value = true
  await nextTick()
  scrollToBottom()

  const hardCodedAnswer = findAnswer(text)
  if (hardCodedAnswer) {
    messages.value.push({ type: 'bot', text: hardCodedAnswer })
  } else {
    messages.value.push({
      type: 'bot',
      text: `I cannot provide that information. Kindly reach us via: <br>
             <a href="https://wa.me/${whatsappNumber}" target="_blank" class="text-green-500 text-lg">
                 <i class="fab fa-whatsapp"></i> WhatsApp NLGFC
             </a>`
    })
  }

  isLoading.value = false
  await nextTick()
  scrollToBottom()
}

const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
}

const toggleChat = () => {
  open.value = !open.value
}

const handleClickOutside = (e) => {
  if (
    open.value &&
    chatContainer.value &&
    !chatContainer.value.contains(e.target) &&
    !e.target.closest('button[aria-label="Toggle chat"]')
  ) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.chat-scroll::-webkit-scrollbar {
  width: 6px;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
</style>
