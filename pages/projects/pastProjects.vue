<script setup>
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { useGeneralSidebar } from '~/composables/useGeneralSidebar'
import ProjectNewsLanding from '~/components/projects/ProjectNewsLanding.vue'

definePageMeta({ title: 'Past Projects' })

const route = useRoute()
const activeTab = ref('')
const openGroup = ref(null)
const config = useRuntimeConfig()
const legacyMenuSlugsToHide = new Set(['ssrlp', 'gesd', 'masaf', 'rcrp2', 'miera', 'led'])

const sortProgramItems = (items = []) => {
  const rank = (item) => {
    const title = String(item?.title || item?.menu_title || item?.name || '').toLowerCase()
    if (title.includes('news')) return 0
    if (title.includes('overview')) return 1
    return 2
  }

  return [...items].sort((a, b) => {
    const r = rank(a) - rank(b)
    if (r !== 0) return r
    const ao = Number(a?.order ?? a?.menu_order ?? 9999)
    const bo = Number(b?.order ?? b?.menu_order ?? 9999)
    if (ao !== bo) return ao - bo
    return String(a?.title || '').localeCompare(String(b?.title || ''))
  })
}

const { data: pastMenuResponse } = useAsyncData(
  'projects:past:menu',
  () => $fetch(`${config.public.apiBase}/api/projects/menu?project_status=past`),
  { server: true, default: () => ({ data: [] }) }
)

const projectGroupsWithSlugs = computed(() => {
  const raw = Array.isArray(pastMenuResponse.value?.data) ? pastMenuResponse.value.data : []
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
            ? sortProgramItems(
                subgroup.items
                .map((item) => ({ ...item, id: item.id || item.slug, slug: item.slug || item.id }))
                .filter((item) => !legacyMenuSlugsToHide.has(String(item.slug || item.id || '').toLowerCase()))
              )
            : [],
        }))
      : [],
  }))
})

const activeSlug = computed(() => activeTab.value || '')
const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const fallbackNewsImages = ['/images/samples/news1.jpg','/images/samples/news2.jpg','/images/samples/news3.jpg']

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

const { data: activeProjectNews } = useAsyncData(
  () => `past-project-news:${activeSlug.value}`,
  async () => {
    if (!activeSlug.value) return []
    const response = await $fetch(`${config.public.apiBase}/api/projects/${activeSlug.value}/news?per_page=30`)
    return Array.isArray(response?.data) ? response.data : []
  },
  { watch: [activeSlug], server: true, default: () => [] }
)

const newsItemsForActive = computed(() =>
  (activeProjectNews.value || []).map((post) => ({
    id: post.id,
    title: post.title,
    summary: stripHtml(post.content || '').slice(0, 180) + (stripHtml(post.content || '').length > 180 ? '...' : ''),
    date: post.created_at,
    image: post.image || null,
    link: `/news/${post.slug}?source=project&project_status=past`,
  }))
)
const isNewsLanding = computed(() => Boolean(activeProjectPage.value?.project?.is_news_landing))
const pageSize = ref(6)
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(newsItemsForActive.value.length / pageSize.value)))
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return newsItemsForActive.value.slice(start, start + pageSize.value)
})

function goToPage(n) {
  if (n >= 1 && n <= totalPages.value) {
    currentPage.value = n
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
function nextPage() { if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1) }
function prevPage() { if (currentPage.value > 1) goToPage(currentPage.value - 1) }

watch(activeTab, () => { currentPage.value = 1 })
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

// Share groups with the global sidebar
const { projectGroups: sharedProjectGroups } = useGeneralSidebar()
watchEffect(() => {
  sharedProjectGroups.value = projectGroupsWithSlugs.value
})
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

      <section v-if="isNewsLanding && newsItemsForActive.length" class="mt-8">
        <ProjectNewsLanding
          :items="newsItemsForActive"
          :active-tab="activeTab"
          :page-size="3"
          :fallback-images="fallbackNewsImages"
        />
      </section>

      <section v-if="newsItemsForActive.length && !isNewsLanding" class="mt-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Latest Updates</h3>

        <div class="grid md:grid-cols-3 gap-6">
          <article
            v-for="(news, nIdx) in paginatedNews"
            :key="'past-'+news.id"
            class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div class="flex h-full">
              <div class="w-1/3 relative overflow-hidden">
                <img
                  :src="news.image || fallbackNewsImages[nIdx % fallbackNewsImages.length]"
                  alt="Article image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
              </div>
              <div class="w-2/3 p-5 flex flex-col">
                <span class="text-xs font-medium text-gray-500 mb-1">
                  {{ new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </span>
                <h4 class="text-base font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <NuxtLink :to="news.link">{{ news.title }}</NuxtLink>
                </h4>
                <p class="text-sm text-gray-600 line-clamp-2">{{ news.summary }}</p>
              </div>
            </div>
          </article>
        </div>

        <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
          <button
            @click="prevPage()"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm rounded-lg border"
            :class="currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
          >
            Previous
          </button>

          <div class="space-x-2">
            <button
              v-for="p in totalPages"
              :key="'past-page-'+p"
              @click="goToPage(p)"
              class="px-3 py-2 text-sm rounded-lg border"
              :class="p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
            >
              {{ p }}
            </button>
          </div>

          <button
            @click="nextPage()"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm rounded-lg border"
            :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
          >
            Next
          </button>
        </div>
      </section>
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
