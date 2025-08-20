<script setup lang="ts">
defineProps<{
  title?: string
  columns?: string | number
  features?: Array<{
    title: string
    icon?: string
    icon_bg?: string
    icon_color?: string
    items?: Array<{ label: string }>
  }>
}>()
</script>

<template>
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ title || 'Key Features' }}</h3>

    <div class="grid grid-cols-1 gap-6" :class="{ 'lg:grid-cols-2': String(columns) === '2' }">
      <div v-for="(f, idx) in features || []" :key="idx" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4"
               :style="{ backgroundColor: f.icon_bg || '#D1FAE5', color: f.icon_color || '#059669' }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">{{ f.title }}</h4>
          </div>
        </div>

        <ul class="space-y-3 text-sm text-gray-600">
          <li v-for="(it, j) in f.items || []" :key="j" class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {{ it.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
