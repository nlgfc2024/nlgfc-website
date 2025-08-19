<script setup lang="ts">
defineProps<{
  heading?: string
  intro?: string
  functions?: Array<{
    title: string
    description?: string
    badges?: Array<{ label: string }>
  }>
}>()
</script>

<template>
  <section class="prose max-w-none">
    <div v-if="heading || intro" class="mb-10">
      <h2 v-if="heading" class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
        {{ heading }}
      </h2>
      <p v-if="intro" class="text-lg text-gray-600">{{ intro }}</p>
    </div>

    <div class="space-y-6">
      <div
        v-for="(fn, i) in functions || []"
        :key="i"
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 transition-colors"
      >
        <div class="flex items-start">
          <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h4 class="font-medium text-gray-900 mb-2">{{ fn.title }}</h4>
            <p v-if="fn.description" class="text-gray-700">
              {{ fn.description }}
            </p>

            <div v-if="fn.badges?.length" class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="(b, j) in fn.badges"
                :key="j"
                class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800"
              >
                {{ b.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
