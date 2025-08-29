<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';

// --- 1. CENTRAL DATABASE FOR ALL COUNCILS ---
// The keys (e.g., 'blantyreCouncil') MUST EXACTLY MATCH the 'to' prop in your NuxtLink components.
const councilDatabase = {
  
  'lilongwecitycouncil': {
    name: 'Lilongwe City Council',
    profile: {
      about: 'As the capital city of Malawi, Lilongwe is the center of government and diplomacy. The Lilongwe City Council manages the rapid urban growth and development of this key administrative hub.',
      mandate: [
        'To facilitate urban and rural development planning and implementation.',
        'To provide essential services to residents and businesses.',
        'To promote local economic development through strategic partnerships.'
      ],
      vision: 'The vision of the district is “A self- reliant district with growing socio-economic development.',
      coreValues: [ 'Accountability', 'Professionalism', 'Inclusivity' ]
    },
   
    projectStats: [
        { id: 'SSRLP', name: 'Social Support For Resilient Livelihood Program',
         stats: [{ label: 'Enrolled households', 
         value: '15,000' },
          { label: 'Beneficiaries of Social Cash', value: '2,500' }], 
          logo: '/images/samples/SSRLP logo(1).jpg' },
          {
    id: 'GESD',
    name: 'Governance to Enable Service Delivery',
    stats: [
      { label: 'Active Projects', value: '7' },
      { label: 'Wards Reached', value: '45' }
    ],
    logo: '/images/samples/PBG logo.png'
  },
  {
    id: 'RCRP2',
    name: 'Resilient and Climate Ready Project Phase 2',
    stats: [
      { label: 'Communities Served', value: '30' },
      { label: 'Adaptation Plans Developed', value: '15' }
    ],
    logo: '/images/samples/RCRP LOGO- Final.png'
  }
    ],
    reports: [
        { title: 'Lilongwe Annual Performance Report 2024',
         type: 'Annual Report', 
         date: '2024-12-18' },
        { title: 'Lilongwe Urban Structure Plan',
         type: 'Strategic Plan', 
         date: '2023-02-10' }
    ],
    newsArticles: [
        { id: 2, title: 'NLGFC Announces Increased Funding for Local Councils',
         summary: 'The National Local Government Finance Committee has approved a 15% budget increase for all district councils.', 
         content: `<p>The National Local Government Finance Committee (NLGFC) has announced a significant 15% increase...</p>`,
          image: '/images/samples/news2.jpg', 
          date: '2025-08-12',
           author: 'James Banda',
            source: 'The Daily Times',
             tags: ['NLGFC','Funding', 'Local Government'] },
             { id: 2, title: 'NLGFC Announces Increased Funding for Local Councils',
         summary: 'The National Local Government Finance Committee has approved a 15% budget increase for all district councils.', 
         content: `<p>The National Local Government Finance Committee (NLGFC) has announced a significant 15% increase...</p>`,
          image: '/images/samples/news2.jpg', 
          date: '2025-08-12',
           author: 'James Banda',
            source: 'The Daily Times',
             tags: ['NLGFC','Funding', 'Local Government'] },
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
  }
             
    ]
  },
  
  
};

// --- 2. DYNAMIC DATA LOADING & PAGE SETUP ---
const route = useRoute();
const councilSlug = computed(() => route.params.slug);
const councilData = computed(() => councilDatabase[councilSlug.value]);

// Handle cases where the council doesn't exist in our database
if (!councilData.value) {
  showError({ statusCode: 404, statusMessage: 'Council Page Not Found' });
}

// Set the page title dynamically
useHead({
  title: computed(() => `${councilData.value?.name || 'Local Council'} `)
});

// Create computed properties to reactively access the current council's data
const profile = computed(() => councilData.value?.profile || {});
const projects = computed(() => councilData.value?.projects || []);
const projectStats = computed(() => councilData.value?.projectStats || []);
const reports = computed(() => councilData.value?.reports || []);
const newsArticles = computed(() => councilData.value?.newsArticles || []);

// --- 3. COMPONENT LOGIC ---
const activeTab = ref('landing_page');
const selectedProject = ref(null);
const selectedArticle = ref(null);
const searchQuery = ref('');
const isTransitioning = ref(false);

const tabs = computed(() => [
  { id: 'landing_page', title: `${councilData.value?.name || ''}` },
  { id: 'profile', title: 'Profile' },
  { id: 'projects', title: 'Projects' },
  { id: 'reports', title: 'Reports' },
  { id: 'news', title: 'News' }
]);

const switchTab = (tabId) => {
  if (tabId === activeTab.value) return;
  isTransitioning.value = true;
  activeTab.value = tabId;
  // Clear selections when switching main tabs
  selectedProject.value = null;
  selectedArticle.value = null;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 150);
};

const showProjectDetails = (projectId) => {
  const allProjects = [...projects.value, ...projectStats.value];
  const projectToShow = allProjects.find(p => p.id === projectId);
  if (projectToShow) {
      // Find the full project details from the `projects` array
      selectedProject.value = projects.value.find(p => p.id === projectId);
      switchTab('projects');
  }
};

const currentSlide = ref(0);
let autoplayTimer = null;

const filteredArticles = computed(() => {
  let filtered = newsArticles.value || [];
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query)
    );
  }
  return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const featuredArticles = computed(() => filteredArticles.value.slice(0, 3));

const nextSlide = () => {
  if (featuredArticles.value.length > 1) {
    currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length;
  }
};

const prevSlide = () => {
  if (featuredArticles.value.length > 1) {
    currentSlide.value = (currentSlide.value - 1 + featuredArticles.value.length) % featuredArticles.value.length;
  }
};

const goToSlide = (index) => {
  if (featuredArticles.value.length) {
    currentSlide.value = index;
  }
};

const startAutoplay = () => {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, 5000);
};

const selectArticle = (article) => {
  selectedArticle.value = article;
  switchTab('news');
};

const goBack = () => {
  selectedArticle.value = null;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  clearInterval(autoplayTimer);
});

// Reset state when the route changes to a different council
watch(councilSlug, () => {
    activeTab.value = 'landing_page';
    selectedProject.value = null;
    selectedArticle.value = null;
    searchQuery.value = '';
    currentSlide.value = 0;
    startAutoplay();
});

</script>

<template>
  <div v-if="councilData" class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Sidebar Navigation -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="sticky top-8 border-r border-gray-200 pr-4">
          <ul class="space-y-1">
            <li v-for="tab in tabs" :key="tab.id">
              <a
                href="#"
                @click.prevent="switchTab(tab.id)"
                class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                :class="{ 'bg-blue-50 text-gray-800 font-medium border-l-4 border-l-gray-600': activeTab === tab.id }"
              >
                {{ tab.title }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
        <!-- Landing Page Tab -->
        <div v-show="activeTab === 'landing_page'" class="prose max-w-none">
          <div class="max-w-7xl mx-auto">
            <div class="space-y-10">
              <section class="relative overflow-hidden rounded-xl shadow-2xl h-[360px] md:h-[420px]">
                <div v-for="(slide, index) in featuredArticles" :key="index" class="absolute inset-0 transition-opacity duration-1000 ease-in-out" :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }">
                  <div class="absolute inset-0">
                    <img :src="slide.image || '/images/samples/news1.jpg'" :alt="slide.title" class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div class="relative h-full flex flex-col justify-end z-10 pb-12">
                    <div class="px-6">
                      <div class="mb-3">
                        <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                          Featured
                        </span>
                      </div>
                      <div class="max-w-3xl">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ slide.title }}</h2>
                        <p class="text-white/90">{{ slide.summary }}</p>
                      </div>
                      <div class="mt-5">
                        <a href="#" @click.prevent="selectArticle(slide)" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gray-800/50 hover:bg-gray-800 transition">
                          Read More
                          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
                  <div class="px-6 flex items-center justify-between">
                    <div class="flex space-x-2">
                      <button v-for="(slide, idx) in featuredArticles" :key="'ind-' + idx" @click="goToSlide(idx)" class="w-3 h-3 rounded-full transition-all duration-300" :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"></button>
                    </div>
                    <div class="flex items-center space-x-4">
                      <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section class="grid md:grid-cols-3 gap-6">
                <article v-for="(article, nIdx) in newsArticles.slice(1, 4)" :key="'rel-'+nIdx" class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div class="aspect-w-16 aspect-h-9">
                    <img :src="article.image || '/images/samples/news1.jpg'" :alt="article.title" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                  </div>
                  <div class="p-5">
                    <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {{ formatDate(article.date) }}
                    </span>
                    <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <a href="#" @click.prevent="selectArticle(article)">{{ article.title }}</a>
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ article.summary }}</p>
                    <a href="#" @click.prevent="selectArticle(article)" class="mt-3 inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read more
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  </div>
                </article>
              </section>
              <section class="mt-10">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Ongoing Projects Key Statistics</h3>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div v-for="project in projectStats" :key="project.id" class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer" @click="showProjectDetails(project.id)">
                    <div class="flex items-center gap-4 mb-4">
                      <img :src="project.logo" :alt="project.name + ' Logo'" class="w-12 h-12 flex-shrink-0" />
                      <div>
                        <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">{{ project.id }}</span>
                        <p class="text-sm font-medium text-gray-700">{{ project.name }}</p>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <div v-for="stat in project.stats" :key="stat.label" class="flex justify-between items-center bg-white p-4 rounded-lg shadow-inner border border-blue-100">
                        <span class="text-sm font-semibold text-gray-600">{{ stat.label }}</span>
                        <span class="text-lg font-bold text-blue-600">{{ stat.value }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Profile Tab -->
        <div v-show="activeTab === 'profile'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{{ councilData.name }} Profile</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                About {{ councilData.name }}
              </h3>
              <p class="text-gray-700 leading-relaxed">{{ profile.about }}</p>
            </div>
            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" /></svg>
                Mandate
              </h3>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in profile.mandate" :key="item" class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Vision
              </h3>
              <p class="text-gray-700 leading-relaxed font-medium">"{{ profile.vision }}"</p>
            </div>
            <div class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                Core Values
              </h3>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in profile.coreValues" :key="item" class="flex items-start">
                  <span class="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Projects Tab -->
        <div v-show="activeTab === 'projects'" class="prose max-w-none">
           <div v-if="selectedProject">
             <button @click="selectedProject = null" class="mb-4 inline-flex items-center text-blue-600 hover:underline transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
               Back to All Projects
             </button>
             <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
               <div class="flex justify-between items-start mb-4">
                 <div>
                   <h2 class="text-2xl font-bold text-gray-900">{{ selectedProject.fullName }}</h2>
                   <p class="text-gray-600 font-medium">{{ selectedProject.name }}</p>
                 </div>
                 <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                   {{ selectedProject.status }}
                 </span>
               </div>
               <p class="text-gray-700 mb-4">{{ selectedProject.description }}</p>
               <div>
                 <h4 class="font-semibold text-gray-900 mb-2">Key Objectives:</h4>
                 <ul class="space-y-1">
                   <li v-for="objective in selectedProject.objectives" :key="objective" class="flex items-start">
                     <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                     <span class="text-gray-700">{{ objective }}</span>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
           <div v-else>
             <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Projects in {{ councilData.name }}</h2>
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="project in projectStats" :key="project.id" class="p-6 rounded-xl border border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer" @click="showProjectDetails(project.id)">
                    <div class="flex items-center gap-4 mb-4">
                      <img :src="project.logo" :alt="project.name + ' Logo'" class="w-12 h-12 flex-shrink-0" />
                      <div>
                        <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">{{ project.id }}</span>
                        <p class="text-sm font-medium text-gray-700">{{ project.name }}</p>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <div v-for="stat in project.stats" :key="stat.label" class="flex justify-between items-center bg-white p-4 rounded-lg shadow-inner border border-blue-100">
                        <span class="text-sm font-semibold text-gray-600">{{ stat.label }}</span>
                        <span class="text-lg font-bold text-blue-600">{{ stat.value }}</span>
                      </div>
                    </div>
                </div>
             </div>
           </div>
         </div>

        <!-- Reports Tab -->
        <div v-show="activeTab === 'reports'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Reports & Documents</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="report in reports" :key="report.title" class="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <div class="flex-grow">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ report.title }}</h3>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {{ report.type }}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">Published: {{ formatDate(report.date) }}</span>
                <button class="px-4 py-2 bg-emerald-700 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download
                </button>
              </div>
            </div>
             <div v-if="!reports.length" class="md:col-span-3 text-center py-10 text-gray-500">No reports available.</div>
          </div>
        </div>

        <!-- News Tab -->
        <div v-show="activeTab === 'news'" class="prose max-w-none bg-gray-50 -m-8 p-8">
          <div class="container mx-auto">
              <div class="mb-6">
                  <div class="relative">
                    <input v-model="searchQuery" type="text" placeholder="Search news..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"/>
                    <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
              </div>
              <div v-if="selectedArticle">
                <button @click="goBack" class="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                  Back to News
                </button>
                <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div v-if="selectedArticle.image" class="aspect-video w-full">
                    <img :src="selectedArticle.image" :alt="selectedArticle.title" class="w-full h-full object-cover"/>
                  </div>
                  <div class="p-8">
                    <time class="text-gray-500 text-sm">{{ formatDate(selectedArticle.date) }}</time>
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 my-2">{{ selectedArticle.title }}</h1>
                    <div class="flex items-center mb-6">
                        <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <p class="font-medium text-gray-900">{{ selectedArticle.author }}</p>
                          <p class="text-sm text-gray-500">{{ selectedArticle.source }}</p>
                        </div>
                    </div>
                    <div class="prose max-w-none" v-html="selectedArticle.content"></div>
                  </div>
                </article>
              </div>
              <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gray-900 px-6 py-2">
                  <p class="text-emerald-100 text-sm font-semibold">{{ filteredArticles.length }} News Articles</p>
                </div>
                <div class="max-h-[600px] overflow-y-auto">
                  <div v-for="article in filteredArticles" :key="article.id" @click="selectArticle(article)" :class="['p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50', selectedArticle?.id === article.id ? 'bg-emerald-50 border-l-4 border-l-gray-900' : '']">
                    <h4 class="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2">{{ article.title }}</h4>
                    <div class="flex items-center justify-between text-xs text-gray-500">
                      <span>{{ formatDate(article.date) }}</span>
                      <span>{{ article.source }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="filteredArticles.length === 0" class="p-6 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 12.272 5.13 11.638 5 11a8 8 0 118 8 7.956 7.956 0 01-4.709-1.534A7.956 7.956 0 0112 21a7.956 7.956 0 01-4.709-1.534"></path></svg>
                  <p class="text-sm">No articles found matching your search.</p>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
