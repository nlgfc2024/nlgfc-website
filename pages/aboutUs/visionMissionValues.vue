<script setup>
definePageMeta({
  title: 'Vision, Mission and Core Values'
})

const activeTab = ref('mission') // Default active tab

const tabs = [
  { id: 'mission', title: 'Our Mission' },
  { id: 'vision', title: 'Our Vision' },
  { id: 'values', title: 'Core Values' }
]

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
})
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">About NLGFC</h2>
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <NuxtLink
                :to="`#${tab.id}`"
                @click="activeTab = tab.id"
                class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                :class="{
                  'bg-blue-50 text-gray-800 font-medium border-l-4 border-gray-600': activeTab === tab.id
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
        <!-- Mission Content -->
        <div v-show="activeTab === 'mission'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Our Mission</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            To provide efficient and effective technical, financial and economic management services for mobilization, distribution and utilization 
            of resources for quality service delivery by Local Governments
          </p>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Strategic Priorities</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>Enhance public service delivery through digital transformation</span>
              </li>
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>Promote accountability and transparency in all operations</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Vision Content -->
        <div v-show="activeTab === 'vision'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Our Vision</h2>
          <p class="text-gray-700 leading-relaxed">
            To be a model government agency recognized for excellence in public service and innovative governance solutions.
          </p>
        </div>

        <!-- Core Values Content -->
        <div v-show="activeTab === 'values'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Core Values</h2>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Proffessionalism</h3>
                <p class="text-gray-700">Integrity, ethical and impartial.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Corruption and fraud-free: </h3>
                <p class="text-gray-700">upholds morals</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Transparent and accountable</h3>
                
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1"> Innovation and learning: staying relevant in a changing environment.</h3>
                <p class="text-gray-700">upholds morals</p>
                
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