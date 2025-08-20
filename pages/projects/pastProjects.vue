<script setup>
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import GeneralSidebar from '../../components/GeneralSidebar.vue';

definePageMeta({ title: 'Past Projects' })

const route = useRoute()
const activeTab = ref('masaf_overview')

const projectGroups = [
  {
    group: 'MASAF',
    items: [
        { id: 'masaf_overview', title: 'Overview' },
        { id: 'psn', title: 'Productive Safety Nets' },
        { id: 'scb', title: 'Systems and Capacity Building' },
        { id: 'pm', title: 'Project Management' }
    ]
  },
  {
    group: 'MIERA',
    items: [
      { id: 'miera_overview', title: 'Overview' }
    ]
  },
  {
    group: 'LED',
    items: [
      { id: 'led_overview', title: 'Overview' }
    ]
  }
]

const openGroup = ref(projectGroups[0].group)

// Map tabs to page slugs
const slugByTab = {
  masaf_overview: 'masaf-overview',
  psn: 'masaf-psn',
  scb: 'masaf-scb',
  pm: 'masaf-pm',
  miera_overview: 'miera-overview',
  led_overview: 'led-overview',
}

// Inject slug into sidebar items
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
    activeTab.value = matchId || 'masaf_overview'
    history.replaceState(null, '', `${route.path}#${activeTab.value}`)
  }
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
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
    <!-- Sidebar -->
    <aside class="w-full md:w-72 flex-shrink-0">
      <div
        v-for="group in projectGroups"
        :key="group.group"
        class="mb-4 rounded-lg overflow-hidden shadow-sm"
      >
        <button
          @click="openGroup = openGroup === group.group ? null : group.group"
          class="w-full text-left px-5 py-3 font-semibold bg-gradient-to-r from-blue-900 to-blue-200 text-white hover:from-blue-400 hover:to-blue-300 transition-all duration-200 flex justify-between items-center"
        >
          <span>{{ group.group }}</span>
          <svg
            class="w-4 h-4 transform transition-transform duration-200"
            :class="{ 'rotate-180': openGroup === group.group }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <div
          v-show="openGroup === group.group"
          class="bg-white border border-gray-200 border-t-0 rounded-b-lg"
        >
          <ul class="py-2">
            <li v-for="item in group.items" :key="item.id">
              <a
                :href="`#${item.id}`"
                @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                :class="[
                  'block px-5 py-2.5 text-sm transition-colors duration-150',
                  item.id === activeTab
                    ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                    : 'hover:bg-gray-50 text-gray-700'
                ]"
              >
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

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