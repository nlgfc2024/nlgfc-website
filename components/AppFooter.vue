<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Column 1: Organization Info -->
        <div>
          <div class="flex items-center mb-4">
            <img src="/images/logo/NLGFC-Logo.png" alt="NLGFC Logo" class="h-10 w-auto">
            <span class="ml-2 text-xl font-bold">NLGFC</span>
          </div>
          <p class="text-gray-400 text-sm mb-4">
            National Local Government Finance Committee<br>
            Dedicated to fiscal decentralization and local governance
          </p>
          <div class="flex space-x-4">
            <a href="https://web.facebook.com/nlgfc" class="text-gray-400 hover:text-white transition">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://x.com/nlgfc_mw" 
              class="text-gray-400 hover:text-white transition">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/nlgfc_mw/" class="text-gray-400 hover:text-white transition">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/nlgfc-malawi/" 
              class="text-gray-400 hover:text-white transition"
              aria-label="Visit our LinkedIn page">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@nlgfcmalawi2455?sub_confirmation=1" class="text-gray-400 hover:text-white transition">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-1">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-white transition text-sm">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-white transition text-sm">About Us</NuxtLink></li>
            <li><NuxtLink to="/projects/currentProjects" class="text-gray-400 hover:text-white transition text-sm">Projects</NuxtLink></li>
            <li><NuxtLink to="/localAuthorities/alldistricts" class="text-gray-400 hover:text-white transition text-sm">Local Councils</NuxtLink></li>
            <li><NuxtLink to="/resourceCenter" class="text-gray-400 hover:text-white transition text-sm">Resource Centre</NuxtLink></li>
            <li><NuxtLink to="/opportunities" class="text-gray-400 hover:text-white transition text-sm">Opportunities</NuxtLink></li>
            
          </ul>
        </div>

        <!-- Column 3: Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-3 text-gray-400 text-sm">
            <li class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>National Local Government Finance Committee
                <br>Red Cross Complex, Area 14 <br>
                P.O Box 31162 <br>Capital City, Lilongwe 3, Malawi</span>
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +265 891 003 313 | +265 891 003 314
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              ed@nlgfc.gov.mw | kmcd@nlgfc.gov.mw
            </li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-gray-400 text-sm mb-4">
            Subscribe to receive updates on our projects, procurement notices, and reports.
          </p>
          <form class="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="px-4 py-2 rounded-md focus:outline-none text-white text-sm"
              required
            >
            <button 
              type="submit" 
              class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs">
        <p>&copy; NLGFC 2025. All rights reserved. | <a href="#" class="hover:text-white transition">Privacy Policy</a> | <a href="#" class="hover:text-white transition">Terms of Use</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>