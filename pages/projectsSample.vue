<script setup>
definePageMeta({
  title: 'Projects'
})
</script>

<template>
  <div>
    <!-- Optional: Add some styling around the iframe -->
    <div class="iframe-container">
      <iframe 
        src="https://projects.nlgfc.gov.mw"
        class="dashboard-iframe"
        title="Projects Dashboard"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh;
  border: none;
  overflow: hidden;
}

.dashboard-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .iframe-container {
    height: 80vh;
  }
}
</style>