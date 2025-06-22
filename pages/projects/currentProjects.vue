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
      { id: 'emergency', title: 'Emergency Cash Transfer' },
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

const openGroup = ref(projectGroups[0].group)

const projectContent = {

  ssrlp_overview: {
    title: 'Social Support for Resilient Livelihoods Overview',
    body: `Social Support for Resilient Livelihoods Project (SSRLP) is a seven-year (2020–2027) project, implemented by the Government of Malawi through the National Local Government Finance Committee (NLGFC) and Local Government Authorities (Councils), with financial support from the World Bank and the Social Protection Multi-Donor Trust Fund (SP-MDTF), with a total cost of $516 million. 
The Project Development Objective (PDO) is to improve resilience among the poor and vulnerable population and strengthen the national platform for safety nets in the Republic of Malawi by strengthening the national safety net platform and operationalizing the Malawi National Social Support Programme II (MNSSP II) in line with the National Social Support Policy (NSSP). SSRLP focuses on six pillars: Consumption Support, Resilient Livelihoods, Scalable Safety Nets, Linkages, Harmonized Systems, and the Social Cash Transfer Programme (SCTP), which serves as the anchor intervention. 
The project targets 405,000 ultra-poor households annually with shock-responsive cash transfers, 235,000 beneficiaries under contingency cash transfers, and 520,000 households through the Climate Smart Enhanced Public Works Program (CS-EPWP). Additionally, it aims to support 590,000 households with Livelihood interventions by 2027, prioritizing women and youth. Key outcomes in this project include: improved food security, increased income-generating investments, institutionalisation of a national social registry platform, and establishment of a disaster risk financing mechanism. The project is implemented across 18 districts and 4 city councils, with a strong emphasis on gender inclusion and scalable social protection systems. 
Since 2020, SSRLP has reached out to ultra-poor and vulnerable households through unconditional and conditional social cash transfers in Malawi through such programmes as the Social Cash Transfer Program (SCTP) (Mtukula Pakhomo) and ClimateSmart Public Works Programme (Mbwezera Chilengedwe), just to focus on key programmes.
`
  },
  gesd_overview: {
    title: 'Governance to Enable Service Delivery Overview',
    body: `1.0 Background
Governance to Enable Service Delivery (GESD) project development objective is “to strengthen Local Authorities’ institutional performance, responsiveness to citizens and management of resources for service delivery.”

The higher-level goals of the project include improving service delivery in terms of capital investments and facility-level management in rural areas. This is where most of the poor citizens reside and face significant challenges in accessing basic services.

The project is implemented by the Ministry of Finance and Economic Affairs, the Ministry of Local Government, Unity and Culture and the National Local Government Finance Committee (NLGFC) as key lead partners

Other implementing partners include: Accountant General; Central Internal Audit Office; Ministry of Economic Planning and Development and Public Sector Reforms; Ministry of Education; Ministry of Health; National Audit Office and Public Procurement and Disposal of Assets Authority; and Local Authorities

2.0  Project Objectives
2.1 Strengthened institutional performance – tracking of improvements in Local Authorities (LAs) institutional performance for service delivery. This process measures improvements to basic fiduciary functions regarding the minimum access conditions and triggers that determine eligibility. It also measures improvements in institutional performance in the delivery of quality investments that respond to community priorities; efficient and accountable management of resources, as well as effective management of frontline service delivery staff. The indicators include  (i) Local Authorities that are eligible for the Performance Based Grant (PBG) and (ii) Local Authorities that increase their performance assessment score
2.2 Strengthened management of resources – tracking of improvements in LAs' management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans (AIPs). It tracks LAs that complete 80 per cent of the capital investment projects in their AIPs.
2.3 Strengthened responsiveness to citizens -  tracking of improvements in LAs that are responsive to citizens as measured by citizen feedback on four aspects of the AIP: opportunity for participation; efficiency of implementation; responsiveness to citizen needs; transparency of process. This process is measured by increased citizen satisfaction (disaggregated by sex) with the preparation and implementation of AIPs based on periodic beneficiary feedback surveys.
3.0 Expected Project Results
a) 	Increased adequacy, predictability, and transparency of discretionary development resources for LAs
b) 	Improved management of accountability of resources by central and local authorities
c) 	Improved core human resource capacity and staffing of core functions in LAs
d) 	Improved delivery of quality investments by LAs that respond to community priorities
e) 	Strengthened citizen engagement structures at key areas in the service delivery results chain and
f)  	Improvement in key front-line service delivery processes.`
  },

  rcrp_overview: {
    title: 'Resilience and Climate Resilience Overview',
    body: `Regional Climate Resilience Project (RCRP) is a five year (2024-2029) government of Malawi project funded by the  World Bank to the tune of US$ 240 million. 
2.0 Project Development Objective (PDO)
RCRP 2 Project Development Objective (PDO) is to improve resilience to water-related climate shocks in Malawi and in the Eastern and Southern Africa region, and in case of an Eligible Crisis or Emergency, to respond promptly and effectively to it.
3.0 PDO Level Indicators
People in selected basins with reduced vulnerability to climate shocks
Land area with increased flood protection and catchment conservation
People having access to Early Action and social protection systems supported through the project 
People benefiting from restored infrastructure damaged by Tropical Cyclone Freddy and/or other eligible emergencies   
Regional collaboration strengthened on water-related climate challenges
4.0 Project Components and Fund Allocation
4.1 Component 1: Risk Management and Climate Financing has a total allocation of US$30 million. This includes US$6 million for strategy development for water resources and catchment management, US$18 million for emergency preparedness and response as well as early warning systems, and US$6 million for strengthening monitoring, reporting, and verification (MRV) capacity to facilitate access to climate finance
4.2 Component 2: Infrastructure Investments and Sustainable Asset Management for Climate Resilience is the largest, with a total budget of US$180 million. Of this, US$100 million is allocated to basin-level infrastructure development, while US$80 million is dedicated to district-led resilience building.
4.3 Component 3: Adaptive Climate Services for Resilient Communities is allocated US$11.5 million. This includes US$3 million for expanding the social registry in urban areas and US$7 million for designing and piloting urban climate-smart public works.
4.4 Component 4: Project Management has an allocation of US$15 million to support effective coordination, implementation, and oversight of the entire project.
4.5 Component 5: Contingent Emergency Response Component is set aside with a budget of US$5 million to enable rapid response to unforeseen climate-related emergencies.
The total funding across all components sums up to US$240 million
RCRP Implementation Arrangements
RCRP 2 will be implemented by various stakeholders: Ministry of Finance and Economic Affairs, Ministry of Transport and Public Works, Road Authority, DoDMA, Ministry of Local Government, Unity and Culture, National Local Government Finance Committee, Ministry of Water and Sanitation etc
`
  },


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
        <div class="text-gray-700 text-base leading-relaxed space-y-4">
  <p v-for="(paragraph, index) in projectContent[activeTab].body.split(/\n\s*\n/)" :key="index">
    {{ paragraph.trim() }}
  </p>
</div>

      </div>
      <div v-else class="text-gray-500 italic">No content available for this project.</div>
    </main>
  </div>
</template>
