<script setup lang="ts">
defineProps<{
  values?: Array<{ title: string; description?: string; icon?: string }>
  columns_md?: string | number
  tile_bg?: string
  tile_border?: string
  hover_border?: string
}>()
</script>

<template>
  <div class="grid gap-6" :class="[{ 'md:grid-cols-2': !columns_md || String(columns_md) === '2' }, { 'md:grid-cols-3': String(columns_md) === '3' }, { 'md:grid-cols-4': String(columns_md) === '4' } ]">
    <div
      v-for="(v, i) in values || []"
      :key="i"
      class="p-5 rounded-lg border transition-colors"
      :style="{ backgroundColor: tile_bg || '#F9FAFB', borderColor: tile_border || '#E5E7EB' }"
      :class="[{ 'hover:border-blue-200': !hover_border } ]"
    >
      <div class="flex items-start">
        <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">{{ v.title }}</h3>
          <p v-if="v.description" class="text-gray-700 text-sm">{{ v.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
