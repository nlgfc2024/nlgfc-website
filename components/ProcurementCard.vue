<script setup>
const props = defineProps({
  notice: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['express-interest', 'download'])

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
const noticeStatus = computed(() => {
  return isExpired(props.notice.expiryDate) ? 'expired' : 'active'
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
  const colors = {
    'RFQ': 'text-pink-600 bg-pink-50',
    'RFP': 'text-pink-600 bg-pink-50',
    'Tender': 'text-pink-600 bg-pink-50'
  }
  return colors[type] || 'text-gray-600 bg-gray-50'
}

const getDocumentIcon = (type) => {
  return type === 'pdf' ? 'heroicons:document-text' : 'heroicons:document'
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div class="flex-1">
        <!-- Notice Header -->
        <div class="flex flex-wrap items-start gap-3 mb-3">
          <h3 class="text-xl font-semibold text-gray-900">{{ notice.title }}</h3>
          <div class="flex gap-2">
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(noticeStatus)]">
              {{ noticeStatus === 'active' ? 'Active' : 'Expired' }}
            </span>
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', getTypeColor(notice.type)]">
              {{ notice.type }}
            </span>
          </div>
        </div>

        <!-- Notice Details -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:building-office" class="w-4 h-4" />
            <span>{{ notice.department }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:calendar" class="w-4 h-4" />
            <span>Published: {{ formatDate(notice.publishDate) }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:clock" class="w-4 h-4" />
            <span>Expires: {{ formatDate(notice.expiryDate) }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:currency-dollar" class="w-4 h-4" />
            <span>{{ notice.estimatedValue }}</span>
          </div>
        </div>

        <!-- Notice Description -->
        <p class="text-gray-700 text-sm mb-4">
          {{ notice.description }}
        </p>

        <!-- Documents -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Available Documents:</h4>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="document in notice.documents"
                :key="document.name"
                @click="emit('download', document, notice.title)"
                class="flex items-center space-x-2 px-3 py-2 text-sm text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <Icon :name="getDocumentIcon(document.type)" class="w-4 h-4" />
              <span>{{ document.name }}</span>
              <Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Urgency Indicator -->
        <div v-if="noticeStatus === 'active' && getDaysUntilExpiry(notice.expiryDate) <= 7" class="flex items-center space-x-2 mb-4">
          <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 text-orange-500" />
          <span class="text-sm text-orange-600 font-medium">
            {{ getDaysUntilExpiry(notice.expiryDate) }} days left to submit
          </span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="lg:w-40">
        <button
            v-if="noticeStatus === 'active'"
            @click="emit('express-interest', notice.id)"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Icon name="heroicons:hand-raised" class="w-4 h-4" />
          <span>Express Interest</span>
        </button>

        <span v-else class="w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg text-center block">
          Expired
        </span>
      </div>
    </div>
  </div>
</template>
