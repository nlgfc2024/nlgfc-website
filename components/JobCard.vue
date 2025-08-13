<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details', 'apply'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const isExpired = (dateString) => {
  return new Date(dateString) < new Date()
}

// Compute status based on expiry date
const jobStatus = computed(() => {
  return isExpired(props.job.expiryDate) ? 'expired' : 'active'
})

const getDaysUntilExpiry = (dateString) => {
  const today = new Date()
  const expiryDate = new Date(dateString)
  const diffTime = expiryDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getStatusColor = (status) => {
  return status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
}

const getTypeColor = (type) => {
  return type === 'Full-time' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div class="flex-1">
        <!-- Job Header -->
        <div class="flex flex-wrap items-start gap-3 mb-3">
          <h3 class="text-xl font-semibold text-gray-900">{{ job.title }}</h3>
          <div class="flex gap-2">
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(jobStatus)]">
              {{ jobStatus === 'active' ? 'Active' : 'Expired' }}
            </span>
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getTypeColor(job.type)]">
              {{ job.type }}
            </span>
          </div>
        </div>

        <!-- Job Details -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:building-office" class="w-4 h-4" />
            <span>{{ job.department }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:map-pin" class="w-4 h-4" />
            <span>{{ job.location }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:calendar" class="w-4 h-4" />
            <span>Expires: {{ formatDate(job.expiryDate) }}</span>
          </div>
        </div>

        <!-- Job Description Preview -->
        <p class="text-gray-700 text-sm line-clamp-2 mb-4">
          {{ job.description }}
        </p>

        <!-- Urgency Indicator -->
        <div v-if="jobStatus === 'active' && getDaysUntilExpiry(job.expiryDate) <= 7" class="flex items-center space-x-2 mb-4">
          <Icon name="heroicons:clock" class="w-4 h-4 text-orange-500" />
          <span class="text-sm text-orange-600 font-medium">
            {{ getDaysUntilExpiry(job.expiryDate) }} days left to apply
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-40">
        <button
            @click="emit('view-details', job)"
            class="px-4 py-2 text-sm font-medium text-gray-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Icon name="heroicons:eye" class="w-4 h-4 text-gray-800" />
          <span>View Details</span>
        </button>

        <button
            v-if="jobStatus === 'active'"
            @click="emit('apply', job.id)"
            class="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
          <span>Apply Now</span>
        </button>

        <span v-else class="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg text-center">
          Expired
        </span>
      </div>
    </div>
  </div>
</template>
