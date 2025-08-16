<template>
  <div class="relative">
    <div class="absolute inset-0 z-0">
      <img 
        :src="backgroundImage" 
        alt="Page header background" 
        class="w-full h-full object-cover"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
    </div>
    
    <div class="relative z-10 py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center">
        <nav class="flex justify-center mb-2 md:mb-3" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2">
            <li class="inline-flex items-center">
              <a href="/" class="inline-flex items-center text-xs md:text-sm font-medium text-white hover:text-blue-300 transition-colors duration-200 group">
                <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Home
              </a>
            </li>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
              <div class="flex items-center">
                <svg class="w-4 h-4 md:w-5 md:h-5 text-blue-400/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <a 
                  :href="crumb.path" 
                  class="ml-1 text-xs md:text-sm font-medium text-white hover:text-blue-300 transition-colors duration-200"
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

        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight">
          <span class="relative">
            <span class="relative z-10">{{ title }}</span>
            <span class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent blur-md opacity-70 -z-0"></span>
          </span>
        </h1>
        
        <p 
          v-if="description" 
          class="max-w-2xl md:max-w-3xl mx-auto text-xs md:text-sm text-gray-100/90 leading-snug"
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
    default: '/images/samples/news2.jpg'
  }
});
</script>

<style scoped>
.relative {
  min-height: 150px; /* Reduced from 200px */
}

@media (min-width: 768px) {
  .relative {
    min-height: 150px; /* Reduced from 200px */
  }
}

/* Keep existing transition styles */
a {
  transition: color 0.2s ease, transform 0.2s ease;
}

a:hover {
  transform: translateY(-1px);
}
</style>