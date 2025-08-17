<script setup>
import { ref, watch, computed, onMounted } from 'vue';

const route = useRoute();
const props = defineProps({
  // 'opportunities' for flat list with icons, 'projects' for collapsible groups
  sidebarType: {
    type: String,
    required: true,
    validator: (value) => ['opportunities', 'projects'].includes(value)
  },
  // Data for sections or project groups.
  // Structure varies based on sidebarType:
  // For 'opportunities': [{ id: string, name: string, icon: string, description: string }]
  // For 'projects': [{ group: string, groupIcon: string, items: [{ id: string, title: string }] }]
  // UPDATED: Now supports nested subgroups for 'projects'
  sectionsData: {
    type: Array,
    default: () => []
  },
  // The currently active item's ID, controlled by the parent component
  activeId: {
    type: String,
    default: null
  },
  // Optional title to display at the top of the sidebar
  sidebarTitle: {
    type: String,
    default: ''
  },
  // Prop to control sidebar visibility from parent, default to true
  sidebarOpen: {
    type: Boolean,
    default: true
  },
  // New props for opportunities-related data
  jobOpportunities: {
    type: Array,
    default: () => []
  },
  procurementNotices: {
    type: Array,
    default: () => []
  },
  // New props for dynamic positioning
  headerHeight: {
    type: Number,
    default: 0
  },
  isHeaderVisible: {
    type: Boolean,
    default: true
  }
});
// Define emits to notify the parent component of changes to the active item and sidebar visibility
// Added 'openFaqModal' emit for the FAQ button
const emit = defineEmits(['update:activeId', 'update:sidebarOpen', 'openFaqModal']);
// Internal reactive state for sidebar open/close, synced with prop
const isSidebarOpen = ref(props.sidebarOpen);
watch(() => props.sidebarOpen, (newVal) => {
  isSidebarOpen.value = newVal;
});
// Reactive state to manage the currently open group and subgroup for 'projects' sidebar type
const openGroup = ref(null);
const openSubgroup = ref(null);
// Auto-detect active item from URL hash when sectionsData is available
const detectActiveItemFromHash = () => {
  // Only run if sectionsData is populated
  if (!props.sectionsData || props.sectionsData.length === 0) return;
  if (props.sidebarType === 'projects' && route.hash) {
    const hashId = route.hash.replace('#', '');
    // Check if the hash corresponds to any item in sectionsData
    for (const group of props.sectionsData) {
      // Look for the item in subgroups if they exist
      if (group.subgroups && group.subgroups.length > 0) {
        for (const subgroup of group.subgroups) {
          // Check for subgroup link match
          if (subgroup.id === hashId) {
            openGroup.value = group.group;
            openSubgroup.value = subgroup.id;
            // No need to set activeId for subgroup links
            if (!isSidebarOpen.value) {
              isSidebarOpen.value = true;
              emit('update:sidebarOpen', true);
            }
            return;
          }
          // Check for nested item link match
          const matchingItem = subgroup.items.find(item => item.id === hashId);
          if (matchingItem) {
            if (props.activeId !== matchingItem.id) {
              emit('update:activeId', matchingItem.id);
            }
            openGroup.value = group.group;
            openSubgroup.value = subgroup.id;
            if (!isSidebarOpen.value) {
              isSidebarOpen.value = true;
              emit('update:sidebarOpen', true);
            }
            return;
          }
        }
      } else {
        // Fallback for groups without subgroups
        const matchingItem = group.items.find(item => item.id === hashId);
        if (matchingItem) {
          if (props.activeId !== matchingItem.id) {
            emit('update:activeId', matchingItem.id);
          }
          openGroup.value = group.group;
          if (!isSidebarOpen.value) {
            isSidebarOpen.value = true;
            emit('update:sidebarOpen', true);
          }
          return;
        }
      }
    }
  } else if (props.sidebarType === 'opportunities' && route.hash) {
    const hashId = route.hash.replace('#', '');
    // Check if the hash corresponds to any section in sectionsData
    const matchingSection = props.sectionsData.find(section => section.id === hashId);
    if (matchingSection && props.activeId !== matchingSection.id) {
      emit('update:activeId', matchingSection.id);
      // Ensure sidebar is open when navigating from URL hash
      if (!isSidebarOpen.value) {
        isSidebarOpen.value = true;
        emit('update:sidebarOpen', true);
      }
    }
  }
};

// Watch for route hash changes
watch(() => route.hash, () => {
  detectActiveItemFromHash();
});
// Watch for sectionsData changes to trigger hash detection
watch(() => props.sectionsData, () => {
  if (props.sectionsData && props.sectionsData.length > 0) {
    detectActiveItemFromHash();
  }
}, { immediate: true });
// Watch for changes in activeId to automatically open the corresponding project group and subgroup
// This ensures that if activeId is set by the parent, the correct group and subgroup are expanded.
watch(() => props.activeId, (newId) => {
  if (props.sidebarType === 'projects' && newId) {
    // Iterate through project groups to find which one contains the new activeId
    for (const group of props.sectionsData) {
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.items.some(item => item.id === newId)) {
            openGroup.value = group.group;
            openSubgroup.value = subgroup.id;
            if (!isSidebarOpen.value) {
              isSidebarOpen.value = true;
              emit('update:sidebarOpen', true);
            }
            break;
          }
        }
      } else if (group.items.some(item => item.id === newId)) {
        openGroup.value = group.group;
        if (!isSidebarOpen.value) {
          isSidebarOpen.value = true;
          emit('update:sidebarOpen', true);
        }
        break;
      }
    }
  }
}, { immediate: true });
// 'immediate: true' ensures this watch runs on initial component mount

// Function to set the active item and emit the 'update:activeId' event
const setActiveItem = (id) => {
  emit('update:activeId', id);
  // Hide the sidebar after an item is selected
  // isSidebarOpen.value = false;
  // Removed for automatic scroll-based toggling
  // emit('update:sidebarOpen', false); // Removed for automatic scroll-based toggling
};
// Function to toggle the open/closed state of a project group
const toggleGroup = (groupName) => {
  // If the clicked group is currently closed or a different group is open, open this group
  if (openGroup.value !== groupName) {
    openGroup.value = groupName;
  } else {
    // If the group is already open, close it
    openGroup.value = null;
    // Don't automatically change the active item when closing a group
  }
};
// Function to toggle the open/closed state of a subgroup
const toggleSubgroup = (subgroupId) => {
  if (openSubgroup.value !== subgroupId) {
    openSubgroup.value = subgroupId;
  } else {
    openSubgroup.value = null;
  }
};
// Function to explicitly toggle the sidebar's visibility
const toggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  emit('update:sidebarOpen', isSidebarOpen.value);
};
// Utility functions for OpportunitiesSidebar content
const isExpired = (dateString) => {
  return new Date(dateString) < new Date();
};
const getDaysUntilExpiry = (dateString) => {
  const today = new Date();
  const expiryDate = new Date(dateString);
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Computed property to find which group contains the active item or subgroup
const activeGroup = computed(() => {
  const currentHash = route.hash.replace('#', '');
  if (props.sidebarType === 'projects' && currentHash) {
    for (const group of props.sectionsData) {
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.id === currentHash || subgroup.items.some(item => item.id === currentHash)) {
            return group.group;
          }
        }
      } else if (group.items.some(item => item.id === currentHash)) {
        return group.group;
      }
    }
  }
  return null;
});

// Computed property to find which subgroup is currently active
const activeSubgroup = computed(() => {
  const currentHash = route.hash.replace('#', '');
  if (props.sidebarType === 'projects' && currentHash) {
    for (const group of props.sectionsData) {
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.id === currentHash || subgroup.items.some(item => item.id === currentHash)) {
            return subgroup.id;
          }
        }
      }
    }
  }
  return null;
});
// Computed stats for OpportunitiesSidebar content
const stats = computed(() => {
  const activeJobs = props.jobOpportunities.filter(job => !isExpired(job.expiryDate)).length;
  const openTenders = props.procurementNotices.filter(notice => !isExpired(notice.expiryDate)).length;

  // Calculate items closing soon (within 7 days)
  const totalClosingSoon = [
    ...props.jobOpportunities.filter(job => !isExpired(job.expiryDate) && getDaysUntilExpiry(job.expiryDate) <= 7),
    ...props.procurementNotices.filter(notice => !isExpired(notice.expiryDate) && getDaysUntilExpiry(notice.expiryDate) <= 7)
  ].length;

  return {
    activeJobs,
    openTenders,
    closingSoon: totalClosingSoon
  };
});
// Helper function to get SVG path for icons based on their name
const getIconPath = (iconName) => {
  switch (iconName) {
    case 'heroicons:briefcase':
      return 'M21 13.255A23.931 23.931 0 0112 15.711c-2.791 0-5.487-.433-8.125-1.071M10 17.25c.01-.005.018-.01.028-.015a4.487 4.487 0 00-2.424 0C6.674 16.986 6 16.2 6 15.25c0-.95.674-1.736 1.576-2.001a4.487 4.487 0 012.424 0M21 13.255L17 19H7l-4-5.745M14 6v.01M10 6v.01M12 2v.01';
    case 'heroicons:document-text':
      return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    case 'heroicons:folder':
      return 'M20 6H10a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2zM4 6h2v10H4a2 2 0 01-2-2V8a2 2 0 012-2z';
    case 'heroicons:folder-open':
      return 'M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v10h16V6H4zM4 8h16M10 12h2v2h-2v-2z';
    case 'heroicons:bars-3': // Hamburger menu icon
      return 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
    case 'heroicons:chevron-left': // Chevron left icon
      return 'M15.75 19.5L8.25 12l7.5-7.5';
    case 'heroicons:chevron-right': // Chevron right icon
      return 'M8.25 4.5l7.5 7.5-7.5 7.5';
    // New icons from OpportunitiesSidebar.vue
    case 'heroicons:question-mark-circle':
        return 'M9.75 17.25v1.007a3.75 3.75 0 01-.059.664A1.5 1.5 0 0012 20.25a1.5 1.5 0 001.441-.758 3.75 3.75 0 01-.059-.664V17.25m5.455-10.047a1.5 1.5 0 01.353 1.637l-4.242 4.242a1.5 1.5 0 01-1.637.353m5.455-10.047c-.927-2.31-3.609-3.95-6.855-3.95s-5.928 1.64-6.855 3.95C2.613 6.942 2.25 9.07 2.25 12c0 2.93.363 5.058 1.109 7.003-.927 2.31 3.609 3.95 6.855 3.95s5.928-1.64 6.855-3.95c.746-1.945 1.109-4.073 1.109-7.003 0-2.93-.363-5.058-1.109-7.003z';
    case 'heroicons:envelope':
        return 'M21.75 6.75v8.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0l-9.75 5.25-9.75-5.25';
    case 'heroicons:building-office':
        return 'M8.25 21v-4.5h4.5V21M3.75 8.25V3h16.5v5.25m-18 0h18.75c1.036 0 1.875.839 1.875 1.875v10.5a2.25 2.25 0 01-2.25 2.25H2.25a2.25 2.25 0 01-2.25-2.25v-10.5C0 9.089.839 8.25 1.875 8.25zm16.5 0a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75V8.25zm-3 0a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75V8.25zm-3 0a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75V8.25zm-3 0a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75V8.25zm-3 0a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75V8.25z';
    case 'heroicons:information-circle':
        return 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 15a1 1 0 100-2 1 1 0 000 2zm0-7a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z';
    case 'heroicons:phone':
        return 'M6 10.5v.75m0 0a.75.75 0 100 1.5.75.75 0 000-1.5zm0 0H7.5m-.75 2.25H7.5m-.75 2.25H7.5M10.5 6v.75m0 0a.75.75 0 100 1.5.75.75 0 000-1.5zm0 0H12m-.75 2.25H12m-.75 2.25H12M14.25 6v.75m0 0a.75.75 0 100 1.5.75.75 0 000-1.5zm0 0H15.75m-.75 2.25H15.75m-.75 2.25H15.75M18 6v.75m0 0a.75.75 0 100 1.5.75.75 0 000-1.5zm0 0H19.5m-.75 2.25H19.5m-.75 2.25H19.5M4.5 9v1.5c0 1.886 0 2.828.328 3.655.267.689.691 1.258 1.258 1.826.568.568 1.137 1.001 1.826 1.258C10.672 17.5 11.614 17.5 13.5 17.5h.75c1.886 0 2.828 0 3.655-.328.689-.267 1.258-.691 1.826-1.258.568-.568 1.001-1.137 1.258-1.826C22.5 13.614 22.5 12.672 22.5 10.75v-1.5c0-1.886 0-2.828-.328-3.655-.267-.689-.691-1.258-1.258-1.826-.568-.568-1.001-1.137-1.258-1.826C2.5 6.614 2.5 7.556 2.5 9.477V10.5z';
    case 'heroicons:map-pin':
        return 'M9.75 17.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H9.75zM12 21a.75.75 0 00.75-.75v-2.25a.75.75 0 00-1.5 0v2.25a.75.75 0 00.75.75zM12 2.25a.75.75 0 00.75-.75V.75a.75.75 0 00-1.5 0v.75a.75.75 0 00.75.75zm0 1.5a.75.75 0 00.75-.75V2.25a.75.75 0 00-1.5 0v.75a.75.75 0 00.75.75zM9.75 2.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H9.75zM2.25 9.75a.75.75 0 001.5 0v-4.5a.75.75 0 00-1.5 0v4.5zM21 9.75a.75.75 0 00-1.5 0v-4.5a.75.75 0 001.5 0v4.5zM3.75 14.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H3.75zM15.75 14.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z';
    default:
      return 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    // Default generic document icon
  }
};

// Computed style for dynamic top and bottom based on header visibility
const dynamicSidebarStyle = computed(() => {
  const navbarHeightRem = 7.5; // Assuming your navbar is h-16, which is 4rem (16px * 4 = 64px)
  let topValue;

  if (props.isHeaderVisible) {
    // When the header is visible, the sidebar should be positioned below both the navbar and the header
    // The `props.headerHeight` is in pixels, so we convert it to rem
    topValue = `${props.headerHeight / 16 + navbarHeightRem}rem`;
  } else {
    // When the header is not visible, the sidebar should snap to just below the navbar
    topValue = `${navbarHeightRem}rem`;
  }
  // The bottom position remains fixed to maintain the sidebar's height relative to the viewport bottom
  const bottomValue = '4rem'; // Corresponds to `bottom-16`

  return {
    top: topValue,
    bottom: bottomValue,
    transition: 'top 0.3s ease-in-out' // Smooth transition for the top position
  };
});
</script>

<template>
  <div>
    <div
      v-if="isSidebarOpen"
      :class="[
        'fixed left-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 z-10 flex flex-col',
        'translate-x-0', // Always visible when this block is rendered
      ]"
      :style="dynamicSidebarStyle" >
      <h3 v-if="sidebarTitle" class="text-lg font-semibold text-gray-900 mb-4">{{ sidebarTitle }}</h3>
      <nav class="flex-grow overflow-y-auto space-y-2 pr-2"> 
        <template v-if="sidebarType === 'opportunities'">
          <NuxtLink
            v-for="section in sectionsData"
            :key="section.id"
            :to="`${$route.path}#${section.id}`"
            @click="setActiveItem(section.id)"
            :class="[
              'w-full text-left p-4 rounded-lg transition-all duration-200 group block',
              activeId === section.id
                ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' // Active state styling
                : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900' // Default/hover state styling
            ]"
          >
            <div class="flex items-start space-x-3">
              <span
                :class="[
                  'w-6 h-6 mt-0.5 transition-colors',
                  activeId === section.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                ]"
              >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(section.icon)"></path>
                  </svg>
              </span>
              <div>
                <div class="font-medium">{{ section.name }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ section.description }}</div>
              </div>
            </div>
          </NuxtLink>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-emerald-700">Active Jobs</span>
                <span class="font-medium text-emerald-700">{{ stats.activeJobs }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-emerald-700">Open Tenders</span>
                <span class="font-medium text-emerald-700">{{ stats.openTenders }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-red-600">Closing Soon</span>
                <span class="font-medium text-red-600">{{ stats.closingSoon }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <button
                  @click="emit('openFaqModal')"
                  class="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div class="flex items-center space-x-3">
                  <span class="w-5 h-5 text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:question-mark-circle')"></path>
                    </svg>
                  </span>
                  <div>
                    <div class="text-sm font-medium text-gray-900">FAQ & Guidelines</div>
                    <div class="text-xs text-gray-500">Get help with applications</div>
                  </div>
                </div>
              </button>

              <a
                  href="mailto:hr@nlgfc.gov.mw"
                  class="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors group block"
              >
                <div class="flex items-center space-x-3">
                  <span class="w-5 h-5 text-green-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:envelope')"></path>
                    </svg>
                  </span>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Contact HR</div>
                    <div class="text-xs text-gray-500">hr@nlgfc.gov.mw</div>
                  </div>
                </div>
              </a>

              <a
                  href="mailto:procurement@nlgfc.gov.mw"
                  class="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors group block"
              >
                <div class="flex items-center space-x-3">
                  <span class="w-5 h-5 text-purple-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:building-office')"></path>
                    </svg>
                  </span>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Procurement Office</div>
                    <div class="text-xs text-gray-500">procurement@nlgfc.gov.mw</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <span class="w-5 h-5 text-gray-800 mt-0.5">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:information-circle')"></path>
                    </svg>
                  </span>
                <div>
                  <h5 class="text-sm font-medium text-gray-800">Need Help?</h5>
                  <div class="mt-6 pt-2 border-t border-gray-200">
                    <p class="text-xs text-emerald-700 mt-1">
                      Contact our Human Resource department for job inquiries.
                    </p>
                    <div class="mt-2 space-y-1">
                      <div class="text-xs text-emerald-700">
                        <span class="w-3 h-3 inline mr-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:phone')"></path>
                            </svg>
                        </span>
                        +265 1 770 244
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 pt-2 border-t border-gray-200">
                    <p class="text-xs text-emerald-700 mt-1">
                      Contact our Procurement office for tender questions.
                    </p>
                    <div class="mt-2 space-y-1">
                      <div class="text-xs text-emerald-700">
                        <span class="w-3 h-3 inline mr-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:phone')"></path>
                            </svg>
                        </span>
                        +265 1 770 244
                      </div>
                      <div class="mt-6 pt-2 border-t border-gray-200 text-xs text-emerald-700">
                        <span class="w-3 h-3 inline mr-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:map-pin')"></path>
                            </svg>
                        </span>
                        Area 14, Red Cross Premises, Lilongwe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="sidebarType === 'projects'">
          <div
            v-for="group in sectionsData"
            :key="group.group"
            class="rounded-lg overflow-hidden"
          >
            <button
              @click="toggleGroup(group.group)"
              :class="[
                'w-full text-left p-4 rounded-lg transition-all duration-200 group flex justify-between items-center',
                activeGroup === group.group
                  ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' // Group contains active item (emerald)
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900' // Default/hover group header
              ]"
            >
              <div class="flex items-center space-x-3">
                  <span
                    :class="[
                      'w-6 h-6 transition-colors',
                      activeGroup === group.group
                        ? 'text-emerald-600'
                        : 'text-gray-400 group-hover:text-gray-600'
                    ]"
                  >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(group.groupIcon)"></path>
                      </svg>
                  </span>
                <span class="font-medium">{{ group.group }}</span>
              </div>
              <svg class="w-4 h-4 transform transition-transform duration-200" :class="{ 'rotate-180': openGroup === group.group }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="openGroup === group.group" class="bg-white" >
              <ul class="py-2">
                <li v-if="group.subgroups && group.subgroups.length > 0">
                  <li v-for="subgroup in group.subgroups" :key="subgroup.id">
                    <NuxtLink
                      :to="`#${subgroup.id}`"
                      @click.prevent="toggleSubgroup(subgroup.id)"
                      :class="[
                        'flex items-center justify-between w-full px-4 py-2 rounded-lg text-left cursor-pointer transition-all duration-200 ease-in-out',
                        'hover:bg-gray-100',
                        {
                          'bg-emerald-50 text-emerald-800 font-semibold': activeSubgroup === subgroup.id || openSubgroup === subgroup.id
                        }
                      ]"
                    >
                      <span class="block px-5 text-sm font-semibold text-gray-900 flex-grow">{{ subgroup.subgroup }}</span>
                      <svg
                        :class="['h-4 w-4 transform transition-transform duration-200', { 'rotate-180': openSubgroup === subgroup.id }]"
                        fill="currentColor" viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    </NuxtLink>
                    <ul v-show="openSubgroup === subgroup.id" class="mt-1 ml-4 py-1">
                      <li v-for="item in subgroup.items" :key="item.id">
                        <NuxtLink
                          :to="`${$route.path}#${item.id}`"
                          @click="setActiveItem(item.id)"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150',
                            item.id === activeId
                              ? 'bg-emerald-50 text-emerald-700 font-medium border-l-4 border-emerald-600' // Active item styling (emerald)
                              : 'hover:bg-gray-50 text-gray-700' // Default/hover item styling (gray/darker gray)
                          ]"
                        >
                          {{ item.title }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                </li>
                <li v-else>
                   <li v-for="item in group.items" :key="item.id">
                        <NuxtLink
                          :to="`${$route.path}#${item.id}`"
                          @click="setActiveItem(item.id)"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150',
                            item.id === activeId
                              ? 'bg-emerald-50 text-emerald-700 font-medium border-l-4 border-emerald-600' // Active item styling (emerald)
                              : 'hover:bg-gray-50 text-gray-700' // Default/hover item styling (gray/darker gray)
                          ]"
                        >
                          {{ item.title }}
                        </NuxtLink>
                      </li>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </nav>
    </div>
    <button
      @click="toggleSidebarVisibility"
      :class="[
        'fixed top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md z-20',
        'bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'left-80 -ml-4' : 'left-0'
      ]"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isSidebarOpen ? getIconPath('heroicons:chevron-left') : getIconPath('heroicons:chevron-right')"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Scoped styles for scrollbar customization */
/* For Webkit browsers (Chrome, Safari) */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the tracking area */
  border-radius: 10px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scroll thumb */
  border-radius: 10px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color of the scroll thumb on hover */
}
</style>