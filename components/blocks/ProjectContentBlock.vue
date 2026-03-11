<script setup lang="ts">
defineProps<{
  title?: string
  label?: string
  theme?: 'blue' | 'emerald' | 'indigo' | 'purple' | 'orange' | 'rose'
  show_header?: boolean
  body?: string
}>()

const themeToHeader = (theme?: string) => {
  switch (theme) {
    case 'emerald': return 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600'
    case 'indigo': return 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-600'
    case 'purple': return 'from-purple-50 to-purple-100 border-purple-200 text-purple-600'
    case 'orange': return 'from-orange-50 to-orange-100 border-orange-200 text-orange-600'
    case 'rose': return 'from-rose-50 to-rose-100 border-rose-200 text-rose-600'
    case 'blue':
    default: return 'from-blue-50 to-blue-100 border-blue-200 text-blue-600'
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div v-if="show_header !== false" class="px-6 py-5 bg-gradient-to-r" :class="themeToHeader(theme)">
      <h2 class="text-3xl font-bold text-gray-900 mb-1">{{ title }}</h2>
      <div v-if="label" class="flex items-center text-sm" :class="themeToHeader(theme).split(' ').pop()">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
        {{ label.toUpperCase() }}
      </div>
    </div>

    <div class="p-6 prose max-w-none">
      <div v-html="body"></div>
    </div>
  </div>
</template>


