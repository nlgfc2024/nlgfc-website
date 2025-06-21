<script setup>
definePageMeta({ title: 'Past Projects' })

const route = useRoute()

const activeTab = ref('MASAF')

const projectGroups = [
  {
    group: 'Past Projects',
    items: [
      { id: 'masaf', title: 'MASAF' },
      { id: 'miera', title: 'MIERA' }
      
    ]
  },
 
]

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
    <!-- Sidebar -->
<aside class=" w-64 border-r pr-4">
  <div v-for="group in projectGroups" :key="group.group" class="mb-4">
    <details open class="border border-gray-200 rounded">
      <summary class="cursor-pointer px-4 py-2 font-semibold bg-gray-100">
        {{ group.group }}
      </summary>
      <ul class="space-y-1 px-4 py-2">
        <li v-for="item in group.items" :key="item.id">
          <a
            :href="`#${item.id}`"
            @click.prevent="() => { activeTab = item.id; history.replaceState(null, '', `#${item.id}`) }"
            :class="[
              'block px-3 py-2 rounded text-sm cursor-pointer',
              item.id === activeTab ? 'bg-blue-100 font-medium text-blue-900' : 'hover:bg-gray-100'
            ]"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </details>
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
