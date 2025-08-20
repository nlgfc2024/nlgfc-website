<script setup lang="ts">
defineProps<{
  title?: string
  label?: string
  theme?:
    | 'blue' | 'amber' | 'red' | 'green' | 'yellow' | 'gray' | 'slate'
    | 'sky' | 'teal' | 'cyan' | 'pink' | 'lime' | 'violet' | 'fuchsia'
    | 'light-blue' | 'light-green' | 'brown' | 'black' | 'white'
    | 'blue-gray' | 'emerald' | 'indigo' | 'purple' | 'orange' | 'rose'
  show_header?: boolean
  body?: string
  heading_level?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
}>()

const themeToHeader = (theme?: string) => {
  switch (theme) {
    case 'amber': return 'from-amber-50 to-amber-100 border-amber-200'
    case 'red': return 'from-red-50 to-red-100 border-red-200'
    case 'green': return 'from-green-50 to-green-100 border-green-200'
    case 'yellow': return 'from-yellow-50 to-yellow-100 border-yellow-200'
    case 'gray': return 'from-gray-700 to-gray-900 border-gray-800'
    case 'slate': return 'from-slate-700 to-slate-900 border-slate-800'
    case 'sky': return 'from-sky-50 to-sky-100 border-sky-200'
    case 'teal': return 'from-teal-50 to-teal-100 border-teal-200'
    case 'cyan': return 'from-cyan-50 to-cyan-100 border-cyan-200'
    case 'pink': return 'from-pink-50 to-pink-100 border-pink-200'
    case 'lime': return 'from-lime-50 to-lime-100 border-lime-200'
    case 'violet': return 'from-violet-50 to-violet-100 border-violet-200'
    case 'fuchsia': return 'from-fuchsia-50 to-fuchsia-100 border-fuchsia-200'
    case 'light-blue': return 'from-sky-200 to-sky-300 border-sky-300'
    case 'light-green': return 'from-green-200 to-green-300 border-green-300'
    case 'brown': return 'from-orange-900 to-yellow-900 border-yellow-900'
    case 'black': return 'from-black to-gray-900 border-black'
    case 'white': return 'from-gray-50 to-white border-gray-200'
    case 'blue-gray': return 'from-gray-600 to-gray-800 border-gray-700'
    case 'emerald': return 'from-emerald-50 to-emerald-100 border-emerald-200'
    case 'indigo': return 'from-indigo-700 to-indigo-900 border-indigo-800'
    case 'purple': return 'from-purple-50 to-purple-100 border-purple-200'
    case 'orange': return 'from-orange-50 to-orange-100 border-orange-200'
    case 'rose': return 'from-rose-50 to-rose-100 border-rose-200'
    case 'blue':
    default: return 'from-blue-50 to-blue-100 border-blue-200'
  }
}

const themeTextColor = (theme?: string) => {
  switch (theme) {
    case 'black':
    case 'indigo':
    case 'slate':
    case 'gray':
    case 'blue-gray':
      return 'text-white'
    default:
      return 'text-gray-900'
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div
      v-if="show_header !== false"
      class="px-6 py-5 bg-gradient-to-r"
      :class="[themeToHeader(theme), themeTextColor(theme)]"
    >
      <component :is="heading_level || 'h3'" class="font-semibold text-gray-800 flex-1"
                 :class="{
                   'text-3xl': heading_level === 'h1',
                   'text-2xl': heading_level === 'h2',
                   'text-xl': !heading_level || heading_level === 'h3',
                   'text-lg': heading_level === 'h4',
                   'text-base': heading_level === 'h5',
                   'text-sm': heading_level === 'h6',
                 }">
        {{ title }}
      </component>
      <div v-if="label" class="flex items-center text-sm opacity-90">
        <svg
          class="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{ label.toUpperCase() }}
      </div>
    </div>

    <div class="p-6 prose max-w-none">
      <div v-html="body"></div>
    </div>
  </div>
</template>


