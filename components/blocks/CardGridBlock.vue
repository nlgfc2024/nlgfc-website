<script setup lang="ts">
defineProps<{ cards?: Array<{ title: string; body?: string }> }>()
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6">
    <div
      v-for="(c, i) in cards || []"
      :key="i"
      class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div class="bg-gray-700 px-6 py-4">
        <h4 class="font-semibold text-white">{{ c.title }}</h4>
      </div>
      <div class="p-6">
        <div v-if="c.body" class="text-gray-700 prose max-w-none" v-html="c.body" />
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>
