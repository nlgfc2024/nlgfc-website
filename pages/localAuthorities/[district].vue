<template>
  <div class="district-page">
    <div v-if="pending" class="not-found">
      <div class="not-found-content">
        <h1>Loading District...</h1>
      </div>
    </div>

    <div v-else-if="error" class="not-found">
      <div class="not-found-content">
        <h1>Unable to Load District</h1>
        <p>Could not load data for "<strong>{{ route.params.district }}</strong>".</p>
        <NuxtLink to="/localAuthorities/alldistricts" class="back-link">
          ← Back to All Districts
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="!district" class="not-found">
      <div class="not-found-content">
        <h1>District Not Found</h1>
        <p>The district "<strong>{{ route.params.district }}</strong>" does not exist.</p>
        <NuxtLink to="/localAuthorities/alldistricts" class="back-link">
          ← Back to All Districts
        </NuxtLink>
      </div>
    </div>

    <div v-else class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <NuxtLink to="/localAuthorities/alldistricts" class="breadcrumb">
            ← Local Authorities
          </NuxtLink>
          <h1>{{ district.name }}</h1>
          <span class="region-badge">{{ district.region }} Region</span>
        </div>
      </div>

      <div class="content-area">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
          <nav class="tab-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="['tab-btn', { active: activeTab === tab.id }]"
              @click="switchTab(tab.id)"
            >
              <span class="tab-icon">{{ tab.icon }}</span>
              {{ tab.title }}
            </button>
          </nav>

          <!-- Quick Info Card -->
          <div class="info-card">
            <h3>Quick Facts</h3>
            <ul>
              <li><strong>Region:</strong> {{ district.region }}</li>
              <li><strong>Population:</strong> {{ district.population }}</li>
              <li v-if="district.jurisdiction"><strong>Location:</strong> {{ district.jurisdiction }}</li>
            </ul>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <Transition name="fade-slide" mode="out-in">
            <!-- PROFILE TAB -->
            <div v-if="activeTab === 'profile'" key="profile" class="tab-content">
              <section class="content-section">
                <h2>About {{ district.name }}</h2>
                <p>{{ district.profile.about }}</p>
              </section>

              <section class="content-section" v-if="district.profile.mandate?.length">
                <h2>Mandate</h2>
                <ul class="styled-list">
                  <li v-for="(item, i) in district.profile.mandate" :key="i">{{ item }}</li>
                </ul>
              </section>

              <div class="vision-mission-grid">
                <div class="vm-card vision">
                  <h3>Vision</h3>
                  <p>{{ district.profile.vision }}</p>
                </div>
                <div class="vm-card mission">
                  <h3>Mission</h3>
                  <p>{{ district.profile.mission }}</p>
                </div>
              </div>

              <section class="content-section" v-if="district.profile.strategicObjectives?.length">
                <h2>Strategic Objectives</h2>
                <ul class="styled-list numbered">
                  <li v-for="(obj, i) in district.profile.strategicObjectives" :key="i">{{ obj }}</li>
                </ul>
              </section>

              <section class="content-section" v-if="district.profile.keyFunctions?.length">
                <h2>Key Functions</h2>
                <ul class="styled-list">
                  <li v-for="(fn, i) in district.profile.keyFunctions" :key="i">{{ fn }}</li>
                </ul>
              </section>

              <div class="stats-grid">
                <div class="stat-card" v-if="district.profile.majorAchievements">
                  <div class="stat-icon">🏆</div>
                  <div>
                    <h4>Major Achievements</h4>
                    <p>{{ district.profile.majorAchievements }}</p>
                  </div>
                </div>
                <div class="stat-card" v-if="district.profile.jurisdiction">
                  <div class="stat-icon">📍</div>
                  <div>
                    <h4>Jurisdiction</h4>
                    <p>{{ district.profile.jurisdiction }}</p>
                  </div>
                </div>
                <div class="stat-card" v-if="district.profile.population">
                  <div class="stat-icon">👥</div>
                  <div>
                    <h4>Population</h4>
                    <p>{{ district.profile.population }}</p>
                  </div>
                </div>
                <div class="stat-card" v-if="district.profile.structure">
                  <div class="stat-icon">🏛️</div>
                  <div>
                    <h4>Council Structure</h4>
                    <p>{{ district.profile.structure }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- PROJECTS TAB -->
            <div v-else-if="activeTab === 'projects'" key="projects" class="tab-content">
              <h2>Projects</h2>
              <div v-if="district.projects?.length" class="projects-list">
                <div
                  v-for="(project, i) in district.projects"
                  :key="i"
                  class="project-card"
                >
                  <div class="project-header">
                    <div>
                      <span class="project-acronym">{{ project.name }}</span>
                      <h3>{{ project.fullName || project.name }}</h3>
                    </div>
                    <span :class="['status-badge', project.status === 'Active' ? 'active' : project.status === 'Completed' ? 'completed' : 'inactive']">
                      {{ project.status }}
                    </span>
                  </div>
                  <!-- description with HTML support -->
                  <div v-if="project.description" class="project-description" v-html="project.description"></div>

                  <!-- Stats strip -->
                  <div v-if="project.totalProjects !== null || project.beneficiaries !== null || project.catchment !== null || project.fundsDisbursed !== null" class="project-stats">
                    <div v-if="project.totalProjects !== null" class="pstat">
                      <span class="pstat-value">{{ project.totalProjects }}</span>
                      <span class="pstat-label">Sub-projects</span>
                    </div>
                    <div v-if="project.beneficiaries !== null" class="pstat">
                      <span class="pstat-value">{{ Number(project.beneficiaries).toLocaleString() }}</span>
                      <span class="pstat-label">{{ project.name?.toUpperCase().includes('GESD') ? 'Infrastructures' : 'Beneficiaries' }}</span>
                    </div>
                    <div v-if="project.catchment !== null" class="pstat">
                      <span class="pstat-value">{{ Number(project.catchment).toLocaleString() }}</span>
                      <span class="pstat-label">Total Catchment</span>
                    </div>
                    <div v-if="project.fundsDisbursed !== null" class="pstat">
                      <span class="pstat-value">MWK {{ Number(project.fundsDisbursed).toLocaleString() }}</span>
                      <span class="pstat-label">Funds Disbursed</span>
                    </div>
                  </div>

                  <div v-if="project.objectives?.length" class="objectives">
                    <h4>Objectives</h4>
                    <ul>
                      <li v-for="(obj, j) in project.objectives" :key="j">{{ obj }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p v-else class="empty-state-box" style="display:block">No projects available for this district yet.</p>
            </div>

            <!-- REPORTS TAB -->
            <div v-else-if="activeTab === 'reports'" key="reports" class="tab-content">
              <div class="tab-header">
                <h2>Reports &amp; Documents</h2>
                <span v-if="district.reports?.length" class="item-count">{{ district.reports.length }} document{{ district.reports.length !== 1 ? 's' : '' }}</span>
              </div>
              <div v-if="district.reports?.length" class="reports-list">
                <div
                  v-for="(report, i) in district.reports"
                  :key="i"
                  class="report-card"
                >
                  <div class="report-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div class="report-info">
                    <div class="report-meta">
                      <span class="report-type">{{ report.type }}</span>
                      <span v-if="report.period" class="report-period">{{ report.period }}</span>
                      <span v-else-if="report.date" class="report-date">{{ formatDate(report.date) }}</span>
                    </div>
                    <h3>{{ report.title }}</h3>
                    <div v-if="report.description" class="report-description" v-html="report.description"></div>
                  </div>
                  <a
                    v-if="report.fileUrl"
                    :href="`${config.public.apiBase}/api/la-reports/${report.id}/download`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="download-btn"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" class="dl-icon"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    Download
                  </a>
                  <span v-else class="no-file-badge">File not available</span>
                </div>
              </div>
              <div v-else class="empty-state-box">
                <svg viewBox="0 0 48 48" fill="none" class="empty-icon"><path d="M28 4H10C8.34 4 7 5.34 7 7v34c0 1.66 1.34 3 3 3h28c1.66 0 3-1.34 3-3V20L28 4z" stroke="#d1d5db" stroke-width="2"/><path d="M28 4v16h12" stroke="#d1d5db" stroke-width="2"/></svg>
                <p>No reports have been published for this district yet.</p>
              </div>
            </div>

            <!-- NEWS TAB -->
            <div v-else-if="activeTab === 'news'" key="news" class="tab-content">
              <div class="tab-header">
                <h2>News &amp; Updates</h2>
                <span v-if="district.news?.length" class="item-count">{{ district.news.length }} article{{ district.news.length !== 1 ? 's' : '' }}</span>
              </div>
              <div v-if="district.news?.length" class="news-grid">
                <NuxtLink
                  v-for="(article, i) in district.news"
                  :key="i"
                  :to="`/localAuthorities/news/${article.id}?from=${districtSlug}`"
                  class="news-card news-card-link"
                >
                  <!-- Image banner -->
                  <div class="news-image-wrap">
                    <img
                      v-if="article.image"
                      :src="article.image"
                      :alt="article.title"
                      class="news-image"
                    />
                    <div v-else class="news-image-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="news-placeholder-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                  </div>
                  <!-- Card body -->
                  <div class="news-body">
                    <div class="news-meta">
                      <span class="news-category">{{ article.category }}</span>
                      <span v-if="article.date" class="news-date">{{ formatDate(article.date) }}</span>
                    </div>
                    <h3>{{ article.title }}</h3>
                    <p v-if="article.summary || article.content">{{ truncateText(article.summary || article.content) }}</p>
                  </div>
                </NuxtLink>
              </div>
              <div v-else class="empty-state-box">
                <svg viewBox="0 0 48 48" fill="none" class="empty-icon"><rect x="6" y="6" width="36" height="36" rx="4" stroke="#d1d5db" stroke-width="2"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#d1d5db" stroke-width="2" stroke-linecap="round"/></svg>
                <p>No news has been published for this district yet.</p>
              </div>
            </div>
          </Transition>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute()
const config = useRuntimeConfig()

const districtSlug = computed(() => String(route.params.district || ''))
const stripHtml = (value) => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
// Normalize array items — handles plain strings OR Filament Repeater objects {item:"..."}
const toList = (arr) => Array.isArray(arr) ? arr.map(v => typeof v === 'string' ? v : (v?.item || v?.label || '')).filter(Boolean) : []

const { data: districtData, pending, error, refresh: refreshData } = await useAsyncData(
  `la:${districtSlug.value}`,
  async () => {
    if (!districtSlug.value) return null
    try {
      return await $fetch(
        `${config.public.apiBase}/api/local-authorities/slug/${districtSlug.value}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      )
    } catch (err) {
      if (err?.status === 404 || err?.statusCode === 404) return null
      throw err
    }
  },
  {
    watch: [districtSlug],
    default: () => null,
    // Always fetch fresh data — prevents stale CMS updates being shown
    getCachedData: () => null,
  }
)

// Force re-fetch every time this page mounts on the client
// so CMS updates always reflect immediately without needing a hard refresh
if (import.meta.client) {
  onMounted(() => refreshData())
}

const district = computed(() => {
  if (!districtData.value) return null

  const payload = districtData.value
  const profileData = payload?.profile_data || {}
  const incomingSections = Array.isArray(profileData.sections) ? profileData.sections : []

  const legacySections = [
    {
      type: 'about',
      data: {
        title: `About ${payload.name || 'District'}`,
        content: stripHtml(profileData.about || payload.profile),
      },
    },
    Array.isArray(profileData.mandate) && profileData.mandate.length
      ? {
          type: 'bullet_list',
          data: {
            title: 'Mandate',
            style: 'default',
            items: profileData.mandate.map((label) => ({ label })),
          },
        }
      : null,
    (profileData.vision || profileData.mission)
      ? {
          type: 'vision_mission',
          data: {
            vision: profileData.vision || '',
            mission: profileData.mission || '',
          },
        }
      : null,
    Array.isArray(profileData.strategicObjectives) && profileData.strategicObjectives.length
      ? {
          type: 'bullet_list',
          data: {
            title: 'Strategic Objectives',
            style: 'numbered',
            items: profileData.strategicObjectives.map((label) => ({ label })),
          },
        }
      : null,
    Array.isArray(profileData.keyFunctions) && profileData.keyFunctions.length
      ? {
          type: 'bullet_list',
          data: {
            title: 'Key Functions',
            style: 'default',
            items: profileData.keyFunctions.map((label) => ({ label })),
          },
        }
      : null,
    (profileData.majorAchievements || profileData.jurisdiction || profileData.population || profileData.structure)
      ? {
          type: 'stats_grid',
          data: {
            cards: [
              profileData.majorAchievements ? { icon: '🏆', title: 'Major Achievements', body: profileData.majorAchievements } : null,
              (profileData.jurisdiction || payload.jurisdiction) ? { icon: '📍', title: 'Jurisdiction', body: profileData.jurisdiction || payload.jurisdiction } : null,
              (profileData.population || payload.population) ? { icon: '👥', title: 'Population', body: profileData.population || payload.population } : null,
              profileData.structure ? { icon: '🏛️', title: 'Council Structure', body: profileData.structure } : null,
            ].filter(Boolean),
          },
        }
      : null,
  ].filter(Boolean)

  const profileSections = (incomingSections.length ? incomingSections : legacySections)
    .map((section) => ({
      type: section?.type || '',
      ...(section?.data || {}),
    }))
    .filter((section) => !!section.type)

  return {
    name: payload.name,
    region: payload.region || '',
    population: payload.population || 'N/A',
    jurisdiction: payload.jurisdiction || '',
    profile: {
      about: stripHtml(profileData.about || payload.profile),
      mandate: toList(profileData.mandate),
      vision: profileData.vision || '',
      mission: profileData.mission || '',
      strategicObjectives: toList(profileData.strategicObjectives),
      keyFunctions: toList(profileData.keyFunctions),
      majorAchievements: profileData.majorAchievements || '',
      jurisdiction: profileData.jurisdiction || payload.jurisdiction || '',
      population: profileData.population || payload.population || 'N/A',
      structure: profileData.structure || '',
    },
    projects: Array.isArray(payload.projects)
      ? payload.projects.map((project) => ({
          name: project.name || 'Project',
          fullName: project.full_name || '',
          description: project.description || '',
          objectives: Array.isArray(project.objectives) ? project.objectives : [],
          status: project.status || 'Active',
          totalProjects: project.total_projects ?? null,
          beneficiaries: project.no_of_beneficiaries ?? null,
          catchment: project.total_catchment ?? null,
          fundsDisbursed: project.total_funds_disbursed ?? null,
        }))
      : [],
    reports: Array.isArray(payload.reports)
      ? payload.reports.map((report) => ({
          id: report.id,
          title: report.title || 'Untitled Report',
          type: report.type || 'Report',
          period: report.period || null,
          date: report.created_at || report.updated_at || null,
          description: report.description || '',
          fileUrl: report.file_url || null
        }))
      : [],
    news: Array.isArray(payload.news)
      ? payload.news.map((article) => ({
          id: article.id,
          title: article.title || 'Untitled Article',
          slug: article.slug || null,
          image: article.image_url || null,
          category: article.category || 'News',
          date: article.created_at || article.updated_at || null,
          summary: article.summary || '',
          content: article.content || ''
        }))
      : []
  }
})

const tabs = [
  { id: 'profile',  title: 'Profile',  icon: '🏛️' },
  { id: 'projects', title: 'Projects', icon: '📋' },
  { id: 'reports',  title: 'Reports',  icon: '📄' },
  { id: 'news',     title: 'News',     icon: '📰' }
]

const activeTab = ref('profile')
const isTransitioning = ref(false)

const switchTab = (tabId) => {
  if (tabId === activeTab.value || isTransitioning.value) return
  isTransitioning.value = true
  setTimeout(() => {
    activeTab.value = tabId
    isTransitioning.value = false
  }, 150)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

const truncateText = (html, maxLength = 120) => {
  const plain = String(html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return plain.length > maxLength ? plain.slice(0, maxLength).trimEnd() + '…' : plain
}

onMounted(() => {
  const tabParam = route.query.tab
  if (tabParam && tabs.some(t => t.id === tabParam)) {
    activeTab.value = tabParam
  }
})

watch(
  () => route.query.tab,
  (tabParam) => {
    if (tabParam && tabs.some((tab) => tab.id === tabParam)) {
      activeTab.value = tabParam
    }
  }
)

useHead({
  title: computed(() =>
    district.value ? `${district.value.name} | NLGFC` : 'District Council | NLGFC'
  )
})
</script>

<style scoped>
/* ── Layout ── */
.district-page {
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  background: #111827;
  color: white;
  padding: 2rem 1.5rem 1.5rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 0.875rem;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}
.breadcrumb:hover { color: white; }

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.region-badge {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.content-area {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .content-area {
    grid-template-columns: 1fr;
  }
}

/* ── Sidebar ── */
.sidebar {
  position: sticky;
  top: 1.5rem;
}

.tab-nav {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  margin-bottom: 1.25rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.85rem 1.2rem;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 0.925rem;
  cursor: pointer;
  color: #374151;
  border-left: 3px solid transparent;
  transition: all 0.15s;
}

.tab-btn:hover { background: #f3f4f6; }
.tab-btn.active {
  background: #eef2f7;
  color: #111827;
  border-left-color: #111827;
  font-weight: 600;
}

.tab-icon { font-size: 1rem; }

.info-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.info-card h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin: 0 0 0.75rem;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  font-size: 0.85rem;
  color: #374151;
  padding: 0.3rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-card li:last-child { border-bottom: none; }

/* ── Main Content ── */
.main-content {
  min-height: 400px;
}

.tab-content {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.tab-content h2 {
  font-size: 1.5rem;
  color: #111827;
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.content-section {
  margin-bottom: 2rem;
}

.content-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.content-section p {
  color: #4b5563;
  line-height: 1.7;
}

/* ── Lists ── */
.styled-list {
  padding-left: 0;
  list-style: none;
}

.styled-list li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.styled-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #1e3a5f;
}

.styled-list.numbered {
  counter-reset: obj-counter;
}

.styled-list.numbered li {
  counter-increment: obj-counter;
  padding-left: 2.25rem;
}

.styled-list.numbered li::before {
  content: counter(obj-counter) '.';
  font-weight: 600;
  color: #111827;
}

/* ── Vision/Mission Grid ── */
.vision-mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .vision-mission-grid { grid-template-columns: 1fr; }
}

.vm-card {
  padding: 1.25rem;
  border-radius: 0.5rem;
}

.vm-card h3 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
}

.vm-card p { margin: 0; line-height: 1.6; font-size: 0.925rem; }

.vision { background: #eef2f7; }
.vision h3 { color: #111827; }

.mission { background: #f0fdf4; }
.mission h3 { color: #16a34a; }

/* ── Stats Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.stat-icon { font-size: 1.5rem; flex-shrink: 0; }

.stat-card h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin: 0 0 0.3rem;
}

.stat-card p { font-size: 0.875rem; color: #374151; margin: 0; line-height: 1.5; }

/* ── Projects ── */
.projects-list { display: flex; flex-direction: column; gap: 1.5rem; }

.project-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.project-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-acronym {
  display: inline-block;
  background: #111827;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 0.25rem;
  margin-bottom: 0.4rem;
}

.project-header h3 { font-size: 1.1rem; color: #111827; margin: 0; }

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.active { background: #dcfce7; color: #15803d; }
.status-badge.inactive { background: #f3f4f6; color: #6b7280; }
.status-badge.completed { background: #dbeafe; color: #1d4ed8; }

.project-description { color: #4b5563; line-height: 1.6; margin-bottom: 1rem; }

/* Stats strip */
.project-stats {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.pstat {
  display: flex;
  flex-direction: column;
  background: #f0f4f8;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem 0.9rem;
  min-width: 100px;
}

.pstat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.pstat-label {
  font-size: 0.72rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.15rem;
}

.objectives h4 { font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem; }

.objectives ul {
  padding-left: 1.25rem;
  margin: 0;
}

.objectives li { color: #4b5563; font-size: 0.9rem; margin-bottom: 0.3rem; }

/* ── Reports ── */
.reports-list { display: flex; flex-direction: column; gap: 1rem; }

.report-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: box-shadow 0.2s;
  background: white;
}

.report-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

.report-icon-wrap {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  background: #eef2f7;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.report-icon-wrap svg {
  width: 1.4rem;
  height: 1.4rem;
  stroke: #1e3a5f;
}

.report-info { flex: 1; min-width: 0; }
.report-info h3 { font-size: 1rem; color: #111827; margin: 0.35rem 0 0.4rem; line-height: 1.4; }

.report-description { font-size: 0.875rem; color: #4b5563; line-height: 1.6; margin: 0; }
.report-description p { margin: 0 0 0.4rem; }
.report-description p:last-child { margin-bottom: 0; }
.report-description ul, .report-description ol { padding-left: 1.2rem; margin: 0 0 0.4rem; }
.report-description li { margin-bottom: 0.2rem; }

.report-meta { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }

.report-type {
  background: #dbeafe;
  color: #1e3a5f;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
}

.report-period {
  font-size: 0.8rem;
  color: #374151;
  font-weight: 500;
}

.report-date { font-size: 0.8rem; color: #6b7280; }

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #111827;
  color: white;
  border: none;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: center;
  transition: background 0.2s;
}
.download-btn:hover { background: #1e3a5f; }
.dl-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

.no-file-badge {
  flex-shrink: 0;
  align-self: center;
  font-size: 0.75rem;
  color: #9ca3af;
  padding: 0.4rem 0.75rem;
  border: 1px dashed #d1d5db;
  border-radius: 0.375rem;
  white-space: nowrap;
}

/* ── News ── */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.news-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  background: white;
  transition: box-shadow 0.2s, transform 0.15s;
  display: flex;
  flex-direction: column;
}

.news-card-link {
  text-decoration: none;
  color: inherit;
}

.news-card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.news-image-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #111827 0%, #1e3a5f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-placeholder-icon {
  width: 2.5rem;
  height: 2.5rem;
  stroke: rgba(255,255,255,0.4);
}

.news-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.news-meta { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }

.news-category {
  background: #eef2f7;
  color: #1e3a5f;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
}

.news-date { font-size: 0.75rem; color: #9ca3af; }

.news-body h3 {
  font-size: 0.95rem;
  color: #111827;
  margin: 0;
  line-height: 1.45;
  font-weight: 600;
}

.news-body p {
  font-size: 0.85rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}

/* ── Tab header ── */
.tab-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-header h2 {
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
  padding: 0;
  border: none;
}

.item-count {
  font-size: 0.8rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

/* ── Empty state box ── */
.empty-state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 2rem;
  text-align: center;
  color: #9ca3af;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 0.75rem;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.75rem;
  opacity: 0.6;
}

.empty-state-box p { font-size: 0.9rem; margin: 0; }

/* ── Not Found ── */
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
}

.not-found-content h1 { font-size: 2rem; color: #111827; margin-bottom: 1rem; }
.not-found-content p { color: #4b5563; margin-bottom: 1.5rem; }

.back-link {
  display: inline-block;
  background: #111827;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.back-link:hover { background: #1e3a5f; }

/* ── Transitions ── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.15s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
