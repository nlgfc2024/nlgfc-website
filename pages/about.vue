"<script setup>
    import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
    import BlocksRenderer from '~/components/BlocksRenderer.vue'
    import { usePageBlocks } from '~/composables/usePageBlocks'

    definePageMeta({
    title: 'About Us'
    })

    const route = useRoute()
    const activeTab = ref('mvc')
    const openSubMenu = ref(null)
    const imageError = ref(false)

    const handleImageError = () => {
    imageError.value = true;
    console.error("Organogram image failed to load");
    };

    // Board of Directors
    const board = {
    chairperson: {
        name: "Commissioner Richard Chapweteka",
        position: "Board Chairperson",
        image: "/images/board/CommissionerRichardChapwetekaBoardChairperson.png",
        reportsTo: null,
        subordinates: [
        "member1",
        "member2",
        "member3",
        "member4"
        ]
    },
    member1: {
        name: "Abel Mwambinga",
        position: "Board Member",
        image: "/images/board/Abel MwambingaBoardMember.png",
        reportsTo: "chairperson"
    },
    member2: {
        name: "Councilor Davie Maunde",
        position: "Board Member",
        image: "/images/board/CouncilorDavieMaundeBoardMember.png",
        reportsTo: "chairperson"
    },
    member3: {
        name: "Mary Mkwanda",
        position: "Board Member",
        image: "/images/board/MrsMaryMkwandaBoardMember.png",
        reportsTo: "chairperson"
    },
    member4: {
        name: "Lilian Khofi",
        position: "Board Member",
        image: "/images/board/Ms.LilianKhofiVice.png",
        reportsTo: "chairperson"
    }
    }

    // Executive Management
    const leadership = {
    executiveDirector: {
        name: "Kondwani Santhe (PhD)",
        position: "Executive Director",
        image: "/images/management/kondwani-santhe--ed.png",
        reportsTo: null,
        subordinates: [
        "directorInfrastructure",
        "directorFinance",
        "directorCorporate"
        ]
    },
    directorInfrastructure: {
        name: "Paul Chipeta",
        position: "Director of Social & Economic Development Services",
        image: "/images/management/directorEconomicDevelopment.png",
        reportsTo: "executiveDirector"
    },
    directorFinance: {
        name: "Linda Kapanda",
        position: "Director of Finance & Fiscal Decentralization",
        image: "/images/management/financeDirector.png",
        reportsTo: "executiveDirector"
    },
    directorCorporate: {
        name: "Stanley Chuthi",
        position: "Director of Administration & Corporate Services",
        image: "/images/management/directorCorporateServices.png",
        reportsTo: "executiveDirector"
    }
    }

    const menuItems = ref([
    { 
        items: [
        { id: 'mvc', title: 'Mission, Vision and Core Values' },
        { id: 'powers', title: 'Powers and Functions' },
        { id: 'board', title: 'Board of Directors' },
        { id: 'management', title: 'Executive Management' },
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

    // Map the 'menuItems' data to the 'projectGroups' structure
    const mappedProjectGroups = computed(() => {
        const flattenedGroups = menuItems.value.flatMap(section => {
            return section.items.map(item => {
                if (item.subItems && item.subItems.length > 0) {
                    // If the item has sub-items, map them as a group
                    return {
                        group: item.title,
                        id: item.id,
                        items: item.subItems
                    };
                } else {
                    // If no sub-items, create a group with a single item
                    return {
                        group: item.title,
                        id: item.id,
                        items: [{ id: item.id, title: item.title }]
                    };
                }
            });
        });
        return flattenedGroups;
    });

// Use the composable to share the data
const { projectGroups } = useGeneralSidebar();
projectGroups.value = mappedProjectGroups.value;

// Page-builder: Mission, Vision, Core Values content
// const { data: mvcPage, pending: mvcPending, error: mvcError } = usePageBlocks('mission-vision-core-values')
    
const { data: pages, pending, error: PageError } = usePageBlocks([
  'powers-and-functions-of-nlgfc','procurement-and-assets-disposal-division',
  'directorate-of-finance-and-fiscal-decentralization','directorate-of-corporate-and-strategic-services',
  'planning-monitoring-and-evaluation-division',
  'internal-audit-and-risk-division','directorate-of-social-and-economic-dev-services'
])


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
    <div class="container mx-auto px-2 py-3 flex flex-col md:flex-row gap-8 max-w-6xl">
    
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
          
          <div class="space-y-4">
                <div class="board-page">
                   
                    <!-- Top Level - Board Chair -->
                    <div class="org-level top-level">
                    <div class="board-card">
                        <div class="board-image">
                        <img :src="board.chairperson.image" :alt="board.chairperson.name">
                        </div>
                        <h2>{{ board.chairperson.name }}</h2>
                        <p class="position">{{ board.chairperson.position }}</p>
                    </div>
                    </div>
                    
                    <!-- Connecting lines -->
                    <div class="connector-container">
                    <div class="connector-line"></div>
                    </div>
                    
                    <!-- Second Level - Board Members -->
                    <div class="org-level middle-level">
                    <div 
                        v-for="(id, index) in board.chairperson.subordinates" 
                        :key="index" 
                        class="board-card"
                    >
                        <div class="board-image">
                        <img :src="board[id].image" :alt="board[id].name">
                        </div>
                        <h3>{{ board[id].name }}</h3>
                        <p class="position">{{ board[id].position }}</p>
                    </div>
                    </div>
                </div>
          </div>
        </div>
        <!-- Executive Management Content -->
        <div v-show="activeTab === 'management'" class="prose max-w-none">

            <div class="space-y-4">
                <div class="executive-page">
                    
                    <!-- Top Level - Executive Director -->
                    <div class="org-level top-level">
                        <div class="executive-card">
                            <div class="executive-image">
                            <img :src="leadership.executiveDirector.image" :alt="leadership.executiveDirector.name">
                            </div>
                            <h2>{{ leadership.executiveDirector.name }}</h2>
                            <p class="position">{{ leadership.executiveDirector.position }}</p>
                        </div>
                    </div>
                    
                    <!-- Connecting line -->
                    <div class="connector">
                    </div>
                    
                    <!-- Second Level - Directors -->
                    <div class="org-level middle-level">
                        <div 
                            v-for="(id, index) in leadership.executiveDirector.subordinates" 
                            :key="index" 
                            class="executive-card">
                            <div class="executive-image">
                            <img :src="leadership[id].image" :alt="leadership[id].name">
                            </div>
                            <h3>{{ leadership[id].name }}</h3>
                            <p class="position">{{ leadership[id].position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Finance Directorate Content -->
        <div v-show="activeTab === 'finance'" class="prose max-w-none">
            <!-- Header Section -->
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['directorate-of-finance-and-fiscal-decentralization']?.blocks || []" />
        </div>

        <!-- Corporate Services Directorate Content -->
        <div v-show="activeTab === 'corporate'" class="prose max-w-none">
            <!-- Header Section -->
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['directorate-of-corporate-and-strategic-services']?.blocks || []" />
        </div>
        <!-- Social and Economic Development Services Directorate Content -->
        <div v-show="activeTab === 'social'" class="prose max-w-none">
            <!-- Header Section -->
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['directorate-of-social-and-economic-dev-services']?.blocks || []" />
        </div>
		
        <!-- Planning, Monitoring and Evaluation Division Content -->
        <div v-show="activeTab === 'planning'" class="prose max-w-none">
            <!-- Header Section -->
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['planning-monitoring-and-evaluation-division']?.blocks || []" />
        </div>
        <!-- Procurement and Assets Disposal Division Content -->
         <div v-show="activeTab === 'procurement'" class="prose max-w-none">
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['procurement-and-assets-disposal-division']?.blocks || []" />
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

/* Executive Management */
.executive-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

.executive-page h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.executive-page .org-level {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap; /* Added for better responsiveness */
}

.executive-page .top-level {
  margin-bottom: 1rem;
}

.executive-page .middle-level {
  margin-top: 1rem;
}

.executive-page .executive-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 250px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 320px; /* Added for consistent height */
}

.executive-page .top-level .executive-card {
  background: #f8f9fa;
  border-top: 4px solid #e74c3c;
}

.executive-page .position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

.executive-page .connector {
  height: 40px;
  width: 2px;
  background: #ddd;
  margin: 0 auto;
}

.executive-page .executive-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
  background: #f8f8f8; /* Fallback background */
}

.executive-page .executive-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* Remove extra space under image */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .board-page .org-level,
  .executive-page .org-level {
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

  .executive-page .executive-card {
    min-height: 300px;
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .board-page .org-level,
  .executive-page .org-level {
    flex-direction: column;
    align-items: center;
  }
  
  .board-page .board-card,
  .executive-page .executive-card {
    width: 100%;
    max-width: 250px;
  }
  
  .board-page .connector-line {
    height: 20px;
    width: 2px;
    border-bottom: none;
    border-left: 2px solid #ddd;
  }
  
  .executive-page .connector {
    height: 20px;
  }
}
</style>