<script setup>
const config = useRuntimeConfig()
const { getExcerpt } = useHtmlUtils()

// Fetch latest posts from API
const { data: postsData, pending: loading, error, refresh: fetchPosts } = useAsyncData(
  'latest-posts-slider',
  () => $fetch(`${config.public.baseUrl || 'http://localhost:8000'}/api/posts/latest/3`),
  {
    server: true,
    lazy: false,
    immediate: true,
  }
)

// Transform API data to match component structure
const newsItems = computed(() => {
  if (!postsData.value) return []
  
  // Handle different response formats
  const postsArray = Array.isArray(postsData.value) 
    ? postsData.value 
    : postsData.value?.data || []
  
  const toStorageUrl = (path) => {
    if (!path || typeof path !== 'string') return '/images/samples/default-news.jpg'
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    return `${config.public.baseUrl || 'http://localhost:8000'}/storage/${path}`
  }

  return postsArray.map((post) => ({
    id: post.id,
    title: post.title || 'Latest News',
    content: getExcerpt(post.content, 150),
    image: toStorageUrl(post.image),
    date: post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    category: post.category?.name || 'News',
    link: `/news#${post.slug || post.id}`,
    readTime: '3 min read'
  }))
})

// Slider functionality
const currentSlide = ref(0);
const autoplay = ref(true);
const autoplayInterval = ref(5000);
let autoplayTimer = null;

const nextSlide = () => {
  if (newsItems.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % newsItems.value.length;
    resetAutoplay();
  }
};

const prevSlide = () => {
  if (newsItems.value.length > 0) {
    currentSlide.value = (currentSlide.value - 1 + newsItems.value.length) % newsItems.value.length;
    resetAutoplay();
  }
};

const goToSlide = (index) => {
  if (newsItems.value.length > 0) {
    currentSlide.value = index;
    resetAutoplay();
  }
};

const resetAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
};

const startAutoplay = () => {
  if (autoplay.value && newsItems.value.length > 0) {
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval.value);
  }
};

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value;
  if (autoplay.value) {
    startAutoplay();
  } else {
    clearInterval(autoplayTimer);
  }
};

// Start autoplay when posts are loaded
watch(() => loading.value, (isLoading) => {
  if (!isLoading && newsItems.value.length > 0) {
    startAutoplay()
  }
})

onBeforeUnmount(() => {
  clearInterval(autoplayTimer);
});

// Handle image errors
const handleImageError = (event) => {
  console.error('Failed to load news image')
  event.target.style.display = 'none'
}
</script>

<template>
  <div class="relative overflow-hidden shadow-2xl h-[450px] md:h-[450px] lg:h-[500px]">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-3 text-gray-600">Loading latest news...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div class="text-center p-6">
        <div class="text-red-600 mb-3">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">Failed to load news</h3>
        <p class="text-gray-600 mb-4">Please try again later.</p>
        <button 
          @click="fetchPosts()" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="newsItems.length === 0" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div class="text-center p-6">
        <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-800 mt-4">No news available</h3>
        <p class="text-gray-600 mt-2">Please check back later for updates.</p>
      </div>
    </div>

    <!-- Slides -->
    <div 
      v-for="(item, index) in newsItems" 
      :key="item.id"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
    >
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0">
        <img 
          :src="item.image"
          :alt="item.title" 
          class="w-full h-full object-cover"
          loading="lazy"
          @error="handleImageError"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <!-- Content Container -->
      <div class="relative h-full flex flex-col justify-end z-20 pb-8 md:pb-12">
        <div class="container mx-auto px-6 pb-8 md:pb-12 lg:px-16 transform translate-y-[-1rem]">
          <NuxtLink :to="item.link" class="group block max-w-3xl cursor-pointer">
            <!-- Category and Date -->
            <div class="mb-4 flex items-center animate-fadeIn">
              <span class="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {{ item.category }}
              </span>
              <span v-if="item.date" class="ml-3 text-sm text-white/80">{{ item.date }}</span>
            </div>

            <!-- Title and Content -->
            <div>
              <h2 class="mb-4 text-3xl font-bold leading-tight text-white animate-fadeIn delay-100 md:text-4xl lg:text-5xl">
                {{ item.title }}
              </h2>
              <div class="mb-6 text-lg text-white/90 animate-fadeIn delay-200 md:text-xl">{{ item.content }}</div>
            </div>

            <!-- Read More Button -->
            <div class="animate-fadeIn delay-300">
              <span class="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">
                Read More
                <svg class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div v-if="newsItems.length > 0" class="absolute bottom-4 left-0 right-0 z-20">
      <div class="container mx-auto px-6 lg:px-16">
        <div class="flex items-center justify-between">
          <!-- Indicators -->
          <div class="flex space-x-2">
            <button 
              v-for="(item, index) in newsItems" 
              :key="'indicator-'+item.id"
              @click="goToSlide(index)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="{ 
                'w-8 bg-white': currentSlide === index, 
                'w-3 bg-white/30 hover:bg-white/50': currentSlide !== index 
              }"
              :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>

          <!-- Navigation Arrows and Autoplay -->
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleAutoplay" 
              class="p-2 text-white/70 hover:text-white transition"
              :aria-label="autoplay ? 'Pause slideshow' : 'Play slideshow'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              </svg>
            </button>

            <button 
              @click="prevSlide" 
              class="p-2 text-white/70 hover:text-white transition"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button 
              @click="nextSlide" 
              class="p-2 text-white/70 hover:text-white transition"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fadeIn {
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.animate-fadeIn.delay-100 {
  animation-delay: 0.2s;
}

.animate-fadeIn.delay-200 {
  animation-delay: 0.4s;
}

.animate-fadeIn.delay-300 {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
