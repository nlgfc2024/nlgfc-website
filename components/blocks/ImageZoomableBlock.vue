<script setup lang="ts">
const props = defineProps<{ src: string; alt?: string }>()

const zoom = ref(100)
const imageLoaded = ref(false)
const zoomIn  = () => { if (zoom.value < 200) zoom.value += 25 }
const zoomOut = () => { if (zoom.value > 50)  zoom.value -= 25 }
const downloadImage = () => {
  const link = document.createElement('a')
  link.href = props.src
  link.download = (props.alt || 'image').replace(/\s+/g, '-') + '.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow border border-gray-200">
    <div class="flex justify-between items-center p-3 border-b border-gray-200">
      <div class="flex space-x-2">
        <div class="flex items-center space-x-1 bg-gray-100 rounded-md px-2">
          <button @click="zoomOut" :disabled="zoom <= 50" class="p-1 text-gray-700 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <span class="text-sm">{{ zoom }}%</span>
          <button @click="zoomIn" :disabled="zoom >= 200" class="p-1 text-gray-700 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      <button @click="downloadImage" class="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="text-sm">Download</span>
      </button>
    </div>

    <div class="relative overflow-hidden h-96">
      <div
        class="absolute inset-0 flex items-center justify-center transition-transform duration-200"
        :style="{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }"
      >
        <img :src="src" :alt="alt || ''" class="max-w-full max-h-full object-contain" @load="imageLoaded = true" />
      </div>
      <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
</template>
