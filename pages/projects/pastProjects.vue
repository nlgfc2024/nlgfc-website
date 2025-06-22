<script setup>
definePageMeta({ title: 'Past Projects' })

const route = useRoute()

const activeTab = ref('masaf_overview')

const projectGroups = [
  {
    group: 'MASAF',
    items: [
        { id: 'masaf_overview', title: 'Overview' },
        { id: 'psn', title: 'Productive Safety Nets' },
        { id: 'scb', title: 'Systems and Capacity Building' },
        { id: 'pm', title: 'Project Management' }
      
    ]
  },
   {
    group: 'MIERA',
    items: [
      { id: 'miera_overview', title: 'Overview' }
      
    ]
  }
 
]

const openGroup = ref(projectGroups[0].group)

const projectContent = {
  masaf_overview: {
    title: 'Overview',
    body: `Malawi Social Action Fund (MASAF 4) was implemented under the theme- Strengthening Safety Net systems in Malawi.   MASAF 4   was one of the key instruments of the Government of the Republic of Malawi for improving key safety net programs and supporting the building blocks for a coordinated and systematic approach to safety nets in Malawi. 
The MASAF IV Project was approved in December 2013 and became effective on 14 September 2014. The original closing date was 30 June 2018. However, with additional financing, implementation continued into late 2019 to accommodate expanded activities including drought response and scaling up of social protection programs.
 
2.0 Project Development Objective (PDO)
To strengthen safety net delivery systems and improve the coordination and efficiency of safety net interventions to benefit ultra-poor and vulnerable households.

Successes of MASAF IV
MASAF IV has successfully reached thousands of poor and ultra-poor households across Malawi through its key components.
Productive Community Driven Public Works, the project has supported multiple infrastructure and environmental protection projects that have provided income through public works and created long-term community assets.
·        Livelihoods and Skills Development interventions have promoted self-reliance through grants and capacity building for household-level investment and economic empowerment.
·        Social Cash Transfers component has expanded its coverage from pilot districts to national scale, targeting vulnerable and labour-constrained households, with improvements in targeting and delivery through E-transfers.
·        In addition to programmatic benefits, MASAF IV has supported the development of national systems including the unified beneficiary registry, MIS, and improved institutional coordination for safety nets implementation.`
  
  },
  psn: {
    title: ' Productive Safety Nets',
    body: `This component focused three safety net programs: i) Cash transfers through labour on Productive Community Driven Public Works which build productive community assets; ii) Livelihood and Skills Development interventions for poor households; and iii) Social Cash Transfers for those who are most vulnerable and labour constrained including the elderly, disabled and sick.
i.     Productive Community Driven Public Works financed cash transfers for multiple Productive Community Driven Public Works, which increased livelihood opportunities and assets through investments in communities and for households. Productive Community Driven Public Works created assets in the same communities for multiple years, designed to increase impact on household-level incomes and food security and reduce households’ exposure to risks associated with climate change and other disasters.
ii.                Livelihoods and Skills Development financed grants and technical support for increasing household level incomes and assets savings and investments in livelihood opportunities through Community Savings and Investment Promotion (COMSIP) groups. The grants would promote investments, which would increase the incomes and assets of households and reduce risks of food insecurity and promote better nutrition and health. Such grants would fund, for example, grain storage facilities, grain mills, livestock and crop diversification etc. and catering of food for school meals through kitchen gardens. The sub-component would also finance training in nutrition, health and enterprises.
iii.               Social Cash Transfers. The sub component financed cash transfers to another two districts and covered 21,000 ultra-poor labour constrained households in the two districts of Dedza and Nkhata Bay. While Cash transfers financed in these two districts, the capacity building support for the strengthening of the entire system to benefit all proposed 319,000 households for Social Cash Transfers beneficiaries in all districts. The Social Cash Transfers Program was expected to be in all districts by 2015. Social Cash Transfers provides an opportunity to reach the most vulnerable Malawians through a Program, which uses proxy means targeting through the use of poverty scorecard survey and community verification techniques. Its delivery of transfers includes E-transfers.`
  },
  scb: {
    title: 'Systems and Capacity Building',
    body: `This component financed investments in strengthening systems and capacity building to finance technical assistance, training and equipment for improving the overall unified registry, Management of Information Systems, database, monitoring and evaluation and targeting system for the Social Cash Transfers and the safety nets program.`
  },
  pm: {
    title: 'Project Management',
    body: `This component would support overall coordination, integration, planning, monitoring and evaluation, financial management, procurement, safeguards, capacity building and knowledge management.`
  },
  miera_overview: {
    title: 'Overview',
    body: `Increasing discretionary development funding for LAs - tied to the councils Annual Local Authority Performance Assessment (LAPA) results - through the introduction of a Performance-Based Grant (PBG) (Quick links;  LAPAS, Indicative Planning Figures (IPFs)`
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


</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">


       <!-- Sidebar for Desktop -->
     
        <aside class=" w-64 border-r pr-4">
        <div v-for="group in projectGroups" :key="group.group" class="mb-4">
            <details open class="border border-gray-200 rounded">
            <summary class="cursor-pointer px-4 py-2 font-semibold bg-gray-100">
                {{ group.group }}
            </summary>
            <ul class="space-y-1 px-4 py-2">
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
            </details>
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
