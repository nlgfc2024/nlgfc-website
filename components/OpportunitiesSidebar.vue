<script setup>
const props = defineProps({
  activeSection: {
    type: String,
    default: 'jobs'
  },
  jobOpportunities: {
    type: Array,
    default: () => []
  },
  procurementNotices: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:activeSection'])

// Modal state
const showFaqModal = ref(false)

const sections = [
  {
    id: 'jobs',
    name: 'Job Opportunities',
    icon: 'heroicons:briefcase',
    description: 'Current job openings and career opportunities'
  },
  {
    id: 'procurement',
    name: 'Procurement Portal',
    icon: 'heroicons:document-text',
    description: 'Tenders, RFQs, and procurement notices'
  }
]

// Utility functions
const isExpired = (dateString) => {
  return new Date(dateString) < new Date()
}

const getDaysUntilExpiry = (dateString) => {
  const today = new Date()
  const expiryDate = new Date(dateString)
  const diffTime = expiryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Computed stats
const stats = computed(() => {
  const activeJobs = props.jobOpportunities.filter(job => !isExpired(job.expiryDate)).length
  const openTenders = props.procurementNotices.filter(notice => !isExpired(notice.expiryDate)).length

  // Calculate items closing soon (within 7 days)
  const totalClosingSoon = [
    ...props.jobOpportunities.filter(job => !isExpired(job.expiryDate) && getDaysUntilExpiry(job.expiryDate) <= 7),
    ...props.procurementNotices.filter(notice => !isExpired(notice.expiryDate) && getDaysUntilExpiry(notice.expiryDate) <= 7)
  ].length

  return {
    activeJobs,
    openTenders,
    closingSoon: totalClosingSoon
  }
})

const setActiveSection = (sectionId) => {
  emit('update:activeSection', sectionId)
}

const openFaqModal = () => {
  showFaqModal.value = true
}

const closeFaqModal = () => {
  showFaqModal.value = false
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Browse Opportunities</h3>

    <nav class="space-y-2">
      <button
          v-for="section in sections"
          :key="section.id"
          @click="setActiveSection(section.id)"
          :class="[
          'w-full text-left p-4 rounded-lg transition-all duration-200 group',
          activeSection === section.id
            ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
            : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
        ]"
      >
        <div class="flex items-start space-x-3">
          <Icon
              :name="section.icon"
              :class="[
              'w-6 h-6 mt-0.5 transition-colors',
              activeSection === section.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            ]"
          />
          <div>
            <div class="font-medium">{{ section.name }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ section.description }}</div>
          </div>
        </div>
      </button>
    </nav>

    <!-- Quick Stats -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Active Jobs</span>
          <span class="font-medium text-green-600">{{ stats.activeJobs }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Open Tenders</span>
          <span class="font-medium text-blue-600">{{ stats.openTenders }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Closing Soon</span>
          <span class="font-medium text-orange-600">{{ stats.closingSoon }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
      <div class="space-y-2">
        <button
            @click="openFaqModal"
            class="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors group"
        >
          <div class="flex items-center space-x-3">
            <Icon name="heroicons:question-mark-circle" class="w-5 h-5 text-blue-600" />
            <div>
              <div class="text-sm font-medium text-gray-900">FAQ & Guidelines</div>
              <div class="text-xs text-gray-500">Get help with applications</div>
            </div>
          </div>
        </button>

        <a
            href="mailto:hr@nlgfc.gov.mw"
            class="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors group block"
        >
          <div class="flex items-center space-x-3">
            <Icon name="heroicons:envelope" class="w-5 h-5 text-green-600" />
            <div>
              <div class="text-sm font-medium text-gray-900">Contact HR</div>
              <div class="text-xs text-gray-500">hr@nlgfc.gov.mw</div>
            </div>
          </div>
        </a>

        <a
            href="mailto:procurement@nlgfc.gov.mw"
            class="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors group block"
        >
          <div class="flex items-center space-x-3">
            <Icon name="heroicons:building-office" class="w-5 h-5 text-purple-600" />
            <div>
              <div class="text-sm font-medium text-gray-900">Procurement Office</div>
              <div class="text-xs text-gray-500">procurement@nlgfc.gov.mw</div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Help Section -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <div class="bg-blue-50 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h5 class="text-sm font-medium text-blue-900">Need Help?</h5>
            <div class="mt-6 pt-2 border-t border-gray-200">
              <p class="text-xs text-blue-700 mt-1">
                Contact our Human Resource department for job inquiries.
              </p>
              <div class="mt-2 space-y-1">
                <div class="text-xs text-blue-600">
                  <Icon name="heroicons:phone" class="w-3 h-3 inline mr-1" />
                  +265 1 770 244
                </div>
              </div>
            </div>
            <div class="mt-6 pt-2 border-t border-gray-200">
              <p class="text-xs text-blue-700 mt-1">
                Contact our Procurement office for tender questions.
              </p>
              <div class="mt-2 space-y-1">
                <div class="text-xs text-blue-600">
                  <Icon name="heroicons:phone" class="w-3 h-3 inline mr-1" />
                  +265 1 770 244
                </div>
                <div class="mt-6 pt-2 border-t border-gray-200 text-xs text-blue-600">
                  <Icon name="heroicons:map-pin" class="w-3 h-3 inline mr-1" />
                  Area 14, Red Cross Premises, Lilongwe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FAQ Modal -->
  <OpportunitiesFaqGuidelines
      v-if="showFaqModal"
      :active-section="activeSection"
      @close="closeFaqModal"
  />
</template>
