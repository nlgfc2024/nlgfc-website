<script setup lang="ts">
defineProps<{ html?: string; content?: string; muted?: boolean; lead?: boolean; max_width?: string }>()
</script>

<template>
  <div
    class="prose max-w-none text-gray-700 text-lg leading-relaxed pl-16"
    :class="{ 'text-gray-600': muted, 'text-lg': lead, 'max-w-prose': max_width === 'prose' }"
    v-html="html || content"
  ></div>
</template>
