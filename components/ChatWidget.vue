<template>
  <div>
    <!-- Chat Toggle Button -->
    <Transition name="bounce">
      <button
        v-if="!isOpen"
        @click="toggleChat"
        class="fixed right-6 bottom-6 z-50 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 group"
        aria-label="Open chat"
      >
        <Icon name="lucide:message-circle" class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse" v-if="hasNewMessage">
          !
        </span>
      </button>
    </Transition>

    <!-- Chat Window -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed bottom-6 right-6 w-96 h-[32rem] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        :class="{ 'animate-pulse-border': isTyping }"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center rounded-t-2xl">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <h3 class="font-bold text-lg">NLGFC Assistant</h3>
              <p class="text-blue-100 text-sm">{{ isTyping ? 'Typing...' : 'Online' }}</p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
            aria-label="Close chat"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <!-- Messages Container -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 custom-scrollbar"
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
                  'max-w-[85%] p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md',
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                ]"
              >
                <p class="text-sm leading-relaxed" v-html="formatMessage(message.text)"></p>
                <div class="flex items-center justify-between mt-2 text-xs opacity-70">
                  <span>{{ formatTime(message.timestamp) }}</span>
                  <Icon
                    v-if="message.sender === 'user'"
                    name="lucide:check-check"
                    class="w-4 h-4"
                    :class="{ 'text-green-300': message.read }"
                  />
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white/80 backdrop-blur border-t border-gray-200/50 rounded-b-2xl">
          <form @submit.prevent="sendMessage" class="flex items-end space-x-3">
            <div class="flex-1 relative">
              <textarea
                v-model="userInput"
                ref="messageInput"
                @keydown="handleKeydown"
                placeholder="Type your message..."
                rows="1"
                class="w-full p-3 pr-12 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 max-h-32 bg-white/80 backdrop-blur"
                :disabled="isLoading"
              ></textarea>
              <button
                type="button"
                @click="attachFile"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="lucide:paperclip" class="w-4 h-4" />
              </button>
            </div>
            <button
              type="submit"
              :disabled="!userInput.trim() || isLoading"
              class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <Icon
                :name="isLoading ? 'lucide:loader-2' : 'lucide:send'"
                class="w-5 h-5"
                :class="{ 'animate-spin': isLoading }"
              />
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'

// Reactive state
const isOpen = ref(false)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const hasNewMessage = ref(false)
const messagesContainer = ref(null)
const messageInput = ref(null)

// Initialize with welcome message
onMounted(() => {
  messages.value.push({
    id: Date.now(),
    text: "Hello! 👋 I'm your NLGFC assistant. I'm here to help you with information about our financial services, microfinance programs, and community support initiatives. What would you like to know?",
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
  } else {
    // Reset states when closing
    userInput.value = ''
    isLoading.value = false
    isTyping.value = false
  }
}

// Handle keyboard events
const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// Send message function
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

  // Show typing indicator
  isLoading.value = true
  isTyping.value = true

  try {
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { message, history: messages.value.slice(-10) } // Send last 10 messages for context
    })

    // Mark user message as read
    userMessage.read = true

    // Add bot response
    messages.value.push({
      id: Date.now() + 1,
      text: response.message,
      sender: 'bot',
      timestamp: new Date(),
      read: false
    })

    if (!isOpen.value) {
      hasNewMessage.value = true
    }

  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({
      id: Date.now() + 1,
      text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or contact our support team for immediate assistance.",
      sender: 'bot',
      timestamp: new Date(),
      read: false
    })
  } finally {
    isLoading.value = false
    isTyping.value = false
  }
}

// Utility functions
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

const formatMessage = (text) => {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n/g, '<br>')
}

const attachFile = () => {
  // Placeholder for file attachment
  console.log('File attachment feature - to be implemented')
}
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Animations */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.message-enter-active {
  transition: all 0.3s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.animate-pulse-border {
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0%, 100% {
    border-color: rgba(59, 130, 246, 0.3);
  }
  50% {
    border-color: rgba(59, 130, 246, 0.8);
  }
}

/* Responsive design */
@media (max-width: 640px) {
  .fixed.bottom-6.right-6 {
    bottom: 1rem;
    right: 1rem;
    width: calc(100vw - 2rem);
    max-width: 350px;
  }
}
</style>