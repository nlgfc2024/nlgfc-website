<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'apply'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

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

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      emit('close')
    }
  }
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Prevent body scroll when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden'

  onUnmounted(() => {
    document.body.style.overflow = 'auto'
  })
})
</script>

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        @click="emit('close')"
    ></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <!-- Header -->
        <div class="flex items-start justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ job.title }}</h2>
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:building-office" class="w-4 h-4 text-blue-600" />
                <span>{{ job.department }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-blue-600" />
                <span>{{ job.location }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:briefcase" class="w-4 h-4 text-blue-600" />
                <span>{{ job.type }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:currency-dollar" class="w-4 h-4 text-green-600" />
                <span class="font-medium text-green-700">{{ job.salary }}</span>
              </div>
            </div>
          </div>

          <button
              @click="emit('close')"
              class="p-2 hover:bg-white hover:bg-opacity-80 rounded-full transition-all duration-200 group"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-200" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div class="space-y-6">
            <!-- Job Description -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Icon name="heroicons:document-text" class="w-5 h-5 mr-2 text-blue-600" />
                Job Description
              </h3>
              <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p class="text-gray-700 leading-relaxed">{{ job.description }}</p>
              </div>
            </div>

            <!-- Key Responsibilities -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Icon name="heroicons:clipboard-document-list" class="w-5 h-5 mr-2 text-green-600" />
                Key Responsibilities
              </h3>
              <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <ul class="space-y-3">
                  <li v-for="(responsibility, index) in job.responsibilities" :key="index" class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span class="text-xs font-medium text-green-600">{{ index + 1 }}</span>
                    </div>
                    <span class="text-gray-700 leading-relaxed">{{ responsibility }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Requirements -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Icon name="heroicons:academic-cap" class="w-5 h-5 mr-2 text-purple-600" />
                Requirements & Qualifications
              </h3>
              <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <ul class="space-y-3">
                  <li v-for="(requirement, index) in job.requirements" :key="index" class="flex items-start space-x-3">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 leading-relaxed">{{ requirement }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Job Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Employment Details -->
              <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 class="font-semibold text-blue-900 mb-3 flex items-center">
                  <Icon name="heroicons:information-circle" class="w-4 h-4 mr-2" />
                  Employment Details
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-blue-700">Position Type:</span>
                    <span class="font-medium text-blue-900">{{ job.type }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-700">Department:</span>
                    <span class="font-medium text-blue-900">{{ job.department }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-700">Location:</span>
                    <span class="font-medium text-blue-900">{{ job.location }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-blue-700">Salary Range:</span>
                    <span class="font-medium text-green-700">{{ job.salary }}</span>
                  </div>
                </div>
              </div>

              <!-- Application Timeline -->
              <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 class="font-semibold text-orange-900 mb-3 flex items-center">
                  <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                  Application Timeline
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-orange-700">Published:</span>
                    <span class="font-medium text-orange-900">{{ formatDate(job.publishDate) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-orange-700">Deadline:</span>
                    <span class="font-medium text-orange-900">{{ formatDate(job.expiryDate) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-orange-700">Days Remaining:</span>
                    <span :class="[
                      'font-medium',
                      getDaysUntilExpiry(job.expiryDate) <= 3 ? 'text-red-600' :
                      getDaysUntilExpiry(job.expiryDate) <= 7 ? 'text-orange-600' : 'text-green-600'
                    ]">
                      {{ getDaysUntilExpiry(job.expiryDate) }} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Application Process -->
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                <Icon name="heroicons:document-arrow-up" class="w-4 h-4 mr-2 text-gray-600" />
                Application Process
              </h4>
              <div class="text-sm text-gray-700 space-y-2">
                <p>To apply for this position, please ensure you have the following documents ready:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Updated CV/Resume</li>
                  <li>Cover letter tailored to this position</li>
                  <li>Certified copies of academic certificates</li>
                  <li>Contact details for three professional references</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>Posted {{ formatDate(job.publishDate) }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              <span>Expires {{ formatDate(job.expiryDate) }}</span>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button
                @click="emit('close')"
                class="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Close
            </button>

            <button
                v-if="!isExpired(job.expiryDate)"
                @click="emit('apply', job.id)"
                class="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md group"
            >
              <Icon name="heroicons:paper-airplane" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>Apply for this Position</span>
            </button>

            <div v-else class="px-6 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg flex items-center space-x-2">
              <Icon name="heroicons:x-circle" class="w-4 h-4" />
              <span>Application Expired</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-in {
  animation: slide-in-from-bottom 0.3s ease-out;
}

/* Custom scrollbar for content area */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
