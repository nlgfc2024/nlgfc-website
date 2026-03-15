<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import OpportunitiesFaqGuidelines from '../../components/OpportunitiesFaqGuidelines.vue'

definePageMeta({
  title: 'Opportunities',
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const jobsPortalBase = computed(() => config.public.jobsPortalBase || 'http://localhost:3001')
const procurementPortalBase = computed(() => config.public.procurementPortalBase || 'http://localhost:3002')

const JOB_SECTION = 'jobs'
const PROCUREMENT_SECTION = 'procurement'
const JOB_HASH = 'job-opportunities'
const PROCUREMENT_HASH = 'procurement-notices'

const normalizeSection = (value) => {
  if (value === JOB_SECTION || value === JOB_HASH) {
    return JOB_SECTION
  }

  if (value === PROCUREMENT_SECTION || value === PROCUREMENT_HASH) {
    return PROCUREMENT_SECTION
  }

  return PROCUREMENT_SECTION
}

const activeSection = ref(PROCUREMENT_SECTION)
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const showJobModal = ref(false)
const selectedJobDetails = ref(null)
const showFaqModal = ref(false)

const currentPage = ref(1)
const itemsPerPage = ref(5)

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value
  }
  return []
}

const normalizeListField = (value) => {
  return toArray(value)
    .map((entry) => {
      if (typeof entry === 'string') {
        return entry
      }
      if (entry && typeof entry === 'object' && typeof entry.item === 'string') {
        return entry.item
      }
      return null
    })
    .filter(Boolean)
}

const isExpired = (dateString) => {
  if (!dateString) {
    return false
  }
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return false
  }
  return date < new Date()
}

const formatSalary = (vacancy) => {
  const min = vacancy.salary_min
  const max = vacancy.salary_max
  const currency = vacancy.salary_currency || 'MWK'

  if (min && max) {
    return `${currency} ${Number(min).toLocaleString()} - ${currency} ${Number(max).toLocaleString()}`
  }
  if (min) {
    return `${currency} ${Number(min).toLocaleString()}`
  }
  if (max) {
    return `${currency} ${Number(max).toLocaleString()}`
  }
  return 'Salary not disclosed'
}

const normalizeEmploymentType = (employmentType) => {
  if (!employmentType) {
    return 'Not specified'
  }
  return employmentType
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('-')
}

const { data: vacanciesResponse, pending: vacanciesPending, error: vacanciesError, refresh: refreshVacancies } = await useAsyncData(
  'opportunities-vacancies',
  () =>
    $fetch(`${config.public.apiBase}/api/vacancies`, {
      params: {
        per_page: 100,
        include_expired: true,
      },
    }),
  {
    lazy: true,
    default: () => ({ data: [] }),
  }
)

const { data: procurementResponse, pending: procurementPending, error: procurementError, refresh: refreshProcurement } = await useAsyncData(
  'opportunities-procurement',
  () =>
    $fetch(`${config.public.apiBase}/api/procurement-notices`, {
      params: {
        per_page: 100,
        status: 'active',
      },
    }),
  {
    lazy: true,
    default: () => ({ data: [] }),
  }
)

const mapVacancy = (vacancy) => {
  const expiryDate = vacancy.application_deadline || vacancy.expiry_date
  const backendStatus = (vacancy.status || '').toLowerCase()

  const activeStatus = ['active', 'published'].includes(backendStatus) && !isExpired(expiryDate)
  const status = activeStatus ? 'active' : 'expired'

  return {
    id: vacancy.id,
    title: vacancy.title,
    department: vacancy.department?.name || 'NLGFC',
    location: vacancy.location || 'Not specified',
    type: normalizeEmploymentType(vacancy.employment_type),
    publishDate: vacancy.publish_date || vacancy.created_at,
    expiryDate,
    salary: formatSalary(vacancy),
    description: vacancy.description || 'No job description provided yet.',
    requirements: normalizeListField(vacancy.requirements),
    responsibilities: normalizeListField(vacancy.responsibilities),
    status,
  }
}

const mapProcurement = (notice) => {
  const expiryDate = notice.closing_date
  const backendStatus = (notice.status || '').toLowerCase()
  const isPublished = backendStatus === 'published' || backendStatus === 'active'
  const status = isPublished && !isExpired(expiryDate) ? 'active' : 'expired'

  return {
    id: notice.id,
    noticeId: notice.notice_id || null,
    title: notice.title,
    type: notice.procurement_method || notice.type || 'Notice',
    fundingSource: notice.funding_source || null,
    department: notice.procuring_entity || 'Procurement',
    publishDate: notice.created_at,
    expiryDate: notice.submission_deadline || expiryDate,
    url: notice.maneps_marketplace_link || notice.url || null,
    estimatedValue: notice.reference ? `Ref: ${notice.reference}` : 'Refer to notice details',
    description: notice.description || 'No procurement description provided yet.',
    documents: toArray(notice.documents),
    procurementMethod: notice.procurement_method || notice.type || null,
    status,
  }
}

const jobOpportunities = computed(() => {
  const raw = vacanciesResponse.value?.data || vacanciesResponse.value || []
  return toArray(raw).map(mapVacancy)
})

const procurementNotices = computed(() => {
  const raw = procurementResponse.value?.data || procurementResponse.value || []
  return toArray(raw).map(mapProcurement)
})

const departments = computed(() => {
  const allDepartments = [
    ...jobOpportunities.value.map((job) => job.department),
    ...procurementNotices.value.map((notice) => notice.department),
  ].filter(Boolean)

  return [...new Set(allDepartments)].sort()
})

const filteredJobs = computed(() => {
  let filtered = [...jobOpportunities.value]

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase()
    filtered = filtered.filter((job) =>
      `${job.title} ${job.description} ${job.department}`.toLowerCase().includes(search)
    )
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter((job) => job.department === selectedDepartment.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter((job) => job.status === selectedStatus.value)
  }

  return filtered
})

const filteredProcurement = computed(() => {
  let filtered = [...procurementNotices.value]

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase()
    filtered = filtered.filter((notice) =>
      `${notice.title} ${notice.description} ${notice.department}`.toLowerCase().includes(search)
    )
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter((notice) => notice.department === selectedDepartment.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter((notice) => notice.status === selectedStatus.value)
  }

  return filtered
})

const currentItems = computed(() => {
  return activeSection.value === 'jobs' ? filteredJobs.value : filteredProcurement.value
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return currentItems.value.slice(start, end)
})

const activeSectionError = computed(() => {
  if (activeSection.value === JOB_SECTION) {
    return Boolean(vacanciesError.value)
  }

  return Boolean(procurementError.value)
})

const opportunitiesLoading = computed(() => {
  if (activeSection.value === JOB_SECTION) {
    return vacanciesPending.value
  }

  return procurementPending.value
})

const normalizeRouteQueryValue = (value) => {
  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : ''
  }
  return value ? String(value) : ''
}

const syncActiveSectionFromRoute = () => {
  const hash = String(route.hash || '').replace('#', '')
  const hashSection = hash ? normalizeSection(hash) : null
  const querySection = route.query.section ? normalizeSection(String(route.query.section)) : null
  const nextSection = hashSection || querySection || PROCUREMENT_SECTION

  if (nextSection !== activeSection.value) {
    activeSection.value = nextSection
  }
}

onMounted(() => {
  if (route.query.page) {
    currentPage.value = Number.parseInt(String(route.query.page), 10) || 1
  }
  if (route.query.limit) {
    itemsPerPage.value = Number.parseInt(String(route.query.limit), 10) || 5
  }

  syncActiveSectionFromRoute()
})

watch(() => route.query.section, (newSection) => {
  if (newSection) {
    syncActiveSectionFromRoute()
  }
})

watch(() => route.hash, () => {
  syncActiveSectionFromRoute()
})

watch([activeSection, currentPage, itemsPerPage], ([newSection]) => {
  const hash = newSection === JOB_SECTION ? `#${JOB_HASH}` : `#${PROCUREMENT_HASH}`
  const currentSection = normalizeRouteQueryValue(route.query.section)
  const currentPageQuery = normalizeRouteQueryValue(route.query.page)
  const currentLimitQuery = normalizeRouteQueryValue(route.query.limit)

  if (
    currentSection === String(newSection) &&
    currentPageQuery === String(currentPage.value) &&
    currentLimitQuery === String(itemsPerPage.value) &&
    route.hash === hash
  ) {
    return
  }

  router.replace({
    query: {
      ...route.query,
      section: newSection,
      page: currentPage.value,
      limit: itemsPerPage.value,
    },
    hash,
  })
})

watch([searchQuery, selectedDepartment, selectedStatus, activeSection], () => {
  currentPage.value = 1
})

const handleViewJobDetails = (job) => {
  selectedJobDetails.value = job
  showJobModal.value = true
}

const handleApplyJob = (jobId) => {
  const target = `${jobsPortalBase.value}/jobs/${jobId}?apply=1&source=nlgfc-website`

  if (process.client) {
    window.location.href = target
  }
}

const handleExpressInterest = (notice) => {
  if (!process.client) {
    return
  }

  if (notice?.fundingSource === 'world_bank') {
    handleViewNoticeDetails(notice)
    return
  }

  const target = typeof notice?.url === 'string' ? notice.url.trim() : ''
  if (target) {
    window.location.href = target
  }
}

const handleViewNoticeDetails = (notice) => {
  if (!process.client) {
    return
  }

  const noticeId = notice?.id
  if (!noticeId) {
    return
  }

  const redirectPath = encodeURIComponent(`/tenders?notice_id=${noticeId}&source=nlgfc-website`)
  window.location.href = `${procurementPortalBase.value}/auth/login?redirect=${redirectPath}`
}

const handleDownloadDocument = (document) => {
  if (!process.client) {
    return
  }

  const relativeDownload = typeof document?.download_url === 'string' ? document.download_url : ''
  if (relativeDownload) {
    window.open(`${config.public.apiBase}${relativeDownload}`, '_blank')
    return
  }

  if (document?.url) {
    window.open(document.url, '_blank')
  }
}

const closeJobModal = () => {
  showJobModal.value = false
  selectedJobDetails.value = null
}

const closeFaqModal = () => {
  showFaqModal.value = false
}

const retryCurrentSection = () => {
  if (activeSection.value === JOB_SECTION) {
    return refreshVacancies()
  }

  return refreshProcurement()
}
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-8">
      <div v-if="activeSectionError" class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load latest {{ activeSection === JOB_SECTION ? 'job opportunities' : 'procurement notices' }}. Refresh the page or try again shortly.
        <button
          class="ml-3 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          @click="retryCurrentSection"
        >
          Retry
        </button>
      </div>

      <OpportunityFilters
        v-model:search-query="searchQuery"
        v-model:selected-department="selectedDepartment"
        v-model:selected-status="selectedStatus"
        :departments="departments"
        :active-section="activeSection"
      />

      <div :id="JOB_HASH" class="scroll-mt-36" />
      <div :id="PROCUREMENT_HASH" class="scroll-mt-36" />

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">
              {{ activeSection === 'jobs' ? 'Job Opportunities' : 'Procurement Notices' }}
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              {{ currentItems.length }} {{ currentItems.length === 1 ? 'opportunity' : 'opportunities' }} found
            </p>
          </div>

          <div class="flex items-center space-x-4 text-sm">
            <div class="w-2 h-2 bg-green-500 rounded-full" />
            <span class="text-gray-600">
              {{ currentItems.filter(item => item.status === 'active').length }} Active
            </span>
            <div class="w-2 h-2 bg-red-500 rounded-full" />
            <span class="text-gray-600">
              {{ currentItems.filter(item => item.status === 'expired').length }} Expired
            </span>
          </div>
        </div>
      </div>

      <div v-if="opportunitiesLoading" class="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600 mb-6">
        Loading latest opportunities...
      </div>

      <div class="space-y-6" v-else>
        <template v-if="activeSection === 'jobs'">
          <JobCard
            v-for="job in paginatedItems"
            :key="job.id"
            :job="job"
            @view-details="handleViewJobDetails"
            @apply="handleApplyJob"
          />
        </template>

        <template v-else>
          <ProcurementCard
            v-for="notice in paginatedItems"
            :key="notice.id"
            :notice="notice"
            @express-interest="handleExpressInterest"
            @view-details="handleViewNoticeDetails"
            @download="handleDownloadDocument"
          />
        </template>

        <div v-if="currentItems.length === 0" class="text-center py-12">
          <Icon
            :name="activeSection === 'jobs' ? 'heroicons:briefcase' : 'heroicons:document-text'"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No {{ activeSection === 'jobs' ? 'job opportunities' : 'procurement notices' }} found
          </h3>
          <p class="text-gray-600 mb-4">
            Try adjusting your search criteria or check back later for new opportunities.
          </p>
          <button
            @click="searchQuery = ''; selectedDepartment = ''; selectedStatus = ''"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div v-if="currentItems.length > 0" class="mt-8">
        <Pagination
          v-model:current-page="currentPage"
          v-model:items-per-page="itemsPerPage"
          :total-items="currentItems.length"
        />
      </div>
    </div>

    <JobDetailsModal
      v-if="showJobModal && selectedJobDetails"
      :job="selectedJobDetails"
      @close="closeJobModal"
      @apply="handleApplyJob"
    />

    <OpportunitiesFaqGuidelines
      v-if="showFaqModal"
      :active-section="activeSection"
      @close="closeFaqModal"
    />
  </div>
</template>
