<template>
  <div class="home-page bg-white">
  <!-- Hero Section with Responsive Video Background -->
<section class="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] overflow-hidden">
  <div class="absolute inset-0 bg-black/30 z-10"></div>
  <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
    <source src="/public/video/video1.mp4" type="video/mp4">
    <img src="https://picsum.photos/1920/1080" alt="Hero background" class="w-full h-full object-cover">
  </video>
</section>


    <!-- Stats Bar -->
    <section class="bg-primary-600 text-white py-8 shadow-lg bg-gradient-to-r from-blue-400 to-blue-200">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="stat in stats" :key="stat.label" class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold tracking-wide">{{ stat.value }}</div>
            <div class="text-sm uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative bg-white overflow-hidden">
  <!-- Parallax Background -->
  <div class="absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-10"></div>

  <div class="container mx-auto px-6 relative z-10">
    <!-- Mandate Content -->
    <div class="max-w-4xl mx-auto text-center space-y-8 mb-16">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg">
        <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
        Our <span class="text-primary-600">Mandate</span>
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        To ensure effective financial management and service delivery at the local government level
        through strategic funding, oversight, and support mechanisms in line with national goals.
      </p>
    </div>

    <!-- Vision, Mission, Values, Goals Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <!-- Vision Card -->
      <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-6 flex flex-col">
        <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-white rounded-xl shadow-sm">
          <svg class="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
        <p class="text-gray-600 text-sm">
          A financially autonomous and accountable local government system that delivers quality services to citizens.
        </p>
      </div>

      <!-- Mission Card -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 flex flex-col">
        <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-white rounded-xl shadow-sm">
          <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
        <p class="text-gray-600 text-sm">
          To facilitate and manage fiscal transfers and provide technical support to local authorities for improved governance and service delivery.
        </p>
      </div>

      <!-- Core Values Card -->
      <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-md p-6 flex flex-col">
        <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-white rounded-xl shadow-sm">
          <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Core Values</h3>
        <ul class="list-disc list-inside text-gray-600 text-sm space-y-1">
          <li>Integrity</li>
          <li>Transparency</li>
          <li>Accountability</li>
          <li>Inclusiveness</li>
        </ul>
      </div>

      <!-- Strategic Goals Card -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 flex flex-col">
        <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-white rounded-xl shadow-sm">
          <svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 10c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Strategic Goals</h3>
        <p class="text-gray-600 text-sm">
          Drive innovation, ensure equitable resource distribution, and strengthen institutional capacity at the local level.
        </p>
      </div>

    </div>
  </div>
</section>



   

      <!-- BBC-Style Blog/News Section -->
<section class="py-20 md:py-24 bg-white border-t border-gray-200">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
        <span class="border-b-4 border-red-600 pb-2">Latest Updates</span>
      </h2>
      <a href="#" class="text-sm font-medium text-red-600 hover:text-red-800 flex items-center">
        View all news
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>

    <!-- Featured Story (BBC Headline Style) -->
    <div class="mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="relative h-96 overflow-hidden rounded-lg">
            <img src="https://picsum.photos/1200/800?random=31" alt="Featured story" 
                 class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <span class="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full mb-3">
                Breaking
              </span>
              <h3 class="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                <a href="#" class="hover:underline">Major Policy Shift Announced for Local Government Funding</a>
              </h3>
              <p class="text-lg mb-4">The new framework will change how funds are allocated to districts starting next fiscal year.</p>
              <div class="flex items-center text-sm">
                <span class="mr-4">2 hours ago</span>
                <span>Politics</span>
              </div>
            </div>
          </div>
          <!-- Most Read Slider -->
<!-- Most Read Slider (Auto-scroll) -->
<div class="mb-1 pt-10">
  <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Most read</h3>
  <div id="mostReadSlider" class="overflow-x-auto">
    <div class="flex space-x-6 pb-4 snap-x snap-mandatory scroll-pl-4 overflow-x-auto transition-all duration-500">
      
      <!-- Most Read Item 1 -->
      <div class="flex-shrink-0 w-80 snap-start bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex items-start">
          <span class="text-2xl font-bold text-gray-300 mr-4">1</span>
          <div>
            <h4 class="text-lg font-bold mb-2">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">Annual Budget Allocation Breakdown</a>
            </h4>
            <div class="flex items-center text-xs text-gray-500">
              <span>2 days ago</span>
              <span class="mx-2">•</span>
              <span>Finance</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Repeat for items 2 to 4... -->
      <!-- Item 2 -->
      <div class="flex-shrink-0 w-80 snap-start bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex items-start">
          <span class="text-2xl font-bold text-gray-300 mr-4">2</span>
          <div>
            <h4 class="text-lg font-bold mb-2">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">Controversy Over New Tax Measures</a>
            </h4>
            <div class="flex items-center text-xs text-gray-500">
              <span>3 days ago</span>
              <span class="mx-2">•</span>
              <span>Politics</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex-shrink-0 w-80 snap-start bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex items-start">
          <span class="text-2xl font-bold text-gray-300 mr-4">3</span>
          <div>
            <h4 class="text-lg font-bold mb-2">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">Success Stories: Rural Development Projects</a>
            </h4>
            <div class="flex items-center text-xs text-gray-500">
              <span>5 days ago</span>
              <span class="mx-2">•</span>
              <span>Development</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item 4 -->
      <div class="flex-shrink-0 w-80 snap-start bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex items-start">
          <span class="text-2xl font-bold text-gray-300 mr-4">4</span>
          <div>
            <h4 class="text-lg font-bold mb-2">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">New Guidelines for Project Proposals</a>
            </h4>
            <div class="flex items-center text-xs text-gray-500">
              <span>1 week ago</span>
              <span class="mx-2">•</span>
              <span>Guidelines</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


        </div>
        

        <!-- Secondary Featured Stories -->
        <div class="space-y-6">
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-bold mb-3">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">New Training Program Launches for Local Officials</a>
            </h3>
            <p class="text-gray-600 mb-2">Capacity building initiative aims to improve financial management at the grassroots level.</p>
            <div class="flex items-center text-sm text-gray-500">
              <span>5 hours ago</span>
              <span class="mx-2">•</span>
              <span>Education</span>
            </div>
          </div>

          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-xl font-bold mb-3">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">Quarterly Report Shows Improvement in Service Delivery</a>
            </h3>
            <p class="text-gray-600 mb-2">Latest metrics indicate progress in healthcare and education access.</p>
            <div class="flex items-center text-sm text-gray-500">
              <span>Yesterday</span>
              <span class="mx-2">•</span>
              <span>Reports</span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-3">
              <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">Interview: Director Discusses Challenges in Rural Funding</a>
            </h3>
            <p class="text-gray-600 mb-2">Exclusive conversation about equitable resource distribution.</p>
            <div class="flex items-center text-sm text-gray-500">
              <span>2 days ago</span>
              <span class="mx-2">•</span>
              <span>Interviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More News Grid -->
    <div class="mb-1">
      <h3 class="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">More updates</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- News Item 1 -->
        <div class="border-b border-gray-200 pb-6">
          <div class="h-48 overflow-hidden rounded-lg mb-4">
            <img src="https://picsum.photos/600/400?random=32" alt="News thumbnail" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <span class="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded mb-2">Analysis</span>
          <h4 class="text-lg font-bold mb-2">
            <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">How Local Governments Are Adapting to Climate Change</a>
          </h4>
          <p class="text-gray-600 text-sm mb-3">A look at innovative approaches to resilience planning in vulnerable communities.</p>
          <div class="flex items-center text-xs text-gray-500">
            <span>3 days ago</span>
            <span class="mx-2">•</span>
            <span>Environment</span>
          </div>
        </div>

        <!-- News Item 2 -->
        <div class="border-b border-gray-200 pb-6">
          <div class="h-48 overflow-hidden rounded-lg mb-4">
            <img src="https://picsum.photos/600/400?random=33" alt="News thumbnail" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <span class="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded mb-2">Press Release</span>
          <h4 class="text-lg font-bold mb-2">
            <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">New Partnership to Boost Digital Infrastructure</a>
          </h4>
          <p class="text-gray-600 text-sm mb-3">Collaboration with tech firms aims to modernize record-keeping systems.</p>
          <div class="flex items-center text-xs text-gray-500">
            <span>4 days ago</span>
            <span class="mx-2">•</span>
            <span>Technology</span>
          </div>
        </div>

        <!-- News Item 3 -->
        <div class="border-b border-gray-200 pb-6">
          <div class="h-48 overflow-hidden rounded-lg mb-4">
            <img src="https://picsum.photos/600/400?random=34" alt="News thumbnail" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <span class="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded mb-2">Opinion</span>
          <h4 class="text-lg font-bold mb-2">
            <a href="#" class="text-gray-900 hover:text-red-600 hover:underline">The Future of Decentralized Governance</a>
          </h4>
          <p class="text-gray-600 text-sm mb-3">Expert perspectives on the evolving role of local authorities in national development.</p>
          <div class="flex items-center text-xs text-gray-500">
            <span>1 week ago</span>
            <span class="mx-2">•</span>
            <span>Opinion</span>
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
            Featured <span class="text-primary-600">Projects</span>
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
              <div class="flex items-center justify-center w-14 h-14 mb-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path :d="project.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-white/90 mb-4 line-clamp-2">{{ project.description }}</p>
              <a
                :href="project.url"
                class="inline-flex items-center text-sm font-medium text-white group-hover:text-primary-300 transition"
              >
                Learn more
                <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <button class="px-8 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition">
            View All Projects
          </button>
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


     <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16">
          <span class="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full mb-4">
            Have Questions?
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span class="text-primary-600">Questions</span>
          </h2>
          <p class="max-w-2xl mx-auto text-gray-600">
            Find answers to common questions about our programs and services.
          </p>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" 
               class="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
               :class="{ 'shadow-md': activeFaq === index }">
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none">
              <h3 class="text-lg font-medium text-gray-900">{{ faq.question }}</h3>
              <svg class="w-5 h-5 text-gray-500 transition-transform duration-200" 
                   :class="{ 'rotate-180': activeFaq === index }" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="activeFaq === index" class="px-6 pb-6 pt-0 text-gray-600">
              <p>{{ faq.answer }}</p>
              <div v-if="faq.link" class="mt-4">
                <a :href="faq.link.url" class="text-primary-600 hover:underline font-medium">
                  {{ faq.link.text }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200 text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p class="text-gray-600 mb-6">Contact our support team for more information.</p>
          <button class="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
 
 


    <!-- Partners Section -->
 <section class="py-16 bg-white border-t border-gray-200">
      <div class="container mx-auto px-6">
        <h2 class="text-xl font-semibold text-center text-gray-800 mb-12">
          Trusted By <span class="text-primary-600">Leading</span> Organizations
        </h2>
        <div class="flex flex-wrap justify-center gap-8 md:gap-12">
          <img
            v-for="(partner, index) in partners"
            :key="index"
            :src="partner"
            :alt="`Partner ${index + 1}`"
            class="h-12 object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stats = ref([
  { value: '150+', label: 'Local Authorities' },
  { value: '$85B', label: 'Funds Disbursed' },
  { value: '24', label: 'States Covered' },
  { value: '98%', label: 'Satisfaction Rate' }
])

const activeTab = ref('procurements')
const activeFaq = ref(0)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}



onMounted(() => {
  const slider = document.getElementById('mostReadSlider')
  if (!slider) return

  let scrollAmount = 0
  const scrollStep = 320

  setInterval(() => {
    if (!slider) return

    scrollAmount += scrollStep

    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0
    }

    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }, 4000)
})
// Core values
const coreValues = [
  { iconPath: "M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: 'text-primary-500', text: 'Transparency' },
  { iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: 'text-primary-500', text: 'Accountability' },
  { iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", color: 'text-primary-500', text: 'Integrity' },
  { iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: 'text-primary-500', text: 'Inclusiveness' },
  { iconPath: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", color: 'text-primary-500', text: 'Service Excellence' }
]

// Projects
const projects = [
  {
    title: 'SSRP',
    description: 'Social Support for Resilient Livelihoods Project focuses on reducing poverty and enhancing resilience in vulnerable communities through targeted interventions and capacity building.',
    iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    url: '/projects/ssrp'
  },
  {
    title: 'GESD',
    description: 'Governance to Enable Service Delivery Project aims to improve local government capacity and citizen service access through institutional strengthening and policy reforms.',
    iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    url: '/projects/gesd'
  },
  {
    title: 'RCRP2',
    description: 'The second phase of the Climate Resilience Project supports districts in disaster preparedness and mitigation through infrastructure development and community training.',
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    url: '/projects/rcrp2'
  }
]

// Publications
const publications = ref([
  { title: '2024 Annual Report and Financial Statements', date: '2024-12-31', file: '/pdfs/annual-report-2024.pdf' },
  { title: 'Q1 Monitoring and Evaluation Brief', date: '2024-03-30', file: '/pdfs/q1-brief-2024.pdf' },
  { title: 'Local Authority Financial Management Handbook', date: '2023-11-10', file: '/pdfs/handbook-2023.pdf' },
  { title: 'Comprehensive Financial Audit Summary Report', date: '2023-08-15', file: '/pdfs/audit-summary-2023.pdf' },
  { title: 'Development Budget Review and Analysis', date: '2023-06-01', file: '/pdfs/budget-review-2023.pdf' }
])

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




// Partners
const partners = [
  'https://picsum.photos/200/100?random=1',
  'https://picsum.photos/200/100?random=2',
  'https://picsum.photos/200/100?random=3',
  'https://picsum.photos/200/100?random=4',
  'https://picsum.photos/200/100?random=5',
  'https://picsum.photos/200/100?random=6',
  'https://picsum.photos/200/100?random=7',
  'https://picsum.photos/200/100?random=8'
]

// Blog posts
const blogPosts = ref([
  {
    title: 'Enhancing Financial Accountability in Local Governments',
    excerpt: 'Learn how our new initiative is improving transparency and financial management across 24 states.',
    category: 'News',
    date: '2024-05-15',
    readTime: '5 min',
    image: 'https://picsum.photos/600/400?random=21'
  },
  {
    title: 'Success Story: How One Community Transformed Their Services',
    excerpt: 'Discover the journey of a local government that achieved remarkable service delivery improvements.',
    category: 'Case Study',
    date: '2024-04-28',
    readTime: '8 min',
    image: 'https://picsum.photos/600/400?random=22'
  },
  {
    title: 'Upcoming Training Workshops for Local Government Officials',
    excerpt: 'Register now for our capacity building programs scheduled for Q3 2024.',
    category: 'Announcement',
    date: '2024-04-10',
    readTime: '3 min',
    image: 'https://picsum.photos/600/400?random=23'
  }
])

// FAQs
const faqs = ref([
  {
    question: 'How does the fund disbursement process work?',
    answer: 'Our fund disbursement follows a structured quarterly process where local governments submit their financial reports and service delivery metrics. After review and approval, funds are transferred directly to the designated accounts with clear guidelines for utilization.',
    link: {
      text: 'View disbursement guidelines',
      url: '/disbursement-guidelines'
    }
  },
  {
    question: 'What criteria are used to evaluate local government performance?',
    answer: 'We evaluate based on five key performance indicators: financial accountability, service delivery metrics, project completion rates, citizen satisfaction surveys, and compliance with reporting requirements.'
  },
  {
    question: 'How can my local government apply for additional funding?',
    answer: 'Additional funding opportunities are announced through our quarterly bulletins. Eligible local governments can submit proposals through our online portal, which are then evaluated by our technical committee.',
    link: {
      text: 'Access funding portal',
      url: '/funding-portal'
    }
  },
  {
    question: 'What technical support do you provide to local governments?',
    answer: 'We offer capacity building workshops, financial management tools, technical advisory services, and monitoring support to help local governments improve their systems and service delivery.'
  },
  {
    question: 'How can citizens track fund utilization in their communities?',
    answer: 'All fund utilization reports are published on our public portal. Citizens can also attend quarterly town hall meetings where local governments present their financial reports and project updates.',
    link: {
      text: 'Visit transparency portal',
      url: '/transparency'
    }
  }
])
</script>

<style scoped>
.home-page {
  scroll-behavior: smooth;
}

.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>