        <script setup>
definePageMeta({ title: 'Delivery Systems' })

const route = useRoute()
const activeTab = ref('msr') // Default tab

const projectGroups = [
  {
    group: 'Delivery Systems',
    items: [
      { id: 'msr', title: 'Malawi Social Registry' },
      { id: 'laifmis', title: 'LAIFMIS' },
      { id: 'e-payments', title: 'E-Payments' },
      { id: 'publicworks', title: 'Public Works MIS' },
      { id: 'grm', title: 'GRM MIS' },
      { id: 'sctmis', title: 'SCT MIS' },
      { id: 'lapas', title: 'LAPAS' },
      { id: 'cimis', title: 'CIMIS' },
      { id: 'pmis', title: 'PMIS' }
    ]
  }
]
const partnerLogos = [
  { src: "/images/samples/Airtel _money.png", alt: "Airtel Money" },
  { src: "/images/samples/mpamba_logo.png", alt: "TNM Mpamba Logo" },
  { src: "/images/samples/fdh_bank.png", alt: "FDH Logo" },
  { src: "/images/samples/nbs_bank.png", alt: "FBS Bank Logo" },
  { src: "/images/samples/Standard_bank.png", alt: "Standard Bank" },
  { src: "/images/samples/kaku_pay.jpeg", alt: "Kaku Pay" }
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
const laifmisStories = [
  {
    id: 1,
    title: "Transforming Local Government Finance",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Discover how LAIFMIS revolutionized financial management across local authorities, bringing transparency and efficiency to public finance administration."
  },
  {
    id: 2,
    title: "Digital Innovation in Public Service",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Learn about the digital transformation journey that modernized how local governments track budgets, manage resources, and serve their communities."
  },
  {
    id: 3,
    title: "Empowering Local Communities",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Explore real stories of how improved financial management systems have directly impacted community development and service delivery."
  },
  {
    id: 4,
    title: "Budget Transparency Initiative",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "How LAIFMIS brought unprecedented transparency to local government budgeting processes across Malawi."
  },
  {
    id: 5,
    title: "Community-Driven Development",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Stories of communities taking charge of their development through better financial management tools."
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


</script>

<template>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      
      <!-- Sidebar -->
      <aside class="w-full md:w-64 border-r pr-4">
        <div v-for="group in projectGroups" :key="group.group" class="mb-4">
          <details open class="border border-gray-200 rounded">
            <summary class="cursor-pointer px-4 py-2 font-semibold bg-gray-100">
              {{ group.group }}
            </summary>
            <ul class="space-y-1 px-4 py-2">
              <li v-for="item in group.items" :key="item.id">
                <a
                  :href="`#${item.id}`"
                  @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
                  :class="[
                    'block px-3 py-2 rounded text-sm cursor-pointer',
                    item.id === activeTab ? 'bg-blue-100 font-medium text-blue-900' : 'hover:bg-gray-100'
                  ]"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </details>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <div v-for="group in projectGroups" :key="group.group">
          <div v-for="item in group.items" :key="item.id" v-show="activeTab === item.id" class="prose max-w-none">
            
            <!-- MSR -->
            <div v-if="item.id === 'msr'">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">Malawi Social Registry</h2>
              
              <!-- Main Description with Blue Background -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <p class="text-lg text-gray-700 leading-relaxed">
                  The Malawi Social Registry (MSR) is a national platform established by the Government of Malawi in 2016 through the Department of Economic Planning and Development (EP&D). It collects, stores, accesses, and shares socioeconomic and demographic data about households across the country. Its main purpose is to support the implementation of social support programs by ensuring that assistance such as cash, food, or other forms of help reaches those who need it most. Instead of relying on estimates or assumptions, the UBR provides accurate household data that programs can use to identify and assist the right people.
                </p>
              </div>
              
              <iframe
                src="https://dashboards.malawiubr.org/public/dashboard/0929d069-914b-4d88-9017-1a8b46cdc28f"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- LAIFMIS -->
            <div v-else-if="item.id === 'laifmis'">
              <div class="max-w-4xl">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Local Authority Integrated Finance Management Information System</h2>
                
                <!-- Main Description -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                  <p class="text-lg text-gray-700 leading-relaxed">
                    The Local Authority Integrated Finance Management Information System (LAIFMIS) is a comprehensive digital platform designed to streamline financial management processes across local government authorities in Malawi. This system enhances transparency, accountability, and efficiency in public financial management at the local level.
                  </p>
                </div>

                <!-- Key Features Section -->
                <div class="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Budget Management</h4>
                        <p class="text-sm text-gray-600">Comprehensive budget planning and tracking</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Real-time Reporting</h4>
                        <p class="text-sm text-gray-600">Instant financial insights and analytics</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Secure Transactions</h4>
                        <p class="text-sm text-gray-600">Enhanced security and audit trails</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Multi-user Access</h4>
                        <p class="text-sm text-gray-600">Role-based permissions and collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sliding Story Cards -->
                <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-6">Featured Projects Under LAIFMIS</h3>
                  <div class="overflow-hidden">
                    <div class="flex gap-6 animate-scroll hover:pause">
                      <!-- First set of cards -->
                      <div
                        v-for="story in laifmisStories"
                        :key="story.id"
                        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex-shrink-0 w-80"
                      >
                        <!-- Image Container -->
                        <div class="relative h-48 overflow-hidden">
                          <img
                            :src="story.image"
                            :alt="story.title"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <!-- Content Container -->
                        <div class="p-4">
                          <h4 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {{ story.title }}
                          </h4>
                          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                            {{ story.excerpt }}
                          </p>
                          <button class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                            Read More

                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <!-- Duplicate set for seamless loop -->
                      <div
                        v-for="story in laifmisStories"
                        :key="`dup-${story.id}`"
                        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex-shrink-0 w-80"
                      >
                        <!-- Image Container -->
                        <div class="relative h-48 overflow-hidden">
                          <img
                            :src="story.image"
                            :alt="story.title"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <!-- Content Container -->
                        <div class="p-4">
                          <h4 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {{ story.title }}
                          </h4>
                          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                            {{ story.excerpt }}
                          </p>
                          <button class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                            Read More
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- E-Payments -->
            <div v-else-if="item.id === 'e-payments'">
              <div class="max-w-4xl">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Electronic Payment Systems</h2>
                
                <!-- Main Description -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                  <p class="text-lg text-gray-700 leading-relaxed">
                    Electronic Payment Systems provide secure, efficient, and convenient digital payment solutions for citizens and businesses. These systems enable seamless transactions and provide citizens with convenient access to government services anytime, anywhere.
                  </p>
                </div>
                
                <!-- Key Features Section -->
                <div class="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Multiple Payment Channels</h4>
                        <p class="text-sm text-gray-600">Mobile money, bank transfers, and online payments</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Secure Transactions</h4>
                        <p class="text-sm text-gray-600">End-to-end encryption and fraud detection</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Real-time Processing</h4>
                        <p class="text-sm text-gray-600">Instant payment confirmation and notifications</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-gray-900">Comprehensive Reporting</h4>
                        <p class="text-sm text-gray-600">Detailed analytics and transaction history</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Slider Container -->
                <div class="relative overflow-hidden" aria-label="Partner logos carousel">
                  <!-- Gradient Overlays -->
                  <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                  <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

                  <!-- Slider Track -->
                  <div class="overflow-hidden py-4 px-2 sm:px-4">
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
                          <div class="bg-white p-4 rounded-lg flex items-center justify-center h-24 w-40 sm:h-32 sm:w-48 dark:bg-gray-800 transition-all hover:scale-105 hover:shadow-md">
                            <img
                              :src="logo.src"
                              :alt="logo.alt"
                              loading="lazy"
                              decoding="async"
                              width="192"
                              height="128"
                              class="max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
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
            <div v-else-if="item.id === 'publicworks'">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">Public Works Management Information System</h2>
              
              <!-- Main Description with Blue Background -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <p class="text-lg text-gray-700 leading-relaxed">
                  The Public Works Management Information System streamlines the planning, execution, and monitoring of public infrastructure projects to ensure projects are delivered on time, within budget, and to the required quality standards.
                </p>
              </div>
              
              <iframe
                src="http://"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- GRM MIS -->
            <div v-else-if="item.id === 'grm'">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">Grievance Redress Mechanism (GRM)</h2>
              <!-- Main Description with Blue Background -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <p class="text-lg text-gray-700 leading-relaxed">
                  Digital Grievance Redress Mechanism (Digital GRM) provides citizens with accessible channels to report concerns, complaints, and feedback about public services and projects through multiple user-friendly channels.
                </p>
              </div>
              <iframe
                src=""
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- SCT MIS -->
            <div v-else-if="item.id === 'sctmis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Social Cash Transfer Program (SCTP) MIS</h2>
              <p class="text-gray-700">Manages identification, enrollment, and payment processes for social cash transfer beneficiaries.</p>
            </div>

            <!-- LAPAS -->
            <div v-else-if="item.id === 'lapas'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Local Authority Performance Assessment (LAPAS)</h2>
              <iframe
                src="http://lapa.nlgfc.gov.mw/data"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>

            <!-- CIMIS -->
            <div v-else-if="item.id === 'cimis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Comsip Integrated MIS (CIMIS)</h2>
              <p class="text-gray-700">Comprehensive management information system for integrated program coordination.</p>
            </div>

            <!-- PMIS -->
            <div v-else-if="item.id === 'pmis'">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Project Monitoring Information System (PMIS)</h2>
              <iframe
                src="https://projects.nlgfc.gov.mw"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
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