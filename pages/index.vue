<script setup>
useHead({
  title: 'NLGFC - Home',
  meta: [
    { name: 'description', content: 'Welcome to our website' }
  ]
});

// Import utilities
const { getExcerpt, stripHtmlTags } = useHtmlUtils();

// Get runtime config for base URL
const config = useRuntimeConfig();
const apiBaseUrl = config.public.baseUrl || 'http://localhost:8000'

const fetchPaginatedEndpoint = (endpoint, page, perPage, extraQuery = {}) => {
  return $fetch(`${apiBaseUrl}${endpoint}`, {
    query: {
      per_page: perPage,
      page,
      ...extraQuery
    },
    timeout: 10000
  })
}

const props = defineProps({
  partnerLogos: {
    type: Array,
    required: true,
    validator: (logos) => logos.every(logo => logo.src && logo.alt)
  },
  scrollDuration: {
    type: Number,
    default: 20
  }
})

// Fetch partners using standard API composable
const { data: partners, loading, error, refresh: fetchPartners } = useApiDataArray(
  'partners',
  '/api/partners'
);

// Fetch latest posts using standard API composable
const { data: postsData, loading: postsLoading, error: postsError, refresh: fetchPosts } = useApiData(
  'latest-posts',
  '/api/posts/latest/3',
  {
    default: () => [],
    transform: (response) => Array.isArray(response) ? response : response?.data || []
  }
);

const publicationsPage = ref(1)
const publicationsPerPage = 5

const { data: documentsResponse, pending: publicationsLoading, error: publicationsError, refresh: fetchPublications } = useAsyncData(
  'homepage-documents-live',
  async () => {
    return await fetchPaginatedEndpoint('/api/documents', publicationsPage.value, publicationsPerPage)
  },
  {
    lazy: true,
    dedupe: 'defer',
    deep: false,
    default: () => ({
      data: [],
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: publicationsPerPage
    }),
    watch: [publicationsPage]
  }
)

const { data: donorProjectsData, loading: projectsLoading, error: projectsError, refresh: fetchProjects } = useDonorProjects({
  key: 'homepage-donor-projects',
  perPage: 100
})

// Transform API data to match component structure
const newsItems = computed(() => {
  if (!postsData.value || !Array.isArray(postsData.value)) return []
  
  const baseUrl = config.public.baseUrl || 'http://localhost:8000';
  
  return postsData.value.map((post) => ({
    id: post.id,
    title: post.title || '',
    content: getExcerpt(post.content, 150), // Strip HTML tags and get excerpt
    image: post.image 
      ? `${baseUrl}/storage/${post.image}` 
      : '/images/samples/default-news.jpg',
    date: post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    category: post.category?.name || 'News',
    link: `/news#${post.slug || post.id}`,
    readTime: '3 min read',
    slug: post.slug
  }))
})

const activeTab = ref('procurements')
const opportunitiesPerPage = 5
const procurementPage = ref(1)
const jobsPage = ref(1)
const hasLoadedJobsTab = ref(false)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const donorFundedProjects = computed(() => {
  if (!Array.isArray(donorProjectsData.value) || donorProjectsData.value.length === 0) {
    return []
  }

  const baseUrl = config.public.baseUrl || 'http://localhost:8000'

  const toStorageUrl = (path) => {
    if (!path || typeof path !== 'string') return ''
    if (path.startsWith('http')) return path
    return `${baseUrl}/storage/${path}`
  }

  return donorProjectsData.value
    .map((project) => {
      const rawImagePath = project?.bg_image || project?.image || project?.thumbnail || project?.featured_image || project?.image_path || ''
      const image = rawImagePath
        ? toStorageUrl(rawImagePath)
        : '/images/samples/default-news.jpg'

      const logo = toStorageUrl(project?.logo)

      return {
        id: project.id,
        title: project.name || project.title || 'Project',
        description: project.description
          ? stripHtmlTags(project.description)
          : 'No project description available.',
        image,
        logo,
        url: project.slug ? `/projects/currentProjects#${project.slug}` : '/projects/currentProjects'
      }
    })
    .slice(0, 5)
})

const opportunityTabs = [
  {
    key: 'procurements',
    label: 'Procurements'
  },
  {
    key: 'jobs',
    label: 'Job Opportunities'
  }
]

const { data: procurementsResponse, pending: procurementsLoading, error: procurementsError, refresh: fetchProcurements } = useAsyncData(
  'homepage-procurements-live',
  async () => {
    return await fetchPaginatedEndpoint('/api/procurement-notices', procurementPage.value, opportunitiesPerPage)
  },
  {
    lazy: true,
    dedupe: 'defer',
    deep: false,
    default: () => ({
      data: [],
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: opportunitiesPerPage
    }),
    watch: [procurementPage]
  }
)

const { data: jobsResponse, pending: jobsLoading, error: jobsError, refresh: fetchJobs } = useAsyncData(
  'homepage-jobs-live',
  async () => {
    return await fetchPaginatedEndpoint('/api/vacancies', jobsPage.value, opportunitiesPerPage)
  },
  {
    immediate: false,
    lazy: true,
    dedupe: 'defer',
    deep: false,
    default: () => ({
      data: [],
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: opportunitiesPerPage
    }),
    watch: [jobsPage]
  }
)

const normalizePaginatedResponse = (response) => {
  const normalizedSource = response?.data && !Array.isArray(response.data) && Array.isArray(response.data?.data)
    ? response.data
    : response

  const items = Array.isArray(normalizedSource?.data)
    ? normalizedSource.data
    : Array.isArray(response)
      ? response
      : []

  return {
    items,
    currentPage: Number(normalizedSource?.current_page || 1),
    lastPage: Number(normalizedSource?.last_page || 1),
    total: Number(normalizedSource?.total || items.length)
  }
}

const procurementsPayload = computed(() => normalizePaginatedResponse(procurementsResponse.value))
const jobsPayload = computed(() => normalizePaginatedResponse(jobsResponse.value))

const procurementItems = computed(() => {
  if (!Array.isArray(procurementsPayload.value.items)) return []

  return procurementsPayload.value.items.map((notice) => ({
    id: notice.id,
    title: notice.title || 'Procurement Notice',
    deadline: notice.closing_date || notice.updated_at || notice.created_at || new Date().toISOString(),
    link: notice.url || '/opportunities?section=procurement#procurement-notices'
  }))
})

const jobItems = computed(() => {
  if (!Array.isArray(jobsPayload.value.items)) return []

  return jobsPayload.value.items.map((vacancy) => ({
    id: vacancy.id,
    title: vacancy.title || 'Job Opportunity',
    deadline: vacancy.expiry_date || vacancy.updated_at || vacancy.created_at || new Date().toISOString(),
    applyLink: vacancy.url || '/opportunities?section=jobs#job-opportunities'
  }))
})

const currentOpportunities = computed(() => {
  return activeTab.value === 'procurements' ? procurementItems.value : jobItems.value
})

const opportunitiesLoading = computed(() => {
  return activeTab.value === 'procurements' ? procurementsLoading.value : jobsLoading.value
})

const opportunitiesError = computed(() => {
  return activeTab.value === 'procurements' ? procurementsError.value : jobsError.value
})

const opportunitiesPagination = computed(() => {
  return activeTab.value === 'procurements' ? procurementsPayload.value : jobsPayload.value
})

const fetchOpportunities = () => {
  if (activeTab.value === 'procurements') {
    fetchProcurements()
    return
  }

  hasLoadedJobsTab.value = true
  fetchJobs()
}

const switchOpportunityTab = (tabKey) => {
  activeTab.value = tabKey

  if (tabKey === 'jobs' && !hasLoadedJobsTab.value) {
    hasLoadedJobsTab.value = true
    fetchJobs()
  }
}

const canGoToPreviousOpportunityPage = computed(() => opportunitiesPagination.value.currentPage > 1)
const canGoToNextOpportunityPage = computed(() => opportunitiesPagination.value.currentPage < opportunitiesPagination.value.lastPage)

const goToPreviousOpportunityPage = () => {
  if (!canGoToPreviousOpportunityPage.value) return

  if (activeTab.value === 'procurements') {
    procurementPage.value -= 1
    return
  }

  jobsPage.value -= 1
}

const goToNextOpportunityPage = () => {
  if (!canGoToNextOpportunityPage.value) return

  if (activeTab.value === 'procurements') {
    procurementPage.value += 1
    return
  }

  jobsPage.value += 1
}

const publicationsPayload = computed(() => {
  const response = documentsResponse.value
  const normalizedSource = response?.data && !Array.isArray(response.data) && Array.isArray(response.data?.data)
    ? response.data
    : response

  const items = Array.isArray(normalizedSource?.data)
    ? normalizedSource.data
    : Array.isArray(response)
      ? response
      : []

  return {
    items,
    currentPage: Number(normalizedSource?.current_page || 1),
    lastPage: Number(normalizedSource?.last_page || 1),
    total: Number(normalizedSource?.total || items.length)
  }
})

const publications = computed(() => {
  if (!Array.isArray(publicationsPayload.value.items) || publicationsPayload.value.items.length === 0) {
    return []
  }

  return publicationsPayload.value.items.map((document) => ({
    id: document.id,
    title: document.name || 'Document',
    date: document.created_at || document.updated_at || new Date().toISOString(),
    file: `${apiBaseUrl}/api/documents/${document.id}/download`
  }))
})

const canGoToPreviousPublicationsPage = computed(() => publicationsPayload.value.currentPage > 1)
const canGoToNextPublicationsPage = computed(() => publicationsPayload.value.currentPage < publicationsPayload.value.lastPage)

const goToPreviousPublicationsPage = () => {
  if (!canGoToPreviousPublicationsPage.value) return
  publicationsPage.value -= 1
}

const goToNextPublicationsPage = () => {
  if (!canGoToNextPublicationsPage.value) return
  publicationsPage.value += 1
}
</script>

<template>
  <div class="relative">
    <ImageSlider class="relative z-0 pb-16 md:pb-24" />
    <section class="relative z-10 -mt-10 md:-mt-18 lg:-mt-20 px-4">
      <div class="container mx-auto px-4">
  const tab = opportunityTabs.value.find(t => t.key === activeTab.value)
  return tab?.items || []
})

// Publications
const publications = ref([
  { title: '2024 Annual Report and Financial Statements', date: '2024-12-31', file: '/pdfs/annual-report-2024.pdf' },
  { title: 'Q1 Monitoring and Evaluation Brief', date: '2024-03-30', file: '/pdfs/q1-brief-2024.pdf' },
  { title: 'Local Authority Financial Management Handbook', date: '2023-11-10', file: '/pdfs/handbook-2023.pdf' },
  { title: 'Comprehensive Financial Audit Summary Report', date: '2023-08-15', file: '/pdfs/audit-summary-2023.pdf' },
  { title: 'Development Budget Review and Analysis', date: '2023-06-01', file: '/pdfs/budget-review-2023.pdf' }
])
</script>

<template>
  <div class="relative">
    <ImageSlider class="relative z-0 pb-16 md:pb-24" />
    <section class="relative z-10 -mt-10 md:-mt-18 lg:-mt-20 px-4">
      <div class="container mx-auto px-4">
      
      <!-- Loading State -->
      <div v-if="postsLoading" class="grid md:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
          <div class="flex h-full">
            <div class="w-1/3 relative overflow-hidden bg-gray-200">
              <div class="absolute inset-0 animate-pulse bg-gray-300"></div>
            </div>
            <div class="w-2/3 p-5 flex flex-col">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
              <div class="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3 mt-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="postsError" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div class="text-red-600 mb-3">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-red-800 mb-2">Failed to load news</h3>
          <p class="text-red-600 mb-4">Please refresh the page to try again.</p>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="newsItems.length > 0" class="grid md:grid-cols-3 gap-6">
        <article 
          v-for="article in newsItems" 
          :key="article.id"
          class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div class="flex h-full">
            <!-- Image Section -->
            <div class="w-1/3 relative overflow-hidden bg-gray-200">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="(e) => { e.target.src = '/images/samples/default-news.jpg' }"
              >
            </div>
            
            <!-- Content Section -->
            <div class="w-2/3 p-5 flex flex-col">
              <!-- Date -->
              <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ article.date }}
              </span>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                <NuxtLink 
                  :to="article.link" 
                  class="text-gray-700 hover:text-blue-700 transition flex items-center"
                >
                  {{ article.title }}
                </NuxtLink>
              </h3>

              <!-- Excerpt -->
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                {{ article.content }}
              </p>

              <!-- Read More Link -->
              <NuxtLink 
                :to="article.link"
                class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Read more
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-800 mt-4">No news articles available</h3>
          <p class="text-gray-600 mt-2">Check back later for updates.</p>
        </div>
      </div>
      </div>
    </section>

    <main class="container mx-auto px-4 py-12">
      <section class="py-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div class="container mx-auto px-6 max-w-7xl">
          
          <div class="bg-white p-10 rounded-xl shadow-md mb-16 max-w-5xl mx-auto border-t-4 border-emerald-700 transform hover:scale-[1.01] transition-transform duration-300">
            <h3 class="text-4xl font-bold text-gray-900 mb-4 text-center">Our Mandate</h3>
            <p class="text-gray-600 text-lg text-center leading-relaxed max-w-3xl mx-auto">
              Empowering local governments through innovative fiscal decentralization, robust financial management, and sustainable development initiatives.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 border-purple-700 flex flex-col items-center">
              <div class="text-purple-700 mb-5 p-3 bg-purple-50 rounded-full">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-3 text-center">Our Vision</h3>
              <p class="text-gray-700 text-center leading-relaxed">
                Pioneering effective, responsive, and sustainable financing solutions to empower thriving local governments.
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 border-blue-700 flex flex-col items-center">
              <div class="text-blue-700 mb-5 p-3 bg-blue-50 rounded-full">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-3 text-center">Our Mission</h3>
              <p class="text-gray-700 text-center leading-relaxed">
                Delivering efficient technical, financial, and economic management services to optimize resources and elevate service delivery for local governments.
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 border-emerald-700 flex flex-col items-center">
              <div class="text-emerald-700 mb-5 p-3 bg-emerald-50 rounded-full">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-3 text-center">Core Values</h3>
              <ul class="grid grid-cols-2 gap-4 text-gray-700 w-full">
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Integrity
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Transparency
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Accountability
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Innovation
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Teamwork
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Professionalism
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    
      <section class="py-8 bg-gradient-to-b from-primary-50 to-white">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current <span class="text-primary-600">Projects</span>
            </h2>
            <p class="max-w-2xl mx-auto text-gray-600 px-4">
              Discover our key programs that are transforming local governance and service delivery across the nation.
            </p>
          </div>

          <div v-if="projectsLoading" class="mx-auto projects-grid gap-6 px-4 sm:px-0">
            <div
              v-for="n in 3"
              :key="`project-skeleton-${n}`"
              class="relative overflow-hidden rounded-2xl shadow-xl h-80 sm:h-64 w-56 bg-gray-200 animate-pulse"
            />
          </div>

          <div v-else-if="projectsError" class="text-center py-8">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-red-800 mb-2">Failed to load projects</h3>
              <p class="text-red-600 mb-4">Please try again.</p>
              <button
                @click="fetchProjects"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>

          <div v-else-if="donorFundedProjects.length > 0" class="mx-auto projects-grid gap-6 px-4 sm:px-0">
            <div
              v-for="(project, index) in donorFundedProjects"
              :key="project.id || index"
              class="group relative overflow-hidden rounded-2xl shadow-xl h-80 sm:h-64 w-56"
            >
              <img
                :src="project.image"
                :alt="project.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                @error="(e) => { e.target.src = '/images/samples/default-news.jpg' }"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div class="relative h-full flex flex-col justify-end p-6 text-white">
                <div class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 mb-4 bg-white rounded-xl shadow-md p-1.5">
                  <img
                    v-if="project.logo"
                    :src="project.logo"
                    alt="Project Logo"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <svg
                    v-else
                    class="w-6 h-6 sm:w-5 sm:h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      :d="project.iconPath"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></path>
                  </svg>
                </div>

                <h3 class="text-xl sm:text-lg font-bold mb-2 line-clamp-1">{{ project.title }}</h3>
                <p class="text-white/90 mb-4 line-clamp-2 text-sm">{{ project.description }}</p>
                <a
                  :href="project.url"
                  class="inline-flex items-center text-sm font-medium text-white group-hover:text-primary-300 transition"
                >
                  Learn more
                  <svg
                    class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-gray-800 mb-2">No donor-funded projects found</h3>
              <p class="text-gray-600">Donor-funded projects will appear here once available.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-7">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-semibold text-gray-900">
                  Latest <span class="text-emerald-600">Publications</span>
                </h3>
                <a
                  href="/publications"
                  class="text-sm font-medium text-emerald-600 hover:text-emerald-800 flex items-center"
                >
                  View All
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>

              <div v-if="publicationsLoading" class="space-y-3">
                <div
                  v-for="n in 4"
                  :key="`publication-loading-${n}`"
                  class="flex items-start gap-4 p-4 bg-white rounded-lg"
                >
                  <div class="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  <div class="flex-grow space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div v-else-if="publicationsError" class="text-center py-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <h3 class="text-lg font-medium text-red-800 mb-2">Failed to load publications</h3>
                  <p class="text-red-600 mb-4">Please try again.</p>
                  <button
                    @click="fetchPublications"
                    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>

              <div v-else-if="publications.length > 0" class="space-y-3">
                <div
                  v-for="(pub, index) in publications"
                  :key="pub.id || index"
                  class="group flex items-start gap-4 p-4 hover:bg-gray-100 rounded-lg transition"
                >
                  <div class="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-md flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <h4 class="font-medium text-gray-900 group-hover:text-emerald-600 transition">
                      {{ pub.title }}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">
                      Published {{ formatDate(pub.date) }}
                    </p>
                  </div>
                  <a
                    :href="pub.file"
                    download
                    class="flex-shrink-0 text-emerald-600 hover:text-emerald-800 p-2 rounded-full hover:bg-emerald-50 transition"
                    title="Download"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </a>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <p class="text-sm text-gray-600">
                    Page {{ publicationsPayload.currentPage }} of {{ publicationsPayload.lastPage }}
                  </p>
                  <div class="flex items-center gap-2">
                    <button
                      @click="goToPreviousPublicationsPage"
                      :disabled="!canGoToPreviousPublicationsPage"
                      class="px-3 py-1 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      @click="goToNextPublicationsPage"
                      :disabled="!canGoToNextPublicationsPage"
                      class="px-3 py-1 text-sm rounded-md border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-6">
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                  <h3 class="text-lg font-medium text-gray-800 mb-2">No publications available</h3>
                  <p class="text-gray-600">Published documents will appear here once available.</p>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div class="sticky top-24">
                <h3 class="text-2xl font-semibold text-gray-900 mb-6">
                  Current <span class="text-emerald-600">Opportunities</span>
                </h3>

                <div class="flex border-b border-gray-200 mb-6">
                  <button
                    v-for="tab in opportunityTabs"
                    :key="tab.key"
                    @click="switchOpportunityTab(tab.key)"
                    :class="[
                      'px-4 py-2 font-medium text-sm transition',
                      activeTab === tab.key
                        ? 'border-b-2 border-emerald-600 text-emerald-600'
                        : 'text-gray-600 hover:text-gray-900'
                    ]"
                  >
                    {{ tab.label }}
                  </button>
                </div>

                <div class="space-y-3">
                  <template v-if="opportunitiesLoading">
                    <div
                      v-for="n in 3"
                      :key="`opportunity-loading-${n}`"
                      class="p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div class="space-y-2">
                        <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </template>

                  <div
                    v-else-if="opportunitiesError"
                    class="p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <h4 class="font-medium text-red-800">Failed to load opportunities</h4>
                    <p class="text-sm text-red-600 mt-1">Please try again.</p>
                    <button
                      @click="fetchOpportunities"
                      class="mt-3 px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition"
                    >
                      Try Again
                    </button>
                  </div>

                  <template v-else-if="currentOpportunities.length > 0">
                    <div
                      v-for="(op, index) in currentOpportunities"
                      :key="op.id || index"
                      class="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div>
                          <h4 class="font-medium text-gray-900">{{ op.title }}</h4>
                          <p class="text-sm text-gray-600 mt-1">
                            Deadline: {{ formatDate(op.deadline) }}
                          </p>
                        </div>
                        <template v-if="activeTab === 'procurements'">
                          <a
                            :href="op.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-sm font-medium hover:bg-emerald-100 transition"
                          >
                            View Notice
                          </a>
                        </template>
                        <template v-else-if="activeTab === 'jobs'">
                          <a
                            :href="op.applyLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition"
                          >
                            Apply Now
                          </a>
                        </template>
                      </div>
                    </div>
                  </template>

                  <div
                    v-else
                    class="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <h4 class="font-medium text-gray-800">No opportunities available</h4>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ activeTab === 'procurements' ? 'Procurement opportunities will appear here once available.' : 'Job opportunities will appear here once available.' }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <p class="text-sm text-gray-600">
                    Page {{ opportunitiesPagination.currentPage }} of {{ opportunitiesPagination.lastPage }}
                  </p>
                  <div class="flex items-center gap-2">
                    <button
                      @click="goToPreviousOpportunityPage"
                      :disabled="!canGoToPreviousOpportunityPage || opportunitiesLoading"
                      class="px-3 py-1 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      @click="goToNextOpportunityPage"
                      :disabled="!canGoToNextOpportunityPage || opportunitiesLoading"
                      class="px-3 py-1 text-sm rounded-md border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div class="mt-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <div>
                      <h4 class="font-medium text-emerald-800">Stay Updated</h4>
                      <p class="text-sm text-emerald-600 mt-1">
                        Subscribe for alerts on new opportunities.
                      </p>
                      <button
                        class="mt-2 px-3 py-1 text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Partners Section fetching from api -->
      <section class="py-8 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-semibold text-gray-900 mb-3">Our Strategic Partners</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading organizations to create sustainable impact
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">Loading partners...</span>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-8">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div class="text-red-600 mb-3">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-red-800 mb-2">Failed to load partners</h3>
              <p class="text-red-600 mb-4">Please try again later.</p>
              <button 
                @click="fetchPartners" 
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>

          <!-- Success State - Only show if we have partners -->
          <div v-else-if="partners && partners.length > 0" class="relative">
            <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div class="overflow-hidden py-6 px-4">
              <div 
                class="flex gap-6 animate-scroll hover:pause"
                :style="`--scroll-duration: ${scrollDuration}s`"
              >
                <!-- Double the array for seamless looping -->
                <template v-for="repeat in 2">
                  <div 
                    v-for="(logo,index) in partners"
                    :key="`${repeat}-${logo.id || index}`"
                    class="flex-shrink-0"
                  >
                    <div class="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center h-24 w-40 sm:h-32 sm:w-48 transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                      <img
                        :src="`${$config.public.baseUrl}/storage/${logo.logo}`"
                        :alt="logo.alt || logo.name || 'Partner logo'"
                        loading="lazy"
                        decoding="async"
                        width="192"
                        height="128"
                        class="max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity drop-shadow-md"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Empty State - No partners from API -->
          <div v-else class="text-center py-12">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-800 mt-4">No partners available</h3>
              <p class="text-gray-600 mt-2">Check back later for updates.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>


<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll var(--scroll-duration, 20s) linear infinite;
  display: flex;
  min-width: fit-content; /* Better for dynamic content */
  will-change: transform; /* Optimize for animation */
}

.hover\:pause:hover,
.animate-scroll:focus-within,
.animate-scroll:active {
  animation-play-state: paused;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
    justify-content: center;
    min-width: auto;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }
  
  .animate-scroll::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
}

/* Projects Section */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.projects-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 14rem));
  justify-content: center;
}

</style>
