<script setup>
import GeneralSidebar from '../../components/GeneralSidebar.vue';

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
      <p><strong>Malawi Social Action Fund (MASAF 4)</strong> was implemented under the theme <em>"Strengthening Safety Net Systems in Malawi"</em>. It was one of the key instruments of the Government of Malawi for improving key safety net programs and building a coordinated and systematic approach to social protection.</p>
      
      <p>The MASAF IV Project was approved in December 2013 and became effective on 14 September 2014. The original closing date was 30 June 2018. However, with additional financing, implementation extended into late 2019 to accommodate expanded activities, including drought response and scaling up of social protection programs.</p>

      <h3>Project Development Objective (PDO)</h3>
      <p>To strengthen safety net delivery systems and improve the coordination and efficiency of safety net interventions to benefit ultra-poor and vulnerable households.</p>

      <h3>Successes of MASAF IV</h3>
      <ul>
        <li><strong>Productive Community Driven Public Works:</strong> Supported multiple infrastructure and environmental protection projects that provided income and created long-term community assets.</li>
        <li><strong>Livelihoods and Skills Development:</strong> Promoted self-reliance through grants and capacity building for household-level investments and economic empowerment.</li>
        <li><strong>Social Cash Transfers:</strong> Expanded from pilot districts to national scale, targeting vulnerable and labour-constrained households, with improved delivery through E-transfers.</li>
        <li><strong>Systems Development:</strong> Strengthened national systems such as the unified beneficiary registry, MIS, and institutional coordination for safety net implementation.</li>
      </ul>
    `
  },

  psn: {
    title: 'Productive Safety Nets',
    body: `
      <p>This component focused on three safety net programs:</p>
      <ol>
        <li><strong>Productive Community Driven Public Works:</strong> Provided cash transfers through labour while building productive community assets. These works increased household incomes, enhanced food security, and reduced vulnerability to climate-related shocks.</li>
        <li><strong>Livelihoods and Skills Development:</strong> Delivered grants and technical support to promote savings and investments via Community Savings and Investment Promotion (COMSIP) groups. This supported initiatives such as grain mills, livestock, school kitchen gardens, and nutrition/enterprise training.</li>
        <li><strong>Social Cash Transfers:</strong> Reached 21,000 ultra-poor labour-constrained households in Dedza and Nkhata Bay, while building national capacity to cover 319,000 households across all districts using proxy means testing and E-transfers.</li>
      </ol>
    `
  },

  scb: {
    title: 'Systems and Capacity Building',
    body: `
      <p>This component financed investments in strengthening systems and institutional capacity. It supported technical assistance, training, and equipment aimed at improving:</p>
      <ul>
        <li>The unified beneficiary registry</li>
        <li>Management Information Systems (MIS)</li>
        <li>Targeting systems for Social Cash Transfers and broader safety nets programs</li>
        <li>Monitoring and evaluation frameworks</li>
      </ul>
    `
  },

  pm: {
    title: 'Project Management',
    body: `
      <p>This component supported the overall project implementation and coordination framework. It included activities such as:</p>
      <ul>
        <li>Planning and budgeting</li>
        <li>Monitoring and evaluation</li>
        <li>Financial management and procurement</li>
        <li>Environmental and social safeguards management</li>
        <li>Capacity building and knowledge management</li>
      </ul>
    `
  },

  miera_overview: {
    title: 'More Income and Employment in Rural Areas (MIERA)',
    body: `
      <p><strong>MIERA</strong> aimed to improve the business environment for smallholder farmers and small-to-medium enterprises in rural Malawi through economic infrastructure development.</p>

      <p>Funded by the German Government through KfW with a budget of 10 million Euros, the project was implemented by AHT Consultants from January 2017 to December 2020, co-funded by the Government of Malawi (GoM) with a contribution of at least MK200 million.</p>

      <p>The project followed earlier interventions under the KfW Urban Window Project and focused on upgrading and constructing new markets.</p>

      <h3>Target Markets</h3>
      <ul>
        <li>Upgrades to: Sadzi, Lunzu, Goliati, Neno, and Nkhata Bay markets (Fast Track Markets)</li>
        <li>New construction: Dyeratu, Chinkhoma, and Embangweni markets</li>
      </ul>

      <h3>MIERA Project Components</h3>
      <ul>
        <li><strong>Implementation of Economic Infrastructure:</strong> 7 million Euros, managed via the Local Development Fund.</li>
        <li><strong>Support to Malawi Innovation Challenge Fund (MICF):</strong> 3 million Euros, implemented by UNDP under the Private Sector Development Project (PSDP).</li>
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
      openGroup.value = group.group
      break
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
    <!-- Sidebar -->
    <aside class="w-full md:w-72 flex-shrink-0">
      <GeneralSidebar
        sidebarType="projects"
        :sectionsData="projectGroups"
        :activeId="activeTab"
        sidebarTitle="Past Projects"
        @update:activeId="activeTab = $event"
      />
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

.prose ul,
.prose ol {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
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