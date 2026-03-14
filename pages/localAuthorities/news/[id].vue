<template>
  <div class="news-detail-page">

    <!-- Loading -->
    <div v-if="pending" class="state-screen">
      <div class="state-content">
        <div class="spinner"></div>
        <p>Loading article…</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error || !article" class="state-screen">
      <div class="state-content">
        <h1>Article Not Found</h1>
        <p>This news article could not be loaded.</p>
        <NuxtLink :to="backHref" class="back-link">← Back</NuxtLink>
      </div>
    </div>

    <!-- Article -->
    <template v-else>

      <div class="article-wrap">
        <!-- Back link -->
        <NuxtLink :to="backHref" class="back-link">
          <svg viewBox="0 0 20 20" fill="currentColor" class="back-icon"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
          Back to News
        </NuxtLink>

        <!-- Hero image -->
        <div v-if="article.image_url" class="hero-img-wrap">
          <img
            :src="article.image_url"
            :alt="article.title"
            class="hero-img"
            @load="imageLoaded = true"
            @error="imageLoaded = false"
          />
        </div>

        <!-- Article card -->
        <article class="article-body">
          <!-- Date -->
          <p v-if="article.created_at" class="article-date">{{ formatDate(article.created_at) }}</p>

          <!-- Title -->
          <h1 class="article-title">{{ article.title }}</h1>

          <!-- Author / district row -->
          <div v-if="article.local_authority?.name" class="author-row">
            <div class="author-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
            <div class="author-info">
              <span class="author-name">{{ article.local_authority.name }}</span>
              <span class="author-org">Local Authority</span>
            </div>
          </div>

          <hr class="divider" />

          <!-- Body -->
          <div class="article-content" v-html="article.content"></div>

          <!-- Sources -->
          <div v-if="sourceLinks.length" class="sources-section">
            <h4 class="sources-title">
              <svg viewBox="0 0 20 20" fill="currentColor" class="src-icon"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
              Sources &amp; References
            </h4>
            <ul class="sources-list">
              <li v-for="(link, i) in sourceLinks" :key="i">
                <a :href="link.href" target="_blank" rel="noopener noreferrer" class="source-link">
                  {{ link.text || link.href }}
                  <svg viewBox="0 0 20 20" fill="currentColor" class="ext-icon"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>

    </template>

  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const newsId    = computed(() => route.params.id)
const fromSlug  = computed(() => route.query.from || null)
const imageLoaded = ref(false)

const backHref = computed(() =>
  fromSlug.value
    ? `/localAuthorities/${fromSlug.value}?tab=news`
    : '/localAuthorities/alldistricts'
)

const backLabel = computed(() =>
  fromSlug.value
    ? `${fromSlug.value.charAt(0).toUpperCase() + fromSlug.value.slice(1).replace(/-/g, ' ')} — News`
    : 'Local Authorities'
)

const { data: article, pending, error } = await useAsyncData(
  () => `la-news:${newsId.value}`,
  async () => {
    if (!newsId.value) return null
    try {
      return await $fetch(`${config.public.apiBase}/api/la-news/${newsId.value}`)
    } catch (err) {
      if (err?.status === 404 || err?.statusCode === 404) return null
      throw err
    }
  },
  { watch: [newsId], default: () => null }
)

// Reset imageLoaded when article changes
watch(article, () => { imageLoaded.value = false })

// Extract all external <a> tags from the article content to surface as citations
const sourceLinks = computed(() => {
  if (!article.value?.content || !process.client) return []
  try {
    const parser = new DOMParser()
    const doc    = parser.parseFromString(article.value.content, 'text/html')
    const links  = Array.from(doc.querySelectorAll('a[href]'))
    return links
      .filter(a => /^https?:\/\//.test(a.getAttribute('href') || ''))
      .map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() }))
      .filter((l, i, arr) => arr.findIndex(x => x.href === l.href) === i) // deduplicate
  } catch {
    return []
  }
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

useHead({
  title: computed(() =>
    article.value ? `${article.value.title} | NLGFC` : 'News | NLGFC'
  )
})
</script>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: #f3f4f6;
}

/* ── Loading / Error ── */
.state-screen {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.state-content {
  text-align: center;
  padding: 2rem;
}
.state-content h1 { font-size: 1.75rem; color: #111827; margin-bottom: 0.75rem; }
.state-content p  { color: #6b7280; margin-bottom: 1.5rem; }

.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #d1d5db;
  border-top-color: #1e3a5f;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Outer wrapper ── */
.article-wrap {
  width: 100%;
  padding: 1.5rem 1.5rem 4rem;
}

/* ── Back link ── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: #1e3a5f;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: color 0.2s;
}
.back-link:hover { color: #111827; }
.back-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

/* ── Hero image ── */
.hero-img-wrap {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: #e5e7eb;
}
.hero-img {
  width: 100%;
  display: block;
  max-height: 420px;
  object-fit: cover;
}

/* ── Article card ── */
.article-body {
  background: #fff;
  border-radius: 0.75rem;
  padding: 2rem 2rem 2.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
@media (max-width: 640px) { .article-body { padding: 1.25rem; } }

.article-date {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 0.6rem;
}

.article-title {
  font-size: 1.7rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  margin: 0 0 1.1rem;
}
@media (max-width: 640px) { .article-title { font-size: 1.3rem; } }

/* ── Author row ── */
.author-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.author-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9ca3af;
}
.author-avatar svg { width: 1.4rem; height: 1.4rem; }
.author-info { display: flex; flex-direction: column; gap: 0.05rem; }
.author-name { font-size: 0.875rem; font-weight: 600; color: #111827; }
.author-org  { font-size: 0.78rem; color: #6b7280; }

.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 1.5rem;
}

/* ── Rich text ── */
.article-content {
  color: #374151;
  font-size: 0.975rem;
  line-height: 1.8;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  color: #111827;
  font-weight: 700;
  margin: 2rem 0 0.75rem;
  line-height: 1.3;
}
.article-content :deep(h2) { font-size: 1.35rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.35rem; }
.article-content :deep(h3) { font-size: 1.1rem; }
.article-content :deep(h4) { font-size: 0.975rem; color: #1e3a5f; }

.article-content :deep(p) { margin: 0 0 1rem; }

.article-content :deep(img) {
  max-width: 100%;
  width: 100%;
  border-radius: 0.5rem;
  margin: 1.25rem 0;
  display: block;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.6rem;
  margin: 0 0 1rem;
}
.article-content :deep(li) { margin-bottom: 0.4rem; }

.article-content :deep(blockquote) {
  border-left: 4px solid #1e3a5f;
  margin: 1.25rem 0;
  padding: 0.75rem 1.25rem;
  background: #f0f4f8;
  border-radius: 0 0.5rem 0.5rem 0;
  color: #374151;
  font-style: italic;
}
.article-content :deep(blockquote p) { margin: 0; }

.article-content :deep(a) {
  color: #1e3a5f;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.article-content :deep(a:hover) { color: #2d5a8e; }

.article-content :deep(strong) { color: #111827; font-weight: 600; }
.article-content :deep(em) { color: #4b5563; }
.article-content :deep(hr) { border: none; border-top: 1px solid #e5e7eb; margin: 1.75rem 0; }

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.25rem 0;
  font-size: 0.9rem;
}
.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.6rem 0.9rem;
  text-align: left;
}
.article-content :deep(th) {
  background: #111827;
  color: #fff;
  font-weight: 600;
}
.article-content :deep(tr:nth-child(even) td) { background: #f8fafc; }

/* ── Sources section ── */
.sources-section {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e5e7eb;
}

.sources-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #6b7280;
  margin: 0 0 0.6rem;
}
.src-icon { width: 0.9rem; height: 0.9rem; flex-shrink: 0; }

.sources-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #1e3a5f;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
  word-break: break-all;
}
.source-link:hover { color: #2d5a8e; }
.ext-icon { width: 0.7rem; height: 0.7rem; flex-shrink: 0; }
</style>
