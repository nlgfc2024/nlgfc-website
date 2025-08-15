<script setup>
import { ref, onMounted, watch } from 'vue';
// Import GeneralSidebar component
import GeneralSidebar from '../../components/GeneralSidebar.vue'; // Adjust path as necessary

definePageMeta({ title: 'Upcoming Projects' })

const route = useRoute()
const activeTab = ref('gesd2')

const projectGroups = [
  {
    group: 'Upcoming Projects',
    items: [
      { id: 'gesd2', title: 'GESD 2.0' },
      { id: 'inspire', title: 'INSPIRE-O' }
    ]
  }
]

// The openGroup state will now be managed internally by GeneralSidebar

const projectContent = {
  gesd2: {
    title: 'Governance to Enable Service Delivery 2.0 (GESD 2.0)',
    body: `
      <p>The <strong>Governance to Enable Service Delivery 2.0 (GESD 2.0)</strong> project is the successor to the current GESD initiative, building on its successes while introducing new innovations in local governance and service delivery.</p>
      
      <h3>Project Overview</h3>
      <p>GESD 2.0 will expand the performance-based financing model to all Local Authorities in Malawi, with enhanced focus on:</p>
      <ul>
        <li>Strengthening fiscal decentralization</li>
        <li>Improving citizen engagement mechanisms</li>
        <li>Enhancing digital governance systems</li>
        <li>Climate-responsive budgeting and planning</li>
      </ul>

      <h3>Key Innovations</h3>
      <ul>
        <li><strong>Digital Governance Platform:</strong> Integrated system for planning, budgeting, and citizen feedback</li>
        <li><strong>Climate-Smart Performance Indicators:</strong> New metrics for environmental sustainability in local governance</li>
        <li><strong>Youth Engagement Framework:</strong> Dedicated mechanisms for youth participation in local decision-making</li>
      </ul>

      <h3>Expected Timeline</h3>
      <p>Project preparation is underway, with expected launch in Q2 2025 and implementation period of 2025-2030.</p>
    `
  },
  inspire: {
    title: 'INSPIRE-O (Integrated Social Protection and Resilience Initiative)',
    body: `
      <p><strong>INSPIRE-O</strong> represents the next generation of social protection programming in Malawi, integrating climate resilience with comprehensive social safety nets.</p>

      <h3>Program Components</h3>
      <ul>
        <li><strong>Adaptive Social Protection:</strong> Shock-responsive systems that automatically scale during crises</li>
        <li><strong>Green Livelihoods:</strong> Climate-smart economic empowerment programs</li>
        <li><strong>Digital Inclusion:</strong> Mobile-based service delivery and financial inclusion</li>
        <li><strong>Urban Resilience:</strong> Specialized programming for rapidly urbanizing areas</li>
      </ul>

      <h3>Innovative Features</h3>
      <ul>
        <li>Integrated climate risk financing mechanism</li>
        <li>AI-powered targeting system</li>
        <li>Blockchain-based payment verification</li>
        <li>Gender-transformative programming</li>
      </ul>

      <h3>Development Status</h3>
      <p>Currently in design phase with World Bank and other development partners. Expected to launch in 2026 with a 7-year implementation horizon.</p>
    `
  }
}

// Set from initial hash on load
onMounted(() => {
  if (route.hash) {
    updateActiveTabFromHash(route.hash.replace('#', ''))
  }
})

// React to hash changes
watch(() => route.hash, (newHash) => {
  if (newHash) {
    updateActiveTabFromHash(newHash.replace('#', ''))
  }
})

function updateActiveTabFromHash(hash) {
  for (const group of projectGroups) {
    const match = group.items.find(item => item.id === hash)
    if (match) {
      activeTab.value = match.id
      // openGroup.value = group.group // GeneralSidebar will handle this based on activeId
      break
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
    <!-- Sidebar -->
    <aside class="w-full md:w-72 flex-shrink-0">
      <GeneralSidebar
        sidebarType="projects"
        :sectionsData="projectGroups"
        :activeId="activeTab"
        sidebarTitle="Browse Upcoming Projects"
        @update:activeId="activeTab = $event"
      />
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0">
      <div v-if="projectContent[activeTab]" class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Project Header -->
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 border-b border-blue-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-1">
            {{ projectContent[activeTab].title }}
          </h2>
          <div class="flex items-center text-sm text-blue-600">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            Upcoming Project
          </div>
        </div>

        <!-- Project Content -->
        <div class="p-6 prose prose-blue max-w-none">
          <div v-html="projectContent[activeTab].body"></div>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-gray-500 italic">No content available for this project.</p>
      </div>
    </main>
  </div>
</template>

<style>
/* Add custom prose styles for the content */
.prose {
  color: #374151;
}

.prose h2,
.prose h3 {
  color: #111827;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.prose h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5em;
}

.prose h3 {
  font-size: 1.25em;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose strong {
  font-weight: 600;
  color: #1e40af;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1e40af;
}
</style>
