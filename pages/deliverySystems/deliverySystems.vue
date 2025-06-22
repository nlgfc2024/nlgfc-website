<script setup>
definePageMeta({ title: 'Delivery Systems' })

const route = useRoute()
const activeTab = ref('msr') // Default tab

const projectGroups = [
  {
    group: 'Delivery Systems',
    items: [
      { id: 'msr', title: 'MSR' },
      { id: 'laifmis', title: 'LAIFMIS' },
      { id: 'e-payments', title: 'E-Payments' },
      { id: 'publicworks', title: 'Public Works MIS' },
      { id: 'grm', title: 'GRM MIS' },
      { id: 'sctmis', title: 'SCT MIS' },
      { id: 'lapas', title: 'LAPAS' },
      { id: 'cimis', title: 'CIMIS' },
      { id: 'pmis', title: 'PMIS' }
    ]
  }
]

// Update tab based on route hash
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  }
})

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
  <div class="bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 border-r pr-4">
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

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <div v-for="group in projectGroups" :key="group.group">
          <div v-for="item in group.items" :key="item.id" v-show="activeTab === item.id" class="prose max-w-none">
            
            <!-- MSR -->
            <div v-if="item.id === 'msr'">
              <iframe
                src="https://dashboards.malawiubr.org/public/dashboard/0929d069-914b-4d88-9017-1a8b46cdc28f"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- LAIFMIS -->
            <div v-else-if="item.id === 'laifmis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Local Authority Integrated Finance Management Information System</h2>
              <p class="text-gray-700 leading-relaxed">
                To be a model government agency recognized for excellence in public service and innovative governance solutions.
              </p>
            </div>

            <!-- E-Payments -->
            <div v-else-if="item.id === 'e-payments'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">E-Payments</h2>
            </div>

            <!-- Public Works MIS -->
            <div v-else-if="item.id === 'publicworks'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Public Works Management Information System</h2>
              <p class="text-gray-700 mb-4">A comprehensive system for managing public works projects, tracking progress, and ensuring quality infrastructure development.</p>
              <iframe
                src="http://146.190.44.195:3002/login"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- GRM MIS -->
            <div v-else-if="item.id === 'grm'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Grievance Redress Mechanism (GRM)</h2>
              <p class="text-gray-700">A systematic approach to receive, process, and resolve complaints from citizens regarding public services.</p>
            </div>

            <!-- SCT MIS -->
            <div v-else-if="item.id === 'sctmis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Social Cash Transfer Program (SCTP) MIS</h2>
              <p class="text-gray-700">Manages identification, enrollment, and payments for social cash transfer beneficiaries.</p>
            </div>

            <!-- LAPAS -->
            <div v-else-if="item.id === 'lapas'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Local Authority Performance Assessment (LAPA)</h2>
              <iframe
                src="https://lapa.nlgfc.gov.mw/data"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- CIMIS -->
            <div v-else-if="item.id === 'cimis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Comsip Integrated MIS (CIMIS)</h2>
              <p class="text-gray-700"> <!-- Add content as needed --> </p>
            </div>

            <!-- PMIS -->
            <div v-else-if="item.id === 'pmis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Project Monitoring Information System (PMIS)</h2>
              <iframe
                src="https://projects.nlgfc.gov.mw"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.prose {
  max-width: 800px;
  margin: 0 auto;
}
</style>
