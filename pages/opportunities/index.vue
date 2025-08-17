<script setup>

// Meta information
definePageMeta({
  title: 'Opportunities'
})

// Reactive data
const activeSection = ref('jobs')
const searchQuery = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const showJobModal = ref(false)
const selectedJobDetails = ref(null)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Get section from query params
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.query.section) {
    activeSection.value = route.query.section
  }
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
  if (route.query.limit) {
    itemsPerPage.value = parseInt(route.query.limit)
  }
})

// Watch for changes and update URL
watch([activeSection, currentPage, itemsPerPage], () => {
  router.push({
    query: {
      ...route.query,
      section: activeSection.value,
      page: currentPage.value,
      limit: itemsPerPage.value
    }
  })
})

// Sample data for job opportunities
const jobOpportunities = ref([
  {
    id: 1,
    title: 'Senior Financial Analyst',
    department: 'Finance',
    location: 'Lilongwe',
    type: 'Full-time',
    publishDate: '2025-06-20',
    expiryDate: '2025-12-20',
    salary: 'MWK 800,000 - 1,200,000',
    description: 'We are seeking a qualified Senior Financial Analyst to join our Finance team. The successful candidate will be responsible for financial planning, analysis, and reporting to support strategic decision-making.',
    requirements: [
      'Bachelor\'s degree in Finance, Accounting, Economics, or related field',
      'Minimum 5 years of progressive experience in financial analysis',
      'Professional certification (ACCA, CPA, CFA, or equivalent) preferred',
      'Strong analytical and quantitative skills',
      'Proficiency in financial modeling and advanced Excel',
      'Experience with financial software (SAP, Oracle, or similar)',
      'Excellent written and verbal communication skills'
    ],
    responsibilities: [
      'Prepare comprehensive financial reports and variance analysis',
      'Support annual budget preparation and quarterly forecasting',
      'Conduct detailed financial analysis to support business decisions',
      'Monitor key performance indicators and financial metrics',
      'Assist in the development of financial policies and procedures',
      'Collaborate with various departments on financial planning initiatives'
    ]
  },
  {
    id: 2,
    title: 'Project Coordinator - SSRLP',
    department: 'Projects',
    location: 'Lilongwe',
    type: 'Contract',
    publishDate: '2025-04-18',
    expiryDate: '2025-12-18',
    salary: 'MWK 600,000 - 900,000',
    description: 'NLGFC is looking for a dynamic Project Coordinator to support the implementation of the Social Support for Resilient Livelihoods Project (SSRLP). This role involves coordinating project activities and ensuring effective implementation.',
    requirements: [
      'Bachelor\'s degree in Development Studies, Social Sciences, Project Management, or related field',
      'Minimum 3 years of project coordination or management experience',
      'Experience with World Bank or other donor-funded projects preferred',
      'Strong organizational and time management skills',
      'Excellent communication and interpersonal skills',
      'Ability to work effectively in rural and remote areas',
      'Proficiency in MS Office Suite and project management tools'
    ],
    responsibilities: [
      'Coordinate day-to-day project implementation activities',
      'Monitor project progress against established timelines and milestones',
      'Prepare regular progress reports for management and donors',
      'Facilitate stakeholder meetings and community engagement sessions',
      'Support capacity building and training activities',
      'Ensure compliance with project guidelines and donor requirements'
    ]
  },
  {
    id: 3,
    title: 'ICT Systems Administrator',
    department: 'ICT',
    location: 'Lilongwe',
    type: 'Full-time',
    publishDate: '2025-05-15',
    expiryDate: '2025-07-15',
    salary: 'MWK 500,000 - 750,000',
    description: 'We are seeking an experienced ICT Systems Administrator to manage and maintain our IT infrastructure, ensuring optimal performance and security of all systems.',
    requirements: [
      'Bachelor\'s degree in Computer Science, Information Technology, or related field',
      'Minimum 3 years of systems administration experience',
      'Experience with Windows Server, Linux, and network administration',
      'Knowledge of database management (SQL Server, MySQL)',
      'Understanding of cybersecurity principles and best practices',
      'Strong problem-solving and troubleshooting skills',
      'Relevant certifications (Microsoft, Cisco, CompTIA) preferred'
    ],
    responsibilities: [
      'Manage and maintain server infrastructure and network systems',
      'Provide technical support to end users and resolve IT issues',
      'Implement and maintain security measures and backup procedures',
      'Monitor system performance and optimize for efficiency',
      'Install, configure, and update software and hardware',
      'Maintain documentation of IT systems and procedures'
    ]
  },
  {
    id: 4,
    title: 'Communications Officer',
    department: 'Communications',
    location: 'Lilongwe',
    type: 'Full-time',
    publishDate: '2025-01-25',
    expiryDate: '2025-08-25',
    salary: 'MWK 450,000 - 650,000',
    description: 'Join our Communications team to help tell NLGFC\'s story and engage with stakeholders through various communication channels.',
    requirements: [
      'Bachelor\'s degree in Communications, Journalism, Public Relations, or related field',
      'Minimum 2 years of communications or media experience',
      'Excellent writing and editing skills in English',
      'Experience with social media management and digital marketing',
      'Knowledge of graphic design software (Adobe Creative Suite) preferred',
      'Strong interpersonal and presentation skills'
    ],
    responsibilities: [
      'Develop and implement communication strategies',
      'Create content for various communication channels',
      'Manage social media accounts and online presence',
      'Coordinate with media and handle press releases',
      'Support event planning and stakeholder engagement',
      'Monitor and report on communication effectiveness'
    ]
  },
  {
    id: 5,
    title: 'Procurement Officer',
    department: 'Procurement',
    location: 'Lilongwe',
    type: 'Full-time',
    publishDate: '2025-01-22',
    expiryDate: '2025-08-22',
    salary: 'MWK 550,000 - 800,000',
    description: 'We are looking for a detail-oriented Procurement Officer to manage procurement processes and ensure compliance with regulations.',
    requirements: [
      'Bachelor\'s degree in Procurement, Supply Chain Management, Business Administration, or related field',
      'Minimum 3 years of procurement experience',
      'Knowledge of procurement laws and regulations in Malawi',
      'Professional certification in procurement (CIPS, MCIPS) preferred',
      'Strong negotiation and vendor management skills',
      'Attention to detail and analytical thinking'
    ],
    responsibilities: [
      'Manage end-to-end procurement processes',
      'Conduct market research and vendor evaluation',
      'Prepare procurement documents and contracts',
      'Ensure compliance with procurement regulations',
      'Maintain procurement records and documentation',
      'Support budget planning and cost management'
    ]
  },
  {
    id: 6,
    title: 'Zomba EPWP District Coordinator',
    department: 'Projects',
    location: 'Lilongwe',
    type: 'Full-time',
    status: 'active',
    publishDate: '2025-02-15',
    expiryDate: '2025-04-25',
    salary: 'MWK 500,000 - 750,000',
    description: 'We are seeking an experienced ICT Systems Administrator to manage and maintain our IT infrastructure, ensuring optimal performance and security of all systems.',
    requirements: [
      'Bachelor\'s degree in Mwakutimwakuti, or related field',
      'Minimum 3 years of systems administration experience',
      'Experience with mwakutimwakuti',
      'Knowledge of elaborate mwakutimwakuti',
      'Understanding of mwakutimwakuti principles and best practices',
      'Strong mwakutimwakuti and problem-solving skills',
      'Relevant certifications (mwakutimwakuti) preferred'
    ],
    responsibilities: [
      'Coordinate day-to-day project implementation activities',
      'Monitor project progress against targets and prepare regular reports',
      'Liaise with stakeholders including beneficiaries, local traditional authorities, and partners',
      'Support capacity building activities and training programs',
      'Ensure compliance with project procedures and donor requirements',
      'Facilitate community meetings and stakeholder consultations',
      'Maintain project documentation and filing systems'
    ]
  },
  {
    id: 7,
    title: 'Ntcheu EPWP District Coordinator',
    department: 'Projects',
    location: 'Lilongwe',
    type: 'Full-time',
    status: 'active',
    publishDate: '2025-02-15',
    expiryDate: '2025-06-20',
    salary: 'MWK 500,000 - 750,000',
    description: 'We are seeking an experienced ICT Systems Administrator to manage and maintain our IT infrastructure, ensuring optimal performance and security of all systems.',
    requirements: [
      'Bachelor\'s degree in Mwakutimwakuti, or related field',
      'Minimum 3 years of systems administration experience',
      'Experience with mwakutimwakuti',
      'Knowledge of elaborate mwakutimwakuti',
      'Understanding of mwakutimwakuti principles and best practices',
      'Strong mwakutimwakuti and problem-solving skills',
      'Relevant certifications (mwakutimwakuti) preferred'
    ],
    responsibilities: [
      'Coordinate day-to-day project implementation activities',
      'Monitor project progress against targets and prepare regular reports',
      'Liaise with stakeholders including beneficiaries, local traditional authorities, and partners',
      'Support capacity building activities and training programs',
      'Ensure compliance with project procedures and donor requirements',
      'Facilitate community meetings and stakeholder consultations',
      'Maintain project documentation and filing systems'
    ]
  }
])

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
    description: 'NLGFC invites qualified suppliers to submit quotations for the supply and delivery of office equipment including computers, printers, furniture, and other essential office supplies.',
    documents: [
      { name: 'RFQ Document', type: 'pdf', url: '/documents/rfq-office-equipment.pdf' },
      { name: 'Technical Specifications', type: 'pdf', url: '/documents/tech-specs.pdf' },
      { name: 'Terms and Conditions', type: 'pdf', url: '/documents/terms-conditions.pdf' }
    ]
  },
  {
    id: 2,
    title: 'Consultancy Services for Financial Management System',
    type: 'RFP',
    department: 'ICT',
    publishDate: '2025-05-10',
    expiryDate: '2025-12-28',
    estimatedValue: 'MWK 15,000,000',
    description: 'NLGFC seeks to engage a qualified consultant to develop and implement a comprehensive financial management system to improve financial reporting and accountability.',
    documents: [
      { name: 'RFP Document', type: 'pdf', url: '/documents/rfp-financial-system.pdf' },
      { name: 'Terms of Reference', type: 'pdf', url: '/documents/tor-financial-system.pdf' },
      { name: 'Technical Requirements', type: 'pdf', url: '/documents/technical-requirements.pdf' }
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
    description: 'Construction of a modern two-story regional office building in Blantyre to accommodate NLGFC regional operations and improve service delivery.',
    documents: [
      { name: 'Tender Document', type: 'pdf', url: '/documents/tender-office-building.pdf' },
      { name: 'Architectural Drawings', type: 'pdf', url: '/documents/drawings.pdf' },
      { name: 'Bill of Quantities', type: 'pdf', url: '/documents/boq.pdf' }
    ]
  },
  {
    id: 4,
    title: 'Vehicle Maintenance Services',
    type: 'RFQ',
    department: 'Administration',
    publishDate: '2024-01-20',
    expiryDate: '2025-03-20',
    estimatedValue: 'MWK 3,000,000',
    description: 'NLGFC requires qualified service providers for comprehensive vehicle maintenance services including routine servicing, repairs, and parts supply for our fleet.',
    documents: [
      { name: 'RFQ Document', type: 'pdf', url: '/documents/rfq-vehicle-maintenance.pdf' },
      { name: 'Vehicle List', type: 'pdf', url: '/documents/vehicle-list.pdf' },
      { name: 'Service Requirements', type: 'pdf', url: '/documents/service-requirements.pdf' }
    ]
  },
  {
    id: 5,
    title: 'Training and Capacity Building Services',
    type: 'RFP',
    department: 'Human Resources',
    publishDate: '2024-01-12',
    expiryDate: '2025-02-12',
    estimatedValue: 'MWK 8,000,000',
    description: 'NLGFC seeks qualified training providers to deliver capacity building programs for staff development in various technical and soft skills areas.',
    documents: [
      { name: 'RFP Document', type: 'pdf', url: '/documents/rfp-training-services.pdf' },
      { name: 'Training Modules', type: 'pdf', url: '/documents/training-modules.pdf' },
      { name: 'Evaluation Criteria', type: 'pdf', url: '/documents/evaluation-criteria.pdf' }
    ]
  }
])

// Utility functions
const isExpired = (dateString) => {
  return new Date(dateString) < new Date()
}

const getStatus = (expiryDate) => {
  return isExpired(expiryDate) ? 'expired' : 'active'
}

// Get unique departments for filtering
const departments = computed(() => {
  const allDepartments = [
    ...jobOpportunities.value.map(job => job.department),
    ...procurementNotices.value.map(notice => notice.department)
  ]
  return [...new Set(allDepartments)].sort()
})

// Computed properties for filtering
const filteredJobs = computed(() => {
  let filtered = jobOpportunities.value.map(job => ({
    ...job,
    status: getStatus(job.expiryDate)
  }))

  if (searchQuery.value) {
    filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter(job => job.department === selectedDepartment.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(job => job.status === selectedStatus.value)
  }

  return filtered
})

const filteredProcurement = computed(() => {
  let filtered = procurementNotices.value.map(notice => ({
    ...notice,
    status: getStatus(notice.expiryDate)
  }))

  if (searchQuery.value) {
    filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        notice.department.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter(notice => notice.department === selectedDepartment.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(notice => notice.status === selectedStatus.value)
  }

  return filtered
})

// Get current items based on active section
const currentItems = computed(() => {
  return activeSection.value === 'jobs' ? filteredJobs.value : filteredProcurement.value
})

// Paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return currentItems.value.slice(start, end)
})

// Reset pagination when filters change
watch([searchQuery, selectedDepartment, selectedStatus, activeSection], () => {
  currentPage.value = 1
})

// Event handlers
const handleViewJobDetails = (job) => {
  selectedJobDetails.value = job
  showJobModal.value = true
}

const handleApplyJob = (jobId) => {
  console.log('Applying for job:', jobId)
  // Implement job application logic
}

const handleExpressInterest = (noticeId) => {
  console.log('Expressing interest in procurement:', noticeId)
  // Implement express interest logic
}

const handleDownloadDocument = (document, title) => {
  console.log(`Downloading: ${document.name} from ${title}`)
  // Implement actual download logic
}

const closeJobModal = () => {
  showJobModal.value = false
  selectedJobDetails.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <OpportunitiesSidebar
              :active-section="activeSection"
              :job-opportunities="jobOpportunities"
              :procurement-notices="procurementNotices"
              @update:active-section="activeSection = $event"
          />
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Filters -->
          <OpportunityFilters
              v-model:search-query="searchQuery"
              v-model:selected-department="selectedDepartment"
              v-model:selected-status="selectedStatus"
              :departments="departments"
              :active-section="activeSection"
          />

          <!-- Results Header -->
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

          <!-- Content Cards -->
          <div class="space-y-6">
            <!-- Job Cards -->
            <template v-if="activeSection === 'jobs'">
              <JobCard
                  v-for="job in paginatedItems"
                  :key="job.id"
                  :job="job"
                  @view-details="handleViewJobDetails"
                  @apply="handleApplyJob"
              />
            </template>

            <!-- Procurement Cards -->
            <template v-else>
              <ProcurementCard
                  v-for="notice in paginatedItems"
                  :key="notice.id"
                  :notice="notice"
                  @express-interest="handleExpressInterest"
                  @download="handleDownloadDocument"
              />
            </template>

            <!-- No Results -->
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
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
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
        </div>
      </div>
    </div>

    <!-- Job Details Modal -->
    <JobDetailsModal
        v-if="showJobModal && selectedJobDetails"
        :job="selectedJobDetails"
        @close="closeJobModal"
        @apply="handleApplyJob"
    />
  </div>
</template>
