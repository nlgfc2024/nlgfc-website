<script setup>
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import { ref, computed, watchEffect, watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue' // Added onUnmounted
import { useRoute } from 'vue-router';
const route = useRoute();

definePageMeta({
  title: 'Blantyre District Council'
})

// Reactive data
const activeTab = ref('landing_page')
const selectedProject = ref(null);
const selectedArticle = ref(null); // Renamed from selectedNews for consistency with new template
const searchQuery = ref(''); // New ref for search functionality
const isTransitioning = ref(false);
const showModal = ref(false);
const activeModal = ref('');
const modalTitle = ref('');


const tabs = ref([
  { id: 'landing_page', title: 'Blantyre district' },
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' } // This tab will now use the new comprehensive layout
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

// Modal functions (kept as-is, not directly related to news section)
const openModal = (type) => {
  activeModal.value = type;
  showModal.value = true;

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

// Handle button clicks without scrolling (kept as-is)
const handleButtonClick = (event, action = null) => {
  event.preventDefault()
  event.stopPropagation()

  if (action === 'download') {
    console.log('Download initiated')
  } else if (action === 'readmore') {
    console.log('Read more clicked')
  }
}

// Function to show a specific project's details (kept as-is)
const showProjectDetails = (projectId) => {
  const allProjects = [...projects, ...projectStats.value];
  selectedProject.value = allProjects.find(p => p.id === projectId);
  if (selectedProject.value) {
    switchTab('projects');
  }
};

// Data for projects and reports (kept as-is)
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
    date: '2024-12-15'
  },
  {
    title: 'District Development Plan 2023-2027',
    type: 'Strategic Plan',
    date: '2023-01-20'
  },
  {
    title: 'Revenue Collection Report Q4 2024',
    type: 'Financial Report',
    date: '2024-10-30'
  },
  {
    title: 'Infrastructure Development Progress Report',
    type: 'Progress Report',
    date: '2024-11-15'
  }
]

// NEW: Comprehensive news articles data (replaces old landing_page data for news)
const newsArticles = ref([
  {
    id: 1,
    title: 'Government Launches New Rural Development Initiative',
    summary: 'The new program aims to improve infrastructure and access to clean water in several key districts, with funding secured from international partners.',
    content: `
      <p>The Government of Malawi has announced the launch of a comprehensive rural development initiative that promises to transform the lives of thousands of citizens across multiple districts. This ambitious program, funded through partnerships with international development organizations, focuses on critical infrastructure improvements and enhanced access to clean water.</p>
      
      <p>The initiative, which has been in planning for over two years, will target rural communities that have historically faced challenges in accessing basic services. Key components include:</p>
      
      <ul>
        <li>Construction of new water points and rehabilitation of existing boreholes</li>
        <li>Road infrastructure improvements to connect remote villages</li>
        <li>Solar-powered community centers for education and health services</li>
        <li>Agricultural support programs for smallholder farmers</li>
      </ul>
      
      <p>Minister of Local Government announced that the program will be implemented over a three-year period, with the first phase targeting five districts in the northern region. The initiative represents a significant investment in rural infrastructure and is expected to directly benefit over 50,000 households.</p>
      
      <p>"This program represents our commitment to ensuring that no Malawian is left behind in our development agenda," said the Minister during the launch ceremony. "By improving infrastructure and access to basic services, we are creating opportunities for economic growth and improved quality of life in rural areas."</p>
    `,
    image: '/images/samples/news1.jpg',
    date: '2025-08-15',
    author: 'Sarah Mwale',
    source: 'Malawi News Agency',
    tags: ['Rural Development', 'Infrastructure', 'Water', 'Government']
  },
  {
    id: 2,
    title: 'NLGFC Announces Increased Funding for Local Councils',
    summary: 'In a move to bolster local governance, the National Local Government Finance Committee has approved a 15% budget increase for all district councils for the next fiscal year.',
    content: `
      <p>The National Local Government Finance Committee (NLGFC) has announced a significant 15% increase in funding allocation for all district councils across Malawi for the upcoming fiscal year. This decision marks the largest single-year increase in local government funding in over a decade.</p>
      
      <p>The increased allocation is designed to strengthen local governance capacity and improve service delivery at the grassroots level. District councils will have greater resources to address local priorities and respond more effectively to community needs.</p>
      
      <p>Key areas that will benefit from the increased funding include:</p>
      
      <ul>
        <li>Primary healthcare facilities and equipment</li>
        <li>Education infrastructure and learning materials</li>
        <li>Road maintenance and rural connectivity projects</li>
        <li>Water and sanitation programs</li>
        <li>Agricultural extension services</li>
      </ul>
      
      <p>The NLGFC Chairman emphasized that the increase comes with enhanced accountability measures to ensure funds are used effectively and transparently. All councils will be required to submit quarterly progress reports and undergo regular audits.</p>
    `,
    image: '/images/samples/news2.jpg',
    date: '2025-08-12',
    author: 'James Banda',
    source: 'The Daily Times',
    tags: ['NLGFC', 'Funding', 'Local Government', 'Budget']
  },
  {
    id: 3,
    title: 'Blantyre City Council Unveils New Waste Management Strategy',
    summary: 'A new comprehensive strategy for waste management was unveiled today, focusing on recycling and community participation to create a cleaner city.',
    content: `
      <p>Blantyre City Council has launched an innovative waste management strategy that aims to revolutionize how the commercial capital handles solid waste. The comprehensive plan emphasizes community participation, recycling initiatives, and sustainable waste disposal methods.</p>
      
      <p>The new strategy introduces several groundbreaking components including community-based waste collection systems, establishment of recycling centers in each of the city's 30 wards, and partnerships with private sector players in waste management.</p>
      
      <p>Mayor John Chimbwandira outlined the key pillars of the strategy during the launch event at the Civic Centre. The initiative includes:</p>
      
      <ul>
        <li>Door-to-door waste collection services in all residential areas</li>
        <li>Installation of modern waste sorting facilities</li>
        <li>Public awareness campaigns on waste reduction and recycling</li>
        <li>Establishment of community composting sites</li>
        <li>Strict enforcement of waste management bylaws</li>
      </ul>
      
      <p>The Council has allocated K2.5 billion for the first phase of implementation, which will run for 18 months. Citizens are encouraged to participate actively in the program by properly sorting their waste and utilizing designated collection points.</p>
    `,
    image: '/images/samples/news3.jpg',
    date: '2025-08-10',
    author: 'Grace Phiri',
    source: 'Blantyre City Council',
    tags: ['Waste Management', 'Blantyre', 'Environment', 'Recycling']
  },
  {
    id: 4,
    title: 'New Healthcare Initiative Launched in Northern Region',
    summary: 'A comprehensive healthcare program targeting maternal and child health has been launched in five northern districts.',
    content: `<p>A new healthcare initiative focusing on maternal and child health has been launched in the northern region, targeting five key districts. The program aims to reduce maternal and infant mortality rates through improved access to quality healthcare services and community health education programs.</p>
    
    <p>The initiative includes the establishment of new health centers, training of community health workers, and provision of essential medical equipment and supplies. Special focus is being placed on remote areas that have historically had limited access to healthcare services.</p>
    
    <p>Dr. Mary Kamanga, who is leading the program implementation, emphasized the importance of community participation in ensuring the success of the initiative. "We are not just building facilities, we are building a healthcare system that works for everyone," she said during the launch ceremony.</p>`,
    image: '/images/samples/news1.jpg',
    date: '2025-08-08',
    author: 'Dr. Mary Kamanga',
    source: 'Ministry of Health',
    tags: ['Healthcare', 'Northern Region', 'Maternal Health']
  },
  {
    id: 5,
    title: 'Education Sector Receives Technology Boost',
    summary: 'Government partners with tech companies to provide digital learning tools to rural schools.',
    content: `<p>The education sector has received a significant technology boost with the government partnering with leading technology companies to provide digital learning tools to rural schools across the country. This initiative aims to bridge the digital divide and ensure that students in remote areas have access to modern learning resources.</p>
    
    <p>The program will see the installation of solar-powered computer labs in 200 rural schools over the next two years. Each lab will be equipped with tablets, educational software, and internet connectivity to enable students to access online learning materials.</p>
    
    <p>Peter Mvula from the Ministry of Education highlighted that this represents a major step forward in modernizing education delivery in Malawi. Teachers will also receive training on how to effectively integrate technology into their teaching methods.</p>`,
    image: '/images/samples/news2.jpg',
    date: '2025-08-05',
    author: 'Peter Mvula',
    source: 'Ministry of Education',
    tags: ['Education', 'Technology', 'Rural Schools']
  },
  {
    id: 6,
    title: 'Agricultural Support Program Shows Promising Results',
    summary: 'Early indicators suggest the new agricultural support program is improving crop yields across the country.',
    content: `<p>The agricultural support program launched earlier this year is showing promising results, with early indicators suggesting significant improvements in crop yields across participating districts. The program focuses on providing farmers with improved seeds, fertilizers, and training on modern farming techniques.</p>
    
    <p>Initial assessments conducted in pilot areas show an average increase of 30% in maize production and 45% in legume crops. The success is attributed to the comprehensive approach that combines input provision with farmer education and extension services.</p>
    
    <p>Agnes Msukwa from the Ministry of Agriculture noted that the program's success demonstrates the importance of supporting smallholder farmers with both resources and knowledge. Plans are underway to expand the program to additional districts in the next growing season.</p>`,
    image: '/images/samples/news3.jpg',
    date: '2025-08-03',
    author: 'Agnes Msukwa',
    source: 'Ministry of Agriculture',
    tags: ['Agriculture', 'Crop Yields', 'Support Program']
  }
]);


// Static data for the projects statistics table (kept as-is)
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
    logo: '/images/samples/PBG logo.png'
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

// Slider state (now used by the news section hero slider)
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

// Computed properties for news
const filteredArticles = computed(() => {
  let filtered = newsArticles.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date))

  return filtered
})

// Get featured articles for slider (first 3 articles)
const featuredArticles = computed(() => filteredArticles.value.slice(0, 3))

// Slider methods (adapted to featuredArticles)
const nextSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length
  resetAutoplay()
}

const prevSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value - 1 + featuredArticles.value.length) % featuredArticles.value.length
  resetAutoplay()
}

const goToSlide = (index) => {
  if (!featuredArticles.value.length) return
  currentSlide.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    startAutoplay()
  }
}

const startAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    autoplayTimer = setInterval(() => {
      nextSlide()
    }, autoplayInterval.value)
  }
}

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value
  if (autoplay.value) startAutoplay()
  else clearInterval(autoplayTimer)
}

// Methods for news section
const selectArticle = (article) => {
  selectedArticle.value = article
  // Update URL hash
  window.location.hash = article.id.toString()
  // Scroll to top on mobile/tablet
  if (window.innerWidth < 1024) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goBack = () => {
  selectedArticle.value = null
  // Clear the hash
  window.location.hash = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '')
  if (hash) {
    const articleId = parseInt(hash)
    const article = newsArticles.value.find(a => a.id === articleId)
    if (article) {
      selectedArticle.value = article
    }
  } else {
    selectedArticle.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  // Explicitly set the active tab to 'landing_page' to make it the landing page
  activeTab.value = 'landing_page';

  // Check if we have a hash in the URL for news articles
  handleHashChange()

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)

  // Start autoplay for slider on page load
  startAutoplay()
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  // Clean up autoplay timer
  clearInterval(autoplayTimer)
})

// Watch for changes in selected article to stop/start autoplay
watch(selectedArticle, (newVal) => {
  if (newVal) {
    // Stop autoplay when viewing an article
    clearInterval(autoplayTimer)
  } else {
    // Restart autoplay when back to main view (if autoplay is enabled)
    startAutoplay()
  }
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
                  'bg-blue-50 text-gray-800 font-medium border-l-4 border-l-gray-600': activeTab === tab.id
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

        <div v-show="activeTab === 'news'" class="prose max-w-none bg-gray-50">
          <div class="container mx-auto px-4 py-12">
            <div class="flex flex-col lg:flex-row gap-8">
              <div class="w-full">
                <div class="mb-6">
                    <div class="relative">
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search news..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                      <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                </div>

                <div v-if="selectedArticle">
                  <button
                    @click="goBack"
                    class="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to News
                  </button>

                  <article class="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <div v-if="selectedArticle.image" class="aspect-video w-full">
                      <img
                        :src="selectedArticle.image"
                        :alt="selectedArticle.title"
                        class="w-full h-full object-cover"
                      />
                    </div>

                    <div class="p-8">
                      <div class="flex items-center justify-between mb-4">
                        <time class="text-gray-500 text-sm">{{ formatDate(selectedArticle.date) }}</time>
                      </div>

                      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {{ selectedArticle.title }}
                      </h1>

                      <div class="flex items-center mb-6">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                          <div>
                            <p class="font-medium text-gray-900">{{ selectedArticle.author }}</p>
                            <p class="text-sm text-gray-500">{{ selectedArticle.source }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="prose max-w-none" v-html="selectedArticle.content"></div>

                      <div v-if="selectedArticle.tags" class="mt-8 pt-6 border-t border-gray-200">
                        <div class="flex flex-wrap gap-2">
                          <span class="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                          <span
                            v-for="tag in selectedArticle.tags"
                            :key="tag"
                            class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>

                      <div class="mt-8 pt-6 border-t border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                        <div class="flex space-x-4">
                          <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                              </svg>
                            Twitter
                          </button>
                          <button class="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                            Facebook
                          </button>
                          <button class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div v-if="!selectedArticle" class="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div class="bg-gray-900  px-6 py-4 h-10">
                    <p class="text-emerald-100 text-sm font-semibold">{{ filteredArticles.length }} Blantyre news</p>
                  </div>

                  <div class="max-h-96 overflow-y-auto">
                    <div
                      v-for="article in filteredArticles"
                      :key="article.id"
                      @click="selectArticle(article)"
                      :class="[
                        'p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50',
                        selectedArticle?.id === article.id ? 'bg-emerald-50 border-l-4 border-l-gray-900' : ''
                      ]"
                    >
                      <h4 class="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                        {{ article.title }}
                      </h4>
                      <div class="flex items-center justify-between text-xs text-gray-500">
                        <span>{{ formatDate(article.date) }}</span>
                        <span>{{ article.source }}</span>
                      </div>
                    </div>
                  </div>

                  <div v-if="filteredArticles.length === 0" class="p-6 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 12.272 5.13 11.638 5 11a8 8 0 118 8 7.956 7.956 0 01-4.709-1.534A7.956 7.956 0 0112 21a7.956 7.956 0 01-4.709-1.534"></path>
                    </svg>
                    <p class="text-sm">No articles found matching your search.</p>
                  </div>
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
                  v-for="(slide, index) in newsArticles.slice(0,3)"
                  :key="index"
                  class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
                >
                  <div class="absolute inset-0">
                    <img :src="slide.image || '/images/samples/news1.jpg'" :alt="slide.title" class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div class="relative h-full flex flex-col justify-end z-10 pb-12">
                    <div class="px-6">
                      <div class="mb-3">
                        <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                          Featured
                        </span>
                      </div>
                      <div class="max-w-3xl">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ slide.title }}</h2>
                        <p class="text-white/90">{{ slide.summary }}</p>
                      </div>
                      <div class="mt-5">
                        <a href="#" @click.prevent="selectArticle(slide)" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:bg-gray-800 transition">
                          Read More
                          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
                  <div class="px-6 flex items-center justify-between">
                    <div class="flex space-x-2">
                      <button
                        v-for="(slide, idx) in newsArticles.slice(0,3)"
                        :key="'ind-' + idx"
                        @click="goToSlide(idx)"
                        class="w-3 h-3 rounded-full transition-all duration-300"
                        :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
                      ></button>
                    </div>
                    <div class="flex items-center space-x-4">
                      <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section class="grid md:grid-cols-3 gap-6">
                <article
                  v-for="(article, nIdx) in newsArticles.slice(1, 4)"
                  :key="'rel-'+nIdx"
                  class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      :src="article.image || '/images/samples/news1.jpg'"
                      :alt="article.title"
                      class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    >
                  </div>
                  <div class="p-5">
                    <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {{ formatDate(article.date) }}
                    </span>
                    <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <a href="#" @click.prevent="selectArticle(article)">{{ article.title }}</a>
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ article.summary }}</p>
                    <a href="#" @click.prevent="selectArticle(article)" class="mt-3 inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
