<script setup>
definePageMeta({
  title: 'Blantyre District Council'
})

const activeTab = ref('profile') // Default active tab
const isTransitioning = ref(false) // For managing transition state

// Modal state
const showModal = ref(false)
const activeModal = ref('')
const modalTitle = ref('')

const tabs = [
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' }
]

// Enhanced tab switching with transition
const switchTab = (tabId, event = null) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  if (tabId === activeTab.value) return
  
  isTransitioning.value = true
  
  // Small delay to allow fade out
  setTimeout(() => {
    activeTab.value = tabId
    isTransitioning.value = false
  }, 150)
}

// Modal functions
const openModal = (type) => {
  activeModal.value = type;
  showModal.value = true;
  
  // Set the modal title based on type
  switch(type) {
    case 'vision':
      modalTitle.value = 'Our Vision';
      break;
    case 'mission':
      modalTitle.value = 'Our Mission';
      break;
    case 'values':
      modalTitle.value = 'Our Core Values';
      break;
  }
}

const closeModal = () => {
  showModal.value = false;
  activeModal.value = '';
}

// Handle card clicks without scrolling
const handleCardClick = (event) => {
  event.preventDefault()
  event.stopPropagation()
  // Add any card-specific logic here if needed
}

// Handle button clicks without scrolling
const handleButtonClick = (event, action = null) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (action === 'download') {
    // Handle download logic here
    console.log('Download initiated')
  } else if (action === 'readmore') {
    // Handle read more logic here
    console.log('Read more clicked')
  }
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
    description: 'A program designed to build community resilience and provide social support to vulnerable populations in Blantyre District.',
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
    title: 'Blantyre District Council Launches New Water Project',
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
                @click="switchTab(tab.id, $event)"
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
                <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Blantyre District Council Profile</h2>
                <div class="space-y-6">
                  

                 


                  <!-- Vision, Mission, Core Values Section -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <!-- Vision Card -->
  <div 
    @click="openModal('vision')"
    class="bg-b rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
    <!-- Purple top border -->
    <div class="h-1 bg-gray-800"></div>
    <div class="p-6">
      <!-- Eye icon for Vision -->
      <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">Vision</h3>
      <p class="text-gray-600 leading-relaxed">A Council that can provide sustainable, quality socio-economic services adequately to its community.</p>
      <div class="mt-4">
        <button 
          @click.stop="openModal('vision')"
          class="text-purple-600 hover:text-purple-800 font-medium flex items-center group-hover:underline">
          Read more
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mission Card -->
  <div 
    @click="openModal('mission')"
    class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
    <!-- Blue top border -->
    <div class="h-1 bg-gray-800"></div>
    <div class="p-6">
      <!-- Lightning/Energy icon for Mission -->
      <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">Mission</h3>
      <p class="text-gray-600 leading-relaxed">To provide timely, high-quality and equitable social services through the promotion of Local governance...</p>
      <div class="mt-4">
        <button 
          @click.stop="openModal('mission')"
          class="text-blue-600 hover:text-blue-800 font-medium flex items-center group-hover:underline">
          Read more
         
        </button>
      </div>
    </div>
  </div>

  <!-- Core Values Card -->
  <div 
    @click="openModal('values')"
    class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
    <!-- Green top border -->
    <div class="h-1 bg-gray-800"></div>
    <div class="p-6">
      <!-- Heart icon for Core Values -->
      <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">Core Values</h3>
      <div class="space-y-2">
        <div class="flex items-center text-gray-600">
          <span class="text-green-500 mr-2">✓</span>
          <span>Integrity</span>
          <span class="text-green-500 ml-auto mr-2">✓</span>
          <span>Transparency</span>
        </div>
        <div class="flex items-center text-gray-600">
          <span class="text-green-500 mr-2">✓</span>
          <span>Accountability</span>
          <span class="text-green-500 ml-auto mr-2">✓</span>
          <span>Innovation</span>
        </div>
        <div class="flex items-center text-gray-600">
          <span class="text-green-500 mr-2">✓</span>
          <span>Teamwork</span>
          <span class="text-green-500 ml-auto mr-2">✓</span>
          <span>Professionalism</span>
        </div>
      </div>
      <div class="mt-4">
        <button 
          @click.stop="openModal('values')"
          class="text-green-600 hover:text-green-800 font-medium flex items-center group-hover:underline">
          Read more
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="closeModal">
  <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <!-- Modal header with close button -->
    <div class="flex justify-between items-center p-4 border-b">
      <h3 class="text-xl font-bold text-gray-900">{{ modalTitle }}</h3>
      <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <!-- Modal content -->
    <div class="p-6">
      <div v-if="activeModal === 'vision'">
        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <p class="text-gray-600 leading-relaxed">A Council that can provide sustainable, quality socio-economic services adequately to its community.</p>
        <div class="mt-6">
          <h4 class="font-semibold text-gray-800 mb-2">Our Vision in Action:</h4>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li>Sustainable development initiatives</li>
            <li>Quality service delivery to all community members</li>
            <li>Economic empowerment programs</li>
            <li>Inclusive social services</li>
          </ul>
        </div>
      </div>
      
      <div v-if="activeModal === 'mission'">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <p class="text-gray-600 leading-relaxed">To provide timely, high-quality and equitable social services through the promotion of Local governance and popular participation of the communities for the attainment of sustainable socio-economic development of the District.</p>
        <div class="mt-6">
          <h4 class="font-semibold text-gray-800 mb-2">How We Achieve Our Mission:</h4>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li>Community engagement and participation</li>
            <li>Efficient service delivery systems</li>
            <li>Capacity building for local governance</li>
            <li>Equitable resource distribution</li>
            <li>Continuous improvement of service quality</li>
          </ul>
        </div>
      </div>
      
      <div v-if="activeModal === 'values'">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 mb-3">Our Core Values</h4>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Integrity:</strong> We uphold the highest standards of honesty and ethical conduct</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Transparency:</strong> We operate with openness and clarity in all our dealings</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Accountability:</strong> We take responsibility for our actions and decisions</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Innovation:</strong> We embrace creative solutions to community challenges</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Teamwork:</strong> We collaborate effectively to achieve common goals</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">✓</span>
                <span class="text-gray-700"><strong>Professionalism:</strong> We maintain excellence in all our services</span>
              </li>
            </ul>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 mb-3">Living Our Values</h4>
            <p class="text-gray-600 mb-3">These core values guide our daily operations and decision-making processes:</p>
            <ul class="list-disc pl-5 space-y-2 text-gray-600">
              <li>Regular ethics training for all staff</li>
              <li>Open forums for community feedback</li>
              <li>Performance metrics aligned with our values</li>
              <li>Recognition programs for value-driven service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

















                  <div 
                    @click="handleCardClick"
                    class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Strategic Objectives</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To create a democratic environment for popular participation in governance and development at the local level.</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To provide social-economic services, coordinate and guide development issues in the District</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To improve access, quality, and utilisation of social services by communities</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To enhance and improve revenue generation and human resource capacity for optimal operational performance</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To reduce food security through diversification and commercialization of agricultural production.</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To improve access of vulnerable children and people living with disability to essential quality services</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>To promote public employment services through strengthening the linkage between registered job seekers and potential employers</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    @click="handleCardClick"
                    class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Functions</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>Local governance and administration</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>Development planning and implementation</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>Service delivery and infrastructure development</span>
                      </li>
                      <li class="flex items-start">
                        <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                        <span>Revenue collection and financial management</span>
                      </li>
                    </ul>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      @click="handleCardClick"
                      class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                      <h4 class="font-semibold text-gray-900 mb-2">Major Achievements</h4>
                      <p class="text-gray-700">Improved in LAPA scores for three consecutive years, hence more GESD funds for projects.</p>
                      <p class="text-gray-700">The District is implementing the Kadidi project, which is one of the flagship projects under GESD funds. Under the project, there will be an OPD, staff house, incinerator, and maternity wing</p>
                    </div>
                    <div 
                      @click="handleCardClick"
                      class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                      <h4 class="font-semibold text-gray-900 mb-2">Jurisdiction</h4>
                      <p class="text-gray-700">Covers 1,785 square kilometres in the Southern Region of Malawi</p>
                    </div>
                    <div 
                      @click="handleCardClick"
                      class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                      <h4 class="font-semibold text-gray-900 mb-2">Population</h4>
                      <p class="text-gray-700">Blantyre District has a total population of 451,220 people, of which 218,464 (48.4 %) are males and 232,756 (51.6 %) are females (Population& Housing Census 2018).</p>
                    </div>
                    <div 
                      @click="handleCardClick"
                      class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                      <h4 class="font-semibold text-gray-900 mb-2">Structure</h4>
                      <p class="text-gray-700">Comprised of elected councillors and appointed technical staff</p>
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
                       @click="handleCardClick"
                       class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
                       @click="handleCardClick"
                       class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
                      <button 
                        @click="handleButtonClick($event, 'download')"
                        class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
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
                           @click="handleCardClick"
                           class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
                      <button 
                        @click="handleButtonClick($event, 'readmore')"
                        class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors hover:underline">
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

/* Prevent unwanted scrolling behavior */
.cursor-pointer {
  user-select: none;
}

/* Smooth scrolling behavior for the container */
.transition-container {
  scroll-behavior: smooth;
}
</style>