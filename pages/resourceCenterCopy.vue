<script>
definePageMeta({
    title: 'Resource Center' // This will be available in route.meta.title
   })
</script>

<template>
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
    <!-- Left Sidebar -->
    <div class="w-64 bg-gray-100 border-r p-4">
      <div v-for="(tab, tabIndex) in tabs" :key="tabIndex" class="mb-2">
        <button
          @click="toggleTab(tabIndex)"
          class="w-full text-left py-2 px-3 font-semibold rounded hover:bg-gray-100 hover:border-l-4 hover:border-gray-500 transition-all duration-200"
          :class="{ 
            'bg-gray-400 border-l-4 border-gray-600': expandedTab === tabIndex,
            'border-l-4 border-transparent': expandedTab !== tabIndex
          }"
        >
          {{ tab.name }}
        </button>

        <div v-if="expandedTab === tabIndex" class="ml-4 mt-1">
          <button
            v-for="(sub, subIndex) in tab.subcategories"
            :key="subIndex"
            @click="selectSub(tabIndex, subIndex)"
            class="block w-full text-left py-1 px-2 rounded hover:bg-gray-300 hover:border-l-4 hover:border-gray-500 transition-all duration-200"
            :class="{ 
              'bg-gray-500 text-white border-l-4 border-gray-700': activeTab === tabIndex && activeSub === subIndex,
              'border-l-4 border-transparent': !(activeTab === tabIndex && activeSub === subIndex)
            }"
          >
            {{ sub.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-4">
      <section v-if="displayedDocuments.length">
        <h3 class="font-bold text-gray-800 text-lg mb-6">{{ currentTitle }}</h3>
        
        <!-- Video Grid Layout -->
        <div v-if="currentSubcategoryType === 'Video'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div class="aspect-video">
              <iframe
                :src="getVideoEmbedUrl(doc.link)"
                class="w-full h-full"
                frameborder="0"
                allowfullscreen
                :title="doc.name"
              ></iframe>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-gray-800 mb-2">{{ doc.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ doc.description }}</p>
              <span class="inline-block text-xs bg-red-100 text-red-800 rounded px-2 py-1">
                {{ doc.type }}
              </span>
            </div>
          </div>
        </div>

        <!-- Image Gallery Grid Layout -->
        <div v-else-if="currentSubcategoryType === 'Image Gallery'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            @click="openImageModal(doc)"
          >
            <div class="aspect-square overflow-hidden">
              <img
                :src="doc.link"
                :alt="doc.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-3">
              <h4 class="font-semibold text-gray-800 text-sm mb-1">{{ doc.name }}</h4>
              <p class="text-xs text-gray-600">{{ doc.description }}</p>
              <span class="inline-block text-xs bg-green-100 text-green-800 rounded px-2 py-1 mt-2">
                {{ doc.type }}
              </span>
            </div>
          </div>
        </div>

        <!-- Audio Clips Grid Layout -->
        <div v-else-if="currentSubcategoryType === 'Audio Clips'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12h6m-6 0v3a3 3 0 003 3h6a3 3 0 003-3v-3m-6 0V9a3 3 0 00-3-3H9a3 3 0 00-3 3v3z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">{{ doc.name }}</h4>
                <span class="inline-block text-xs bg-purple-100 text-purple-800 rounded px-2 py-1">
                  {{ doc.type }}
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ doc.description }}</p>
            <audio controls class="w-full">
              <source :src="doc.link" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        <!-- Default Document Grid Layout -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="relative bg-white rounded-2xl border-b-4 border-gray-200 shadow-sm hover:border-blue-500 transition duration-300 p-4 flex flex-col justify-between group"
          >
            <a
              :href="doc.link"
              target="_blank"
              class="absolute bottom-2 right-2 w-5 h-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
              title="Download / View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
              </svg>
            </a>

            <div class="flex items-center mb-3">
              <img
                v-if="doc.thumbnail"
                :src="doc.thumbnail"
                alt="Thumbnail"
                class="w-12 h-12 rounded-lg object-cover mr-2"
              />
              <div>
                <h3 class="font-bold text-gray-800 text-lg">{{ doc.name }}</h3>
                <span class="inline-block text-xs bg-gray-200 rounded px-2 py-0.5 mt-1 text-gray-700">
                  {{ doc.type }}
                </span>
              </div>
            </div>

            <p class="text-sm text-gray-600">
              {{ doc.description || 'No description available.' }}
            </p>
            <p class="text-sm text-gray-600">
              {{ doc.date || 'No date available.' }}
            </p>
          </div>
        </div>
      </section>
      <div v-else class="text-gray-600">Select a subcategory to view content.</div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="closeImageModal">
      <div class="relative max-w-4xl max-h-screen p-4">
        <button
          @click="closeImageModal"
          class="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <img
          :src="selectedImage.link"
          :alt="selectedImage.name"
          class="max-w-full max-h-full object-contain"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 class="font-semibold">{{ selectedImage.name }}</h3>
          <p class="text-sm">{{ selectedImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabs = ref([
  {
    name: 'Publications & Downloads',
    subcategories: [
      {
        name: 'Press Releases',
        contents: [
          {
            name: 'Press Release Jan 2025',
            link: '/downloads/press-jan2025.pdf',
            type: 'PDF',
            description: 'Summary of January 2025 press release.',
            date: '22 Jan 2025'
          },
          {
            name: 'Press Release Jan 2025',
            link: '/downloads/press-jan2025.pdf',
            type: 'PDF',
            description: 'Summary of January 2025 press release.',
            date: '22 Jan 2025'
          },
          {
            name: 'Press Release Mar 2025',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Summary of March 2025 press release.',
            date: '22 Jan 2025'
          },
          {
            name: 'Press Release Mar 2025',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Summary of March 2025 press release.',
            date: '22 Jan 2025'
          }
        ]
      },
      {
        name: 'Success Stories',
        contents: [
          {
            name: 'Community Success 1',
            link: '/downloads/success1.pdf',
            type: 'PDF',
            description: 'Summary of community success story 1.',
            date: '22 Jan 2025'
          },
          {
            name: 'Community Success 2',
            link: '/downloads/success2.pdf',
            type: 'PDF',
            description: 'Summary of community success story 2.',
            date: '22 Jan 2025'
          },  
          {
            name: 'Community Success 3',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of community success story 3.',
            date: '22 Jan 2025'              
          } 
        ]
      },
      {
        name: 'Newsletters & Magazines',
        contents: [
          {
            name: 'Monthly Newsletter - Jan 2025',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from January 2025 newsletter.'
          },
          {
            name: 'Quarterly Magazine - Q1 2025',
            link: '/downloads/magazine-q1-2025.pdf',
            type: 'PDF',
            description: 'In-depth articles from Q1 2025 magazine.'
          },
          {
            name: 'Annual Report 2024',
            link: '/downloads/annual-report-2024.pdf',
            type: 'PDF',
            description: 'Comprehensive overview of 2024 activities.'
          }
        ]
      },
      {
        name: 'Manuals and Guidelines',
        contents: []
      }
    ]
  },
  {
    name: 'Project Documents',
    subcategories: [
      { name: 'SSRLP', contents: [
        {
          name: 'SSRLP Report 2025',
          link: '/downloads/ssrlp-report-2025.pdf',
          type: 'PDF',
          description: 'SSRLP annual report for 2025.'
        },
        {
          name: 'SSRLP Guidelines',
          link: '/downloads/ssrlp-guidelines.pdf',
          type: 'PDF',
          description: 'Guidelines for SSRLP project implementation.'
        }
      ] },
      { name: 'GESD', contents: [
        {
          name: 'GESD Plan 2025',
          link: '/downloads/gesd-plan-2025.pdf',
          type: 'PDF',
          description: 'GESD strategic plan for 2025.'
        }
      ] },
      { name: 'RCRP', contents: [
        {
          name: 'RCRP Overview',
          link: '/downloads/rcrp-overview.pdf',
          type: 'PDF',
          description: 'Overview of the RCRP project.'
        },
        {
          name: 'RCRP Implementation Guide',
          link: '/downloads/rcrp-guide.pdf',
          type: 'PDF',
          description: 'Implementation guide for RCRP projects.'
        }
      ] },
      { name: 'GESD name', contents: [
        {
          name: 'GESD Project Overview',
          link: '/downloads/gesd-overview.pdf',
          type: 'PDF',
          description: 'Overview of the GESD project.'
        },
        {
          name: 'GESD Implementation Guide',
          link: '/downloads/gesd-guide.pdf',
          type: 'PDF',
          description: 'Implementation guide for GESD projects.'
        }
      ] },
      { name: 'RCRP', contents: [
        {
          name: 'RCRP Project Overview',
          link: '/downloads/rcrp-overview.pdf',
          type: 'PDF',
          description: 'Overview of the RCRP project.'
        },
        {
          name: 'RCRP Implementation Guide',
          link: '/downloads/rcrp-guide.pdf',
          type: 'PDF',
          description: 'Implementation guide for RCRP projects.'
        }
      ] }
    ]
  },
  {
    name: 'Reports',
    subcategories: [
      { name: 'Downloadable Reports', contents: [
        {
          name: 'Annual Report 2024',
          link: '/downloads/annual-report-2024.pdf',
          type: 'PDF',
          description: 'Comprehensive overview of 2024 activities.'
        },
        {
          name: 'Monthly Report - Jan 2025',
          link: '/downloads/monthly-report-jan2025.pdf',
          type: 'PDF',
          description: 'Highlights from January 2025 monthly report.'
        }
      ] },
      { name: 'Research Reports', contents: [
        {
          name: 'Research Report 2024',
          link: '/downloads/research-report-2024.pdf',
          type: 'PDF',
          description: 'In-depth analysis of research conducted in 2024.'
        },
        {
          name: 'Impact Assessment 2025',
          link: '/downloads/impact-assessment-2025.pdf',
          type: 'PDF',
          description: 'Assessment of project impacts for 2025.'
        }
      ] },
      { name: 'Policies and Strategies', contents: [
        {
          name: 'Policy Framework 2025',
          link: '/downloads/policy-framework-2025.pdf',
          type: 'PDF',
          description: 'Framework for policy implementation in 2025.'
        },
        {
          name: 'Strategic Plan 2025',
          link: '/downloads/strategic-plan-2025.pdf',
          type: 'PDF',
          description: 'Strategic plan outlining goals and objectives for 2025.'
        } 
      ] }
    ]
  },
  {
    name: 'Knowledge Management Portal',
    subcategories: [
      { name: 'Image Gallery', contents: [
        {
          name: 'Community Event Photos',
          link: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
          type: 'Image',
          description: 'Photos from community events and gatherings.'
        },
        {
          name: 'Project Launch Images',
          link: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
          type: 'Image',
          description: 'Images from project launch events and ceremonies.'
        },
        {
          name: 'Team Building Activities',
          link: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
          type: 'Image',
          description: 'Photos from team building and collaborative activities.'
        },
        {
          name: 'Workshop Sessions',
          link: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
          type: 'Image',
          description: 'Images from educational workshops and training sessions.'
        }
      ] },
      { name: 'Audio Clips', contents: [
        {
          name: 'Community Voices Podcast Episode 1',
          link: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
          type: 'Audio',
          description: 'First episode of the Community Voices podcast featuring local leaders.'
        },
        {
          name: 'Project Update Audio Clip',
          link: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
          type: 'Audio',
          description: 'Audio update on recent project developments and milestones.'
        },
        {
          name: 'Interview with Stakeholders',
          link: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
          type: 'Audio',
          description: 'Interviews with key stakeholders discussing project impact.'
        }
      ] },
      { name: 'Video', contents: [
        {
          name: 'Community Success Story Video',
          link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'Video',
          description: 'Video showcasing a transformative community success story.'
        },
        {
          name: 'Project Impact Documentary',
          link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'Video',
          description: 'Documentary highlighting the lasting impact of recent community projects.'
        },
        {
          name: 'Training Workshop Recording',
          link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'Video',
          description: 'Recording of an educational workshop on sustainable development practices.'
        }
      ] }
    ]
  }
]);

const expandedTab = ref(null);
const activeTab = ref(null);
const activeSub = ref(null);
const selectedImage = ref(null);

function toggleTab(index) {
  expandedTab.value = expandedTab.value === index ? null : index;
  if (expandedTab.value === null) {
    activeTab.value = null;
    activeSub.value = null;
  }
}

function selectSub(tabIndex, subIndex) {
  activeTab.value = tabIndex;
  activeSub.value = subIndex;
}

function openImageModal(image) {
  selectedImage.value = image;
}

function closeImageModal() {
  selectedImage.value = null;
}

function getVideoEmbedUrl(url) {
  // Convert YouTube URLs to embed format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url; // Return original URL if not YouTube
}

const displayedDocuments = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return tabs.value[activeTab.value].subcategories[activeSub.value].contents || [];
  }
  return [];
});

const currentTitle = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return `${tabs.value[activeTab.value].name} - ${tabs.value[activeTab.value].subcategories[activeSub.value].name}`;
  }
  return '';
});

const currentSubcategoryType = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return tabs.value[activeTab.value].subcategories[activeSub.value].name;
  }
  return '';
});
</script>

<style scoped>
/* Only bottom border changes on hover already handled with border-b-4 hover:border-blue-500 */
/* You can remove other borders if you'd like completely bottom-only look: */
/* .group { border: none; border-bottom-width: 4px; } */
</style>