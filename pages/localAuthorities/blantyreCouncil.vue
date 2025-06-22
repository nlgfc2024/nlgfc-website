<script setup>
definePageMeta({
  title: 'Blantyre District Council'
})

const activeTab = ref('mission') // Default active tab

const tabs = [
  { id: 'mission', title: 'About & Mission' },
  { id: 'vision', title: 'Mandate & Vision' },
  { id: 'values', title: 'Strategic Objective' }
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
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">Profile</h2>
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
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Introduction</h2>
          <p class="text-gray-700 leading-relaxed mb-6">Blantyre District is one of the districts in the Southern 
            Region of Malawi that lies between longitudes of 33 to 
            35 degrees east and latitudes of 9.4 to 17.5 degrees south. 
            The district is bordered by Mwanza and Neno Districts in the North, 
            Zomba in the North East, Chiradzulu in the South East, 
            Thyolo in the South and Chikwawa in the West.
             It is 366km away from the Capital City,
              Lilongwe and is located in the Shire Highlands. 
              It covers an area of 1,785 square kilometres, 
              which represents 1.7% of the total land area of Malawi.        </p>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">VISION</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>A Council that can provide sustainable, quality socio-economic services adequately to its community 
</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Vision Content -->
        <div v-show="activeTab === 'vision'" class="prose max-w-none">
          
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Mandate</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>To promote local democratic participation </span>
              </li>
               <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>To promote infrastructural and economic development through District Development Plan</span>
              </li>
               <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>To make bylaws that facilitate its functions </span>
              </li>

                    <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>To mobilise resources within and outside the District</span>
              </li>
            </ul>
          </div>
           <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">VISION</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                <span>A Council that can provide sustainable, quality socio-economic services adequately to its community </span>
              </li>
            </ul>
          </div>

          
        </div>

        <!-- Core Values Content -->
        <div v-show="activeTab === 'values'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Strategic Objective</h2>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To create a democratic environment for popular participation in governance and development at the local level.</h3>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To provide social-economic services, coordinate and guide development issues in the District</h3>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To improve access, quality, and utilisation of social services by communities</h3>
                
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1"> To enhance and improve revenue generation and human resource capacity for optimal operational performance</h3>
               
                
              </div>
            </div>


            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To reduce food security through diversification and commercialization of agricultural production</h3>
               
                
              </div>
            </div>
             <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To promote public employment services through strengthening the linkage between registered job seekers and potential employers.</h3>
              </div>
            </div>
             <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">To improve access of vulnerable children and people living with disability to essential quality services</h3>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

