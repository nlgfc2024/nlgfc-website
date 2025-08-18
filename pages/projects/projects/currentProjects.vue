<script setup>
// Nuxt 3 auto-imports definePageMeta and useRoute.
// Vue composition API imports:
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('government_funded')

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
          { id: 'ssrlp_overview', title: 'Overview' },
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
          { id: 'gesd_overview', title: 'Overview' },
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
          { id: 'rcrp_overview', title: 'Overview' },
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

const projectContent = {
  // Group and subgroup landing content
  government_funded: {
    title: 'Government Funded Projects',
    body: `
      <p>Explore government funded programs implemented through the National Local Government Finance Committee.</p>
      <ul>
        <li>Constituency Development Fund (CDF)</li>
        <li>District Development Fund (DDF)</li>
        <li>Water Structures Fund</li>
        <li>Health Rehabilitation</li>
        <li>Infrastructure Development Fund (IDF)</li>
        <li>Road Rehabilitation Fund (RRF)</li>
      </ul>
    `
  },
  ssrlp_news: {
    title: 'SSRLP News & Updates',
    body: `
      <p>Latest news, notices, and highlights from the Social Support for Resilient Livelihoods Project.</p>
    `
  },
  gesd_news: {
    title: 'GESD News & Updates',
    body: `
      <p>Latest news and announcements under the Governance to Enable Service Delivery project.</p>
    `
  },
  rcrp2_news: {
    title: 'RCRP 2 News & Updates',
    body: `
      <p>Latest updates for the Regional Climate Resilience Project Phase 2.</p>
    `
  },

  // Government funded items
  cdf: {
    title: 'Constituency Development Fund',
    body: `
      <p>The purpose of this fund is to finance small-scale community projects at the constituency level. The aim is to improve local infrastructure, livelihoods, and social services. CDF is channelled through Members of Parliament (MPs) in consultation with local structures, and projects are selected by community demand.</p>
    `
  },
  ddf: {
    title: 'District Development Fund',
    body: `
      <p>District Development Fund supports locally prioritised development projects identified through District Development Plans (DDPs). The purpose of this fund is to enhance service delivery in sectors like education, health, agriculture, and local governance. The fund is allocated directly to District Councils based on approved budgets. Projects are implemented by councils in collaboration with communities.</p>
    `
  },
  wsf: {
    title: 'Water Structures Fund',
    body: `
      <p>The fund is for the construction and rehabilitation of water supply systems (boreholes, piped schemes, dams) and ensures sustainable access to clean water.</p>
    `
  },
  health_rehab: {
    title: 'Health Rehabilitation',
    body: `
      <p>Health Rehabilitation Fund is for rehabilitating and upgrading health facilities (clinics, hospitals, staff housing) to improve access to quality healthcare services.</p>
    `
  },
  idf: {
    title: 'Infrastructure Development Fund (IDF)',
    body: `
      <p>IDF supports the construction and rehabilitation of critical public infrastructure (schools, markets, government buildings) to enhance economic and social service delivery in urban councils in Malawi.</p>
    `
  },
  rrf: {
    title: 'Road Rehabilitation Fund (RRF)',
    body: `
      <p>Rural and urban councils are provided with funds for the maintenance and rehabilitation to improve transport connectivity for trade and mobility. The fund is managed by District Councils with technical support from the Roads Authority.</p>
    `
  },
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

      <p>It has reached <strong>538,983 ultra-poor households</strong> and focuses on restoring micro catchments, degraded land, water, soil and trees across all 28 districts.</p>
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

  scalable: {
    title: 'Scalable Social Safety Nets',
    body: `
      <p>This component provides <strong>shock-responsive support</strong> to households affected by droughts, floods, and other disasters.</p>

      <p>So far, <strong>515 households</strong> in 10 districts have benefited through additional support under SCTP and CS-EPWP during emergency periods.</p>
    `
  },

  cerp: {
    title: 'Contigency Emergency Response Programme (CERP)',
    body: `
      <p>Waiting for Data to be inserted here</p>

      
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
  // Sub-group landing news feeds
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
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
    <!-- Sidebar -->
    <aside class="w-full md:w-72 flex-shrink-0 md:sticky md:top-16 md:self-start md:z-0">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto">
        <nav class="space-y-4">
          <!-- Groups -->
          <div v-for="group in projectGroups" :key="group.group">
            <!-- Group header button -->
            <button
              @click="() => { openGroup = openGroup === group.group ? null : group.group; if (group.id) { activeTab = group.id; history.replaceState(null, '', `#${group.id}`) } }"
              :class="[
                'w-full text-left p-4 rounded-lg transition-all duration-200 group flex items-center justify-between',
                activeTab === group.id ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
              ]"
            >
              <span class="flex items-center gap-2">
                <svg :class="[ 'w-5 h-5 transition-colors', activeTab === group.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600' ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
                <span class="font-semibold">{{ group.group }}</span>
              </span>
              <svg class="w-4 h-4 transform transition-transform duration-200" :class="{ 'rotate-180': openGroup === group.group }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <!-- Group items: flat list (Government Funded) -->
            <div v-if="group.items && openGroup === group.group" class="mt-2">
              <ul class="space-y-2">
                <li v-for="item in group.items" :key="item.id">
                  <a
                    :href="`#${item.id}`"
                    @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                    :class="[
                      'block p-3 rounded-lg transition-all duration-200 group',
                      activeTab === item.id ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
                    ]"
                  >
                    <div class="flex items-center gap-3">
                      <svg :class="[ 'w-4 h-4 transition-colors', activeTab === item.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600' ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" stroke-width="2"/></svg>
                      <span class="text-sm font-medium">{{ item.title }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Donor subgroups -->
            <div v-if="group.subgroups && openGroup === group.group" class="mt-2 space-y-2">
              <div v-for="sg in group.subgroups" :key="sg.subgroup">
                <!-- Subgroup header: clicking shows news landing -->
                <button
                  @click="() => { openSubgroup = openSubgroup === sg.subgroup ? null : sg.subgroup; activeTab = sg.id; history.replaceState(null, '', `#${sg.id}`) }"
                  :class="[
                    'w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center justify-between',
                    activeTab === sg.id ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
                  ]"
                >
                  <span class="flex items-center gap-2">
                    <svg :class="[ 'w-4 h-4 transition-colors', activeTab === sg.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600' ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4z"/></svg>
                    <span class="text-sm font-semibold">{{ sg.subgroup }}</span>
                  </span>
                  <svg class="w-4 h-4 transform transition-transform duration-200" :class="{ 'rotate-180': openSubgroup === sg.subgroup }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>

                <!-- Subgroup items -->
                <div v-show="openSubgroup === sg.subgroup" class="ml-2 mt-2">
                  <ul class="space-y-2">
                    <li v-for="item in sg.items" :key="item.id">
                      <a
                        :href="`#${item.id}`"
                        @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                        :class="[
                          'block p-3 rounded-lg transition-all duration-200 group',
                          activeTab === item.id ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
                        ]"
                      >
                        <div class="flex items-center gap-3">
                          <svg :class="[ 'w-4 h-4 transition-colors', activeTab === item.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600' ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" stroke-width="2"/></svg>
                          <span class="text-sm font-medium">{{ item.title }}</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200"></div>
          </div>
        </nav>
      </div>
    </aside>

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
              v-for="(news, nIdx) in slidesForActive"
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
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

      <!-- Standard Project Content -->
      <div v-if="projectContent[activeTab] && !isNewsLanding" class="bg-white rounded-xl shadow-sm overflow-hidden">
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
