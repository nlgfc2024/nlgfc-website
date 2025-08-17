<script setup>
import { ref, onMounted, onUnmounted, computed, watch, inject } from 'vue';
import { useRoute } from 'vue-router';
import GeneralSidebar from '../components/GeneralSidebar.vue';
import Navbar from '../components/Navbar.vue';
import PageHeader from '../components/PageHeader.vue';
import ChatWidget from '../components/ChatWidget.vue';
import AppFooter from '../components/AppFooter.vue';
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';

const route = useRoute();

// Inject sidebar data from pages (if available)
// const sidebarData = inject('sidebarData', null);

//shared content
const { projectGroups, projectContent } = useGeneralSidebar();
const activeTab = ref(route.hash.substring(1) || 'government_funded');

// Watch for route hash changes to keep activeTab in sync
watch(() => route.hash, (newHash) => {
  activeTab.value = newHash.substring(1);
});


// Reactive state to control sidebar visibility
const isSidebarOpen = ref(true);

const hideHeaderRoutes = ['/', '/index2'];
const shouldShowHeader = computed(() => !hideHeaderRoutes.includes(route.path));

// New reactive state for header height and visibility
const headerHeight = ref(0);
const isHeaderVisible = ref(true);

const opportunitySections = [
  {
    id: 'procurement',
    name: 'Procurement Portal',
    icon: 'heroicons:document-text',
    description: 'Tenders, RFQs, and procurement notices'
  },
  {
    id: 'jobs',
    name: 'Job Opportunities',
    icon: 'heroicons:briefcase',
    description: 'Current job openings and career opportunities'
  }
];

const sidebarProps = computed(() => {
  // Define pages that should NOT have a sidebar
  const noSidebarPages = ['/', '/index2'];
  const isLocalAuthoritiesPage = route.path.startsWith('/localAuthorities/alldistricts');
  
  // Return null (no sidebar) for specific pages
  if (noSidebarPages.includes(route.path) || isLocalAuthoritiesPage) {
    return null;
  }
  
  // Check for opportunities page
  if (route.path.includes('/opportunities')) {
    return {
      sidebarType: 'opportunities',
      sectionsData: opportunitySections,
      sidebarTitle: 'Browse Opportunities',
      activeId: 'procurement' // default active section
    };
  }
  
  // Check for projects page - use sidebarData if available for projects
  if (route.path.includes('/projects')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } else {
      // Fallback for projects page when sidebarData is not yet available
      const fallbackProjectGroups = [
        {
          group: 'SSRLP',
          items: [
            { id: 'ssrlp_overview', title: ' Overview' },
            { id: 'SCTP', title: 'SCTP' },
            { id: 'publicWorks', title: 'Public Works' },
            { id: 'emergency', title: 'Scalable Social Safety Nets' },
            { id: 'livelihoods', title: 'Livelihoods Support' }
          ]
        },
        {
          group: 'GESD',
          items: [
            { id: 'gesd_overview', title: ' Overview' },
            { id: 'pbf', title: 'Performance-Based Financing' },
            { id: 'ias', title: 'Intergovernmental Accountability Systems' },
            { id: 'lgpi', title: 'Local Government Performance Improvement' },
            { id: 'adaptive', title: 'Adaptive Management and Innovation' }
          ]
        },
        {
          group: 'RCRP 2',
          items: [
            { id: 'rcrp_overview', title: ' Overview' },
            { id: 'drb', title: 'District-Led Resilience Building' },
            { id: 'usr', title: 'Urban Malawi Social Registry' },
            { id: 'upw', title: 'Urban Climate Smart Public Works Program' }
          ]
        }
      ];
      
      return {
        sidebarType: 'projects',
        sectionsData: fallbackProjectGroups,
        sidebarTitle: 'Current Projects',
        activeId: 'ssrlp_overview'
      };
    }
  }

  if (route.path.includes('/about')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('mandate/ourMandate')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/projects/pastProjects#masaf_overview')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#psn')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#scb')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#pm')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; }    
  }

  if (route.path.includes('/projects/currentProjects#miera_overview')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/projects/currentProjects#ssrlp_news')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/upcomingProjects#gesd2')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  } else if (route.path.includes('/upcomingProjects#inspire')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  } 

  if (route.path.includes('/deliverySystems/deliverySystems')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/localAuthorities/blantyreCouncil')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/localAuthorities/lilongwecitycouncil')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/resourceCenter')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, // ⚡️ Change: Get title from the route meta
        activeId: activeTab.value
    }; } 
  }

  const handleActiveIdUpdate = (newId) => {
    activeTab.value = newId;
  };
  
  // If page provides sidebar data, use that
  /*if (sidebarData) {
    return {
      sidebarType: sidebarData.sidebarType,
      sectionsData: sidebarData.sectionsData,
      sidebarTitle: sidebarData.sidebarTitle,
      activeId: sidebarData.activeId.value || sidebarData.activeId, // Handle both ref and direct value
      jobOpportunities: sidebarData.jobOpportunities,
      procurementNotices: sidebarData.procurementNotices
    };
  }*/
  
  // Default: show sidebar for all other pages
  return {
    sidebarType: 'default',
    sectionsData: [],
    sidebarTitle: 'Navigation',
    activeId: ''
  };
});

// Function to handle scroll-based toggling of the sidebar and header visibility
const handleScroll = () => {
  const footer = document.querySelector('footer');
  const pageHeader = document.querySelector('.page-header');
  const navbar = document.querySelector('.navbar');

  if (pageHeader && navbar) {
    const navbarHeight = navbar.offsetHeight;
    const headerRect = pageHeader.getBoundingClientRect();

    // Update header height
    headerHeight.value = pageHeader.offsetHeight;

    // The header is considered visible if its bottom edge is below the top of the navbar
    isHeaderVisible.value = headerRect.bottom > navbarHeight;
  }

  if (footer) {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const scrollThreshold = windowHeight * 0.2;

    if (windowHeight > footerTop + scrollThreshold) {
      isSidebarOpen.value = false;
    } else {
      isSidebarOpen.value = true;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Initial call to set header height and visibility on mount
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(() => route.hash, (newHash) => {
  const activeSection = newHash.replace('#', '');
  if (route.path === '/') {
    // Logic for URL hash
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="navbar" />
    <PageHeader v-if="shouldShowHeader" :title="route.meta.title" class="page-header" /> 
    <main class="flex-grow flex">
      <aside v-if="sidebarProps" :class="['w-full md:w-72 flex-shrink-0']">
        <slot name="sidebar">
          <GeneralSidebar
            :sidebarOpen="isSidebarOpen"
            :sidebarType="sidebarProps.sidebarType"
            :sectionsData="sidebarProps.sectionsData"
            :activeId="sidebarProps.activeId"
            :sidebarTitle="sidebarProps.sidebarTitle"
            :jobOpportunities="sidebarProps.jobOpportunities"
            :procurementNotices="sidebarProps.procurementNotices"
            :headerHeight="headerHeight"
            :isHeaderVisible="isHeaderVisible"
            @update:sidebarOpen="isSidebarOpen = $event"
            @update:activeId="handleActiveIdUpdate"
            @openFaqModal="sidebarProps.onOpenFaqModal"
          />
        </slot>
      </aside>

      <div
        class="flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out"
        :class="{
          'md:ml-5': isSidebarOpen && sidebarProps,
          'md:ml-0': !isSidebarOpen || !sidebarProps
        }"
      >
        <slot />
      </div>
    </main>

    <ChatWidget />
    <AppFooter />
  </div>
</template>