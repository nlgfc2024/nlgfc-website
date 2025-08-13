<script setup>
definePageMeta({
  title: 'Nsanje District Council'
})

const activeTab = ref('profile') // Default active tab
const isTransitioning = ref(false) // For managing transition state

const tabs = [
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' }
]

// Enhanced tab switching with transition
const switchTab = (tabId) => {
  if (tabId === activeTab.value) return
  
  isTransitioning.value = true
  
  // Small delay to allow fade out
  setTimeout(() => {
    activeTab.value = tabId
    isTransitioning.value = false
  }, 150)
}

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
})

const projects = [
  {
    name: 'GESD',
    fullName: 'Governance to Enable Service Delivery',
    description: 'Governance to Enable Service Delivery (GESD) project development objective is to strengthen Local Authorities\' institutional performance, responsiveness to citizens and management of resources for service delivery.',
    objectives: [
      'Strengthened institutional performance tracking of improvements in Local Authorities (LAs) institutional performance for service delivery',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans (AIPs)'
    ],
    status: 'Active'
  },
  {
    name: 'SSRLP',
    fullName: 'Social Support and Resilience Livelihoods Program',
    description: 'A program designed to build community resilience and provide social support to vulnerable populations in Nsanje District.',
    objectives: [
      'Improve household food security and nutrition',
      'Build community resilience to shocks and stresses',
      'Strengthen local governance structures',
      'Enhance access to social services'
    ],
    status: 'Active'
  },
  {
    name: 'MASAF',
    fullName: 'Malawi Social Action Fund',
    description: 'A community-driven development program that supports infrastructure development and capacity building initiatives.',
    objectives: [
      'Improve rural infrastructure and connectivity',
      'Enhance access to basic social services',
      'Build local capacity for project management',
      'Promote community participation in development'
    ],
    status: 'Not Active'
  }
]

const reports = [
  {
    title: 'Annual Performance Report 2024',
    type: 'Annual Report',
    date: '2024-12-15',
    description: 'Comprehensive overview of council activities and achievements for the fiscal year 2024.'
  },
  {
    title: 'District Development Plan 2023-2027',
    type: 'Strategic Plan',
    date: '2023-01-20',
    description: 'Five-year strategic development plan outlining priority areas and implementation strategies.'
  },
  {
    title: 'Revenue Collection Report Q4 2024',
    type: 'Financial Report',
    date: '2024-10-30',
    description: 'Quarterly report on revenue collection and financial performance.'
  },
  {
    title: 'Infrastructure Development Progress Report',
    type: 'Progress Report',
    date: '2024-11-15',
    description: 'Status update on ongoing infrastructure projects across the district.'
  }
]

const news = [
  {
    title: 'Nsanje District Council Launches New Water Project',
    date: '2024-12-10',
    summary: 'The council has initiated a new water infrastructure project to improve access to clean water in rural areas.',
    category: 'Development'
  },
  {
    title: 'Community Participation in Governance Workshop',
    date: '2024-12-05',
    summary: 'A three-day workshop was conducted to enhance community participation in local governance and decision-making processes.',
    category: 'Governance'
  },
  {
    title: 'Agricultural Extension Services Expanded',
    date: '2024-11-28',
    summary: 'The district has expanded its agricultural extension services to reach more farmers in remote areas.',
    category: 'Agriculture'
  },
  {
    title: 'Youth Skills Development Program Graduation',
    date: '2024-11-20',
    summary: 'Over 200 youth graduated from various skills development programs including carpentry, tailoring, and entrepreneurship.',
    category: 'Youth'
  }
]
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <button
                @click="switchTab(tab.id)"
                class="w-full text-left block px-4 py-3 rounded transition-all duration-300 text-gray-700 hover:bg-blue-50 hover:text-gray-800 hover:shadow-sm transform hover:translate-x-1"
                :class="{
                  'bg-blue-50 text-gray-800 font-medium border-l-4 border-gray-600 shadow-sm': activeTab === tab.id,
                  'hover:scale-105': activeTab !== tab.id
                }"
              >
                {{ tab.title }}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content Area with Transition Container -->
      <div class="flex-1 min-w-0 relative overflow-hidden">
        <div class="transition-container">
          <!-- Council Profile Content -->
          <Transition
            name="fade-slide"
            mode="out-in"
          >
            <div v-if="activeTab === 'profile'" key="profile" class="content-panel">
              <div class="prose max-w-none">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Nsanje District Council Profile</h2>
                <div class="space-y-6">
                  <div class="bg-blue-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">About Nsanje District Council</h3>
                    <p class="text-gray-700 leading-relaxed">
                       </p>
                  </div>

                  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Mandate</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>   //</span>  <!-- this is kovahiwa and ken we left these spaces so that we can the data for district in the spans elements-->
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>///</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>///</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>////// </span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Vision</h3>
                    <p class="text-gray-700 leading-relaxed font-medium">..//.</p>
                  </div>

                  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Mission</h3>
                    <p class="text-gray-700 leading-relaxed font-medium">///</p>
                  </div>

                  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Strategic Objectives</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>////</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>///</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>////</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>////</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>/////</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>///////</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>/////</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Functions</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>/////</span>
                      </li>
                      
                    </ul>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <h4 class="font-semibold text-gray-900 mb-2">Major Achievements</h4>
                      <p class="text-gray-700">.....</p>
                      <</div>
                    <div class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <h4 class="font-semibold text-gray-900 mb-2">Jurisdiction</h4>
                      <p class="text-gray-700">/////</p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <h4 class="font-semibold text-gray-900 mb-2">Population</h4>
                      <p class="text-gray-700">///////</p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <h4 class="font-semibold text-gray-900 mb-2">Structure</h4>
                      <p class="text-gray-700">////</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Projects Content -->
            <div v-else-if="activeTab === 'projects'" key="projects" class="content-panel">
              <div class="prose max-w-none">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Development Projects</h2>
                <div class="space-y-8">
                  <div v-for="(project, index) in projects" :key="project.name" 
                       class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                       :style="{ animationDelay: `${index * 100}ms` }">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h3 class="text-xl font-bold text-gray-900">{{ project.name }}</h3>
                        <p class="text-gray-600 font-medium">{{ project.fullName }}</p>
                      </div>
                      <span class="px-3 py-1 text-sm font-medium rounded-full transition-colors"
                            :class="project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                        {{ project.status }}
                      </span>
                    </div>
                    <p class="text-gray-700 mb-4">{{ project.description }}</p>
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-2">Key Objectives:</h4>
                      <ul class="space-y-1">
                        <li v-for="objective in project.objectives" :key="objective" class="flex items-start">
                          <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                          <span class="text-gray-700">{{ objective }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reports Content -->
            <div v-else-if="activeTab === 'reports'" key="reports" class="content-panel">
              <div class="prose max-w-none">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Reports & Documents</h2>
                <div class="space-y-4">
                  <div v-for="(report, index) in reports" :key="report.title" 
                       class="border border-gray-200 rounded-lg p-4"
                       :style="{ animationDelay: `${index * 100}ms` }">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">{{ report.title }}</h3>
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {{ report.type }}
                      </span>
                    </div>
                    <p class="text-gray-600 mb-2">{{ report.description }}</p>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-500">Published: {{ new Date(report.date).toLocaleDateString() }}</span>
                      <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- News Content -->
            <div v-else-if="activeTab === 'news'" key="news" class="content-panel">
              <div class="prose max-w-none">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Latest News & Updates</h2>
                <div class="space-y-6">
                  <article v-for="(article, index) in news" :key="article.title" 
                           class="border border-gray-200 rounded-lg p-6 bg-white"
                           :style="{ animationDelay: `${index * 100}ms` }">
                    <div class="flex justify-between items-start mb-3">
                      <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded transition-colors hover:bg-gray-200">
                        {{ article.category }}
                      </span>
                      <time class="text-sm text-gray-500">{{ new Date(article.date).toLocaleDateString() }}</time>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{{ article.title }}</h3>
                    <p class="text-gray-700 leading-relaxed">{{ article.summary }}</p>
                    <div class="mt-4">
                      <button class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors hover:underline">
                        Read more →
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom transition classes */
.fade-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px) translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px) translateY(-10px);
}

.content-panel {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered animation for list items */
.content-panel > div > div > div:nth-child(n) {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.content-panel > div > div > div:nth-child(1) { animation-delay: 0.1s; }
.content-panel > div > div > div:nth-child(2) { animation-delay: 0.2s; }
.content-panel > div > div > div:nth-child(3) { animation-delay: 0.3s; }
.content-panel > div > div > div:nth-child(4) { animation-delay: 0.4s; }
.content-panel > div > div > div:nth-child(5) { animation-delay: 0.5s; }
.content-panel > div > div > div:nth-child(6) { animation-delay: 0.6s; }
.content-panel > div > div > div:nth-child(7) { animation-delay: 0.7s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition container */
.transition-container {
  min-height: 400px;
  position: relative;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:translate-x-1:hover {
  transform: translateX(0.25rem);
}
</style>