<script>
definePageMeta({
    title: 'Resource Center' // This will be available in route.meta.title
   })
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <aside class="w-72 bg-gray-100 p-4 border-r overflow-auto">
      <h2 class="text-xl font-bold mb-4">Publications & Downloads</h2>
      <div v-for="group in pubGroups" :key="group.name" class="mb-3">
        <button
          @click="toggleGroup(group.name)"
          class="w-full text-left font-medium flex justify-between items-center py-1"
        >
          {{ group.name }}
          <span>{{ openGroups.includes(group.name) ? '−' : '+' }}</span>
        </button>

        <div v-if="openGroups.includes(group.name)" class="pl-3 mt-1">
          <div v-if="group.subcategories">
            <div v-for="sub in group.subcategories" :key="sub.name" class="mb-1">
              <button
                @click="selectDocuments(sub.documents, `${group.name} - ${sub.name}`)"
                class="w-full text-left hover:underline py-0.5"
              >
                {{ sub.name }}
              </button>
            </div>
          </div>
          <div v-else>
            <button
              @click="selectDocuments(group.documents, group.name)"
              class="text-blue-600 hover:underline text-left w-full py-0.5"
            >
              View {{ group.name }}
            </button>
          </div>
        </div>
      </div>

      <h2 class="text-xl font-bold mt-6 mb-4">Knowledge Management Portal</h2>
      <div v-for="group in kmpGroups" :key="group.name" class="mb-3">
        <button
          @click="selectDocuments(group.documents, group.name)"
          class="w-full text-left text-blue-600 hover:underline py-0.5"
        >
          {{ group.name }}
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 overflow-auto pl-12"> 
      <h1 class="text-3xl font-bold mb-6">Resource Centre</h1>

      <section v-if="displayedDocuments.length">
        <h2 class="text-2xl font-semibold mb-3">{{ currentTitle }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doc in displayedDocuments"
            :key="doc.name"
            class="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between group hover:border-blue-500"
          >
            <a
              :href="doc.link"
              target="_blank"
              class="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
              title="Download / View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
              </svg>
            </a>

            <div class="flex items-center mb-3">
              <img
                v-if="doc.thumbnail"
                :src="doc.thumbnail"
                alt="Thumbnail"
                class="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 class="font-bold text-gray-800 text-lg">{{ doc.name }}</h3>
                <span class="inline-block text-xs bg-gray-200 rounded px-2 py-0.5 mt-1 text-gray-700">
                  {{ doc.type }}
                </span>
              </div>
            </div>

            <p class="text-sm text-gray-600">
              {{ doc.description || 'No description available.' }}
            </p>
          </div>
        </div>
      </section>

      <section v-else>
        <h2 class="text-xl text-gray-500">Select a category to view documents</h2>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Publications & Downloads groups
const pubGroups = [
  {
    name: 'Press Releases',
    documents: [
      {
        name: 'Press Release Jan 2025',
        link: '/downloads/press-jan2025.pdf',
        type: 'PDF',
        thumbnail: '/thumbnails/pdf.png',
        description: 'Summary of January 2025 press release.'
      },
      {
        name: 'Press Release Mar 2025',
        link: '/downloads/press-mar2025.pdf',
        type: 'PDF',
        thumbnail: '/thumbnails/pdf.png',
        description: 'Summary of March 2025 press release.'
      },
      {
        name: 'Press Release Mar 2025',
        link: '/downloads/press-mar2025.pdf',
        type: 'PDF',
        thumbnail: '/thumbnails/pdf.png',
        description: 'Summary of March 2025 press release.'
      }
    ]
  },
  {
    name: 'Success Stories',
    documents: [
      {
        name: 'Community Success 1',
        link: '/downloads/success1.pdf',
        type: 'PDF',
        thumbnail: '/thumbnails/pdf.png',
        description: 'Story of community success.'
      }
    ]
  },
  {
    name: 'Project Documents',
    subcategories: [
      {
        name: 'SSRLP',
        documents: [
          {
            name: 'SSRLP Report 2025',
            link: '/downloads/ssrlp-report-2025.pdf',
            type: 'PDF',
            thumbnail: '/thumbnails/pdf.png',
            description: 'SSRLP annual report.'
          }
        ]
      },
      {
        name: 'GESD',
        documents: [
          {
            name: 'GESD Plan 2025',
            link: '/downloads/gesd-plan-2025.pdf',
            type: 'PDF',
            thumbnail: '/thumbnails/pdf.png',
            description: 'GESD strategic plan 2025.'
          }
        ]
      },
      {
        name: 'RCRP',
        documents: [
          {
            name: 'RCRP Document 2025',
            link: '/downloads/rcrp-doc-2025.pdf',
            type: 'PDF',
            thumbnail: '/thumbnails/pdf.png',
            description: 'RCRP 2025 project document.'
          }
        ]
      }
    ]
  }
]

// Knowledge Management Portal groups
const kmpGroups = [
  {
    name: 'Media',
    documents: [
      {
        name: 'Photo 1',
        link: '/media/photo1.jpg',
        type: 'JPG',
        thumbnail: '/thumbnails/photo.png',
        description: 'Event photo from 2025.'
      }
    ]
  },
  {
    name: 'Videos',
    documents: [
      {
        name: 'Intro Video',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'YouTube',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        description: 'Introductory video about our work.'
      }
    ]
  }
]

// State
const openGroups = ref([])
const displayedDocuments = ref([])
const currentTitle = ref('')

// Functions
function toggleGroup(name) {
  if (openGroups.value.includes(name)) {
    openGroups.value = openGroups.value.filter(g => g !== name)
  } else {
    openGroups.value.push(name)
  }
}

function selectDocuments(docs, title) {
  displayedDocuments.value = docs
  currentTitle.value = title
}
</script>

<style scoped>
/* You could further customize hover effects or card layout here if needed */
</style>