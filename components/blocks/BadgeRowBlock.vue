<script setup lang="ts">
defineProps<{ badges?: Array<{ label: string }> }>()
</script>

<template>
  <div class="mt-3 flex flex-wrap gap-2">
    <span
      v-for="(b, i) in badges || []"
      :key="i"
      class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800"
    >
      {{ b.label }}
    </span>
  </div>
</template>
