<script setup>
// Nuxt 3 auto-imports definePageMeta and useRoute.
// Vue composition API imports:
import { ref, computed, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
import GeneralSidebar from '../../components/GeneralSidebar.vue';
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import BlocksRenderer from '~/components/BlocksRenderer.vue'


definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('')
const isSidebarOpen = ref(true);
const openGroup = ref(null)
const openSubgroup = ref(null)
const config = useRuntimeConfig()
const legacyMenuSlugsToHide = new Set(['ssrlp', 'gesd', 'masaf', 'rcrp2', 'miera', 'led'])

const { data: currentMenuResponse } = useAsyncData(
  'projects:current:menu',
  () => $fetch(`${config.public.apiBase}/api/projects/menu?project_status=current`),
  { server: true, default: () => ({ data: [] }) }
)

const projectGroupsWithSlugs = computed(() => {
  const raw = Array.isArray(currentMenuResponse.value?.data) ? currentMenuResponse.value.data : []
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
// Rendering will use BlocksRenderer with all blocks from activeProjectPage.page.blocks

const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const resolveMediaUrl = (value) => {
  if (!value) return null
  if (typeof value !== 'string') return null
  if (value.startsWith('http')) return value
  return `${config.public.apiBase}/storage/${value.replace(/^\/+/, '')}`
}

const mapPostToNewsItem = (post) => ({
  id: post.id,
  date: post.created_at,
  title: post.title,
  summary: stripHtml(post.content || '').slice(0, 180) + (stripHtml(post.content || '').length > 180 ? '...' : ''),
  link: `/news/${post.slug}?source=project`,
  image: resolveMediaUrl(post.image),
  tags: post.project?.slug ? [post.project.slug] : [],
})

const mapApiNewsToItem = (post) => ({
  id: post.id,
  date: post.created_at,
  title: post.title,
  summary: stripHtml(post.content || '').slice(0, 180) + (stripHtml(post.content || '').length > 180 ? '...' : ''),
  link: `/news/${post.slug}?source=project`,
  image: resolveMediaUrl(post.image),
  tags: post.project?.slug ? [post.project.slug] : [],
})

const { data: activeProjectNews } = useAsyncData(
  () => `project-news:${activeSlug.value}`,
  async () => {
    if (!activeSlug.value) return []
    const response = await $fetch(`${config.public.apiBase}/api/projects/${activeSlug.value}/news?per_page=30`)
    return Array.isArray(response?.data) ? response.data : []
  },
  { watch: [activeSlug], server: true, default: () => [] }
)

const dynamicNewsForActive = computed(() => (activeProjectNews.value || []).map(mapPostToNewsItem))
const fallbackPageNews = computed(() => {
  const pageNews = activeProjectPage.value?.news
  return Array.isArray(pageNews) ? pageNews.map(mapApiNewsToItem) : []
})

const staticLandingFallback = {
  'ssrlp-news': [
    { id: 'ssrlp-fallback-1', date: '2026-03-01', title: 'SSRLP Implementation Update', summary: 'Program implementation update for SSRLP components across councils.', link: '/resourceCenter', image: null, tags: ['ssrlp'] },
    { id: 'ssrlp-fallback-2', date: '2026-02-20', title: 'SSRLP Livelihoods Support Milestone', summary: 'New milestone reached in livelihoods support rollout.', link: '/resourceCenter', image: null, tags: ['ssrlp'] },
    { id: 'ssrlp-fallback-3', date: '2026-02-10', title: 'SSRLP Public Works Progress', summary: 'Climate smart public works progress reported in multiple districts.', link: '/resourceCenter', image: null, tags: ['ssrlp'] },
  ],
  'gesd-news': [
    { id: 'gesd-fallback-1', date: '2026-03-02', title: 'GESD Accountability Update', summary: 'Governance accountability implementation update across local authorities.', link: '/resourceCenter', image: null, tags: ['gesd'] },
    { id: 'gesd-fallback-2', date: '2026-02-18', title: 'GESD Performance Financing Highlights', summary: 'Performance-based financing highlights from current cycle.', link: '/resourceCenter', image: null, tags: ['gesd'] },
    { id: 'gesd-fallback-3', date: '2026-02-05', title: 'GESD Monitoring Improvements', summary: 'Monitoring and reporting improvements deployed for councils.', link: '/resourceCenter', image: null, tags: ['gesd'] },
  ],
  'rcrp2-news': [
    { id: 'rcrp2-fallback-1', date: '2026-03-03', title: 'RCRP2 Catchment Rehabilitation Update', summary: 'Regional catchment rehabilitation activities are progressing.', link: '/resourceCenter', image: null, tags: ['rcrp2'] },
    { id: 'rcrp2-fallback-2', date: '2026-02-19', title: 'RCRP2 Urban Resilience Planning', summary: 'Urban resilience planning activities continue in targeted councils.', link: '/resourceCenter', image: null, tags: ['rcrp2'] },
    { id: 'rcrp2-fallback-3', date: '2026-02-08', title: 'RCRP2 Workshop Outcomes', summary: 'Recent workshops produced implementation actions for next quarter.', link: '/resourceCenter', image: null, tags: ['rcrp2'] },
  ],
}

const updatesForActive = computed(() => {
  if (dynamicNewsForActive.value.length) return dynamicNewsForActive.value
  if (fallbackPageNews.value.length) return fallbackPageNews.value
  return staticLandingFallback[activeSlug.value] || []
})

// --- Pagination state for any news list ---
const pageSize = ref(6)           // cards per page
const currentPage = ref(1)

const newsListForActive = computed(() => updatesForActive.value || [])
const totalPages = computed(() => Math.max(1, Math.ceil(newsListForActive.value.length / pageSize.value)))
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return newsListForActive.value.slice(start, start + pageSize.value)
})

function goToPage(n) {
  if (n >= 1 && n <= totalPages.value) {
    currentPage.value = n
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
function nextPage() { if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1) }
function prevPage() { if (currentPage.value > 1) goToPage(currentPage.value - 1) }

// Reset page when switching tabs
watch(activeTab, () => { currentPage.value = 1 })

watch(projectGroupsWithSlugs, (groups) => {
  if (!groups.length || activeTab.value) return

  const q = route.query?.slug
  const slugFromQuery = Array.isArray(q) ? q[0] : q
  const fromHash = route.hash ? route.hash.replace('#', '') : null

  const allItems = groups.flatMap((group) => [
    ...(group.items || []),
    ...((group.subgroups || []).flatMap((subgroup) => subgroup.items || [])),
  ])
  const lookupBySlug = slugFromQuery ? allItems.find((item) => item.slug === slugFromQuery)?.id : null
  const firstProjectItem = allItems.find((item) => item.slug)

  const fallbackId = firstProjectItem?.id || ''

  activeTab.value = fromHash || lookupBySlug || fallbackId
  openGroup.value = groups[0]?.group || null
}, { immediate: true })

// React to hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})

watch(donorProjects, () => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  }
})

function updateActiveTabFromHash(hash) {
  for (const group of projectGroupsWithSlugs.value) {
    // Match group landing
    if (group.id && group.id === resolvedHash) {
      activeTab.value = group.id
      openGroup.value = group.group
      return
    }
    // Flat items (government group)
    if (group.items) {
    const match = group.items.find(item => item.id === hash)
    if (match && match.slug) {
      activeTab.value = match.id
        openGroup.value = group.group
        return
      }
    }
    // Subgroups (donor group)
    if (group.subgroups) {
      for (const sg of group.subgroups) {
        if (sg.id === hash) {
          const firstItem = (sg.items || []).find((item) => item?.slug || item?.id)
          if (!firstItem) return
          activeTab.value = firstItem.id
          openGroup.value = group.group
          openSubgroup.value = sg.id
          return
        }
        const subMatch = sg.items.find(item => item.id === hash)
        if (subMatch && subMatch.slug) {
          activeTab.value = subMatch.id
          openGroup.value = group.group
          openSubgroup.value = sg.subgroup
          return
        }
      }
    }
  }
}

// Optional: scroll to top on tab change
watch(activeTab, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// News landing configuration (hero + featured grid + stats)
const forcedNewsLandingSlugs = new Set(['ssrlp-news', 'gesd-news', 'rcrp2-news', 'crp2-news'])
const isNewsLanding = computed(() =>
  forcedNewsLandingSlugs.has(activeSlug.value) || Boolean(activeProjectPage.value?.project?.is_news_landing)
)

const newsHero = computed(() => ({
  [activeTab.value]: {
    image: '/images/samples/news1.jpg',
    category: activeProjectPage.value?.project?.program_group || 'Project',
  },
}))

const newsItemsForActive = computed(() => updatesForActive.value || [])
const heroNewsItem = computed(() => newsItemsForActive.value[0] || null)
const featuredArticles = computed(() => newsItemsForActive.value.slice(0, 3))

const projectStatsForActive = computed(() => ([
  { label: 'Status', value: activeProjectPage.value?.project?.status?.name || 'Current' },
  { label: 'Funding', value: activeProjectPage.value?.project?.funding_type?.name || 'N/A' },
  { label: 'Program', value: activeProjectPage.value?.project?.program_group || 'N/A' },
]))

// Slider state for news landing
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

const fallbackNewsImages = ['/images/samples/news1.jpg','/images/samples/news2.jpg','/images/samples/news3.jpg']

const slidesForActive = computed(() => (isNewsLanding.value ? (updatesForActive.value || []) : []))

function nextSlide() {
  if (!slidesForActive.value.length) return
  currentSlide.value = (currentSlide.value + 1) % slidesForActive.value.length
  resetAutoplay()
}

function prevSlide() {
  if (!slidesForActive.value.length) return
  currentSlide.value = (currentSlide.value - 1 + slidesForActive.value.length) % slidesForActive.value.length
  resetAutoplay()
}

function goToSlide(index) {
  if (!slidesForActive.value.length) return
  currentSlide.value = index
  resetAutoplay()
}

function resetAutoplay() {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    startAutoplay()
  }
}

function startAutoplay() {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    autoplayTimer = setInterval(() => {
      nextSlide()
    }, autoplayInterval.value)
  }
}

function toggleAutoplay() {
  autoplay.value = !autoplay.value
  if (autoplay.value) startAutoplay()
  else clearInterval(autoplayTimer)
}

watch(activeTab, () => {
  // reset slider when switching between tabs
  currentSlide.value = 0
  if (isNewsLanding.value) startAutoplay()
  else clearInterval(autoplayTimer)
})

onMounted(() => {
  if (isNewsLanding.value) startAutoplay()
})

onBeforeUnmount(() => {
  clearInterval(autoplayTimer)
})

const { projectGroups: sharedProjectGroups } = useGeneralSidebar();

watchEffect(() => {
  sharedProjectGroups.value = projectGroupsWithSlugs.value;
});

function handleHashChange() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    activeTab.value = hash;
  }
}

onMounted(() => {
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange);
});

const activeProjectTitle = computed(() => {
  const findItem = (groups) => {
    for (const group of groups) {
      if (group.id && group.id === activeTab.value) {
        return group.group;
      }
      if (group.items) {
        const item = group.items.find(i => i.id === activeTab.value);
        if (item) {
          return item.title;
        }
      }
      if (group.subgroups) {
        for (const sg of group.subgroups) {
          if (sg.id === activeTab.value) {
            return sg.subgroup;
          }
          const item = sg.items.find(i => i.id === activeTab.value);
          if (item) {
            return item.title;
          }
        }
      }
    }
    return 'Project Overview';
  };
  return findItem(projectGroupsWithSlugs.value);
});

// removed sample projectContent provider
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl pr-30 py-3">
    <!-- Sidebar 
    <GeneralSidebar
      sidebarType="projects"
      :sectionsData="projectGroups"
      :activeId="activeTab"
      :sidebarOpen="isSidebarOpen"
      sidebarTitle="Current Projects"
      @update:activeId="activeTab = $event"
    />-->

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 relative md:z-10">
      <!-- News Landing: Sliding Hero + Related News + Stats -->
      <div v-if="isNewsLanding" class="space-y-10">
        <!-- Sliding Hero -->
        <section class="relative overflow-hidden rounded-xl shadow-2xl h-[360px] md:h-[420px]">
          <div
            v-for="(item, index) in slidesForActive"
            :key="index"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
          >
            <!-- Background image with overlay -->
            <div class="absolute inset-0">
              <img :src="item.image || fallbackNewsImages[index % fallbackNewsImages.length]" :alt="item.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end z-10 pb-12">
              <div class="px-6">
                <div class="mb-3">
                  <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                    {{ (activeTab.split('_')[0] || 'Project').toUpperCase() }} News
                  </span>
                </div>
                <div class="max-w-3xl">
                  <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ item.title }}</h2>
                  <p class="text-white/90">{{ item.summary }}</p>
                </div>
                <div class="mt-5" v-if="item.link">
                  <NuxtLink :to="item.link" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    Read More
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
            <div class="px-6 flex items-center justify-between">
              <!-- Indicators -->
              <div class="flex space-x-2">
                <button
                  v-for="(item, idx) in slidesForActive"
                  :key="'ind-' + idx"
                  @click="goToSlide(idx)"
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
                ></button>
              </div>
              <!-- Arrows + autoplay -->
              <div class="flex items-center space-x-4">
                <button @click="toggleAutoplay" class="p-2 text-white/70 hover:text-white transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  </svg>
                </button>
                <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

                    <!-- Related News -->
              <section v-if="slidesForActive.length" class="px-1">
                <div class="grid md:grid-cols-3 gap-6">
                  <article
                    v-for="(news, nIdx) in paginatedNews"
                    :key="'rel-'+nIdx"
                    class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div class="flex h-full">
                      <!-- Image on left -->
                      <div class="w-1/3 relative overflow-hidden">
                        <img
                          :src="news.image || fallbackNewsImages[nIdx % fallbackNewsImages.length]"
                          alt="Article image"
                          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        >
                      </div>

                      <!-- Content on right -->
                      <div class="w-2/3 p-5 flex flex-col">
                        <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          {{ new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                        </span>
                        <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <NuxtLink :to="news.link">{{ news.title }}</NuxtLink>
                        </h3>
                        <p class="text-sm text-gray-600 line-clamp-2">{{ news.summary }}</p>
                        <NuxtLink :to="news.link" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read more
                          <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                          </svg>
                        </NuxtLink>
                      </div>
                    </div>
                  </article>
                </div>

                <!-- Pagination controls -->
                <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
                  <button
                    @click="prevSlide(); prevPage()"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 text-sm rounded-lg border"
                    :class="currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
                  >
                    Previous
                  </button>

                  <div class="space-x-2">
                    <button
                      v-for="p in totalPages"
                      :key="'p-'+p"
                      @click="goToPage(p)"
                      class="px-3 py-2 text-sm rounded-lg border"
                      :class="p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
                    >
                      {{ p }}
                    </button>
                  </div>

                  <button
                    @click="nextSlide(); nextPage()"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 text-sm rounded-lg border"
                    :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
                  >
                    Next
                  </button>
                </div>
              </section>


        <!-- Project Statistics -->
        <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(stat, sIdx) in projectStatsForActive" :key="sIdx" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="text-sm text-gray-500">{{ stat.label }}</div>
            <div class="mt-2 text-2xl font-bold text-emerald-700">{{ stat.value }}</div>
          </div>
        </section>
      </div>

      <!-- Standard Project Content (API ProjectContentBlock or fallback sample) -->
      <Suspense v-if="!isNewsLanding && activeProjectPage">
        <BlocksRenderer :blocks="activeProjectPage.page?.blocks || []" />
        <template #fallback>
          <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
        </template>
      </Suspense>
                    <!-- Latest Updates for this tab -->
            <section v-if="updatesForActive.length && !isNewsLanding" class="mt-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Latest Updates</h3>

              <div class="grid md:grid-cols-3 gap-6">
                <article
                  v-for="(news, nIdx) in paginatedNews"
                  :key="'proj-'+nIdx"
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

              <!-- Pagination controls -->
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
                    :key="'pp-'+p"
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

.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 1.5em;
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

/* Optional: nicer thin scrollbars only for WebKit (sidebar) */
@media (min-width: 768px) {
  .md\:overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  .md\:overflow-y-auto::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 8px;
  }
  .md\:overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }
}
</style>
