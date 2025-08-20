<script setup lang="ts">
defineProps<{ src: string; alt?: string; fit?: 'contain'|'cover'; height?: string }>()
</script>

<template>
  <div :class="`w-full max-w-2xl ${height || 'h-80'} overflow-hidden rounded-lg shadow-lg border border-gray-200`">
    <img :src="src" :alt="alt || ''" :class="`w-full h-full object-${fit || 'contain'}`" />
  </div>
</template>


