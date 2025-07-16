<script setup>
definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('ssrlp_overview')

const projectGroups = [
  {
    group: 'SSRLP',
    items: [
      { id: 'ssrlp_overview', title: ' Overview' },
      { id: 'SCTP', title: 'SCTP' },
      { id: 'publicWorks', title: 'Public Works' },
      { id: 'emergency', title: 'Scalable Social Safety Nets' },
      { id: 'livelihoods', title: 'Livelihoods Support' }
    ]
  },
  {
    group: 'GESD',
    items: [
    { id: 'gesd_overview', title: ' Overview' },
      { id: 'pbf', title: 'Performance-Based Financing' },
      { id: 'ias', title: 'Intergovernmental Accountability Systems' },
      { id: 'lgpi', title: 'Local Government Performance Improvement' },
      { id: 'adaptive', title: 'Adaptive Management and Innovation' }
    ]
  },
  {
    group: 'RCRP 2',
    items: [
    { id: 'rcrp_overview', title: ' Overview' },
      { id: 'drb', title: 'District-Led Resilience Building' },
      { id: 'usr', title: 'Urban Malawi Social Registry' },
      { id: 'upw', title: 'Urban Climate Smart Public Works Program' }
      
    ]
  }
]

// const openGroup = ref(projectGroups[0].group)
const openGroup = ref(null)


const projectContent = {
  ssrlp_overview: {
    title: 'Social Support for Resilient Livelihoods Overview',
    body: `
      <p><strong>Social Support for Resilient Livelihoods Project (SSRLP)</strong> is a seven-year (2020–2027) initiative implemented by the Government of Malawi through the National Local Government Finance Committee (NLGFC) and Local Authorities, with funding from the World Bank and the Social Protection Multi-Donor Trust Fund (SP-MDTF), totaling $516 million.</p>

      <p>The project aims to improve resilience among the poor and vulnerable while strengthening Malawi’s national platform for safety nets. It supports implementation of the Malawi National Social Support Programme II (MNSSP II) in line with the National Social Support Policy (NSSP).</p>

      <p>SSRLP is structured around six pillars: <strong>Consumption Support</strong>, <strong>Resilient Livelihoods</strong>, <strong>Scalable Safety Nets</strong>, <strong>Linkages</strong>, <strong>Harmonized Systems</strong>, and <strong>Social Cash Transfer Programme (SCTP)</strong> as the anchor.</p>

      <p>Key targets include:</p>
      <ul>
        <li>405,000 ultra-poor households with shock-responsive cash transfers annually</li>
        <li>235,000 households for contingency cash transfers</li>
        <li>520,000 households in the Climate Smart Enhanced Public Works Program (CS-EPWP)</li>
        <li>590,000 households with livelihood interventions by 2027, focusing on women and youth</li>
      </ul>

      <p>SSRLP promotes <strong>food security, income generation, institutional strengthening</strong> (including a national social registry), and <strong>disaster risk financing mechanisms</strong> across 18 districts and 4 city councils.</p>
    `
  },

  gesd_overview: {
    title: 'Governance to Enable Service Delivery Overview',
    body: `
      <h3>1.0 Background</h3>
      <p>The Governance to Enable Service Delivery (GESD) project seeks to strengthen Local Authorities' institutional performance, responsiveness, and resource management for improved service delivery in rural areas.</p>

      <p>Lead partners include the Ministry of Finance, Ministry of Local Government, and NLGFC, with support from multiple government institutions and Local Authorities.</p>

      <h3>2.0 Project Objectives</h3>
      <ul>
        <li><strong>Institutional Performance:</strong> Tracking Local Authorities’ (LAs) progress using the Local Authority Performance Assessment (LAPA).</li>
        <li><strong>Resource Management:</strong> Monitoring the use of financial and human resources in delivering Annual Investment Plans (AIPs).</li>
        <li><strong>Citizen Responsiveness:</strong> Measuring satisfaction with participation, efficiency, and transparency in AIPs implementation.</li>
      </ul>

      <h3>3.0 Expected Project Results</h3>
      <ul>
        <li>Improved adequacy and predictability of funding</li>
        <li>Enhanced resource accountability</li>
        <li>Strengthened LA staffing and performance</li>
        <li>Increased citizen participation and satisfaction</li>
        <li>Improved service delivery outcomes</li>
      </ul>
    `
  },

  rcrp_overview: {
    title: 'Regional and Climate Resilience Overview',
    body: `
      <p><strong>Regional Climate Resilience Project (RCRP)</strong> is a five-year (2024–2029) initiative funded by the World Bank for US$240 million. Its goal is to strengthen resilience against water-related climate shocks in Malawi and the region.</p>

      <h3>2.0 Project Development Objective</h3>
      <p>To improve resilience to water-related climate shocks and respond promptly to emergencies.</p>

      <h3>3.0 Key Indicators</h3>
      <ul>
        <li>Reduced vulnerability in selected basins</li>
        <li>Increased flood protection</li>
        <li>Access to early action systems</li>
        <li>Restoration of infrastructure</li>
        <li>Strengthened regional collaboration</li>
      </ul>

      <h3>4.0 Project Components</h3>
      <ul>
        <li><strong>Component 1:</strong> Risk Management & Climate Financing – $30M</li>
        <li><strong>Component 2:</strong> Infrastructure & Asset Management – $180M</li>
        <li><strong>Component 3:</strong> Adaptive Climate Services – $11.5M</li>
        <li><strong>Component 4:</strong> Project Management – $15M</li>
        <li><strong>Component 5:</strong> Contingent Emergency Response – $5M</li>
      </ul>

      <p>Implementing entities include the Ministry of Finance, Ministry of Water, DoDMA, Road Authority, and others.</p>
    `
  },

  SCTP: {
    title: 'Social Cash Transfer Programme (SCTP)',
    body: `
      <p><strong>SCTP (Mtukula Pakhomo)</strong> targets ultra-poor, labour-constrained households. Since 2021, it has reached 264,358 households.</p>

      <p>The programme provides <strong>unconditional cash transfers</strong> in 21 districts with support from the World Bank and SP-MDTF. Its goal is to improve <strong>nutrition, health, education</strong>, and <strong>shelter</strong> among the most vulnerable.</p>

      <p><strong>Eligibility:</strong> Households with no able-bodied members aged 19–64, or those with dependents and high dependency ratios.</p>

      <p><strong>Primary Objectives:</strong></p>
      <ul>
        <li>Reduce hunger and starvation</li>
        <li>Increase school enrolment</li>
        <li>Enhance child health and nutrition</li>
      </ul>
    `
  },

  publicWorks: {
    title: 'Climate Smart Enhanced Public Works Programme (Mbwezera Chilengedwe)',
    body: `
      <p>This programme aims to build <strong>resilient community assets</strong> to improve household resilience, income, and food security.</p>

      <p>It has reached <strong>538,983 ultra-poor households</strong> and focuses on restoring micro catchments, degraded land, water, soil, and trees across all 28 districts.</p>
    `
  },

  emergency: {
    title: 'Scalable Social Safety Nets',
    body: `
      <p>This component provides <strong>shock-responsive support</strong> to households affected by droughts, floods, and other disasters.</p>

      <p>So far, <strong>515 households</strong> in 10 districts have benefited through additional support under SCTP and CS-EPWP during emergency periods.</p>
    `
  },

  livelihoods: {
    title: 'Livelihoods Support',
    body: `
      <p>The Livelihoods Support Programme provides <strong>economic inclusion packages</strong> to SCTP and CS-EPWP households, implemented by COMSIP Cooperative Union Ltd.</p>

      <p>Using a “<strong>cash-plus</strong>” model, it includes training, asset transfer, savings promotion, and graduation packages with a focus on women and youth.</p>

      <p><strong>Achievements:</strong></p>
      <ul>
        <li>18,400 households supported with asset transfers</li>
        <li>259,000 members empowered with enhanced livelihoods</li>
        <li>3,500 out-of-school youth trained</li>
        <li>443 clusters trained in cooperative development</li>
        <li>25,250 members linked to market-based initiatives</li>
      </ul>
    `
  },

  pbf: {
    title: 'Performance-Based Financing',
    body: `
      <p>Provides additional funding to Local Authorities based on their <strong>LAPA (Local Authority Performance Assessment)</strong> results, through a Performance-Based Grant (PBG).</p>
    `
  },

  ias: {
    title: 'Intergovernmental Accountability Systems',
    body: `
      <p>Supports <strong>fiscal decentralization</strong> by revamping the Intergovernmental Fiscal Transfer System and enhancing audit systems to ensure accountability for public funds.</p>
    `
  },

  lgpi: {
    title: 'Local Government Performance Improvement',
    body: `
      <p>Focuses on building Local Authorities’ capacity through <strong>human resource strengthening</strong>, core staffing, and enhanced citizen engagement mechanisms.</p>
    `
  },

  adaptive: {
    title: 'Adaptive Management and Innovation',
    body: `
      <p>Encourages continuous learning through adaptive management strategies, monitoring and evaluation, and innovative approaches to enhance implementation flexibility.</p>
    `
  },

  drb: {
    title: 'District-Led Resilience Building',
    body: `
      <p>This RCRP subcomponent finances <strong>Performance-Based Grants (PBGs)</strong> to support climate-resilient infrastructure, catchment management, and nature-based solutions in all 28 districts.</p>

      <p>Eligible LAs must meet <strong>LAPA standards</strong> to receive both RCRP and GESD grants, aiming to protect communities from climate risks like floods and droughts.</p>
    `
  },

  usr: {
    title: 'Urban Malawi Social Registry',
    body: `
      <p>Expands the <strong>Malawi Social Registry (UBR)</strong> to urban councils to strengthen targeting and coordination of social protection programs in urban areas.</p>
    `
  },

  upw: {
    title: 'Urban Climate Smart Public Works Program',
    body: `
      <p>Pilots <strong>urban public works programs</strong> that are climate-smart, focusing on environmental restoration, waste management, and local employment creation in cities.</p>
    `
  }
}
const projectUpdates = {
 
  SCTP: [
    {
      date: '2024-05-05',
      title: 'SCTP expands to new councils',
      tags: ['sctp', 'expansion'],
      summary: 'The program now includes 3 additional local councils targeting ultra-poor households...',
      link: '#'
    },
    {
      date: '2024-03-10',
      title: 'RCRP kickstarts pilot catchment projects',
      tags: ['climate', 'catchments'],
      summary: 'Initial catchment restoration pilots are underway in 4 districts...',
      link: '#'
    },
    {
      date: '2024-04-20',
      title: 'New LAPA scoring framework released',
      tags: ['performance', 'governance'],
      summary: 'The Ministry of Local Government has published an updated scoring method...',
      link: '#'
    }, {
      date: '2024-06-01',
      title: 'Districts roll out improved targeting system',
      tags: ['sctp', 'targeting'],
      summary: 'Local councils have begun testing a new beneficiary targeting system...',
      link: '#'
    },
    {
      date: '2024-05-15',
      title: 'Climate-smart public works expand to 10 new sites',
      tags: ['publicWorks', 'environment'],
      summary: 'Environmental restoration works have been launched in 10 districts...',
      link: '#'
    }
  ],
  publicWorks: [
    {
      date: '2024-04-22',
      title: 'Public works teams trained in new environmental practices',
      tags: ['training', 'publicWorks'],
      summary: 'Field staff completed training on climate-resilient techniques for micro catchment projects...',
      link: '#'
    }
  ],
  emergency: [
    {
      date: '2024-03-30',
      title: 'Emergency cash transfers activated in response to flooding',
      tags: ['emergency', 'flood'],
      summary: 'Flood-affected households in Nsanje and Chikwawa received emergency cash support...',
      link: '#'
    }
  ],
  livelihoods: [
    {
      date: '2024-06-12',
      title: 'COMSIP launches new youth skills program',
      tags: ['livelihoods', 'youth'],
      summary: '3,000 youths across 6 districts have begun livelihood training under a new initiative...',
      link: '#'
    }
  ],
  pbf: [
    {
      date: '2024-05-18',
      title: 'Top performing councils awarded bonus grants',
      tags: ['pbf', 'funding'],
      summary: 'Six councils scored above 85% in LAPA and received additional grant allocations...',
      link: '#'
    }
  ],
  ias: [
    {
      date: '2024-04-10',
      title: 'Audit tool updates shared with finance teams',
      tags: ['accountability', 'finance'],
      summary: 'New tools for tracking and reporting intergovernmental transfers were rolled out in workshops...',
      link: '#'
    }
  ],
  lgpi: [
    {
      date: '2024-02-28',
      title: 'LA staff capacity assessment completed',
      tags: ['staffing', 'capacity'],
      summary: 'Baseline capacity data will inform future staffing plans and citizen engagement strategies...',
      link: '#'
    }
  ],
  adaptive: [
    {
      date: '2024-06-05',
      title: 'Adaptive management pilots launched in 3 districts',
      tags: ['innovation', 'monitoring'],
      summary: 'Feedback loops and real-time tracking have been integrated into district plans...',
      link: '#'
    }
  ],
  drb: [
    {
      date: '2024-03-01',
      title: 'Nature-based infrastructure under construction',
      tags: ['resilience', 'infrastructure'],
      summary: 'Districts began works on check dams and terracing in flood-prone areas...',
      link: '#'
    }
  ],
  usr: [
    {
      date: '2024-05-09',
      title: 'Urban social registry mapping starts',
      tags: ['registry', 'urban'],
      summary: 'Enumerators have begun household data collection in Lilongwe and Blantyre...',
      link: '#'
    }
  ],
  upw: [
    {
      date: '2024-04-25',
      title: 'Urban public works sites launched',
      tags: ['urban', 'climate'],
      summary: 'Waste management and tree planting have started in city wards under the pilot phase...',
      link: '#'
    }
  ]
}

// Set from initial hash on load
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
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
      openGroup.value = group.group // <-- expand the matching group
      break
    }
  }
}



// Optional: scroll to top on tab change
watch(activeTab, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
const updatesPerPage = 3
const currentPage = ref(1)

const paginatedUpdates = computed(() => {
  const updates = projectUpdates[activeTab.value] || []
  const start = (currentPage.value - 1) * updatesPerPage
  return updates.slice(start, start + updatesPerPage)
})

const totalPages = computed(() => {
  const updates = projectUpdates[activeTab.value] || []
  return Math.ceil(updates.length / updatesPerPage) || 1
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset to first page when switching tabs
watch(activeTab, () => {
  currentPage.value = 1
})


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
      <div v-if="projectContent[activeTab]" class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Project Header -->
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 border-b border-blue-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-1">
            {{ projectContent[activeTab].title }}
          </h2>
          <div class="flex items-center text-sm text-blue-600">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            {{ activeTab.split('_')[0].toUpperCase() }} Project
          </div>
        </div>

        <!-- Project Content -->
        <div class="p-6 prose prose-blue max-w-none">
          <div v-html="projectContent[activeTab].body"></div>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-gray-500 italic">No content available for this project.</p>
      </div>
      
      <!-- Latest Updates Section -->
      <div v-if="projectUpdates[activeTab]" class="mt-10">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            <span class="inline-block border-b-2 border-blue-500 pb-1">Latest Updates</span>
          </h3>
          <div class="text-sm text-gray-500">
            Showing {{ paginatedUpdates.length }} of {{ projectUpdates[activeTab].length }} updates
          </div>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(update, index) in paginatedUpdates"
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {{ update.tags[0] }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                </span>
              </div>
              <h4 class="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                <a :href="update.link" class="hover:underline">{{ update.title }}</a>
              </h4>
              <p class="text-gray-600 text-sm mb-3">{{ update.summary }}</p>
              <a
                :href="update.link"
                class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Read more
                <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-between">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Previous
          </button>
          
          <div class="hidden sm:flex sm:space-x-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg',
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
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
</style>
