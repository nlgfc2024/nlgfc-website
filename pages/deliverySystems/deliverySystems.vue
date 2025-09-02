<script setup>
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'

// Page metadata configuration
definePageMeta({ title: 'Delivery Systems' })

const { data: pages, pending, error: PageError } = usePageBlocks([
  'msr-header', 'msr-dashboard', 'msr-key-features','laifmis-header','laifmis-key-features',
  'e-payment-header','e-payment-key-features','cs-epwp-header','cs-epwp-dashboard',
  'cs-epwp-key-features','dgrm-header','dgrm-picture','dgrm-key-features','lapas-header','lapas-dashboard',
  'lapas-key-features','comsip-header','comsip-key-features','pmis-header','pmis-dashboard','pmis-key-features'
])

const route = useRoute()
const activeTab = ref('msr') // Default tab

// Configuration for delivery system categories and items
// This array defines the sidebar navigation structure with descriptions
// Delivery systems data for the GeneralSidebar component
const deliverySystemsData = [
  
// Each delivery system item contains an id, title, and description
 { 
    id: 'comsip', 
    title: 'Community Savings and Investment Promotion',
},
{ 
    id: 'dgrm', 
    title: 'Digital Grievance Redress',
},
{ 
    id: 'e-payments', 
    title: 'E-Payment Systems',
},
{ 
    id: 'laifmis', 
    title: 'Local Authorities Integrated Financial Management Information System'
},
{ 
    id: 'lapas', 
    title: 'Local Athourities Performance Assessment System'
},
{  
    id: 'msr', 
    title: 'Malawi Social Registry'
},
{ 
    id: 'pmis', 
    title: 'Project Monitoring System'
},
{ 
    id: 'publicworks', 
    title: 'Public Works MIS'
},
{ 
    id: 'sctpmis', 
    title: 'Social Cash Transfer Programme MIS'
}

]

// Keep original structure for backward compatibility with existing template code
const projectGroups = [
  {
    group: 'Delivery Systems',
    items: deliverySystemsData
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

// Watch for hash changes in the URL and update active tab accordingly
// This allows for direct linking to specific delivery systems
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})
// Page-builder: MSR,COMSIP, DGRM, E-Payments, LAIFMIS, LAPAS, PMIS, Public Works MIS, SCTP MIS
// const { data: mvcPage, pending: mvcPending, error: mvcError } = usePageBlocks('MSR,COMSIP, DGRM, E-Payments, LAIFMIS, LAPAS, PMIS, Public Works MIS, SCTP MIS')
    
const { data: pages, pending, error: PageError } = usePageBlocks([
  'malawi-social-registry', 'community-savings-and-investment-promotion',
  'digital-grievance-redress-mechanism', 'e-payments','local-authorities-integrated-financial-management-system'
])
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

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <div v-for="group in projectGroups" :key="group.group">
          <div v-for="item in group.items" :key="item.id" v-show="activeTab === item.id" class="prose max-w-none">
            
  
<!-- MSR Section -->
<div v-if="item.id === 'msr'" class="prose max-w-none">
<<<<<<< HEAD
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['malawi-social-registry']?.blocks || []" />
  <!--h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Malawi Social Registry (MSR)
  </h2>-->
  
  <!-- Introduction 
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
    <p class="text-gray-700 leading-relaxed">
      The Malawi Social Registry (MSR) is a national platform established by the Government 
      of Malawi in 2016 through the Department of Economic Planning and Development (EP&D). It collects, stores, 
      accesses, and shares socioeconomic and demographic data about households across the country to support 
      the implementation of social support programs and ensure assistance reaches those who need it most.
    <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>

    </p>
    
  </div>-->
  
<!-- MSR Dashboard -->
  <!--<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
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
  </div>-->
=======
  <BlocksRenderer :blocks="pages?.['msr-header']?.blocks || []" />
  
<!-- MSR Dashboard -->
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
    <BlocksRenderer :blocks="pages?.['msr-dashboard']?.blocks || []" />
  </div>
>>>>>>> 66fc24496fb298cd26d73e938ce18388d2855cfa

  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['msr-key-features']?.blocks || []" />
  
</div>

           <!-- LAIFMIS section -->
<div v-else-if="item.id === 'laifmis'" class="prose max-w-none">
<<<<<<< HEAD
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['local-authorities-integrated-financial-management-system']?.blocks || []" />

<!--<h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
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
  </div>-->  
  
<!-- Key Features Section -->
<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Key Features</h3>
  
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
=======
  <BlocksRenderer :blocks="pages?.['laifmis-header']?.blocks || []" />
>>>>>>> 66fc24496fb298cd26d73e938ce18388d2855cfa

            <!--LAIFMIS Key Features-->
<BlocksRenderer :blocks="pages?.['laifmis-key-features']?.blocks || []" />  
</div>

            
            <!-- E-Payment System section -->
<div v-else-if="item.id === 'e-payments'" class="prose max-w-none">
<<<<<<< HEAD
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['e-payments']?.blocks || []" />

  <!--<h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
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
  </div>-->
=======
  <BlocksRenderer :blocks="pages?.['e-payment-header']?.blocks || []" />
>>>>>>> 66fc24496fb298cd26d73e938ce18388d2855cfa

  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['e-payment-key-features']?.blocks || []" />

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
    <BlocksRenderer :blocks="pages?.['cs-epwp-header']?.blocks || []" />

<!-- Public Works Dashboard -->
<BlocksRenderer :blocks="pages?.['cs-epwp-dashboard']?.blocks || []" />

 <!-- Key Feature Section -->
<BlocksRenderer :blocks="pages?.['cs-epwp-key-features']?.blocks || []" />
</div>

          
           <!-- DGRM Section -->
<div v-else-if="item.id === 'dgrm'" class="prose max-w-none">
<<<<<<< HEAD
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['digital-grievance-redress-mechanism']?.blocks || []" />

  <!--<h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Digital Grievance Redress Mechanism (Digital GRM)
  </h2>
  
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
      Digital Grievance Redress Mechanism (Digital GRM) is a technology-enabled platform designed to enhance citizen engagement, 
      accountability, and transparency in project implementation. It allows community members to report issues, ask questions, 
      and provide feedback on development projects through multiple user-friendly channels.
      <a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>-->
  
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
=======
  <BlocksRenderer :blocks="pages?.['dgrm-header']?.blocks || []" />

          <!-- DGRM PICTURE-->


<div class="flex justify-center mt-10">
  <BlocksRenderer :blocks="pages?.['dgrm-picture']?.blocks || []" />
</div>

>>>>>>> 66fc24496fb298cd26d73e938ce18388d2855cfa
  
  <!-- Key Feature Section -->
  <BlocksRenderer :blocks="pages?.['dgrm-key-features']?.blocks || []" />
  
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
  <<BlocksRenderer :blocks="pages?.['lapas-header']?.blocks || []" />

  
  <!-- LAPAS Dashboard -->
  <<BlocksRenderer :blocks="pages?.['lapas-dashboard']?.blocks || []" />

<!-- Key Features Section -->
<<BlocksRenderer :blocks="pages?.['lapas-key-features']?.blocks || []" />
</div>

            <!-- COMSIP section-->
<div v-else-if="item.id === 'comsip'" class="prose max-w-none">
<<<<<<< HEAD
            <div v-if="PagePending">Loading...</div>
            <div v-else-if="PageError">Failed to load content.</div>
            <BlocksRenderer :blocks="pages?.['community-savings-and-investment-promotion']?.blocks || []" />
  <!--<h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
    Community Savings and Investment Promotion MIS
  </h2>--> 
  <!--
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
    <p class="text-gray-700 leading-relaxed">
The COMSIP MIS (Management Information System) is a digital platform that supports COMSIP's operations by 
enabling efficient coordination, monitoring, and reporting across its cooperative and social protection 
initiatives.
<a href="https://malawiubr.org/dashboards" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 ml-2 font-medium no-underline">See more</a>
    </p>
  </div>-->
=======
<BlocksRenderer :blocks="pages?.['comsip-header']?.blocks || []" />
>>>>>>> 66fc24496fb298cd26d73e938ce18388d2855cfa
  
<!-- Key Features Section -->
<BlocksRenderer :blocks="pages?.['comsip-key-features']?.blocks || []" />
</div>

<!-- PMIS Section -->
<div v-else-if="item.id === 'pmis'" class="prose max-w-none">
  <<BlocksRenderer :blocks="pages?.['pmis-header']?.blocks || []" />

  <!-- PMIS Dashboard -->
  <<BlocksRenderer :blocks="pages?.['pmis-dashboard']?.blocks || []" />

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