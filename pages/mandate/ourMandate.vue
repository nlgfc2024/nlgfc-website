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
      <div v-show="activeTab === 'fiscalDecentralization'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Fiscal Decentralisation</h2>
          <div class="prose max-w-none text-gray-700 space-y-4">
            <p class="text-gray-700 leading-relaxed">
              NLGFC is constitutionally mandated to facilitate fiscal decentralisation and is central in managing fiscal transfers to Local Authorities (LAs) in Malawi using the Intergovernmental Fiscal Transfer Formula (IGTF).
            </p>
            <p class="text-gray-700 leading-relaxed">
              IGTF is used by the central government to allocate financial resources to Local Government Authorities (LGAs) to support decentralised service delivery. The system is designed to promote equity, transparency, accountability, and efficiency in the allocation and utilisation of public resources.
            </p>
            
            <div class="mt-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Features of the IGFT Formula</h3>
              
              <div class="space-y-6">
                <!-- Section A: Types of Transfers -->
                <div class="bg-blue-50 p-5 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">A. Types of Transfers:</h4>
                  <ol class="list-decimal pl-6 space-y-2">
                    <li class="pl-2">
                      <span class="font-medium">Sector-specific funds</span> (Health 38% of ORT, 34% Education, 5% Agriculture, Other sectors; each receives less than 1%).
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">General Resource Fund (GRF)</span> for administrative functions (9.6% of Other Recurrent Transactions (ORT))
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">Development transfers</span> (DDF, IDF, CDF, Health Rehabilitation, Water Structures funds, city and municipal road funds)
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">Development grants</span> such as the Governance to Enable Service Delivery (GESD) grants, which are performance-based.
                    </li>
                  </ol>
                </div>
                
                <!-- Section B: Formula Components -->
                <div class="bg-blue-50 p-5 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">B. Formula Components:</h4>
                  <p class="mb-3">The formula generally includes the following criteria:</p>
                  <ol class="list-decimal pl-6 space-y-3">
                    <li class="pl-2">
                      <span class="font-medium">Population size</span> – larger districts receive more funds.
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">Poverty levels</span> – districts with higher poverty rates may receive more to address inequality.
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">Geographical size and remoteness</span> – to compensate for higher costs of service delivery in remote or larger areas.
                    </li>
                    <li class="pl-2">
                      <span class="font-medium">Performance indicators</span> – increasingly used, especially under GESD, to reward good governance, planning, and financial management.
                    </li>
                  </ol>
                </div>
                
                <!-- Section C: IGTFC Dashboard -->
                <div class="bg-blue-50 p-5 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">C. IGTFC Dashboard</h4>
                  <div class="mt-4 rounded-lg overflow-hidden">
                    <!-- Replace with your actual iframe embed code -->
                    <iframe 
                      src="YOUR_DASHBOARD_IFRAME_LINK" 
                      class="w-full h-96 border-0"
                      frameborder="0"
                      allowfullscreen>
                    </iframe>
                  </div>
                  <p class="mt-3 text-sm text-gray-600">
                    IGTF is under review to reflect current financing needs in the Local Councils.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Management -->
      <div v-show="activeTab === 'financialManagement'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Financial Management</h2>
          <div class="prose max-w-none text-gray-700 space-y-6">
            <p>The financial management function of NLGFC spans the entire public financial management (PFM) cycle, from resource mobilisation and allocation to utilisation, reporting, and accountability. The objective is to promote sound fiscal governance, transparency, and efficient service delivery at the local level.</p>
            
            <div class="space-y-6">
              <!-- Resource Mobilisation -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">1. Resource Mobilisation</h3>
                <p>NLGFC is responsible for mobilising financial resources from various sources, including: Government Treasury (through annual budget allocations) and development partners support to the government of Malawi. This ensures that adequate funds are available to support service delivery and development interventions at the local level.</p>
              </div>

              <!-- Intergovernmental Fiscal Transfers -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">2. Intergovernmental Fiscal Transfers</h3>
                <p>NLGFC manages the planning, coordination, and disbursement of fiscal transfers from the central government to LAs. This includes:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Applying the Intergovernmental Fiscal Transfer Formula</li>
                  <li class="pl-2">Disbursing various grants (General Resource Fund, Sector Conditional Grants, Performance-Based Grants, etc.)</li>
                  <li class="pl-2">Ensuring timely and predictable transfers</li>
                  <li class="pl-2">Monitoring equity and performance-based disbursements</li>
                </ul>
              </div>

              <!-- Continue with all other sections following the same pattern -->
              <!-- Budgeting and Consolidation -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">3. Budgeting and Consolidation</h3>
                <p>NLGFC supports Local Authorities in preparing credible and realistic budgets. Functions include:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Issuing budget guidelines (program-based budgeting) in collaboration with the Ministry of Finance</li>
                  <li class="pl-2">Reviewing and consolidating council budgets</li>
                  <li class="pl-2">Ensuring alignment of local budgets with national priorities</li>
                  <li class="pl-2">Integrating donor and central government funding into local plans</li>
                </ul>
              </div>

              <!-- Financial Monitoring and Reporting -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">4. Financial Monitoring and Reporting</h3>
                <p>NLGFC plays an oversight role to monitor the financial performance of LAs to ensure transparency and accountability through:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Reviewing quarterly financial reports submitted by Local Authorities</li>
                  <li class="pl-2">Conducting budget execution analysis</li>
                  <li class="pl-2">Operating performance dashboards for real-time monitoring</li>
                  <li class="pl-2">Following up on budget variances and underperformance</li>
                </ul>
              </div>

              <!-- Audit Oversight and Assurance -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">5. Audit Oversight and Assurance</h3>
                <p>Although audits are conducted by the National Audit Office (NAO), NLGFC plays a key supervisory and facilitative role by:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Coordinating audit schedules with NAO</li>
                  <li class="pl-2">Supporting councils to prepare for audits</li>
                  <li class="pl-2">Following up on the implementation of audit recommendations</li>
                  <li class="pl-2">Reporting unresolved audit issues to relevant authorities</li>
                </ul>
              </div>

              <!-- Capacity Building -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">6. Capacity Building in Financial Management</h3>
                <p>NLGFC builds capacity in LAs to strengthen financial management systems through:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Training finance and accounting personnel in PFM Act of 2022 principles</li>
                  <li class="pl-2">Supporting the deployment and use of LAIFMIS (Local Authorities Integrated Financial Management Information System)</li>
                  <li class="pl-2">Providing technical support in areas such as procurement, asset management, and revenue collection</li>
                </ul>
              </div>

              <!-- LGR Improvement -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">7. Support for Locally Generated Revenue (LGR) Improvement</h3>
                <p>NLGFC assists councils in enhancing their own-source revenues by:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Supporting the development and implementation of Local Revenue Enhancement Plans</li>
                  <li class="pl-2">Introducing digital systems for LGR collection</li>
                  <li class="pl-2">Monitoring trends in LGR and offering technical support to improve performance</li>
                </ul>
              </div>

              <!-- Financial Systems -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">8. Financial Systems and Automation</h3>
                <p>NLGFC leads efforts to improve automation and digitalisation of financial systems in local governments by:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">Rolling out LAIFMIS to all district councils</li>
                  <li class="pl-2">Integrating payment and reporting systems</li>
                  <li class="pl-2">Ensuring system interoperability with national PFM systems</li>
                </ul>
              </div>

              <!-- Policy Compliance -->
              <div class="bg-gray-50 p-5 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">9. Policy and Regulatory Compliance</h3>
                <p>NLGFC ensures that LAs comply with national financial laws, policies, and guidelines, including:</p>
                <ul class="list-disc pl-6 space-y-2 mt-3">
                  <li class="pl-2">The Public Finance Management Act (2022)</li>
                  <li class="pl-2">The Decentralisation Policy</li>
                  <li class="pl-2">Government circulars and audit requirements</li>
                </ul>
              </div>
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