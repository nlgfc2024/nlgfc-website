<script setup lang="ts">
const featuredNews = [
  {
    title: "Empowering Local Governments Through Financial Excellence",
    description: "Discover how NLGFC is transforming local government financial management across the nation.",
    image: "https://picsum.photos/1600/800?random=1",
    buttons: [{ text: "Learn More", url: "/about", primary: true }],
    isFeatured: true
  },
  {
    title: "Annual Local Government Finance Conference 2025",
    description: "Join us for the premier gathering of financial professionals in local government.",
    image: "https://picsum.photos/1600/800?random=3",
    buttons: [{ text: "Register Now", url: "/conference", primary: true }],
    isFeatured: true
  },
  {
    title: "GESD Project: Governance for Effective Service Delivery",
    description: "See how we're improving service delivery through better governance practices.",
    image: "https://picsum.photos/1600/800?random=4",
    buttons: [{ text: "Project Details", url: "/projects/gesd", primary: true }],
    isFeatured: true
  }
]

const latestNews = [
  { title: "Expanded Screening and Vetting for Visa Applicants", image: "https://picsum.photos/100/100?random=11", url: "/news/visa" },
  { title: "Department Press Briefing", image: "https://picsum.photos/100/100?random=12", url: "/news/briefing" },
  { title: "The U.S. Army at 250: A Civilian-Centered Force", image: "https://picsum.photos/100/100?random=13", url: "/news/army" }
]

// Optional date formatter to mock real dates
function formatDate(index: number): string {
  const base = new Date()
  base.setDate(base.getDate() - index)
  return base.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  }).toUpperCase()
}
</script>

<template>
  <!-- Featured News Carousel -->
  <section class="relative w-full h-[400px] overflow-hidden -mt-px bg-white">
    <UCarousel
      v-slot="{ item }"
      :items="featuredNews"
      loop
      fade
      arrows
      dots
      :autoplay="{ delay: 5000 }"
      class="w-full h-full"
      :ui="{
        item: 'w-full h-full flex-shrink-0',
        container: 'h-full'
      }"
    >
      <div class="relative w-full h-full py-5">
        <img
          :src="item.image"
          :alt="item.title"
          class="absolute inset-0 w-full h-[400px] object-cover object-center"
        />
        <div class="absolute inset-0 bg-primary-900/1"></div>

        <div class="relative h-full flex items-center">
          <UContainer class="text-white px-8">
            <div class="max-w-2xl space-y-6">
              <h2
                v-if="item.isFeatured"
                class="text-xl font-semibold text-red-400 uppercase tracking-widest"
              >
                Featured News
              </h2>

              <h1 class="text-4xl md:text-5xl font-bold leading-tight">
                {{ item.title }}
              </h1>
              <p class="text-lg md:text-xl">{{ item.description }}</p>
              <div class="flex flex-wrap gap-4 pt-4">
                <UButton
                  v-for="(button, index) in item.buttons"
                  :key="index"
                  :to="button.url"
                  :label="button.text"
                  
                  variant="solid"
                  size="lg"
                />
              </div>
            </div>
          </UContainer>
        </div>
      </div>
    </UCarousel>
  </section>

  <!-- New Latest News Layout -->
<section class="bg-white py-1 border-t border-gray-200">
  <UContainer>
    <!-- Flex container to align cards and button -->
    <div class="flex justify-between items-start">
      <!-- News Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1">
        <div
          v-for="(item, index) in latestNews"
          :key="index"
          class="flex flex-col md:flex-row md:items-center gap-4 md:border-r last:border-none pr-4"
        >
          <div class="space-y-1">
            <p class="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              {{ formatDate(index) }}
            </p>
            <NuxtLink
              :to="item.url"
              class="text-lg font-medium text-sky-700 hover:underline leading-snug"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
          <img
            :src="item.image"
            alt="News Image"
            class="w-20 h-20 object-cover rounded-md hidden md:block"
          />
        </div>
      </div>

      <!-- Explore More Button -->
      <div class="ml-4 py-10">
        <NuxtLink
          to="/news"
          class="inline-block bg-success-700 text-white text-sm font-semibold px-4 py-1 rounded hover:bg-sky-800"
        >
          Explore More
        </NuxtLink>
      </div>
    </div>
  </UContainer>
</section>

</template>
