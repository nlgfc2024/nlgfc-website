<template>
  <div class="district-page">
    <div v-if="!district" class="not-found">
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
              <li><strong>Population:</strong> {{ district.profile.population }}</li>
              <li v-if="district.profile.jurisdiction"><strong>Location:</strong> {{ district.profile.jurisdiction }}</li>
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
                      <h3>{{ project.fullName }}</h3>
                    </div>
                    <span :class="['status-badge', project.status === 'Active' ? 'active' : 'inactive']">
                      {{ project.status }}
                    </span>
                  </div>
                  <p class="project-description">{{ project.description }}</p>
                  <div v-if="project.objectives?.length" class="objectives">
                    <h4>Objectives</h4>
                    <ul>
                      <li v-for="(obj, j) in project.objectives" :key="j">{{ obj }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p v-else class="empty-state">No projects available for this district yet.</p>
            </div>

            <!-- REPORTS TAB -->
            <div v-else-if="activeTab === 'reports'" key="reports" class="tab-content">
              <h2>Reports &amp; Documents</h2>
              <div v-if="district.reports?.length" class="reports-list">
                <div
                  v-for="(report, i) in district.reports"
                  :key="i"
                  class="report-card"
                >
                  <div class="report-icon">📄</div>
                  <div class="report-info">
                    <h3>{{ report.title }}</h3>
                    <div class="report-meta">
                      <span class="report-type">{{ report.type }}</span>
                      <span class="report-date">{{ formatDate(report.date) }}</span>
                    </div>
                    <p>{{ report.description }}</p>
                  </div>
                  <button class="download-btn" @click="downloadReport(report)">
                    ↓ Download
                  </button>
                </div>
              </div>
              <p v-else class="empty-state">No reports available for this district yet.</p>
            </div>

            <!-- NEWS TAB -->
            <div v-else-if="activeTab === 'news'" key="news" class="tab-content">
              <h2>News &amp; Updates</h2>
              <div v-if="district.news?.length" class="news-list">
                <div
                  v-for="(article, i) in district.news"
                  :key="i"
                  class="news-card"
                >
                  <div class="news-meta">
                    <span class="news-category">{{ article.category }}</span>
                    <span class="news-date">{{ formatDate(article.date) }}</span>
                  </div>
                  <h3>{{ article.title }}</h3>
                  <p>{{ article.summary }}</p>
                </div>
              </div>
              <p v-else class="empty-state">No news available for this district yet.</p>
            </div>
          </Transition>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getDistrict } = useDistrictContent()

const districtSlug = computed(() => route.params.district)
const district = computed(() => getDistrict(districtSlug.value))

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

const downloadReport = (report) => {
  // Placeholder — wire up to actual document URLs when available
  console.log('Download report:', report.title)
}

onMounted(() => {
  const tabParam = route.query.tab
  if (tabParam && tabs.some(t => t.id === tabParam)) {
    activeTab.value = tabParam
  }
})

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
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%);
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
  background: #eff6ff;
  color: #1d4ed8;
  border-left-color: #1d4ed8;
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
  color: #1e3a5f;
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
  color: #2d5a8e;
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
  color: #1d4ed8;
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

.vision { background: #eff6ff; }
.vision h3 { color: #1d4ed8; }

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
  background: #1e3a5f;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 0.25rem;
  margin-bottom: 0.4rem;
}

.project-header h3 { font-size: 1.1rem; color: #1e3a5f; margin: 0; }

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.active { background: #dcfce7; color: #15803d; }
.status-badge.inactive { background: #f3f4f6; color: #6b7280; }

.project-description { color: #4b5563; line-height: 1.6; margin-bottom: 1rem; }

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
}

.report-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

.report-icon { font-size: 2rem; flex-shrink: 0; }

.report-info { flex: 1; }
.report-info h3 { font-size: 1rem; color: #1e3a5f; margin: 0 0 0.4rem; }
.report-info p { font-size: 0.875rem; color: #4b5563; margin: 0.5rem 0 0; }

.report-meta { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }

.report-type {
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
}

.report-date { font-size: 0.8rem; color: #6b7280; }

.download-btn {
  background: #1e3a5f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.85rem;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: center;
  transition: background 0.2s;
}

.download-btn:hover { background: #2d5a8e; }

/* ── News ── */
.news-list { display: flex; flex-direction: column; gap: 1rem; }

.news-card {
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: box-shadow 0.2s;
}

.news-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

.news-meta { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.5rem; }

.news-category {
  background: #fef3c7;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.news-date { font-size: 0.8rem; color: #6b7280; }

.news-card h3 { font-size: 1rem; color: #1e3a5f; margin: 0 0 0.4rem; }
.news-card p { font-size: 0.875rem; color: #4b5563; margin: 0; line-height: 1.6; }

/* ── Empty State ── */
.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 3rem;
  font-size: 0.95rem;
}

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

.not-found-content h1 { font-size: 2rem; color: #1e3a5f; margin-bottom: 1rem; }
.not-found-content p { color: #4b5563; margin-bottom: 1.5rem; }

.back-link {
  display: inline-block;
  background: #1e3a5f;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.back-link:hover { background: #2d5a8e; }

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
