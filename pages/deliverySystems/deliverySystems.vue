<script setup lang="ts">
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'

// Page metadata configuration
definePageMeta({ title: 'Delivery Systems' })

const { data: pages, pending, error: PageError } = usePageBlocks([
  'msr-header', 'msr-dashboard', 'msr-key-features','laifmis-header','laifmis-key-features',
  'digital-payment-services-header','digital-picture','digital-payment-services-key-features','cs-epwp-header','cs-epwp-picture',
  'cs-epwp-key-features','dgrm-header','dgrm-picture','dgrm-key-features','lapas-header','lapas-dashboard',
  'lapas-key-features','comsip-header','comsip-key-features','pmis-header','pmis-dashboard','pmis-key-features',
  'sctp-header','sctp-key-features'
])

const route = useRoute()
const activeTab = ref('msr') // Default tab

// Configuration for delivery system categories and items
// This array defines the sidebar navigation structure with descriptions
// Delivery systems data for the GeneralSidebar component
const deliverySystemsData = [
  { id: 'laifmis', title: 'Local Authorities Integrated Financial MIS' },
  { id: 'comsip', title: 'COMSIP Integrated MIS' },
  { id: 'dgrm',   title: 'Digital Grievance Redress Mechanism MIS' },
  { id: 'digital-payment-services', title: 'Digital Payment Services' },
  { id: 'lapas',  title: 'Local Athourities Performance Assessment System' },
  { id: 'msr',    title: 'Malawi Social Registry' },
  { id: 'pmis',   title: 'Project Monitoring System' },
  { id: 'publicworks', title: 'Public Works MIS' },
  { id: 'sctpmis', title: 'Social Cash Transfer Programme MIS' },
]

// Keep original structure for backward compatibility with existing template code
const projectGroups = [
  {
    group: 'Delivery Systems',
    items: deliverySystemsData
  }
]
const config = useRuntimeConfig()
const apiBase = (config.public.apiBase as string | undefined)?.replace(/\/$/, '') || ''

const { data: partnersRaw } = await useAsyncData('partners', () =>
  $fetch<{ id: number; name: string; logo: string }[]>(`${apiBase}/api/partners`)
)

const partnerLogos = computed(() =>
  (partnersRaw.value ?? []).map(p => ({
    src: `${apiBase}/storage/${p.logo}`,
    alt: p.name
  }))
)

const scrollDuration = ref(20)
// Sample story data for LAIFMIS
const grm= [
  {
    id: 1,
    title: "Transforming Local Government Finance",
    image: "/images/deliverySystems/tlgf.jpeg",
    excerpt: "Discover how LAIFMIS revolutionized financial management across local authorities, bringing transparency and efficiency to public finance administration."
  }
]

// Sample story data for digital-payment-services
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
function updateActiveTabFromHash(hash: string) {
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
  <BlocksRenderer :blocks="pages?.['msr-header']?.blocks || []" />
  
<!-- MSR Dashboard-->
<div class="mt-10">
  <BlocksRenderer :blocks="pages?.['msr-dashboard']?.blocks || []" />
</div>
  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['msr-key-features']?.blocks || []" />
  
</div>

           <!-- LAIFMIS section -->
<div v-else-if="item.id === 'laifmis'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['laifmis-header']?.blocks || []" />



            <!--LAIFMIS Key Features-->
<BlocksRenderer :blocks="pages?.['laifmis-key-features']?.blocks || []" />  
</div>

            
            <!--digital-payment-services section -->
<div v-else-if="item.id === 'digital-payment-services'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['digital-payment-services-header']?.blocks || []" />
  

<!-- digital PICTURE--> 
 <div class="flex justify-center mt-10"> 
  <BlocksRenderer :blocks="pages?.['digital-picture']?.blocks || []" /> 
</div>


  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['digital-payment-services-key-features']?.blocks || []" />

  <!-- DIGITAL Service Providers Section -->
  <div class="mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-6 text-center">Digital Payments Service Providers</h3>
    
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

<div class="flex justify-center mt-10">
  <BlocksRenderer :blocks="pages?.['cs-epwp-picture']?.blocks || []" />
</div>


 <!-- Key Feature Section -->
<BlocksRenderer :blocks="pages?.['cs-epwp-key-features']?.blocks || []" />
</div>

          
           <!-- DGRM Section -->
<div v-else-if="item.id === 'dgrm'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['dgrm-header']?.blocks || []" />

          <!-- DGRM PICTURE-->

<div class="flex justify-center mt-10"> 
  <BlocksRenderer :blocks="pages?.['dgrm-picture']?.blocks || []" /> 
</div>

  
  <!-- Key Feature Section -->
  <BlocksRenderer :blocks="pages?.['dgrm-key-features']?.blocks || []" />
  
</div>

            <!-- SCTP MIS Section -->
<div v-else-if="item.id === 'sctpmis'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['sctp-header']?.blocks || []" />
  


  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['sctp-key-features']?.blocks || []" />
</div>

<!-- LAPAS Section -->
<div v-else-if="item.id === 'lapas'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['lapas-header']?.blocks || []" />

<!-- lapas dashboard--> 
<div class="mt-10">
  <BlocksRenderer :blocks="pages?.['lapas-dashboard']?.blocks || []" />
</div>
  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['lapas-key-features']?.blocks || []" />
</div>

<!-- COMSIP section-->
<div v-else-if="item.id === 'comsip'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['comsip-header']?.blocks || []" />

  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['comsip-key-features']?.blocks || []" />
</div>

<!-- PMIS Section -->
<div v-else-if="item.id === 'pmis'" class="prose max-w-none">
  <BlocksRenderer :blocks="pages?.['pmis-header']?.blocks || []" />

  <!-- PMIS Dashboard -->
<div class="mt-10">
  <BlocksRenderer :blocks="pages?.['pmis-dashboard']?.blocks || []" />
</div>

  <!-- Key Features Section -->
  <BlocksRenderer :blocks="pages?.['pmis-key-features']?.blocks || []" />
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
  min-width: fit-content;
  will-change: transform;
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
    scrollbar-width: none;
  }
  
  .animate-scroll::-webkit-scrollbar {
    display: none;
  }
}

</style>

