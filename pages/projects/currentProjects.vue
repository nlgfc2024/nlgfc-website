<script setup>
definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('SCTP')

const projectGroups = [
  {
    group: 'SSRLP',
    items: [
      { id: 'SCTP', title: 'SCTP' },
      { id: 'publicWorks', title: 'Public Works' },
      { id: 'emergency', title: 'Emergency Cash Transfer' },
      { id: 'livelihoods', title: 'Livelihoods Support' }
    ]
  },
  {
    group: 'GESD',
    items: [
      { id: 'pbf', title: 'Performance-Based Financing' },
      { id: 'ias', title: 'Intergovernmental Accountability Systems' },
      { id: 'lgpi', title: 'Local Government Performance Improvement' },
      { id: 'adaptive', title: 'Adaptive Management and Innovation' }
    ]
  },
  {
    group: 'RCRP 2',
    items: [
      { id: 'drb', title: 'District-Led Resilience Building' },
      { id: 'usr', title: 'Urban Malawi Social Registry' },
      { id: 'upw', title: 'Urban Climate Smart Public Works Program' }
      
    ]
  }
]

const openGroup = ref(projectGroups[0].group)

const projectContent = {
  SCTP: {
    title: 'Social Cash Transfer Programme (SCTP)',
    body: `Social Cash Transfer Programme, popularly known as Mtukula Pakhomo, targets ultra-poor and labour-constrained households and has reached 264,358 since 2021. 

SCTP is aimed at alleviating poverty and malnutrition among ultra-poor and labour-constrained households. As part of the Social Support for Resilient Livelihoods Project (SSRLP), the SCTP provides unconditional cash transfers to improve nutrition, health, education, and shelter for the most vulnerable populations in 21 districts with funding from the World Bank and Social Protection Multi-Donor Trust Fund (SP-MDTF).

The primary objectives of the SCTP are to reduce hunger and starvation, increase school enrolment, and enhance the health and nutrition of children in eligible households. 

To qualify for inclusion in the programme, a household must be ultra-poor and labour-constrained, meaning they lack able-bodied members aged 19-64, have members still in school, or have a high dependency ratio.`
  
  },
  publicWorks: {
    title: ' Climate Smart Enhanced Public Works Programme (Mbwezera Chilengedwe)',
    body: `The objective of CS-EPWP is to create visible, durable, and quality assets within micro catchments that will assist in improving household resilience to shocks, increase impact on household-level incomes and food security and reduce households’ exposure to risks associated with climate change and other disasters. CS-EPWP has reached out to 538,983 ultra-poor households with labour capacity. CS-EPWP is the largest component under the SSRLP, which was designed to rehabilitate degraded micro watersheds/catchments and restore natural resources (soil, water, trees, etc.) by creating visible, durable, and quality assets within selected micro-catchments in all 28 districts.`
  },
  emergency: {
    title: 'Scalable Social Safety Nets',
    body: `This component under SSRLP-Tidzidalire enables the government to transfer funds to the most vulnerable households in response to drought to avoid the near-poor slipping into the poverty cycle, and the ultra-poor slipping further down the poverty line. The programme has reached out to 515 households in 10 districts: Blantyre, Thyolo, Ntcheu, Karonga, Nkhotakota, Chiradzulu, Mwanza, Balaka, Chikwawa and Nsanje. Scalable Mechanism provides additional support to SCTP and CS-EPWP beneficiaries in times of drought, floods and other natural disasters, as food consumption support`
  },
  livelihoods: {
    title: 'Livelihoods Support',
    body: `The Livelihood Support Programme, a key sub-component of the SSRLP, provides an economic inclusion package to selected households benefiting from the Social Cash Transfer Programme (SCTP) and the Climate Smart Enhanced Public Works Programme (CS-EPWP). This specific component is implemented by COMSIP Cooperative Union Limited, and it adopts a “cash-plus” model, complementing cash transfers and wages with basic, enhanced, and graduation livelihood packages. Livelihood support focuses on mindset change, capacity building, and fostering a culture of savings and investment to help households grow their resilience to economic shocks. Through the promotion of sustainable income-generating activities, multi-sectoral investments, and linkages, the programme aims to increase household incomes, build productive assets, enhance human capital, and improve social and financial inclusion. It specifically targets women and youth, empowering them to diversify income sources, improve nutrition and health, and strengthen disaster risk management awareness, ultimately building long-term resilience and economic stability.

Livelihood Support Programme has reached 18,400 households for asset transfers, empowering 259,000 members through enhanced livelihoods, supported 3,500 out-of-school youth with skills training, educating 443 clusters via cooperative training, and linking 25,250 members to Joint Skills Groups and market-oriented initiatives like Legumes/Crop Enterprise Structured Production (LESP) to boost income and resilience.
`
  },
  pbf: {
    title: 'Performance-Based Financing',
    body: `Increasing discretionary development funding for LAs - tied to the councils Annual Local Authority Performance Assessment (LAPA) results - through the introduction of a Performance-Based Grant (PBG) (Quick links;  LAPAS, Indicative Planning Figures (IPFs)`
  },
  ias: {
    title: 'Intergovernmental Accountability Systems',
    body: `Addressing two central government functions that are critical to strengthening intergovernmental accountability relations – revamping the Intergovernmental Fiscal Transfer System and strengthening external audit to bolster the system of accountability for LA public resource management (IGTF Dashboard)`
  },
  lgpi: {
    title: 'Local Government Performance Improvement',
    body: `Building LA capabilities for improved performance through targeted capacity building, expedited human resource staffing of core LA functions, and enhanced citizen engagement`
  },
  adaptive: {
    title: 'Adaptive Management and Innovation',
    body: `Ensuring response to risks and adaptation to lessons learned during implementation through innovative approaches to project management, monitoring and evaluation and learning.`
  },
   drb: {
    title: 'District-Led Resilience Building',
    body: `Component 2.2 of RCRP District Led Resilience Building will finance Performance-Based Grants (PBGs) to support district-level infrastructure development, catchment management, and nature-based solution investments across all 28 Local Authorities (LAs). These grants are aligned with the principles of the Governance to Enable Service Delivery (GESD) Project to ensure transparency, accountability, and results-based implementation.
To determine eligibility, LAs will be assessed using the Local Authority Performance Assessment (LAPA) tool. Those that meet the required standards will receive both the RCRP–PBG and the GESD-PBG.
The funds are intended to enhance resilience to the adverse effects of climate change, particularly those triggered by floods, cyclones, and other climate-related disasters. Through these investments, districts will implement projects that strengthen community resilience and promote sustainable living in disaster-prone areas, enabling populations to better withstand and adapt to recurring shocks such as floods and droughts.
`
  },
  usr: {
    title: 'Urban Malawi Social Registry',
    body: `Component 3.1 of RCRP 2 will expand the Malawi Social Registry, formerly known as the UBR, to urban councils.`
  },
  upw: {
    title: 'Urban Climate Smart Public Works Program',
    body: `Component 3.2 of RCRP 2 will pilot a climate public works program in urban councils in Malawi`
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
                @click.prevent="() => {
                  activeTab = item.id
                  history.replaceState(null, '', `#${item.id}`)
                }"
                :class="[
                  'block px-3 py-2 rounded text-sm cursor-pointer',
                  item.id === activeTab
                    ? 'bg-blue-100 font-medium text-blue-900'
                    : 'hover:bg-gray-100'
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
      <div v-if="projectContent[activeTab]" class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ projectContent[activeTab].title }}
        </h2>
        <div class="text-gray-700 text-base leading-relaxed" v-html="projectContent[activeTab].body" />
      </div>
      <div v-else class="text-gray-500 italic">No content available for this project.</div>
    </main>
  </div>
</template>
