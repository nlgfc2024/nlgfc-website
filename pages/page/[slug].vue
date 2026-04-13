<script setup>
import BlocksRenderer from '~/components/BlocksRenderer.vue'

const route = useRoute()

const slug = computed(() => String(route.params.slug || '').trim())

const apiBase = useApiBase()

const { data: pagePayload } = useAsyncData(
  `generic-page:${slug.value}`,
  async () => {
    if (!slug.value) return null
    return await $fetch(`${apiBase}/api/pages/${slug.value}`)
  },
  { watch: [slug], server: false, lazy: true }
)
</script>

<template>
  <main class="flex-1 min-w-0">
    <Suspense v-if="pagePayload">
      <BlocksRenderer :blocks="pagePayload.blocks || []" />
      <template #fallback>
        <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
      </template>
    </Suspense>
    <div v-else class="text-sm text-gray-600">
      Page not found.
    </div>
  </main>
</template>
