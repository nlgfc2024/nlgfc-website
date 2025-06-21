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
          class="w-full text-left py-2 px-3 font-semibold rounded hover:bg-gray-300"
          :class="{ 'bg-gray-400': expandedTab === tabIndex }"
        >
          {{ tab.name }}
        </button>

        <div v-if="expandedTab === tabIndex" class="ml-4 mt-1">
          <button
            v-for="(sub, subIndex) in tab.subcategories"
            :key="subIndex"
            @click="selectSub(tabIndex, subIndex)"
            class="block w-full text-left py-1 px-2 rounded hover:bg-gray-300"
            :class="{ 'bg-gray-500 text-white': activeTab === tabIndex && activeSub === subIndex }"
          >
            {{ sub.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-4">
      <section v-if="displayedDocuments.length">
        <h3 class="font-bold text-gray-800 text-lg">{{ currentTitle }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="relative bg-white rounded-2xl border-b-4 border-gray-200 shadow-sm hover:border-blue-500 transition duration-300 p-4 flex flex-col justify-between group"
          >
            <a
              :href="doc.link"
              target="_blank"
              class="absolute bottom-2 right-2 text-blue-600 hover:text-border-gray-600"
              title="Download / View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
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
          </div>
        </div>
      </section>
      <div v-else class="text-gray-500">Select a subcategory to view content.</div>
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
            description: 'Summary of January 2025 press release.'
          },
          {
            name: 'Press Release Jan 2025',
            link: '/downloads/press-jan2025.pdf',
            type: 'PDF',
            description: 'Summary of January 2025 press release.'
          },
          {
            name: 'Press Release Mar 2025',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Summary of March 2025 press release.'
          },
          {
            name: 'Press Release Mar 2025',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Summary of March 2025 press release.'
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
            description: 'Summary of community success story 1.'
          },
          {
            name: 'Community Success 2',
            link: '/downloads/success2.pdf',
            type: 'PDF',
            description: 'Summary of community success story 2.'
          },  
          {
            name: 'Community Success 3',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of community success story 3.'
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
          link: '/downloads/gallery-community-event.jpg',
          type: 'Image',
          description: 'Photos from community events.'
        },
        {
          name: 'Project Launch Images',
          link: '/downloads/gallery-project-launch.jpg',
          type: 'Image',
          description: 'Images from project launch events.'
        }
      ] },
      { name: 'Audio Clips', contents: [
        {
          name: 'Community Voices Podcast Episode 1',
          link: '/downloads/podcast-episode1.mp3',
          type: 'Audio',
          description: 'First episode of the Community Voices podcast.'
        },
        {
          name: 'Project Update Audio Clip',
          link: '/downloads/project-update-audio.mp3',
          type: 'Audio',
          description: 'Audio update on recent project developments.'
        }
      ] },
      { name: 'Video', contents: [
        {
          name: 'Community Success Story Video',
          link: '/downloads/community-success-video.mp4',
          type: 'Video',
          description: 'Video showcasing a community success story.'
        },
        {
          name: 'Project Impact Documentary',
          link: '/downloads/project-impact-documentary.mp4',
          type: 'Video',
          description: 'Documentary on the impact of recent projects.'
        }
      ] }
    ]
  }
]);

const expandedTab = ref(null);
const activeTab = ref(null);
const activeSub = ref(null);

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
</script>

<style scoped>
/* Only bottom border changes on hover already handled with border-b-4 hover:border-blue-500 */
/* You can remove other borders if you'd like completely bottom-only look: */
/* .group { border: none; border-bottom-width: 4px; } */
</style>




