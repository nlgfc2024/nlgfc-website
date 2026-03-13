<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <!-- Top bar with social icons and links aligned left -->
    <div class="bg-gray-900 text-white py-2 px-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold hidden md:inline-block ml-30">
            National Local Government Finance Committee
          </span>
          <div class="flex items-center space-x-6">
            <!-- Social Icons -->
            <div class="flex space-x-4">
              <a href="https://web.facebook.com/nlgfc" class="hover:text-blue-300 transition" aria-label="Facebook">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://x.com/nlgfc_mw" class="hover:text-blue-300 transition" aria-label="Twitter">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/nlgfc_mw/" class="text-gray-400 hover:text-white transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/nlgfc-malawi/" 
                class="text-gray-400 hover:text-white transition"
                aria-label="Visit our LinkedIn page">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@nlgfcmalawi2455?sub_confirmation=1" class="text-gray-400 hover:text-white transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>

            <!-- Login/Register Links -->
            <div class="flex items-center text-sm">
              <a href="#" class="hover:text-blue-300 transition">CMS Login</a>
              <span class="mx-2">|</span>
              <a href="#" class="hover:text-blue-300 transition">Job Portal</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="container mx-auto py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-start">
          <a href="/" class="flex items-center">
            <img src="/images/logo/NLGFC-Logo.png" alt="Organization Logo" class="h-18 -mt-12">
            <!-- Website name (hidden on mobile, visible on md screens and up) -->
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
          <!-- Home Menu -->
          <!-- <div @mouseenter="toggleMegaMenu('home')" @mouseleave="toggleMegaMenu(null)" class="relative">
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
          </div> -->

          <div @mouseenter="toggleMegaMenu(null)" class="relative">
            <a href="/" class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Home
            </a>
          </div>
          <!-- About Us Mega Menu -->
          <div @mouseenter="toggleMegaMenu('about')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              About Us
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'about'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 700px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Organization</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/about#mvc" class="text-gray-700 hover:text-blue-700 transition flex items-center">Mission, Vision, Core Values</NuxtLink></li>
                    <li><NuxtLink to="/about#powers" class="text-gray-700 hover:text-blue-700 transition flex items-center">Powers & Functions</NuxtLink></li>
                  </ul>

                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Leadership</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/about#board" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Board of Directors
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/about#management" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Executive Management
                      </NuxtLink>
                    </li>
                    <!-- <li>
                      <NuxtLink to="/about#structure" class="text-gray-600 hover:text-blue-600 transition flex items-center">
                        Organogram
                      </NuxtLink>
                    </li> -->
                    <li>
                      <NuxtLink to="/about#directorates" class="text-gray-600 hover:text-blue-600 transition flex items-center">
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
                    <!-- <li class="pl-4">
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
                    </li> -->
                  </ul>
                </li> 
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
              <div class="grid grid-cols-3 gap-6 p-6">
                <!-- Column 1 -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Current Projects</h3>
                  <strong class="text-gray-700 flex items-center">Government Funded Projects</strong>
                  <ul class="space-y-1 pl-4 mb-4">
                    <li><NuxtLink to="/projects/currentProjects#cdf" class="text-gray-600 hover:text-blue-600">Constituency Development Fund (CDF)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#ddf" class="text-gray-600 hover:text-blue-600">District Development Fund (DDF)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#idf" class="text-gray-600 hover:text-blue-600">Infrastructure Development Fund (IDF)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#rrf" class="text-gray-600 hover:text-blue-600">Road Rehabilitation Fund (RRF)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#wsf" class="text-gray-600 hover:text-blue-600">Water Structures Fund (WSF)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#health_rehab" class="text-gray-600 hover:text-blue-600">Health Rehabilitation (HR) </NuxtLink></li>
                  </ul>

                  <strong class="text-gray-700 flex items-center mt-4">Donor Funded Projects</strong>
                  <ul class="space-y-1 pl-4">
                    <li><NuxtLink to="/projects/currentProjects#ssrlp_news" class="text-gray-600 hover:text-blue-600">Social Support For Resilient Livelihoods (SSRLP)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#gesd_news" class="text-gray-600 hover:text-blue-600">Governance To Enable Service Delivery (GESD)</NuxtLink></li>
                    <li><NuxtLink to="/projects/currentProjects#rcrp2_news" class="text-gray-600 hover:text-blue-600">Regional Climate Resilience Project (RCRP2)</NuxtLink></li>
                  </ul>
                </div>

              
                <!-- Past Projects-->
                <div class="mt-10 md:mt-0">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Past Projects</h3>
                  <ul class="space-y-1 pl-4 mb-4">
                      <li><NuxtLink to="/projects/pastProjects#masaf_overview" class="text-gray-600 hover:text-blue-600">Malawi Social Action Fund (MASAF)</NuxtLink></li>
                      <li><NuxtLink to="/projects/pastProjects#miera_overview" class="text-gray-600 hover:text-blue-600">More Income and Employment in Rural Areas (MIERA)</NuxtLink></li>
                      <li><NuxtLink to="/projects/pastProjects#led_overview" class="text-gray-600 hover:text-blue-600">Local Economic Development (LED)</NuxtLink></li>
                  
                    </ul>
                 

                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Upcoming Projects</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/projects/upcomingProjects#gesd2" class="text-gray-600 hover:text-blue-600">Governance To Enable Service Delivery (GESD 2.0)</NuxtLink></li>
                    <li><NuxtLink to="/projects/upcomingProjects#inspire" class="text-gray-600 hover:text-blue-600">Integrated Social Protection Inclusion and Resilience Project (INSPIRE-O)</NuxtLink></li>
                  </ul>
                </div>
                                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold mb-3 text-blue-800">Quick Links</h3>
                        <ul class="space-y-3">
                          <li>
                            <NuxtLink to="/projects/currentProjects#publicWorks" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Climate Smart Public Works
                            </NuxtLink>
                          </li>

                          <li>
                            <NuxtLink to="/projects/currentProjects#SCTP" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                              Social Cash Transfer
                            </NuxtLink>
                          </li>

                          <li>
                            <NuxtLink to="/projects/currentProjects#livelihoods" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                              </svg>
                              Livelihoods Support
                            </NuxtLink>
                          </li>

                          <li>
                            <NuxtLink to="/projects/currentProjects#usr" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                              </svg>
                              Urban Social Registry
                            </NuxtLink>
                          </li>

                          <li>
                            <NuxtLink to="/projects/currentProjects#pbf" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Performance Based Financing
                            </NuxtLink>
                          </li>
                        </ul>
                      </div>


              </div>
            </div>
          </div>
          

          <!-- Delivery Systems menu -->
          <div @mouseenter="toggleMegaMenu('deliver')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Delivery Systems
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'deliver'" class="absolute left-0 w-100 bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100">
              <div class="space-y-4 p-4">
                <div class="mt-10 md:mt-0">
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Delivery Systems</h3>
                  <ul class="space-y-2">
<li><NuxtLink to="/deliverySystems/deliverySystems#comsip" class="text-gray-600 hover:text-blue-600">Community Savings and Investment Promotion</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#dgrm" class="text-gray-600 hover:text-blue-600">Digital Grievance Redress Mechanism MIS</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#e-payments" class="text-gray-600 hover:text-blue-600">E-Payments</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#laifmis" class="text-gray-600 hover:text-blue-600">Local Authority IFMIS</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#lapas" class="text-gray-600 hover:text-blue-600">Local Authority Perfomance Assesment MIS</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#msr" class="text-gray-600 hover:text-blue-600">Malawi Social Registry</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#pmis" class="text-gray-600 hover:text-blue-600">Projects Monitoring Information System</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#publicworks" class="text-gray-600 hover:text-blue-600">Public Works MIS</NuxtLink></li>
<li><NuxtLink to="/deliverySystems/deliverySystems#sctpmis" class="text-gray-600 hover:text-blue-600">Social Cash Transfer Programme MIS</NuxtLink></li>

                      </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Local Councils Mega Menu -->
          <div @mouseenter="toggleMegaMenu('councils')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Local Authorities
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'councils'" class="absolute left-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 700px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">City Councils</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/localAuthorities/blantyreCouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Blantyre City Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/lilongwecitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Lilongwe City Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/mzuzucitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Mzuzu City Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/zombacitycouncil" class="text-gray-700 hover:text-blue-700 transition flex items-center">Zomba City Council</NuxtLink></li>
                  </ul>

                  <h3 class="text-lg font-semibold mb-3 mt-6 text-blue-800 border-b pb-2">Municipal/Town Councils</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/localAuthorities/Lunchezamanucipal" class="text-gray-600 hover:text-blue-600 transition flex items-center">Lunchenza Municipal Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/Karongamunicipal" class="text-gray-600 hover:text-blue-600 transition flex items-center">Karonga Municipal Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/Kasungumunicipal" class="text-gray-600 hover:text-blue-600 transition flex items-center">Kasungu Municipal Council</NuxtLink></li>
                    <li><NuxtLink to="/localAuthorities/Mangochimunicipal" class="text-gray-600 hover:text-blue-600 transition flex items-center">Mangochi Municipal Council</NuxtLink></li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">District Councils</h3>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/localAuthorities/chikwawaDistrict" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Chikwawa District Council
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/localAuthorities/dedzaDistrict" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Dedza District Council
                      </NuxtLink>
                    </li>
                  <li>
                      <NuxtLink to="/localAuthorities/mulanjeDistrict" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        Mulanje District Council
                      </NuxtLink>
                    </li>

    
                    <li>
                      <NuxtLink to="/localAuthorities/alldistricts" class="text-gray-700 hover:text-blue-700 transition flex items-center">
                        All District Councils →
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Resource Center Updated -->
          <div @mouseenter="toggleMegaMenu('resource')" @mouseleave="toggleMegaMenu(null)" class="relative">
            <button class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Resource Center
              <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <div v-show="activeMegaMenu === 'resource'" class="absolute right-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 800px;">
              <div class="grid grid-cols-3 gap-6 p-6">
                <div>
                  
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Publications</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/resourceCenter#news" class="text-gray-700 hover:text-blue-700 transition">News</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-press-releases" class="text-gray-700 hover:text-blue-700 transition">Press Releases</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-success-stories" class="text-gray-700 hover:text-blue-700 transition">Success Stories</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-speeches" class="text-gray-700 hover:text-blue-700 transition">Speeches</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-research" class="text-gray-700 hover:text-blue-700 transition">Research & Discussions</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-budget" class="text-gray-700 hover:text-blue-700 transition">Budget Documents</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-disbursements" class="text-gray-700 hover:text-blue-700 transition">Disbursements</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-newsletters" class="text-gray-700 hover:text-blue-700 transition">Newsletter</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-manuals" class="text-gray-700 hover:text-blue-700 transition">Manuals and Guidelines</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#publications-policies" class="text-gray-700 hover:text-blue-700 transition">Policies and Strategies</NuxtLink></li>
                  </ul>
                </div>

                <div>
                  <div>
                    <NuxtLink to="/resourceCenter#knowledge"><h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Knowledge Management</h3></NuxtLink>
                    <ul class="space-y-2">
                      <li><NuxtLink to="/resourceCenter#knowledge-management-image-gallery" class="text-gray-700 hover:text-blue-700 transition">Image Galley</NuxtLink></li>
                      <li><NuxtLink to="/resourceCenter#knowledge-management-video" class="text-gray-700 hover:text-blue-700 transition">Videos</NuxtLink></li>
                    </ul>
                  </div>
                  <br />
                  <div>
                    <NuxtLink to="/resourceCenter#projects"><h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Project Documents</h3></NuxtLink>
                    <ul class="space-y-2">
                      <li><NuxtLink to="/resourceCenter#project-documents-ssrlp" class="text-gray-700 hover:text-blue-700 transition">SSRP</NuxtLink></li>
                      <li><NuxtLink to="/resourceCenter#project-documents-gesd" class="text-gray-700 hover:text-blue-700 transition">GESD</NuxtLink></li>
                      <li><NuxtLink to="/resourceCenter#project-documents-rcrp2" class="text-gray-700 hover:text-blue-700 transition">RCRP 2</NuxtLink></li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Reports</h3>
                  <ul class="space-y-2">
                    <li><NuxtLink to="/resourceCenter#reports-audit-reports" class="text-gray-700 hover:text-blue-700 transition">Audit Reports</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#reports-financial-reports" class="text-gray-700 hover:text-blue-700 transition">Financial Reports</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#reports-financial-statements" class="text-gray-700 hover:text-blue-700 transition">Financial Statements</NuxtLink></li>
                    <li><NuxtLink to="/resourceCenter#reports-lapa-synthesis" class="text-gray-700 hover:text-blue-700 transition">LAPA synthesis</NuxtLink></li>
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

            <div v-show="activeMegaMenu === 'opportunities'" class="absolute right-0 w-full bg-white shadow-xl rounded-md py-3 z-50 border border-gray-100" style="min-width: 500px;">
              <div class="grid grid-cols-2 gap-6 p-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Career Opportunities</h3>
                  <ul class="space-y-3">
                    <li>
                      <button @click="navigateToOpportunities('jobs')" class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group">
                        <svg class="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Jobs Portal
                      </button>
                    </li>
                    <li>
                      <NuxtLink to="/opportunities#jobs" class="flex items-center text-gray-700 hover:text-blue-700 transition">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Jobs Listing
                      </NuxtLink>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">Business Opportunities</h3>
                  <ul class="space-y-3">
                    <li>
                      <button @click="navigateToOpportunities('procurement')" class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group">
                        <svg class="w-5 h-5 mr-2 text-orange-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                        Procurement Portal
                      </button>
                    </li>
                    <li>
                      <NuxtLink to="/opportunities#procurement" class="flex items-center text-gray-700 hover:text-blue-700 transition">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Procurement Notices
                      </NuxtLink>
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
          <div>
            <a href="/contact#address" class="flex items-center px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-blue-50 rounded-md transition font-medium">
              Contact Us
            </a>
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


      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isMenuOpen" class="lg:hidden bg-white shadow-xl">
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search..."
            >
            <button @click="handleSearch" class="absolute right-3 top-2 text-gray-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
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
                <li><NuxtLink to="/about#mvc" class="text-gray-700 hover:text-blue-700 transition">Mission, Vision, Core Values</NuxtLink></li>
                <li><NuxtLink to="/about#powers" class="text-gray-700 hover:text-blue-700 transition">Powers & Functions</NuxtLink></li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Leadership</h4>
              <ul class="pl-2 space-y-2">
                <li><NuxtLink to="/about#board" class="text-gray-700 hover:text-blue-700 transition">Board of Directors</NuxtLink></li>
                <li><NuxtLink to="/about#management" class="text-gray-700 hover:text-blue-700 transition">Executive Management</NuxtLink></li>
                <li><NuxtLink to="/about#directorates" class="text-gray-700 hover:text-blue-700 transition">Directorates & Divisions</NuxtLink></li>
              </ul>

              <h4 class="font-semibold text-blue-800 mt-3">Our Mandate</h4>
              <ul class="pl-2 space-y-2">
                <li><NuxtLink to="/mandate/ourMandate#fiscalDecentralization" class="text-gray-700 hover:text-blue-700 transition">Fiscal Decentralization</NuxtLink></li>
                <li><NuxtLink to="/mandate/ourMandate#financialManagement" class="text-gray-700 hover:text-blue-700 transition">Financial Management</NuxtLink></li>
                <li><NuxtLink to="/mandate/ourMandate#localDevelopmentSupport" class="text-gray-700 hover:text-blue-700 transition">Local Development Support</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#cdf" class="text-gray-600 hover:text-blue-600 transition">CDF</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#ddf" class="text-gray-600 hover:text-blue-600 transition">DDF</NuxtLink></li>
                <li class="pl-4"><NuxtLink to="/mandate/ourMandate#waterStructuresFund" class="text-gray-600 hover:text-blue-600 transition">Water Structures Fund</NuxtLink></li>
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
                        <li><NuxtLink to="/projects/currentProjects#SCTP" class="text-gray-600 hover:text-blue-600">SCTP</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#publicWorks" class="text-gray-600 hover:text-blue-600">Public Works</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#emergency" class="text-gray-600 hover:text-blue-600">Emergency Cash Transfer</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#livelihoods" class="text-gray-600 hover:text-blue-600">Livelihoods Support</NuxtLink></li>
                      </ul>
                    </li>
                    <li class="mt-4">
                      <strong class="text-gray-700">GESD</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/currentProjects#pbg" class="text-gray-600 hover:text-blue-600">Performance Based Grants</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#lapa" class="text-gray-600 hover:text-blue-600">LAPA</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#adaptive" class="text-gray-600 hover:text-blue-600">Adaptive Management</NuxtLink></li>
                      </ul>
                    </li>
                    <li class="mt-4">
                      <strong class="text-gray-700">RCRP</strong>
                      <ul class="pl-4 space-y-1">
                        <li><NuxtLink to="/projects/currentProjects#usr" class="text-gray-600 hover:text-blue-600">Urban Social Registry</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#upw" class="text-gray-600 hover:text-blue-600">Urban Public Works</NuxtLink></li>
                        <li><NuxtLink to="/projects/currentProjects#pbg2" class="text-gray-600 hover:text-blue-600">Performance Based Grants</NuxtLink></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <!-- Past Projects -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Past Projects</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">MASAF 4</a></li>
                  </ul>
                </div>

                <!-- Upcoming Projects -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Upcoming Projects</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">GESD 2.0</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">INSPIRE</a></li>
                  </ul>
                </div>

                <!-- Delivery Systems -->
                <div>
                  <h3 class="font-semibold text-blue-800 border-b pb-2">Delivery Systems</h3>
                  <ul class="pl-2 mt-2 space-y-1">
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">MSR</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">E-Payments</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">Public Works MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">GRM</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">SCTP MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">LAPA MIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">CIMIS</a></li>
                    <li><a href="#" class="text-gray-700 hover:text-blue-700">PMIS</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <!-- Local Councils Accordion -->
          <div>
            <button @click="toggleAccordion('mobile-councils')" class="flex items-center justify-between w-full text-gray-800 font-medium py-2">
              Local Authorities
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
                Municipal/Town Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-municipal' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-municipal'" class="pl-4 py-2 space-y-1">
                <NuxtLink to="/localAuthorities/Lunchezamanucipal" class="block text-gray-600 hover:text-blue-600 py-1">Lunchenza Municipal Council</NuxtLink>
                <NuxtLink to="/localAuthorities/Karongamunicipal" class="block text-gray-600 hover:text-blue-600 py-1">Karonga Municipal Council</NuxtLink>
                <NuxtLink to="/localAuthorities/Kasungumunicipal" class="block text-gray-600 hover:text-blue-600 py-1">Kasungu Municipal Council</NuxtLink>
                <NuxtLink to="/localAuthorities/Mangochimunicipal" class="block text-gray-600 hover:text-blue-600 py-1">Mangochi Municipal Council</NuxtLink>
              </div>

              <!-- District Councils Section -->
              <button @click="toggleAccordion('mobile-district')" class="flex items-center justify-between w-full text-gray-700 font-medium">
                District Councils
                <svg class="w-4 h-4 transform transition" :class="{ 'rotate-180': activeAccordion === 'mobile-district' }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div v-show="activeAccordion === 'mobile-district'" class="pl-4 py-2 space-y-1">
                <NuxtLink to="/localAuthorities/chikwawa-district" class="block text-gray-600 hover:text-blue-600 py-1">Chikwawa District Council</NuxtLink>
                <NuxtLink to="/localAuthorities/dedzaDistrict" class="block text-gray-600 hover:text-blue-600 py-1">Dedza District Council</NuxtLink>
                <NuxtLink to="/localAuthorities/mulanjeDistrict" class="block text-gray-600 hover:text-blue-600 py-1">Mulanje District Council</NuxtLink>
                <NuxtLink to="/localAuthorities/alldistricts" class="block text-gray-600 hover:text-blue-600 py-1">All District Councils →</NuxtLink>
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
                <li><a href="resourceCenter?tab=0&sub=0" class="text-gray-700 hover:text-blue-700 transition">Press Releases</a></li>
                <li><a href="resourceCenter?tab=0&sub=1" class="text-gray-700 hover:text-blue-700 transition">Success Stories</a></li>
                <li><a href="resourceCenter?tab=0&sub=2" class="text-gray-700 hover:text-blue-700 transition">Speeches</a></li>
                <li><a href="resourceCenter?tab=0&sub=3" class="text-gray-700 hover:text-blue-700 transition">Research & Discussions</a></li>
                <li><a href="resourceCenter?tab=0&sub=4" class="text-gray-700 hover:text-blue-700 transition">Budget Documents</a></li>
                <li><a href="resourceCenter?tab=0&sub=5" class="text-gray-700 hover:text-blue-700 transition">Disbursements</a></li>
                <li><a href="resourceCenter?tab=0&sub=6" class="text-gray-700 hover:text-blue-700 transition">Newsletter</a></li>
                <li><a href="resourceCenter?tab=0&sub=7" class="text-gray-700 hover:text-blue-700 transition">Manuals & Guidelines</a></li>
                <li><a href="resourceCenter?tab=0&sub=8" class="text-gray-700 hover:text-blue-700 transition">Policies & Strategies</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Knowledge Management</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="resourceCenter?tab=3&sub=0" class="text-gray-700 hover:text-blue-700 transition">Image Gallery</a></li>
                <li><a href="resourceCenter?tab=3&sub=1" class="text-gray-700 hover:text-blue-700 transition">Video Library</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Reports</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="resourceCenter?tab=2&sub=0" class="text-gray-700 hover:text-blue-700 transition">Audit Reports</a></li>
                <li><a href="resourceCenter?tab=2&sub=1" class="text-gray-700 hover:text-blue-700 transition">Financial Reports</a></li>
                <li><a href="resourceCenter?tab=2&sub=2" class="text-gray-700 hover:text-blue-700 transition">Financial Statements</a></li>
                <li><a href="resourceCenter?tab=2&sub=3" class="text-gray-700 hover:text-blue-700 transition">LAPA Synthesis</a></li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Project Documents</h4>
              <ul class="pl-2 space-y-2">
                <li><a href="resourceCenter?tab=1&sub=0" class="text-gray-700 hover:text-blue-700 transition">SSRLP</a></li>
                <li><a href="resourceCenter?tab=1&sub=1" class="text-gray-700 hover:text-blue-700 transition">GESD</a></li>
                <li><a href="resourceCenter?tab=1&sub=2" class="text-gray-700 hover:text-blue-700 transition">RCRP 2</a></li>
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
                  <button @click="navigateToOpportunities('jobs')" class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group">
                    <svg class="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Jobs Portal
                  </button>
                </li>
                <li>
                  <a href="/opportunities" class="flex items-center text-gray-700 hover:text-blue-700 transition group">
                    <svg class="w-5 h-5 mr-2 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Applicant Registration
                  </a>
                </li>
              </ul>
              
              <h4 class="font-semibold text-blue-800 mt-3">Business Opportunities</h4>
              <ul class="pl-2 space-y-2">
                <li>
                  <button @click="navigateToOpportunities('procurement')" class="w-full text-left flex items-center text-gray-700 hover:text-blue-700 transition group">
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

          <!-- Simple mobile menu items -->
          <NuxtLink to="/contact#address" class="text-gray-800 font-medium py-2">Contact Us</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const activeMegaMenu = ref(null);
const activeAccordion = ref(null);
const showSearch = ref(false);
const searchQuery = ref('');

// Get the current route
const route = useRoute();

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