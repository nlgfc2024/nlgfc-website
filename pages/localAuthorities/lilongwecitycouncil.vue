<script setup>
definePageMeta({
  title: 'Lilongwe District Council'
})

const activeTab = ref('profile') // Default active tab

const tabs = [
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' }
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

const projects = [
  {
    name: 'GESD',
    fullName: 'Governance to Enable Service Delivery',
    description: 'Governance to Enable Service Delivery (GESD) project development objective is “to strengthen Local Authorities’ institutional performance, responsiveness to citizens and management of resources for service delivery.”',
    objectives: [
      'Strengthened institutional performance tracking of improvements in Local Authorities (LAs) institutional performance for service delivery',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans',
      'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans (AIPs',
     
    ],
    status: 'Active'
  },
  {
    name: 'SSRLP',
    fullName: 'Social Support and Resilience Livelihoods Program',
    description: 'A program designed to build community resilience and provide social support to vulnerable populations in Lilongwe District.',
    objectives: [
      'Improve household food security and nutrition',
      'Build community resilience to shocks and stresses',
      'Strengthen local governance structures',
      'Enhance access to social services'
    ],
    status: 'Active'
  },
  {
    name: 'MASAF',
    fullName: 'Malawi Social Action Fund',
    description: 'A community-driven development program that supports infrastructure development and capacity building initiatives.',
    objectives: [
      'Improve rural infrastructure and connectivity',
      'Enhance access to basic social services',
      'Build local capacity for project management',
      'Promote community participation in development'
    ],
    status: 'Not Active'
  }
]

const reports = [
  {
    title: 'Annual Performance Report 2024',
    type: 'Annual Report',
    date: '2024-12-15',
    description: 'Comprehensive overview of council activities and achievements for the fiscal year 2024.'
  },
  {
    title: 'District Development Plan 2023-2027',
    type: 'Strategic Plan',
    date: '2023-01-20',
    description: 'Five-year strategic development plan outlining priority areas and implementation strategies.'
  },
  {
    title: 'Revenue Collection Report Q4 2024',
    type: 'Financial Report',
    date: '2024-10-30',
    description: 'Quarterly report on revenue collection and financial performance.'
  },
  {
    title: 'Infrastructure Development Progress Report',
    type: 'Progress Report',
    date: '2024-11-15',
    description: 'Status update on ongoing infrastructure projects across the district.'
  }
]

const news = [
  {
    title: 'Lilongwe District Council Launches New Water Project',
    date: '2024-12-10',
    summary: 'The council has initiated a new water infrastructure project to improve access to clean water in rural areas.',
    category: 'Development'
  },
  {
    title: 'Community Participation in Governance Workshop',
    date: '2024-12-05',
    summary: 'A three-day workshop was conducted to enhance community participation in local governance and decision-making processes.',
    category: 'Governance'
  },
  {
    title: 'Agricultural Extension Services Expanded',
    date: '2024-11-28',
    summary: 'The district has expanded its agricultural extension services to reach more farmers in remote areas.',
    category: 'Agriculture'
  },
  {
    title: 'Youth Skills Development Program Graduation',
    date: '2024-11-20',
    summary: 'Over 200 youth graduated from various skills development programs including carpentry, tailoring, and entrepreneurship.',
    category: 'Youth'
  }
]
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
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
        <!-- Council Profile Content -->
        <div v-show="activeTab === 'profile'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Lilongwe District Council Profile</h2>
          <div class="space-y-6">
            <div class="bg-blue-50 p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">About Lilongwe District Council</h3>
              <p class="text-gray-700 leading-relaxed">
                Lilongwe District is the largest district in the Central Region of Malawi. It is bordered by Dedza District to the East, Salima to the North East. Mchinji District marks the western boundary. Dowa District lies to the north of Lilongwe with Kasungu to its North-western tip and the Republic of Mozambique to the South West. The total land area is 6,159 square kilometres, representing 6.5 % of Malawi’s total land area. Lilongwe District hosts the capital city of Malawi, which owes its name to the river that flows across the centre of the district.
                   Development activities of the district are being championed by the District Council which according to the 1998 Local Government Act, is the highest policy-making body responsible for promoting infrastructural and economic development in the district. It comprises elected members (Ward Councillors), with Members of Parliament (MPs), the Chiefs and members of interest groups as ex-officio members. The Council is mandated to undertake, amongst others things: 

              </p>
            </div>
         

            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Mandate</h3>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Policy making, coordination and supervision of development programs/projects in the district.</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Reviewing, approving or rejecting proposed projects identified by the community with assistance from the District Executive Committee (DEC)</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Making resolutions regarding implementation of management functions of the Secretariat</span>
                </li>
              </ul>
            </div>
                  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                              <h3 class="text-lg font-semibold text-gray-900 mb-3">Vision</h3>
                             <p class="text-gray-700 leading-relaxed font-medium">The vision of the district is “A self- reliant district with growing socio-economic development”.</p>
                  </div>
                  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                              <h3 class="text-lg font-semibold text-gray-900 mb-3">Core values</h3>
                             <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Transparency and accountability: council shall discharge its duties in an open and reliable manner.</span>
                </li>
                  <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Integrity: the council shall act with honesty and without compromising the truth.</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Client focused: the client shall be served in an efficient and effective manner.</span>
                </li>
                 <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Collaboration: council shall enhance interaction with all relevant stakeholders.</span>
                </li>
                 <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Open communication: the council shall enhance inter and intra communication.</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Responsiveness: council shall provide services that are demand driven without discrimination.</span>
                </li>
                
                
              </ul>
                  </div>
          

            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Functions</h3>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Local governance and administration</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Development planning and implementation</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Service delivery and infrastructure development</span>
                </li>
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <span>Revenue collection and financial management</span>
                </li>
              </ul>
            </div>
            

               
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">Establishment</h4>
                <p class="text-gray-700">Established under the Local Government Act as a decentralized local authority</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">Jurisdiction</h4>
                <p class="text-gray-700">Covers 1,785 square kilometres in the Southern Region of Malawi</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">Population</h4>
                <p class="text-gray-700">Serves diverse communities across urban, peri-urban, and rural areas</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">Structure</h4>
                <p class="text-gray-700">Comprised of elected councillors and appointed technical staff</p>
              </div>
            </div>
          </div>
        </div>





    


        <!-- Projects Content -->
        <div v-show="activeTab === 'projects'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Development Projects</h2>
          <div class="space-y-8">
            <div v-for="project in projects" :key="project.name" class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{ project.name }}</h3>
                  <p class="text-gray-600 font-medium">{{ project.fullName }}</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {{ project.status }}
                </span>
              </div>
              <p class="text-gray-700 mb-4">{{ project.description }}</p>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Key Objectives:</h4>
                <ul class="space-y-1">
                  <li v-for="objective in project.objectives" :key="objective" class="flex items-start">
                    <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span class="text-gray-700">{{ objective }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Reports Content -->
        <div v-show="activeTab === 'reports'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Reports & Documents</h2>
          <div class="space-y-4">
            <div v-for="report in reports" :key="report.title" class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ report.title }}</h3>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  {{ report.type }}
                </span>
              </div>
              <p class="text-gray-600 mb-2">{{ report.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Published: {{ new Date(report.date).toLocaleDateString() }}</span>
                <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- News Content -->
        <div v-show="activeTab === 'news'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Latest News & Updates</h2>
          <div class="space-y-6">
            <article v-for="article in news" :key="article.title" class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <div class="flex justify-between items-start mb-3">
                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                  {{ article.category }}
                </span>
                <time class="text-sm text-gray-500">{{ new Date(article.date).toLocaleDateString() }}</time>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ article.title }}</h3>
              <p class="text-gray-700 leading-relaxed">{{ article.summary }}</p>
              <div class="mt-4">
                <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Read more →
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>