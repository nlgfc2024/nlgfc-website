<template>
  <div>
    <HeroSlider />
   
    <section class="py-20  bg-gray-50">
      <UContainer class="space-y-16">
        <!-- Mandate Section -->
        <div class="relative">
          <div class="relative max-w-4xl mx-auto text-center bg-white border-0 shadow-none">
            <div class="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary-50">
              <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-primary-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Our Mandate</h2>
            <p class="text-gray-600 text-base leading-relaxed max-w-3xl mx-auto">
              To ensure effective financial management and service delivery at the local government level
              through strategic funding, oversight, and support mechanisms in line with national goals.
            </p>
          </div>
        </div>

        <!-- Three Smaller Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Vision -->
          <div class="relative group">
            <div class="absolute inset-0 bg-primary-50 rounded-xl transform group-hover:scale-105 transition duration-300"></div>
            <div class="relative bg-white p-6 rounded-xl border border-gray-100 shadow-xs h-full group-hover:shadow-md transition duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-amber-50 rounded-lg">
                <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-amber-500" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Vision</h3>
              <p class="text-sm text-gray-600">
                A financially autonomous and accountable local government system that delivers quality services to citizens.
              </p>
            </div>
          </div>

          <!-- Mission -->
          <div class="relative group">
            <div class="absolute inset-0 bg-blue-50 rounded-xl transform group-hover:scale-105 transition duration-300"></div>
            <div class="relative bg-white p-6 rounded-xl border border-gray-100 shadow-xs h-full group-hover:shadow-md transition duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-blue-50 rounded-lg">
                <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 text-blue-500" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Mission</h3>
              <p class="text-sm text-gray-600">
                To facilitate and manage fiscal transfers and provide technical support to local authorities for improved governance and service delivery.
              </p>
            </div>
          </div>

          <!-- Core Values -->
          <div class="relative group">
            <div class="absolute inset-0 bg-red-50 rounded-xl transform group-hover:scale-105 transition duration-300"></div>
            <div class="relative bg-white p-6 rounded-xl border border-gray-100 shadow-xs h-full group-hover:shadow-md transition duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 mb-4 bg-red-50 rounded-lg">
                <UIcon name="i-heroicons-heart" class="w-5 h-5 text-red-500" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Core Values</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="(value, index) in coreValues"
                  :key="index"
                  class="flex items-start"
                >
                  <UIcon :name="value.icon" class="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" :class="value.color" />
                  <span class="text-sm text-gray-600">{{ value.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

  <!-- Projects in Brief -->
<section class="py-20 bg-primary-50">
  <UContainer>
    <h2 class="text-2xl font-bold text-center text-primary-900 mb-12">Projects in Brief</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full mx-auto mb-4">
            <UIcon :name="project.icon" class="w-6 h-6 text-primary-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ project.description }}</p>
        </div>
        <div class="mt-auto text-center">
          <NuxtLink
            :to="project.url"
            class="inline-block text-primary-700 border border-primary-700 hover:bg-primary-700 hover:text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            Read More
          </NuxtLink>
        </div>
      </div>
    </div>
  </UContainer>
</section>


   
<section class="py-20 bg-white">
  <UContainer>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Recent Publications -->
      <div class="lg:col-span-5">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent Publications</h3>
        <ul class="space-y-4 mb-4">
          <li
            v-for="(pub, index) in paginatedPublications"
            :key="index"
            class="flex justify-between items-start border border-gray-200 p-4 rounded-md bg-gray-50 hover:bg-gray-100"
          >
            <div>
              <h4 class="text-sm font-medium text-primary-700">{{ pub.title }}</h4>
              <p class="text-xs text-gray-500">{{ formatDate(pub.date) }}</p>
            </div>
            <a
              :href="pub.file"
              target="_blank"
              download
              class="text-sm px-3 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white transition"
            >
              Download
            </a>
          </li>
        </ul>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center text-sm text-gray-600">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Separator -->
      <div class="hidden lg:flex lg:col-span-1 justify-center">
        <USeparator orientation="vertical" class="h-80" />
      </div>

      <!-- Recent Opportunities -->
<div class="lg:col-span-5">
  <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent Opportunities</h3>

  <!-- Tabs -->
  <div class="flex space-x-3 mb-4">
    <button
      v-for="tab in opportunityTabs"
      :key="tab.key"
      @click="activeTab = tab.key"
      :class="[
        'px-4 py-2 rounded-md text-sm',
        activeTab === tab.key
          ? 'bg-primary-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      ]"
    >
      {{ tab.label }}
    </button>
  </div>

  <!-- Items -->
  <ul class="space-y-3">
    <li
      v-for="(op, index) in currentOpportunities"
      :key="index"
      class="flex justify-between items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100 border border-gray-200"
    >
      <div>
        <h5 class="text-sm font-medium text-primary-700">{{ op.title }}</h5>
        <p class="text-xs text-gray-500">{{ formatDate(op.deadline) }}</p>
      </div>

      <!-- Conditional Button -->
      <template v-if="activeTab === 'procurements'">
        <a
          :href="op.file || '#'"
          target="_blank"
          download
          class="text-sm px-3 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white transition"
        >
          Download
        </a>
      </template>
      <template v-else-if="activeTab === 'jobs'">
        <NuxtLink
          :to="op.applyLink || '#'"
          class="text-sm px-3 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white transition"
        >
          Apply
        </NuxtLink>
      </template>
    </li>
  </ul>
</div>

    </div>
  </UContainer>
</section>






    <section class="py-10 bg-gray-50">
      <UContainer>
        <h2 class="text-xl font-semibold text-center text-gray-800 mb-6">Our Partners</h2>
        <UCarousel
          v-slot="{ item }"
          :items="partners"
          loop
          arrows
          dots
          :autoplay="{ delay: 2000 }"
          :ui="{ item: 'basis-1/4 md:basis-1/6 flex justify-center items-center' }"
          class="max-w-6xl mx-auto"
        >
          <img
            :src="item"
            :alt="`Partner logo`"
            class="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </UCarousel>
      </UContainer>
    </section> 
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Publications and pagination logic
const publications = ref([
  { title: '2024 Annual Report', date: '2024-12-31' },
  { title: 'Q1 Monitoring Brief', date: '2024-03-30' },
  { title: 'Local Authority Handbook', date: '2023-11-10' },
  { title: 'Financial Audit Summary', date: '2023-08-15' },
  { title: 'Development Budget Review', date: '2023-06-01' }
])

const currentPage = ref(1)
const itemsPerPage = 2

const totalPages = computed(() =>
  Math.ceil(publications.value.length / itemsPerPage)
)

const paginatedPublications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return publications.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Opportunity tabs
const opportunityTabs = ref([
  {
    key: 'procurements',
    label: 'Procurements',
    items: [
      { title: 'Supply of IT Equipment', deadline: '2024-08-15' },
      { title: 'Construction of School Blocks', deadline: '2024-09-01' }
    ]
  },
  {
    key: 'jobs',
    label: 'Jobs',
    items: [
      { title: 'Finance Officer Position', deadline: '2024-07-30' },
      { title: 'Monitoring & Evaluation Specialist', deadline: '2024-08-10' }
    ]
  }
])

const activeTab = ref(opportunityTabs.value[0].key)

const currentOpportunities = computed(() => {
  const tab = opportunityTabs.value.find(t => t.key === activeTab.value)
  return tab?.items || []
})
// Core values
const coreValues = [
  { icon: 'i-heroicons-eye', color: 'text-primary-500', text: 'Transparency' },
  { icon: 'i-heroicons-shield-check', color: 'text-primary-500', text: 'Accountability' },
  { icon: 'i-heroicons-scale', color: 'text-primary-500', text: 'Integrity' },
  { icon: 'i-heroicons-users', color: 'text-primary-500', text: 'Inclusiveness' },
  { icon: 'i-heroicons-sparkles', color: 'text-primary-500', text: 'Service Excellence' }
]

// Partners
const partners = [
  'https://picsum.photos/200/100?random=1',
  'https://picsum.photos/200/100?random=2',
  'https://picsum.photos/200/100?random=3',
  'https://picsum.photos/200/100?random=4',
  'https://picsum.photos/200/100?random=5',
  'https://picsum.photos/200/100?random=6',
  'https://picsum.photos/200/100?random=7',
  'https://picsum.photos/200/100?random=8'
]

// Projects
const projects = [
  {
    title: 'SSRP',
    description: 'Social Support for Resilient Livelihoods Project focuses on reducing poverty and enhancing resilience in vulnerable communities.',
    icon: 'i-heroicons-users'
  },
  {
    title: 'GESD',
    description: 'Governance to Enable Service Delivery Project aims to improve local government capacity and citizen service access.',
    icon: 'i-heroicons-building-library'
  },
  {
    title: 'RCRP2',
    description: 'The second phase of the Climate Resilience Project supports districts in disaster preparedness and mitigation.',
    icon: 'i-heroicons-sparkles'
  }
]


</script>
