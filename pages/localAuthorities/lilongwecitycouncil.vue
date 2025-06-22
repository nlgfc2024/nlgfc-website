<script setup>
definePageMeta({
  title: 'Lilongwe City Council'
})

const activeTab = ref('mission') // Default active tab
const selectedRegion = ref(null)
const showMapModal = ref(false)
const hoveredRegion = ref(null)

const tabs = [
  { id: 'mission', title: 'About & Mission' },
  { id: 'vision', title: 'Mandate & Vision' },
  { id: 'values', title: 'Strategic Objective' }
]

// District regions data (you can customize this based on your actual SVG paths)
const regions = ref([
  {
    id: 'lilongwe-central',
    name: 'Lilongwe Central',
    population: '989,318',
    area: '1,500 km²',
    description: 'The heart of Malawi\'s capital city, home to government offices and commercial centers.',
    color: '#3B82F6'
  },
  {
    id: 'lilongwe-rural',
    name: 'Lilongwe Rural',
    population: '1,346,360',
    area: '4,659 km²',
    description: 'Agricultural areas surrounding the capital, known for tobacco and maize production.',
    color: '#10B981'
  },
  {
    id: 'dedza-border',
    name: 'Dedza Border Area',
    population: '156,924',
    area: '800 km²',
    description: 'Eastern border region with Dedza District, mountainous terrain.',
    color: '#F59E0B'
  },
  {
    id: 'mchinji-border',
    name: 'Mchinji Border Area',
    population: '98,456',
    area: '600 km²',
    description: 'Western border region, gateway to Zambia through Mchinji District.',
    color: '#EF4444'
  }
])

// Handle region clicks
const handleRegionClick = (regionId) => {
  const region = regions.value.find(r => r.id === regionId)
  if (region) {
    selectedRegion.value = region
    showMapModal.value = true
  }
}

// Handle region hover
const handleRegionHover = (regionId) => {
  hoveredRegion.value = regionId
}

const handleRegionLeave = () => {
  hoveredRegion.value = null
}

// Close modal
const closeModal = () => {
  showMapModal.value = false
  selectedRegion.value = null
}

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
  
  // Add click listeners to SVG paths (you'll need to adapt this to your actual SVG structure)
  setTimeout(() => {
    const svgElements = document.querySelectorAll('.interactive-map svg path, .interactive-map svg g[data-region]')
    svgElements.forEach((element, index) => {
      const regionId = element.getAttribute('data-region') || regions.value[index % regions.value.length]?.id
      if (regionId) {
        element.style.cursor = 'pointer'
        element.addEventListener('click', () => handleRegionClick(regionId))
        element.addEventListener('mouseenter', () => handleRegionHover(regionId))
        element.addEventListener('mouseleave', handleRegionLeave)
      }
    })
  }, 500)
})
</script>

<template>
  <div class="about-page bg-white">
    <!-- Hero Section -->
<div>
<div class="container mx-auto px-4 max-w-6xl">
          <div>
            
               </div>
               </div>
              </div>

              <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
            <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-blue-600">Profile</h2>
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <NuxtLink
                :to="`#${tab.id}`"
                @click="activeTab = tab.id"
                class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                :class="{
                  'bg-blue-50 text-blue-800 font-medium border-l-4 border-blue-600': activeTab === tab.id
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
          
          <!-- Location Info with Small Map -->
          <div class="flex flex-col lg:flex-row gap-6 mb-8">
            <div class="flex-1">
              <p class="text-gray-700 leading-relaxed mb-4">
                Lilongwe District is the largest district in the Central Region of Malawi. It is bordered by Dedza District to
                the East, Salima to the North East. Mchinji District marks the western boundary. Dowa District lies to the north of Lilongwe with Kasungu to
                its North-western tip and the Republic of Mozambique to the South West.
              </p>
              <p class="text-gray-700 leading-relaxed mb-4">
                The total land area is 6,159 square kilometres, representing 6.5% of Malawi's
                total land area. Lilongwe District hosts the capital city of Malawi,
                which owes its name to the river that flows across the centre of the district.
              </p>
            </div>
            <div class="lg:w-64 flex-shrink-0">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 group cursor-pointer hover:shadow-md transition-shadow duration-300" @click="showMapModal = true">
                <div class="interactive-map-small">
                  <img 
                    src="/localAuthorities/malawi.svg" 
                    alt="Lilongwe District Location"
                    class="w-full h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p class="text-sm text-gray-600 text-center mt-2 group-hover:text-blue-600 transition-colors duration-300">
                  📍 Click to explore Lilongwe regions
                </p>
              </div>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed mb-6">
            Development activities of the district are being championed by the District Council 
            which according to the 1998 Local Government Act, is the highest policy-making 
            body responsible for promoting infrastructural and economic development in the district.
            It comprises elected members (Ward Councillors), with Members of Parliament (MPs),
            the Chiefs and members of interest groups as ex-officio members.
          </p>
          
          <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Council Mandate Overview</h3>
            <p class="text-gray-700">
              The Council is mandated to undertake various activities to promote local development, 
              democratic participation, and provide essential services to the community.
            </p>
          </div>
        </div>

        <!-- Vision Content -->
        <div v-show="activeTab === 'vision'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Mandate & Vision</h2>
          
          <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Mandate</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>To promote local democratic participation</span>
              </li>
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>To promote infrastructural and economic development through District Development Plan</span>
              </li>
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>To make bylaws that facilitate its functions</span>
              </li>
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>To mobilise resources within and outside the District</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-green-50 p-6 rounded-lg border border-green-200 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Vision</h3>
            <div class="flex items-start">
              <span class="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
              <span class="text-gray-700 font-medium">
                A Council that can provide sustainable, quality socio-economic services adequately to its community
              </span>
            </div>
          </div>
        </div>

        <!-- Strategic Objectives Content -->
        <div v-show="activeTab === 'values'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Strategic Objectives</h2>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Democratic Participation</h3>
                <p class="text-gray-600">To create a democratic environment for popular participation in governance and development at the local level.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Service Delivery</h3>
                <p class="text-gray-600">To provide social-economic services, coordinate and guide development issues in the District</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Social Services Access</h3>
                <p class="text-gray-600">To improve access, quality, and utilisation of social services by communities</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-orange-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Revenue & Capacity Building</h3>
                <p class="text-gray-600">To enhance and improve revenue generation and human resource capacity for optimal operational performance</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Food Security</h3>
                <p class="text-gray-600">To reduce food insecurity through diversification and commercialization of agricultural production</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Employment Services</h3>
                <p class="text-gray-600">To promote public employment services through strengthening the linkage between registered job seekers and potential employers.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-pink-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1">Vulnerable Groups Support</h3>
                <p class="text-gray-600">To improve access of vulnerable children and people living with disability to essential quality services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Map Modal -->
    <Transition name="modal" appear>
      <div v-if="showMapModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeModal">
        <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" @click.stop>
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 class="text-2xl font-bold text-gray-900">Lilongwe District Interactive Map</h3>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="flex flex-col lg:flex-row h-[70vh]">
            <!-- Map Section -->
            <div class="flex-1 p-6 flex items-center justify-center bg-gray-50">
              <div class="interactive-map-large relative">
                <img 
                  src="/localAuthorities/malawi.svg" 
                  alt="Interactive Lilongwe District Map"
                  class="max-w-full max-h-full object-contain transition-all duration-300"
                  style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                />
                <!-- Animated Pulse Points (example positions) -->
                <div class="absolute top-1/3 left-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse cursor-pointer transform -translate-x-1/2 -translate-y-1/2" 
                     @click="handleRegionClick('lilongwe-central')"
                     title="Lilongwe Central"></div>
                <div class="absolute top-1/2 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse cursor-pointer transform -translate-x-1/2 -translate-y-1/2" 
                     @click="handleRegionClick('lilongwe-rural')"
                     title="Lilongwe Rural"></div>
                <div class="absolute top-2/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse cursor-pointer transform translate-x-1/2 -translate-y-1/2" 
                     @click="handleRegionClick('dedza-border')"
                     title="Dedza Border"></div>
                <div class="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse cursor-pointer transform -translate-x-1/2 -translate-y-1/2" 
                     @click="handleRegionClick('mchinji-border')"
                     title="Mchinji Border"></div>
              </div>
            </div>
            
            <!-- Information Panel -->
            <div class="lg:w-96 p-6 border-l border-gray-200 overflow-y-auto">
              <!-- Default Info -->
              <div v-if="!selectedRegion" class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-900">District Overview</h4>
                <div class="space-y-3">
                  <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-medium text-blue-900">Total Area</h5>
                    <p class="text-blue-700">6,159 km²</p>
                  </div>
                  <div class="bg-green-50 p-4 rounded-lg">
                    <h5 class="font-medium text-green-900">Population</h5>
                    <p class="text-green-700">~2.6 million</p>
                  </div>
                  <div class="bg-purple-50 p-4 rounded-lg">
                    <h5 class="font-medium text-purple-900">Status</h5>
                    <p class="text-purple-700">District</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-4">Click on the colored dots to explore different regions of Lilongwe District.</p>
              </div>
              
              <!-- Selected Region Info -->
              <div v-if="selectedRegion" class="space-y-4">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-4 h-4 rounded-full" :style="`background-color: ${selectedRegion.color}`"></div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ selectedRegion.name }}</h4>
                </div>
                
                <div class="space-y-3">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-medium text-gray-900">Population</h5>
                    <p class="text-gray-700">{{ selectedRegion.population }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-medium text-gray-900">Area</h5>
                    <p class="text-gray-700">{{ selectedRegion.area }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-medium text-gray-900">Description</h5>
                    <p class="text-gray-700 text-sm">{{ selectedRegion.description }}</p>
                  </div>
                </div>
                
                <button @click="selectedRegion = null" class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  ← Back to Overview
                </button>
              </div>
              
              <!-- Regions List -->
              <div class="mt-8">
                <h5 class="font-medium text-gray-900 mb-3">All Regions</h5>
                <div class="space-y-2">
                  <div v-for="region in regions" :key="region.id" 
                       class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                       @click="selectedRegion = region">
                    <div class="w-3 h-3 rounded-full" :style="`background-color: ${region.color}`"></div>
                    <span class="text-sm text-gray-700">{{ region.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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

/* Interactive Map Styles */
.interactive-map-small:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.interactive-map-large {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

/* Modal Animations */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Pulse Animation for Map Points */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Map Point Hover Effects */
.interactive-map-large .w-4:hover,
.interactive-map-large .w-3:hover {
  transform: scale(1.5) !important;
  transition: transform 0.2s ease;
  z-index: 10;
}

/* Smooth Transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom Scrollbar for Modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .interactive-map-small {
    width: 100%;
    height: 250px;
  }
  
  .modal-content {
    margin: 1rem;
  }
}
</style>