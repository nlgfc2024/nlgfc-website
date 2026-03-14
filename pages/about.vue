<script setup>
    import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
    import BlocksRenderer from '~/components/BlocksRenderer.vue'
  import { useApiDataArray } from '~/composables/useApiData'

    definePageMeta({
    title: 'About Us'
    })

    const route = useRoute()
    const config = useRuntimeConfig()
    const activeTab = ref('mvc')
    const openSubMenu = ref(null)
    const imageError = ref(false)

    const handleImageError = () => {
    imageError.value = true;
    console.error("Organogram image failed to load");
    };

    const apiBaseUrl = computed(() => (config.public.baseUrl || 'http://localhost:8000').replace(/\/$/, ''))
    const pagesApiBaseUrl = computed(() => (config.public.apiBase || config.public.baseUrl || 'http://localhost:8000').replace(/\/$/, ''))

    const TAB_PAGE_SLUGS = {
      mvc: 'mission-vision-core-values',
      powers: 'powers-and-functions-of-nlgfc',
      finance: 'directorate-of-finance-and-fiscal-decentralization',
      corporate: 'directorate-of-corporate-and-strategic-services',
      social: 'directorate-of-social-and-economic-dev-services',
      planning: 'planning-monitoring-and-evaluation-division',
      procurement: 'procurement-and-assets-disposal-division',
      audit: 'internal-audit-and-risk-division'
    }

    const normalizeImageUrl = (imagePath) => {
      if (!imagePath || typeof imagePath !== 'string') return ''
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
      if (imagePath.startsWith('/images/')) return imagePath
      if (imagePath.startsWith('/storage/')) return `${apiBaseUrl.value}${imagePath}`
      return `${apiBaseUrl.value}/storage/${imagePath.replace(/^\/+/, '')}`
    }

    const { data: boardMembers, loading: boardLoading, error: boardError, refresh: refreshBoard } = useApiDataArray(
      'about-board-of-directors',
      '/api/board-of-directors',
      {
        immediate: false,
        lazy: true,
        server: false
      }
    )

    const { data: executiveMembers, loading: executiveLoading, error: executiveError, refresh: refreshExecutive } = useApiDataArray(
      'about-executive-management',
      '/api/executive-management',
      {
        immediate: false,
        lazy: true,
        server: false
      }
    )

    const boardRequested = ref(false)
    const executiveRequested = ref(false)
    const pageBlocksByTab = reactive({})
    const pageLoadingByTab = reactive({})
    const pageErrorByTab = reactive({})
    const pageLoadedByTab = reactive({})

    const boardChairperson = computed(() => {
      if (!Array.isArray(boardMembers.value) || !boardMembers.value.length) return null
      return boardMembers.value.find((member) => /chair/i.test(member?.position || '')) || boardMembers.value[0]
    })

    const boardOtherMembers = computed(() => {
      if (!Array.isArray(boardMembers.value) || !boardMembers.value.length) return []
      if (!boardChairperson.value) return boardMembers.value
      return boardMembers.value.filter((member) => member !== boardChairperson.value)
    })

    const executiveDirector = computed(() => {
      if (!Array.isArray(executiveMembers.value) || !executiveMembers.value.length) return null
      return executiveMembers.value.find((member) => /executive director/i.test(member?.position || '')) || executiveMembers.value[0]
    })

    const otherExecutiveDirectors = computed(() => {
      if (!Array.isArray(executiveMembers.value) || !executiveMembers.value.length) return []
      if (!executiveDirector.value) return executiveMembers.value
      return executiveMembers.value.filter((member) => member !== executiveDirector.value)
    })

    const menuItems = ref([
    { 
        items: [
        { id: 'mvc', title: 'Mission, Vision and Core Values' },
        { id: 'powers', title: 'Powers and Functions' },
        { id: 'board', title: 'Board of Directors' },
        { id: 'management', title: 'Executive Management' },
        { id: 'organisational-structure', title: 'Organisational Structure' },
        // { id: 'structure', title: 'Organogram' },
        ]
    },
    { 
        items: [
        { 
            id: 'directorates', 
            title: 'Directorates and Divisions',
            subItems: [
            { id: 'finance', title: 'Finance & Fiscal Decentralization' },
            { id: 'corporate', title: 'Corporate & Strategic Services' },
            { id: 'social', title: 'Social & Economic Development Services' },
            { id: 'planning', title: 'Planning, M&E' },
            { id: 'procurement', title: 'Procurement' },
            { id: 'audit', title: 'Internal Audit' }
            ]
        }
        ]
    }
    ])

    const isActive = (tabId) => {
    return activeTab.value === tabId
    }
    onMounted(() => {
    if (route.hash) {
        updateActiveTabFromHash(route.hash.replace('#', ''))
    } else {
        // Set default tab if no hash is present
        activeTab.value = 'mvc'
    }
    })

    watch(() => route.hash, (hash) => {
    if (hash) {
        updateActiveTabFromHash(hash.replace('#', ''))
    }
    })

    // Flat items: normal sidebar links (no accordion)
    const flatSectionIds = ['mvc', 'powers', 'board', 'management', 'organisational-structure'];
    const sidebarSectionsData = computed(() => {
        return menuItems.value.flatMap(section =>
            section.items
                .filter(item => flatSectionIds.includes(item.id))
                .map(item => ({ id: item.id, name: item.title }))
        );
    });
    // Groups with accordion (only Directorates and Divisions)
    const accordionGroupsData = computed(() => {
        return menuItems.value.flatMap(section =>
            section.items
                .filter(item => item.subItems && item.subItems.length > 0)
                .map(item => ({
                    group: item.title,
                    id: item.id,
                    items: item.subItems
                }))
        );
    });

// Use the composable to share the data
const { projectGroups } = useGeneralSidebar();

// Combined for sidebar rendering:
// - Top-level links as standalone sections (no dropdown)
// - Directorates as a single accordion group
const sidebarData = computed(() => [
  ...sidebarSectionsData.value,
  ...accordionGroupsData.value,
]);

watchEffect(() => {
  projectGroups.value = sidebarData.value;
});

// Page-builder: Mission, Vision, Core Values content
// const { data: mvcPage, pending: mvcPending, error: mvcError } = usePageBlocks('mission-vision-core-values')
    
const { data: pages, pending, error: PageError } = usePageBlocks([
  'powers-and-functions-of-nlgfc','procurement-and-assets-disposal-division',
  'directorate-of-finance-and-fiscal-decentralization','directorate-of-corporate-and-strategic-services',
  'planning-monitoring-and-evaluation-division',
  'internal-audit-and-risk-division','directorate-of-social-and-economic-dev-services'
])

const PagePending = pending

const isTabPageSlug = (tabId) => Object.prototype.hasOwnProperty.call(TAB_PAGE_SLUGS, tabId)

const getTabSlug = (tabId) => TAB_PAGE_SLUGS[tabId]

const fetchTabPage = async (tabId, force = false) => {
  if (!isTabPageSlug(tabId)) return

  const slug = getTabSlug(tabId)
  if (!slug) return

  if (!force && pageLoadedByTab[tabId]) return
  if (pageLoadingByTab[tabId]) return

  pageLoadingByTab[tabId] = true
  pageErrorByTab[tabId] = null

  try {
    const page = await $fetch(`${pagesApiBaseUrl.value}/api/pages/${slug}`)
    pageBlocksByTab[tabId] = page?.blocks || []
    pageLoadedByTab[tabId] = true
  } catch (error) {
    pageErrorByTab[tabId] = error
  } finally {
    pageLoadingByTab[tabId] = false
  }
}

const getTabBlocks = (tabId) => {
  if (Array.isArray(pageBlocksByTab[tabId])) return pageBlocksByTab[tabId]
  const slug = getTabSlug(tabId)
  return pages.value?.[slug]?.blocks || []
}

const isTabPageLoading = (tabId) => {
  if (pageLoadingByTab[tabId]) return true

  const slug = getTabSlug(tabId)
  if (!slug) return false

  return pending.value && !pages.value?.[slug]
}

const getTabPageError = (tabId) => {
  if (pageErrorByTab[tabId]) return pageErrorByTab[tabId]

  const slug = getTabSlug(tabId)
  if (!slug) return null

  return PageError.value && !pages.value?.[slug] ? PageError.value : null
}

const ensureLeadershipDataForTab = async (tabId) => {
  if (tabId === 'board' && !boardRequested.value) {
    boardRequested.value = true
    await refreshBoard()
  }

  if (tabId === 'management' && !executiveRequested.value) {
    executiveRequested.value = true
    await refreshExecutive()
  }
}

watch(
  activeTab,
  async (tabId) => {
    await ensureLeadershipDataForTab(tabId)

    if (isTabPageSlug(tabId)) {
      await fetchTabPage(tabId)
    }
  },
  { immediate: true }
)


function updateActiveTabFromHash(hash) {
  // Correctly access the value of the ref before iterating
  for (const group of menuItems.value) {
    for (const item of group.items) {
      if (item.id === hash) {
        if (!item.subItems) {
          activeTab.value = item.id;
        } else {
          // For parent items, just open the menu but don't change tab
          openSubMenu.value = item.id;
        }
        return;
      }
      if (item.subItems) {
        const match = item.subItems.find(sub => sub.id === hash);
        if (match) {
          activeTab.value = match.id;
          openSubMenu.value = item.id; // Open the parent menu
          return;
        }
      }
    }
  }
}
// Organogram image zoom and download
const zoom = ref(100);
const imageLoaded = ref(false);

/**
 * Zoom in the organogram image by 25% if the zoom level is below 200%
 */
const zoomIn = () => {
  if (zoom.value < 200) zoom.value += 25;
};

const zoomOut = () => {
  if (zoom.value > 50) zoom.value -= 25;
};

const downloadImage = () => {
  const link = document.createElement('a');
  link.href = '/images/samples/organo.png';
  link.download = 'organogram.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

</script>

<template>
  <div class="min-h-[calc(100vh-120px)] bg-white">
    <div class="container mx-auto px-2 py-1 flex flex-col md:flex-row gap-8 max-w-6xl">
    
        <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <!-- Mission, Vision, Core Values -->
        <div v-show="activeTab === 'mvc'" class="prose max-w-none">
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <!-- <BlocksRenderer :blocks="pages?.['mission-vision-core-values']?.blocks || []" /> -->
             
        </div>

       <div v-show="activeTab === 'powers'" class="prose max-w-none">
            <!-- Header Section -->
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['powers-and-functions-of-nlgfc']?.blocks || []" />
        </div>
        <!-- Board of Directors Content -->
        <div v-show="activeTab === 'board'" class="prose max-w-none">
          <div v-if="boardLoading">Loading board members...</div>
          <div v-else-if="boardError" class="space-y-3">
            <p>Failed to load board members.</p>
            <button
              @click="refreshBoard"
              class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
          <div v-else-if="!boardChairperson" class="text-gray-600">No board members available.</div>
          <div v-else class="space-y-4">
                <div class="board-page">
                   
                    <!-- Top Level - Board Chair -->
                    <div class="org-level top-level">
                    <div class="board-card">
                        <div class="board-image">
                        <img :src="normalizeImageUrl(boardChairperson.image)" :alt="boardChairperson.name">
                        </div>
                        <h2>{{ boardChairperson.name }}</h2>
                        <p class="position">{{ boardChairperson.position }}</p>
                    </div>
                    </div>
                    
                    <!-- Connecting lines -->
                    <div class="connector-container">
                    <div class="connector-line"></div>
                    </div>
                    
                    <!-- Second Level - Board Members -->
                    <div class="org-level middle-level">
                    <div 
                      v-for="(member, index) in boardOtherMembers" 
                      :key="member.id || index" 
                        class="board-card"
                    >
                        <div class="board-image">
                      <img :src="normalizeImageUrl(member.image)" :alt="member.name">
                        </div>
                      <h3>{{ member.name }}</h3>
                      <p class="position">{{ member.position }}</p>
                    </div>
                    </div>
                </div>
          </div>
        </div>
        <!-- Executive Management Content -->
        <div v-show="activeTab === 'management'" class="prose max-w-none">
            <div v-if="executiveLoading">Loading executive management...</div>
            <div v-else-if="executiveError" class="space-y-3">
              <p>Failed to load executive management.</p>
              <button
                @click="refreshExecutive"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <div v-else-if="!executiveDirector" class="text-gray-600">No executive management records available.</div>
            <div v-else class="space-y-4">
              <div class="board-page">
                    
                    <!-- Top Level - Executive Director -->
                    <div class="org-level top-level">
                  <div class="board-card">
                    <div class="board-image">
                            <img :src="normalizeImageUrl(executiveDirector.image)" :alt="executiveDirector.name">
                            </div>
                            <h2>{{ executiveDirector.name }}</h2>
                            <p class="position">{{ executiveDirector.position }}</p>
                        </div>
                    </div>
                    
                <!-- Connecting lines -->
                <div class="connector-container">
                  <div class="connector-line"></div>
                    </div>
                    
                    <!-- Second Level - Directors -->
                    <div class="org-level middle-level">
                        <div 
                        v-for="(member, index) in otherExecutiveDirectors" 
                        :key="member.id || index" 
                    class="board-card">
                    <div class="board-image">
                        <img :src="normalizeImageUrl(member.image)" :alt="member.name">
                            </div>
                        <h3>{{ member.name }}</h3>
                        <p class="position">{{ member.position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Finance Directorate Content -->
        <div v-show="activeTab === 'finance'" class="prose max-w-none">
            <!-- Header Section -->
          <div v-if="isTabPageLoading('finance')">Loading...</div>
            <div v-else-if="getTabPageError('finance')" class="space-y-3">
              <p>Failed to load content.</p>
              <button
                @click="fetchTabPage('finance', true)"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <BlocksRenderer v-else :blocks="getTabBlocks('finance')" />
        </div>




      

        <!-- Corporate Services Directorate Content -->
        <div v-show="activeTab === 'corporate'" class="prose max-w-none">
            <!-- Header Section -->
          <div v-if="isTabPageLoading('corporate')">Loading...</div>
            <div v-else-if="getTabPageError('corporate')" class="space-y-3">
              <p>Failed to load content.</p>
              <button
                @click="fetchTabPage('corporate', true)"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <BlocksRenderer v-else :blocks="getTabBlocks('corporate')" />
        </div>
        <!-- Social and Economic Development Services Directorate Content -->
        <div v-show="activeTab === 'social'" class="prose max-w-none">
            <!-- Header Section -->
          <div v-if="isTabPageLoading('social')">Loading...</div>
            <div v-else-if="getTabPageError('social')" class="space-y-3">
              <p>Failed to load content.</p>
              <button
                @click="fetchTabPage('social', true)"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <BlocksRenderer v-else :blocks="getTabBlocks('social')" />
        </div>
		
        <!-- Planning, Monitoring and Evaluation Division Content -->
        <div v-show="activeTab === 'planning'" class="prose max-w-none">
            <!-- Header Section -->
          <div v-if="isTabPageLoading('planning')">Loading...</div>
            <div v-else-if="getTabPageError('planning')" class="space-y-3">
              <p>Failed to load content.</p>
              <button
                @click="fetchTabPage('planning', true)"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <BlocksRenderer v-else :blocks="getTabBlocks('planning')" />
        </div>
        <!-- Procurement and Assets Disposal Division Content -->
         <div v-show="activeTab === 'procurement'" class="prose max-w-none">
          <div v-if="isTabPageLoading('procurement')">Loading...</div>
            <div v-else-if="getTabPageError('procurement')" class="space-y-3">
              <p>Failed to load content.</p>
              <button
                @click="fetchTabPage('procurement', true)"
                class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
            <BlocksRenderer v-else :blocks="getTabBlocks('procurement')" />
        </div>

        <!-- Internal Audit and Risk Division Content -->
        <div v-show="activeTab === 'audit'" class="prose max-w-none">
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['internal-audit-and-risk-division']?.blocks || []" />
        </div>
        <!-- Organogram Section -->
        <div v-show="activeTab === 'structure' || activeTab === 'directorates'" class="prose max-w-none">
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                Directorates and Divisions
                </h2>
                <p class="text-lg text-gray-600">
                Organizational structure and functional relationships within NLGFC
                </p>
            </div>

            <!-- Organogram Container with Enhanced Features -->
             <div class="bg-white rounded-lg shadow border border-gray-200">
    <!-- Controls -->
    <div class="flex justify-between items-center p-3 border-b border-gray-200">
      <div class="flex space-x-2">
        <!-- Zoom Controls -->
        <div class="flex items-center space-x-1 bg-gray-100 rounded-md px-2">
          <button 
            @click="zoomOut" 
            :disabled="zoom <= 50"
            class="p-1 text-gray-700 disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <span class="text-sm">{{ zoom }}%</span>
          <button 
            @click="zoomIn" 
            :disabled="zoom >= 200"
            class="p-1 text-gray-700 disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Download Button -->
      <button 
        @click="downloadImage"
        class="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="text-sm">Download</span>
      </button>
    </div>
    
    <!-- Image Container -->
    <div class="relative overflow-hidden h-96">
      <div 
        class="absolute inset-0 flex items-center justify-center transition-transform duration-200"
        :style="{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }"
      >
        <img 
          src="/images/samples/organo.png" 
          alt="Organogram"
          class="max-w-full max-h-full object-contain"
          @load="imageLoaded = true"
        >
      </div>
      
      <!-- Loading State -->
      <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
        </div>


      </main>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: calc(100vh - 120px);
}

.prose {
  max-width: 800px;
  margin: 0 auto;
}

/* Sidebar group styling */
nav .space-y-6 > div {
  margin-bottom: 1.5rem;
}

nav h3 {
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Board of Directors */
.board-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

.board-page h1 {
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-size: 2rem;
}

.board-page .org-level {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.board-page .top-level {
  margin-bottom: 1rem;
}

.board-page .middle-level {
  margin-top: 1rem;
}

.board-page .board-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 300px; /* Added for consistent height */
}

.board-page .top-level .board-card {
  background: #f8f9fa;
  border-top: 4px solid #2c3e50;
  width: 220px;
}

.board-page .position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.board-page .board-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
  background: #f8f8f8; /* Fallback background */
}

.board-page .top-level .board-image {
  width: 110px;
  height: 110px;
}

.board-page .board-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* Remove extra space under image */
}

.board-page .connector-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.board-page .connector-line {
  height: 30px;
  width: 80%;
  max-width: 800px;
  border-bottom: 2px solid #ddd;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .board-page .org-level {
    gap: 1rem;
  }
  
  .board-page .board-card {
    width: 160px;
    padding: 1rem;
    min-height: 280px;
  }
  
  .board-page .top-level .board-card {
    width: 180px;
  }
  
  .board-page .board-image {
    width: 80px;
    height: 80px;
  }
  
  .board-page .top-level .board-image {
    width: 90px;
    height: 90px;
  }
  
  .board-page .connector-line {
    width: 60%;
  }
}

@media (max-width: 480px) {
  .board-page .org-level {
    flex-direction: column;
    align-items: center;
  }
  
  .board-page .board-card {
    width: 100%;
    max-width: 250px;
  }
  
  .board-page .connector-line {
    height: 20px;
    width: 2px;
    border-bottom: none;
    border-left: 2px solid #ddd;
  }
}
</style>
