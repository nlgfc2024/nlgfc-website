<script setup>
// Nuxt 3 auto-imports definePageMeta and useRoute.
// Vue composition API imports:
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import GeneralSidebar from '../../components/GeneralSidebar.vue';
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import { usePageBlocks } from '~/composables/usePageBlocks'
import BlocksRenderer from '~/components/BlocksRenderer.vue'


definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('cdf')
const isSidebarOpen = ref(true);


// Sidebar structure with groups and nested sub-groups
const projectGroups = [
  {
    group: 'Government Funded Projects',
    id: 'government_funded',
    items: [
      { id: 'cdf', title: 'Constituency Development Fund' },
      { id: 'ddf', title: 'District Development Fund' },
      { id: 'idf', title: 'Infrastructure Development Fund (IDF)' },
      { id: 'rrf', title: 'Road Rehabilitation Fund (RRF)' },
      { id: 'wsf', title: 'Water Structures Fund' },
       { id: 'health_rehab', title: 'Health Rehabilitation' }    
    ]
  },
  {
    group: 'Donor Funded Projects',
    subgroups: [
      {
        subgroup: 'SSRLP',
        id: 'ssrlp_news',
        items: [
          { id: 'ssrlp_news', title: 'SSRLP NEWS' },
          { id: 'ssrlp_overview', title: 'OVERVIEW' },
          { id: 'SCTP', title: 'Social Cash Transfer' },
          { id: 'publicWorks', title: 'Climate Smart Public Works' },
          { id: 'livelihoods', title: 'Livelihoods Support' },
          { id: 'scalable', title: 'Scalable Social Safety Nets' },
          { id: 'cerp', title: 'Contigency Emergency Response' }
        ]
      },
      {
        subgroup: 'GESD',
        id: 'gesd_news',
        items: [
          {id: 'gesd_news', title: 'GESD NEWS'},
          { id: 'gesd_overview', title: 'OVERVIEW' },
      { id: 'pbf', title: 'Performance-Based Financing' },
      { id: 'ias', title: 'Intergovernmental Accountability Systems' },
      { id: 'lgpi', title: 'Local Government Performance Improvement' },
      { id: 'adaptive', title: 'Adaptive Management and Innovation' }
    ]
  },
  {
        subgroup: 'RCRP 2',
        id: 'rcrp2_news',
        items: [
          { id: 'rcrp2_news', title: 'RCRP2 NEWS' },
          { id: 'rcrp_overview', title: 'OVERVIEW' },
      { id: 'drb', title: 'District-Led Resilience Building' },
      { id: 'usr', title: 'Urban Malawi Social Registry' },
      { id: 'upw', title: 'Urban Climate Smart Public Works Program' }
        ]
      }
    ]
  }
]

// Collapsible state
const openGroup = ref(projectGroups[0].group)
const openSubgroup = ref(null)

// Map tab ids to page slugs (adjust slugs to match your Pages table)
const projectSlugByTab = {
  // Government funded
  cdf: 'cdf',
  ddf: 'ddf',
  idf: 'idf',
  rrf: 'rrf',
  wsf: 'wsf',
  health_rehab: 'health-rehabilitation',
  // Donor funded: SSRLP
  ssrlp_news: 'ssrlp-news',
  ssrlp_overview: 'ssrlp-overview',
  SCTP: 'ssrlp-sctp',
  publicWorks: 'ssrlp-public-works',
  livelihoods: 'ssrlp-livelihoods',
  scalable: 'ssrlp-scalable',
  cerp: 'ssrlp-cerp',
  // Donor funded: GESD
  gesd_news: 'gesd-news',
  gesd_overview: 'gesd-overview',
  pbf: 'gesd-pbf',
  ias: 'gesd-ias',
  lgpi: 'gesd-lgpi',
  adaptive: 'gesd-adaptive',
  // Donor funded: RCRP2
  rcrp2_news: 'rcrp2-news',
  rcrp_overview: 'rcrp-overview',
  drb: 'rcrp-drb',
  usr: 'rcrp-usr',
  upw: 'rcrp-upw',
}

// Inject slug onto each sidebar item so links can carry it via query
const projectGroupsWithSlugs = computed(() => {
  return projectGroups.map((group) => {
    if (group.subgroups && Array.isArray(group.subgroups)) {
      return {
        ...group,
        subgroups: group.subgroups.map((sg) => ({
          ...sg,
          items: (sg.items || []).map((it) => ({
            ...it,
            slug: projectSlugByTab[it.id] || undefined,
          })),
        })),
      }
    }
    return {
      ...group,
      items: (group.items || []).map((it) => ({
        ...it,
        slug: projectSlugByTab[it.id] || undefined,
      })),
    }
  })
})

// Active slug
const activeSlug = computed(() => projectSlugByTab[activeTab.value] || '')

// Fetch only the active slug reactively
const config = useRuntimeConfig()
const { data: activePage } = useAsyncData(
  () => `page:${activeSlug.value}`,
  () => $fetch(`${config.public.apiBase}/api/pages/${activeSlug.value}`),
  { watch: [activeSlug], server: true }
)
// Rendering will use BlocksRenderer with all blocks from activePage

const projectUpdates = {
  // Sub-group landing news feeds (existing)
  ssrlp_news: [
    { date: '2024-06-20', title: 'SSRLP mid-year review completed', tags: ['ssrlp','review'], summary: 'Key milestones achieved across all pillars; detailed report forthcoming.', link: '#' },
    { date: '2024-05-14', title: 'Additional livelihood grants disbursed', tags: ['livelihoods'], summary: 'Disbursements reached 3,000 households in priority districts.', link: '#' },
    { date: '2024-04-08', title: 'Shock response window activated', tags: ['emergency'], summary: 'Activation supports drought-affected households with temporary assistance.', link: '#' },
    { date: '2024-03-18', title: 'CS-EPWP sites expanded', tags: ['publicWorks'], summary: 'New catchment restoration sites opened across 5 districts.', link: '#' }
  ],
  gesd_news: [
    { date: '2024-06-08', title: 'New LAPA guidelines issued', tags: ['gesd','governance'], summary: 'Updated guidance for council performance assessments released.', link: '#' },
    { date: '2024-05-12', title: 'PBG top performers announced', tags: ['pbf'], summary: 'Councils exceeding 85% receive performance-based grants.', link: '#' },
    { date: '2024-04-22', title: 'Audit improvements rolled out', tags: ['ias'], summary: 'New intergovernmental accountability tools deployed nationwide.', link: '#' }
  ],
  rcrp2_news: [
    { date: '2024-05-30', title: 'RCRP 2 launch workshops held', tags: ['rcrp'], summary: 'Stakeholder workshops conducted in Blantyre and Lilongwe.', link: '#' },
    { date: '2024-05-10', title: 'Hydro-meteorological stations upgraded', tags: ['infrastructure'], summary: 'Upgrades will improve early warning systems and data accuracy.', link: '#' },
    { date: '2024-04-19', title: 'Catchment rehabilitation plan approved', tags: ['resilience'], summary: 'Plan targets priority basins for ecosystem restoration.', link: '#' }
  ],

  // NEW: Government-funded components
  cdf: [
    { date: '2025-07-22', title: 'CDF Phase II micro-projects cleared', tags: ['cdf','community'], summary: 'Additional 312 micro-projects approved focusing on classrooms, clinics and bridges.', link: '#' },
    { date: '2025-06-11', title: 'Community oversight committees trained', tags: ['capacity','governance'], summary: 'Training completed in 28 councils to strengthen community procurement oversight.', link: '#' },
    { date: '2025-04-29', title: 'Material deliveries reach 85% of sites', tags: ['implementation'], summary: 'Most projects now have core materials on site—construction ramping up this quarter.', link: '#' }
  ],
  ddf: [
    { date: '2025-08-05', title: 'DDF pipeline aligned to updated DDPs', tags: ['ddf','planning'], summary: 'Councils finalized alignment of DDF investments with District Development Plans.', link: '#' },
    { date: '2025-06-18', title: 'Quarterly disbursements released to councils', tags: ['finance'], summary: 'Treasury released Q4 tranches; councils to accelerate works completion.', link: '#' },
    { date: '2025-05-03', title: 'School blocks and boreholes prioritized', tags: ['education','water'], summary: 'Majority of DDF envelopes directed to education and water access gaps.', link: '#' }
  ],
  idf: [
    { date: '2025-07-14', title: 'IDF urban market upgrades commence', tags: ['idf','infrastructure'], summary: 'Urban markets in Mzuzu and Lilongwe begin rehabilitation under IDF.', link: '#' },
    { date: '2025-06-02', title: 'Design reviews completed for public buildings', tags: ['design','qa'], summary: 'Independent design checks completed to ensure safety and value for money.', link: '#' }
  ],
  rrf: [
    { date: '2025-07-30', title: 'Spot regravelling and drainage clearing underway', tags: ['rrf','roads'], summary: 'Maintenance teams deployed on feeder roads ahead of rainy season.', link: '#' },
    { date: '2025-05-20', title: 'Bridge approaches stabilized in priority corridors', tags: ['maintenance','resilience'], summary: 'Critical spots reinforced to reduce washouts during peak flows.', link: '#' }
  ],
  wsf: [
    { date: '2025-08-08', title: 'New borehole drillings confirmed in 9 TAs', tags: ['wsf','water'], summary: 'Contractors mobilized; quality testing and community WASH committees in place.', link: '#' },
    { date: '2025-06-25', title: 'Piped scheme rehabilitation achieves 60% progress', tags: ['rehab'], summary: 'Pump replacements and leak repairs improving uptime across schemes.', link: '#' }
  ],
  health_rehab: [
    { date: '2025-07-19', title: 'Maternity wing refurbishments 70% complete', tags: ['health','rehabilitation'], summary: 'Works focus on roofing, solar backup and sanitation blocks.', link: '#' },
    { date: '2025-05-27', title: 'Equipment delivery schedule finalized', tags: ['procurement'], summary: 'Oxygen concentrators and cold-chain fridges slated for next quarter.', link: '#' }
  ],
}

// --- Pagination state for any news list ---
const pageSize = ref(6)           // cards per page
const currentPage = ref(1)

const newsListForActive = computed(() => projectUpdates[activeTab.value] || [])
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


// Set from initial hash on load
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  } else {
    // No hash: derive from ?slug= or default to 'cdf'
    const q = route.query?.slug
    const slugFromQuery = Array.isArray(q) ? q[0] : q
    const matchId = Object.keys(projectSlugByTab).find((k) => projectSlugByTab[k] === slugFromQuery)
    activeTab.value = matchId || 'cdf'
    // reflect in URL hash for sidebar highlighting
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
    // Match group landing
    if (group.id && group.id === hash) {
      activeTab.value = group.id
      openGroup.value = group.group
      return
    }
    // Flat items (government group)
    if (group.items) {
    const match = group.items.find(item => item.id === hash)
    if (match) {
      activeTab.value = match.id
        openGroup.value = group.group
        return
      }
    }
    // Subgroups (donor group)
    if (group.subgroups) {
      for (const sg of group.subgroups) {
        if (sg.id === hash) {
          activeTab.value = sg.id
          openGroup.value = group.group
          openSubgroup.value = sg.subgroup
          return
        }
        const subMatch = sg.items.find(item => item.id === hash)
        if (subMatch) {
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
const newsLandingTabs = ['ssrlp_news', 'gesd_news', 'rcrp2_news']
const isNewsLanding = computed(() => newsLandingTabs.includes(activeTab.value))

const newsHero = {
  ssrlp_news: { image: '/images/samples/news1.jpg', category: 'SSRLP' },
  gesd_news: { image: '/images/samples/news2.jpg', category: 'GESD' },
  rcrp2_news: { image: '/images/samples/news3.jpg', category: 'RCRP 2' }
}

const newsItemsForActive = computed(() => projectUpdates[activeTab.value] || [])
const heroNewsItem = computed(() => newsItemsForActive.value[0] || null)
const featuredArticles = computed(() => newsItemsForActive.value.slice(0, 3))

const projectStats = {
  ssrlp_news: [
    { label: 'Beneficiaries', value: '590k+' },
    { label: 'Districts & Cities', value: '18 + 4' },
    { label: 'Budget', value: '$516M' }
  ],
  gesd_news: [
    { label: 'Councils', value: '28' },
    { label: 'PBG Windows', value: 'Multiple' },
    { label: 'Assessment', value: 'Annual LAPA' }
  ],
  rcrp2_news: [
    { label: 'Budget', value: '$240M' },
    { label: 'Duration', value: '2024–2029' },
    { label: 'Components', value: '5' }
  ]
}

// Slider state for news landing
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

const newsImages = ['/images/samples/news1.jpg','/images/samples/news2.jpg','/images/samples/news3.jpg']

const slidesForActive = computed(() => (isNewsLanding.value ? (projectUpdates[activeTab.value] || []) : []))

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
  return findItem(projectGroups);
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
              <img :src="newsImages[index % newsImages.length]" :alt="item.title" class="w-full h-full object-cover" />
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
                  <a :href="item.link" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    Read More
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
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
                          :src="newsImages[nIdx % newsImages.length]"
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
                          <a :href="news.link">{{ news.title }}</a>
                        </h3>
                        <p class="text-sm text-gray-600 line-clamp-2">{{ news.summary }}</p>
                        <a :href="news.link" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read more
                          <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                          </svg>
                        </a>
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
          <div v-for="(stat, sIdx) in projectStats[activeTab]" :key="sIdx" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="text-sm text-gray-500">{{ stat.label }}</div>
            <div class="mt-2 text-2xl font-bold text-emerald-700">{{ stat.value }}</div>
          </div>
        </section>
      </div>

      <!-- Standard Project Content (API ProjectContentBlock or fallback sample) -->
      <Suspense v-if="!isNewsLanding && activePage">
        <BlocksRenderer :blocks="activePage.blocks || []" />
        <template #fallback>
          <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
        </template>
      </Suspense>
                    <!-- Latest Updates for this tab -->
            <section v-if="projectUpdates[activeTab] && projectUpdates[activeTab].length && !isNewsLanding" class="mt-8">
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
                        :src="newsImages[nIdx % newsImages.length]"
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
                        <a :href="news.link">{{ news.title }}</a>
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
