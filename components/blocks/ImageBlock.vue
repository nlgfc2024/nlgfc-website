<script setup lang="ts">
const props = defineProps<{ src: string; alt?: string; fit?: 'contain'|'cover'; height?: string }>()
const imgError = ref(false)
</script>

<template>
  <div :class="`w-full max-w-2xl ${height || 'h-80'} overflow-hidden rounded-lg shadow-lg border border-gray-200`">
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt || ''"
      :class="`w-full h-full object-${fit || 'contain'}`"
      loading="eager"
      @error="imgError = true"
    />
    <div v-else-if="imgError" class="flex items-center justify-center h-full min-h-[200px] text-gray-400 text-sm">
      Image could not be loaded
    </div>
  </div>
</template>



