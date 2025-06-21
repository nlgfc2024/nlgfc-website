<script setup>
definePageMeta({ title: 'Current Projects' })

const route = useRoute()
const isDrawerOpen = ref(false)
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

function generateAccordionItems() {
  return projectGroups.map(group => ({
    label: group.group,
    icon: 'i-heroicons-folder-open',
    defaultOpen: true,
    content: () => h(
      'ul',
      { class: 'space-y-1 mt-2 pl-2' },
      group.items.map(item =>
        h(
          'li',
          {},
          h(
            'a',
            {
              href: `#${item.id}`,
              onClick: (e) => {
                e.preventDefault()
                activeTab.value = item.id
                history.replaceState(null, '', `#${item.id}`)
                isDrawerOpen.value = false
              },
              class: [
                'block px-3 py-2 rounded text-sm cursor-pointer',
                item.id === activeTab.value ? 'bg-blue-100 font-medium text-blue-900' : 'hover:bg-gray-100'
              ]
            },
            item.title
          )
        )
      )
    )
  }))
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">


    <!-- Drawer for Mobile -->
 <!-- Mobile Drawer Toggle Button -->
<div class="md:hidden">
  <UButton @click="isDrawerOpen = true" label="☰ Projects" variant="soft" />
</div>

<!-- Drawer for Mobile -->
<UDrawer v-model="isDrawerOpen" side="left">
  <template #content>
    <div class="p-4 space-y-4">
      <div v-for="group in projectGroups" :key="group.group">
        <details open class="border border-gray-200 rounded">
          <summary class="cursor-pointer px-4 py-2 font-semibold bg-gray-100">
            {{ group.group }}
          </summary>
          <ul class="space-y-1 px-4 py-2">
            <li v-for="item in group.items" :key="item.id">
              <a
                :href="`#${item.id}`"
                @click.prevent="() => {
                  activeTab = item.id
                  history.replaceState(null, '', `#${item.id}`)
                  isDrawerOpen = false
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
        </details>
      </div>
    </div>
  </template>
</UDrawer>



    <!-- Sidebar for Desktop -->
    <!-- Sidebar -->
<aside class="hidden md:block w-64 border-r pr-4">
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
