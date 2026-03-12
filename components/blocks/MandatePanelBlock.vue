<script setup lang="ts">
defineProps<{
  icon?: string
  heading?: string
  body?: string
  theme?: 'emerald' | 'blue' | 'indigo' | 'purple' | 'gray'
  heading_level?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
}>()

const themeToClasses = (theme?: string) => {
  switch (theme) {
    case 'blue': return { from: 'from-blue-50', icon: 'text-blue-600', bg: 'bg-blue-50' }
    case 'indigo': return { from: 'from-indigo-50', icon: 'text-indigo-600', bg: 'bg-indigo-50' }
    case 'purple': return { from: 'from-purple-50', icon: 'text-purple-600', bg: 'bg-purple-50' }
    case 'gray': return { from: 'from-gray-50', icon: 'text-gray-600', bg: 'bg-gray-50' }
    case 'emerald':
    default: return { from: 'from-emerald-50', icon: 'text-emerald-600', bg: 'bg-emerald-50' }
  }
}
</script>

<template>
  <div class="bg-gradient-to-br to-gray-50 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col"
       :class="themeToClasses(theme).from">
    <div class="flex items-center mb-0">
      <div class="p-3 rounded-lg mr-5 flex items-center justify-center"
           :class="themeToClasses(theme).bg">
        <svg class="w-6 h-6" :class="themeToClasses(theme).icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <component :is="heading_level || 'h3'" class="font-semibold text-gray-800 flex-1"
                 :class="{
                   'text-3xl': heading_level === 'h1',
                   'text-2xl': heading_level === 'h2',
                   'text-xl': !heading_level || heading_level === 'h3',
                   'text-lg': heading_level === 'h4',
                   'text-base': heading_level === 'h5',
                   'text-sm': heading_level === 'h6',
                 }">
        {{ heading }}
      </component>
    </div>
    <div class="text-gray-700 leading-relaxed pl-16 mt-2 prose max-w-none" v-html="body"></div>
  </div>
</template>



