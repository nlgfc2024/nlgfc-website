<script setup>
definePageMeta({
  title: 'Our Mandate'
})

const activeTab = ref('mission')

const tabs = [
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
      { id: 'rrf', title: 'Road Rehabilitation Fund (RRF)' },
    ]
  }
]

onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    if (
      tabs.some(tab => tab.id === hash) ||
      tabs.some(tab => tab.children?.some(child => child.id === hash))
    ) {
      activeTab.value = hash
    }
  }
})
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">Our Mandate</h2>
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
              <ul v-if="tab.children" class="ml-4 pl-4 border-l border-gray-300 space-y-1 mt-1">
                <li v-for="sub in tab.children" :key="sub.id">
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
        </nav>
      </div>

      <div class="flex-1 min-w-0 space-y-12">
        <div v-show="activeTab === 'fiscalDecentralization'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Fiscal Decentralization Fund</h2>
          <p>NLGFC is constitutionally mandated to facilitate fiscal decentralisation and is central in managing fiscal transfers to Local Authorities (LAs) in Malawi using the Intergovernmental Fiscal Transfer Formula (IGTF). IGTF is used by the central government to allocate financial resources to Local Government Authorities (LGAs) to support decentralised service delivery. The system is designed to promote equity, transparency, accountability, and efficiency in the allocation and utilisation of public resources.</p><br>
          <h3><strong>Key Features of the IGFT Formula</strong></h3>
          <p><strong>Types of Transfers:</strong></p>
          <ol>
            <li>Sector-specific funds (Health 38% of ORT, 34% Education, 5% Agriculture, Other sectors receive less than 1%).</li>
            <li>General Resource Fund (GRF) for administrative functions (9.6% of ORT).</li>
            <li>Development transfers (DDF, IDF, CDF, Health Rehabilitation, Water Structures funds, city and municipal road funds).</li>
            <li>Performance-based development grants such as the Governance to Enable Service Delivery (GESD) grants.</li>
          </ol>
          <br>
          <p><strong>Formula Components:</strong></p>
          <ol>
            <li>Population size</li>
            <li>Poverty levels</li>
            <li>Geographical size and remoteness</li>
            <li>Performance indicators</li>
          </ol>
        </div>

        <div v-show="activeTab === 'financialManagement'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Financial Management</h2>
  <p>The financial management function of NLGFC spans the entire public financial management (PFM) cycle, from resource mobilisation and allocation to utilisation, reporting, and accountability. The objective is to promote sound fiscal governance, transparency, and efficient service delivery at the local level.</p><br>
  <h3><strong>1. Resource Mobilisation</strong></h3>
  <p>NLGFC is responsible for mobilising financial resources from various sources, including: Government Treasury (through annual budget allocations) and development partners support to the government of Malawi. This ensures that adequate funds are available to support service delivery and development interventions at the local level.</p>
  <br>
  <h3><strong>2. Intergovernmental Fiscal Transfers</strong></h3>
  <p>NLGFC manages the planning, coordination, and disbursement of fiscal transfers from the central government to LAs. This includes:</p>
  <ul>
    <li>Applying the Intergovernmental Fiscal Transfer Formula</li>
    <li>Disbursing various grants (General Resource Fund, Sector Conditional Grants, Performance-Based Grants, etc.)</li>
    <li>Ensuring timely and predictable transfers</li>
    <li>Monitoring equity and performance-based disbursements</li>
  </ul>
  <br>
  <h3><strong>3. Budgeting and Consolidation</strong></h3>
  <p>NLGFC supports Local Authorities in preparing credible and realistic budgets. Functions include:</p>
  <ul>
    <li>Issuing budget guidelines (program-based budgeting) in collaboration with the Ministry of Finance</li>
    <li>Reviewing and consolidating council budgets</li>
    <li>Ensuring alignment of local budgets with national priorities</li>
    <li>Integrating donor and central government funding into local plans</li>
  </ul>
  <br>
  <h3><strong>4. Financial Monitoring and Reporting</strong></h3>
  <p>NLGFC plays an oversight role to monitor the financial performance of LAs to ensure transparency and accountability through:</p>
  <ul>
    <li>Reviewing quarterly financial reports submitted by Local Authorities</li>
    <li>Conducting budget execution analysis</li>
    <li>Operating performance dashboards for real-time monitoring</li>
    <li>Following up on budget variances and underperformance</li>
  </ul>
  <br>
  <h3><strong>5. Audit Oversight and Assurance</strong></h3>
  <p>Although audits are conducted by the National Audit Office (NAO), NLGFC plays a key supervisory and facilitative role by:</p>
  <ul>
    <li>Coordinating audit schedules with NAO</li>
    <li>Supporting councils to prepare for audits</li>
    <li>Following up on the implementation of audit recommendations</li>
    <li>Reporting unresolved audit issues to relevant authorities</li>
  </ul>
  <br>
  <h3><strong>6. Capacity Building in Financial Management</strong></h3>
  <p>NLGFC builds capacity in LAs to strengthen financial management systems through:</p>
  <ul>
    <li>Training finance and accounting personnel in PFM Act of 2022 principles</li>
    <li>Supporting the deployment and use of LAIFMIS (Local Authorities Integrated Financial Management Information System)</li>
    <li>Providing technical support in areas such as procurement, asset management, and revenue collection</li>
  </ul>
  <br>
  <h3><strong>7. Support for Locally Generated Revenue (LGR) Improvement</strong></h3>
  <p>NLGFC assists councils in enhancing their own-source revenues by:</p>
  <ul>
    <li>Supporting the development and implementation of Local Revenue Enhancement Plans</li>
    <li>Introducing digital systems for LGR collection</li>
    <li>Monitoring trends in LGR and offering technical support to improve performance</li>
  </ul>
  <br>
  <h3><strong>8. Financial Systems and Automation</strong></h3>
  <p>NLGFC leads efforts to improve automation and digitalisation of financial systems in local governments by:</p>
  <ul>
    <li>Rolling out LAIFMIS to all district councils</li>
    <li>Integrating payment and reporting systems</li>
    <li>Ensuring system interoperability with national PFM systems</li>
  </ul>
  <br>
  <h3><strong>9. Policy and Regulatory Compliance</strong></h3>
  <p>NLGFC ensures that LAs comply with national financial laws, policies, and guidelines, including:</p>
  <ul>
    <li>The Public Finance Management Act (2022)</li>
    <li>The Decentralisation Policy</li>
    <li>Government circulars and audit requirements</li>
  </ul>
</div>

        <div v-show="activeTab === 'localDevelopmentSupport'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Local Development Support</h2>
          <p>NLGFC provides local development project support to LAs through supervision and monitoring of both GoM and donor-funded projects in local governments. Malawi administers several funding mechanisms to support local development projects. These funds are designed to empower districts and constituencies to address key socio-economic challenges, improve infrastructure, and enhance service delivery at the grassroots level.</p>
        </div>

        <div v-show="activeTab === 'ddf'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">District Development Fund (DDF)</h2>
          <p>District Development Fund supports locally prioritised development projects identified through District Development Plans (DDPs). The purpose of this fund is to enhance service delivery in sectors like education, health, agriculture, and local governance. The fund is allocated directly to District Councils based on approved budgets. Projects are implemented by councils in collaboration with communities.
</p>
        </div>

        <div v-show="activeTab === 'cdf'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Constituency Development Fund (CDF)</h2>
          <p>The purpose of this fund is to finance small-scale community projects at the constituency level. The aim is to improve local infrastructure, livelihoods, and social services. CDF is channelled through Members of Parliament (MPs) in consultation with local structures, and projects are selected by community demand.
</p>
        </div>

        <div v-show="activeTab === 'healthRehabilitation'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Health Rehabilitation Fund</h2>
          <p>Health Rehabilitation Fund is for rehabilitating and upgrading health facilities (clinics, hospitals, staff housing) to improve access to quality healthcare services.
</p>
        </div>

        <div v-show="activeTab === 'idf'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Infrastructure Development Fund (IDF)</h2>
          <p>IDF supports the construction and rehabilitation of critical public infrastructure (schools, markets, government buildings) to enhance economic and social service delivery in urban councils in Malawi.
</p>
        </div>

        <div v-show="activeTab === 'rrf'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Road Rehabilitation Fund (RRF)</h2>
          <p>Rural and urban councils are provided with funds for the maintenance and rehabilitation to improve transport connectivity for trade and mobility. The fund is managed by District Councils with technical support from the Roads Authority.
</p>
        </div>

        <div v-show="activeTab === 'waterStructuresFund'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Water Structures Fund</h2>
          <p>The fund is for the construction and rehabilitation of water supply systems (boreholes, piped schemes, dams) and ensures sustainable access to clean water.
</p>
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


