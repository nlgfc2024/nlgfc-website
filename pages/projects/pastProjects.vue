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
    title: 'Malawi Social Action Fund (MASAF 4)',
    body: `
      <p class="mb-4"><strong>Malawi Social Action Fund (MASAF 4)</strong> was implemented under the theme <em>"Strengthening Safety Net Systems in Malawi"</em>. It was one of the key instruments of the Government of Malawi for improving key safety net programs and building a coordinated and systematic approach to social protection.</p>
      
      <p class="mb-4">The MASAF IV Project was approved in December 2013 and became effective on 14 September 2014. The original closing date was 30 June 2018. However, with additional financing, implementation extended into late 2019 to accommodate expanded activities, including drought response and scaling up of social protection programs.</p>

      <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">Project Development Objective (PDO)</h3>
      <p class="mb-4">To strengthen safety net delivery systems and improve the coordination and efficiency of safety net interventions to benefit ultra-poor and vulnerable households.</p>

      <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">Successes of MASAF IV</h3>
      <ul class="list-disc list-inside mb-4">
        <li class="mb-1"><strong>Productive Community Driven Public Works:</strong> Supported multiple infrastructure and environmental protection projects that provided income and created long-term community assets.</li>
        <li class="mb-1"><strong>Livelihoods and Skills Development:</strong> Promoted self-reliance through grants and capacity building for household-level investments and economic empowerment.</li>
        <li class="mb-1"><strong>Social Cash Transfers:</strong> Expanded from pilot districts to national scale, targeting vulnerable and labour-constrained households, with improved delivery through E-transfers.</li>
        <li class="mb-1"><strong>Systems Development:</strong> Strengthened national systems such as the unified beneficiary registry, MIS, and institutional coordination for safety net implementation.</li>
      </ul>
    `
  },

  psn: {
    title: 'Productive Safety Nets',
    body: `
      <p class="mb-4">This component focused on three safety net programs:</p>
      <ol class="list-decimal list-inside mb-4">
        <li class="mb-1"><strong>Productive Community Driven Public Works:</strong> Provided cash transfers through labour while building productive community assets. These works increased household incomes, enhanced food security, and reduced vulnerability to climate-related shocks.</li>
        <li class="mb-1"><strong>Livelihoods and Skills Development:</strong> Delivered grants and technical support to promote savings and investments via Community Savings and Investment Promotion (COMSIP) groups. This supported initiatives such as grain mills, livestock, school kitchen gardens, and nutrition/enterprise training.</li>
        <li class="mb-1"><strong>Social Cash Transfers:</strong> Reached 21,000 ultra-poor labour-constrained households in Dedza and Nkhata Bay, while building national capacity to cover 319,000 households across all districts using proxy means testing and E-transfers.</li>
      </ol>
    `
  },

  scb: {
    title: 'Systems and Capacity Building',
    body: `
      <p class="mb-4">This component financed investments in strengthening systems and institutional capacity. It supported technical assistance, training, and equipment aimed at improving:</p>
      <ul class="list-disc list-inside mb-4">
        <li class="mb-1">The unified beneficiary registry</li>
        <li class="mb-1">Management Information Systems (MIS)</li>
        <li class="mb-1">Targeting systems for Social Cash Transfers and broader safety nets programs</li>
        <li class="mb-1">Monitoring and evaluation frameworks</li>
      </ul>
    `
  },

  pm: {
    title: 'Project Management',
    body: `
      <p class="mb-4">This component supported the overall project implementation and coordination framework. It included activities such as:</p>
      <ul class="list-disc list-inside mb-4">
        <li class="mb-1">Planning and budgeting</li>
        <li class="mb-1">Monitoring and evaluation</li>
        <li class="mb-1">Financial management and procurement</li>
        <li class="mb-1">Environmental and social safeguards management</li>
        <li class="mb-1">Capacity building and knowledge management</li>
      </ul>
    `
  },

  miera_overview: {
    title: 'More Income and Employment in Rural Areas (MIERA)',
    body: `
      <p class="mb-4"><strong>MIERA</strong> aimed to improve the business environment for smallholder farmers and small-to-medium enterprises in rural Malawi through economic infrastructure development.</p>

      <p class="mb-4">Funded by the German Government through KfW with a budget of 10 million Euros, the project was implemented by AHT Consultants from January 2017 to December 2020, co-funded by the Government of Malawi (GoM) with a contribution of at least MK200 million.</p>

      <p class="mb-4">The project followed earlier interventions under the KfW Urban Window Project and focused on upgrading and constructing new markets.</p>

      <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">Target Markets</h3>
      <ul class="list-disc list-inside mb-4">
        <li class="mb-1">Upgrades to: Sadzi, Lunzu, Goliati, Neno, and Nkhata Bay markets (Fast Track Markets)</li>
        <li class="mb-1">New construction: Dyeratu, Chinkhoma, and Embangweni markets</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">MIERA Project Components</h3>
      <ul class="list-disc list-inside mb-4">
        <li class="mb-1"><strong>Implementation of Economic Infrastructure:</strong> 7 million Euros, managed via the Local Development Fund.</li>
        <li class="mb-1"><strong>Support to Malawi Innovation Challenge Fund (MICF):</strong> 3 million Euros, implemented by UNDP under the Private Sector Development Project (PSDP).</li>
      </ul>
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
            </details>
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
