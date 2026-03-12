<script setup lang="ts">
defineProps<{
  items?: Array<{ label: string; description?: string; icon?: string }>
  style?: 'checks' | 'bullets' | 'numbers'
  show_leading_icons?: boolean
  default_icon?: string
  columns?: string | number
}>()
</script>

<template>
  <div :class="[{ 'grid md:grid-cols-2 gap-4': String(columns) === '2' }]">
    <ul v-if="style !== 'numbers'" class="space-y-3 pl-10">
      <li v-for="(it, i) in items || []" :key="i" class="flex">
        <span v-if="show_leading_icons !== false" class="flex-shrink-0 mt-1 mr-3 text-blue-500">
          <svg v-if="style === 'checks'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else class="block w-2 h-2 rounded-full bg-blue-500"></span>
        </span>
        <div>
          <div class="text-gray-800">{{ it.label }}</div>
          <div v-if="it.description" class="text-gray-600 text-sm">{{ it.description }}</div>
        </div>
      </li>
    </ul>

    <ol v-else class="space-y-3 pl-10 list-decimal">
      <li v-for="(it, i) in items || []" :key="i" class="text-gray-800">
        <div>{{ it.label }}</div>
        <div v-if="it.description" class="text-gray-600 text-sm">{{ it.description }}</div>
      </li>
    </ol>
  </div>
</template>
