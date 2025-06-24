<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 5
  },
  showSizeSelector: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage'])

const pageSizeOptions = [5, 10, 25, 50, 75, 100]

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 7

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    if (props.currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages.value)
    } else if (props.currentPage >= totalPages.value - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages.value)
    }
  }

  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}

const changePageSize = (size) => {
  emit('update:itemsPerPage', size)
  emit('update:currentPage', 1) // Reset to first page when changing page size
}

const showAll = () => {
  emit('update:itemsPerPage', props.totalItems)
  emit('update:currentPage', 1)
}
</script>

<template>
  <div class="bg-white border-t border-gray-200 px-4 py-3 sm:px-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- Results info -->
      <div class="flex items-center text-sm text-gray-700">
        <span>
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </span>
      </div>

      <!-- Page size selector -->
      <div v-if="showSizeSelector" class="flex items-center space-x-2">
        <label class="text-sm text-gray-700">Show:</label>
        <select
            :value="itemsPerPage"
            @change="changePageSize(parseInt($event.target.value))"
            class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <button
            @click="showAll"
            class="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Show All
        </button>
      </div>

      <!-- Pagination controls -->
      <div class="flex items-center space-x-1">
        <!-- Previous button -->
        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
            'relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium transition-colors',
            currentPage === 1
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          ]"
        >
          <Icon name="heroicons:chevron-left" class="h-4 w-4" />
          <span class="sr-only">Previous</span>
        </button>

        <!-- Page numbers -->
        <template v-for="(page, index) in visiblePages" :key="index">
          <button
              v-if="page !== '...'"
              @click="goToPage(page)"
              :class="[
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors',
              page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            ]"
          >
            {{ page }}
          </button>
          <span
              v-else
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
        </template>

        <!-- Next button -->
        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
            'relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium transition-colors',
            currentPage === totalPages
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          ]"
        >
          <Icon name="heroicons:chevron-right" class="h-4 w-4" />
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>

    <!-- Mobile pagination (simplified) -->
    <div class="flex justify-between items-center sm:hidden mt-4">
      <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
          'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors',
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        <Icon name="heroicons:chevron-left" class="h-4 w-4 mr-1" />
        Previous
      </button>

      <span class="text-sm text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
          'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md transition-colors',
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        Next
        <Icon name="heroicons:chevron-right" class="h-4 w-4 ml-1" />
      </button>
    </div>
  </div>
</template>
