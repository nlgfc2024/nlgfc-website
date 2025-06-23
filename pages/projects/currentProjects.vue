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
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 border-r pr-4">
      <div
        v-for="group in projectGroups"
        :key="group.group"
        class="mb-4 border border-gray-200 rounded"
      >
        <button
          @click="openGroup = openGroup === group.group ? null : group.group"
          class="w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          {{ group.group }}
        </button>

        <div v-show="openGroup === group.group" class="px-4 py-2 space-y-1">
           <ul>
              <li v-for="item in group.items" :key="item.id">
                <a
                    :href="`#${item.id}`"
                    @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                    :class="[
                    'block px-3 py-2 rounded text-sm cursor-pointer',
                    item.id === activeTab ? 'bg-blue-100 font-medium text-blue-900' : 'hover:bg-gray-100'
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
    <main class="flex-1">
  <div v-if="projectContent[activeTab]">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
    {{ projectContent[activeTab].title }}
  </h2>
  <div
    class="text-gray-800 space-y-5 leading-relaxed"
    v-html="projectContent[activeTab].body"
  ></div>
</div>

  <div v-else class="text-gray-500 italic">No content available for this project.</div>
</main>
  </div>
</template>
