<script setup>
// Layout-level logic can go here
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
    
    <AppFooter />
  </div>
</template>