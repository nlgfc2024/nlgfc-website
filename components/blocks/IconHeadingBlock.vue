<script setup lang="ts">
defineProps<{
  heading?: string
  title?: string
  subheading?: string
  icon?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
  icon_bg?: string
  icon_color?: string
}>()
</script>

<template>
  <div class="flex items-center mb-6" :class="{
    'justify-start text-left': !align || align === 'left',
    'justify-center text-center': align === 'center',
    'justify-end text-right': align === 'right',
  }">
    <div class="p-3 rounded-lg mr-6" :style="{ backgroundColor: icon_bg || '#DBEAFE' }">
      <svg class="w-6 h-6" :style="{ color: icon_color || '#2563EB' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <div>
      <h2 class="font-bold text-gray-900" :class="{
        'text-xl': size === 'sm',
        'text-2xl': !size || size === 'md',
        'text-3xl': size === 'lg',
      }">{{ heading || title }}</h2>
      <p v-if="subheading" class="text-gray-600">{{ subheading }}</p>
    </div>
  </div>
</template>
