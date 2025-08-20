<script setup>
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';

definePageMeta({ title: 'Upcoming Projects' })

const route = useRoute()
const activeTab = ref('gesd2')

const projectGroups = [
  {
    group: 'Upcoming Projects',
    items: [
      { id: 'gesd2', title: 'GESD 2.0' },
      { id: 'inspire', title: 'INSPIRE-O' }
    ]
  }
]

const openGroup = ref(projectGroups[0].group)

// Map tabs to page slugs
const slugByTab = {
  gesd2: 'gesd-2',
  inspire: 'inspire-o',
}

// Inject slug into items for sidebar link building (if used elsewhere)
const projectGroupsWithSlugs = computed(() =>
  projectGroups.map(g => ({
    ...g,
    items: (g.items || []).map(it => ({ ...it, slug: slugByTab[it.id] || undefined })),
  }))
)

// Active slug
const activeSlug = computed(() => slugByTab[activeTab.value] || '')

// Fetch only the active page reactively
const config = useRuntimeConfig()
const { data: activePage } = useAsyncData(
  () => `page:${activeSlug.value}`,
  () => $fetch(`${config.public.apiBase}/api/pages/${activeSlug.value}`),
  { watch: [activeSlug], server: true }
)

// Set from initial hash or ?slug on load
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  } else {
    const q = route.query?.slug
    const slugFromQuery = Array.isArray(q) ? q[0] : q
    const matchId = Object.keys(slugByTab).find((k) => slugByTab[k] === slugFromQuery)
    activeTab.value = matchId || 'gesd2'
    history.replaceState(null, '', `${route.path}#${activeTab.value}`)
  }
})

const { projectGroups: sharedProjectGroups } = useGeneralSidebar();

watchEffect(() => {
  sharedProjectGroups.value = projectGroupsWithSlugs.value;
})

// React to hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})

function updateActiveTabFromHash(hash) {
  for (const group of projectGroups) {
    const match = group.items.find(item => item.id === hash)
    if (match) {
      activeTab.value = match.id
      openGroup.value = group.group
      break
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl pr-30 py-3">
    <!-- Main Content Area -->
    <main class="flex-1 min-w-0">
      <Suspense v-if="activePage">
        <BlocksRenderer :blocks="activePage.blocks || []" />
        <template #fallback>
          <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
        </template>
      </Suspense>
    </main>
  </div>
</template>

<style>
/* Add custom prose styles for the content */
.prose {
  color: #374151;
}

.prose h2,
.prose h3 {
  color: #111827;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.prose h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5em;
}

.prose h3 {
  font-size: 1.25em;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose strong {
  font-weight: 600;
  color: #1e40af;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1e40af;
}
</style>