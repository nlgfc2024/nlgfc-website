<script setup>
const route = useRoute()

const hideHeaderRoutes = ['/','/index2']
const shouldShowHeader = computed(() => !hideHeaderRoutes.includes(route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <PageHeader v-if="shouldShowHeader" :title="route.meta.title" />

    <main class="flex-grow">
      <slot />
    </main>

    <ChatWidget />
    <AppFooter />
  </div>
</template>
