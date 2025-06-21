<script setup>
definePageMeta({
  title: 'Delivery Systems'
})

const activeTab = ref('MSR') // Default active tab

const tabs = [
  { id: 'msr', title: 'MSR' },
  { id: 'laifmis', title: 'LAIFMIS' },
  { id: 'e-payments', title: 'E-Payments' },
  { id: 'publicworksmis', title: 'Public Works MIS' },
  { id: 'grmis', title: 'GRM MIS' },
  { id: 'sctmis', title: 'SCT MIS' },
  { id: 'lapas', title: 'LAPAS' },
  { id: 'cimis', title: 'CIMIS' },
  { id: 'pims', title: 'PMIS' }
]

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (tabs.some(tab => tab.id === hash)) {
      activeTab.value = hash
    }
  }
})
</script>

<template>
  <div class="deliverySystems-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">Delivery Systems</h2>
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id" class="border-t border-gray-200 last:border-b">
              <NuxtLink
                :to="`#${tab.id}`"
                @click="activeTab = tab.id"
                class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                :class="{
                  'bg-blue-50 text-gray-800 font-medium border-l-4 border-gray-600': activeTab === tab.id
                }"
              >
                {{ tab.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
        <!-- MSR Content -->
        <div v-show="activeTab === 'msr'" class="prose max-w-none">
            <div>
                <iframe
                src="https://dashboards.malawiubr.org/public/dashboard/0929d069-914b-4d88-9017-1a8b46cdc28f"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div> 
        </div>


        <!-- laifmis Content -->
        <div v-show="activeTab === 'laifmis'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Local Authority Intergrated Finance Management Information System</h2>
          <p class="text-gray-700 leading-relaxed">
            To be a model government agency recognized for excellence in public service and innovative governance solutions.
          </p>
        </div>

        <!-- e-payments Content -->
        <div v-show="activeTab === 'e-payments'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 ">E-Payments</h2>
         
        </div>

        <!-- Public Works Content -->
        <div v-show="activeTab === 'publicworksmis'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Public Works Management Information System</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            A comprehensive system for managing public works projects, tracking progress, and ensuring quality infrastructure development.
          </p>
                    <iframe
              src="http://146.190.44.195:3002/login"
              frameborder="0"
              width="800"
              height="600"
              allowtransparency
          ></iframe>
        </div>

        <!-- GRM Content -->
        <div v-show="activeTab === 'grmis'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Grievance Redress Mechanism (GRM)</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            A systematic approach to receive, process, and resolve complaints from citizens regarding public services.
          </p>
        </div>

        <!-- SCT Content -->
        <div v-show="activeTab === 'sctmis'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Social Cash Transfer Program (SCTP) Management Information System</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            A system designed to manage the identification, enrollment, and payment processes for social cash transfer beneficiaries.
          </p>
        </div>

        <!-- LAPA Content -->
        <div v-show="activeTab === 'lapas'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Local Authority Performance Assessment (LAPA) MIS</h2>
            <div class="iframe-container">
              <iframe 
                src="https://lapa.nlgfc.gov.mw/data"
                  frameborder="0"
                width="800"
                height="600"
                allowtransparency
              />
            </div>
        </div>

        <!-- CIMIS Content -->
        <div v-show="activeTab === 'cimis'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Comsip Intergrated Management Information System (CIMIS)</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
           <!--content needed-->
          </p>
        </div>

        <!-- PMIS Content -->
        <div v-show="activeTab === 'pims'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Project Monitoring Information System (PMIS)</h2>
          <div class="iframe-container">
            <iframe 
              src="https://projects.nlgfc.gov.mw"
                frameborder="0"
              width="800"
              height="600"
              allowtransparency
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: calc(100vh - 120px);
}

.prose {
  max-width: 800px;
  margin: 0 auto;
}
</style>