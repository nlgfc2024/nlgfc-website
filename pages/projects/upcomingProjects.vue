<script setup>
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';

definePageMeta({ title: 'Upcoming Projects' })

const route = useRoute()
const activeTab = ref('')
const openGroup = ref(null)
const config = useRuntimeConfig()
const legacyMenuSlugsToHide = new Set(['ssrlp', 'gesd', 'masaf', 'rcrp2', 'miera', 'led'])

const { data: upcomingMenuResponse } = useAsyncData(
  'projects:upcoming:menu',
  () => $fetch(`${config.public.apiBase}/api/projects/menu?project_status=upcoming`),
  { server: true, default: () => ({ data: [] }) }
)

const projectGroupsWithSlugs = computed(() => {
  const raw = Array.isArray(upcomingMenuResponse.value?.data) ? upcomingMenuResponse.value.data : []
  return raw.map((group) => ({
    ...group,
    items: Array.isArray(group.items)
      ? group.items
          .map((item) => ({ ...item, id: item.id || item.slug, slug: item.slug || item.id }))
          .filter((item) => !legacyMenuSlugsToHide.has(String(item.slug || item.id || '').toLowerCase()))
      : [],
    subgroups: Array.isArray(group.subgroups)
      ? group.subgroups.map((subgroup) => ({
          ...subgroup,
          items: Array.isArray(subgroup.items)
            ? subgroup.items
                .map((item) => ({ ...item, id: item.id || item.slug, slug: item.slug || item.id }))
                .filter((item) => !legacyMenuSlugsToHide.has(String(item.slug || item.id || '').toLowerCase()))
            : [],
        }))
      : [],
  }))
})

const activeSlug = computed(() => activeTab.value || '')

const { data: activeProjectPage } = useAsyncData(
  () => `project-page:${activeSlug.value}`,
  async () => {
    if (!activeSlug.value) return { page: null, news: [], project: null }
    try {
      return await $fetch(`${config.public.apiBase}/api/projects/${activeSlug.value}/page`)
    } catch {
      const page = await $fetch(`${config.public.apiBase}/api/pages/${activeSlug.value}`)
      return { page, news: [], project: null }
    }
  },
  { watch: [activeSlug], server: true }
)

watch(projectGroupsWithSlugs, (groups) => {
  if (!groups.length) return
  if (!activeTab.value) {
    const q = route.query?.slug
    const slugFromQuery = Array.isArray(q) ? q[0] : q
    const fromHash = route.hash ? route.hash.replace('#', '') : null
    const allItems = groups.flatMap((group) => [
      ...(group.items || []),
      ...((group.subgroups || []).flatMap((subgroup) => subgroup.items || [])),
    ])
    const bySlug = slugFromQuery ? allItems.find((item) => item.slug === slugFromQuery)?.id : null
    const firstProjectItem = allItems.find((item) => item.slug)
    const initial = fromHash || bySlug || firstProjectItem?.id || ''
    activeTab.value = initial
    openGroup.value = groups[0]?.group || null
  }
}, { immediate: true })

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
  for (const group of projectGroupsWithSlugs.value) {
    const direct = (group.items || []).find(item => item.id === hash)
    if (direct && direct.slug) {
      activeTab.value = direct.id
      openGroup.value = group.group
      return
    }
    for (const subgroup of group.subgroups || []) {
      if (subgroup.id === hash) {
        const firstItem = (subgroup.items || []).find(item => item?.slug || item?.id)
        if (firstItem && firstItem.slug) {
          activeTab.value = firstItem.id
          openGroup.value = group.group
          return
        }
      }
      const subItem = (subgroup.items || []).find(item => item.id === hash)
      if (subItem && subItem.slug) {
        activeTab.value = subItem.id
        openGroup.value = group.group
        return
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl pr-30 py-3">
    <!-- Main Content Area -->
    <main class="flex-1 min-w-0">
      <Suspense v-if="activeProjectPage">
        <BlocksRenderer :blocks="activeProjectPage.page?.blocks || []" />
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
