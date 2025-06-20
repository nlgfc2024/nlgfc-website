<script setup>
const newsItems = ref([
  {
    id: 1,
    title: "New Infrastructure Development Fund Launched",
    excerpt: "The government has announced a new $50 million fund to support critical infrastructure projects across urban centers.",
    image: "/news1.jpg",
    date: "June 15, 2025",
    category: "Announcement",
    link: "#",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Urban Renewal Project Completes Phase One",
    excerpt: "The first phase of the downtown revitalization initiative has been successfully completed, benefiting over 10,000 residents.",
    image: "/news2.jpg",
    date: "June 10, 2023",
    category: "Project Update",
    link: "#",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Annual Local Government Summit 2023",
    excerpt: "Key stakeholders gathered to discuss innovative approaches to fiscal decentralization and community development.",
    image: "/news3.jpg",
    date: "June 5, 2023",
    category: "Event",
    link: "#",
    readTime: "5 min read"
  }
]);

const currentSlide = ref(0);
const autoplay = ref(true);
const autoplayInterval = ref(5000);
let autoplayTimer = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % newsItems.value.length;
  resetAutoplay();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + newsItems.value.length) % newsItems.value.length;
  resetAutoplay();
};

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoplay();
};

const resetAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
};

const startAutoplay = () => {
  if (autoplay.value) {
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

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  clearInterval(autoplayTimer);
});
</script>

<template>
  <div class="relative overflow-hidden shadow-2xl h-[450px] md:h-[450px] lg:h-[500px]">
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
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <!-- Content Container - Moved Up -->
      <div class="relative h-full flex flex-col justify-end z-20 pb-8 md:pb-12"> <!-- Reduced bottom padding -->
        <div class="container mx-auto px-6 pb-8 md:pb-12 lg:px-16 transform translate-y-[-1rem]"> <!-- Added transform -->
          <!-- Category and Date -->
          <div class="flex items-center mb-4 animate-fadeIn">
            <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
              {{ item.category }}
            </span>
          </div>

          <!-- Title and Excerpt -->
          <div class="max-w-3xl">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight animate-fadeIn delay-100">
              {{ item.title }}
            </h2>
            <p class="text-lg md:text-xl text-white/90 mb-6 animate-fadeIn delay-200"> <!-- Reduced margin -->
              {{ item.excerpt }}
            </p>
          </div>

          <!-- Read More Button -->
          <div class="animate-fadeIn delay-300">
            <a 
              :href="item.link" 
              class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 group"
            >
              Read More
              <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls - Moved Up -->
    <div class="absolute bottom-4 left-0 right-0 z-20"> <!-- Changed from bottom-8 -->
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