<script setup>
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';
import BlocksRenderer from '~/components/BlocksRenderer.vue'
import { usePageBlocks } from '~/composables/usePageBlocks'

definePageMeta({
  title: 'Our Mandate'
})

const { data: pages, pending, error: PageError } = usePageBlocks([
  'fiscal-decentralization','local-development-support','financial-management','igtf-monitoring-dashboard'
])

const route = useRoute()
const activeTab = ref('fiscalDecentralization')

const tabGroups = ref([
  {
    group: 'Our Mandate',
    items: [
      { 
        id: 'fiscalDecentralization', 
        title: 'Fiscal Decentralization',
        children: [
          { id: 'igtfMonitoringDashboard', title: 'IGTF Monitoring Dashboard' }
        ]
      },
      {id: 'igtfMonitoringDashboard', title: 'IGTF Monitoring Dashboard'},
      { id: 'financialManagement', title: 'Financial Management' },
      {
        id: 'localDevelopmentSupport',
        title: 'Local Development Support'
      }
    ]
  }
])

// Map the 'tabGroups' data to the desired structure for the GeneralSidebar
const mappedProjectGroups = computed(() => {
  // Assuming there's only one main group, as per your data
  const mainGroup = tabGroups.value[0];
  
  // Create the final array of items that will be rendered
  const finalItems = [];
  
  // Iterate through the original items and transform them
  mainGroup.items.forEach(item => {
    if (item.children) {
      // For items with children, add both the parent and children as a nested item
      finalItems.push({
        id: item.id,
        title: item.title,
        children: [
          { id: item.id, title: item.title },
          ...item.children
        ]
      });
    } else {
      // For regular items, add them directly
      finalItems.push({
        id: item.id,
        title: item.title
      });
    }
  });

  return [
    {
      group: mainGroup.group,
      items: finalItems
    }
  ];
});

onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  } else {
    activeTab.value = 'fiscalDecentralization'
  }
})

watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})


// Function to handle hash changes
function updateActiveTabFromHash(hash) {
  for (const group of tabGroups.value) {
    for (const item of group.items) {
      if (item.id === hash) {
        activeTab.value = item.id;
        return;
      }
      if (item.children) {
        const match = item.children.find(child => child.id === hash);
        if (match) {
          activeTab.value = match.id;
          return;
        }
      }
    }
  }
}

// Correctly map the data to the projectGroups structure
/*const mappedProjectGroups = computed(() => {
  const finalGroups = [];
  tabGroups.value.forEach(group => {
    // Add the main group
    const mainGroup = {
      group: group.group,
      id: group.group.replace(/\s/g, ''),
      items: []
    };
    finalGroups.push(mainGroup);

    // Iterate through items
    group.items.forEach(item => {
      // If the item has children, create a new nested group
      if (item.children && item.children.length > 0) {
        finalGroups.push({
          group: item.title,
          id: item.id,
          items: item.children
        });
      } else {
        // Otherwise, add the item to the main group
        mainGroup.items.push(item);
      }
    });
  });
  return finalGroups;
});*/


const { projectGroups: sharedProjectGroups } = useGeneralSidebar();

watchEffect(() => {
  sharedProjectGroups.value = mappedProjectGroups.value;
});

</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
    

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 space-y-6">
      <!-- Fiscal Decentralization -->
      <div v-show="activeTab === 'fiscalDecentralization'" class="prose max-w-none">
        <!-- Header Section -->
       
            <BlocksRenderer :blocks="pages?.['fiscal-decentralization']?.blocks || []" />
      </div>

      <!-- IGTF Monitoring Dashboard -->
      <div v-show="activeTab === 'igtfMonitoringDashboard'" class="prose max-w-none">
        <BlocksRenderer :blocks="pages?.['igtf-monitoring-dashboard']?.blocks || []" />
      </div>

      <!-- Financial Management -->
      <div v-show="activeTab === 'financialManagement'" class="prose max-w-none">
        <!-- Header Section -->
        <BlocksRenderer :blocks="pages?.['financial-management']?.blocks || []" />
      </div>

      <!-- Local Development Support -->
      <div v-show="activeTab === 'localDevelopmentSupport'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <BlocksRenderer :blocks="pages?.['local-development-support']?.blocks || []" />
      </div>
    </main>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.bg-blue-50 {
  background-color: #f0f9ff;
}
.font-medium {
  font-weight: 500;
}
.border-l-4 {
  border-left-width: 4px;
}
.border-gray-600 {
  border-color: #4b5563;
}
</style>