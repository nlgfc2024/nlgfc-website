<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
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
const navbarHeight = ref(0);
const isHeaderVisible = ref(true);

const handleActiveIdUpdate = (newId) => {
  activeTab.value = newId;
};

const opportunitySections = [
  {
    id: 'procurement-notices',
    name: 'Procurement Notices',
    icon: 'heroicons:document-text',
    description: 'Tenders, RFQs, and procurement notices'
  },
  {
    id: 'job-opportunities',
    name: 'Job Listings',
    icon: 'heroicons:briefcase',
    description: 'Current job openings and career opportunities'
  }
];

const normalizeOpportunitySidebarId = (hashValue) => {
  const normalizedHash = String(hashValue || '').replace('#', '');

  if (normalizedHash === 'jobs' || normalizedHash === 'job-opportunities') {
    return 'job-opportunities';
  }

  if (normalizedHash === 'procurement' || normalizedHash === 'procurement-notices') {
    return 'procurement-notices';
  }

  return 'procurement-notices';
};

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
    const activeOpportunityId = normalizeOpportunitySidebarId(route.hash);

    return {
      sidebarType: 'opportunities',
      sectionsData: [],
      sections: opportunitySections,
      sidebarTitle: 'Browse Opportunities',
      activeId: activeOpportunityId,
    };
  }
  
  // Check for projects page - use sidebarData if available for projects
  if (route.path.includes('/projects')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
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
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('mandate/ourMandate')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/projects/pastProjects#masaf-overview')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#masaf-psn')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#masaf-scb')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; }    
  } else if (route.path.includes('/projects/pastProjects#masaf-pm')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; }    
  }

  if (route.path.includes('/projects/currentProjects#miera-overview')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/projects/currentProjects#ssrlp-news')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/projects/upcomingProjects#gesd-2')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  } else if (route.path.includes('/projects/upcomingProjects#inspire-o')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  } 

  if (route.path.includes('/deliverySystems/deliverySystems')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

  if (route.path.includes('/localAuthorities/blantyreCouncil')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: [], // Empty sectionsData for groups
        sections: projectGroups.value, // Use sections instead
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
      }; 
    } 
  }

  if (route.path.includes('/localAuthorities/lilongwecitycouncil')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: [], // Empty sectionsData for groups
        sections: projectGroups.value, // Use sections instead
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
      }; 
    } 
  }

  if (route.path.includes('/resourceCenter')) {
    if (projectGroups.value.length > 0) {
      return {
        sidebarType: 'projects',
        sectionsData: projectGroups.value,
        sidebarTitle: route.meta.title, 
        activeId: activeTab.value
    }; } 
  }

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

// Reactive state for header visibility ratio
const headerVisibilityRatio = ref(1);

// reactive state for footer visibility
const footerVisibilityRatio = ref(0);
const footerHeight = ref(0);

// Enhanced throttling for smoother updates during fast scrolling
let scrollTimeout = null;
let lastScrollTime = 0;

// Function to handle scroll-based toggling of the sidebar and header visibility
const handleScroll = () => {
  const currentTime = Date.now();
  
  // Immediate update for fast scrolling
  updateScrollValues();
  
  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // Set a very short timeout for additional smoothing
  scrollTimeout = setTimeout(() => {
    updateScrollValues();
  }, 5); // Very short delay for final position accuracy
  
  lastScrollTime = currentTime;
};

// Separate function for actual scroll value updates
const updateScrollValues = () => {
  const footer = document.querySelector('footer');
  const pageHeader = document.querySelector('.page-header');
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    navbarHeight.value = navbar.offsetHeight; // CAPTURING the navbar's height in pixels
  }

  if (pageHeader && navbar) {
    const headerRect = pageHeader.getBoundingClientRect();

    // Update header height
    headerHeight.value = pageHeader.offsetHeight;

    // Calculate visibility ratio for smooth transitions
    const navbarBottom = navbarHeight.value;
    const visibleHeaderHeight = Math.max(0, headerRect.bottom - navbarBottom);
    headerVisibilityRatio.value = Math.max(0, Math.min(1, visibleHeaderHeight / headerHeight.value));

    // The header is considered visible if its bottom edge is below the top of the navbar
    isHeaderVisible.value = headerRect.bottom > navbarHeight.value;
  }

  if (footer) {
    const windowHeight = window.innerHeight;
    const footerRect = footer.getBoundingClientRect();
    
    // Update footer height
    footerHeight.value = footer.offsetHeight;
    
    // Calculate how much of the footer is visible
    const footerTopRelativeToViewport = footerRect.top;
    const footerVisibleHeight = Math.max(0, windowHeight - footerTopRelativeToViewport);
    footerVisibilityRatio.value = Math.max(0, Math.min(1, footerVisibleHeight / footerHeight.value));
    
    // Close sidebar when footer is 80% visible
    const footerVisibilityThreshold = 0.8;
    if (footerVisibilityRatio.value >= footerVisibilityThreshold) {
      isSidebarOpen.value = false;
    } else {
      isSidebarOpen.value = true;
    }
  }
};

onMounted(() => {
  // Use passive listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial call to set header height and visibility on mount
  handleScroll();
});

watch(() => route.hash, (newHash) => {
  const activeSection = newHash.replace('#', '');
  if (route.path === '/') {
    // Logic for URL hash
  }
});

// function to force initial calculations
const initializeLayout = async () => {
  await nextTick();
  handleScroll(); // Force initial calculation
};

// Watch for route changes and reinitialize
watch(() => route.path, async () => {
  await initializeLayout();
});

onUnmounted(async () => {
  window.removeEventListener('scroll', handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  await initializeLayout();
});

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="navbar" />
    <PageHeader v-if="shouldShowHeader" :title="route.meta.title" class="page-header" /> 
    <main class="flex-grow flex items-start">
      <aside v-if="sidebarProps" :class="['w-full md:w-72 flex-shrink-0']">
        <slot name="sidebar">
          <GeneralSidebar
            :sidebarOpen="isSidebarOpen"
            :sidebarType="sidebarProps.sidebarType"
            :sectionsData="sidebarProps.sectionsData"
            :sections="sidebarProps.sections"
            :activeId="sidebarProps.activeId"
            :sidebarTitle="sidebarProps.sidebarTitle"
            :jobOpportunities="sidebarProps.jobOpportunities"
            :procurementNotices="sidebarProps.procurementNotices"
            :headerHeight="headerHeight"
            :navbarHeight="navbarHeight" 
            :isHeaderVisible="isHeaderVisible"
            :headerVisibilityRatio="headerVisibilityRatio"
            :footerHeight="footerHeight"
            :footerVisibilityRatio="footerVisibilityRatio"
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
