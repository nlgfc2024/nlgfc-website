<script setup>
const props = defineProps({
  searchQuery: String,
  selectedDepartment: String,
  selectedFundingSource: String,
  selectedStatus: String,
  departments: Array,
  activeSection: String
})

const emit = defineEmits(['update:searchQuery', 'update:selectedDepartment', 'update:selectedFundingSource', 'update:selectedStatus'])

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'expired', label: 'Expired' }
]

const fundingSourceOptions = [
  { value: 'government_of_malawi', label: 'Govt of Malawi' },
  { value: 'world_bank', label: 'Donors (WB)' }
]

const isJobsSection = computed(() => props.activeSection === 'jobs')

const secondaryFilterValue = computed(() => {
  return isJobsSection.value ? props.selectedDepartment : props.selectedFundingSource
})

const secondaryFilterLabel = computed(() => {
  return isJobsSection.value ? 'Department' : 'Financing Source'
})

const secondaryFilterIcon = computed(() => {
  return isJobsSection.value ? 'heroicons:building-office' : 'heroicons:banknotes'
})

const secondaryFilterOptions = computed(() => {
  if (isJobsSection.value) {
    return (props.departments || []).map((department) => ({
      value: department,
      label: department,
    }))
  }

  return fundingSourceOptions
})

const secondaryFilterDefaultLabel = computed(() => {
  return isJobsSection.value ? 'All Departments' : 'All Sources'
})

const selectedSecondaryFilterLabel = computed(() => {
  if (isJobsSection.value) {
    return props.selectedDepartment || ''
  }

  return fundingSourceOptions.find((option) => option.value === props.selectedFundingSource)?.label || props.selectedFundingSource || ''
})

const updateSecondaryFilter = (value) => {
  if (isJobsSection.value) {
    emit('update:selectedDepartment', value)
    return
  }

  emit('update:selectedFundingSource', value)
}

const clearFilters = () => {
  emit('update:searchQuery', '')
  emit('update:selectedStatus', '')
  updateSecondaryFilter('')
}

const hasActiveFilters = computed(() => {
  return props.searchQuery || secondaryFilterValue.value || props.selectedStatus
})

const getPlaceholderText = computed(() => {
  return props.activeSection === 'jobs'
      ? 'Search jobs by title, department, or description...'
      : 'Search procurement notices by title, financing source, or description...'
})

const getSectionIcon = computed(() => {
  return props.activeSection === 'jobs' ? 'heroicons:briefcase' : 'heroicons:document-text'
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <!-- Filter Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <Icon :name="getSectionIcon" class="w-5 h-5 mr-2 text-gray-900" />
        Filter {{ activeSection === 'jobs' ? 'Jobs' : 'Procurement Notices' }}
      </h3>
      <div v-if="hasActiveFilters" class="flex items-center text-sm text-gray-500">
        <Icon name="heroicons:funnel" class="w-4 h-4 mr-1" />
        Filters applied
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- Search -->
      <div class="lg:col-span-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4 inline mr-1" />
          Search
        </label>
        <div class="relative">
          <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
              :value="searchQuery"
              @input="emit('update:searchQuery', $event.target.value)"
              type="text"
              :placeholder="getPlaceholderText"
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
          <button
              v-if="searchQuery"
              @click="emit('update:searchQuery', '')"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Department / Financing Source Filter -->
      <div class="lg:col-span-3">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <Icon :name="secondaryFilterIcon" class="w-4 h-4 inline mr-1" />
          {{ secondaryFilterLabel }}
        </label>
        <div class="relative">
          <select
              :value="secondaryFilterValue"
              @change="updateSecondaryFilter($event.target.value)"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 appearance-none bg-white"
          >
            <option value="">{{ secondaryFilterDefaultLabel }}</option>
            <option v-for="option in secondaryFilterOptions" :key="option.value || option.label" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <Icon name="heroicons:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      <!-- Status Filter -->
      <div class="lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <Icon name="heroicons:check-circle" class="w-4 h-4 inline mr-1" />
          Status
        </label>
        <div class="relative">
          <select
              :value="selectedStatus"
              @change="emit('update:selectedStatus', $event.target.value)"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 appearance-none bg-white"
          >
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
          <Icon name="heroicons:chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      <!-- Clear Filters Button -->
      <div class="lg:col-span-1 flex items-end">
        <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 group"
            title="Clear all filters"
        >
          <Icon name="heroicons:x-mark" class="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span class="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex items-center space-x-2 text-sm">
        <span class="text-gray-600 font-medium">Active filters:</span>
        <div class="flex flex-wrap gap-2">
          <span v-if="searchQuery" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Search: "{{ searchQuery }}"
            <button @click="emit('update:searchQuery', '')" class="ml-1 hover:text-blue-600">
              <Icon name="heroicons:x-mark" class="w-3 h-3" />
            </button>
          </span>
          <span v-if="secondaryFilterValue" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {{ secondaryFilterLabel }}: {{ selectedSecondaryFilterLabel }}
            <button @click="updateSecondaryFilter('')" class="ml-1 hover:text-green-600">
              <Icon name="heroicons:x-mark" class="w-3 h-3" />
            </button>
          </span>
          <span v-if="selectedStatus" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {{ selectedStatus }}
            <button @click="emit('update:selectedStatus', '')" class="ml-1 hover:text-purple-600">
              <Icon name="heroicons:x-mark" class="w-3 h-3" />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom select styling */
select {
  background-image: none;
}

/* Remove default select arrow in IE */
select::-ms-expand {
  display: none;
}
</style>
