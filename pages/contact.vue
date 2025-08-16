<script setup>
definePageMeta({
  title: 'Contact Us'
})

const activeTab = ref('address') // Default active tab

const tabs = [
  { id: 'address', title: 'Contact Us' },
  { id: 'feedback', title: 'Feedback & Enquiries' },
  { id: 'ati', title: 'Access to Information' }
]

// Load contact data from API
const { data: contactData, pending } = await $fetch('/api/contact')
const contact = contactData?.contact || {}
const officers = contactData?.officers || []
const ati = contactData?.ati || {}

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
})

function onSubmit(event) {
  const response = grecaptcha.getResponse()
  if (!response) {
    alert('Please complete the CAPTCHA.')
    event.preventDefault()
    return
  }

  // Submit logic or allow native form submission
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
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Contact Us</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ contact.organization_name || 'National Local Government Finance Committee' }}<br>
            {{ contact.address || 'Red Cross House, Area 14' }}<br>
            {{ contact.po_box || 'P.O. Box 31162, Lilongwe 3.' }}<br>
            Phone: {{ contact.primary_phone || '+265891003313' }}<template v-if="contact.secondary_phone"> / {{ contact.secondary_phone }}</template><br>
            Email: <a :href="`mailto:${contact.primary_email || 'ed@nlgfc.gov.mw'}`" class="text-emerald-600 hover:underline">{{ contact.primary_email || 'ed@nlgfc.gov.mw' }}</a><template v-if="contact.secondary_email"> | 
<a :href="`mailto:${contact.secondary_email}`" class="text-emerald-600 hover:underline">{{ contact.secondary_email }}</a></template>
          </p>
          
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

  <form class="contact-form mt-6 space-y-4" @submit.prevent="onSubmit">
    <label class="block">
      <span class="block text-sm font-medium text-gray-600">Name:</span>
      <input type="text" name="name" required class="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
    </label>

    <label class="block">
      <span class="block text-sm font-medium text-gray-600">Email:</span>
      <input type="email" name="email" required class="mt-1 block w-80 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
    </label>

    <label class="block">
      <span class="block text-sm font-medium text-gray-600">Message:</span>
      <textarea name="message" rows="5" required class="mt-1 block w-120 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
    </label>

    <div class="g-recaptcha" data-sitekey="6LeFh2orAAAAANoVqg73nZm_-e8_ZN6WSZXidblu"></div>

    <button type="submit" class="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-100 hover:text-emerald-600 transition">
      Send
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