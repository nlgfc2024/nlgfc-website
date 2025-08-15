<script setup>
definePageMeta({
  title: 'Our Mandate'
})

const route = useRoute()
const activeTab = ref('fiscalDecentralization')

const tabGroups = [
  {
    group: 'Our Mandate',
    items: [
      { id: 'fiscalDecentralization', title: 'Fiscal Decentralization' },
      { id: 'financialManagement', title: 'Financial Management' },
      {
        id: 'localDevelopmentSupport',
        title: 'Local Development Support',
        children: [
          { id: 'cdf', title: 'CDF' },
          { id: 'ddf', title: 'DDF' },
          { id: 'waterStructuresFund', title: 'Water Structures Fund' },
          { id: 'healthRehabilitation', title: 'Health Rehabilitation' },
          { id: 'idf', title: 'Infrastructure Development Fund (IDF)' },
          { id: 'rrf', title: 'Road Rehabilitation Fund (RRF)' }
        ]
      }
    ]
  }
]

onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  } else {
    // Set default tab if no hash is present
    activeTab.value = 'fiscalDecentralization'
  }
})

watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})

function updateActiveTabFromHash(hash) {
  for (const group of tabGroups) {
    for (const item of group.items) {
      if (item.id === hash) {
        activeTab.value = item.id
        return
      }
      if (item.children) {
        const match = item.children.find(sub => sub.id === hash)
        if (match) {
          activeTab.value = match.id
          return
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
    <!-- Sidebar Navigation -->
    <aside class="w-full md:w-64 flex-shrink-0">
      <div v-for="group in tabGroups" :key="group.group" class="mb-6">
        <div class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">{{ group.group }}</h2>
          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.id">
              <NuxtLink
                :to="`#${item.id}`"
                @click="activeTab = item.id"
                class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                :class="{
                  'bg-blue-50 text-gray-800 font-medium border-l-4 border-gray-600': activeTab === item.id || (item.children && item.children.some(child => child.id === activeTab))
                }"
              >
                {{ item.title }}
              </NuxtLink>
              <ul v-if="item.children" class="ml-4 pl-4 border-l border-gray-300 space-y-1 mt-1">
                <li v-for="sub in item.children" :key="sub.id">
                  <NuxtLink
                    :to="`#${sub.id}`"
                    @click="activeTab = sub.id"
                    class="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-800 text-sm"
                    :class="{
                      'bg-gray-100 text-gray-900 font-medium border-l-2 border-gray-600': activeTab === sub.id
                    }"
                  >
                    {{ sub.title }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 space-y-6">
      <!-- Fiscal Decentralization -->
      <div v-show="activeTab === 'fiscalDecentralization'" class="prose max-w-none">
        <!-- Header Section -->
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-indigo-100">
            Fiscal Decentralization
          </h2>
          <p class="text-lg text-gray-600">
            Managing intergovernmental fiscal transfers to empower local service delivery
          </p>
        </div>

        <!-- Overview Section -->
        <div class="bg-gradient-to-br from-indigo-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
          <div class="flex items-center mb-6"> <!-- Changed to items-center and added mb-6 -->
              <div class="bg-indigo-100 p-3 rounded-lg mr-5">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Constitutional Mandate</h3> <!-- Removed mb-3 -->
          </div>
          <p class="text-gray-700 leading-relaxed pl-16"> <!-- Added pl-16 for indentation -->
              NLGFC is constitutionally mandated to facilitate fiscal decentralization and serves as the central mechanism for managing fiscal transfers to Local Authorities through the Intergovernmental Fiscal Transfer Formula (IGTF), promoting equitable resource allocation across Malawi.
          </p>
        </div>

        <!-- IGTF Explanation -->
        <div class="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg class="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Intergovernmental Fiscal Transfer Formula (IGTF)
          </h3>
          <p class="text-gray-700 mb-4">
            The IGTF system enables the central government to allocate financial resources to Local Government Authorities (LGAs) to support decentralized service delivery, designed to promote:
          </p>
          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <div class="flex items-center">
              <div class="bg-indigo-100 p-1 rounded-full mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Equity in resource distribution</span>
            </div>
            <div class="flex items-center">
              <div class="bg-indigo-100 p-1 rounded-full mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Transparency in allocations</span>
            </div>
            <div class="flex items-center">
              <div class="bg-indigo-100 p-1 rounded-full mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Accountability mechanisms</span>
            </div>
            <div class="flex items-center">
              <div class="bg-indigo-100 p-1 rounded-full mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Efficient utilization</span>
            </div>
          </div>
        </div>

        <!-- Key Features Sections -->
        <div class="space-y-8">
          <!-- Types of Transfers -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="font-semibold !text-white">A. Types of Fiscal Transfers</h3>
            </div>
            <div class="p-6">
              <ol class="list-decimal space-y-4 pl-5">
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Sector-specific funds:</span>
                  <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Health: 38% of ORT</li>
                    <li>Education: 34%</li>
                    <li>Agriculture: 5%</li>
                    <li>Other sectors: each receives less than 1%</li>
                  </ul>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">General Resource Fund (GRF):</span>
                  <span class="text-gray-700"> For administrative functions (9.6% of Other Recurrent Transactions)</span>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Development transfers:</span>
                  <span class="text-gray-700"> DDF, IDF, CDF, Health Rehabilitation, Water Structures funds, city and municipal road funds</span>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Performance-based grants:</span>
                  <span class="text-gray-700"> Including Governance to Enable Service Delivery (GESD) grants</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- Formula Components -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="font-semibold !text-white">B. Formula Allocation Criteria</h3>
            </div>
            <div class="p-6">
              <ol class="list-decimal space-y-4 pl-5">
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Population size:</span>
                  <span class="text-gray-700"> Larger districts receive proportionally more funds</span>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Poverty levels:</span>
                  <span class="text-gray-700"> Higher allocations to districts with greater poverty to address inequality</span>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Geographical factors:</span>
                  <span class="text-gray-700"> Compensation for higher service delivery costs in remote/larger areas</span>
                </li>
                <li class="pl-2">
                  <span class="font-medium text-gray-800">Performance indicators:</span>
                  <span class="text-gray-700"> Rewards for good governance, planning, and financial management (especially under GESD)</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- Dashboard Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="font-semibold !text-white">C. IGTF Monitoring Dashboard</h3>
            </div>
            <div class="p-6">
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <!-- Replace with your actual dashboard embed -->
                <iframe 
                  src="YOUR_DASHBOARD_IFRAME_LINK" 
                  class="w-full h-96 border-0"
                  frameborder="0"
                  allowfullscreen>
                </iframe>
              </div>
              <p class="mt-4 text-sm text-gray-600 italic">
                Note: The IGTF is currently under review to better reflect contemporary financing needs across Local Councils.
              </p>
            </div>
          </div>
        </div>

        <!-- Legal Framework -->
        <div class="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Governing Framework
          </h4>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start">
              <svg class="flex-shrink-0 w-4 h-4 text-indigo-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Constitution of Malawi (1994), Section 149</span>
            </li>
            <li class="flex items-start">
              <svg class="flex-shrink-0 w-4 h-4 text-indigo-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Local Government Act (1998)</span>
            </li>
            <li class="flex items-start">
              <svg class="flex-shrink-0 w-4 h-4 text-indigo-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Public Finance Management Act (2022)</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Financial Management -->
      <div v-show="activeTab === 'financialManagement'" class="prose max-w-none">
        <!-- Header Section -->
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
            Financial Management
          </h2>
          <p class="text-lg text-gray-600">
            Comprehensive oversight of the public financial management cycle for local governance
          </p>
        </div>

        <!-- Overview Section -->
        <div class="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
            <!-- Icon and heading inline alignment -->
            <div class="flex items-center mb-6">
                <div class="bg-blue-100 p-3 rounded-lg mr-5">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">PFM Cycle Management</h3>
            </div>

            <!-- Content with proper indentation -->
            <p class="text-gray-700 leading-relaxed pl-16">
                NLGFC oversees the entire public financial management cycle, from resource mobilization and allocation to utilization, reporting, and accountability. Our mandate promotes sound fiscal governance, transparency, and efficient service delivery across all local authorities in Malawi.
            </p>
        </div>

        <!-- Core Functions Section -->
        <div class="space-y-8">
          <!-- Resource Mobilization -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                1. Resource Mobilization
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                NLGFC mobilizes financial resources from multiple sources to ensure adequate funding for local service delivery:
              </p>
              <div class="grid md:grid-cols-2 gap-4 mt-4">
                <div class="flex items-start">
                  <div class="bg-blue-100 p-1 rounded-full mr-3 flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700">Government Treasury allocations</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="bg-blue-100 p-1 rounded-full mr-3 flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700">Development partner support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Intergovernmental Fiscal Transfers -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                2. Intergovernmental Fiscal Transfers
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                NLGFC manages the planning, coordination, and disbursement of fiscal transfers to Local Authorities:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Application of the Intergovernmental Fiscal Transfer Formula</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Disbursement of various grants (GRF, Sector Conditional, Performance-Based)</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ensuring timely and predictable transfers</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Budgeting and Consolidation -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                3. Budgeting and Consolidation
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                NLGFC supports Local Authorities in preparing credible budgets aligned with national priorities:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Issuing program-based budgeting guidelines with Ministry of Finance</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reviewing and consolidating council budgets</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integrating donor and government funding into local plans</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Financial Monitoring and Reporting -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                4. Financial Monitoring and Reporting
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                Oversight mechanisms to ensure transparency and accountability in local government finances:
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <ul class="space-y-3 text-gray-700">
                  <li class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quarterly financial report reviews</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Budget execution analysis</span>
                  </li>
                </ul>
                <ul class="space-y-3 text-gray-700">
                  <li class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time performance dashboards</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Budget variance follow-up</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Audit Oversight -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                5. Audit Oversight and Assurance
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                NLGFC facilitates the audit process and ensures implementation of recommendations:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coordinating National Audit Office schedules</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Supporting council audit preparations</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monitoring recommendation implementation</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Capacity Building -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                6. Capacity Building in Financial Management
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                Strengthening financial management capabilities across local authorities:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PFM Act 2022 training programs</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>LAIFMIS deployment support</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technical assistance in procurement and asset management</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- LGR Improvement -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                7. Locally Generated Revenue (LGR) Improvement
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                Enhancing councils' own-source revenue generation capabilities:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local Revenue Enhancement Plans</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Digital LGR collection systems</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Performance monitoring and technical support</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Financial Systems -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                8. Financial Systems and Automation
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                Digital transformation of local government financial systems:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>LAIFMIS rollout to all district councils</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Payment and reporting system integration</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Interoperability with national PFM systems</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Policy Compliance -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h3 class="text-lg font-semibold !text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                9. Policy and Regulatory Compliance
              </h3>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4">
                Ensuring adherence to national financial regulations and policies:
              </p>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Public Finance Management Act (2022)</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Decentralisation Policy implementation</span>
                </li>
                <li class="flex items-start">
                  <svg class="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Government circulars compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Local Development Support -->
      <div v-show="activeTab === 'localDevelopmentSupport'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Local Development Support</h2>
          <div class="prose max-w-none text-gray-700">
            <p>NLGFC provides local development project support to LAs through supervision and monitoring of both GoM and donor-funded projects in local governments. Malawi administers several funding mechanisms to support local development projects. These funds are designed to empower districts and constituencies to address key socio-economic challenges, improve infrastructure, and enhance service delivery at the grassroots level.</p>
          </div>
        </div>
      </div>

      <!-- DDF -->
      <div v-show="activeTab === 'ddf'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">District Development Fund (DDF)</h2>
          <div class="prose max-w-none text-gray-700">
            <p>District Development Fund supports locally prioritised development projects identified through District Development Plans (DDPs). The purpose of this fund is to enhance service delivery in sectors like education, health, agriculture, and local governance. The fund is allocated directly to District Councils based on approved budgets. Projects are implemented by councils in collaboration with communities.</p>
          </div>
        </div>
      </div>

      <!-- CDF -->
      <div v-show="activeTab === 'cdf'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Constituency Development Fund (CDF)</h2>
          <div class="prose max-w-none text-gray-700">
            <p>The purpose of this fund is to finance small-scale community projects at the constituency level. The aim is to improve local infrastructure, livelihoods, and social services. CDF is channelled through Members of Parliament (MPs) in consultation with local structures, and projects are selected by community demand.</p>
          </div>
        </div>
      </div>

      <!-- Health Rehabilitation -->
      <div v-show="activeTab === 'healthRehabilitation'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Health Rehabilitation Fund</h2>
          <div class="prose max-w-none text-gray-700">
            <p>Health Rehabilitation Fund is for rehabilitating and upgrading health facilities (clinics, hospitals, staff housing) to improve access to quality healthcare services.</p>
          </div>
        </div>
      </div>

      <!-- IDF -->
      <div v-show="activeTab === 'idf'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Infrastructure Development Fund (IDF)</h2>
          <div class="prose max-w-none text-gray-700">
            <p>IDF supports the construction and rehabilitation of critical public infrastructure (schools, markets, government buildings) to enhance economic and social service delivery in urban councils in Malawi.</p>
          </div>
        </div>
      </div>

      <!-- RRF -->
      <div v-show="activeTab === 'rrf'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Road Rehabilitation Fund (RRF)</h2>
          <div class="prose max-w-none text-gray-700">
            <p>Rural and urban councils are provided with funds for the maintenance and rehabilitation to improve transport connectivity for trade and mobility. The fund is managed by District Councils with technical support from the Roads Authority.</p>
          </div>
        </div>
      </div>

      <!-- Water Structures Fund -->
      <div v-show="activeTab === 'waterStructuresFund'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Water Structures Fund</h2>
          <div class="prose max-w-none text-gray-700">
            <p>The fund is for the construction and rehabilitation of water supply systems (boreholes, piped schemes, dams) and ensures sustainable access to clean water.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Smooth scrolling for hash links */
html {
  scroll-behavior: smooth;
}

/* Active link styling */
.bg-blue-50 {
  background-color: #f0f9ff;
}
.font-medium {
  font-weight: 500;
}
.border-l-4 {
  border-left-width: 4px;
}
.border-gray-600 {
  border-color: #4b5563;
}
</style>