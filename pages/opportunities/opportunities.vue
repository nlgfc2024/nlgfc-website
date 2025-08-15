<script setup>
import { ref, onMounted, watch, computed } from 'vue';
// Import GeneralSidebar component
import GeneralSidebar from '../components/GeneralSidebar.vue'; // Adjusted path as needed

// Meta information
definePageMeta({
  title: 'Opportunities'
})

// Define the sections for the GeneralSidebar, matching the 'opportunities' type structure
const opportunitySections = [
  {
    id: 'procurement',
    name: 'Procurement Portal',
    icon: 'heroicons:document-text', // Icon name for GeneralSidebar's getIconPath
    description: 'Tenders, RFQs, and procurement notices'
  },
  {
    id: 'jobs',
    name: 'Job Opportunities',
    icon: 'heroicons:briefcase', // Icon name
    description: 'Current job openings and career opportunities'
  }
  // If 'jobport' and 'supplyport' represent distinct content sections within this page,
  // they would also be added here as separate objects. For now, assuming they refer
  // to the primary 'jobs' and 'procurement' content.
]

// Reactive data
const activeTab = ref('procurement') // Controls which main content section is displayed
const searchQuery = ref('')
const selectedFilters = ref({
  type: '',
  status: '',
  department: '',
  location: ''
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(5)

// State for sidebar visibility (controlled by GeneralSidebar and passed via prop)
const isSidebarOpen = ref(true); // Default to open

// Get section from query params
const route = useRoute()
const router = useRouter()

// Watch for hash changes and update activeTab accordingly
const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '')
  if (hash === 'jobs' || hash === 'job-opportunities') {
    activeTab.value = 'jobs'
  } else if (hash === 'procurement' || hash === 'procurement-notices') {
    activeTab.value = 'procurement'
  }
}

onMounted(() => {
  // Handle initial route params
  if (route.query.section) {
    activeTab.value = route.query.section
  }
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
  if (route.query.limit) {
    itemsPerPage.value = parseInt(route.query.limit)
  }
  
  // Handle hash on mount
  handleHashChange()
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})


// Watch for route query changes
watch(() => route.query.section, (newSection) => {
  if (newSection && newSection !== activeTab.value) {
    activeTab.value = newSection
  }
})

// Enhanced watch for changes - updates both URL query params and hash
watch([activeTab, currentPage, itemsPerPage], ([newTab]) => {
  // Update URL with both query params and hash
  const newQuery = {
    ...route.query,
    section: newTab,
    page: currentPage.value,
    limit: itemsPerPage.value
  }
  
  // Update hash based on active tab
  const hash = newTab === 'jobs' ? '#job-opportunities' : '#procurement-notices'
  
  // Use replace to avoid creating too many history entries
  router.replace({
    query: newQuery,
    hash: hash
  })
}, { immediate: false })

// Enhanced tab switching function
const switchTab = (tab) => {
  activeTab.value = tab
  currentPage.value = 1 // Reset pagination when switching tabs
  
  // Force component reactivity by updating a key if needed
  nextTick(() => {
    // Scroll to top of content area when switching tabs
    const contentElement = document.querySelector('#opportunities-content')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

// Navigation helper functions for external use (if this component is exposed)
const navigateToJobs = () => {
  router.push({
    path: '/opportunities',
    query: { section: 'jobs' },
    hash: '#job-opportunities'
  })
}

const navigateToProcurement = () => {
  router.push({
    path: '/opportunities',
    query: { section: 'procurement' },
    hash: '#procurement-notices'
  })
}

// Expose navigation functions globally for navbar usage (if this is relevant for your app structure)
defineExpose({
  navigateToJobs,
  navigateToProcurement,
  switchTab
})

// Utility functions
const isExpired = (dateString) => {
  return new Date(dateString) < new Date()
}

const getStatus = (expiryDate) => {
  return isExpired(expiryDate) ? 'expired' : 'active'
}

// Sample data for procurement notices
const procurementNotices = ref([
  {
    id: 1,
    title: 'Supply and Delivery of Office Equipment',
    type: 'RFQ',
    department: 'Administration',
    publishDate: '2025-04-15',
    expiryDate: '2025-08-15',
    estimatedValue: 'MWK 2,500,000',
    description: 'NLGFC invites qualified suppliers to submit quotations for the supply and delivery of office equipment including computers, printers, and furniture.',
    documents: [
      { name: 'RFQ Document', type: 'pdf', url: '/documents/rfq-office-equipment.pdf' },
      { name: 'Technical Specifications', type: 'pdf', url: '/documents/tech-specs.pdf' }
    ]
  },
  {
    id: 2,
    title: 'Consultancy Services for Financial Management System',
    type: 'RFP',
    department: 'ICT',
    publishDate: '2024-01-10',
    expiryDate: '2025-02-28',
    estimatedValue: 'MWK 15,000,000',
    description: 'NLGFC seeks to engage a qualified consultant to develop and implement a comprehensive financial management system.',
    documents: [
      { name: 'RFP Document', type: 'pdf', url: '/documents/rfp-financial-system.pdf' },
      { name: 'Terms of Reference', type: 'pdf', url: '/documents/tor-financial-system.pdf' }
    ]
  },
  {
    id: 3,
    title: 'Construction of Regional Office Building',
    type: 'Tender',
    department: 'Infrastructure',
    publishDate: '2023-12-01',
    expiryDate: '2024-01-05',
    estimatedValue: 'MWK 50,000,000',
    description: 'Construction of a two-story regional office building in Blantyre to accommodate NLGFC regional operations.',
    documents: [
      { name: 'Tender Document', type: 'pdf', url: '/documents/tender-office-building.pdf' },
      { name: 'Architectural Drawings', type: 'pdf', url: '/documents/drawings.pdf' }
    ]
  }
])

// Sample data for job opportunities
const jobOpportunities = ref([
  {
    id: 1,
    title: 'Senior Financial Analyst',
    department: 'Finance',
    location: 'Lilongwe',
    type: 'Permanent',
    publishDate: '2024-01-20',
    expiryDate: '2025-02-20',
    salary: 'MWK 800,000 - 1,200,000',
    description: 'We are seeking a qualified Senior Financial Analyst to join our Finance team. The successful candidate will be responsible for financial planning, analysis, and reporting.',
    requirements: [
      'Bachelor\'s degree in Finance, Accounting, or related field',
      'Minimum 5 years of experience in financial analysis',
      'Professional certification (ACCA, CPA, or equivalent)',
      'Strong analytical and communication skills',
      'Proficiency in financial software and MS Excel'
    ],
    responsibilities: [
      'Prepare financial reports and analysis',
      'Support budget preparation and monitoring',
      'Conduct variance analysis and provide recommendations',
      'Assist in financial planning and forecasting'
    ]
  },
  {
    id: 2,
    title: 'Project Coordinator - SSRLP',
    department: 'Projects',
    location: 'Lilongwe',
    type: 'Contract',
    publishDate: '2024-01-18',
    expiryDate: '2025-02-18',
    salary: 'MWK 600,000 - 900,000',
    description: 'NLGFC is looking for a Project Coordinator to support the implementation of the Social Support for Resilient Livelihoods Project (SSRLP).',
    requirements: [
      'Bachelor\'s degree in Development Studies, Social Sciences, or related field',
      'Minimum 3 years of project management experience',
      'Experience with World Bank or donor-funded projects',
      'Strong organizational and communication skills',
      'Ability to work in rural areas'
    ],
    responsibilities: [
      'Coordinate project implementation activities',
      'Monitor project progress and prepare reports',
      'Liaise with stakeholders and beneficiaries',
      'Support capacity building activities'
    ]
  },
  {
    id: 3,
    title: 'ICT Systems Administrator',
    department: 'ICT',
    location: 'Lilongwe',
    type: 'Permanent',
    publishDate: '2023-12-15',
    expiryDate: '2024-01-15',
    salary: 'MWK 500,000 - 750,000',
    description: 'We are seeking an experienced ICT Systems Administrator to manage and maintain our IT infrastructure.',
    requirements: [
      'Bachelor\'s degree in Computer Science, IT, or related field',
      'Minimum 3 years of systems administration experience',
      'Experience with Windows Server, Linux, and network administration',
      'Knowledge of database management',
      'Strong problem-solving skills'
    ],
    responsibilities: [
      'Manage and maintain IT infrastructure',
      'Provide technical support to users',
      'Implement security measures and backup procedures',
      'Monitor system performance and troubleshoot issues'
    ]
  }
])

// Computed properties for filtering
const filteredProcurement = computed(() => {
  let filtered = procurementNotices.value.map(notice => ({
    ...notice,
    status: getStatus(notice.expiryDate)
  }))

  if (searchQuery.value) {
    filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedFilters.value.type) {
    filtered = filtered.filter(notice => notice.type === selectedFilters.value.type)
  }

  if (selectedFilters.value.status) {
    filtered = filtered.filter(notice => notice.status === selectedFilters.value.status)
  }

  if (selectedFilters.value.department) {
    filtered = filtered.filter(notice => notice.department === selectedFilters.value.department)
  }

  return filtered
})

const filteredJobs = computed(() => {
  let filtered = jobOpportunities.value.map(job => ({
    ...job,
    status: getStatus(job.expiryDate)
  }))

  if (searchQuery.value) {
    filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedFilters.value.type) {
    filtered = filtered.filter(job => job.type === selectedFilters.value.type)
  }

  if (selectedFilters.value.status) {
    filtered = filtered.filter(job => job.status === selectedFilters.value.status)
  }

  if (selectedFilters.value.department) {
    filtered = filtered.filter(job => job.department === selectedFilters.value.department)
  }

  if (selectedFilters.value.location) {
    filtered = filtered.filter(job => job.location === selectedFilters.value.location)
  }

  return filtered
})

// Get current items based on active tab
const currentItems = computed(() => {
  return activeTab.value === 'procurement' ? filteredProcurement.value : filteredJobs.value
})

// Paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return currentItems.value.slice(start, end)
})

// Reset pagination when filters change
watch([searchQuery, selectedFilters, activeTab], () => {
  currentPage.value = 1
}, { deep: true })

// Methods
const clearFilters = () => {
  selectedFilters.value = {
    type: '',
    status: '',
    department: '',
    location: ''
  }
  searchQuery.value = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'expired':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const downloadDocument = (url, filename) => {
  // In a real application, this would handle the actual download
  console.log(`Downloading: ${filename} from ${url}`)
  // You can implement actual download logic here
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-blue-900 text-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Opportunities</h1>
        <p class="text-xl text-blue-100">Explore procurement notices and career opportunities at NLGFC</p>
      </div>
    </div>

    <!-- Main Content Wrapper with Sidebar and content area -->
    <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
      <!-- General Sidebar Component -->
      <GeneralSidebar
        sidebarType="opportunities"
        :sectionsData="opportunitySections"
        :activeId="activeTab"
        sidebarTitle="Browse Opportunities"
        :sidebarOpen="isSidebarOpen"
        @update:activeId="activeTab = $event"
        @update:sidebarOpen="isSidebarOpen = $event"
      />

      <!-- Main content area -->
      <main
        id="opportunities-content"
        :class="[
          'flex-1 min-w-0 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'md:ml-72' : 'md:ml-12' // Adjust ml-12 if your toggle button is narrower
        ]"
      >
        <!-- Search and Filters (Moved inside main content) -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search opportunities..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <!-- Type Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ activeTab === 'procurement' ? 'Type' : 'Employment Type' }}
              </label>
              <select
                  v-model="selectedFilters.type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <template v-if="activeTab === 'procurement'">
                  <option value="RFQ">RFQ</option>
                  <option value="RFP">RFP</option>
                  <option value="Tender">Tender</option>
                </template>
                <template v-else>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                </template>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                  v-model="selectedFilters.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Department Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                  v-model="selectedFilters.department"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Departments</option>
                <option value="Administration">Administration</option>
                <option value="Finance">Finance</option>
                <option value="ICT">ICT</option>
                <option value="Projects">Projects</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <!-- Location Filter (Jobs only) -->
            <div v-if="activeTab === 'jobs'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                  v-model="selectedFilters.location"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Locations</option>
                <option value="Lilongwe">Lilongwe</option>
                <option value="Blantyre">Blantyre</option>
                <option value="Mzuzu">Mzuzu</option>
                <option value="Zomba">Zomba</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <div class="flex items-end">
              <button
                  @click="clearFilters"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Results Header -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                {{ activeTab === 'procurement' ? 'Procurement Notices' : 'Job Opportunities' }}
              </h2>
              <p class="text-sm text-gray-600 mt-1">
                {{ currentItems.length }} {{ currentItems.length === 1 ? 'opportunity' : 'opportunities' }} found
              </p>
            </div>

            <!-- Quick Stats -->
            <div class="flex items-center space-x-4 text-sm">
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-gray-600">
                  {{ currentItems.filter(item => item.status === 'active').length }} Active
                </span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <span class="text-gray-600">
                  {{ currentItems.filter(item => item.status === 'expired').length }} Expired
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Procurement notices Content -->
        <div v-if="activeTab === 'procurement'">
          <div class="space-y-6">
            <div
                v-for="notice in paginatedItems"
                :key="notice.id"
                class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ notice.title }}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center">
                      <Icon name="heroicons:building-office" class="w-4 h-4 mr-1" />
                      {{ notice.department }}
                    </span>
                    <span class="flex items-center">
                      <Icon name="heroicons:currency-dollar" class="w-4 h-4 mr-1" />
                      {{ notice.estimatedValue }}
                    </span>
                    <span class="flex items-center">
                      <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                      Published: {{ formatDate(notice.publishDate) }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span
                      :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusColor(notice.status)
                    ]"
                  >
                    {{ notice.status.charAt(0).toUpperCase() + notice.status.slice(1) }}
                  </span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {{ notice.type }}
                  </span>
                </div>
              </div>

              <p class="text-gray-700 mb-4">{{ notice.description }}</p>

              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-600">
                    <Icon name="heroicons:clock" class="w-4 h-4 inline mr-1" />
                    Expires: {{ formatDate(notice.expiryDate) }}
                  </span>
                  <div class="flex items-center space-x-2">
                    <Icon name="heroicons:document-arrow-down" class="w-4 h-4 text-gray-500" />
                    <span class="text-sm text-gray-600">{{ notice.documents.length }} Documents</span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                      v-for="doc in notice.documents"
                      :key="doc.name"
                      @click="downloadDocument(doc.url, doc.name)"
                      class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 inline mr-1" />
                    {{ doc.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- No results message for procurement -->
            <div v-if="filteredProcurement.length === 0" class="text-center py-12">
              <Icon name="heroicons:document-magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No procurement notices found</h3>
              <p class="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          </div>
        </div>

        <!-- Job Listings Content -->
        <div v-if="activeTab === 'jobs'">
          <div class="space-y-6">
            <div
                v-for="job in paginatedItems"
                :key="job.id"
                class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ job.title }}</h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center">
                      <Icon name="heroicons:building-office" class="w-4 h-4 mr-1" />
                      {{ job.department }}
                    </span>
                    <span class="flex items-center">
                      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                      {{ job.location }}
                    </span>
                    <span class="flex items-center">
                      <Icon name="heroicons:currency-dollar" class="w-4 h-4 mr-1" />
                      {{ job.salary }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span
                      :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusColor(job.status)
                    ]"
                  >
                    {{ job.status.charAt(0).toUpperCase() + job.status.slice(1) }}
                  </span>
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    {{ job.type }}
                  </span>
                </div>
              </div>

              <p class="text-gray-700 mb-4">{{ job.description }}</p>

              <!-- Job Details Accordion -->
              <div class="border-t border-gray-200 pt-4">
                <details class="group">
                  <summary class="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>View Job Details</span>
                    <Icon name="heroicons:chevron-down" class="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div class="mt-4 space-y-4">
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                      <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li v-for="responsibility in job.responsibilities" :key="responsibility">
                          {{ responsibility }}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li v-for="requirement in job.requirements" :key="requirement">
                          {{ requirement }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>

              <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-600">
                    <Icon name="heroicons:calendar" class="w-4 h-4 inline mr-1" />
                    Published: {{ formatDate(job.publishDate) }}
                  </span>
                  <span class="text-sm text-gray-600">
                    <Icon name="heroicons:clock" class="w-4 h-4 inline mr-1" />
                    Expires: {{ formatDate(job.expiryDate) }}
                  </span>
                </div>
                <button
                    v-if="job.status === 'active'"
                    class="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Icon name="heroicons:paper-airplane" class="w-4 h-4 inline mr-2" />
                  Apply Now
                </button>
                <span
                    v-else
                    class="px-6 py-2 bg-gray-300 text-gray-500 font-medium rounded-md cursor-not-allowed"
                >
                  Application Closed
                </span>
              </div>
            </div>

            <!-- No results message for jobs -->
            <div v-if="filteredJobs.length === 0" class="text-center py-12">
              <Icon name="heroicons:briefcase" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No job opportunities found</h3>
              <p class="text-gray-600">Try adjusting your search criteria or check back later for new positions.</p>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="currentItems.length > 0" class="mt-8">
          <Pagination
              v-model:current-page="currentPage"
              v-model:items-per-page="itemsPerPage"
              :total-items="currentItems.length"
          />
        </div>

        <!-- Information Section -->
        <div class="mt-12 bg-blue-50 rounded-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-if="activeTab === 'procurement'">
              <h3 class="text-xl font-semibold text-blue-900 mb-4">Procurement Information</h3>
              <div class="space-y-3 text-sm text-blue-800">
                <p><strong>Submission Guidelines:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>All submissions must be received before the specified deadline</li>
                  <li>Late submissions will not be considered</li>
                  <li>Ensure all required documents are included</li>
                  <li>Submissions should be sealed and clearly marked</li>
                </ul>
              </div>
            </div>
            <div v-else>
              <h3 class="text-xl font-semibold text-blue-900 mb-4">Application Information</h3>
              <div class="space-y-3 text-sm text-blue-800">
                <p><strong>How to Apply:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Submit your CV and cover letter</li>
                  <li>Include copies of relevant certificates</li>
                  <li>Provide contact details for three references</li>
                  <li>Applications must be received before the deadline</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-blue-900 mb-4">Contact Information</h3>
              <div class="space-y-2 text-sm text-blue-800">
                <p class="flex items-center">
                  <Icon name="heroicons:envelope" class="w-4 h-4 mr-2" />
                  <span v-if="activeTab === 'procurement'">procurement@nlgfc.gov.mw</span>
                  <span v-else>hr@nlgfc.gov.mw</span>
                </p>
                <p class="flex items-center">
                  <Icon name="heroicons:phone" class="w-4 h-4 mr-2" />
                  +265 1 770 244
                </p>
                <p class="flex items-center">
                  <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
                  NLGFC Offices, Capital Hill, Lilongwe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for better UX */
details summary::-webkit-details-marker {
  display: none;
}

details summary {
  list-style: none;
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}
</style>
