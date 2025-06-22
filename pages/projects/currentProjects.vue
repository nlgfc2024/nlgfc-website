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
      { id: 'pbg', title: 'Performance Based Grants' },
      { id: 'lapa', title: 'LAPA' },
      { id: 'adaptive', title: 'Adaptive Management' }
    ]
  },
  {
    group: 'RCRP 2',
    items: [
      { id: 'usr', title: 'Urban Social Registry' },
      { id: 'upw', title: 'Urban Public Works' },
      { id: 'pbg2', title: 'Performance Based Grants' }
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
    title: 'Public Works',
    body: `Provides short-term employment to vulnerable households through labor-intensive public works.`
  },
  emergency: {
    title: 'Emergency Cash Transfer',
    body: 'Rapid cash assistance during emergencies like natural disasters to ensure basic household survival.'
  },
  livelihoods: {
    title: 'Livelihoods Support',
    body: 'Offers skills training, seed capital, and business support to boost income generation.'
  },
  pbg: {
    title: 'Performance Based Grants',
    body: 'Provides funds to local councils based on performance metrics to support service delivery.'
  },
  lapa: {
    title: 'Local Authority Performance Assessment (LAPA)',
    body: 'Monitors and evaluates local councils to ensure accountability and efficiency.'
  },
  adaptive: {
    title: 'Adaptive Management',
    body: 'Allows projects to respond flexibly to changing contexts and emerging evidence.'
  },
  usr: {
    title: 'Urban Social Registry',
    body: 'A digital platform for identifying and registering urban poor for social protection programs.'
  },
  upw: {
    title: 'Urban Public Works',
    body: 'Creates short-term jobs for the urban poor while improving community infrastructure.'
  },
  pbg2: {
    title: 'Performance Based Grants (Urban)',
    body: 'Supports urban governance and services through targeted performance-linked funding.'
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
