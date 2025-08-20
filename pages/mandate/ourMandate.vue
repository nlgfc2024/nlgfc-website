<script setup>
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'

definePageMeta({
  title: 'Our Mandate'
})

const route = useRoute()
const activeTab = ref('fiscalDecentralization')

const tabGroups = ref([
  {
    group: 'Our Mandate',
    items: [
      { 
        id: 'fiscalDecentralization', 
        title: 'Fiscal Decentralization',
        children: [
          { id: 'igtfMonitoringDashboard', title: 'IGTF Monitoring Dashboard' }
        ]
      },
      {id: 'igtfMonitoringDashboard', title: 'IGTF Monitoring Dashboard'},
      { id: 'financialManagement', title: 'Financial Management' },
      {
        id: 'localDevelopmentSupport',
        title: 'Local Development Support'
      }
    ]
  }
])

// Map the 'tabGroups' data to the desired structure for the GeneralSidebar
const mappedProjectGroups = computed(() => {
  // Assuming there's only one main group, as per your data
  const mainGroup = tabGroups.value[0];
  
  // Create the final array of items that will be rendered
  const finalItems = [];
  
  // Iterate through the original items and transform them
  mainGroup.items.forEach(item => {
    if (item.children) {
      // For items with children, add both the parent and children as a nested item
      finalItems.push({
        id: item.id,
        title: item.title,
        children: [
          { id: item.id, title: item.title },
          ...item.children
        ]
      });
    } else {
      // For regular items, add them directly
      finalItems.push({
        id: item.id,
        title: item.title
      });
    }
  });

  return [
    {
      group: mainGroup.group,
      items: finalItems
    }
  ];
});

onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  } else {
    activeTab.value = 'fiscalDecentralization'
  }
})

watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})


// Function to handle hash changes
function updateActiveTabFromHash(hash) {
  for (const group of tabGroups.value) {
    for (const item of group.items) {
      if (item.id === hash) {
        activeTab.value = item.id;
        return;
      }
      if (item.children) {
        const match = item.children.find(child => child.id === hash);
        if (match) {
          activeTab.value = match.id;
          return;
        }
      }
    }
  }
}

// Correctly map the data to the projectGroups structure
/*const mappedProjectGroups = computed(() => {
  const finalGroups = [];
  tabGroups.value.forEach(group => {
    // Add the main group
    const mainGroup = {
      group: group.group,
      id: group.group.replace(/\s/g, ''),
      items: []
    };
    finalGroups.push(mainGroup);

    // Iterate through items
    group.items.forEach(item => {
      // If the item has children, create a new nested group
      if (item.children && item.children.length > 0) {
        finalGroups.push({
          group: item.title,
          id: item.id,
          items: item.children
        });
      } else {
        // Otherwise, add the item to the main group
        mainGroup.items.push(item);
      }
    });
  });
  return finalGroups;
});*/

const { data: pages, pending, error: PageError } = usePageBlocks([
  'fiscal-decentralization'
])
const { projectGroups: sharedProjectGroups } = useGeneralSidebar();

watchEffect(() => {
  sharedProjectGroups.value = mappedProjectGroups.value;
});

</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
    

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 space-y-6">
      <!-- Fiscal Decentralization -->
      <div v-show="activeTab === 'fiscalDecentralization'" class="prose max-w-none">
        <!-- Header Section -->
       
            <BlocksRenderer :blocks="pages?.['fiscal-decentralization']?.blocks || []" />
      </div>

      <!-- IGTF Monitoring Dashboard -->
      <div v-show="activeTab === 'igtfMonitoringDashboard'" class="prose max-w-none">
        <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-emerald-100">
            IGTF Monitoring Dashboard
          </h2>
        
        <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          <iframe 
            src="YOUR_DASHBOARD_IFRAME_LINK" 
            class="w-full h-96 border-0"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </div>
        <p class="mt-4 text-sm text-pink-600 bg-pink-50 italic">
          Note: The IGTF is currently under review to better reflect contemporary financing needs across Local Councils.
        </p>
      </div>

      <!-- Financial Management -->
      <div v-show="activeTab === 'financialManagement'" class="prose max-w-none">
        <!-- Header Section -->
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-emerald-100">
            Financial Management
          </h2>
          <p class="text-lg text-gray-600">
            Comprehensive oversight of the public financial management cycle for local governance
          </p>
        </div>

        <!-- Overview Section (PFM Cycle Management title moved up) -->
        <div class="bg-gradient-to-br from-emerald-50 to-gray-50 rounded-xl shadow-sm border border-gray-100 mb-10 flex flex-col">
          <div class="flex items-center mb-0"> <!-- Remove margin-bottom to move title up -->
            <div class="bg-emerald-50 p-3 rounded-lg mr-5">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 flex-1">PFM Cycle Management</h3>
          </div>
          <p class="text-gray-700 leading-relaxed pl-16">
            NLGFC oversees the entire public financial management cycle, from resource mobilization and allocation to utilization, reporting, and accountability. Our mandate promotes sound fiscal governance, transparency, and efficient service delivery across all local authorities in Malawi.
          </p>
        </div>

        <!-- Core Functions Section (all headers styled like Fiscal Decentralization) -->
        <div class="space-y-8">
          <!-- Resource Mobilization -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                A. Resource Mobilization
              </h4>
            </div>
            <div class="p-6">
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                  <span class="flex-shrink-0 mt-0.5 mr-3 text-emerald-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Government Treasury allocations</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 mt-0.5 mr-3 text-emerald-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Development partner support</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Intergovernmental Fiscal Transfers -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-700 px-6 py-4">
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                2. Intergovernmental Fiscal Transfers
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                3. Budgeting and Consolidation
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                4. Financial Monitoring and Reporting
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                5. Audit Oversight and Assurance
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                6. Capacity Building in Financial Management
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                7. Locally Generated Revenue (LGR) Improvement
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                8. Financial Systems and Automation
              </h4>
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
              <h4 class="font-semibold text-white text-lg flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                9. Policy and Regulatory Compliance
              </h4>
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
            <p class="mt-4">
              <NuxtLink :to="'/projects/currentProjects#ssrlp_overview'" class="text-blue-600 hover:underline">Read More</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

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