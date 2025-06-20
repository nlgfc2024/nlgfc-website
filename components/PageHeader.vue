
<template>
  <div class="relative">
    <!-- Background with enhanced overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="backgroundImage" 
        alt="Page header background" 
        class="w-full h-full object-cover"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center">
        <!-- Enhanced Breadcrumbs -->
        <nav class="flex justify-center mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a href="/" class="inline-flex items-center text-sm md:text-base font-medium text-white hover:text-blue-300 transition-colors duration-200 group">
                <svg class="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Home
              </a>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
              <div class="flex items-center">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-blue-400/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <a 
                  :href="crumb.path" 
                  class="ml-1 md:ml-2 text-sm md:text-base font-medium text-white hover:text-blue-300 transition-colors duration-200"
                  :class="{
                    'text-blue-300 font-semibold': index === breadcrumbs.length - 1,
                    'text-white/90': index !== breadcrumbs.length - 1
                  }"
                  :aria-current="index === breadcrumbs.length - 1 ? 'page' : null"
                >
                  {{ crumb.name }}
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Page title with subtle text shadow -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 tracking-tight">
          <span class="relative">
            <span class="relative z-10">{{ title }}</span>
            <span class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent blur-md opacity-70 -z-0"></span>
          </span>
        </h1>
        
        <!-- Page description with improved readability -->
        <p 
          v-if="description" 
          class="max-w-2xl md:max-w-3xl mx-auto text-base md:text-lg text-gray-100/90 leading-relaxed"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  backgroundImage: {
    type: String,
    default: '/news2.jpg'
  }
});
</script>

<style scoped>

.relative {
  min-height: 280px;
}

@media (min-width: 768px) {
  .relative {
    min-height: 350px;
  }
}

/* Smooth transitions for hover effects */
a {
  transition: color 0.2s ease, transform 0.2s ease;
}

a:hover {
  transform: translateY(-1px);
}
</style>