<script setup>
definePageMeta({
  title: 'Powers and Functions'
})

const activeTab = ref('powers') // Default active tab

const tabs = [
  { id: 'powers', title: 'Powers' },
  { id: 'functions', title: 'Functions' }
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
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">About NLGFC</h2>
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
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
        <!-- Powers Content -->
        <div v-show="activeTab === 'powers'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Powers of NLGFC</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            The National Local Government Finance Committee (NLGFC) was established by the constitution of the Republic of Malawi (Section 149 of 1994) and it assumes other powers and functions as conferred on it by the Local Government Act (1998). As enshrined in the constitution of the Republic of Malawi, NLGFC has powers to:
          </p>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
            <ol class="space-y-4 list-decimal pl-5">
              <li class="text-gray-700">
                Receive all estimates of revenue and all projected budgets of all local government authorities;
              </li>
              <li class="text-gray-700">
                Supervise and audit accounts of local government authorities, in accordance with any Act of Parliament, Assembly, subject to the recommendations of the Auditor General;
              </li>
              <li class="text-gray-700">
                Make recommendations relating to the distribution of funds allocated to local government authorities, and vary the amount payable from time to time and area to area according to, and with sole consideration of, economic, geographic and demographic variables;
              </li>
              <li class="text-gray-700">
                Prepare a consolidated budget for all local government authorities and estimates after consultation with the Treasury, which shall be presented to the National Assembly by the Minister responsible for Local Government before the commencement of each financial year; and
              </li>
              <li class="text-gray-700">
                Make application to that Minister for supplementary funds where necessary.
              </li>
            </ol>
          </div>
        </div>

        <!-- Functions Content -->
        <div v-show="activeTab === 'functions'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Functions of NLGFC</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-700">
                  Ensure transparency, accountability, reporting and good governance of public funds in LAs as enshrined in the Public Finance Management Act 2022, Public Audit Act, 2017, Public Procurement and Disposal of Assets Act 2017, Compliance and Practices Act 2003 and the Local Government Act of 1998.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-700">
                  Mobilise financial resources for other recurrent transactions and development from government and development partners for allocation and disbursement to LAs.
                </p>
              </div>
            </div>
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