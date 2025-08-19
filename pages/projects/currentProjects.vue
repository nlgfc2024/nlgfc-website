<script setup>
// Nuxt 3 auto-imports definePageMeta and useRoute.
// Vue composition API imports:
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import GeneralSidebar from '../../components/GeneralSidebar.vue';
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
 import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'


definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('government_funded')
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
          {id: 'gesd_news', title: 'GESD NEWs'},
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
          { id: 'rcrp2_news', title: 'RCRP2 NEWS' },
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
    // Default to first item if no hash
    activeTab.value = 'ssrlp_overview'
  }
})

// React to hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  } else {
    // If hash is cleared, go back to default
    activeTab.value = 'ssrlp_overview'
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

const { projectGroups: sharedProjectGroups, projectContent: sharedProjectContent } = useGeneralSidebar();

watchEffect(() => {
  sharedProjectGroups.value = projectGroups;
  sharedProjectContent.value = projectContent;
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

// Page-builder: Mission, Vision, Core Values content
// const { data: mvcPage, pending: mvcPending, error: mvcError } = usePageBlocks('mission-vision-core-values')
    
const { data: pages, pending, error: PageError } = usePageBlocks([
  'constituency-development-fund'
])

provide('projectContent', projectContent);
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
    <BlocksRenderer :blocks="pages?.['constituency-development-fund']?.blocks || []" />
             
      <!-- News Landing: Sliding Hero + Related News + Stats -->
     


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
