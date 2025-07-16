<script setup>


const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <PageHeader v-if="!isHomePage" :title="route.meta.title" />
    
    <main class="flex-grow">
      <slot /> <!-- This renders the page content -->
    </main>
     <!-- Chat Widget - Always visible -->
    <ChatWidget />
    <AppFooter />
  </div>
</template>