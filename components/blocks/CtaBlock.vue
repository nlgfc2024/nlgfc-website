<script setup lang="ts">
defineProps<{ title?: string; body?: string; link_label?: string; link_url?: string; link_external?: boolean; tone?: string }>()
</script>

<template>
  <div :class="`rounded-xl border p-6 bg-${tone || 'blue'}-50 border-${tone || 'blue'}-200`">
    <h3 v-if="title" class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p v-if="body" class="text-gray-700 mb-4">{{ body }}</p>
    <a :href="link_url || '#'" :target="link_external ? '_blank' : undefined" :rel="link_external ? 'noopener noreferrer' : undefined" :class="`text-${tone || 'blue'}-700 hover:text-${tone || 'blue'}-900 font-medium no-underline`">
      {{ link_label || 'See more' }}
    </a>
  </div>
</template>


