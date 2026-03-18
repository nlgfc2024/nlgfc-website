<template>
  <div class="container mx-auto max-w-screen-2xl px-4 py-6 sm:py-8">
    <div class="min-w-0">
      <section v-if="activeGroup !== null">
        <h3 class="mb-6 text-lg font-bold text-gray-600">{{ currentTitle }}</h3>
        <!-- Search Bar Section -->
        <div v-if="activeGroup !== null" class="mb-8">
            <div class="mx-auto max-w-md lg:max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-600 focus:border-gray-800 transition-colors duration-200"
                    :placeholder="`Search in ${currentTitle}...`"
                    @input="handleSearch"
                />
                <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                      @click="clearSearch"
                      class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Search Results Summary -->
            <div v-if="searchQuery" class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                <span v-if="filteredDocuments.length > 0">
                  Found {{ filteredDocuments.length }} result{{ filteredDocuments.length !== 1 ? 's' : '' }} for "<span class="font-semibold text-emerald-600">{{ searchQuery }}</span>"
                </span>
                <span v-else class="text-red-600">
                  No results found for "<span class="font-semibold">{{ searchQuery }}</span>"
                </span>
              </p>
            </div>
        </div>
        
        <!-- News Layout - Simple List Similar to news.vue -->
        <div v-if="currentDisplayType === 'News'" class="rounded-lg bg-white p-4 shadow-lg sm:p-6">
          <div class="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-800 text-white shadow-xl">
            <div class="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p class="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                  Resource Center
                </p>
                <h4 class="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Latest updates, announcements, and stories from NLGFC
                </h4>
                <p class="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/90 sm:text-base">
                  Browse recent news, featured developments, and timely updates from across our programs, local authorities, and institutional work.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-2xl font-semibold">{{ filteredDocuments.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-100">Visible Stories</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-2xl font-semibold">{{ displayedDocuments.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-100">News Total</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="newsLoading" class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div v-for="n in 6" :key="n" class="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div class="aspect-[4/3] w-full bg-gray-200"></div>
              <div class="space-y-3 p-5">
                <div class="h-5 w-5/6 rounded bg-gray-200"></div>
                <div class="h-4 w-full rounded bg-gray-200"></div>
                <div class="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div v-else-if="newsError" class="p-6 text-center text-gray-500">
            <p class="text-sm">Latest news could not be loaded.</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="newsItem in paginatedDocuments"
              :key="newsItem.id"
            >
              <nuxt-link
                :to="`/news#${newsItem.slug || newsItem.id}`"
                class="group block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div class="flex h-full flex-col">
                  <div class="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      :src="newsItem.image"
                      :alt="newsItem.title"
                      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      @error="handleNewsImageError"
                    />
                  </div>
                  <div class="flex flex-1 flex-col p-5">
                    <h4 class="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                      {{ newsItem.title }}
                    </h4>
                    <p class="mb-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
                      {{ newsItem.description }}
                    </p>
                    <div class="flex flex-col gap-2 border-t border-gray-100 pt-4 text-xs uppercase tracking-[0.14em] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                      <span>{{ formatDate(newsItem.date) }}</span>
                      <span>{{ newsItem.source }}</span>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>

          <!-- No Results Message -->
          <div v-if="!newsLoading && !newsError && filteredDocuments.length === 0" class="p-6 text-center text-gray-500">
            <svg
              class="w-12 h-12 mx-auto mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 
                  5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 
                  12.272 5.13 11.638 5 11a8 8 0 118 8 
                  7.956 7.956 0 01-4.709-1.534A7.956 7.956 
                  0 0112 21a7.956 7.956 0 01-4.709-1.534"
              ></path>
            </svg>
            <p class="text-sm">No news articles available.</p>
          </div>

          <div
            v-if="!newsLoading && !newsError && shouldPaginateCurrentView && filteredDocuments.length > 0"
            class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Pagination
              v-model:currentPage="currentPage"
              v-model:itemsPerPage="itemsPerPage"
              :total-items="filteredDocuments.length"
            />
          </div>
        </div>


        <!-- Video Grid Layout -->
        <div v-else-if="currentDisplayType === 'Video' && currentVideosLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-for="n in 4" :key="n" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div class="relative w-full overflow-hidden bg-gray-200 pt-[56.25%] animate-pulse"></div>
            <div class="space-y-3 p-4">
              <div class="h-5 w-3/4 rounded bg-gray-200"></div>
              <div class="h-4 w-full rounded bg-gray-200"></div>
              <div class="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div v-else-if="currentDisplayType === 'Video' && currentVideosError" class="rounded-lg bg-white p-8 text-center shadow-sm">
          <p class="text-sm text-gray-600">Videos could not be loaded from the API.</p>
        </div>

        <div v-else-if="currentDisplayType === 'Video'">
          <div v-if="filteredDocuments.length === 0" class="rounded-lg bg-white p-8 text-center shadow-sm">
            <p class="text-sm text-gray-600">No active videos are available from the API.</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
                v-for="(doc, index) in paginatedDocuments"
                :key="doc.name"
                class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="relative w-full overflow-hidden bg-gray-100 pt-[56.25%]">
                <iframe
                    :src="getVideoEmbedUrl(doc.link)"
                    class="absolute inset-0 h-full w-full border-0"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                    :title="doc.name"
                ></iframe>
              </div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-800 mb-2">{{ doc.name }}</h4>
                <p class="text-sm text-gray-600 mb-2">{{ doc.description }}</p>
                <a href="https://www.youtube.com/@nlgfcmalawi2455">
                  <p class="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 mb-2">Watch More on NLGFC YouTube Channel</p>
                </a>
                <span class="inline-block text-xs bg-red-100 text-red-600 rounded px-2 py-1">
                  {{ doc.type }}
                </span>
                <p class="mt-3 break-all text-[11px] text-gray-500">
                  Debug embed URL: {{ getVideoEmbedUrl(doc.link) }}
                </p>
                <p class="mt-3 text-[12px] font-semibold text-emerald-600">
                  {{ doc.date ? formatDate(doc.date) : 'No date available.' }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="shouldPaginateCurrentView && filteredDocuments.length > 0"
            class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Pagination
              v-model:currentPage="currentPage"
              v-model:itemsPerPage="itemsPerPage"
              :total-items="filteredDocuments.length"
            />
          </div>
        </div>

        <!-- Image Gallery Layout -->
        <div v-else-if="currentDisplayType === 'Image Gallery' && currentGalleryLoading" class="space-y-6">
          <div class="overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-800 p-6 text-white shadow-xl sm:p-8">
            <div class="animate-pulse space-y-4">
              <div class="h-4 w-28 rounded bg-white/20"></div>
              <div class="h-10 w-2/3 rounded bg-white/20"></div>
              <div class="h-4 w-1/2 rounded bg-white/20"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div class="h-[420px] animate-pulse rounded-[28px] bg-gray-200"></div>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="n in 4" :key="n" class="aspect-[4/5] animate-pulse rounded-[24px] bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div v-else-if="currentDisplayType === 'Image Gallery' && currentGalleryError" class="rounded-lg bg-white p-8 text-center shadow-sm">
          <p class="text-sm text-gray-600">Image gallery items could not be loaded from the API.</p>
        </div>

        <div v-else-if="currentDisplayType === 'Image Gallery'" class="space-y-6">
          <div class="overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-800 text-white shadow-xl">
            <div class="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p class="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                  Knowledge Management
                </p>
                <h4 class="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Moments from local government work across Malawi
                </h4>
                <p class="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/90 sm:text-base">
                  Explore field photography, project highlights, and documentation snapshots from the NLGFC image archive.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-2xl font-semibold">{{ filteredDocuments.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-100">Visible Images</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-2xl font-semibold">{{ displayedDocuments.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-100">Archive Total</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredDocuments.length === 0" class="rounded-lg bg-white p-8 text-center shadow-sm">
            <p class="text-sm text-gray-600">
              {{ searchQuery ? 'No gallery images matched your search.' : 'No image gallery items are available right now.' }}
            </p>
          </div>

          <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <button
                v-for="doc in paginatedDocuments"
                :key="doc.id"
                type="button"
                class="group overflow-hidden rounded-[22px] border border-gray-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                @click="openGalleryImage(doc)"
              >
                <div class="flex h-full flex-col">
                  <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      :src="doc.image"
                      :alt="doc.name"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      @error="handleGalleryImageError"
                    />
                  </div>
                  <div class="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h5 class="line-clamp-2 text-base font-semibold leading-snug text-gray-900">
                        {{ doc.name }}
                      </h5>
                    </div>
                    <div class="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500">
                      <span>{{ doc.date ? formatDate(doc.date) : 'Recently added' }}</span>
                      <span class="inline-flex items-center gap-1 font-medium text-emerald-700">
                        Preview
                        <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

          <div
            v-if="shouldPaginateCurrentView && filteredDocuments.length > 0"
            class="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Pagination
              v-model:currentPage="currentPage"
              v-model:itemsPerPage="itemsPerPage"
              :total-items="filteredDocuments.length"
            />
          </div>

          <teleport to="body">
            <div
              v-if="selectedGalleryImage"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              @click.self="closeGalleryImage"
            >
              <div class="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
                <button
                  type="button"
                  class="absolute left-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  aria-label="Previous image"
                  @click="showPreviousGalleryImage"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  class="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  @click="closeGalleryImage"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  class="absolute right-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  aria-label="Next image"
                  @click="showNextGalleryImage"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                <div class="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.45fr_0.85fr]">
                  <div class="bg-gray-950">
                    <img
                      :src="selectedGalleryImage.image"
                      :alt="selectedGalleryImage.name"
                      class="h-full max-h-[70vh] w-full object-contain"
                      @error="handleGalleryImageError"
                    />
                  </div>
                  <div class="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        {{ selectedGalleryImage.author || 'NLGFC Archive' }}
                      </p>
                      <h4 class="mt-3 text-2xl font-semibold text-gray-900">
                        {{ selectedGalleryImage.name }}
                      </h4>
                      <p class="mt-4 text-sm leading-7 text-gray-600">
                        {{ selectedGalleryImage.description }}
                      </p>
                    </div>

                    <div class="mt-8 space-y-4">
                      <p class="text-sm text-gray-500">
                        {{ selectedGalleryImage.date ? formatDate(selectedGalleryImage.date) : 'Recently added' }}
                      </p>
                      <div class="flex flex-wrap gap-3">
                        <a
                          :href="selectedGalleryImage.viewLink"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                          Open source
                        </a>
                        <a
                          :href="selectedGalleryImage.downloadLink"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </teleport>
        </div>

        <!-- Default Document Grid Layout -->
        <div v-else-if="currentDocumentsLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="n" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div class="animate-pulse space-y-3">
              <div class="h-5 w-3/4 rounded bg-gray-200"></div>
              <div class="h-4 w-1/4 rounded bg-gray-200"></div>
              <div class="h-4 w-full rounded bg-gray-200"></div>
              <div class="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div v-else-if="currentDocumentsError" class="rounded-lg bg-white p-8 text-center shadow-sm">
          <p class="text-sm text-gray-600">Documents could not be loaded from the API.</p>
        </div>

        <div v-else-if="filteredDocuments.length === 0" class="rounded-lg bg-white p-8 text-center shadow-sm">
          <p class="text-sm text-gray-600">
            {{ searchQuery ? 'No documents matched your search.' : 'No documents are available in this section.' }}
          </p>
        </div>

        <div v-else>
          <transition-group
              name="grid-item"
              tag="div"
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              appear
          >
            <div
                v-for="(doc, index) in paginatedDocuments"
                :key="doc.name"
                class="relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between group hover:scale-105"
                :style="{ animationDelay: `${index * 100}ms` }"
            >
              <a
                  :href="doc.link"
                  target="_blank"
                  class="absolute bottom-2 right-2 w-8 h-8 bg-gray-800 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
                  title="Download / View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
                </svg>
              </a>

              <div class="flex items-center mb-3">
                 <!-- Document details -->
                <div>
                  <h3 class="font-semibold text-gray-800 text-base">{{ doc.name }}</h3>
                  <div class="mt-1 flex items-center gap-2">
                    <span
                      class="inline-flex h-7 w-7 items-center justify-center rounded bg-gray-100 text-gray-700"
                      :title="doc.type"
                    >
                      <svg v-if="doc.type === 'PDF'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 3v5h5" />
                      </svg>
                      <svg v-else-if="doc.type === 'XLS' || doc.type === 'XLSX' || doc.type === 'CSV'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 3v5h5M9 10l4 6m0-6l-4 6m6-6h1m-1 3h1m-1 3h1" />
                      </svg>
                      <svg v-else-if="doc.type === 'DOC' || doc.type === 'DOCX'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 3v5h5M8.5 11l1.5 5 2-3 2 3 1.5-5" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 3v5h5" />
                      </svg>
                    </span>
                    <span class="inline-block text-xs text-gray-700">
                      {{ doc.type }}
                    </span>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 flex-grow">
                {{ doc.description || 'No description available.' }}
              </p>
              <p class="text-[12px] font-semibold text-emerald-600 mt-3">
                {{ doc.date ? formatDate(doc.date) : 'No date available.' }}
              </p>
            </div>
          </transition-group>

          <div
            v-if="shouldPaginateCurrentView && filteredDocuments.length > 0"
            class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Pagination
              v-model:currentPage="currentPage"
              v-model:itemsPerPage="itemsPerPage"
              :total-items="filteredDocuments.length"
            />
          </div>
        </div>
      </section>

      <!-- Loading/Welcome State -->
      <transition name="fade" mode="out-in">
        <div v-if="activeGroup === null" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-16 h-16 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <h3 class="text-xl font-semibold text-gray-700">Welcome to the Resource Center</h3>
          <p class="text-gray-500 mt-2">Please select a category from the left menu to view available documents and resources.</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGeneralSidebar } from '~/composables/useGeneralSidebar';

definePageMeta({
    title: 'NLGFC - Resource Center',
    })

const route = useRoute()
const { getExcerpt, stripHtmlTags } = useHtmlUtils()
const config = useRuntimeConfig()
const { projectGroups } = useGeneralSidebar()

// State management for UI
const activeGroup = ref(null);
const activeSubgroup = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Data for the resource center, structured into groups and subgroups with IDs
const resourceGroups = [
  {
    id: 'news',
    group: 'News',
    items: []
  },
  {
    id: 'publications',
    group: 'Publications & Downloads',
    subgroups: [
      {
        id: 'press-releases',
        subgroup: 'Press Releases',
        items: []
      },
      {
        id: 'success-stories',
        subgroup: 'Success Stories',
        items: []
      },
      { id: 'speeches', subgroup: 'Speeches', items: [] },
      { id: 'research', subgroup: 'Research & Discussions', items: [] },
      { id: 'budget', subgroup: 'Budget Documents', items: [] },
      { id: 'disbursements', subgroup: 'Disbursements', items: [] },
      {
        id: 'newsletters',
        subgroup: 'Newsletters & Magazines',
        items: []
      },
      { id: 'manuals', subgroup: 'Manuals and Guidelines', items: [] },
      { id: 'policies', subgroup: 'Policies and Strategies', items: [] },
    ]
  },
  {
    id: 'project-documents',
    group: 'Project Documents',
    subgroups: [
      { id: 'ssrlp', subgroup: 'SSRLP', items: [] },
      { id: 'gesd', subgroup: 'GESD', items: [] },
      { id: 'rcrp2', subgroup: 'RCRP 2', items: [] },
    ]
  },
  {
    id: 'reports',
    group: 'Reports',
    subgroups: [
      { id: 'audit-reports', subgroup: 'Audit Reports', items: [] },
      { id: 'financial-reports', subgroup: 'Financial Reports', items: [] },
      { id: 'financial-statements', subgroup: 'Financial statements', items: [] },
      { id: 'lapa-synthesis', subgroup: 'LAPA Synthesis', items: [] },
    ]
  },
  {
    id: 'knowledge-management',
    group: 'Knowledge Management',
    subgroups: [
      {
        id: 'image-gallery',
        subgroup: 'Image Gallery',
        items: []
      },
      {
        id: 'video',
        subgroup: 'Video',
        items: []
      }
    ]
  }
];

projectGroups.value = resourceGroups

const resolveResourceHash = (rawHash) => {
  const hash = String(rawHash || '').replace(/^#/, '').trim()
  if (!hash) return null

  const directGroup = resourceGroups.find(group => group.id === hash)
  if (directGroup) {
    return { groupId: directGroup.id, subgroupId: null }
  }

  for (const group of resourceGroups) {
    const directSubgroup = group.subgroups?.find(subgroup => subgroup.id === hash)
    if (directSubgroup) {
      return { groupId: group.id, subgroupId: directSubgroup.id }
    }
  }

  for (const group of resourceGroups) {
    if (!hash.startsWith(`${group.id}-`)) continue

    const subgroupId = hash.slice(group.id.length + 1)
    const matchingSubgroup = group.subgroups?.find(subgroup => subgroup.id === subgroupId)
    if (matchingSubgroup) {
      return { groupId: group.id, subgroupId: matchingSubgroup.id }
    }

    return { groupId: group.id, subgroupId: null }
  }

  return null
}

/**
 * Navigate directly to a specific group or subgroup using IDs
 * @param {string} groupId - The ID of the group
 * @param {string} subgroupId - The ID of the subgroup (optional)
 */
const navigateToSection = (groupId, subgroupId = null) => {
  const groupIndex = resourceGroups.findIndex(g => g.id === groupId);
  
  if (groupIndex !== -1) {
    const group = resourceGroups[groupIndex];
    
    if (subgroupId && group.subgroups) {
      const subgroupIndex = group.subgroups.findIndex(sg => sg.id === subgroupId);
      if (subgroupIndex !== -1) {
        activeGroup.value = groupIndex;
        activeSubgroup.value = subgroupIndex;
        return;
      }
    }
    
    // Navigate to main group
    if (group.items) {
      activeGroup.value = groupIndex;
      activeSubgroup.value = null;
    } else if (group.subgroups) {
      activeGroup.value = null;
      activeSubgroup.value = null;
    }
  }
};

/**
 * Get the current URL with hash for sharing/bookmarking
 * @returns {string} The shareable URL
 */
const getCurrentSectionUrl = () => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    let hash = `#${group.id}`;
    
    if (activeSubgroup.value !== null && group.subgroups) {
      hash = `#${group.subgroups[activeSubgroup.value].id}`;
    }
    
    return `${window.location.origin}${window.location.pathname}${hash}`;
  }
  return window.location.href;
};

/**
 * Handle URL hash changes for direct navigation
 */
const handleHashChange = () => {
  const selection = resolveResourceHash(window.location.hash)
  if (selection) {
    navigateToSection(selection.groupId, selection.subgroupId)
    return
  }

  navigateToSection('news')
};

/**
 * Update URL hash when navigation changes
 */
const updateUrlHash = () => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    let hash = group.id;
    
    if (activeSubgroup.value !== null && group.subgroups) {
      hash = group.subgroups[activeSubgroup.value].id;
    }
    
    window.history.replaceState(null, null, `#${hash}`);
  } else {
    window.history.replaceState(null, null, window.location.pathname);
  }
};

/**
 * Search functionality
 */
const handleSearch = () => {
  // This would typically trigger filtering of displayedDocuments
  // Implementation depends on your specific search requirements
};

const clearSearch = () => {
  searchQuery.value = '';
};

const { data: newsData, loading: newsLoading, error: newsError } = useApiData(
  'resource-center-news',
  '/api/posts?per_page=50',
  {
    default: () => ({
      data: [],
    }),
  }
)

const newsPosts = computed(() => {
  if (Array.isArray(newsData.value)) return newsData.value
  return Array.isArray(newsData.value?.data) ? newsData.value.data : []
})

const newsBaseUrl = computed(() => config.public.baseUrl || 'http://localhost:8000')

const getNewsImageUrl = (imagePath) => {
  if (!imagePath) return '/images/samples/default-news.jpg'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `${newsBaseUrl.value}/storage/${imagePath}`
}

const handleNewsImageError = (event) => {
  event.target.src = '/images/samples/default-news.jpg'
}

const newsItems = computed(() => {
  return [...newsPosts.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((post) => ({
      id: post.id,
      slug: post.slug || String(post.id),
      title: post.title || 'Untitled article',
      description: getExcerpt(post.content, 150),
      date: post.created_at || post.updated_at || '',
      source: post.category?.name || 'News',
      image: getNewsImageUrl(post.image),
    }))
})

const documentCategoryMap = {
  'press-releases': 'Press Releases',
  'success-stories': 'Success Stories',
  speeches: 'Speeches',
  research: 'Research & Discussions',
  budget: 'Budget Documents',
  disbursements: 'Disbursements',
  newsletters: 'Newsletters & Magazines',
  manuals: 'Manuals and Guidelines',
  policies: 'Policies and Strategies',
  ssrlp: 'SSRLP',
  gesd: 'GESD',
  rcrp2: 'RCRP 2',
  'audit-reports': 'Audit Reports',
  'financial-reports': 'Financial Reports',
  'financial-statements': 'Financial statements',
  'lapa-synthesis': 'LAPA Synthesis',
}

const { data: documentCategoriesData } = useApiData(
  'resource-center-document-categories',
  '/api/document-categories',
  {
    default: () => [],
    transform: (response) => Array.isArray(response) ? response : response?.data || [],
  }
)

const activeSubgroupId = computed(() => {
  if (activeGroup.value === null || activeSubgroup.value === null) return null
  return resourceGroups[activeGroup.value]?.subgroups?.[activeSubgroup.value]?.id || null
})

const activeDocumentCategoryName = computed(() => {
  if (activeGroup.value === null || activeSubgroup.value === null) return null
  const group = resourceGroups[activeGroup.value]
  if (!['publications', 'project-documents', 'reports'].includes(group?.id)) return null

  const subgroup = group?.subgroups?.[activeSubgroup.value]
  if (!subgroup) return null

  return documentCategoryMap[activeSubgroupId.value] || subgroup.subgroup || null
})

const normalizeCategoryName = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const activeDocumentCategory = computed(() => {
  const categories = Array.isArray(documentCategoriesData.value) ? documentCategoriesData.value : []
  if (!activeDocumentCategoryName.value) return null
  return (
    categories.find(
      (category) => normalizeCategoryName(category?.name) === normalizeCategoryName(activeDocumentCategoryName.value)
    ) || null
  )
})

const activeDocumentCategoryId = computed(() => activeDocumentCategory.value?.id || null)

const documentsEndpoint = computed(() =>
  activeDocumentCategoryId.value
    ? `/api/documents?per_page=50&document_category_id=${activeDocumentCategoryId.value}`
    : null
)

const { data: documentsData, pending: documentsLoading, error: documentsError } = useAsyncData(
  'resource-center-documents',
  async () => {
    if (!documentsEndpoint.value) return { data: [] }

    const response = await $fetch(`${newsBaseUrl.value}${documentsEndpoint.value}`)
    return Array.isArray(response) ? { data: response } : response
  },
  {
    default: () => ({
      data: [],
    }),
    watch: [documentsEndpoint],
  }
)

const activeDocuments = computed(() => {
  if (!documentsEndpoint.value) return []
  if (Array.isArray(documentsData.value)) return documentsData.value
  return Array.isArray(documentsData.value?.data) ? documentsData.value.data : []
})

const getDocumentFileType = (files = []) => {
  const firstFile = Array.isArray(files) ? files[0] : null
  if (!firstFile || typeof firstFile !== 'string') return 'FILE'
  const extension = firstFile.split('.').pop()
  return extension ? extension.toUpperCase() : 'FILE'
}

const documentItems = computed(() => {
  return [...activeDocuments.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((document) => ({
      id: document.id,
      name: document.name || 'Untitled document',
      link: `${newsBaseUrl.value}/api/documents/${document.id}/view`,
      type: getDocumentFileType(document.files),
      description: stripHtmlTags(document.description || '') || 'No description available.',
      date: document.created_at || document.updated_at || '',
    }))
})

const { data: videosData, loading: videosLoading, error: videosError } = useApiData(
  'resource-center-videos',
  '/api/videos?per_page=8',
  {
    default: () => ({
      data: [],
    }),
  }
)

const videos = computed(() => {
  if (Array.isArray(videosData.value)) return videosData.value
  return Array.isArray(videosData.value?.data) ? videosData.value.data : []
})

const videoItems = computed(() => {
  return [...videos.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((video) => ({
      id: video.id,
      name: video.name || 'Untitled video',
      link: video.url || '',
      type: 'Video',
      description: stripHtmlTags(video.description || '') || 'No description available.',
      date: video.created_at || video.updated_at || '',
    }))
})

const { data: imageGalleryData, loading: imageGalleryLoading, error: imageGalleryError } = useApiData(
  'resource-center-image-gallery',
  '/api/image-galleries?per_page=50',
  {
    default: () => ({
      data: [],
    }),
  }
)

const galleryImages = computed(() => {
  if (Array.isArray(imageGalleryData.value)) return imageGalleryData.value
  return Array.isArray(imageGalleryData.value?.data) ? imageGalleryData.value.data : []
})

const getResolvedApiUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${newsBaseUrl.value}${path.startsWith('/') ? path : `/${path}`}`
}

const fallbackGalleryImage = '/images/samples/default-news.jpg'

const extractGoogleDriveFileId = (value) => {
  if (!value || typeof value !== 'string') return null

  try {
    const parsedUrl = new URL(value)
    const host = parsedUrl.hostname.toLowerCase()

    if (!host.includes('google.com')) return null

    const filePathMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/)
    if (filePathMatch?.[1]) {
      return filePathMatch[1]
    }

    return parsedUrl.searchParams.get('id')
  } catch {
    return null
  }
}

const getRenderableGalleryImageUrl = (image) => {
  const driveFileId = extractGoogleDriveFileId(
    image?.image_link || image?.preview_url || image?.download_url || image?.view_endpoint
  )

  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w2000`
  }

  return getResolvedApiUrl(image?.preview_url || image?.view_endpoint || image?.image_link) || fallbackGalleryImage
}

const imageGalleryItems = computed(() => {
  return [...galleryImages.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((image) => ({
      id: image.id,
      name: image.title || 'Untitled image',
      description: stripHtmlTags(image.description || '') || 'No description available.',
      type: 'Image',
      image: getRenderableGalleryImageUrl(image),
      viewLink: getResolvedApiUrl(image.view_endpoint || image.preview_url || image.image_link),
      downloadLink: getResolvedApiUrl(image.download_endpoint || image.download_url || image.image_link),
      date: image.created_at || image.updated_at || '',
      author: image.user?.name || 'NLGFC',
    }))
})

const selectedGalleryImage = ref(null)

const openGalleryImage = (image) => {
  selectedGalleryImage.value = image
}

const closeGalleryImage = () => {
  selectedGalleryImage.value = null
}

const handleGalleryImageError = (event) => {
  event.target.src = fallbackGalleryImage
}

const syncGalleryPageToImage = (imageId) => {
  const index = filteredDocuments.value.findIndex((image) => image.id === imageId)
  if (index === -1) return

  currentPage.value = Math.floor(index / itemsPerPage.value) + 1
}

const showPreviousGalleryImage = () => {
  if (!selectedGalleryImage.value || filteredDocuments.value.length === 0) return

  const currentIndex = filteredDocuments.value.findIndex((image) => image.id === selectedGalleryImage.value.id)
  const previousIndex = currentIndex <= 0 ? filteredDocuments.value.length - 1 : currentIndex - 1
  const previousImage = filteredDocuments.value[previousIndex]
  syncGalleryPageToImage(previousImage.id)
  selectedGalleryImage.value = previousImage
}

const showNextGalleryImage = () => {
  if (!selectedGalleryImage.value || filteredDocuments.value.length === 0) return

  const currentIndex = filteredDocuments.value.findIndex((image) => image.id === selectedGalleryImage.value.id)
  const nextIndex = currentIndex === filteredDocuments.value.length - 1 ? 0 : currentIndex + 1
  const nextImage = filteredDocuments.value[nextIndex]
  syncGalleryPageToImage(nextImage.id)
  selectedGalleryImage.value = nextImage
}

/**
 * Computed property for filtered documents based on search
 */
const filteredDocuments = computed(() => {
  if (!searchQuery.value) return displayedDocuments.value;
  
  return displayedDocuments.value.filter(doc => {
    const searchTerm = searchQuery.value.toLowerCase();
    const searchableContent = [
      doc.name,
      doc.title,
      doc.description,
      doc.source,
      doc.type,
      doc.date ? formatDate(doc.date) : '',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return (
      searchableContent.includes(searchTerm)
    );
  });
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredDocuments.value.length / itemsPerPage.value));
})

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDocuments.value.slice(start, end)
})

/**
 * Converts a standard YouTube watch URL to an embeddable URL.
 * @param {string} url - The original YouTube URL.
 * @returns {string} The embeddable URL.
 */
function getVideoEmbedUrl(url) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)
    const host = parsedUrl.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0]
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        const videoId = parsedUrl.searchParams.get('v')
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
      }

      if (parsedUrl.pathname.startsWith('/embed/')) {
        return url
      }

      if (parsedUrl.pathname.startsWith('/shorts/') || parsedUrl.pathname.startsWith('/live/')) {
        const videoId = parsedUrl.pathname.split('/').filter(Boolean)[1]
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
      }
    }
  } catch {
    return url
  }

  return url
}

/**
 * Formats a date string for display.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date.
 */
const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Computed property to get the documents of the currently active group or subgroup
const displayedDocuments = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    // Check if a subgroup is selected within a group that has subgroups
    if (activeSubgroup.value !== null && group.subgroups) {
      if (['publications', 'project-documents', 'reports'].includes(group.id) && activeDocumentCategoryName.value) {
        return documentItems.value;
      }
      if (group.id === 'knowledge-management' && group.subgroups[activeSubgroup.value]?.id === 'video') {
        return videoItems.value;
      }
      if (group.id === 'knowledge-management' && group.subgroups[activeSubgroup.value]?.id === 'image-gallery') {
        return imageGalleryItems.value;
      }
      return group.subgroups[activeSubgroup.value].items || [];
    } 
    // Check if a main group with direct items (like News) is selected
    else if (activeSubgroup.value === null && group.items) {
      if (group.id === 'news') {
        return newsItems.value;
      }
      return group.items;
    }
  }
  return [];
});

const isApiDocumentSubgroupActive = computed(() => {
  if (activeGroup.value === null || activeSubgroup.value === null) return false
  const group = resourceGroups[activeGroup.value]
  return ['publications', 'project-documents', 'reports'].includes(group?.id) && Boolean(activeDocumentCategoryName.value)
})

const isVideoActive = computed(() => {
  if (activeGroup.value === null || activeSubgroup.value === null) return false
  const group = resourceGroups[activeGroup.value]
  return group?.id === 'knowledge-management' && group.subgroups?.[activeSubgroup.value]?.id === 'video'
})

const isImageGalleryActive = computed(() => {
  if (activeGroup.value === null || activeSubgroup.value === null) return false
  const group = resourceGroups[activeGroup.value]
  return group?.id === 'knowledge-management' && group.subgroups?.[activeSubgroup.value]?.id === 'image-gallery'
})

const currentDocumentsLoading = computed(() => {
  return isApiDocumentSubgroupActive.value && (
    documentsLoading.value || (!activeDocumentCategoryId.value && !documentCategoriesData.value?.length)
  )
})

const currentDocumentsError = computed(() => isApiDocumentSubgroupActive.value && documentsError.value)
const currentVideosLoading = computed(() => isVideoActive.value && videosLoading.value)
const currentVideosError = computed(() => isVideoActive.value && videosError.value)
const currentGalleryLoading = computed(() => isImageGalleryActive.value && imageGalleryLoading.value)
const currentGalleryError = computed(() => isImageGalleryActive.value && imageGalleryError.value)
const shouldPaginateCurrentView = computed(() => {
  return activeGroup.value !== null && filteredDocuments.value.length > itemsPerPage.value
})

// Computed property to generate a title for the content pane
const currentTitle = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    if (activeSubgroup.value !== null && group.subgroups) {
      return `${group.group} - ${group.subgroups[activeSubgroup.value].subgroup}`;
    } else if (group.items) {
       return group.group;
    }
  }
  return 'Resource Center';
});

// Computed property to determine the type of the current content for special layouts
const currentDisplayType = computed(() => {
  if (activeGroup.value !== null) {
    const group = resourceGroups[activeGroup.value];
    if (activeSubgroup.value !== null && group.subgroups) {
      return group.subgroups[activeSubgroup.value].subgroup; // e.g., 'Video', 'Image Gallery'
    } else if (activeSubgroup.value === null && group.items) {
      return group.group; // e.g., 'News'
    }
  }
  return '';
});

// Watch for changes in active selections to update URL hash
watch([activeGroup, activeSubgroup], () => {
  updateUrlHash();
  currentPage.value = 1;
  itemsPerPage.value = isImageGalleryActive.value ? 8 : 6;
  if (!isImageGalleryActive.value) {
    closeGalleryImage()
  }
});

watch(searchQuery, () => {
  currentPage.value = 1;
  if (!isImageGalleryActive.value) return

  const hasSelectedImage = filteredDocuments.value.some((image) => image.id === selectedGalleryImage.value?.id)
  if (!hasSelectedImage) {
    closeGalleryImage()
  }
})

watch([filteredDocuments, itemsPerPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }

  if (isImageGalleryActive.value && selectedGalleryImage.value) {
    const matchedImage = filteredDocuments.value.find((image) => image.id === selectedGalleryImage.value.id)
    if (matchedImage) {
      selectedGalleryImage.value = matchedImage
    } else {
      closeGalleryImage()
    }
  }
})

// Lifecycle hooks
onMounted(() => {
  // Handle initial hash on page load
  handleHashChange();
  
  // Listen for hash changes (back/forward navigation)
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
})

// Watch for hash changes in the URL and handle them
watch(
  () => route.hash,
  () => {
    handleHashChange();
  }
);

// Expose methods for external use (e.g., from other components)
const resourceCenterAPI = {
  navigateToSection,
  getCurrentSectionUrl,
  // Navigate to specific sections by ID
  goToNews: () => navigateToSection('news'),
  goToPressReleases: () => navigateToSection('publications', 'press-releases'),
  goToSuccessStories: () => navigateToSection('publications', 'success-stories'),
  goToVideos: () => navigateToSection('knowledge-management', 'video'),
  goToImageGallery: () => navigateToSection('knowledge-management', 'image-gallery'),
  // Add more convenience methods as needed
};

// Make API available globally if needed
if (process.client) {
  window.resourceCenterAPI = resourceCenterAPI;
}

</script>
