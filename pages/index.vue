<script setup>
useHead({
  title: 'NLGFC - Home',
  meta: [
    { name: 'description', content: 'Welcome to our website' }
  ]
});
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
      <!-- Projects Section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">Our Work</span>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our key initiatives creating lasting impact
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- SSRP Card -->
            <a href="/projects/ssrp" class="group transform hover:-translate-y-1 transition-transform duration-300">
              <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100 hover:border-blue-200">
                <div class="w-28 h-28 mb-6 rounded-full bg-blue-50 flex items-center justify-center p-4 group-hover:bg-blue-100 transition-colors shadow-inner">
                  <!-- Replace with actual SSRP logo -->
                  <img src="/public/images/samples/SSRLP logo(1).jpg" alt="SSRP Logo" class="w-full h-full object-contain" loading="lazy">
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">SSRP</h3>
                <p class="text-gray-600 mb-6">Social Support for Resilient Project</p>
                <div class="mt-auto pt-4 border-t border-gray-100 w-full">
                  <span class="text-blue-600 font-medium flex items-center justify-center">
                    View project
                    <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            <!-- GESD Card -->
            <a href="/projects/gesd" class="group transform hover:-translate-y-1 transition-transform duration-300">
              <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100 hover:border-green-200">
                <div class="w-28 h-28 mb-6 rounded-full bg-green-50 flex items-center justify-center p-4 group-hover:bg-green-100 transition-colors shadow-inner">
                  <!-- Replace with actual GESD logo -->
                  <img src="/images/samples/PBG logo.png" alt="GESD Logo" class="w-full h-full object-contain" loading="lazy">
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">GESD</h3>
                <p class="text-gray-600 mb-6">Governance to Enable Service Deliver Project</p>
                <div class="mt-auto pt-4 border-t border-gray-100 w-full">
                  <span class="text-green-600 font-medium flex items-center justify-center">
                    View project
                    <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            <!-- RCRP2 Card -->
            <a href="/projects/rcrp2" class="group transform hover:-translate-y-1 transition-transform duration-300">
              <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100 hover:border-amber-200">
                <div class="w-28 h-28 mb-6 rounded-full bg-amber-50 flex items-center justify-center p-4 group-hover:bg-amber-100 transition-colors shadow-inner">
                  <!-- Replace with actual RCRP2 logo -->
                  <img src="/images/samples/RCRP LOGO- Final.png" alt="RCRP2 Logo" class="w-full h-full object-contain" loading="lazy">
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">RCRP2</h3>
                <p class="text-gray-600 mb-6">Regional Climate Resilience Project 2</p>
                <div class="mt-auto pt-4 border-t border-gray-100 w-full">
                  <span class="text-amber-600 font-medium flex items-center justify-center">
                    View project
                    <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div class="text-center mt-12">
            <a href="/projects/currentProjects" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-300 shadow-sm hover:shadow-md">
              Explore All Projects
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      <!-- Publications Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Recent Publications Column -->
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Recent Publications</h2>
              <div class="space-y-6">
                <!-- Publication Item 1 -->
                <div class="border-b border-gray-100 pb-4">
                  <h3 class="font-semibold text-lg text-gray-800 mb-1">Annual Impact Report 2023</h3>
                  <p class="text-gray-600 text-sm mb-2">Published: May 15, 2024</p>
                  <p class="text-gray-700 mb-3">Comprehensive review of our organization's achievements and financial performance last year.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF →</a>
                </div>
                
                <!-- Publication Item 2 -->
                <div class="border-b border-gray-100 pb-4">
                  <h3 class="font-semibold text-lg text-gray-800 mb-1">Community Development Guidelines</h3>
                  <p class="text-gray-600 text-sm mb-2">Published: March 28, 2024</p>
                  <p class="text-gray-700 mb-3">Best practices for sustainable community engagement and development.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Read More →</a>
                </div>
                
                <!-- Publication Item 3 -->
                <!-- <div>
                  <h3 class="font-semibold text-lg text-gray-800 mb-1">Policy Brief: Education Reform</h3>
                  <p class="text-gray-600 text-sm mb-2">Published: February 10, 2024</p>
                  <p class="text-gray-700 mb-3">Analysis and recommendations for improving education access in rural areas.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details →</a>
                </div> -->
              </div>
            </div>
            
            <!-- Recent Opportunities Column -->
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Recent Opportunities</h2>
              <div class="space-y-6">
                <!-- Job Opportunity -->
                <div class="border-b border-gray-100 pb-4">
                  <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-lg text-gray-800">Program Manager</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Job</span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">Deadline: June 30, 2024</p>
                  <p class="text-gray-700 mb-3">Lead our flagship community development program in the Eastern Region.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Apply Now →</a>
                </div>
                
                <!-- Procurement Opportunity -->
                <div class="border-b border-gray-100 pb-4">
                  <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-lg text-gray-800">IT Equipment Supply</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Procurement</span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">Deadline: July 15, 2024</p>
                  <p class="text-gray-700 mb-3">Bid for supplying laptops and tablets for our education initiative.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View Tender →</a>
                </div>
                
                <!-- Job Opportunity -->
                <!-- <div>
                  <div class="flex justify-between items-start mb-1">
                    <h3 class="font-semibold text-lg text-gray-800">Monitoring & Evaluation Officer</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Job</span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">Deadline: June 25, 2024</p>
                  <p class="text-gray-700 mb-3">Join our team to measure and analyze program effectiveness.</p>
                  <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Apply Now →</a>
                </div> -->
              </div>
            </div>
          </div>
          
          <!-- View All Link -->
          <div class="text-center mt-10">
            <a href="#" class="inline-block px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              View All Publications & Opportunities
            </a>
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
            <div class="overflow-hidden py-4">
              <div class="flex gap-6 animate-scroll hover:pause">
                <!-- Partner Items (duplicated for seamless looping) -->
                <div class="flex shrink-0 gap-6">
                  <!-- Partner 1 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/Ireland_Std_Colour.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 2 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/gizlogo-unternehmen-de-rgb-300.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 3 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/EU normal-reproduction-high-resolution.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 4 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/Embassy of Iceland logo.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 5 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/Cooperation logo.bmp" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 6 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/New EU logo.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 7 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/New EU logo.PNG" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 8 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/UK AID - Standard - 4C PNG.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 9 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/USaid logo Horizontal RGB_JPEG.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 10 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/USAID Logo Vertical RGB_JPEG.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 11 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/WB-WBG-horizontal-RGB (1).jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                </div>
                
                <!-- Duplicate slides for seamless looping -->
                <div class="flex shrink-0 gap-6" aria-hidden="true">
                  <!-- Partner 1 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/Ireland_Std_Colour.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 2 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/gizlogo-unternehmen-de-rgb-300.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 3 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/EU normal-reproduction-high-resolution.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 4 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/Embassy of Iceland logo.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 5 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/Cooperation logo.bmp" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 6 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/New EU logo.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 7 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/New EU logo.PNG" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 8 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/images/partners/UK AID - Standard - 4C PNG.png" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 9 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/USaid logo Horizontal RGB_JPEG.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 10 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/USAID Logo Vertical RGB_JPEG.jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  <!-- Partner 11 -->
                  <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-32 w-48">
                    <img src="/public/images/partners/WB-WBG-horizontal-RGB (1).jpg" alt="Partner Logo" class="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" loading="lazy">
                  </div>
                  
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Optional View All Button -->
          <div class="text-center mt-12">
            <a href="/partners" class="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
              View All Partners
              <svg class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>


<style scoped>
    @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-100% - 1.5rem)); } /* 1.5rem = gap-6 */
  }
  .animate-scroll {
    animation: scroll 20s linear infinite;
    width: calc(200% + 1.5rem); /* Double width + gap */
  }
  .hover\:pause:hover {
    animation-play-state: paused;
  }

</style>
