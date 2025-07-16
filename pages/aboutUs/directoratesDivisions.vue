<script setup>
definePageMeta({
  title: 'Directorates and Divisions'
})

const activeTab = ref('finance') // Default active tab

const tabs = [
  { id: 'finance', title: 'Finance & Fiscal Decentralization' },
  { id: 'corporate', title: 'Corporate & Strategic Services' },
  { id: 'social', title: 'Social & Economic Development' },
  { id: 'planning', title: 'Planning, M&E' },
  { id: 'procurement', title: 'Procurement' },
  { id: 'audit', title: 'Internal Audit' }
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
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">Organizational Structure</h2>
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
        <!-- Finance Directorate -->
        <div v-show="activeTab === 'finance'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Directorate of Finance and Fiscal Decentralization
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Functions</h3>
              <ul class="space-y-3 list-disc pl-5">
                <li>Managing and accounting for local authorities (LAs) financial resources</li>
                <li>Monitoring and regulating finance utilization</li>
                <li>Promoting effective LAs budgeting and fiscal decentralization</li>
                <li>Disbursing and accounting for LA financial resources</li>
                <li>Monitoring LGA financial regulations, procedures, systems and controls</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Divisions</h3>
              
              <div class="space-y-6">
                <!-- Accounts Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Accounts and Disbursement Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Manages LGA budget coordination, financial disbursement, and accounting.</p>
                  </div>
                </div>
                
                <!-- Budgeting Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Budgeting and Fiscal Decentralization Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Oversees LGA budgeting and promotes fiscal decentralization.</p>
                  </div>
                </div>
                
                <!-- Financial Regulation Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Financial Regulation, Compliance and Reporting Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Ensures compliance with financial standards, supports audits, and consolidates LGA reports.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Corporate Services Directorate -->
        <div v-show="activeTab === 'corporate'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Directorate of Corporate and Strategic Services
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>Responsible for providing corporate services and strategic institutional support.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Divisions & Sections</h3>
              
              <div class="space-y-6">
                <!-- HR Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Human Resource and Administrative Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Handles HR functions like recruitment, payroll, records, and office administration.</p>
                  </div>
                </div>
                
                <!-- ICT Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">ICT Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Manages IT infrastructure, Malawi Social Registry database, and supports digital systems like Nthandizi-MIS and LGA-IFMIS.</p>
                  </div>
                </div>
                
                <!-- Knowledge Management -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Knowledge Management and Communication Section</h4>
                  </div>
                  <div class="p-6">
                    <p>Manages communication, public relations, documentation, and knowledge systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social & Economic Development -->
        <div v-show="activeTab === 'social'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Directorate of Social and Economic Development Services
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>Supports local economic development and social transformation interventions in LAs in Malawi.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Divisions</h3>
              
              <div class="space-y-6">
                <!-- Infrastructure Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Infrastructure and Community Development Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Monitors and supports infrastructure, enterprise, and community-driven development programs.</p>
                  </div>
                </div>
                
                <!-- Capacity Development -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Capacity Development and Environment Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Oversees capacity development in LGAs and manages environmental and social safeguards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Planning, M&E -->
        <div v-show="activeTab === 'planning'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Planning, Monitoring and Evaluation Division
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>Provides technical support for strategic planning, monitoring, and evaluation.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
              
              <ul class="space-y-3 list-disc pl-5">
                <li>Institutional planning</li>
                <li>Policy review</li>
                <li>Data management</li>
                <li>Research</li>
                <li>Monitoring & Evaluation</li>
                <li>Performance reporting</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Procurement -->
        <div v-show="activeTab === 'procurement'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Procurement and Assets Disposal Division
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>Responsible for the procurement and disposal of assets.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Functions</h3>
              
              <ul class="space-y-3 list-disc pl-5">
                <li>Managing procurement of goods, works, and services</li>
                <li>Asset disposal</li>
                <li>Procurement contract management</li>
                <li>Providing support to LAs</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Internal Audit -->
        <div v-show="activeTab === 'audit'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Internal Audit and Risk Division
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>Provides internal audit and risk management services.</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
              
              <ul class="space-y-3 list-disc pl-5">
                <li>Conducting audits</li>
                <li>Risk management</li>
                <li>Internal controls assessment</li>
                <li>Compliance monitoring</li>
              </ul>
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