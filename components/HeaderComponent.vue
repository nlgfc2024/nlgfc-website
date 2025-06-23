<template>
    
    <header class="sticky top-0 z-50 bg-white shadow-md">
  <!-- Top Bar -->
  <div style="background-color: #070738" class="text-white relative">
    <UContainer class="flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-lg font-bold hidden sm:inline pl-9 pt-4">
          National Local Government Finance Committee
        </span>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <SocialLinks />
        <UButton
          to="/cms-login"
          color="white"
          variant="solid"
          label="CMS Login"
          class="hidden sm:inline-flex"
        />
        <button
          class="sm:hidden text-white focus:outline-none"
          @click="mobileNavOpen = !mobileNavOpen"
          aria-label="Toggle menu"
        >
          <UIcon name="i-lucide-menu" class="w-6 h-6" />
        </button>
      </div>
    </UContainer>
  </div>

  <!-- Overlay Logo Positioned Absolutely -->
<!-- Overlay Logo Positioned Absolutely and Responsive -->
<div class="absolute left-6 sm:left-12 top-2 sm:top-[1rem] z-50 pointer-events-none">
  <img
    src="public/nlgfc.png"
    alt="Overlay Logo"
    class="h-12 sm:h-20 w-auto rounded shadow-lg"
  />
</div>


  <!-- Main Navigation -->
  <nav class="bg-white border-b border-gray-200 pl-10">
    <UContainer class="relative py-3">
      <ul
        class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0"
        :class="{ block: mobileNavOpen || !isMobile, hidden: !mobileNavOpen && isMobile }"
        role="menubar"
      >
        <li
          v-for="(item, index) in navItems"
          :key="index"
          class="relative group"
          @mouseenter="openMenu(index)"
          @mouseleave="closeMenu"
          @focusin="openMenu(index)"
          @focusout="closeMenu"
          role="none"
        >
          <NuxtLink
            :to="item.link"
            class="px-4 py-3 flex items-center justify-between gap-1 font-medium text-gray-900 hover:text-primary transition-colors w-full"
            :class="{ 'text-primary': activeIndex === index }"
            @click.prevent="handleClick(index)"
            role="menuitem"
            tabindex="0"
            :aria-expanded="activeIndex === index ? 'true' : 'false'"
            :aria-haspopup="!!item.children"
          >
            {{ item.label }}
            <UIcon
              v-if="item.children"
              name="i-lucide-chevron-down"
              class="w-4 h-4 ml-1 transition-transform duration-200"
              :class="{ 'rotate-180': activeIndex === index }"
              aria-hidden="true"
            />
          </NuxtLink>

          <!-- Desktop Mega Menu -->
          <transition name="fade-slide">
            <div
              v-if="item.children && activeIndex === index && !isMobile"
              class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-6 z-50 w-[800px] flex justify-between border-t-2 border-primary"
              @click.stop
              role="menu"
            >
              <div
                v-for="(column, ci) in item.children"
                :key="ci"
                class="w-1/3 space-y-3"
              >
                <h3 class="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                  {{ column.title }}
                </h3>
                <ul class="space-y-2" role="none">
                  <li v-for="(link, li) in column.links" :key="li" role="none">
                    <NuxtLink
                      :to="link.url"
                      class="text-gray-700 hover:text-primary transition-colors block py-1"
                      active-class="text-primary font-medium"
                      role="menuitem"
                      tabindex="-1"
                    >
                      {{ link.text }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

          <!-- Mobile Accordion -->
          <div
            v-if="item.children && activeIndex === index && isMobile"
            class="pl-6 pr-2 pb-4 bg-gray-50"
          >
            <div v-for="(column, ci) in item.children" :key="ci" class="mb-4">
              <h3 class="text-base font-semibold text-gray-800 mb-2">
                {{ column.title }}
              </h3>
              <ul class="space-y-1">
                <li v-for="(link, li) in column.links" :key="li">
                  <NuxtLink
                    :to="link.url"
                    class="block text-sm text-gray-700 hover:text-primary"
                  >
                    {{ link.text }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </UContainer>
  </nav>
</header>

  </template>
  <script setup>
import { ref, onMounted } from 'vue'

const activeIndex = ref(null)
const isMobile = ref(false)
const mobileNavOpen = ref(false)
let closeTimeout = null

const openMenu = (idx) => {
  if (closeTimeout) clearTimeout(closeTimeout)
  if (!isMobile.value) activeIndex.value = idx
}

const closeMenu = () => {
  if (!isMobile.value) {
    closeTimeout = setTimeout(() => {
      activeIndex.value = null
    }, 200)
  }
}

const handleClick = (idx) => {
  if (isMobile.value) {
    activeIndex.value = activeIndex.value === idx ? null : idx
  }
}

onMounted(() => {
  const updateMobile = () => {
    isMobile.value = window.innerWidth < 768
    if (isMobile.value) {
      activeIndex.value = null
      mobileNavOpen.value = false
    }
  }
  updateMobile()
  window.addEventListener('resize', updateMobile)
})

const navItems = [
{ label: 'Home', link: '/', children: null },
  {
    label: 'About Us',
    link: '/about',
    children: [
      {
        title: 'About NLGFC',
        links: [
          { text: 'Our Mandate', url: '/about/mandate' },
          { text: 'Our Vision', url: '/about/vision' },
          { text: 'Mission', url: '/about/mission' },
          { text: 'Core Values', url: '/about/values' },
        ],
      },
      {
        title: 'Our Team',
        links: [
          { text: 'Leadership', url: '/about/leadership' },
          { text: 'Departments', url: '/about/departments' },
          { text: 'Staff Directory', url: '/about/staff' },
        ],
      },
      {
        title: 'Reports',
        links: [
          { text: 'Annual Reports', url: '/about/reports/annual' },
          { text: 'Financial Reports', url: '/about/reports/financial' },
          { text: 'Performance Reports', url: '/about/reports/performance' },
        ],
      },
    ],
  },
  {
    label: 'Projects',
    link: '/projects',
    children: [
      {
        title: 'Current Projects',
        links: [
          { text: 'SSRP', url: '/projects/ssrp' },
          { text: 'GESD', url: '/projects/gesd' },
          { text: 'RCRP 2', url: '/projects/rcrp2' },
        ],
      },
      {
        title: 'Project Resources',
        links: [
          { text: 'Documents', url: '/projects/documents' },
          { text: 'Guidelines', url: '/projects/guidelines' },
          { text: 'Implementation', url: '/projects/implementation' },
        ],
      },
      {
        title: 'Project News',
        links: [
          { text: 'Updates', url: '/projects/updates' },
          { text: 'Events', url: '/projects/events' },
          { text: 'Success Stories', url: '/projects/stories' },
        ],
      },
    ],
  },
  { label: 'Local Councils', link: '/councils', children: null },
  {
    label: 'Resource Centre',
    link: '/resources',
    children: [
      {
        title: 'Publications',
        links: [
          { text: 'Recent Publications', url: '/resources/publications' },
          { text: 'Research Papers', url: '/resources/research' },
          { text: 'Policy Briefs', url: '/resources/policy-briefs' },
        ],
      },
      {
        title: 'Media',
        links: [
          { text: 'Photos', url: '/resources/photos' },
          { text: 'Videos', url: '/resources/videos' },
          { text: 'Infographics', url: '/resources/infographics' },
        ],
      },
      {
        title: 'Data & Statistics',
        links: [
          { text: 'Financial Data', url: '/resources/financial-data' },
          { text: 'Performance Data', url: '/resources/performance-data' },
          { text: 'Open Data Portal', url: '/resources/open-data' },
        ],
      },
    ],
  },
  { label: 'Opportunities', link: '/opportunities', children: null },
  { label: 'Contact Us', link: '/contact', children: null },
]
</script>
