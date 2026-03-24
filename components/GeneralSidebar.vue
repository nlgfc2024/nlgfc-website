<script setup>
import { ref, watch, computed } from 'vue';

const route = useRoute();
const props = defineProps({
  // Sidebar supports grouped sections (projects), flat sections (opportunities), and default
  sidebarType: {
    type: String,
    required: true,
    validator: (value) => ['projects', 'opportunities', 'default'].includes(value)
  },
  // Data for sections or project groups.
  // Structure for 'projects':
  // [{ 
  //   group: string, 
  //   groupIcon?: string, 
  //   items?: [{ id: string, title: string }],
  //   subgroups?: [{ subgroup: string, id: string, items: [{ id: string, title: string }] }],
  //   sections?: [{ id: string, name: string, icon?: string, description?: string }]
  // }]
  // OR direct sections: [{ id: string, name: string, icon?: string, description?: string }]
  sectionsData: {
    type: Array,
    default: () => []
  },
  // Standalone sections (can be used alongside or instead of sectionsData)
  sections: {
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
  // Dynamic Quick Stats data
  quickStats: {
    type: Array,
    default: () => []
    // Format: [{ label: string, value: string|number, color?: string }]
  },
  // Dynamic Quick Actions data
  quickActions: {
    type: Array,
    default: () => []
    // Format: [{ label: string, description?: string, icon?: string, action?: string, href?: string, color?: string }]
  },
  // Dynamic Help Section data
  helpSection: {
    type: Object,
    default: () => null
    // Format: { title?: string, description?: string, backgroundColor?: string, contacts?: [], buttonText?: string, buttonAction?: string }
  },
  // New props for dynamic positioning
  headerHeight: {
    type: Number,
    default: 0
  },
  navbarHeight: { 
    type: Number,
    default: 0 // Default to 0
  },
  isHeaderVisible: {
    type: Boolean,
    default: true
  },
  headerVisibilityRatio: {
    type: Number,
    default: 1
  },
  footerHeight: {
    type: Number,
    default: 0
  },
  footerVisibilityRatio: {
    type: Number,
    default: 0
  }
});
// Define emits to notify the parent component of changes to the active item and sidebar visibility
// Added emit for dynamic actions
const emit = defineEmits(['update:activeId', 'update:sidebarOpen', 'quickAction']);
// Internal reactive state for sidebar open/close, synced with prop
const isSidebarOpen = ref(props.sidebarOpen);
watch(() => props.sidebarOpen, (newVal) => {
  isSidebarOpen.value = newVal;
});
// Reactive state to manage the currently open group and subgroup
const openGroup = ref(null);
const openSubgroup = ref(null);

// Get all available data sources (sections, sectionsData, or combined)
const allSectionsData = computed(() => {
  const combined = [];
  
  // Add standalone sections first
  if (props.sections && Array.isArray(props.sections)) {
    combined.push(...props.sections
      .filter(section => section && section.id && section.name)
      .map(section => ({ 
        ...section, 
        isSection: true 
      }))
    );
  }
  
  // Add sectionsData (groups/subgroups/items) and standalone section items
  if (props.sectionsData && Array.isArray(props.sectionsData)) {
    for (const item of props.sectionsData) {
      if (!item) continue;
      if (item.group) {
        combined.push(item);
        continue;
      }
      // Allow callers to pass section-like entries through sectionsData
      if (item.id && item.name) {
        combined.push({
          ...item,
          isSection: true,
        });
      }
    }
  }
  
  return combined;
});

// Auto-detect active item from URL hash when data is available
const detectActiveItemFromHash = () => {
  // Only run if data is populated
  if (allSectionsData.value.length === 0) return;
  if (route.hash) {
    const hashId = route.hash.replace('#', '');
    
    // Check standalone sections first
    const matchingSection = allSectionsData.value.find(item => 
      item.isSection && item.id === hashId
    );
    if (matchingSection && props.activeId !== matchingSection.id) {
      emit('update:activeId', matchingSection.id);
      if (!isSidebarOpen.value) {
        isSidebarOpen.value = true;
        emit('update:sidebarOpen', true);
      }
      return;
    }
    
    // Check groups and subgroups
    for (const group of allSectionsData.value) {
      if (group.isSection) continue;
      
      // Check sections within groups
      if (group.sections) {
        const matchingSectionInGroup = group.sections.find(section => section.id === hashId);
        if (matchingSectionInGroup) {
          if (props.activeId !== matchingSectionInGroup.id) {
            emit('update:activeId', matchingSectionInGroup.id);
          }
          openGroup.value = group.group;
          if (!isSidebarOpen.value) {
            isSidebarOpen.value = true;
            emit('update:sidebarOpen', true);
          }
          return;
        }
      }
      
      if (group.id === hashId) {
        if (props.activeId !== group.id) {
          emit('update:activeId', group.id);
        }
        openGroup.value = group.group;
        openSubgroup.value = null;
        if (!isSidebarOpen.value) {
          isSidebarOpen.value = true;
          emit('update:sidebarOpen', true);
        }
        return;
      }

      // Look for the item in subgroups if they exist
      if (group.subgroups && group.subgroups.length > 0) {
        for (const subgroup of group.subgroups) {
          // Check for subgroup link match
          if (subgroup.id === hashId) {
            if (props.activeId !== subgroup.id) {
              emit('update:activeId', subgroup.id);
            }
            openGroup.value = group.group;
            openSubgroup.value = subgroup.id;
            if (!isSidebarOpen.value) {
              isSidebarOpen.value = true;
              emit('update:sidebarOpen', true);
            }
            return;
          }
          // Check for nested item link match
          const matchingItem = subgroup.items?.find(item => item.id === hashId);
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
      } else if (group.items) {
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
  }
};

// Watch for route hash changes
watch(() => route.hash, () => {
  detectActiveItemFromHash();
});
// Watch for data changes to trigger hash detection
watch(() => allSectionsData.value, () => {
  if (allSectionsData.value.length > 0) {
    detectActiveItemFromHash();
  }
}, { immediate: true });
// Watch for changes in activeId to automatically open the corresponding group and subgroup
watch(() => props.activeId, (newId) => {
  if (newId) {
    // Check standalone sections first
    const matchingSection = allSectionsData.value.find(item => 
      item.isSection && item.id === newId
    );
    if (matchingSection) {
      // Sections don't need group expansion
      return;
    }
    
    // Iterate through groups to find which one contains the new activeId
    for (const group of allSectionsData.value) {
      if (group.isSection) continue;
      
      // Check sections within groups
      if (group.sections) {
        if (group.sections.some(section => section.id === newId)) {
          openGroup.value = group.group;
          if (!isSidebarOpen.value) {
            isSidebarOpen.value = true;
            emit('update:sidebarOpen', true);
          }
          break;
        }
      }
      
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.id === newId || subgroup.items?.some(item => item.id === newId)) {
            openGroup.value = group.group;
            openSubgroup.value = subgroup.id;
            if (!isSidebarOpen.value) {
              isSidebarOpen.value = true;
              emit('update:sidebarOpen', true);
            }
            break;
          }
        }
      } else if (group.id === newId || group.items?.some(item => item.id === newId)) {
        openGroup.value = group.group;
        openSubgroup.value = null;
        if (!isSidebarOpen.value) {
          isSidebarOpen.value = true;
          emit('update:sidebarOpen', true);
        }
        break;
      }
    }
  }
}, { immediate: true });

// Function to set the active item and emit the 'update:activeId' event
const setActiveItem = (id) => {
  emit('update:activeId', id);
  // Hide the sidebar after an item is selected
  // isSidebarOpen.value = false;
  // Removed for automatic scroll-based toggling
  // emit('update:sidebarOpen', false); // Removed for automatic scroll-based toggling
};

const resolveOpportunitiesSection = (itemId) => {
  const normalizedId = String(itemId || '').replace('#', '');

  if (normalizedId === 'job-opportunities' || normalizedId === 'jobs') {
    return 'jobs';
  }

  if (normalizedId === 'procurement-notices' || normalizedId === 'procurement') {
    return 'procurement';
  }

  return null;
};

const buildNavTarget = (itemId) => {
  const normalizedId = String(itemId || '').replace('#', '');

  if (!normalizedId) {
    return { path: route.path, query: route.query };
  }

  const nextQuery = { ...route.query };

  if (props.sidebarType === 'opportunities') {
    const section = resolveOpportunitiesSection(normalizedId);

    if (section) {
      nextQuery.section = section;
      nextQuery.page = 1;
    }
  }

  return {
    path: route.path,
    query: nextQuery,
    hash: `#${normalizedId}`,
  };
};

const navigateToTarget = (itemId) => {
  return navigateTo(buildNavTarget(itemId));
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
const handleGroupClick = (group) => {
  if (group.subgroups?.length > 0) {
    toggleGroup(group.group);
    return;
  }

  openGroup.value = null;
  openSubgroup.value = null;
  setActiveItem(group.id);
  navigateToTarget(group.id);
};

const handleSubgroupClick = (group, subgroup) => {
  if (openGroup.value !== group.group) {
    openGroup.value = group.group;
  }
  openSubgroup.value = subgroup.items?.length ? (openSubgroup.value === subgroup.id ? null : subgroup.id) : subgroup.id;
  setActiveItem(subgroup.id);
  navigateToTarget(subgroup.id);
};

const hasSubgroupItems = (subgroup) => Array.isArray(subgroup?.items) && subgroup.items.length > 0;

// Keep nested content visible for entries that do not have a valid group label.
const shouldHideGroupHeader = (groupName) => !groupName || !String(groupName).trim();

const isProjectsRoute = computed(() => route.path.startsWith('/projects'));

const isExternalHref = (href = '') => {
  return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
};

const normalizeInternalHref = (href = '') => {
  if (!href) return route.path;
  if (isExternalHref(href)) return href;
  if (href.startsWith('#')) return `${route.path}${href}`;
  return href.startsWith('/') ? href : `/${href}`;
};
// Function to explicitly toggle the sidebar's visibility
const toggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  emit('update:sidebarOpen', isSidebarOpen.value);
};

// Function to handle quick actions
const handleQuickAction = (action, actionType, href) => {
  if (href) {
    // Handle links
    if (href.startsWith('mailto:') || href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      // Handle internal routes
      navigateTo(href);
    }
  } else if (action) {
    // Emit custom action
    emit('quickAction', { action, actionType });
  }
};

// Computed property to find which group contains the active item or subgroup
const activeGroup = computed(() => {
  const currentHash = route.hash.replace('#', '');
  if (currentHash) {
    for (const group of allSectionsData.value) {
      if (group.isSection) continue;

      if (group.id === currentHash) {
        return group.group;
      }

      // Check sections in groups
      if (group.sections && group.sections.some(section => section.id === currentHash)) {
        return group.group;
      }

      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.id === currentHash || subgroup.items?.some(item => item.id === currentHash)) {
            return group.group;
          }
        }
      } else if (group.items?.some(item => item.id === currentHash)) {
        return group.group;
      }
    }
  }
  return null;
});

// Computed property to find which subgroup is currently active
const activeSubgroup = computed(() => {
  const currentHash = route.hash.replace('#', '');
  if (currentHash) {
    for (const group of allSectionsData.value) {
      if (group.isSection) continue;
      
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          if (subgroup.id === currentHash || subgroup.items?.some(item => item.id === currentHash)) {
            return subgroup.id;
          }
        }
      }
    }
  }
  return null;
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

// reactive refs to store calculated values
const calculatedNavbarHeight = ref(0);
const calculatedHeaderHeight = ref(0);

// function to calculate initial generalsidebar position
const calculateInitialPosition = async () => {
  await nextTick(); // Wait for DOM to be fully rendered
  
  const pageHeader = document.querySelector('.page-header');
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    // Force recalculation of navbar height
    const navbarRect = navbar.getBoundingClientRect();
    calculatedNavbarHeight.value = navbar.offsetHeight;
  }
  
  if (pageHeader) {
    // Force recalculation of header height and visibility
    const headerRect = pageHeader.getBoundingClientRect();
    calculatedHeaderHeight.value = pageHeader.offsetHeight;
    
    // Calculate initial visibility ratio
    const navbarBottom = calculatedNavbarHeight.value || props.navbarHeight || 0;
    const visibleHeaderHeight = Math.max(0, headerRect.bottom - navbarBottom);
    const headerVisibilityRatio = Math.max(0, Math.min(1, visibleHeaderHeight / calculatedHeaderHeight.value));
    
    // Set header as visible initially if it exists
    const isHeaderVisible = headerRect.bottom > navbarBottom;
  }
};

// Watch for route changes and recalculate position
watch(() => route.path, async () => {
  await calculateInitialPosition();
});

// Also watch for when the sidebar becomes visible
watch(() => isSidebarOpen.value, async (newValue) => {
  if (newValue) {
    await calculateInitialPosition();
  }
});

onMounted(async () => {
  await calculateInitialPosition();
});

/*const dynamicSidebarStyle = computed(() => {
  // Convert the navbarHeight from props (in px) to rem. 1rem = 16px.
  const navbarHeightRem = props.navbarHeight / 16;
  
  // Provide a safe fallback if the height isn't calculated yet
  if (!navbarHeightRem || navbarHeightRem <= 0) {
    return { top: '5rem' }; 
  }

  // Calculate dynamic top position based on header visibility ratio
  const headerHeightRem = props.headerHeight / 16;
  const dynamicHeaderHeight = headerHeightRem * props.headerVisibilityRatio;
  const topValue = `${dynamicHeaderHeight + navbarHeightRem}rem`;

  return {
    top: topValue,
    // Adjust max-height to ensure the sidebar can scroll its own content if needed
    maxHeight: `calc(100vh - ${topValue} - 1rem)`, // 1rem bottom margin
    transition: 'top 0.15s ease-out' // Smooth transition that follows scroll
  };
});*/

const dynamicSidebarStyle = computed(() => {
  // Use calculated value or fallback to prop
  const navbarHeightPx = calculatedNavbarHeight.value || props.navbarHeight || 0;
  const navbarHeightRem = navbarHeightPx / 16;
  
  // Provide a safe fallback if the height isn't calculated yet
  if (!navbarHeightRem || navbarHeightRem <= 0) {
    return { 
      top: '5rem',
      paddingTop: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    }; 
  }

  // Calculate dynamic top position based on header visibility ratio
  const headerHeightRem = (calculatedHeaderHeight.value || props.headerHeight || 0) / 16;
  const dynamicHeaderHeight = headerHeightRem * props.headerVisibilityRatio;
  
  // Add padding to prevent touching navbar/header (0.5rem = 8px)
  const paddingTop = 0.5;
  const topValue = `${dynamicHeaderHeight + navbarHeightRem + paddingTop}rem`;

  // Calculate bottom position based on footer visibility
  const footerHeightRem = props.footerHeight / 16;
  const dynamicFooterOffset = footerHeightRem * props.footerVisibilityRatio;
  const paddingBottom = 1; // 1rem bottom padding
  const bottomValue = `${dynamicFooterOffset + paddingBottom}rem`;

  return {
    top: topValue,
    bottom: bottomValue,
    paddingTop: '0.5rem', // Additional internal padding
    paddingLeft: '1rem',  // Side padding to prevent touching edges
    paddingRight: '1rem',
    // Adjust max-height to account for top and bottom positioning
    maxHeight: `calc(100vh - ${topValue} - ${bottomValue})`,
    // Enhanced transition for smoother response during fast scrolling
    transition: 'top 0.1s ease-out, bottom 0.1s ease-out', // Reduced from 0.15s to 0.1s
    // Add transform for hardware acceleration
    transform: 'translateZ(0)',
    // Ensure position updates are immediate
    willChange: 'top, bottom'
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
        <!-- Standalone Sections -->
        <div v-for="item in allSectionsData.filter(item => item && item.isSection)" :key="item.id">
          <NuxtLink
            :to="buildNavTarget(item.id)"
            @click="setActiveItem(item.id)"
            :class="[
              'w-full text-left p-4 rounded-lg transition-all duration-200 group block',
              activeId === item.id
                ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700'
                : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
            ]"
          >
            <div class="flex items-start space-x-3">
              <span
                v-if="item.icon"
                :class="[
                  'w-6 h-6 mt-0.5 transition-colors',
                  activeId === item.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                ]"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(item.icon)"></path>
                </svg>
              </span>
              <div>
                <div class="font-medium">{{ item.name }}</div>
                <div v-if="item.description" class="text-sm text-gray-500 mt-1">{{ item.description }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Groups and Subgroups -->
        <div
          v-for="group in allSectionsData.filter(item => item && !item.isSection)"
          :key="group.group"
          class="rounded-lg overflow-hidden"
        >
            <button
              @click="handleGroupClick(group)"
              :class="[
                'w-full text-left p-4 rounded-lg cursor-pointer transition-all duration-200 group flex justify-between items-center',
                activeGroup === group.group
                  ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' // Group contains active item (emerald)
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900' // Default/hover group header
              ]"
            >
              <div class="flex items-center space-x-1">
                  <span
                    :class="[
                      'w-6 h-6 transition-colors',
                      activeGroup === group.group
                        ? 'text-emerald-600'
                        : 'text-gray-50 group-hover:text-gray-600'
                    ]"
                  >
                      <svg 
                        :class="['h-5 w-5 transform transition-colors duration-200', { 'text-emerald-500': openGroup === group.group.id, 'text-transparent': openGroup !== group.group }]" 
                        fill="currentColor" viewBox="0 0 30 30"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                  </span>
                <span class="font-medium">{{ group.group }}</span>
              </div>
              <svg
                :class="['h-6 w-6 transform transition-transform duration-200', { 'rotate-180': openGroup === group.group }]"
                fill="currentColor" viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-show="shouldHideGroupHeader(group.group) || openGroup === group.group" class="bg-white" >
              <ul class="py-4">
                <!-- Sections within Group -->
                <template v-if="group.sections && Array.isArray(group.sections) && group.sections.length > 0">
                  <li v-for="section in group.sections.filter(section => section && section.id)" :key="section.id">
                    <NuxtLink
                      :to="buildNavTarget(section.id)"
                      @click="setActiveItem(section.id)"
                      :class="[
                        'flex items-center w-full px-4 py-3 rounded-lg text-left cursor-pointer transition-all duration-200 ease-in-out',
                        'hover:bg-gray-100',
                        {
                          'bg-emerald-50 text-emerald-800 font-semibold': section.id === activeId
                        }
                      ]"
                    >
                      <span
                        v-if="section.icon"
                        class="w-3 h-3 mr-3 text-gray-500"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(section.icon)"></path>
                        </svg>
                      </span>
                      <div class="flex-grow">
                        <div class="text-sm font-medium text-gray-900">{{ section.name }}</div>
                        <div v-if="section.description" class="text-xs text-gray-500 mt-1">{{ section.description }}</div>
                      </div>
                    </NuxtLink>
                  </li>
                </template>
                
                <!-- Subgroups within Group -->
                <template v-if="group.subgroups && Array.isArray(group.subgroups) && group.subgroups.length > 0">
                  <li v-for="subgroup in group.subgroups.filter(subgroup => subgroup && subgroup.id)" :key="subgroup.id">
                    <NuxtLink
                      :to="buildNavTarget(subgroup.id)"
                      @click.prevent="handleSubgroupClick(group, subgroup)"
                      :class="[
                        'flex w-full px-4 py-3 rounded-lg text-left cursor-pointer transition-all duration-200 ease-in-out',
                        'hover:bg-gray-100',
                        hasSubgroupItems(subgroup) ? 'items-center justify-between' : 'items-center justify-start',
                        {
                          'bg-emerald-50 border-1 border-emerald-200 text-emerald-800 font-semibold': activeSubgroup === subgroup.id
                        }
                      ]"
                    >
                      <span class="block px-5 text-sm font-semibold text-gray-900 flex-grow">{{ subgroup.subgroup }}</span>
                      <svg
                        v-if="hasSubgroupItems(subgroup)"
                        :class="['h-4 w-4 transform transition-transform duration-200', { 'rotate-180': openSubgroup === subgroup.id }]"
                        fill="currentColor" viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    </NuxtLink>
                    <ul v-if="hasSubgroupItems(subgroup)" v-show="openSubgroup === subgroup.id" class="mt-1 ml-4 py-1">
                      <li v-for="item in (subgroup.items || []).filter(item => item && item.id)" :key="item.id">
                        <a
                          v-if="isProjectsRoute && item.href && (isExternalHref(item.href) || item.external)"
                          :href="normalizeInternalHref(item.href)"
                          :target="item.external ? '_blank' : undefined"
                          :rel="item.external ? 'noopener noreferrer' : undefined"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 text-gray-700'
                          ]"
                        >
                          {{ item.title }}
                        </a>
                        <NuxtLink
                          v-else-if="isProjectsRoute && item.href"
                          :to="normalizeInternalHref(item.href)"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 text-gray-700'
                          ]"
                        >
                          {{ item.title }}
                        </NuxtLink>
                        <NuxtLink
                          v-else
                          :to="buildNavTarget(item.id)"
                          @click="setActiveItem(item.id)"
                          :class="[
                            'block px-6 py-2.5 text-sm transition-colors duration-150',
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
                </template>
                <!-- Direct Items within Group (render even when subgroups exist) -->
                <template v-if="group.items && Array.isArray(group.items) && group.items.length > 0">
                   <li v-for="item in group.items.filter(item => item && item.id)" :key="item.id">
                        <a
                          v-if="isProjectsRoute && item.href && (isExternalHref(item.href) || item.external)"
                          :href="normalizeInternalHref(item.href)"
                          :target="item.external ? '_blank' : undefined"
                          :rel="item.external ? 'noopener noreferrer' : undefined"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 text-gray-700'
                          ]"
                        >
                          {{ item.title }}
                        </a>
                        <NuxtLink
                          v-else-if="isProjectsRoute && item.href"
                          :to="normalizeInternalHref(item.href)"
                          :class="[
                            'block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-gray-50 text-gray-700'
                          ]"
                        >
                          {{ item.title }}
                        </NuxtLink>
                        <NuxtLink
                          v-else
                          :to="buildNavTarget(item.id)"
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
                </template>
              </ul>
            </div>
        </div>
        
        <!-- Dynamic Quick Stats -->
        <div v-if="quickStats && Array.isArray(quickStats) && quickStats.length > 0" class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
          <div class="space-y-2">
            <div v-for="stat in quickStats.filter(stat => stat && stat.label)" :key="stat.label" class="flex justify-between text-sm">
              <span :class="stat.color || 'text-emerald-700'">{{ stat.label }}</span>
              <span :class="'font-medium ' + (stat.color || 'text-emerald-700')">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <!-- Dynamic Quick Actions -->
        <div v-if="quickActions && Array.isArray(quickActions) && quickActions.length > 0" class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div class="space-y-2">
            <component
              v-for="action in quickActions.filter(action => action && action.label)"
              :key="action.label"
              :is="action.href ? 'a' : 'button'"
              :href="action.href"
              :class="[
                'w-full text-left p-3 rounded-lg transition-colors group',
                `hover:bg-${action.color || 'blue'}-50`
              ]"
              @click="handleQuickAction(action.action, 'quickAction', action.href)"
            >
              <div class="flex items-center space-x-3">
                <span v-if="action.icon" :class="[
                  'w-5 h-5',
                  `text-${action.color || 'blue'}-600`
                ]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(action.icon)"></path>
                  </svg>
                </span>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ action.label }}</div>
                  <div v-if="action.description" class="text-xs text-gray-500">{{ action.description }}</div>
                </div>
              </div>
            </component>
          </div>
        </div>

        <!-- Dynamic Help Section -->
        <div v-if="helpSection" class="mt-6 pt-6 border-t border-gray-200">
          <div :class="[
            'rounded-lg p-4',
            helpSection.backgroundColor || 'bg-blue-50'
          ]">
            <div class="flex items-start space-x-3">
              <span class="w-5 h-5 text-gray-800 mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:information-circle')"></path>
                </svg>
              </span>
              <div>
                <h5 class="text-sm font-medium text-gray-800">{{ helpSection.title || 'Need Help?' }}</h5>
                <p v-if="helpSection.description" class="text-xs text-gray-600 mt-1">{{ helpSection.description }}</p>
                
                <!-- Contacts -->
                <div v-if="helpSection.contacts && Array.isArray(helpSection.contacts) && helpSection.contacts.length > 0">
                  <div 
                    v-for="contact in helpSection.contacts.filter(contact => contact && contact.label)" 
                    :key="contact.label" 
                    class="mt-6 pt-2 border-t border-gray-200"
                  >
                    <p class="text-xs text-emerald-700 mt-1">{{ contact.label }}</p>
                    <div class="mt-2 space-y-1">
                      <div v-if="contact.phone" class="text-xs text-emerald-700">
                        <span class="w-3 h-3 inline mr-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:phone')"></path>
                          </svg>
                        </span>
                        {{ contact.phone }}
                      </div>
                      <div v-if="contact.address" class="text-xs text-emerald-700">
                        <span class="w-3 h-3 inline mr-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath('heroicons:map-pin')"></path>
                          </svg>
                        </span>
                        {{ contact.address }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Button -->
                <button 
                  v-if="helpSection.buttonText"
                  @click="handleQuickAction(helpSection.buttonAction, 'helpSection')"
                  class="w-full text-xs bg-gray-800 hover:bg-gray-600 text-white rounded-md py-2 px-3 transition-colors duration-200 mt-3"
                >
                  {{ helpSection.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
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


/* More aggressive override - target all possible selectors */
svg,
svg *,
path,
.sidebar svg,
.general-sidebar svg,
div svg,
button svg,
a svg,
span svg {
  color: inherit !important;
  fill: currentColor !important;
}

/* Prevent ANY external color interference with maximum specificity */
body * svg:not(.text-emerald-500):not(.text-emerald-600):not(.text-transparent),
html * svg:not(.text-emerald-500):not(.text-emerald-600):not(.text-transparent),
* * svg:not(.text-emerald-500):not(.text-emerald-600):not(.text-transparent) {
  color: inherit !important;
  fill: currentColor !important;
}

/* Block the specific unwanted color completely */
*[style*="#6e9d76"],
*[style*="rgb(110, 157, 118)"],
*[style*="6e9d76"] {
  color: inherit !important;
  fill: currentColor !important;
}

/* Ensure intended Tailwind classes work with maximum specificity */
html body .text-emerald-500,
html body .text-emerald-500 svg,
html body svg.text-emerald-500 {
  color: #10b981 !important;
  fill: #10b981 !important;
}

html body .text-emerald-600,
html body .text-emerald-600 svg,
html body svg.text-emerald-600 {
  color: #059669 !important;
  fill: #059669 !important;
}

html body .text-transparent,
html body .text-transparent svg,
html body svg.text-transparent {
  color: transparent !important;
  fill: transparent !important;
}

/* Override any scroll-based or footer-based color changes */
body[data-footer-visible] * svg,
.footer-visible * svg,
.scroll-active * svg,
body[data-scroll] * svg,
html[data-scroll] * svg {
  color: inherit !important;
  fill: currentColor !important;
}

/* Target your specific checkmark icon aggressively 
svg[viewBox="0 0 30 30"],
svg[viewBox="0 0 30 30"] path,
svg[viewBox="0 0 30 30"] *,
.h-5.w-5 svg,
.h-5.w-5 svg path {
  color: inherit !important;
  fill: currentColor !important;
}*/

/* Nuclear option - override everything except explicitly set classes */
:not(.text-emerald-500):not(.text-emerald-600):not(.text-transparent) svg {
  color: inherit !important;
  fill: currentColor !important;
}
</style>
