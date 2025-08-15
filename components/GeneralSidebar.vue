<script setup>
import { ref, watch, computed } from 'vue';

// Define props to make the component reusable for different sidebar types and data
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
  }
});

// Define emits to notify the parent component of changes to the active item and sidebar visibility
const emit = defineEmits(['update:activeId', 'update:sidebarOpen']);

// Internal reactive state for sidebar open/close, synced with prop
const isSidebarOpen = ref(props.sidebarOpen);

watch(() => props.sidebarOpen, (newVal) => {
  isSidebarOpen.value = newVal;
});

// Reactive state to manage the currently open group for 'projects' sidebar type
const openGroup = ref(null);

// Watch for changes in activeId to automatically open the corresponding project group
// This ensures that if activeId is set by a hash in the URL, the correct group is expanded.
watch(() => props.activeId, (newId) => {
  if (props.sidebarType === 'projects' && newId) {
    // Iterate through project groups to find which one contains the new activeId
    for (const group of props.sectionsData) {
      if (group.items.some(item => item.id === newId)) {
        openGroup.value = group.group; // Set the found group as open
        // Ensure sidebar is open when an item is activated (e.g., from URL hash)
        if (!isSidebarOpen.value) {
          isSidebarOpen.value = true;
          emit('update:sidebarOpen', true);
        }
        break; // Stop after finding the first match
      }
    }
  }
}, { immediate: true }); // 'immediate: true' ensures this watch runs on initial component mount

// Function to set the active item and emit the 'update:activeId' event
const setActiveItem = (id) => {
  emit('update:activeId', id);
  // Hide the sidebar after an item is selected
  isSidebarOpen.value = false;
  emit('update:sidebarOpen', false);
};

// Function to toggle the open/closed state of a project group
const toggleGroup = (groupName) => {
  // If the clicked group is currently closed or a different group is open, open this group
  if (openGroup.value !== groupName) {
    openGroup.value = groupName; // Open the clicked group
    // Find the group object to access its items
    const groupToOpen = props.sectionsData.find(group => group.group === groupName);
    // Automatically select the first item in the opened group if it exists
    if (groupToOpen && groupToOpen.items && groupToOpen.items.length > 0) {
      setActiveItem(groupToOpen.items[0].id); // This will also hide the sidebar
    }
  } else {
    // If the group is already open, close it
    openGroup.value = null;
    // When a group is closed, the activeId remains as it was.
    // You might choose to clear it or set it to a default if desired for your application's flow.
  }
};

// Function to explicitly toggle the sidebar's visibility
const toggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  emit('update:sidebarOpen', isSidebarOpen.value);
};

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
    default:
      return 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'; // Default generic document icon
  }
};
</script>

<template>
  <div>
    <!-- The Sidebar Container -->
    <div
      :class="[
        'fixed top-30 bottom-16 left-0 w-72 bg-white rounded-lg shadow-sm border border-gray-200 p-6 z-10 flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full', // Slides the sidebar in/out
        'transition-transform duration-300 ease-in-out' // Smooth transition for the slide effect
      ]"
    >
      <!-- Optional Sidebar Title -->
      <h3 v-if="sidebarTitle" class="text-lg font-semibold text-gray-900 mb-4">{{ sidebarTitle }}</h3>

      <nav class="flex-grow overflow-y-auto space-y-2 pr-2"> <!-- Added pr-2 for scrollbar spacing -->
        <!-- Conditional rendering for 'opportunities' sidebar layout -->
        <template v-if="sidebarType === 'opportunities'">
          <button
            v-for="section in sectionsData"
            :key="section.id"
            @click="setActiveItem(section.id)"
            :class="[
              'w-full text-left p-4 rounded-lg transition-all duration-200 group',
              activeId === section.id
                ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' // Active state styling
                : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900' // Default/hover state styling
            ]"
          >
            <div class="flex items-start space-x-3">
              <!-- SVG Icon for opportunities sections -->
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
          </button>
        </template>

        <!-- Conditional rendering for 'projects' sidebar layout (collapsible groups) -->
        <template v-else-if="sidebarType === 'projects'">
          <div
            v-for="group in sectionsData"
            :key="group.group"
            class="rounded-lg overflow-hidden"
          >
            <!-- Button for each project group, now adopting emerald theme -->
            <button
              @click="toggleGroup(group.group)"
              :class="[
                'w-full text-left p-4 rounded-lg transition-all duration-200 group flex justify-between items-center',
                openGroup === group.group
                  ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-700' // Active/open group header
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900' // Default/hover group header
              ]"
            >
              <div class="flex items-center space-x-3">
                 <!-- Left-side icon for the group header -->
                <span
                  :class="[
                    'w-6 h-6 transition-colors',
                    openGroup === group.group ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
                  ]"
                >
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(group.groupIcon)"></path>
                    </svg>
                </span>
                <span class="font-medium">{{ group.group }}</span>
              </div>
             
              <!-- Right-side toggle icon -->
              <svg
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-180': openGroup === group.group }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- List of items within the current group, conditionally displayed -->
            <div
              v-show="openGroup === group.group"
              class="bg-white"
            >
              <ul class="py-2">
                <li v-for="item in group.items" :key="item.id">
                  <a
                    :href="`#${item.id}`"
                    @click.prevent="() => { setActiveItem(item.id); history.replaceState(null, '', `#${item.id}`) }"
                    :class="[
                      'block px-5 py-2.5 text-sm transition-colors duration-150',
                      item.id === activeId
                        ? 'bg-emerald-50 text-emerald-700 font-medium border-l-4 border-emerald-600' // Active item styling (emerald)
                        : 'hover:bg-gray-50 text-gray-700' // Default/hover item styling (gray/darker gray)
                    ]"
                  >
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </nav>
    </div>

    <!-- Toggle Button for Sidebar -->
    <button
      @click="toggleSidebarVisibility"
      :class="[
        'fixed top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md z-20',
        isSidebarOpen ? 'left-72 -ml-4' : 'left-0', // Position next to sidebar or at left edge
        'bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out'
      ]"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="isSidebarOpen ? getIconPath('heroicons:chevron-left') : getIconPath('heroicons:chevron-right')"></path>
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
