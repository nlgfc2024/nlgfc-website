<template>
  <div class="min-h-screen bg-gray-50">
    <section class="relative h-[300px] overflow-hidden sm:h-[360px] md:h-[420px]">
      <div
        v-for="(article, index) in featuredArticles"
        :key="article.id"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
      >
        <div class="absolute inset-0">
          <img
            :src="article.image || '/images/samples/default-news.jpg'"
            :alt="article.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div class="relative z-10 flex h-full flex-col justify-end pb-8 sm:pb-10 md:pb-12">
          <div class="container mx-auto px-4 sm:px-6">
            <div class="mb-3">
              <span class="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Latest News
              </span>
            </div>
            <div class="max-w-3xl">
              <h2 class="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">{{ article.title }}</h2>
              <p class="line-clamp-3 text-sm text-white/90 sm:text-base md:text-lg">{{ article.summary }}</p>
              <div class="mt-4 flex flex-wrap items-center gap-2 text-white/80">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm">{{ formatDate(article.date) }} | {{ article.source }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="postsLoading" class="absolute inset-0 z-30 flex items-center justify-center bg-gray-900/50">
        <div class="rounded-lg bg-white/95 px-6 py-4 text-sm font-medium text-gray-700 shadow-lg">
          Loading latest news...
        </div>
      </div>

      <div v-else-if="postsError" class="absolute inset-0 z-30 flex items-center justify-center bg-gray-900/60 px-4">
        <div class="max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
          <h3 class="mb-2 text-lg font-semibold text-red-700">Failed to load news</h3>
          <p class="text-sm text-gray-600">The news feed could not be loaded from the API.</p>
        </div>
      </div>

      <div v-else-if="featuredArticles.length === 0" class="absolute inset-0 z-30 flex items-center justify-center bg-gray-900/60 px-4">
        <div class="max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">No news available</h3>
          <p class="text-sm text-gray-600">Published posts will appear here once they are available.</p>
        </div>
      </div>

      <div v-if="featuredArticles.length > 0" class="absolute bottom-2 left-0 right-0 z-20 pt-5">
        <div class="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(article, idx) in featuredArticles"
              :key="`ind-${article.id}`"
              class="h-3 rounded-full transition-all duration-300"
              :class="{ 'w-8 bg-white': currentSlide === idx, 'w-3 bg-white/30 hover:bg-white/50': currentSlide !== idx }"
              @click="goToSlide(idx)"
            ></button>
          </div>

          <div class="flex items-center gap-2 sm:gap-4">
            <button class="p-2 text-white/70 transition hover:text-white" @click="toggleAutoplay">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="autoplay" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              </svg>
            </button>
            <button class="p-2 text-white/70 transition hover:text-white" @click="prevSlide">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="p-2 text-white/70 transition hover:text-white" @click="nextSlide">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <div class="flex flex-col gap-8 lg:flex-row">
        <div class="order-2 lg:order-1 lg:w-2/3">
          <div v-if="postsLoading" class="rounded-lg bg-white p-6 shadow-lg sm:p-8">
            <div class="space-y-4 animate-pulse">
              <div class="h-6 w-1/4 rounded bg-gray-200"></div>
              <div class="h-10 w-3/4 rounded bg-gray-200"></div>
              <div class="aspect-video w-full rounded bg-gray-200"></div>
              <div class="h-4 w-full rounded bg-gray-200"></div>
              <div class="h-4 w-11/12 rounded bg-gray-200"></div>
              <div class="h-4 w-10/12 rounded bg-gray-200"></div>
            </div>
          </div>

          <div v-else-if="postsError" class="rounded-lg bg-white p-6 text-center shadow-lg sm:p-8">
            <h2 class="mb-4 text-2xl font-bold text-red-700">Unable to load news articles</h2>
            <p class="text-gray-600">Check the posts API connection and reload the page.</p>
          </div>

          <div v-else-if="selectedArticle">
            <article class="overflow-hidden rounded-lg bg-white shadow-lg">
              <div v-if="selectedArticle.image" class="aspect-video w-full">
                <img
                  :src="selectedArticle.image"
                  :alt="selectedArticle.title"
                  class="h-full w-full object-cover"
                  @error="handleImageError"
                />
              </div>

              <div class="p-5 sm:p-6 lg:p-8">
                <div class="mb-4 flex items-center justify-between">
                  <time class="text-sm text-gray-500">{{ formatDate(selectedArticle.date) }}</time>
                </div>

                <h1 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  {{ selectedArticle.title }}
                </h1>

                <div class="mb-6 flex items-center">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700">
                      {{ selectedArticle.authorInitials }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ selectedArticle.author }}</p>
                      <p class="text-sm text-gray-500">{{ selectedArticle.source }}</p>
                    </div>
                  </div>
                </div>

                <div class="prose max-w-none break-words prose-img:rounded-lg" v-html="selectedArticle.content"></div>

                <div v-if="selectedArticle.tags.length" class="mt-8 border-t border-gray-200 pt-6">
                  <div class="flex flex-wrap gap-2">
                    <span class="mr-2 text-sm font-medium text-gray-700">Tags:</span>
                    <span
                      v-for="tag in selectedArticle.tags"
                      :key="tag"
                      class="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="mt-8 border-t border-gray-200 pt-6">
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-700">Share this article</p>
                      <p class="text-xs text-gray-500">Send this news story to your audience.</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <a
                        :href="shareLinks.facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center rounded-full bg-[#1877F2] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        Facebook
                      </a>
                      <a
                        :href="shareLinks.whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        WhatsApp
                      </a>
                      <button
                        type="button"
                        class="inline-flex items-center rounded-full bg-[#E4405F] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                        @click="shareOnInstagram"
                      >
                        Instagram
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="rounded-lg bg-white p-6 text-center shadow-lg sm:p-8">
            <h2 class="mb-4 text-2xl font-bold text-gray-900">Welcome to Our News Center</h2>
            <p class="mb-6 text-gray-600">Select a news article from the sidebar to read the full story.</p>
            <div class="text-gray-400">
              <svg class="mx-auto mb-4 h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              <p class="text-sm">Click on any article title to start reading</p>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 lg:w-1/3">
          <div class="lg:sticky lg:top-4">
            <div class="mb-6">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search news..."
                  class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                />
                <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div class="overflow-hidden rounded-lg bg-white shadow-lg">
              <div class="bg-gray-900 px-6 py-4 text-white">
                <h3 class="text-lg font-semibold">Latest News</h3>
                <p class="text-sm text-emerald-100">{{ filteredArticles.length }} articles</p>
              </div>

              <div v-if="postsLoading" class="space-y-3 p-4">
                <div v-for="n in 5" :key="n" class="animate-pulse rounded border border-gray-100 p-4">
                  <div class="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
                  <div class="h-3 w-2/5 rounded bg-gray-200"></div>
                </div>
              </div>

              <div v-else-if="postsError" class="p-6 text-center text-gray-500">
                <p class="text-sm">Latest news could not be loaded.</p>
              </div>

              <div v-else class="max-h-[22rem] overflow-y-auto sm:max-h-[26rem] lg:max-h-96">
                <div
                  v-for="article in filteredArticles"
                  :key="article.id"
                  :class="[
                    'cursor-pointer border-b border-gray-100 p-4 transition-all duration-200 hover:bg-gray-50',
                    selectedArticle?.id === article.id ? 'border-l-4 border-l-gray-900 bg-emerald-50' : ''
                  ]"
                  @click="selectArticle(article)"
                >
                  <h4 class="mb-2 line-clamp-2 font-medium text-gray-900 transition-colors hover:text-emerald-600">
                    {{ article.title }}
                  </h4>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>{{ formatDate(article.date) }}</span>
                    <span>{{ article.source }}</span>
                  </div>
                </div>
              </div>

              <div v-if="!postsLoading && !postsError && filteredArticles.length === 0" class="p-6 text-center text-gray-500">
                <svg class="mx-auto mb-3 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.334C5.422 12.272 5.13 11.638 5 11a8 8 0 118 8 7.956 7.956 0 01-4.709-1.534A7.956 7.956 0 0112 21a7.956 7.956 0 01-4.709-1.534"></path>
                </svg>
                <p class="text-sm">No articles found matching your search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue'

definePageMeta({
  title: 'NLGFC - News & Updates',
})

const { getExcerpt, stripHtmlTags } = useHtmlUtils()
const config = useRuntimeConfig()

const selectedArticle = ref(null)
const searchQuery = ref('')
const currentSlide = ref(0)
const autoplay = ref(true)
const autoplayInterval = ref(5000)
let autoplayTimer = null

const { data: postsData, loading: postsLoading, error: postsError } = useApiData(
  'all-posts',
  '/api/posts?per_page=50',
  {
    default: () => [],
    transform: (response) => Array.isArray(response) ? response : response?.data || [],
  }
)

const apiPosts = computed(() => {
  if (Array.isArray(postsData.value)) return postsData.value
  return Array.isArray(postsData.value?.data) ? postsData.value.data : []
})

const baseUrl = computed(() => config.public.baseUrl || 'http://localhost:8000')

const getPostImage = (imagePath) => {
  if (!imagePath) return '/images/samples/default-news.jpg'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `${baseUrl.value}/storage/${imagePath}`
}

const getArticleUrl = (article) => {
  if (!article) return ''

  const articleHash = article.slug || article.id

  if (process.client) {
    const currentUrl = new URL(window.location.href)
    currentUrl.hash = String(articleHash)
    return currentUrl.toString()
  }

  return `/news#${articleHash}`
}

const shareLinks = computed(() => {
  const article = selectedArticle.value
  const articleUrl = getArticleUrl(article)
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedText = encodeURIComponent(article ? `${article.title} - ${articleUrl}` : articleUrl)

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    instagram: 'https://www.instagram.com/',
  }
})

const shareOnInstagram = async () => {
  const articleUrl = getArticleUrl(selectedArticle.value)
  if (!articleUrl || !process.client) return

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(articleUrl)
    }
  } catch (error) {
    console.warn('Unable to copy article link for Instagram sharing.', error)
  }

  window.open(shareLinks.value.instagram, '_blank', 'noopener,noreferrer')
}

const getAuthorInitials = (name) => {
  const safeName = name || 'NLGFC'
  return safeName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

const normalizePost = (post) => ({
  id: post.id,
  slug: post.slug || String(post.id),
  title: post.title || 'Untitled article',
  summary: getExcerpt(post.content, 180),
  content: post.content || '<p>No content available for this article.</p>',
  plainContent: stripHtmlTags(post.content || ''),
  image: getPostImage(post.image),
  date: post.created_at || post.updated_at || new Date().toISOString(),
  author: post.user?.name || 'NLGFC',
  authorInitials: getAuthorInitials(post.user?.name || 'NLGFC'),
  source: post.category?.name || 'News',
  tags: post.category?.name ? [post.category.name] : [],
})

const newsArticles = computed(() => apiPosts.value.map(normalizePost))

const filteredArticles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const filtered = !query
    ? [...newsArticles.value]
    : newsArticles.value.filter((article) =>
        [article.title, article.summary, article.plainContent, article.author, article.source, ...article.tags]
          .join(' ')
          .toLowerCase()
          .includes(query)
      )

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const featuredArticles = computed(() => filteredArticles.value.slice(0, 3))

const handleImageError = (event) => {
  event.target.src = '/images/samples/default-news.jpg'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const resetAutoplay = () => {
  if (!autoplay.value || !featuredArticles.value.length) return
  clearInterval(autoplayTimer)
  autoplayTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length
  }, autoplayInterval.value)
}

const nextSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length
  resetAutoplay()
}

const prevSlide = () => {
  if (!featuredArticles.value.length) return
  currentSlide.value = (currentSlide.value - 1 + featuredArticles.value.length) % featuredArticles.value.length
  resetAutoplay()
}

const goToSlide = (index) => {
  if (!featuredArticles.value.length) return
  currentSlide.value = index
  resetAutoplay()
}

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value
  if (autoplay.value) resetAutoplay()
  else clearInterval(autoplayTimer)
}

const selectArticle = (article) => {
  selectedArticle.value = article

  if (process.client) {
    window.location.hash = article.slug
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const goBack = () => {
  selectedArticle.value = null

  if (process.client) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleHashChange = () => {
  if (!process.client) return

  const hash = window.location.hash.replace('#', '').trim()
  if (!hash) {
    selectedArticle.value = null
    return
  }

  const article = newsArticles.value.find((item) => item.slug === hash || String(item.id) === hash)
  selectedArticle.value = article || null
}

watch(newsArticles, () => {
  handleHashChange()

  if (currentSlide.value >= featuredArticles.value.length) {
    currentSlide.value = 0
  }

  if (!selectedArticle.value) {
    resetAutoplay()
  }
}, { immediate: true })

watch(selectedArticle, (article) => {
  if (article) {
    clearInterval(autoplayTimer)
  } else {
    resetAutoplay()
  }
})

watch(featuredArticles, (articles) => {
  if (!articles.length) {
    clearInterval(autoplayTimer)
    currentSlide.value = 0
    return
  }

  if (currentSlide.value >= articles.length) {
    currentSlide.value = 0
  }

  if (!selectedArticle.value && autoplay.value) {
    resetAutoplay()
  }
})

onMounted(() => {
  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
  resetAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  clearInterval(autoplayTimer)
})
</script>
