<script setup>
const isMenuOpen = ref(false);
const activeMegaMenu = ref(null);
const activeAccordion = ref(null);
const showSearch = ref(false);
const searchQuery = ref('');

// Get the current route
const route = useRoute();
const router = useRouter();

// Watch for route changes
watch(() => route.path, () => {
  // Close all menus when route changes
  closeAllMenus();
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleMegaMenu = (menu) => {
  activeMegaMenu.value = activeMegaMenu.value === menu ? null : menu;
};

const toggleAccordion = (item) => {
  activeAccordion.value = activeAccordion.value === item ? null : item;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => {
      document.querySelector('#search-input')?.focus();
    });
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
    closeAllMenus();
  }
};

// Close all menus function
const closeAllMenus = () => {
  isMenuOpen.value = false;
  activeMegaMenu.value = null;
  activeAccordion.value = null;
  showSearch.value = false;
};

// Close mega menus when clicking outside
const onClickOutside = () => {
  activeMegaMenu.value = null;
};

// Handle opportunities navigation
const navigateToOpportunities = (section) => {
  closeAllMenus();
  router.push(`/opportunities?section=${section}`);
};
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">

    <!-- Top bar with social icons and links aligned left -->
    <div class="bg-gray-900 text-white py-2 px-4">
      <div class="container mx-auto">
        <div class="flex justify-end items-center space-x-6">
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="#" class="hover:text-blue-300 transition" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-blue-300 transition" aria-label="Twitter">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" class="hover:text-blue-300 transition" aria-label="LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" class="hover:text-blue-300 transition" aria-label="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>

          <!-- Login/Register Links -->
          <div class="flex items-center text-sm">
            <a href="#" class="hover:text-blue-300 transition">CMS Login</a>
            <span class="mx-2">|</span>
            <a href="#" class="hover:text-blue-300 transition">Job </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="container mx-auto py-3">
      <div class="flex justify-between items-center">
        <!-- First logo -->
        <div class="flex items-start">
          <a href="/" class="flex items-center">
            <img src="/images/logo/NLGFC-Logo.png" alt="Organization Logo" class="h-18 -mt-12">
            <!-- Website name -->
            <!-- <span class="text-xl font-bold text-blue-600">National Local Goverment Finance Committee</span> -->
          </a>
        </div>


        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button @click="toggleMenu" class="text-gray-700 focus:outline-none">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Desktop menu -->
        <nav class="hidden lg:flex items-center space-x-1">
          <div @mouseenter="toggleMegaMenu('home')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Home
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'home'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 400px;">
              <div class="p-6">
                <ul class="space-y-3">
                  <li><NuxtLink to="/"  class="text-gray-700 hover:text-blue-700 transition flex items-center">

                    Home 1</NuxtLink></li>
                  <li><NuxtLink to="/index2" class="text-gray-700 hover:text-blue-700 transition flex items-center">

                    home 2</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- About Us Mega Menu -->
          <div @mouseenter="toggleMegaMenu('about')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              About Us
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'about'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 800px;">
              <div class="grid grid-cols-3 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Organization</h3>
                  <ul class="space-y-2">
                    <!-- <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                      Mission, Vision, Core Values</a></li> -->
                    <li>
                      <NuxtLink to="/aboutUs/visionMissionValues" class="text-gray-700 hover:text-blue-700 transition flex items-center">Mission, Vision, Core Values</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/aboutUs/powersFunctions" class="text-gray-700 hover:text-blue-700 transition flex items-center">Powers & Functions</NuxtLink>
                    </li>
                  </ul>

                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Leadership</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/aboutUs/boardOfDirectors" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Board of Directors
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/aboutUs/executiveManagement" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Executive Management
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/aboutUs/directoratesDivisions" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Directorates and Divisions
                      </NuxtLink>
                    </li>
                  </ul>
                </div>




                <!-- Our Mandate Navigation Section -->
                <li class="list-none pl-0"> <!-- Removes bullet and padding -->
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Our Mandate</h3>
                  <ul class="space-y-2 pl-5"> <!-- Keeps indentation for nested items -->
                    <li>
                      <NuxtLink to="/mandate/ourMandate#fiscalDecentralization" class="text-gray-600 hover:text-blue-600">
                        Fiscal Decentralization
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/mandate/ourMandate#financialManagement" class="text-gray-600 hover:text-blue-600">
                        Financial Management
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/mandate/ourMandate#localDevelopmentSupport" class="text-gray-600 hover:text-blue-600">
                        Local Development Support
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#cdf" class="text-gray-600 hover:text-blue-600">
                        CDF
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#ddf" class="text-gray-600 hover:text-blue-600">
                        DDF
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#waterStructuresFund" class="text-gray-600 hover:text-blue-600">
                        Water Structures Fund
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#healthRehabilitation" class="text-gray-600 hover:text-blue-600">
                        Health Rehabilitation
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#idf" class="text-gray-600 hover:text-blue-600">
                        Infrastructure Development Fund (IDF)
                      </NuxtLink>
                    </li>
                    <li class="pl-4">
                      <NuxtLink to="/mandate/ourMandate#rrf" class="text-gray-600 hover:text-blue-600">
                        Road Rehabilitation Fund (RRF)
                      </NuxtLink>
                    </li>
                  </ul>
                </li>







                <div class="bg-blue-50 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800">Quick Links</h3>
                  <ul class="space-y-3">
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Annual Report
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Financial Statements
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        Strategic Plan
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        Audit Reports
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Consolidated LAs Annual Budget
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Mega Menu -->
          <div
              @mouseenter="toggleMegaMenu('projects')"
              @mouseleave="toggleMegaMenu(null)"
              class="relative"
          >
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Projects
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div
                v-show="activeMegaMenu === 'projects'"
                class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100"
                style="min-width: 900px;"
            >
              <div class="grid grid-cols-4 gap-6 p-6">
                <!-- Column 1 -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Current Projects</h3>
                  <strong class="text-gray-700 flex items-center">SSRLP</strong>
                  <ul class="space-y-1 pl-4 mb-4">
                    <li><NuxtLink to="/projects/currentProjects#ssrlp_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#SCTP" class="text-gray-600 hover:text-blue-600">SCTP</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#publicWorks" class="text-gray-600 hover:text-blue-600">Public Works</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#emergency" class="text-gray-600 hover:text-blue-600">Emergency Cash Transfer</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#livelihoods" class="text-gray-600 hover:text-blue-600">Livelihoods Support</NuxtLink></li>
                  </ul>

                  <strong class="text-gray-700 flex items-center mt-4">RCRP</strong>
                  <ul class="space-y-1 pl-4">
                    <li><NuxtLink to="/projects/currentProjects#rcrp_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#drb" class="text-gray-600 hover:text-blue-600">District Resilience</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#usr" class="text-gray-600 hover:text-blue-600">Urban Malawi Social Registry</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#upw" class="text-gray-600 hover:text-blue-600">Urban Climate Smart Public Works Program</NuxtLink></li>
                  </ul>
                </div>

                <!-- Column 2 -->
                <div class="mt-10 md:mt-0">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2 pt-7"></h3>
                  <strong class="text-gray-700 flex items-center">GESD</strong>
                  <ul class="space-y-1 pl-4 mb-4">
                    <li><NuxtLink to="/projects/currentProjects#gesd_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#pbf" class="text-gray-600 hover:text-blue-600">Performance-Based Financing</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#ias" class="text-gray-600 hover:text-blue-600">Intergovernmental Accountability</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#lgpi" class="text-gray-600 hover:text-blue-600">Local Government Performance Improvement</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#adaptive" class="text-gray-600 hover:text-blue-600">Adaptive Management and Innovation
                    </NuxtLink></li>
                  </ul>


                </div>

                <!-- Column 3 -->
                <div class="mt-10 md:mt-0">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Past Projects</h3>
                  <ul class="space-y-2 mb-6">
                    <strong class="text-gray-700 flex items-center">MASAF</strong>
                    <ul class="space-y-1 pl-4 mb-4">
                      <li><NuxtLink to="/projects/pastProjects#masaf_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                      <li><NuxtLink to="/projects/pastProjects#psn" class="text-gray-600 hover:text-blue-600">Productive Safety Nets</NuxtLink></li>
                      <li><NuxtLink to="/projects/pastProjects#scb" class="text-gray-600 hover:text-blue-600">Systems and Capacity Building</NuxtLink></li>
                      <li><NuxtLink to="/projects/pastProjects#pm" class="text-gray-600 hover:text-blue-600">Project Management</NuxtLink></li>

                    </ul>

                    <li><NuxtLink to="/projects/pastProjects#miera_overview" class="text-gray-600 hover:text-blue-600">MIERA</NuxtLink></li>
                  </ul>

                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Upcoming Projects</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/projects/upcomingProjects#gesd2" class="text-gray-600 hover:text-blue-600">GESD 2.0</NuxtLink></li>
                    <li><NuxtLink to="/projects/upcomingProjects#inspire" class="text-gray-600 hover:text-blue-600">INSPIRE-O</NuxtLink></li>
                  </ul>
                </div>

                <!-- Column 4 -->
                <div class="mt-10 md:mt-0">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Delivery Systems</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/deliverySystems/deliverySystems#msr" class="text-gray-600 hover:text-blue-600">MSR</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#e-payments" class="text-gray-600 hover:text-blue-600">E-Payments</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#publicworks" class="text-gray-600 hover:text-blue-600">Public Works MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#grm" class="text-gray-600 hover:text-blue-600">GRM MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#sctmis" class="text-gray-600 hover:text-blue-600">SCTP MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#lapas" class="text-gray-600 hover:text-blue-600">LAPA MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#cimis" class="text-gray-600 hover:text-blue-600">CIMIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#pmis" class="text-gray-600 hover:text-blue-600">PMIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#laifmis" class="text-gray-600 hover:text-blue-600">LAIF MIS</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <!-- Local Councils Mega Menu -->
          <div @mouseenter="toggleMegaMenu('councils')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Local Councils
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'councils'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 800px;">
              <div class="grid grid-cols-3 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">City Councils</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/localAuthorities/blantyreCouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Blantyre City Council</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/localAuthorities/lilongwecitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Lilongwe City Council</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/localAuthorities/mzuzucitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Mzuzu City Council</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/localAuthorities/zombacitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Zomba City Council</NuxtLink>
                    </li>
                  </ul>

                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Municipal Councils</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="#" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Balaka Municipal Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Karonga Municipal Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Kasungu Municipal Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Mangochi Municipal Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        All Municipal Councils →
                      </NuxtLink>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">District Councils</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Chikwawa District Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Dedza District Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Mulanje District Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/localAuthorities/alldistricts" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        All District Councils →
                      </NuxtLink>
                    </li>
                  </ul>

                  <!-- <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Council Services</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition">Service Delivery</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition">Development Projects</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition">Public Participation</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition">By-laws & Regulations</a></li>
                  </ul> -->
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800">Quick Links</h3>
                  <ul class="space-y-3">
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        Council Directory
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        Performance Reports
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Council Locations
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Budget Allocations
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 12a2 2 0 002 2h8a2 2 0 002-2L16 7"></path>
                        </svg>
                        Service Applications
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Resource Center -->
          <div @mouseenter="toggleMegaMenu('resource')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Resource Center
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'resource'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 500px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Publications</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Press Releases</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Success Stories</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Newsletters</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">News</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Media</a></li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Knowledge Management</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Gallery</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Video Library</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Opportunities -->
          <div @mouseenter="toggleMegaMenu('opportunities')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Opportunities
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'opportunities'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 500px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Career Opportunities</h3>
                  <ul class="space-y-3">
                    <li>
                      <button
                          @click="navigateToOpportunities('jobs')"
                          class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group"
                      >
                        <svg class="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Jobs Portal
                      </button>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-gray-700 hover:text-blue-700 transition group">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Applicant Registration
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Business Opportunities</h3>
                  <ul class="space-y-3">
                    <li>
                      <button
                          @click="navigateToOpportunities('procurement')"
                          class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group"
                      >
                        <svg class="w-5 h-5 mr-2 text-orange-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                        Procurement Portal
                      </button>
                    </li>
                    <li>
                      <a href="#" class="flex items-center text-gray-700 hover:text-blue-700 transition group">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Supplier Registration
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Quick Stats Section -->
              <div class="border-t border-gray-200 p-4 bg-gray-50">
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="text-2xl font-bold text-green-600">2</div>
                    <div class="text-xs text-gray-600">Active Jobs</div>
                  </div>
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="text-2xl font-bold text-blue-600">3</div>
                    <div class="text-xs text-gray-600">Open Tenders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Us -->
          <div @mouseenter="toggleMegaMenu('contact')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Contact Us
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'contact'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 500px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Contact Information</h3>
                  <ul class="space-y-3">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Contact Form</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Access to Information</a></li>
                    <!-- <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Compliance Officers</a></li> -->
                    <!-- <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Terms & Conditions</a></li> -->
                  </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800">Quick Contact</h3>
                  <div class="space-y-2">
                    <div class="flex items-start">
                      <svg class="w-5 h-5 mt-1 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div>
                        <p class="font-medium">General Inquiries</p>
                        <p class="text-gray-600">+265 123 456 789</p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <svg class="w-5 h-5 mt-1 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p class="font-medium">Email</p>
                        <p class="text-gray-600">info@organization.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </nav>
        <!-- Search Icon -->
        <div class="relative">
          <button
              @click="toggleSearch"
              v-if="!showSearchInput"
              class="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-700 text-bold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <input
              v-if="showSearchInput"
              v-model="searchText"
              @blur="hideSearch"
              @keyup.enter="performSearch"
              type="text"
              ref="searchInput"
              class="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              :class="{ 'absolute right-0 top-0': !isMobile }"
              placeholder="Search..."
          />
        </div>


        <!-- Second logo -->
        <!-- <div class="hidden lg:flex items-center">
          <a href="/" class="flex items-center">
            <img src="/arms1.png" alt="Partner Logo" class="h-12">
          </a>
        </div> -->

      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isMenuOpen" class="lg:hidden bg-white shadow-xl">
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-4">
          <!-- Home Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-home')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Home
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-home' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="activeAccordion === 'mobile-home'" class="pl-4 space-y-2">
              <NuxtLink to="/" class="block text-gray-700 hover:text-blue-700 py-1">Home 1</NuxtLink>
              <NuxtLink to="/index2" class="block text-gray-700 hover:text-blue-700 py-1">Home 2</NuxtLink>
            </div>
          </div>

          <!-- About Us Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-about')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              About Us
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-about' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="activeAccordion === 'mobile-about'" class="pl-4 space-y-3">
              <h4 class="font-semibold text-blue-800 mt-2">Organization</h4>
              <ul class="pl-2 space-y-2">
                <li><NuxtLink to="/aboutUs/visionMissionValues" class="text-gray-700 hover:text-blue-700 transition">Mission, Vision, Core Values</NuxtLink></li>
                <li><NuxtLink to="/aboutUs/powersFunctions" class="text-gray-700 hover:text-blue-700 transition">Powers & Functions</NuxtLink></li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Leadership</h4>
              <ul class="pl-2 space-y-2">
                <li>
                  <NuxtLink class="text-gray-700 hover:text-blue-700 transition" to="/aboutUs/boardOfDirectors">Board of Directors</NuxtLink>
                </li>

                <li>
                  <NuxtLink class="text-gray-700 hover:text-blue-700 transition" to="/aboutUs/executiveManagement">Executive Management</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="text-gray-700 hover:text-blue-700 transition" to="/aboutUs/directoratesDivisions">Directorates & Divisions</NuxtLink>
                </li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Our Mandate</h4>
              <ul class="pl-2 space-y-2">
                <li><NuxtLink to="/mandate/ourMandate#fiscalDecentralization" class="text-gray-700 hover:text-blue-700 transition">Fiscal Decentralization</NuxtLink></li>
                <li><NuxtLink to="/mandate/ourMandate#financialManagement" class="text-gray-700 hover:text-blue-700 transition">Financial Management</NuxtLink></li>
                <li><NuxtLink to="/mandate/ourMandate#localDevelopmentSupport" class="text-gray-700 hover:text-blue-700 transition">Local Development Support</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#cdf" class="text-gray-600 hover:text-blue-600 transition">CDF</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#ddf" class="text-gray-600 hover:text-blue-600 transition">DDF</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#waterStructuresFund" class="text-gray-600 hover:text-blue-600 transition">Water Structures Fund</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#healthRehabilitation" class="text-gray-600 hover:text-blue-600 transition">Health Rehabilitation</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#idf" class="text-gray-600 hover:text-blue-600 transition">Infrastructure Development Fund (IDF)</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#rrf" class="text-gray-600 hover:text-blue-600 transition">Road Rehabilitation Fund (RRF)</NuxtLink></li>
              </ul>
            </div>
          </div>

          <!-- Projects Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-projects')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Projects
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-projects' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Mobile Accordion Menu -->
            <div
                v-show="activeAccordion === 'mobile-projects'"
                class="block md:hidden bg-white rounded-md shadow-md mt-2 "
            >
              <div class="p-4 space-y-6 max-h-[75vh] overflow-y-auto">

                <!-- Current Projects -->
                <div>
                  <h3 class="font-semibold text-blue-800  pb-2">Current Projects</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li>
                      <strong class="text-gray-700">SSRLP</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/currentProjects#ssrlp_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#SCTP" class="text-gray-600 hover:text-blue-600">SCTP</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#publicWorks" class="text-gray-600 hover:text-blue-600">Public Works</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#emergency" class="text-gray-600 hover:text-blue-600">Emergency Cash Transfer</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#livelihoods" class="text-gray-600 hover:text-blue-600">Livelihoods Support</NuxtLink></li>
                      </ul>
                    </li>
                    <li class="mt-4">
                      <strong class="text-gray-700">GESD</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/currentProjects#gesd_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#pbf" class="text-gray-600 hover:text-blue-600">Performance-Based Financing</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#ias" class="text-gray-600 hover:text-blue-600">Intergovernmental Accountability</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#lgpi" class="text-gray-600 hover:text-blue-600">Local Government Performance Improvement</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#adaptive" class="text-gray-600 hover:text-blue-600">Adaptive Management and Innovation</NuxtLink></li>
                      </ul>
                    </li>
                    <li class="mt-4">
                      <strong class="text-gray-700">RCRP</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/currentProjects#rcrp_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#drb" class="text-gray-600 hover:text-blue-600">District Resilience</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#usr" class="text-gray-600 hover:text-blue-600">Urban Malawi Social Registry</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#upw" class="text-gray-600 hover:text-blue-600">Urban Climate Smart Public Works Program</NuxtLink></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <!-- Past Projects -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Past Projects</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li>
                      <strong class="text-gray-700">MASAF</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/pastProjects#masaf_overview" class="text-gray-600 hover:text-blue-600">Overview</NuxtLink></li>
                        <li><NuxtLink to="/projects/pastProjects#psn" class="text-gray-600 hover:text-blue-600">Productive Safety Nets</NuxtLink></li>
                        <li><NuxtLink to="/projects/pastProjects#scb" class="text-gray-600 hover:text-blue-600">Systems and Capacity Building</NuxtLink></li>
                        <li><NuxtLink to="/projects/pastProjects#pm" class="text-gray-600 hover:text-blue-600">Project Management</NuxtLink></li>
                      </ul>
                    </li>
                    <li><NuxtLink to="/projects/pastProjects#miera_overview" class="text-gray-700 hover:text-blue-700">MIERA</NuxtLink></li>
                  </ul>
                </div>

                <!-- Upcoming Projects -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Upcoming Projects</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li><NuxtLink to="/projects/upcomingProjects#gesd2" class="text-gray-700 hover:text-blue-700">GESD 2.0</NuxtLink></li>
                    <li><NuxtLink to="/projects/upcomingProjects#inspire" class="text-gray-700 hover:text-blue-700">INSPIRE-O</NuxtLink></li>
                  </ul>
                </div>

                <!-- Delivery Systems -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Delivery Systems</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li><NuxtLink to="/deliverySystems/deliverySystems#msr" class="text-gray-700 hover:text-blue-700">MSR</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#e-payments" class="text-gray-700 hover:text-blue-700">E-Payments</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#publicworks" class="text-gray-700 hover:text-blue-700">Public Works MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#grm" class="text-gray-700 hover:text-blue-700">GRM MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#sctmis" class="text-gray-700 hover:text-blue-700">SCTP MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#lapas" class="text-gray-700 hover:text-blue-700">LAPA MIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#cimis" class="text-gray-700 hover:text-blue-700">CIMIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#pmis" class="text-gray-700 hover:text-blue-700">PMIS</NuxtLink></li>
                    <li><NuxtLink to="/deliverySystems/deliverySystems#laifmis" class="text-gray-700 hover:text-blue-700">LAIF MIS</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <!-- Local Councils Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-councils')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Local Councils
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-councils' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeAccordion === 'mobile-councils'" class="pl-4 space-y-3">
              <!-- City Councils Section -->
              <button @click="toggleAccordion('mobile-city')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                City Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-city' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-city'" class="pl-4 py-2 space-y-1">
                <NuxtLink to="/localAuthorities/blantyreCouncil" class="block text-gray-600 hover:text-blue-600 py-1">Blantyre City Council</NuxtLink>
                <NuxtLink to="/localAuthorities/lilongwecitycouncil" class="block text-gray-600 hover:text-blue-600 py-1">Lilongwe City Council</NuxtLink>
                <NuxtLink to="/localAuthorities/mzuzucitycouncil" class="block text-gray-600 hover:text-blue-600 py-1">Mzuzu City Council</NuxtLink>
                <NuxtLink to="/localAuthorities/zombacitycouncil" class="block text-gray-600 hover:text-blue-600 py-1">Zomba City Council</NuxtLink>
              </div>

              <!-- Municipal Councils Section -->
              <button @click="toggleAccordion('mobile-municipal')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                Municipal Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-municipal' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-municipal'" class="pl-4 py-2 space-y-1">
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Balaka Municipal Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Karonga Municipal Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Kasungu Municipal Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Mangochi Municipal Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">All Municipal Councils →</NuxtLink>
              </div>

              <!-- District Councils Section -->
              <button @click="toggleAccordion('mobile-district')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                District Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-district' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-district'" class="pl-4 py-2 space-y-1">
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Chikwawa District Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Dedza District Council</NuxtLink>
                <NuxtLink to="#" class="block text-gray-600 hover:text-blue-600 py-1">Mulanje District Council</NuxtLink>
                <NuxtLink to="/localAuthorities/alldistricts" class="block text-gray-600 hover:text-blue-600 py-1">All District Councils →</NuxtLink>
              </div>

              <!-- Council Services Section -->
              <button @click="toggleAccordion('mobile-services')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                Council Services
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-services' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-services'" class="pl-4 py-2 space-y-1">
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Service Delivery</a>
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Development Projects</a>
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Public Participation</a>
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">By-laws & Regulations</a>
              </div>

              <!-- Quick Links Section -->
              <button @click="toggleAccordion('mobile-quick-links')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                Quick Links
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-quick-links' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-quick-links'" class="pl-4 py-2 space-y-1">
                <a href="#" class="block text-blue-600 hover:text-blue-800 py-1">Council Directory</a>
                <a href="#" class="block text-blue-600 hover:text-blue-800 py-1">Performance Reports</a>
                <a href="#" class="block text-blue-600 hover:text-blue-800 py-1">Council Locations</a>
                <a href="#" class="block text-blue-600 hover:text-blue-800 py-1">Budget Allocations</a>
                <a href="#" class="block text-blue-600 hover:text-blue-800 py-1">Service Applications</a>
              </div>
            </div>
          </div>

          <!-- Resource Center Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-resource')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Resource Center
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-resource' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="activeAccordion === 'mobile-resource'" class="pl-4 space-y-3">
              <h4 class="font-semibold text-blue-800 mt-2">Publications</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Press Releases</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Success Stories</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Newsletters</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">News</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Media</a></li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Knowledge Management</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Gallery</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Video Library</a></li>
              </ul>
            </div>
          </div>

          <!-- Opportunities Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-opportunities')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Opportunities
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-opportunities' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="activeAccordion === 'mobile-opportunities'" class="pl-4 space-y-3">
              <h4 class="font-semibold text-blue-800 mt-2">Career Opportunities</h4>
              <ul class="pl-2 space-y-2">
                <li>
                  <button @click="navigateToOpportunities('jobs')" class="text-gray-700 hover:text-blue-700 transition text-left">
                    Jobs Portal
                  </button>
                </li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Applicant Registration</a></li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Business Opportunities</h4>
              <ul class="pl-2 space-y-2">
                <li>
                  <button @click="navigateToOpportunities('procurement')" class="text-gray-700 hover:text-blue-700 transition text-left">
                    Procurement Portal
                  </button>
                </li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Supplier Registration</a></li>
              </ul>
            </div>
          </div>

          <!-- Contact Us Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-contact')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Contact Us
              <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-contact' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="activeAccordion === 'mobile-contact'" class="pl-4 space-y-3">
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Contact Form</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Access to Information</a></li>
              </ul>

              <div class="bg-blue-50 p-3 rounded-lg mt-3">
                <h5 class="font-medium text-blue-800 mb-2">Quick Contact</h5>
                <div class="space-y-1 text-sm">
                  <p class="text-blue-700">+265 123 456 789</p>
                  <p class="text-blue-700">info@organization.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>

</template>

<script>
// Add the navigation method
const navigateToOpportunities = (section) => {
  closeAllMenus()
  navigateTo(`/opportunities/opportunities?section=${section}`)
}
</script>

<style scoped>

/* Animation for dropdown menus */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
