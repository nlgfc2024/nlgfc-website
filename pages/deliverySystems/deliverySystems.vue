<script setup>
// Page metadata configuration
definePageMeta({ title: 'Delivery Systems' })

const route = useRoute()
const activeTab = ref('msr') // Default tab

const projectGroups = [
  {
    group: 'Delivery Systems',
    items: [
      // Each item represents a different delivery system with unique ID, title and description
{ 
  id: 'comsip', 
  title: 'Community Savings & Investment'
},
{ 
  id: 'dgrm', 
  title: 'Digital Grievance Redress'
},
{ 
  id: 'e-payments', 
  title: 'E-Payment Systems'
},
{ 
  id: 'laifmis', 
  title: 'Local Authorities IFMIS'
},
{  
  id: 'msr', 
  title: 'Malawi Social Registry'
},
{ 
  id: 'lapas', 
  title: 'Performance Assessment System'
},
{ 
  id: 'pmis', 
  title: 'Project Monitoring System'
},
{ 
  id: 'publicworks', 
  title: 'Public Works MIS'
}

    ]
  }
]
const partnerLogos = [
  { src: "/images/deliverySystems/Airtel _money.png", alt: "Airtel Money" },
  { src: "/images/deliverySystems/mpamba_logo.png", alt: "TNM Mpamba Logo" },
  { src: "/images/deliverySystems/fdh_bank.png", alt: "FDH Logo" },
  { src: "/images/deliverySystems/nbs_bank.png", alt: "FBS Bank Logo" },
  { src: "/images/deliverySystems/Standard_bank.png", alt: "Standard Bank" },
  { src: "/images/deliverySystems/kaku_pay.jpeg", alt: "Kaku Pay" }
]

const props = defineProps({
  partnerLogos: {
    type: Array,
    required: true,
    validator: (logos) => logos.every(logo => logo.src && logo.alt)
  },
  scrollDuration: {
    type: Number,
    default: 20
  }
})
// Sample story data for LAIFMIS
const grm= [
  {
    id: 1,
    title: "Transforming Local Government Finance",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Discover how LAIFMIS revolutionized financial management across local authorities, bringing transparency and efficiency to public finance administration."
  }
]

// Sample story data for E-Payments
const ePaymentsStories = [
  {
    id: 1,
    title: "Airtel Money",
    image: "/images/samples/airtel_money.png",
    excerpt: "Airtel Money is actively involved in social programs in Malawi, particularly through its role in distributing social cash transfers and promoting financial inclusion. The company collaborates with various organizations and the government to facilitate digital payments for social welfare programs, ensuring timely and efficient delivery of aid to beneficiaries"
  },
  {
    id: 2,
    title: "TNM Mpamba",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Learn about the digital transformation journey that modernized how local governments track budgets, manage resources, and serve their communities."
  },
  {
    id: 3,
    title: "FDH",
    image: "/images/samples/fdh_bank.png",
    excerpt: "Explore real stories of how improved financial management systems have directly impacted community development and service delivery."
  },
  {
    id: 4,
    title: "NBS Bank",
    image: "/images/samples/nbs_bank.png",
    excerpt: "Explore real stories of how improved financial management systems have directly impacted community development and service delivery."
  },
  {
    id: 5,
    title: "STD Bank",
    image: "/images/samples/Standard_bank.png",
    excerpt: "Explore real stories of how improved financial management systems have directly impacted community development and service delivery."
  },
  {
    id: 6,
    title: "Kakupay",
    image: "/images/samples/kaku_pay.jpeg",
    excerpt: "Explore real stories of how improved financial management systems have directly impacted community development and service delivery."
  }
]

// Update tab based on route hash
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  }
})

const { projectGroups: sharedProjectGroups, /*projectContent: sharedProjectContent */} = useGeneralSidebar();
watchEffect(() => {
  sharedProjectGroups.value = projectGroups;
  //sharedProjectContent.value = projectContent;
});

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

//provide('projectContent', projectContent);
</script>

<template>
  <div class="bg-white">
    <!-- Responsive container with sidebar and main content layout -->
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      
      <!-- Sidebar Navigation -->
      <!-- Delivery Systems section styled like opportunities page -->
      <aside class="w-full md:w-80">
        <div v-for="group in projectGroups" :key="group.group">
          <!-- Single Card Container for all Delivery Systems -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <!-- Main heading inside container -->
            <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ group.group }}</h2>
            <div class="space-y-1">
              <div v-for="(item, index) in group.items" :key="item.id">
                <!-- Individual delivery system link -->
                <a
                  :href="`#${item.id}`"
                  @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                  :class="[
                    'block p-4 rounded-lg cursor-pointer transition-all duration-200',
                    // Conditional styling based on active state - green for active
                    item.id === activeTab 
                      ? 'bg-green-50 text-green-800' 
                      : 'hover:bg-gray-50'
                  ]"
                >
                  <div class="flex items-start">
                    <!-- System icon -->
                    <div class="flex-shrink-0 mr-3 mt-0.5">
                      <Icon 
                        :name="item.id === activeTab ? 'heroicons:check-circle' : 'heroicons:document-text'" 
                        :class="[
                          'w-5 h-5',
                          item.id === activeTab ? 'text-green-600' : 'text-gray-400'
                        ]" 
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <!-- System title -->
                      <h3 :class="[
                        'font-medium text-sm mb-1',
                        item.id === activeTab ? 'text-green-900' : 'text-gray-900'
                      ]">
                        {{ item.title }}
                      </h3>
                      <!-- System description -->
                      <p :class="[
                        'text-xs leading-relaxed',
                        item.id === activeTab ? 'text-green-700' : 'text-gray-600'
                      ]">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </a>
                
                <!-- Breaking line between items (except last item) -->
                <hr v-if="index < group.items.length - 1" class="my-3 border-gray-200">
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <div v-for="group in projectGroups" :key="group.group">
          <div v-for="item in group.items" :key="item.id" v-show="activeTab === item.id" class="prose max-w-none">
            
  
<!-- MSR Section -->
<div v-if="item.id === 'msr'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Malawi Social Registry (MSR)
  </h2>
  

  <!-- Introduction -->
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
    <p class="text-gray-700 leading-relaxed">
      The Malawi Social Registry (MSR) is a national platform established by the Government 
      of Malawi in 2016 through the Department of Economic Planning and Development (EP&D). It collects, stores, 
      accesses, and shares socioeconomic and demographic data about households across the country to support 
      the implementation of social support programs and ensure assistance reaches those who need it most.
    <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>

    </p>
    
  </div>
  
<!-- MSR Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">MSR Dashboard</h3>
    <div class="bg-white rounded border border-gray-300 overflow-hidden">
      <iframe
        src="https://dashboards.malawiubr.org/public/dashboard/0929d069-914b-4d88-9017-1a8b46cdc28f"
        frameborder="0"
        width="100%"
        height="600"
        allowtransparency
        class="w-full"
      ></iframe>
    </div>
  </div>

  <!-- Key Features Section -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Household Data Collection -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm16 3l-3.5 2-3.5-2"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Household Data Collection</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive household profiling and registration
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Socioeconomic status assessment and documentation
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Demographic information capture and analysis
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Regular data updates and verification processes
          </li>
        </ul>
      </div>

      <!-- Data Management and Storage -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Data Management and Storage</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Secure centralized data storage infrastructure
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data quality assurance and validation protocols
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Privacy protection and data security measures
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data backup and recovery systems
          </li>
        </ul>
      </div>

      <!-- Beneficiary Targeting and Identification -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Beneficiary Targeting and Identification</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Vulnerability assessment and scoring systems
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Eligibility criteria matching and verification
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Accurate beneficiary selection algorithms
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Anti-fraud and duplicate detection mechanisms
          </li>
        </ul>
      </div>

      <!-- Program Integration and Support -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 004 0V4z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Program Integration and Support</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Multi-program data sharing and coordination
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Social protection program support integration
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Cash transfer and food assistance program linking
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Inter-agency collaboration and data exchange
          </li>
        </ul>
      </div>

      <!-- Analytics and Reporting -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Analytics and Reporting</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive statistical analysis and insights
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Interactive dashboards and visualization tools
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Custom reporting and data export capabilities
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Policy-relevant research and analysis support
          </li>
        </ul>
      </div>

      <!-- Geographic Coverage and Mapping -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Geographic Coverage and Mapping</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            National coverage across all districts and regions
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Geographic information system (GIS) integration
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Spatial analysis and poverty mapping capabilities
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Location-based targeting and resource allocation
          </li>
        </ul>
      </div>

      <!-- Data Sharing and Interoperability -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Data Sharing and Interoperability</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Secure API access for authorized stakeholders
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Cross-platform integration and data exchange
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Standardized data formats and protocols
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Real-time data synchronization capabilities
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>

           <!-- LAIFMIS -->
<div v-else-if="item.id === 'laifmis'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Integrated Financial Management Information System (IFMIS)
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
Government of Malawi procured an Integrated Financial Management Information System (IFMIS) in 2008. 
IFMIS is an Enterprise Resource Planning (ERP) tool ‘dubbed Serenic Navigator’, to be used in the Councils 
for Financial Management and Reporting under the policy guidance of the Accountant General (AG). IFMIS was 
implemented in phases, starting with five local authorities in M’mbelwa, Mchinji, Lilongwe District, Blantyre City, 
and Thyolo in the first phase. Being the first IFMIS implementation in Malawi, the aim of delivering a pilot was to 
ensure that people learn from the process and improve as the implementation goes to other Local Authorities. Use of 
IFMIS for Financial Management and Reporting was emphasized to ensure that all Local Authorities have a standardized
 Financial Management System that would help Local Authorities produce standardized reports for onward transmission 
 to the central Government and other relevant stakeholders. By the close of 2013 calendar year, all Local Authorities
  had IFMIS installed and all relevant personnel trained in its usage. Now IFMIS is being used in all the 35 LAs in Malawi
  <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>
  
<!-- Key Features Section -->
<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features of Digital GRM</h3>
  
  <!-- Features Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Multi-Channel Access -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Multi-Channel Access</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Toll-Free Line (3056) available on Airtel and TNM
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Android App for mobile accessibility
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Web App for online access
        </li>
      </ul>
    </div>

    <!-- User-Friendly Reporting -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">User-Friendly Reporting</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Users can <strong>ask questions</strong>, <strong>report problems</strong>, and <strong>submit feedback</strong> easily
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Interface designed for <strong>community interaction</strong> and <strong>ease of use</strong>
        </li>
      </ul>
    </div>

    <!-- Real-Time Notifications -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.829 2.829A4 4 0 017 10h1a3 3 0 003 3h5a3 3 0 003-3h1a4 4 0 01-.172.172L18 10H4.828z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Real-Time Notifications</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <strong>SMS confirmations and updates</strong> on grievance status sent to users
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Ensures transparency and trust in the system
        </li>
      </ul>
    </div>

    <!-- Centralized Grievance Management -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Centralized Grievance Management</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          All grievances received go into a <strong>central inbox</strong>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Authorities can <strong>track</strong>, <strong>manage</strong>, and <strong>respond</strong> to issues promptly
        </li>
      </ul>
    </div>

    <!-- Government Backend Integration -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Government Backend Integration</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Enables <strong>monitoring and accountability</strong>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Promotes <strong>timely response</strong> and <strong>transparency</strong> in grievance handling
        </li>
      </ul>
    </div>

    <!-- Empowerment & Inclusion -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Empowerment & Inclusion</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Empowers citizens by ensuring concerns are <strong>heard and acted upon</strong>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Encourages <strong>active community participation</strong> in development projects
        </li>
      </ul>
    </div>

    <!-- Accessibility -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Accessibility</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <strong>Free calls</strong> to report grievances
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Designed to be accessible to both urban and rural populations
        </li>
      </ul>
    </div>

  </div>
</div>
  
</div>

            
            
            <!-- Electronic Payment Systems -->
<div v-else-if="item.id === 'e-payments'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Electronic Payment Systems
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
      Electronic Payment Systems provide secure, efficient,
      and convenient digital payment solutions for citizens and businesses.
      These systems enable seamless transactions
      and provide social protection beneficiaries with convenient access to social benefits anytime, anywhere.
      <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>

  <!-- Key Features Section -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Multiple Payment Channels -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Multiple Payment Channels</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Mobile money integration (Airtel Money, TNM Mpamba)
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Bank transfers and direct deposits
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Online payment gateways and digital wallets
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Agent banking and cash-out services
          </li>
        </ul>
      </div>

      <!-- Secure Transactions -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Secure Transactions</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            End-to-end encryption for all transactions
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Advanced fraud detection and prevention
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Multi-factor authentication and biometric verification
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            PCI DSS compliance and security standards
          </li>
        </ul>
      </div>

      <!-- Real-time Processing -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Real-time Processing</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Instant payment confirmation and receipts
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Real-time balance updates and notifications
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            24/7 system availability and uptime monitoring
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Automated reconciliation and settlement
          </li>
        </ul>
      </div>

      <!-- Comprehensive Reporting -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Comprehensive Reporting</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Detailed transaction history and analytics
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Financial dashboards and performance metrics
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Customizable reports and data exports
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Audit trails and compliance reporting
          </li>
        </ul>
      </div>

      <!-- Social Protection Integration -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Social Protection Integration</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Direct benefit transfers to beneficiaries
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Conditional cash transfer program support
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Emergency relief payment distribution
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Beneficiary verification and eligibility checks
          </li>
        </ul>
      </div> 
    </div>
  </div>
  <!-- E-Payment Service Providers Section -->
  <div class="mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6 text-center">E-Payment Service Providers</h3>
    
    <!-- Slider Container -->
    <div class="relative overflow-hidden bg-white rounded-lg shadow-sm" aria-label="Partner logos carousel">
      <!-- Gradient Overlays -->
      <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <!-- Slider Track -->
      <div class="overflow-hidden py-6 px-4">
        <div 
          class="flex gap-6 animate-scroll hover:pause"
          :style="`--scroll-duration: ${scrollDuration}s`"
        >
          <!-- Two copies for seamless scrolling -->
          <template v-for="repeat in 2" :key="repeat">
            <div 
              v-for="(logo, index) in partnerLogos"
              :key="`${repeat}-${index}`"
              class="flex-shrink-0"
            >
              <div class="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center h-24 w-40 sm:h-32 sm:w-48 transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                <img
                  :src="logo.src"
                  :alt="logo.alt"
                  loading="lazy"
                  decoding="async"
                  width="192"
                  height="128"
                  class="max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity drop-shadow-md"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</div>


            <!-- Public Works MIS -->
           <div v-else-if="item.id === 'publicworks'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Public Works MIS
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
      The Public Works Management Information System (MIS) is a digital platform designed to support the planning, 
      implementation, monitoring, and evaluation of public works programs. These programs, often part of social 
      protection or climate-resilience initiatives, provide temporary employment to vulnerable and low-income populations 
      through community-based infrastructure and environmental projects.

The MIS ensures efficient coordination and management of activities by digitally tracking work logs,
 workforce participation, material usage, and payments. It enables real-time data collection and
  reporting, promotes transparency, reduces administrative errors, and enhances accountability 
  across all levels—from national program administrators to district and community implementers.

By integrating payment systems, grievance redress mechanisms, and performance monitoring tools, 
the Public Works MIS plays a vital role in ensuring that resources are properly utilized and that 
beneficiaries receive timely and accurate compensation for their labor.
<a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>

<!-- Public Works Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">Public Works Dashboard</h3>
    <div class="bg-white rounded border border-gray-300 overflow-hidden">
      <iframe
        src="/images/deliverySystems/MthandiziDashboard.png"
        frameborder="0"
        width="100%"
        height="600"
        allowtransparency
        class="w-full"
      ></iframe>
    </div>
  </div>

 <!-- Key Feature Section -->
<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features of Public Works MIS</h3>
  
  <!-- Components Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Digital Tracking and Monitoring -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Digital Tracking and Monitoring</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Tracks work logs in real-time for comprehensive project oversight
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Monitors participation levels and workforce engagement
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Records material usage and resource allocation efficiently
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Provides real-time payment tracking and disbursement monitoring
        </li>
      </ul>
    </div>
    
    <!-- Integrated Payment and Grievance Systems -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Integrated Payment and Grievance Systems</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Supports seamless payment processing for beneficiaries
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Enables grievance redress through integrated channels
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Provides performance monitoring within unified platform
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Streamlines administrative processes and reduces manual workload
        </li>
      </ul>
    </div>
  

    <!-- Enhanced Transparency and Accountability -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Enhanced Transparency and Accountability</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Minimizes administrative errors through automated processes
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Promotes resource efficiency and optimal allocation
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Ensures timely compensation for all beneficiaries
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Maintains complete audit trail for all transactions and activities
        </li>
      </ul>
    </div>
  </div>
</div>


</div>

          
           <!-- DGRM Section -->
<div v-else-if="item.id === 'dgrm'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Digital Grievance Redress Mechanism (Digital GRM)
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
      Digital Grievance Redress Mechanism (Digital GRM) is a technology-enabled platform designed to enhance citizen engagement, 
      accountability, and transparency in project implementation. It allows community members to report issues, ask questions, 
      and provide feedback on development projects through multiple user-friendly channels.
      <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>
  
  <!-- DGRM PICTURE-->
  <div class="mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6 text-center">Digital GRM</h3>
    <div class="flex justify-center">
      <div class="w-full max-w-2xl h-80 overflow-hidden rounded-lg shadow-lg border border-gray-200">
        <img 
          src="/images/deliverySystems/Digital_GRM.png" 
          alt="Digital_GRM" 
          class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </div>
  
  <!-- Key Feature Section -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
    
    <!-- Components Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Toll-Free Line -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Toll-Free Line (3056)</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Accessible via Airtel and TNM
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Community members can call free of charge
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Speak to an operator to ask questions, report problems, or provide feedback
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            SMS confirmation and updates on grievance status are sent to users
          </li>
        </ul>
      </div>
      
      <!-- Android App -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Android App</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Provides project information
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Enables users to submit feedback and report grievances directly
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Offers a simple interface for community interaction
          </li>
        </ul>
      </div>
      
      <!-- Web App -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Web App</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Facilitates access to project details and feedback submission
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Enables free calls via Airtel to the grievance line
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Supports real-time reporting and tracking of grievances
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            SMS notifications for confirmation and status updates
          </li>
        </ul>
      </div>
      
      <!-- Government Backend -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Government Backend</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Grievances are received in a centralized inbox
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Authorities can track, manage, and respond to grievances promptly
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Enhances accountability and responsiveness
          </li>
        </ul>
      </div>
      
    </div>
  </div>
  
</div>

            <!-- SCTP MIS Section -->
<div v-else-if="item.id === 'sctpmis'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Social Cash Transfer Program
  </h2>

 
  <!-- Introduction -->
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
    <p class="text-gray-700 leading-relaxed">
      The Social Cash Transfer Programme (SCTP) system—sometimes referred to as Mtukula Pakhomo in Malawi—is a government-led social protection initiative designed to provide regular cash payments to ultra-poor and labor-constrained households. The program targets vulnerable groups such as the elderly, people with disabilities, child-headed households, and chronically ill individuals.
    </p>
  </div>
  
<!-- SCTP Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">SCTP Dashboard</h3>
    <div class="bg-white rounded border border-gray-300 overflow-hidden">
      <iframe
        src="http://lapa.nlgfc.gov.mw/data"
        frameborder="0"
        width="100%"
        height="600"
        allowtransparency
        class="w-full"
      ></iframe>
    </div>
  </div>

  <!-- Key Features Section -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Eligibility Targeting -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Eligibility Targeting</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive household assessment and profiling
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Vulnerability criteria evaluation and scoring
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Community-based targeting and verification
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Regular eligibility reviews and updates
          </li>
        </ul>
      </div>

      <!-- Payment Management -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Payment Management</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Automated payment calculation and scheduling
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Multiple payment delivery channels integration
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Payment reconciliation and tracking systems
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Beneficiary payment history and records
          </li>
        </ul>
      </div>

      <!-- Case and Grievance Management -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Case and Grievance Management</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive complaint registration and tracking
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Case escalation and resolution workflows
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Multi-channel grievance submission options
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Response time monitoring and quality assurance
          </li>
        </ul>
      </div>

      <!-- Monitoring and Evaluation (M&E) -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Monitoring and Evaluation (M&E)</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Program performance indicators tracking
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Impact assessment and outcome measurement
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data collection and analysis tools
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Regular evaluation reports and insights
          </li>
        </ul>
      </div>

      <!-- Audit and Security Controls -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Audit and Security Controls</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive audit trails and logging
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Role-based access control and permissions
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data encryption and privacy protection
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Fraud detection and prevention mechanisms
          </li>
        </ul>
      </div>      

<!-- Real-time Data Entry and Monitoring -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Real-time Data Entry and Monitoring</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Mobile data collection and field updates
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Live dashboard updates and notifications
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data validation and quality control checks
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Offline capability with automatic synchronization
          </li>
        </ul>
      </div>

      <!-- Beneficiary Management -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Beneficiary Management</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive beneficiary registration and profiling
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Household composition tracking and updates
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Graduation and exit pathway management
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Biometric identification and verification systems
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>


<!-- LAPAS Section -->
<div v-else-if="item.id === 'lapas'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Local Authority Performance Assessment System
  </h2>

  <!-- Introduction -->
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
    <p class="text-gray-700 leading-relaxed">
      LAPAS is a web-based data collection tool designed to enable the NLGFC to assess the performance of Local Authorities.
      It assists the Malawi Government in enhancing accountability, transparency, and data-driven decision-making through real-time data entry of assessment results, storing and making compliance assessments public, ensuring transparency of Local Authority performance feedback since results are accessible online, and providing basic analysis for writing synthesis reports.
      <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>
  
  <!-- LAPAS Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">LAPAS Dashboard</h3>
    <div class="bg-white rounded border border-gray-300 overflow-hidden">
      <iframe
        src="http://lapa.nlgfc.gov.mw/data"
        frameborder="0"
        width="100%"
        height="600"
        allowtransparency
        class="w-full"
      ></iframe>
    </div>
  </div>

<!-- Key Features Section -->
<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
  
  <!-- Features Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Real-time Data Entry -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Real-time Data Entry of Assessment Results</h4>
        </div>
      </div>
      <p class="text-sm text-gray-600">
        Instant capture and processing of assessment results as they are completed, ensuring immediate availability of performance data for monitoring and decision-making purposes.
      </p>
    </div>

    <!-- Storing and Making Compliance Assessments Public -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Storing and Making Compliance Assessments Public</h4>
        </div>
      </div>
      <p class="text-sm text-gray-600">
        Secure storage of all compliance assessment data with public accessibility features, ensuring transparency and accountability in local authority performance evaluation.
      </p>
    </div>

    <!-- Transparency of LA Performance Feedback -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Transparency of LA Performance Feedback</h4>
        </div>
      </div>
      <p class="text-sm text-gray-600">
        Online accessibility of Local Authority performance results and feedback, promoting transparency and enabling public oversight of government service delivery standards.
      </p>
    </div>

    <!-- Basic Analysis for Writing Synthesis Reports -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Basic Analysis for Writing Synthesis Report(s)</h4>
        </div>
      </div>
      <p class="text-sm text-gray-600">
        Analytical tools and data processing capabilities to support the creation of comprehensive synthesis reports that summarize performance trends and provide insights for policy development.
      </p>
    </div>

  </div>
</div>

</div>

           <!-- COMSIP -->
<div v-else-if="item.id === 'comsip'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Community Savings and Investment Promotion MIS
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
The COMSIP MIS (Management Information System) is a digital platform that supports COMSIP's operations by 
enabling efficient coordination, monitoring, and reporting across its cooperative and social protection 
initiatives.
<a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>
  
<!-- Key Features Section -->
<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features of COMSIP MIS</h3>
  
  <!-- Features Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Beneficiary and Group Management -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Beneficiary and Group Management</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Registers and manages data for savings and loan groups
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Tracks individual and group participation in COMSIP-related activities
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Monitors savings, loans, and training participation
        </li>
      </ul>
    </div>

    <!-- SMS-Based Data Reporting -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">SMS-Based Data Reporting</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Allows group members and officers to submit activity reports via SMS
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Facilitates fast, low-cost data collection from remote areas
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Enables real-time communication with field operations
        </li>
      </ul>
    </div>

    <!-- Monitoring and Evaluation (M&E) -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Monitoring and Evaluation (M&E)</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Tracks performance indicators such as training attendance and grants usage
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Monitors livelihoods progress and development outcomes
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Provides real-time visibility into program impact at district and national levels
        </li>
      </ul>
    </div>

    <!-- Integration with Financial Services -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Integration with Financial Services</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Links with service providers to monitor disbursements (loans, grants, microinsurance)
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Supports coordination of productive inputs like seeds and tools
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Tracks outcomes and impact of financial interventions
        </li>
      </ul>
    </div>

    <!-- Transparency and Accountability -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 text-lg">Transparency and Accountability</h4>
        </div>
      </div>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Enhances data accuracy and reduces manual errors
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Ensures timely reporting and comprehensive documentation
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Supports informed decision-making through centralized data access
        </li>
      </ul>
    </div>

  </div>
</div>
  
</div>

<!-- PMIS Section -->
<div v-else-if="item.id === 'pmis'" class="prose max-w-none">
  <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Project Monitoring Information System (PMIS)
  </h2>
  
  <!-- Introduction -->
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
    <p class="text-gray-700 leading-relaxed">
      The Project Monitoring Information System (PMIS) is a digital platform designed to support
      the tracking, coordination, and management of development projects, especially those implemented
      by government ministries, local authorities, and development partners in Malawi.
      <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>

  

  <!-- PMIS Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">PMIS Dashboard</h3>
    <div class="bg-white rounded border border-gray-300 overflow-hidden">
      <iframe
        src="https://projects.nlgfc.gov.mw"
        frameborder="0"
        width="100%"
        height="600"
        allowtransparency
        class="w-full"
      ></iframe>
    </div>
  </div>

    <!-- Key Features Section -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Project Registration and Setup -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Project Registration and Setup</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive project profile creation and documentation
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Stakeholder identification and role assignment
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Project categorization and classification systems
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Initial baseline data capture and setup
          </li>
        </ul>
      </div>

      <!-- Audit Trail and Data Integrity -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Audit Trail and Data Integrity</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Complete activity logging and change tracking
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            User action history and accountability measures
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data validation and quality assurance protocols
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Version control and document management
          </li>
        </ul>
      </div>

      <!-- Activity and Output Tracking -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Activity and Output Tracking</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Real-time activity progress monitoring and updates
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Deliverable and milestone tracking systems
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Output measurement and verification tools
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Timeline management and schedule optimization
          </li>
        </ul>
      </div>

      <!-- Performance Indicators Monitoring -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Performance Indicators Monitoring</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Key Performance Indicator (KPI) definition and tracking
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Results framework implementation and monitoring
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Impact assessment and outcome measurement
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Performance dashboards and visualization tools
          </li>
        </ul>
      </div>

      <!-- Budget and Expenditure Management -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Budget and Expenditure Management</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comprehensive budget planning and allocation tools
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Real-time expenditure tracking and monitoring
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Financial variance analysis and reporting
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Cost-effectiveness analysis and optimization
          </li>
        </ul>
      </div>      



<!-- Reporting and Analytics -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Reporting and Analytics</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Automated report generation and distribution
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Interactive dashboards and data visualization
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Custom report templates and formats
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Data export capabilities and API access
          </li>
        </ul>
      </div>

      <!-- Collaboration and Communication -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div class="flex items-start mb-4">
          <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 text-lg">Collaboration and Communication</h4>
          </div>
        </div>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Multi-stakeholder collaboration platforms
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Notification systems and alert mechanisms
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Document sharing and version control
          </li>
          <li class="flex items-start">
            <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Comment threads and feedback systems
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll var(--scroll-duration, 20s) linear infinite;
  display: flex;
  min-width: fit-content; /* Better for dynamic content */
  will-change: transform; /* Optimize for animation */
}

.hover\:pause:hover,
.animate-scroll:focus-within,
.animate-scroll:active {
  animation-play-state: paused;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
    justify-content: center;
    min-width: auto;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }
  
  .animate-scroll::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
}


</style>