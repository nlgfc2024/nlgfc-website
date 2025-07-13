<script setup>
useHead({
  title: 'NLGFC - Home',
  meta: [
    { name: 'description', content: 'Welcome to our website' }
  ]
});

const partnerLogos = [
  { src: "/images/partners/Ireland_Std_Colour.png", alt: "Ireland" },
  { src: "/images/partners/gizlogo-unternehmen-de-rgb-300.jpg", alt: "GIZ" },
  { src: "/images/partners/EU normal-reproduction-high-resolution.jpg", alt: "EU" },
  { src: "/images/partners/Embassy of Iceland logo.png", alt: "Embassy of Iceland" },
  { src: "/images/partners/Cooperation logo.bmp", alt: "Cooperation" },
  { src: "/images/partners/New EU logo.png", alt: "New EU" },
  { src: "/images/partners/UK AID - Standard - 4C PNG.png", alt: "UK Aid" },
  { src: "/images/partners/USaid logo Horizontal RGB_JPEG.jpg", alt: "USAID" },
  { src: "/images/partners/WB-WBG-horizontal-RGB (1).jpg", alt: "World Bank" },
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

const activeTab = ref('procurements')

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Projects
const projects = [
 {
  title: 'SSRLP',
  description: 'Social Support for Resilient Livelihoods Project focuses on reducing poverty and enhancing resilience in vulnerable communities through targeted interventions and capacity building.',
  imagePath: '/images/samples/SSRLP logo(1).jpg',
  url: '/projects/currentProjects#ssrlp_overview'
},

  {
    title: 'GESD',
    description: 'Governance to Enable Service Delivery Project aims to improve local government capacity and citizen service access through institutional strengthening and policy reforms.',
    imagePath: '/images/samples/PBG logo.png',
    url: '/projects/currentProjects#gesd_overview'
  },
  {
    title: 'RCRP 2',
    description: 'The second phase of the Climate Resilience Project supports districts in disaster preparedness and mitigation through infrastructure development and community training.',
     imagePath: '/images/samples/RCRP LOGO- Final.png',
    url: '/projects/currentProjects#rcrp_overview'
  }
]

// Opportunity tabs
const opportunityTabs = ref([
  {
    key: 'procurements',
    label: 'Procurements',
    items: [
      { 
        title: 'Supply of IT Equipment for Local Offices', 
        deadline: '2024-08-15',
        file: '/tenders/it-equipment-supply.pdf'
      },
      { 
        title: 'Construction of School Blocks in Rural Areas', 
        deadline: '2024-09-01',
        file: '/tenders/school-construction.pdf'
      }
    ]
  },
  {
    key: 'jobs',
    label: 'Job Opportunities',
    items: [
      { 
        title: 'Finance Officer Position (Multiple Locations)', 
        deadline: '2024-07-30',
        applyLink: '/careers/finance-officer'
      },
      { 
        title: 'Monitoring & Evaluation Specialist', 
        deadline: '2024-08-10',
        applyLink: '/careers/monitoring-specialist'
      }
    ]
  }
])

const currentOpportunities = computed(() => {
  const tab = opportunityTabs.value.find(t => t.key === activeTab.value)
  return tab?.items || []
})

// Publications
const publications = ref([
  { title: '2024 Annual Report and Financial Statements', date: '2024-12-31', file: '/pdfs/annual-report-2024.pdf' },
  { title: 'Q1 Monitoring and Evaluation Brief', date: '2024-03-30', file: '/pdfs/q1-brief-2024.pdf' },
  { title: 'Local Authority Financial Management Handbook', date: '2023-11-10', file: '/pdfs/handbook-2023.pdf' },
  { title: 'Comprehensive Financial Audit Summary Report', date: '2023-08-15', file: '/pdfs/audit-summary-2023.pdf' },
  { title: 'Development Budget Review and Analysis', date: '2023-06-01', file: '/pdfs/budget-review-2023.pdf' }
])
</script>

<template>
  <div class="relative">
    <!-- <Navbar /> -->
    <ImageSlider class="relative z-0 pb-16 md:pb-24" />
    <!-- Featured Articles Grid -->
    <section class="relative z-10 -mt-10 md:-mt-18 lg:-mt-20 px-4">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Article 1 -->
          <article class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div class="flex h-full">
              <!-- Image on left -->
              <div class="w-1/3 relative overflow-hidden">
                <img 
                  src="/images/samples/news1.jpg" 
                  alt="Article image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
              </div>
              
              <!-- Content on right -->
              <div class="w-2/3 p-5 flex flex-col">
                <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Jun 15, 2023
                </span>
                <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <a href="#">How Our New Initiative is Transforming Communities</a>
                </h3>
                <a href="#" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read more
                  <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <!-- Article 2 -->
          <article class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div class="flex h-full">
              <!-- Image on left -->
              <div class="w-1/3 relative overflow-hidden">
                <img 
                  src="/images/samples/news2.jpg" 
                  alt="Article image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
              </div>
              
              <!-- Content on right -->
              <div class="w-2/3 p-5 flex flex-col">
                <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  May 28, 2023
                </span>
                <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <a href="#">Partnering for Greater Impact: Our New Alliance</a>
                </h3>
                <a href="#" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read more
                  <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <!-- Article 3 -->
          <article class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div class="flex h-full">
              <!-- Image on left -->
              <div class="w-1/3 relative overflow-hidden">
                <img 
                  src="/images/samples/news3.jpg" 
                  alt="Article image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
              </div>
              
              <!-- Content on right -->
              <div class="w-2/3 p-5 flex flex-col">
                <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Apr 12, 2023
                </span>
                <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <a href="#">Annual Report 2022: Our Achievements</a>
                </h3>
                <a href="#" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read more
                  <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <main class="container mx-auto px-4 py-12">
      <!-- Mission, Mandate and Vision -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          
          <!-- Mandate Row -->
          <div class="bg-white p-8 rounded-xl shadow-md mb-12 max-w-4xl mx-auto border-t-4 border-blue-600">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Our Mandate</h3>
            <p class="text-gray-600 text-center mb-6">
              To facilitate fiscal decentralization, financial management and local development in Local Governments
            </p>
       
          </div>
          
          <!-- Three Column Row -->
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Vision Card -->
            <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-600">
              <div class="text-purple-600 mb-4">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p class="text-gray-700 mb-6">
                Delivering effective and responsive financing for Local Governments
              </p>
            </div>
            
            <!-- Mission Card -->
            <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-600">
              <div class="text-blue-600 mb-4">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p class="text-gray-700 mb-6">
                To provide efficient and effective technical, financial and economic management services for mobilization, distribution and utilization of resources 
                for quality service delivery by Local Governments
              </p>
        
            </div>
            
            <!-- Core Values Card -->
            <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-emerald-600">
              <div class="text-emerald-600 mb-4">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Core Values</h3>
               <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Integrity</span>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Transparency</span>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Accountability</span>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Innovation</span>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Teamwork</span>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-4 h-4 text-emerald-700 mt-1 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">Professionalism</span>
                  </div>
                 
                </div>
              </div>
          </div>
        </div>
      </section>
    
      <!-- Projects Section with Interactive Cards -->
     <section class="py-2 bg-gradient-to-b from-primary-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full mb-4">
            Our Initiatives
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Current <span class="text-primary-600">Projects</span>
          </h2>
          <p class="max-w-2xl mx-auto text-gray-600">
            Discover our key programs that are transforming local governance and service delivery across the nation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="group relative overflow-hidden rounded-2xl shadow-xl h-96"
          >
            <img
              :src="`https://picsum.photos/600/400?random=${index + 10}`"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <div class="flex items-center justify-center w-20 h-20 mb-4 bg-white rounded-xl shadow-md p-2">
                <img
                  v-if="project.imagePath"
                  :src="project.imagePath"
                  alt="Project Logo"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    :d="project.iconPath"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>

              <h3 class="text-2xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-white/90 mb-4 line-clamp-2">{{ project.description }}</p>
              <a
                :href="project.url"
                class="inline-flex items-center text-sm font-medium text-white group-hover:text-primary-300 transition"
              >
                Learn more
                <svg
                  class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
     </section>


      
      <!-- Publications & Opportunities Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Publications Column -->
            <div class="lg:col-span-7">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-900">
                  Latest <span class="text-primary-600">Publications</span>
                </h3>
                <a
                  href="/publications"
                  class="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center"
                >
                  View all
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(pub, index) in publications"
                  :key="index"
                  class="group flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition"
                >
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <h4 class="font-medium text-gray-900 group-hover:text-primary-600 transition">
                      {{ pub.title }}
                    </h4>
                    <p class="text-sm text-gray-500 mt-1">
                      Published {{ formatDate(pub.date) }}
                    </p>
                  </div>
                  <a
                    :href="pub.file"
                    download
                    class="flex-shrink-0 text-primary-600 hover:text-primary-800 p-2 rounded-full hover:bg-primary-50 transition"
                    title="Download"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Opportunities Column -->
            <div class="lg:col-span-5">
              <div class="sticky top-24">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                  Current <span class="text-primary-600">Opportunities</span>
                </h3>

                <!-- Tabs -->
                <div class="flex border-b border-gray-200 mb-6">
                  <button
                    v-for="tab in opportunityTabs"
                    :key="tab.key"
                    @click="activeTab = tab.key"
                    :class="[
                      'px-4 py-2 font-medium text-sm border-b-2 -mb-px transition',
                      activeTab === tab.key
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    ]"
                  >
                    {{ tab.label }}
                  </button>
                </div>

                <!-- Items -->
                <div class="space-y-4">
                  <div
                    v-for="(op, index) in currentOpportunities"
                    :key="index"
                    class="p-4 border border-gray-200 rounded-xl hover:shadow-md transition"
                  >
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h4 class="font-medium text-gray-900">{{ op.title }}</h4>
                        <p class="text-sm text-gray-500 mt-1">
                          Deadline: {{ formatDate(op.deadline) }}
                        </p>
                      </div>
                      <template v-if="activeTab === 'procurements'">
                        <a
                          :href="op.file"
                          download
                          class="px-3 py-1 bg-primary-50 text-primary-600 rounded-md text-sm font-medium flex items-center"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          Download
                        </a>
                      </template>
                      <template v-else-if="activeTab === 'jobs'">
                        <a
                          :href="op.applyLink"
                          class="px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition"
                        >
                          Apply Now
                        </a>
                      </template>
                    </div>
                  </div>
                </div>

                <div class="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <div>
                      <h4 class="font-medium text-blue-800">Get Notified</h4>
                      <p class="text-sm text-blue-600 mt-1">
                        Subscribe to receive alerts about new opportunities
                      </p>
                      <button
                        class="mt-2 px-3 py-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Partners Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-semibold text-gray-900 mb-3">Our Strategic Partners</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading organizations to create sustainable impact
            </p>
          </div>

          <!-- Slider Container -->
          <div class="relative">
            <!-- Gradient Overlays -->
            <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
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
      </section>
    </main>

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
