<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: '',
  },
  pageSize: {
    type: Number,
    default: 3,
  },
  fallbackImages: {
    type: Array,
    default: () => ['/images/samples/news1.jpg', '/images/samples/news2.jpg', '/images/samples/news3.jpg'],
  },
})

const sortedItems = computed(() => {
  const list = [...(props.items || [])]
  return list.sort((a, b) => {
    const da = new Date(a?.date || 0).getTime()
    const db = new Date(b?.date || 0).getTime()
    return db - da
  })
})

const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
const currentPage = ref(1)
let autoplayTimer = null

const totalPages = computed(() => Math.max(1, Math.ceil(sortedItems.value.length / props.pageSize)))
const featuredItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return sortedItems.value.slice(start, start + props.pageSize)
})

function resetAutoplay() {
  if (!autoplay.value) return
  clearInterval(autoplayTimer)
  if (sortedItems.value.length <= 1) return
  autoplayTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % sortedItems.value.length
  }, autoplayInterval.value)
}

function nextSlide() {
  if (!sortedItems.value.length) return
  currentSlide.value = (currentSlide.value + 1) % sortedItems.value.length
  resetAutoplay()
}

function prevSlide() {
  if (!sortedItems.value.length) return
  currentSlide.value = (currentSlide.value - 1 + sortedItems.value.length) % sortedItems.value.length
  resetAutoplay()
}

function goToSlide(index) {
  if (!sortedItems.value.length) return
  currentSlide.value = index
  resetAutoplay()
}

function toggleAutoplay() {
  autoplay.value = !autoplay.value
  if (autoplay.value) {
    resetAutoplay()
  } else {
    clearInterval(autoplayTimer)
  }
}

function goToPage(n) {
  if (n >= 1 && n <= totalPages.value) {
    currentPage.value = n
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1)
}

function prevPage() {
  if (currentPage.value > 1) goToPage(currentPage.value - 1)
}

watch(() => props.activeTab, () => {
  currentSlide.value = 0
  currentPage.value = 1
  resetAutoplay()
})

watch(sortedItems, () => {
  currentSlide.value = 0
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
  resetAutoplay()
})

onMounted(() => {
  resetAutoplay()
})

onBeforeUnmount(() => {
  clearInterval(autoplayTimer)
})
</script>

<template>
  <div class="space-y-10">
    <section class="relative overflow-hidden rounded-xl shadow-2xl h-[360px] md:h-[420px]">
      <div
        v-for="(item, index) in sortedItems"
        :key="item.id || `slide-${index}`"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
      >
        <div class="absolute inset-0">
          <img :src="item.image || fallbackImages[index % fallbackImages.length]" :alt="item.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div class="relative h-full flex flex-col justify-end z-10 pb-12">
          <div class="px-6">
            <div class="mb-3">
              <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                {{ (activeTab.split('_')[0] || 'Project').toUpperCase() }} News
              </span>
            </div>
            <div class="max-w-3xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{{ item.title }}</h2>
              <p class="text-white/90">{{ item.summary }}</p>
            </div>
            <div class="mt-5" v-if="item.link">
              <NuxtLink :to="item.link" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Read More
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-2 left-0 right-0 z-20 pt-5">
        <div class="px-6 flex items-center justify-between">
          <div class="flex space-x-2">
            <button
              v-for="(_, idx) in sortedItems"
              :key="'ind-' + idx"
              @click="goToSlide(idx)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
            ></button>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="toggleAutoplay" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              </svg>
            </button>
            <button @click="prevSlide" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="nextSlide" class="p-2 text-white/70 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-if="featuredItems.length" class="px-1">
      <div class="grid md:grid-cols-3 gap-6">
        <article
          v-for="(news, nIdx) in featuredItems"
          :key="news.id || `rel-${nIdx}`"
          class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div class="flex h-full">
            <div class="w-1/3 relative overflow-hidden">
              <img
                :src="news.image || fallbackImages[nIdx % fallbackImages.length]"
                alt="Article image"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              >
            </div>
            <div class="w-2/3 p-5 flex flex-col">
              <span class="text-xs font-medium text-gray-500 mb-1 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </span>
              <h3 class="text-lg font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                <NuxtLink :to="news.link">{{ news.title }}</NuxtLink>
              </h3>
              <p class="text-sm text-gray-600 line-clamp-2">{{ news.summary }}</p>
              <NuxtLink :to="news.link" class="mt-auto inline-flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
        <button
          @click="prevPage()"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm rounded-lg border"
          :class="currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
        >
          Previous
        </button>

        <div class="space-x-2">
          <button
            v-for="p in totalPages"
            :key="'lp-' + p"
            @click="goToPage(p)"
            class="px-3 py-2 text-sm rounded-lg border"
            :class="p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
          >
            {{ p }}
          </button>
        </div>

        <button
          @click="nextPage()"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm rounded-lg border"
          :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
        >
          Next
        </button>
      </div>
    </section>
  </div>
</template>
