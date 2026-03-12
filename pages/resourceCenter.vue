<template>
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-screen-2xl">
    <!-- Left Sidebar -->
    <div class="w-full md:w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 self-start">
      <div>
        <h2 class="text-xl font-bold text-gray-800 mb-6">Resource Center</h2>
        <nav class="space-y-2">
          <!-- Loop through main groups -->
          <div v-for="(groupItem, groupIndex) in resourceGroups" :key="groupIndex" class="group">
            <div
              @click="handleGroupClick(groupIndex)"
              class="flex items-center justify-between w-full text-left py-3 px-4 font-medium text-gray-700 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-gray-900"
              :class="{
                'bg-emerald-50 border-2 border-emerald-200 text-emerald-700': expandedGroup === groupIndex || activeGroup === groupIndex,
                'hover:translate-x-1': expandedGroup !== groupIndex
              }"
            >
              <span class="flex items-center">
                 <!-- Icon for the group -->
                <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                {{ groupItem.group }}
              </span>
               <!-- Chevron icon for expanding/collapsing, shown only if there are subgroups -->
              <svg
                v-if="groupItem.subgroups"
                :class="{ 'rotate-90': expandedGroup === groupIndex }"
                class="w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out"
                fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <!-- Subgroups container -->
            <div v-if="expandedGroup === groupIndex && groupItem.subgroups" class="pl-6 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
              <a
                  v-for="(subgroup, subIndex) in groupItem.subgroups"
                  :key="subIndex"
                  @click.stop="selectSubgroup(groupIndex, subIndex)"
                  class="flex items-center w-full text-left py-2 px-4 text-sm font-medium text-gray-600 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-2"
                  :class="{
                  'bg-emerald-50 border-2 border-emerald-200 text-emerald-700 shadow-sm': activeGroup === groupIndex && activeSubgroup === subIndex
                }"
              >
                <div class="w-2 h-2 rounded-full mr-3 transition-colors duration-200"
                     :class="{
                       'bg-emerald-600': activeGroup === groupIndex && activeSubgroup === subIndex,
                       'bg-gray-300 group-hover:bg-gray-600': !(activeGroup === groupIndex && activeSubgroup === subIndex)
                     }">
                </div>
                {{ subgroup.subgroup }}
              </a>
            </div>
          </div>
        </nav>
         <!-- Help Section -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-emerald-700 mb-2">Need Help?</h3>
            <p class="text-xs text-gray-600 mb-3">Contact our support team for assistance with document access or technical issues.</p>
            <button class="w-full text-xs bg-gray-800 hover:bg-gray-600 text-white rounded-md py-2 px-3 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <div class="flex-1 p-4">
      <section v-if="activeGroup !== null">
        <h3 class="font-bold text-gray-600 text-lg mb-6">{{ currentTitle }}</h3>
        <!-- Search Bar Section -->
        <div v-if="activeTab !== null && activeSub !== null" class="mb-8">
            <div class="max-w-md mx-auto lg:max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-600 focus:border-gray-800 transition-colors duration-200"
                    :placeholder="`Search in ${currentTitle}...`"
                    @input="handleSearch"
                />
                <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                      @click="clearSearch"
                      class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Search Results Summary -->
            <div v-if="searchQuery" class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                <span v-if="filteredDocuments.length > 0">
                  Found {{ filteredDocuments.length }} result{{ filteredDocuments.length !== 1 ? 's' : '' }} for "<span class="font-semibold text-emerald-600">{{ searchQuery }}</span>"
                </span>
                <span v-else class="text-red-600">
                  No results found for "<span class="font-semibold">{{ searchQuery }}</span>"
                </span>
              </p>
            </div>
        </div>
        
        <!-- News Layout - Simple List Similar to news.vue -->
        <div v-if="currentDisplayType === 'News'" class="bg-gray-80 rounded-lg shadow-lg overflow-hidden">
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="newsItem in displayedDocuments"
              :key="newsItem.id"
              class="border-b border-gray-100"
            >
              <nuxt-link
                :to="`/news/${newsItem.id}`"
                class="block p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50"
              >
                <h4 class="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                  {{ newsItem.title }}
                </h4>
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>{{ formatDate(newsItem.date) }}</span>
                </div>
              </nuxt-link>
            </div>
          </div>

          <!-- No Results Message -->
          <div v-if="displayedDocuments.length === 0" class="p-6 text-center text-gray-500">
            <svg
              class="w-12 h-12 mx-auto mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 
                  5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 
                  12.272 5.13 11.638 5 11a8 8 0 118 8 
                  7.956 7.956 0 01-4.709-1.534A7.956 7.956 
                  0 0112 21a7.956 7.956 0 01-4.709-1.534"
              ></path>
            </svg>
            <p class="text-sm">No news articles available.</p>
          </div>
        </div>


        <!-- Video Grid Layout -->
        <transition-group
            v-else-if="currentDisplayType === 'Video'"
            name="grid-item"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            appear
        >
          <div
              v-for="(doc, index) in displayedDocuments"
              :key="doc.name"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              :style="{ animationDelay: `${index * 100}ms` }"
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
              <a href="https://www.youtube.com/@nlgfcmalawi2455">
                <p class="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 mb-2">Watch More on NLGFC YouTube Channel</p>
              </a>
              <span class="inline-block text-xs bg-red-100 text-red-600 rounded px-2 py-1">
                {{ doc.type }}
              </span>
            </div>
          </div>
        </transition-group>

        <!-- Image Gallery Iframe Layout -->
        <div
            v-else-if="currentDisplayType === 'Image Gallery'"
            class="w-full">
          <div
              v-for="(doc, index) in displayedDocuments"
              :key="doc.name"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg"
          >
            <!-- Header with gallery info -->
            <div class="bg-gradient-to-r from-gray-900 to-emerald-600 text-white p-4">
              <h4 class="font-semibold text-lg mb-1">{{ doc.name }}</h4>
              <p class="text-emerald-100 text-sm">{{ doc.description }}</p>
              <span class="inline-block text-xs bg-white bg-opacity-20 text-emerald-200 rounded px-2 py-1 mt-2">
                {{ doc.type }}
              </span>
            </div>

            <!-- Iframe container -->
            <div class="relative w-full" style="height: 600px;">
              <iframe
                  :src="doc.link"
                  class="w-full h-full border-0"
                  frameborder="0"
                  :title="doc.name"
                  allowfullscreen
                  loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Default Document Grid Layout -->
        <transition-group
            v-else
            name="grid-item"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            appear
        >
          <div
              v-for="(doc, index) in displayedDocuments"
              :key="doc.name"
              class="relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between group hover:scale-105"
              :style="{ animationDelay: `${index * 100}ms` }"
          >
            <a
                :href="doc.link"
                target="_blank"
                class="absolute bottom-2 right-2 w-8 h-8 bg-gray-800 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
                title="Download / View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
              </svg>
            </a>

            <div class="flex items-center mb-3">
               <!-- Document details -->
              <div>
                <h3 class="font-semibold text-gray-800 text-base">{{ doc.name }}</h3>
                <span class="inline-block text-xs bg-gray-100 border border-gray-200 rounded px-2 py-0.5 mt-1 text-gray-700">
                  {{ doc.type }}
                </span>
              </div>
            </div>

            <p class="text-sm text-gray-600 flex-grow">
              {{ doc.description || 'No description available.' }}
            </p>
            <p class="text-[12px] font-semibold text-emerald-600 mt-3">
              {{ doc.date || 'No date available.' }}
            </p>
          </div>
        </transition-group>
      </section>

      <!-- Loading/Welcome State -->
      <transition name="fade" mode="out-in">
        <div v-if="activeGroup === null" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-16 h-16 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <h3 class="text-xl font-semibold text-gray-700">Welcome to the Resource Center</h3>
          <p class="text-gray-500 mt-2">Please select a category from the left menu to view available documents and resources.</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { link } from '#build/ui';

definePageMeta({
    title: 'NLGFC - Resource Center',
    })

const route = useRoute()


const newsId = route.params.id;

// State management for UI
const expandedGroup = ref(null);
const activeGroup = ref(null);
const activeSubgroup = ref(null);
const searchQuery = ref('');

// Data for the resource center, structured into groups and subgroups with IDs
const resourceGroups = [
  {
    id: 'news',
    group: 'News',
    items: [
        { title: 'Government Launches New Rural Development Initiative', date: '2025-08-15', id: '#1' },
        { title: 'NLGFC Announces Increased Funding for Local Councils', date: '2025-08-12', id: '#2'},
        { title: 'Blantyre City Council Unveils New Waste Management Strategy', date: '2025-08-10', id: '#3' },
        { title: 'New Healthcare Initiative Launched in Northern Region', date: '2025-08-08', id: '#4' },
        { title: 'Education Sector Receives Technology Boost', date: '2025-08-05', id: '#5' },
        { title: 'Agricultural Support Program Shows Promising Results', date: '2025-08-03', id: '#6' }
    ]
  },
  {
    id: 'publications',
    group: 'Publications & Downloads',
    subgroups: [
      {
        id: 'press-releases',
        subgroup: 'Press Releases',
        items: [
          { name: 'Uthenga Wapadera Wa Covid 19 Emergency Cash Transfers', link: '/downloads/ECT_UTHENGA_WAPADERA_WA_COVID_19_LILONGWE_IMMEDIATE_RELEASE_APRIL_19_2020_1.pdf', type: 'PDF', description: 'ECT - Uthenga Wapadera Wa Covid 19 - Lilongwe - Immediate Release', date: '19 April 2020' },
          { name: 'Press Release on Covid-19', link: '/downloads/Councils_Cumulative_funding_figures_for_Publication_April_2020.xlsx', type: 'Excel', description: 'Revised after Governors meetings with MNOS MAMN and MUSCCO', date: '22 Jan 2025' },
        ]
      },
      {
        id: 'success-stories',
        subgroup: 'Success Stories',
        items: [
          { name: 'NLGFC [PWP] Success Stories MASAF IV', link: '/downloads/success1.pdf', type: 'PDF', description: 'NLGFC PWP Success Stories for Booklet-MASAF IV.', date: 'December 2024' },
          { name: 'CS-EPWP Balaka Newsletters', link: '/downloads/success2.pdf', type: 'PDF', description: 'Climate Smart Newslatter for Balaka District.', date: 'December 2024' },
        ]
      },
      { id: 'speeches', subgroup: 'Speeches', items: [] },
      { id: 'research', subgroup: 'Research & Discussions', items: [] },
      { id: 'budget', subgroup: 'Budget Documents', items: [] },
      { id: 'disbursements', subgroup: 'Disbursements', items: [] },
      {
        id: 'newsletters',
        subgroup: 'Newsletters & Magazines',
        items: [
          { name: 'January Newsletter', link: '/downloads/newsletter-jan2025.pdf', type: 'PDF', description: 'Highlights from January 2025 newsletter.', date: 'January 2025' },
        ]
      },
      { id: 'manuals', subgroup: 'Manuals and Guidelines', items: [] },
      { id: 'policies', subgroup: 'Policies and Strategies', items: [] },
    ]
  },
  {
    id: 'project-documents',
    group: 'Project Documents',
    subgroups: [
      { id: 'ssrlp', subgroup: 'SSRLP', items: [] },
      { id: 'gesd', subgroup: 'GESD', items: [] },
      { id: 'rcrp2', subgroup: 'RCRP 2', items: [] },
    ]
  },
  {
    id: 'reports',
    group: 'Reports',
    subgroups: [
      { id: 'audit-reports', subgroup: 'Audit Reports', items: [] },
      { id: 'financial-reports', subgroup: 'Financial Reports', items: [] },
      { id: 'financial-statements', subgroup: 'Financial statements', items: [] },
      { id: 'lapa-synthesis', subgroup: 'LAPA Synthesis', items: [] },
    ]
  },
  {
    id: 'knowledge-management',
    group: 'Knowledge Management',
    subgroups: [
      {
        id: 'image-gallery',
        subgroup: 'Image Gallery',
        items: [
          { name: 'Community Event Photos', link: 'https://demo2.gov.mw/nlgfc-portal/public/?page=1', type: 'Gallery', description: 'Gallery showcasing community events, activities and projects.' }
        ]
      },
      {
        id: 'video',
        subgroup: 'Video',
        items: [
          { name: 'Phalombe District Council', link: 'https://www.youtube.com/watch?v=xfMlyumpENU', type: 'Video', description: 'GESD project overview in Phalombe District Council.' },
          { name: 'Nkhotakota District Council', link: 'https://www.youtube.com/watch?v=YTbn2duu4og', type: 'Video', description: 'GESD project overview in Nkhotakota District council.' },
        ]
      }
    ]
  }
];

/**
 * Navigate directly to a specific group or subgroup using IDs
 * @param {string} groupId - The ID of the group
 * @param {string} subgroupId - The ID of the subgroup (optional)
 */
const navigateToSection = (groupId, subgroupId = null) => {
  const groupIndex = resourceGroups.findIndex(g => g.id === groupId);
  
  if (groupIndex !== -1) {
    const group = resourceGroups[groupIndex];
    
    if (subgroupId && group.subgroups) {
      const subgroupIndex = group.subgroups.findIndex(sg => sg.id === subgroupId);
      if (subgroupIndex !== -1) {
        expandedGroup.value = groupIndex;
        activeGroup.value = groupIndex;
        activeSubgroup.value = subgroupIndex;
        return;
      }
    }
    
    // Navigate to main group
    if (group.items) {
      activeGroup.value = groupIndex;
      activeSubgroup.value = null;
      expandedGroup.value = null;
    } else if (group.subgroups) {
      expandedGroup.value = groupIndex;
      activeGroup.value = null;
      activeSubgroup.value = null;
    }
  }
};

/**
 * Get the current URL with hash for sharing/bookmarking
 * @returns {string} The shareable URL
 */
const getCurrentSectionUrl = () => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    let hash = `#${group.id}`;
    
    if (activeSubgroup.value !== null && group.subgroups) {
      hash += `-${group.subgroups[activeSubgroup.value].id}`;
    }
    
    return `${window.location.origin}${window.location.pathname}${hash}`;
  }
  return window.location.href;
};

/**
 * Handle URL hash changes for direct navigation
 */
const handleHashChange = () => {
  const hash = window.location.hash.slice(1); // Remove the #
  if (hash) {
    const parts = hash.split('-');
    const groupId = parts[0];
    const subgroupId = parts.length > 1 ? parts.slice(1).join('-') : null;
    navigateToSection(groupId, subgroupId);
  }
};

/**
 * Update URL hash when navigation changes
 */
const updateUrlHash = () => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    let hash = group.id;
    
    if (activeSubgroup.value !== null && group.subgroups) {
      hash += `-${group.subgroups[activeSubgroup.value].id}`;
    }
    
    window.history.replaceState(null, null, `#${hash}`);
  } else {
    window.history.replaceState(null, null, window.location.pathname);
  }
};

/**
 * Handles clicks on main group items in the sidebar.
 * It either toggles subgroup visibility or directly selects a group.
 * @param {number} index - The index of the clicked group.
 */
const handleGroupClick = (index) => {
  const group = resourceGroups[index];
  if (group.subgroups && group.subgroups.length > 0) {
    // This is a group with subgroups, so just toggle expansion
    expandedGroup.value = expandedGroup.value === index ? null : index;
    // If we are collapsing the group that was active, clear selection
    if (expandedGroup.value !== index && activeGroup.value === index) {
        activeGroup.value = null;
        activeSubgroup.value = null;
    }
  } else if (group.items) {
    // This is a direct content group like "News"
    expandedGroup.value = null; // No subgroups to expand
    activeGroup.value = index;
    activeSubgroup.value = null; // Signal that it's a direct group selection
  }
};

/**
 * Selects a subgroup to display its content.
 * @param {number} groupIndex - The index of the parent group.
 * @param {number} subIndex - The index of the subgroup to select.
 */
const selectSubgroup = (groupIndex, subIndex) => {
  activeGroup.value = groupIndex;
  activeSubgroup.value = subIndex;
}

/**
 * Search functionality
 */
const handleSearch = () => {
  // This would typically trigger filtering of displayedDocuments
  // Implementation depends on your specific search requirements
};

const clearSearch = () => {
  searchQuery.value = '';
};

/**
 * Computed property for filtered documents based on search
 */
const filteredDocuments = computed(() => {
  if (!searchQuery.value) return displayedDocuments.value;
  
  return displayedDocuments.value.filter(doc => {
    const searchTerm = searchQuery.value.toLowerCase();
    return (
      (doc.name && doc.name.toLowerCase().includes(searchTerm)) ||
      (doc.title && doc.title.toLowerCase().includes(searchTerm)) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm))
    );
  });
});

/**
 * Converts a standard YouTube watch URL to an embeddable URL.
 * @param {string} url - The original YouTube URL.
 * @returns {string} The embeddable URL.
 */
function getVideoEmbedUrl(url) {
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url; // Return original URL if not a standard YouTube link
}

/**
 * Formats a date string for display.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date.
 */
const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Computed property to get the documents of the currently active group or subgroup
const displayedDocuments = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    // Check if a subgroup is selected within a group that has subgroups
    if (activeSubgroup.value !== null && group.subgroups) {
      return group.subgroups[activeSubgroup.value].items || [];
    } 
    // Check if a main group with direct items (like News) is selected
    else if (activeSubgroup.value === null && group.items) {
      return group.items;
    }
  }
  return [];
});

// Computed property to generate a title for the content pane
const currentTitle = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    if (activeSubgroup.value !== null && group.subgroups) {
      return `${group.group} - ${group.subgroups[activeSubgroup.value].subgroup}`;
    } else if (group.items) {
       return group.group;
    }
  }
  return 'Resource Center';
});

// Computed property to determine the type of the current content for special layouts
const currentDisplayType = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    if (activeSubgroup.value !== null && group.subgroups) {
      return group.subgroups[activeSubgroup.value].subgroup; // e.g., 'Video', 'Image Gallery'
    } else if (activeSubgroup.value === null && group.items) {
      return group.group; // e.g., 'News'
    }
  }
  return '';
});

// Watch for changes in active selections to update URL hash
watch([activeGroup, activeSubgroup], () => {
  updateUrlHash();
});

// Lifecycle hooks
onMounted(() => {
  // Handle initial hash on page load
  handleHashChange();
  
  // Listen for hash changes (back/forward navigation)
  window.addEventListener('hashchange', handleHashChange);
});

// Watch for hash changes in the URL and handle them
watch(
  () => route.hash,
  () => {
    handleHashChange();
  }
);

// Expose methods for external use (e.g., from other components)
const resourceCenterAPI = {
  navigateToSection,
  getCurrentSectionUrl,
  // Navigate to specific sections by ID
  goToNews: () => navigateToSection('news'),
  goToPressReleases: () => navigateToSection('publications', 'press-releases'),
  goToSuccessStories: () => navigateToSection('publications', 'success-stories'),
  goToVideos: () => navigateToSection('knowledge-management', 'video'),
  goToImageGallery: () => navigateToSection('knowledge-management', 'image-gallery'),
  // Add more convenience methods as needed
};

// Make API available globally if needed
if (process.client) {
  window.resourceCenterAPI = resourceCenterAPI;
}

</script>