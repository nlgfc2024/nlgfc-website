<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Slider Section (New) -->
    <section class="relative overflow-hidden h-[360px] md:h-[420px]">
      <div
        v-for="(article, index) in featuredArticles"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
      >
        <!-- Background image with overlay -->
        <div class="absolute inset-0">
          <img :src="article.image || '/images/samples/news1.jpg'" :alt="article.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <!-- Content -->
        <div class="relative h-full flex flex-col justify-end z-10 pb-12">
          <div class="container mx-auto px-6">
            <div class="mb-3">
              <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                Latest News
              </span>
            </div>
            <div class="max-w-3xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ article.title }}</h2>
              <p class="text-white/90 text-lg">{{ article.summary }}</p>
              <div class="flex items-center mt-4 text-white/80">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm">{{ formatDate(article.date) }} • {{ article.source }}</span>
              </div>
            </div>
            <div class="mt-5">
              
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
        <div class="container mx-auto px-6 flex items-center justify-between">
          <!-- Indicators -->
          <div class="flex space-x-2">
            <button
              v-for="(article, idx) in featuredArticles"
              :key="'ind-' + idx"
              @click="goToSlide(idx)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
            ></button>
          </div>
          <!-- Arrows + autoplay -->
          <div class="flex items-center space-x-4">
            <button @click="toggleAutoplay" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              </svg>
            </button>
            <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- News Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content Area -->
        <div class="lg:w-2/3">
          <!-- Single Article View -->
          <div v-if="selectedArticle">
            <!-- Back Button -->
            <button 
              @click="goBack" 
              class="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to News
            </button>
    
            <!-- Article Content -->
            <article class="bg-white rounded-lg shadow-lg overflow-hidden">
              <!-- Featured Image -->
              <div v-if="selectedArticle.image" class="aspect-video w-full">
                <img 
                  :src="selectedArticle.image" 
                  :alt="selectedArticle.title"
                  class="w-full h-full object-cover"
                />
              </div>
    
              <!-- Article Header -->
              <div class="p-8">
                <div class="flex items-center justify-between mb-4">
                  <time class="text-gray-500 text-sm">{{ formatDate(selectedArticle.date) }}</time>
                </div>
    
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {{ selectedArticle.title }}
                </h1>
    
                <div class="flex items-center mb-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p class="font-medium text-gray-900">{{ selectedArticle.author }}</p>
                      <p class="text-sm text-gray-500">{{ selectedArticle.source }}</p>
                    </div>
                  </div>
                </div>
    
                <!-- Article Content -->
                <div class="prose max-w-none" v-html="selectedArticle.content"></div>
    
                <!-- Tags -->
                <div v-if="selectedArticle.tags" class="mt-8 pt-6 border-t border-gray-200">
                  <div class="flex flex-wrap gap-2">
                    <span class="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                    <span 
                      v-for="tag in selectedArticle.tags" 
                      :key="tag"
                      class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
    
                <!-- Share Section -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                  <div class="flex space-x-4">
                    <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      Twitter
                    </button>
                    <button class="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    <button class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Default Content When No Article Selected -->
          <div v-else class="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Our News Center</h2>
            <p class="text-gray-600 mb-6">Select a news article from the sidebar to read the full story.</p>
            <div class="text-gray-400">
              <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              <p class="text-sm">Click on any article title to start reading</p>
            </div>
          </div>
        </div>

        <!-- Right Sidebar - News List -->
        <div class="lg:w-1/3">
          <div class="sticky top-4">
            <!-- Search Bar -->
            <div class="mb-6">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search news..."
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
                <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <!-- News List -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gray-900 text-white px-6 py-4">
                <h3 class="text-lg font-semibold">Latest News</h3>
                <p class="text-emerald-100 text-sm">{{ filteredArticles.length }} articles</p>
              </div>
              
              <div class="max-h-96 overflow-y-auto">
                <div 
                  v-for="article in filteredArticles" 
                  :key="article.id"
                  @click="selectArticle(article)"
                  :class="[
                    'p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50',
                    selectedArticle?.id === article.id ? 'bg-emerald-50 border-l-4 border-l-gray-900' : ''
                  ]"
                >
                  <h4 class="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                    {{ article.title }}
                  </h4>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>{{ formatDate(article.date) }}</span>
                    <span>{{ article.source }}</span>
                  </div>
                </div>
              </div>

              <!-- No Results Message -->
              <div v-if="filteredArticles.length === 0" class="p-6 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 12.272 5.13 11.638 5 11a8 8 0 118 8 7.956 7.956 0 01-4.709-1.534A7.956 7.956 0 0112 21a7.956 7.956 0 01-4.709-1.534"></path>
                </svg>
                <p class="text-sm">No articles found matching your search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
    title: 'NLGFC - News & Updates',
    })

import { ref, computed, onMounted, onUnmounted, onBeforeUnmount, watch } from 'vue'

// Reactive data
const selectedArticle = ref(null)
const searchQuery = ref('')

// Slider state
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

// Sample news data
const newsArticles = ref([
  {
    id: 1,
    title: 'Government Launches New Rural Development Initiative',
    summary: 'The new program aims to improve infrastructure and access to clean water in several key districts, with funding secured from international partners.',
    content: `
      <p>The Government of Malawi has announced the launch of a comprehensive rural development initiative that promises to transform the lives of thousands of citizens across multiple districts. This ambitious program, funded through partnerships with international development organizations, focuses on critical infrastructure improvements and enhanced access to clean water.</p>
      
      <p>The initiative, which has been in planning for over two years, will target rural communities that have historically faced challenges in accessing basic services. Key components include:</p>
      
      <ul>
        <li>Construction of new water points and rehabilitation of existing boreholes</li>
        <li>Road infrastructure improvements to connect remote villages</li>
        <li>Solar-powered community centers for education and health services</li>
        <li>Agricultural support programs for smallholder farmers</li>
      </ul>
      
      <p>Minister of Local Government announced that the program will be implemented over a three-year period, with the first phase targeting five districts in the northern region. The initiative represents a significant investment in rural infrastructure and is expected to directly benefit over 50,000 households.</p>
      
      <p>"This program represents our commitment to ensuring that no Malawian is left behind in our development agenda," said the Minister during the launch ceremony. "By improving infrastructure and access to basic services, we are creating opportunities for economic growth and improved quality of life in rural areas."</p>
    `,
    image: '/images/samples/news1.jpg',
    date: '2025-08-15',
    author: 'Sarah Mwale',
    source: 'Malawi News Agency',
    tags: ['Rural Development', 'Infrastructure', 'Water', 'Government']
  },
  {
    id: 2,
    title: 'NLGFC Announces Increased Funding for Local Councils',
    summary: 'In a move to bolster local governance, the National Local Government Finance Committee has approved a 15% budget increase for all district councils for the next fiscal year.',
    content: `
      <p>The National Local Government Finance Committee (NLGFC) has announced a significant 15% increase in funding allocation for all district councils across Malawi for the upcoming fiscal year. This decision marks the largest single-year increase in local government funding in over a decade.</p>
      
      <p>The increased allocation is designed to strengthen local governance capacity and improve service delivery at the grassroots level. District councils will have greater resources to address local priorities and respond more effectively to community needs.</p>
      
      <p>Key areas that will benefit from the increased funding include:</p>
      
      <ul>
        <li>Primary healthcare facilities and equipment</li>
        <li>Education infrastructure and learning materials</li>
        <li>Road maintenance and rural connectivity projects</li>
        <li>Water and sanitation programs</li>
        <li>Agricultural extension services</li>
      </ul>
      
      <p>The NLGFC Chairman emphasized that the increase comes with enhanced accountability measures to ensure funds are used effectively and transparently. All councils will be required to submit quarterly progress reports and undergo regular audits.</p>
    `,
    image: '/images/samples/news2.jpg',
    date: '2025-08-12',
    author: 'James Banda',
    source: 'The Daily Times',
    tags: ['NLGFC', 'Funding', 'Local Government', 'Budget']
  },
  {
    id: 3,
    title: 'Blantyre City Council Unveils New Waste Management Strategy',
    summary: 'A new comprehensive strategy for waste management was unveiled today, focusing on recycling and community participation to create a cleaner city.',
    content: `
      <p>Blantyre City Council has launched an innovative waste management strategy that aims to revolutionize how the commercial capital handles solid waste. The comprehensive plan emphasizes community participation, recycling initiatives, and sustainable waste disposal methods.</p>
      
      <p>The new strategy introduces several groundbreaking components including community-based waste collection systems, establishment of recycling centers in each of the city's 30 wards, and partnerships with private sector players in waste management.</p>
      
      <p>Mayor John Chimbwandira outlined the key pillars of the strategy during the launch event at the Civic Centre. The initiative includes:</p>
      
      <ul>
        <li>Door-to-door waste collection services in all residential areas</li>
        <li>Installation of modern waste sorting facilities</li>
        <li>Public awareness campaigns on waste reduction and recycling</li>
        <li>Establishment of community composting sites</li>
        <li>Strict enforcement of waste management bylaws</li>
      </ul>
      
      <p>The Council has allocated K2.5 billion for the first phase of implementation, which will run for 18 months. Citizens are encouraged to participate actively in the program by properly sorting their waste and utilizing designated collection points.</p>
    `,
    image: '/images/samples/news3.jpg',
    date: '2025-08-10',
    author: 'Grace Phiri',
    source: 'Blantyre City Council',
    tags: ['Waste Management', 'Blantyre', 'Environment', 'Recycling']
  },
  {
    id: 4,
    title: 'New Healthcare Initiative Launched in Northern Region',
    summary: 'A comprehensive healthcare program targeting maternal and child health has been launched in five northern districts.',
    content: `<p>A new healthcare initiative focusing on maternal and child health has been launched in the northern region, targeting five key districts. The program aims to reduce maternal and infant mortality rates through improved access to quality healthcare services and community health education programs.</p>
    
    <p>The initiative includes the establishment of new health centers, training of community health workers, and provision of essential medical equipment and supplies. Special focus is being placed on remote areas that have historically had limited access to healthcare services.</p>
    
    <p>Dr. Mary Kamanga, who is leading the program implementation, emphasized the importance of community participation in ensuring the success of the initiative. "We are not just building facilities, we are building a healthcare system that works for everyone," she said during the launch ceremony.</p>`,
    image: '/images/samples/news1.jpg',
    date: '2025-08-08',
    author: 'Dr. Mary Kamanga',
    source: 'Ministry of Health',
    tags: ['Healthcare', 'Northern Region', 'Maternal Health']
  },
  {
    id: 5,
    title: 'Education Sector Receives Technology Boost',
    summary: 'Government partners with tech companies to provide digital learning tools to rural schools.',
    content: `<p>The education sector has received a significant technology boost with the government partnering with leading technology companies to provide digital learning tools to rural schools across the country. This initiative aims to bridge the digital divide and ensure that students in remote areas have access to modern learning resources.</p>
    
    <p>The program will see the installation of solar-powered computer labs in 200 rural schools over the next two years. Each lab will be equipped with tablets, educational software, and internet connectivity to enable students to access online learning materials.</p>
    
    <p>Peter Mvula from the Ministry of Education highlighted that this represents a major step forward in modernizing education delivery in Malawi. Teachers will also receive training on how to effectively integrate technology into their teaching methods.</p>`,
    image: '/images/samples/news2.jpg',
    date: '2025-08-05',
    author: 'Peter Mvula',
    source: 'Ministry of Education',
    tags: ['Education', 'Technology', 'Rural Schools']
  },
  {
    id: 6,
    title: 'Agricultural Support Program Shows Promising Results',
    summary: 'Early indicators suggest the new agricultural support program is improving crop yields across the country.',
    content: `<p>The agricultural support program launched earlier this year is showing promising results, with early indicators suggesting significant improvements in crop yields across participating districts. The program focuses on providing farmers with improved seeds, fertilizers, and training on modern farming techniques.</p>
    
    <p>Initial assessments conducted in pilot areas show an average increase of 30% in maize production and 45% in legume crops. The success is attributed to the comprehensive approach that combines input provision with farmer education and extension services.</p>
    
    <p>Agnes Msukwa from the Ministry of Agriculture noted that the program's success demonstrates the importance of supporting smallholder farmers with both resources and knowledge. Plans are underway to expand the program to additional districts in the next growing season.</p>`,
    image: '/images/samples/news3.jpg',
    date: '2025-08-03',
    author: 'Agnes Msukwa',
    source: 'Ministry of Agriculture',
    tags: ['Agriculture', 'Crop Yields', 'Support Program']
  }
])

// Computed properties
const filteredArticles = computed(() => {
  let filtered = newsArticles.value
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return filtered
})

// Get featured articles for slider (first 3 articles)
const featuredArticles = computed(() => filteredArticles.value.slice(0, 3))

// Slider methods
const nextSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length
  resetAutoplay()
}

const prevSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value - 1 + featuredArticles.value.length) % featuredArticles.value.length
  resetAutoplay()
}

const goToSlide = (index) => {
  if (!featuredArticles.value.length) return
  currentSlide.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    startAutoplay()
  }
}

const startAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer)
    autoplayTimer = setInterval(() => {
      nextSlide()
    }, autoplayInterval.value)
  }
}

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value
  if (autoplay.value) startAutoplay()
  else clearInterval(autoplayTimer)
}

// Methods
const selectArticle = (article) => {
  selectedArticle.value = article
  // Update URL with hash instead of path parameter
  window.location.hash = article.id.toString()
  // Scroll to top on mobile/tablet
  if (window.innerWidth < 1024) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goBack = () => {
  selectedArticle.value = null
  // Clear the hash
  window.location.hash = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '')
  if (hash) {
    const articleId = parseInt(hash)
    const article = newsArticles.value.find(a => a.id === articleId)
    if (article) {
      selectedArticle.value = article
    }
  } else {
    selectedArticle.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  // Check if we have a hash in the URL
  handleHashChange()
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
  
  // Start autoplay for slider
  startAutoplay()
})

onUnmounted(() => {
  // Clean up event listener
  window.removeEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  // Clean up autoplay timer
  clearInterval(autoplayTimer)
})

// Watch for changes in selected article to stop/start autoplay
watch(selectedArticle, (newVal) => {
  if (newVal) {
    // Stop autoplay when viewing an article
    clearInterval(autoplayTimer)
  } else {
    // Restart autoplay when back to main view
    startAutoplay()
  }
})

</script>