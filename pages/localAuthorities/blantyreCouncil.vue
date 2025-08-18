<script setup>
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import { ref, computed, watchEffect, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();

definePageMeta({
  title: 'Blantyre District Council'
})

// Set the default active tab to 'landing_page'
const activeTab = ref('landing_page')
const selectedProject = ref(null);
const isTransitioning = ref(false);


const tabs = ref([
    { id: 'landing_page', title: 'Blantyre district' },
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' }
])

// Map the 'tabs' data to the 'projectGroups' structure
const mappedProjectGroups = computed(() => {
  return [
    {
      group: 'Portfolio', // The desired group name
      items: tabs.value // The original tabs become items under this group
    }
  ];
});

// Use the composable to share the data
const { projectGroups } = useGeneralSidebar();
projectGroups.value = mappedProjectGroups.value;

// Use watchEffect to automatically update the shared state
watchEffect(() => {
  projectGroups.value = mappedProjectGroups.value;
});

// Function to update active tab based on URL hash
const updateActiveTabFromHash = (hash) => {
  const matchingTab = tabs.value.find(tab => tab.id === hash);
  if (matchingTab) {
    activeTab.value = matchingTab.id;
  }
};

// Watch block to react to URL hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''));
  }
});

// Enhanced tab switching with transition
const switchTab = (tabId, event = null) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  if (tabId === activeTab.value) return

  isTransitioning.value = true

  // Update the URL hash
  window.location.hash = tabId

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

// Function to show a specific project's details
const showProjectDetails = (projectId) => {
  const allProjects = [...projects, ...projectStats.value];
  selectedProject.value = allProjects.find(p => p.id === projectId);
  if (selectedProject.value) {
    switchTab('projects');
  }
};

// Set active tab to 'landing_page' on page load, regardless of URL hash
onMounted(() => {
  // Explicitly set the active tab to 'landing_page' to make it the landing page
  activeTab.value = 'landing_page';
})

const projects = [
  {
    id: 'GESD',
    name: 'GESD',
    fullName: 'Governance to Enable Service Delivery',
    description: 'Governance to Enable Service Delivery (GESD) project development objective is “to strengthen Local Authorities’ institutional performance, responsiveness to citizens and management of resources for service delivery.”',
    objectives: [
      'Strengthened institutional performance tracking of improvements in Local Authorities (LAs) institutional performance for service delivery',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans (AIPs',

    ],
    status: 'Active'
  },
  {
    id: 'SSRLP',
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
    id: 'MASAF',
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
  },
  {
    id: 'RCRP2',
    name: 'RCRP2',
    fullName: 'Resilient and Climate Ready Project Phase 2',
    description: 'A climate change adaptation program focused on building resilience in vulnerable communities through various initiatives.',
    objectives: [
      'Increase community-level resilience to climate shocks',
      'Promote climate-smart agricultural practices',
      'Strengthen early warning systems and disaster preparedness',
      'Integrate climate change adaptation into local development plans'
    ],
    status: 'Active'
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

const landing_page = [
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

// Static data for the projects statistics table
const projectStats = ref([
  {
    id: 'SSRLP',
    name: 'Social Support and Resilience Livelihoods Program',
    stats: [
      { label: 'Beneficiaries in CSEPW', value: '1,500' },
      { label: 'Beneficiaries of Social Cash', value: '2,500' }
    ],
    logo: '/images/samples/SSRLP logo(1).jpg'
  },
  {
    id: 'GESD',
    name: 'Governance to Enable Service Delivery',
    stats: [
      { label: 'Active Projects', value: '7' },
      { label: 'Wards Reached', value: '45' }
    ],
    logo: '/images/samples/RCRP LOGO- Final.png'
  },
  {
    id: 'RCRP2',
    name: 'Resilient and Climate Ready Project Phase 2',
    stats: [
      { label: 'Communities Served', value: '30' },
      { label: 'Adaptation Plans Developed', value: '15' }
    ],
    logo: '/images/samples/RCRP LOGO- Final.png'
  }
]);

// Slider state
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

const slides = [
  {
    image: '/images/samples/btz.jpeg',
    title: 'SSRLP mid-year review completed',
    summary: 'Key milestones achieved across all pillars; detailed report forthcoming.',
    date: '2024-06-20'
  },
  {
    image: '/images/samples/BANK.jpg',
    title: 'Additional livelihood grants disbursed',
    summary: 'Disbursements reached 3,000 households in priority districts.',
    date: '2024-05-14'
  },
  {
    image: '/images/samples/SSRPLP.jpg',
    title: 'Shock response window activated',
    summary: 'Activation supports drought-affected households with temporary assistance.',
    date: '2024-04-08'
  },
  {
    image: '/images/samples/btz.jpEg',
    title: 'CS-EPWP sites expanded',
    summary: 'New catchment restoration sites opened across 5 districts.',
    date: '2024-03-18'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetAutoplay()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
  resetAutoplay()
}

function goToSlide(index) {
  currentSlide.value = index
  resetAutoplay()
}

function resetAutoplay() {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    startAutoplay()
  }
}

function startAutoplay() {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    autoplayTimer = setInterval(() => {
      nextSlide()
    }, autoplayInterval.value)
  }
}

function toggleAutoplay() {
  autoplay.value = !autoplay.value
  if (autoplay.value) startAutoplay()
  else clearInterval(autoplayTimer)
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  clearInterval(autoplayTimer)
})
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <NuxtLink
                :to="`#${tab.id}`"
                @click="switchTab(tab.id)"
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

      <div class="flex-1 min-w-0">
        <div v-show="activeTab === 'profile'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Blantyre District Council Profile</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-xl border emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                About Blantyre District Council
              </h3>
              <p class="text-gray-700 leading-relaxed line-clamp-4">
                Blantyre District is the largest district in the Central Region of Malawi. It is bordered by Dedza District to the East, Salima to the North East. Mchinji District marks the western boundary. Dowa District lies to the north of Blantyre with Kasungu to its North-western tip and the Republic of Mozambique to the South West. The total land area is 6,159 square kilometres, representing 6.5 % of Malawi’s total land area.
              </p>
              <button @click="handleButtonClick($event, 'readmore')" class="mt-4 text-blue-600 font-semibold hover:underline transition-colors">Read More</button>
            </div>

            <div class=" p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" /></svg>
                Mandate
              </h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Policy making, coordination and supervision of development programs/projects...</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Reviewing, approving or rejecting proposed projects identified by the community...</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Making resolutions regarding implementation of management functions of the Secretariat...</span>
                </li>
              </ul>
            </div>

            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Vision
              </h3>
              <p class="text-gray-700 leading-relaxed font-medium line-clamp-2">
                The vision of the district is “A self- reliant district with growing socio-economic development”.
              </p>
            </div>

            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                Core Values
              </h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Transparency and accountability: ...</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Integrity: the council shall act with honesty...</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span>Client focused: the client shall be served...</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'projects'" class="prose max-w-none">
          <div v-if="selectedProject">
            <button @click="selectedProject = null" class="mb-4 inline-flex items-center text-blue-600 hover:underline transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              Back to All Projects
            </button>
            <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ selectedProject.fullName }}</h2>
                  <p class="text-gray-600 font-medium">{{ selectedProject.name }}</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {{ selectedProject.status }}
                </span>
              </div>
              <p class="text-gray-700 mb-4">{{ selectedProject.description }}</p>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Key Objectives:</h4>
                <ul class="space-y-1">
                  <li v-for="objective in selectedProject.objectives" :key="objective" class="flex items-start">
                    <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span class="text-gray-700">{{ objective }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="project in projectStats"
                :key="project.id"
                class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                @click="showProjectDetails(project.id)"
              >
                <div class="flex items-center gap-4 mb-4">
                  <img :src="project.logo" :alt="project.name + ' Logo'" class="w-12 h-12 flex-shrink-0" />
                  <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">{{ project.id }}</span>
                    <p class="text-sm font-medium text-gray-700">{{ project.name }}</p>
                  </div>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="stat in project.stats"
                    :key="stat.label"
                    class="flex justify-between items-center bg-white p-4 rounded-lg shadow-inner border border-blue-100"
                  >
                    <span class="text-sm font-semibold text-gray-600">{{ stat.label }}</span>
                    <span class="text-lg font-bold text-blue-600">{{ stat.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'news'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">News & Updates</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="news in landing_page" :key="news.title" class="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <div class="flex-grow">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ news.title }}</h3>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    {{ news.category }}
                  </span>
                </div>
                <p class="text-gray-600 mb-2 line-clamp-3">{{ news.summary }}</p>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">Published: {{ new Date(news.date).toLocaleDateString() }}</span>
                <button @click="handleButtonClick($event, 'readmore')"class="px-4 py-2  text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  Read More
                </button>
              </div>
            </div>
          </div>
          
          <!-- Additional News Section -->
          <div class="mt-12">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Latest Announcements</h3>
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-semibold text-gray-900">Council Budget Approval</h4>
                    <p class="text-gray-600 text-sm mt-1">The 2024/2025 budget has been approved with focus on infrastructure development and service delivery.</p>
                  </div>
                  <span class="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-green-600">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-semibold text-gray-900">New Market Construction</h4>
                    <p class="text-gray-600 text-sm mt-1">Construction of the new Limbe Market has commenced with completion expected in Q2 2025.</p>
                  </div>
                  <span class="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-600">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-semibold text-gray-900">Youth Empowerment Program</h4>
                    <p class="text-gray-600 text-sm mt-1">Applications are now open for the 2024 Youth Skills Development Program targeting 500 beneficiaries.</p>
                  </div>
                  <span class="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'reports'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Reports & Documents</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="report in reports" :key="report.title" class="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <div class="flex-grow">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ report.title }}</h3>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {{ report.type }}
                  </span>
                </div>
                <p class="text-gray-600 mb-2 line-clamp-3">{{ report.description }}</p>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">Published: {{ new Date(report.date).toLocaleDateString() }}</span>
                <button @click="handleButtonClick($event, 'download')" class="px-4 py-2 bg-emerald-700 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'landing_page'" class="prose max-w-none">
          <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="space-y-10">
              <section class="relative overflow-hidden rounded-xl shadow-2xl h-[360px] md:h-[420px]">
                <div
                  v-for="(slide, index) in slides"
                  :key="index"
                  class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
                >
                  <div class="absolute inset-0">
                    <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div class="relative h-full flex flex-col justify-end z-10 pb-12">
                    <div class="px-6">
                      <div class="mb-3">
                        <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                          SSRLP News
                        </span>
                      </div>
                      <div class="max-w-3xl">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ slide.title }}</h2>
                        <p class="text-white/90">{{ slide.summary }}</p>
                      </div>
                      <div class="mt-5">
                        <a href="#" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:bg-gray-800 transition">
                          Read More
                          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
                  <div class="px-6 flex items-center justify-between">
                    <div class="flex space-x-2">
                      <button
                        v-for="(slide, idx) in slides"
                        :key="'ind-' + idx"
                        @click="goToSlide(idx)"
                        class="w-3 h-3 rounded-full transition-all duration-300"
                        :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
                      ></button>
                    </div>
                    <div class="flex items-center space-x-4">
                      <button @click="toggleAutoplay" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        </svg>
                      </button>
                      <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section class="grid md:grid-cols-3 gap-6">
                <article
                  v-for="(slide, nIdx) in slides.slice(1)"
                  :key="'rel-'+nIdx"
                  class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      :src="slide.image"
                      :alt="slide.title"
                      class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    >
                  </div>

                  <div class="p-5">
                    <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {{ new Date(slide.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                    </span>
                    <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <a href="#">{{ slide.title }}</a>
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ slide.summary }}</p>
                    <a href="#" class="mt-3 inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read more
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </article>
              </section>

              <section class="mt-10">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Ongoing Projects Key Statistics</h3>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div
                    v-for="project in projectStats"
                    :key="project.id"
                    class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                    @click="showProjectDetails(project.id)"
                  >
                    <div class="flex items-center gap-4 mb-4">
                      <img :src="project.logo" :alt="project.name + ' Logo'" class="w-12 h-12 flex-shrink-0" />
                      <div>
                        <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">{{ project.id }}</span>
                        <p class="text-sm font-medium text-gray-700">{{ project.name }}</p>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <div
                        v-for="stat in project.stats"
                        :key="stat.label"
                        class="flex justify-between items-center bg-white p-4 rounded-lg shadow-inner border border-blue-100"
                      >
                        <span class="text-sm font-semibold text-gray-600">{{ stat.label }}</span>
                        <span class="text-lg font-bold text-blue-600">{{ stat.value }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>