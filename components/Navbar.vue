<script setup>
const isMenuOpen = ref(false);
const activeMegaMenu = ref(null);
const activeAccordion = ref(null);

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
    // Perform search action
    console.log('Searching for:', searchQuery.value);
    // You can replace this with actual search functionality
  }
};
// Close mega menus when clicking outside
const onClickOutside = () => {
  activeMegaMenu.value = null;
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
            <img src="public/NLGFC-Logo.png" alt="Organization Logo" class="h-18 -mt-12">
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
                
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Our Mandate</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                      Fiscal Decentralization</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                      Financial Management</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                      Local Development Support</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">CDF</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">DDF</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Water Structures Fund</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Health Rehabilitation</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Infrastructure Development Fund (IDF)</a></li>
                    <li class="pl-6"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Road Rehabilitation Fund (RRF)</a></li>
                  </ul>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800">Quick Links</h3>
                  <ul class="space-y-3">
                    <li><a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Annual Report</a></li>
                    <li><a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Financial Statements</a></li>
                    <li><a href="#" class="flex items-center text-blue-700 hover:text-blue-900 transition">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                      Strategic Plan</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Mega Menu -->
          <div @mouseenter="toggleMegaMenu('projects')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Projects
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'projects'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 900px;">
              <div class="grid grid-cols-4 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Current Projects</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                      SSRLP</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">SCTP</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Public Works</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Emergency Cash Transfer</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Livelihoods Support</a></li>
                    
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center mt-3">
                      GESD</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Performance Based Grants</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">LAPA</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Adaptive Management</a></li>
                    
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center mt-3">
                      RCRP</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Urban Social Registry</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Urban Public Works</a></li>
                    <li><a href="#" class="text-gray-600 hover:text-blue-600 transition pl-6">Performance Based Grants</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Delivery Systems</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">MSR</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">E-Payments</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Public Works MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">GRM</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">SCTP MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">LAPA MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">CIMIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">PMIS</a></li>
                  </ul>
                  
                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Past Projects</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">MASAF 4</a></li>
                  </ul>
                  
                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Upcoming Projects</h3>
                  <ul class="space-y-2">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">GESD 2.0</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">INSPIRE</a></li>
                  </ul>
                </div>
                
                <div class="col-span-2 bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-xl font-semibold mb-4 text-blue-800">Featured Project</h3>
                  <div class="bg-white p-4 rounded-md shadow-sm">
                    <img src="#" alt="Featured Project" class="w-full h-40 object-cover rounded-md mb-3">
                    <h4 class="font-semibold text-lg mb-2">Social Support for Resilient Livelihoods Project (SSRLP)</h4>
                    <p class="text-gray-600 mb-3">The SSRLP aims to improve access to income opportunities and strengthen safety nets for vulnerable households.</p>
                    <a href="#" class="text-blue-600 font-medium hover:underline">Learn More →</a>
                  </div>
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

            <div v-show="activeMegaMenu === 'councils'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 700px;">
              <div class="grid grid-cols-3 gap-6 p-6">
                <div>
                  <button @click="toggleAccordion('city')" class="flex items-center justify-between w-full text-lg font-semibold mb-3 text-blue-800">
                    City Councils
                    <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'city' }" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <div v-show="activeAccordion === 'city'" class="pl-4 space-y-2">
                    <a href="/localAuthorities/lilongwecitycouncil" class="block text-gray-700 hover:text-blue-700 transition">Lilongwe City Council</a>
                    <a href="/localAuthorities/blantyreCouncil" class="block text-gray-700 hover:text-blue-700 transition">Blantyre City Council</a>
                     <a href="/localAuthorities/mzuzucitycouncil" class="block text-gray-700 hover:text-blue-700 transition">Mzuzu City Council</a>
                    <a href="/localAuthorities/zombacitycouncil" class="block text-gray-700 hover:text-blue-700 transition">Zomba City Council</a>
                  </div>
                </div>
                
                <div>
                  <button @click="toggleAccordion('municipal')" class="flex items-center justify-between w-full text-lg font-semibold mb-3 text-blue-800">
                    Municipal/Township Councils
                    <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'municipal' }" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <div v-show="activeAccordion === 'municipal'" class="pl-4 space-y-2">
                    <a href="balakaMunicipal" class="block text-gray-700 hover:text-blue-700 transition">Balaka Municipal Council</a>
                    <a href="karongaMunicipal" class="block text-gray-700 hover:text-blue-700 transition">Karonga Municipal Council</a>
                    <a href="kasunguMunicipal" class="block text-gray-700 hover:text-blue-700 transition">Kasungu Municipal Council</a>
                    <a href="MangochiMucipal" class="block text-gray-700 hover:text-blue-700 transition">Mangochi Municipal Council</a>
                    <a href="allcouncils" class="block text-gray-700 hover:text-blue-700 transition">All Municipal Councils →</a>
                  </div>
                </div>
                
                <div>
                  <button @click="toggleAccordion('district')" class="flex items-center justify-between w-full text-lg font-semibold mb-3 text-blue-800">
                    District Councils
                    <svg class="w-5 h-5 transform transition" :class="{ 'rotate-180': activeAccordion === 'district' }" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <div v-show="activeAccordion === 'district'" class="pl-4 space-y-2">
                    <a href="#" class="block text-gray-700 hover:text-blue-700 transition">Chikwawa District Council</a>
                    <a href="#" class="block text-gray-700 hover:text-blue-700 transition">Dedza District Council</a>
                    <a href="#" class="block text-gray-700 hover:text-blue-700 transition">Mulanje District Council</a>
                    <a href="/localAuthorities/alldistricts" class="block text-gray-700 hover:text-blue-700 transition">All District Councils →</a>
                  </div>
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

            <div v-show="activeMegaMenu === 'opportunities'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 400px;">
              <div class="p-6">
                <ul class="space-y-3">
                  <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                    <!-- <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg> -->
                    Procurement Portal</a></li>
                  <li><a href="#" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                    <!-- <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg> -->
                    Job Opportunities Portal</a></li>
                </ul>
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
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Mission, Vision, Core Values</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Powers & Functions</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Leadership</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Board of Directors</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Management</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Executive Management</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Departments and Sections</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Our Mandate</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Fiscal Decentralization</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Financial Management</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Local Development Support</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">CDF</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">DDF</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Water Structures Fund</a></li>
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
            <div v-show="activeAccordion === 'mobile-projects'" class="pl-4 space-y-3">
              <h4 class="font-semibold text-blue-800 mt-2">Current Projects</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">SSRLP</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">SCTP</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Public Works</a></li>
                
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">GESD</a></li>
                <li class="pl-4"><a href="#" class="text-gray-600 hover:text-blue-600 transition">Performance Based Grants</a></li>
                
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">RCRP</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Delivery Systems</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">MSR</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">E-Payments</a></li>
              </ul>
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
              <button @click="toggleAccordion('mobile-city')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                City Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-city' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-city'" class="pl-4 py-2">
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Blantyre City Council</a>
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Lilongwe City Council</a>
              </div>
              
              <button @click="toggleAccordion('mobile-municipal')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                Municipal Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-municipal' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-municipal'" class="pl-4 py-2">
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Balaka Municipal Council</a>
                <a href="#" class="block text-gray-600 hover:text-blue-600 py-1">Karonga Municipal Council</a>
              </div>
            </div>
          </div>
          
          <!-- Simple mobile menu items -->
          <a href="#" class="text-gray-800 font-medium py-2">Resource Center</a>
          <a href="#" class="text-gray-800 font-medium py-2">Opportunities</a>
          <a href="#" class="text-gray-800 font-medium py-2">Contact Us</a>
        </div>
      </div>
    </div>

  </header>

</template>

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