<script setup>
definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const activeTab = ref('SCTP')

const projectGroups = [
  {
    group: 'SSRLP',
    items: [
      { id: 'SCTP', title: 'SCTP' },
      { id: 'publicWorks', title: 'Public Works' },
      { id: 'emergency', title: 'Emergency Cash Transfer' },
      { id: 'livelihoods', title: 'Livelihoods Support' }
    ]
  },
  {
    group: 'GESD',
    items: [
      { id: 'pbg', title: 'Performance Based Grants' },
      { id: 'lapa', title: 'LAPA' },
      { id: 'adaptive', title: 'Adaptive Management' }
    ]
  },
  {
    group: 'RCRP 2',
    items: [
      { id: 'usr', title: 'Urban Social Registry' },
      { id: 'upw', title: 'Urban Public Works' },
      { id: 'pbg2', title: 'Performance Based Grants' }
    ]
  }
]
const openGroup = ref(projectGroups[0].group) // only the first group is open

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
      break
    }
  }
}
</script>

<template>

  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
    <!-- Sidebar for Desktop --> 
    <aside class="w-64 border-r pr-4">
  <div v-for="group in projectGroups" :key="group.group" class="mb-4 border border-gray-200 rounded">
    <div>
      <!-- Group Title -->
      <button
  @click="openGroup = openGroup === group.group ? null : group.group"
  class="w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 cursor-pointer"
>
  {{ group.group }}
</button>

      <!-- Group Items -->
      <div v-show="openGroup === group.group" class="px-4 py-2 space-y-1">
        <ul>
          <li v-for="item in group.items" :key="item.id">
            <a
              :href="`#${item.id}`"
              @click.prevent="() => {
                activeTab = item.id
                history.replaceState(null, '', `#${item.id}`)
              }"
              :class="[
                'block px-3 py-2 rounded text-sm cursor-pointer',
                item.id === activeTab ? 'bg-blue-100 font-medium text-blue-900' : 'hover:bg-gray-100'
              ]"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</aside>


    <!-- Main Content Area -->
    <main class="flex-1">
      <div v-for="group in projectGroups" :key="group.group">
        <div v-for="item in group.items" :key="item.id" v-show="activeTab === item.id">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ item.title }}</h2>
          <p class="text-gray-700 mb-6">Content for {{ item.title }} goes here.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
</style>
