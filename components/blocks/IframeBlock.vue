<script setup lang="ts">
defineProps<{ src: string; height?: number | string; title?: string; allow_transparency?: boolean }>()
</script>

<template>
  <div class="bg-white rounded border border-gray-300 overflow-hidden">
    <div v-if="title" class="px-4 py-2 border-b bg-gray-50 text-gray-700 text-sm">{{ title }}</div>
    <iframe :src="src" frameborder="0" width="100%" :height="height || 600" :allowtransparency="allow_transparency ? true : undefined" class="w-full" />
  </div>
</template>


