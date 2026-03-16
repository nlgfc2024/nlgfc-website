<script setup>
const props = defineProps({
  notice: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'download'])

const normalizedDocuments = computed(() => {
  return Array.isArray(props.notice?.documents) ? props.notice.documents : []
})

const requiredSubmissionDocuments = computed(() => {
  if (Array.isArray(props.notice?.submissionDocumentRequirements) && props.notice.submissionDocumentRequirements.length) {
    return props.notice.submissionDocumentRequirements.filter((document) => document?.is_mandatory)
  }

  return Array.isArray(props.notice?.requiredSubmissionDocumentTypes)
    ? props.notice.requiredSubmissionDocumentTypes
    : []
})

const formatDate = (dateString, withTime = false) => {
  if (!dateString) {
    return 'Not specified'
  }

  const parsed = new Date(dateString)
  if (Number.isNaN(parsed.getTime())) {
    return 'Not specified'
  }

  const options = withTime
    ? {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    : {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }

  return parsed.toLocaleString('en-GB', options)
}

const humanizeValue = (value) => {
  if (!value) {
    return 'Not specified'
  }

  return String(value)
    .split(/[_-]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

const resolveRequirementLabel = (document) => {
  if (document && typeof document === 'object') {
    return document.label || document.supplier_upload_label || document.document_type_label || humanizeValue(document.document_type)
  }

  return humanizeValue(document)
}

const fundingSourceLabel = computed(() => {
  if (props.notice?.fundingSource === 'world_bank') {
    return 'World Bank'
  }

  if (props.notice?.fundingSource === 'government_of_malawi') {
    return 'Government of Malawi'
  }

  return humanizeValue(props.notice?.fundingSource)
})

const statusLabel = computed(() => {
  return props.notice?.status === 'active' ? 'Active' : 'Expired'
})

const statusClasses = computed(() => {
  return props.notice?.status === 'active'
    ? 'bg-green-50 text-green-700 border-green-200'
    : 'bg-red-50 text-red-700 border-red-200'
})

const hasContactInformation = computed(() => {
  return typeof props.notice?.contactInformation === 'string' && props.notice.contactInformation.trim().length > 0
})

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      @click="emit('close')"
    />

    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div class="flex items-start justify-between gap-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-slate-50 p-6">
          <div class="flex-1">
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span :class="['inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold', statusClasses]">
                {{ statusLabel }}
              </span>
              <span class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {{ notice.type || 'Notice' }}
              </span>
              <span class="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {{ fundingSourceLabel }}
              </span>
            </div>

            <h2 class="mb-2 text-2xl font-bold text-gray-900">{{ notice.title }}</h2>

            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:building-office" class="h-4 w-4 text-emerald-600" />
                <span>{{ notice.department || 'Procurement' }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="heroicons:calendar-days" class="h-4 w-4 text-emerald-600" />
                <span>Deadline: {{ formatDate(notice.submissionDeadline || notice.expiryDate, true) }}</span>
              </div>
            </div>
          </div>

          <button
            class="rounded-full p-2 transition-all duration-200 hover:bg-white hover:bg-opacity-80"
            @click="emit('close')"
          >
            <Icon name="heroicons:x-mark" class="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div class="max-h-[calc(90vh-164px)] overflow-y-auto p-6">
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 class="mb-3 flex items-center text-sm font-semibold uppercase tracking-wide text-blue-900">
                  <Icon name="heroicons:information-circle" class="mr-2 h-4 w-4" />
                  Notice Summary
                </h3>
                <dl class="space-y-3 text-sm">
                  <div class="flex justify-between gap-4">
                    <dt class="text-blue-700">Notice ID</dt>
                    <dd class="text-right font-medium text-blue-950">{{ notice.noticeId || 'Not specified' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-blue-700">Reference</dt>
                    <dd class="text-right font-medium text-blue-950">{{ notice.reference || 'Not specified' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-blue-700">Method</dt>
                    <dd class="text-right font-medium text-blue-950">{{ humanizeValue(notice.procurementMethod || notice.type) }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-blue-700">Category</dt>
                    <dd class="text-right font-medium text-blue-950">{{ humanizeValue(notice.category) }}</dd>
                  </div>
                </dl>
              </div>

              <div class="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 class="mb-3 flex items-center text-sm font-semibold uppercase tracking-wide text-orange-900">
                  <Icon name="heroicons:clock" class="mr-2 h-4 w-4" />
                  Timeline
                </h3>
                <dl class="space-y-3 text-sm">
                  <div class="flex justify-between gap-4">
                    <dt class="text-orange-700">Published</dt>
                    <dd class="text-right font-medium text-orange-950">{{ formatDate(notice.publishDate) }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-orange-700">Submission Deadline</dt>
                    <dd class="text-right font-medium text-orange-950">{{ formatDate(notice.submissionDeadline || notice.expiryDate, true) }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-orange-700">Funding</dt>
                    <dd class="text-right font-medium text-orange-950">{{ fundingSourceLabel }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-orange-700">Entity</dt>
                    <dd class="text-right font-medium text-orange-950">{{ notice.department || 'Procurement' }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 class="mb-3 flex items-center text-lg font-semibold text-gray-900">
                <Icon name="heroicons:document-text" class="mr-2 h-5 w-5 text-emerald-600" />
                Procurement Description
              </h3>
              <p class="whitespace-pre-line leading-relaxed text-gray-700">
                {{ notice.description || 'No procurement description provided yet.' }}
              </p>
            </div>

            <div
              v-if="requiredSubmissionDocuments.length > 0"
              class="rounded-lg border border-emerald-200 bg-emerald-50 p-4"
            >
              <h3 class="mb-3 flex items-center text-lg font-semibold text-emerald-900">
                <Icon name="heroicons:clipboard-document-list" class="mr-2 h-5 w-5" />
                Required Submission Documents
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="document in requiredSubmissionDocuments"
                  :key="document.document_type || document"
                  class="flex items-start space-x-3 text-sm text-emerald-900"
                >
                  <Icon name="heroicons:check-badge" class="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <span>{{ resolveRequirementLabel(document) }}</span>
                </li>
              </ul>
            </div>

            <div
              v-if="normalizedDocuments.length > 0"
              class="rounded-lg border border-slate-200 bg-white p-4"
            >
              <h3 class="mb-3 flex items-center text-lg font-semibold text-gray-900">
                <Icon name="heroicons:folder-open" class="mr-2 h-5 w-5 text-slate-600" />
                Available Documents
              </h3>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="document in normalizedDocuments"
                  :key="document.id || document.title || document.original_name"
                  class="inline-flex items-center space-x-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                  @click="emit('download', document)"
                >
                  <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
                  <span>{{ document.title || document.original_name || document.name }}</span>
                </button>
              </div>
            </div>

            <div
              v-if="hasContactInformation"
              class="rounded-lg border border-violet-200 bg-violet-50 p-4"
            >
              <h3 class="mb-3 flex items-center text-lg font-semibold text-violet-900">
                <Icon name="heroicons:phone" class="mr-2 h-5 w-5" />
                Contact Information
              </h3>
              <p class="whitespace-pre-line text-sm leading-relaxed text-violet-900">
                {{ notice.contactInformation }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end border-t border-gray-200 bg-gray-50 p-6">
          <button
            class="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
            @click="emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
