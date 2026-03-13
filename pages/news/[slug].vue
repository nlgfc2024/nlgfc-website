<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const slug = computed(() => String(route.params.slug || ''))

const { data: post, pending, error } = useAsyncData(
  () => `post:${slug.value}`,
  () => $fetch(`${config.public.apiBase}/api/posts/${slug.value}`),
  { watch: [slug], server: true }
)

const postRecord = computed(() => {
  const raw = post.value
  if (!raw) return null
  if (raw.data && typeof raw.data === 'object') return raw.data
  return raw
})

const { data: related } = useAsyncData(
  () => `post-related:${slug.value}`,
  async () => {
    if (!slug.value) return []
    return await $fetch(`${config.public.apiBase}/api/posts/${slug.value}/related/3`)
  },
  { watch: [slug], server: true, default: () => [] }
)

const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

const imageUrl = computed(() => {
  const image = postRecord.value?.image
  if (!image) return ''
  if (/^(https?:)?\/\//i.test(image)) return image
  const base = (config.public.apiBase || '').replace(/\/$/, '')
  if (image.startsWith('/')) return `${base}${image}`
  return `${base}/storage/${image.replace(/^storage\//, '')}`
})

const fallbackNewsImages = ['/images/samples/news1.jpg', '/images/samples/news2.jpg', '/images/samples/news3.jpg']
const displayImageUrl = computed(() => {
  if (imageUrl.value) return imageUrl.value
  const seed = String(postRecord.value?.slug || slug.value || 'news')
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i)) % 997
  return fallbackNewsImages[hash % fallbackNewsImages.length]
})

const contentHtml = computed(() => {
  const content = postRecord.value?.content
  if (typeof content === 'string' && content.trim() !== '') return content
  if (content && typeof content === 'object') {
    if (typeof content.html === 'string' && content.html.trim() !== '') return content.html
    if (typeof content.content === 'string' && content.content.trim() !== '') return content.content
  }
  return '<p>No content available for this article.</p>'
})

const backTo = computed(() => {
  const source = String(route.query?.source || '')
  if (source === 'resource') return '/resourceCenter#news'
  if (source === 'project') return '/projects/currentProjects'
  return '/news'
})

const relatedArticles = computed(() => {
  const rows = related.value
  return Array.isArray(rows) ? rows : []
})

const authorName = computed(() => postRecord.value?.user?.name || 'NLGFC Editorial')
const sourceName = computed(() => postRecord.value?.category?.name || 'News')
const postTags = computed(() => {
  const tags = []
  if (postRecord.value?.category?.name) tags.push(postRecord.value.category.name)
  if (postRecord.value?.project?.name) tags.push(postRecord.value.project.name)
  if (postRecord.value?.local_authority?.name) tags.push(postRecord.value.local_authority.name)
  return tags
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
          <div v-if="pending" class="animate-pulse h-24 bg-gray-100 rounded" />

          <div v-else-if="error || !postRecord" class="text-center py-12 bg-white rounded-lg shadow-lg">
            <h1 class="text-2xl font-semibold text-gray-900">News not found</h1>
            <NuxtLink to="/news" class="mt-4 inline-block text-blue-600 hover:text-blue-700">Back to News</NuxtLink>
          </div>

          <div v-else>
            <NuxtLink :to="backTo" class="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to News
            </NuxtLink>

            <article class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="aspect-video w-full">
                <img :src="displayImageUrl" :alt="postRecord.title" class="w-full h-full object-cover" />
              </div>

              <div class="p-8">
                <div class="flex items-center justify-between mb-4">
                  <time class="text-gray-500 text-sm">{{ formatDate(postRecord.created_at) }}</time>
                </div>

                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ postRecord.title }}</h1>

                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p class="font-medium text-gray-900">{{ authorName }}</p>
                    <p class="text-sm text-gray-500">{{ sourceName }}</p>
                  </div>
                </div>

                <div class="prose max-w-none" v-html="contentHtml" />

                <div v-if="postTags.length" class="mt-8 pt-6 border-t border-gray-200">
                  <div class="flex flex-wrap gap-2">
                    <span class="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                    <span
                      v-for="tag in postTags"
                      :key="tag"
                      class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                  <div class="flex space-x-4">
                    <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      Twitter
                    </button>
                    <button class="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    <button class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="lg:w-1/3">
          <div class="sticky top-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="bg-gray-900 text-white px-6 py-4">
              <h3 class="text-lg font-semibold">Latest News</h3>
              <p class="text-emerald-100 text-sm">{{ relatedArticles.length }} related article{{ relatedArticles.length === 1 ? '' : 's' }}</p>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <NuxtLink
                v-for="item in relatedArticles"
                :key="item.id"
                :to="`/news/${item.slug}`"
                class="block p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50"
              >
                <h4 class="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                  {{ item.title }}
                </h4>
                <div class="text-xs text-gray-500">{{ formatDate(item.created_at) }}</div>
              </NuxtLink>
            </div>
            <div v-if="!relatedArticles.length" class="p-6 text-center text-gray-500 text-sm">
              No related news available.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
