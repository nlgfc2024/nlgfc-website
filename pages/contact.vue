<script setup>
definePageMeta({
  title: 'Contact Us'
})

import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'

const activeTab = ref('address') // Default active tab

const tabs = [
  { id: 'address', title: 'Contact Us' },
  { id: 'feedback', title: 'Feedback & Enquiries' },
  { id: 'ati', title: 'Access to Information' }
]

// Load contact data from API — wrapped in useAsyncData so a failure
// does not crash the entire page and block usePageBlocks below.
const { data: contactRaw, error: contactError } = await useAsyncData(
  'contact-info',
  () => $fetch('/api/contact'),
  { server: false, lazy: true, default: () => null }
)
const contact  = computed(() => contactRaw.value?.data?.contact  ?? contactRaw.value?.contact  ?? {})
const officers = computed(() => contactRaw.value?.data?.officers ?? contactRaw.value?.officers ?? [])
const ati      = computed(() => contactRaw.value?.data?.ati      ?? contactRaw.value?.ati      ?? {})

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
})
const { data: pages, pending, error: PageError } = usePageBlocks([
  'contact-us'
])

// Form state
const formData = ref({
  name: '',
  email: '',
  message: ''
})
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Get runtime config for API base URL
const config = useRuntimeConfig()

async function onSubmit(event) {
  event.preventDefault()
  
  // Reset states
  submitSuccess.value = false
  submitError.value = ''
  
  // Verify CAPTCHA
  const captchaResponse = grecaptcha.getResponse()
  if (!captchaResponse) {
    submitError.value = 'Please complete the CAPTCHA verification.'
    return
  }

  // Validate form
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    submitError.value = 'Please fill in all required fields.'
    return
  }

  isSubmitting.value = true

  try {
    const baseUrl = String(config.public.apiBase || config.public.baseUrl || '').replace(/\/+$/, '')
    
    const response = await $fetch(`${baseUrl}/api/contact/submit`, {
      method: 'POST',
      body: {
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        'g-recaptcha-response': captchaResponse
      }
    })

    if (response.success) {
      submitSuccess.value = true
      // Reset form
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
      // Reset CAPTCHA
      grecaptcha.reset()
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        submitSuccess.value = false
      }, 5000)
    } else {
      submitError.value = response.message || 'Failed to send message. Please try again.'
    }
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error.data?.message) {
      submitError.value = error.data.message
    } else if (error.data?.errors) {
      // Handle validation errors
      const errors = Object.values(error.data.errors).flat()
      submitError.value = errors.join(' ')
    } else {
      submitError.value = 'Sorry, there was an error sending your message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <NuxtLink
                :to="`#${tab.id}`"
                @click="activeTab = tab.id"
                class="block px-4 py-3 rounded transition-colors text-gray-600 bg-emerald-50 hover:bg-emerald-200"
                :class="{
                  'bg-pink-200 text-emerald-600 font-medium border-l-4 border-gray-600': activeTab === tab.id
                }"
              >
                {{ tab.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
        <!-- Our Address Content -->
        <div v-show="activeTab === 'address'" class="prose max-w-none">
          <div v-if="pending">Loading...</div>
          <div v-else-if="PageError">Failed to load content.</div>
          <BlocksRenderer :blocks="pages?.['contact-us']?.blocks || []" />
          
          <div class="bg-gray-800 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 class="text-lg font-semibold !text-white mb-3">Map to NLGFC</h3>
            <iframe
    width="100%"
    height="400"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    :src="`https://www.google.com/maps?q=${contact.map_latitude || -13.954969},${contact.map_longitude || 33.781897}&z=${contact.map_zoom || 15}&output=embed`"
  ></iframe>
          </div>
        </div>

        <!-- Feedback Content -->
        <div v-show="activeTab === 'feedback'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">We would like to hear from you</h2>
          <p class="text-gray-600 leading-relaxed">
            Please input the required information below to send us a message:
          </p>

          <!-- Success Message -->
          <div v-if="submitSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-green-800 font-medium">Thank you! Your message has been sent successfully. We will get back to you soon.</p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="submitError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-red-800">{{ submitError }}</p>
            </div>
          </div>

          <form class="contact-form mt-6 space-y-4" @submit.prevent="onSubmit">
            <label class="block">
              <span class="block text-sm font-medium text-gray-600">Name: <span class="text-red-500">*</span></span>
              <input 
                type="text" 
                v-model="formData.name"
                required 
                :disabled="isSubmitting"
                class="mt-1 block w-full max-w-md border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </label>

            <label class="block">
              <span class="block text-sm font-medium text-gray-600">Email: <span class="text-red-500">*</span></span>
              <input 
                type="email" 
                v-model="formData.email"
                required 
                :disabled="isSubmitting"
                class="mt-1 block w-full max-w-md border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed" 
              />
            </label>

            <label class="block">
              <span class="block text-sm font-medium text-gray-600">Message: <span class="text-red-500">*</span></span>
              <textarea 
                v-model="formData.message"
                rows="5" 
                required 
                :disabled="isSubmitting"
                class="mt-1 block w-full max-w-2xl border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              ></textarea>
            </label>

            <div class="g-recaptcha" data-sitekey="6LeFh2orAAAAANoVqg73nZm_-e8_ZN6WSZXidblu"></div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="inline-flex items-center px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="mr-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        

        <!-- Access to Information Content -->
         
        <div v-show="activeTab === 'ati'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Access to Information</h2>
          <div class="space-y-6">
            <div class="flex items-start">
              <div>
               
                <p class="text-gray-600">{{ ati.description || 'The Access to Information Act (ATIA) provides for the right of access to information in the custody of public and relevant private institutions; the processes and procedures related to obtaining that information; and to provide for matters connected therewith or incidental thereto.' }}</p>
                  <br>
                <p class="text-gray-600 mb-6">For more information, contact us through our information officers:</p>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
  <!-- Dynamic Information Officers -->
  <div
    v-for="officer in officers"
    :key="officer.id || officer.name"
    class="flex flex-col items-center text-center text-pink-600 bg-pink-50 p-4 rounded-lg border border-gray-200 shadow-sm"
  >
    <img :src="officer.photo_url || '/images/default-avatar.jpg'" :alt="officer.name" class="w-32 h-32 object-cover rounded-full mb-4" />
    <h4 class="text-lg font-semibold text-gray-900">{{ officer.name }}</h4>
    <p class="text-gray-600">
      {{ officer.position || 'Information Officer' }}<br>
      {{ contact.organization_name || 'National Local Government Finance Committee' }}<br>
      {{ contact.address || 'Red Cross Complex, Area 14' }}
    </p>
    <p class="text-gray-600 mt-2">
      <template v-if="officer.email">
        Email: <a :href="`mailto:${officer.email}`" class="text-emerald-600 hover:underline">{{ officer.email }}</a><br />
      </template>
      <template v-if="officer.phone">
        Phone: {{ officer.phone }}
      </template>
    </p>
  </div>
</div>

<div class="mt-8">
  <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ ati.manual_title || 'Access to Information manual' }}</h4>
  <p class="text-gray-600 mb-2">
    You can download our Access to Information guidelines document here:
  </p>
  <a
    :href="ati.manual_url || '/documents/ati-2016.pdf'"
    download
    class="inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-emerald-100 hover:text-white transition"
  >
    Download ATI manual (PDF)
  </a>
</div>


              </div>
            </div>
          
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: calc(100vh - 120px);
}

.prose {
  max-width: 800px;
  margin: 0 auto;
}
</style>
