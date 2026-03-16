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
            <!-- Profile -->
            <button
              :class="['tab-btn', { active: activeTab === 'profile' }]"
              @click="switchTab('profile'); sidebarProjectsOpen = false"
            >
              <span class="tab-icon">🏛️</span> Profile
            </button>

            <!-- Projects with expandable sub-list -->
            <button
              :class="['tab-btn', { active: activeTab === 'projects' }]"
              @click="switchTab('projects'); sidebarProjectsOpen = !sidebarProjectsOpen"
            >
              <span class="tab-icon">📋</span>
              <span style="flex:1">Projects</span>
              <svg
                class="tab-expand-chevron"
                :class="{ open: sidebarProjectsOpen }"
                viewBox="0 0 20 20" fill="currentColor" width="14" height="14"
              ><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
            </button>

            <!-- Project sub-items -->
            <transition name="sidebar-expand">
              <div v-if="sidebarProjectsOpen && groupedProjectStats.length" class="tab-sub-list">
                <button
                  v-for="grp in groupedProjectStats"
                  :key="grp.projectName"
                  :class="['tab-sub-btn', { active: activeTab === 'projects' && selectedProject === grp.projectName }]"
                  :title="'View statistics for ' + grp.projectName"
                  @click="switchTab('projects'); toggleProject(grp.projectName)"
                >
                  <span class="tab-sub-dot"></span>
                  <span class="tab-sub-name">{{ grp.projectName }}</span>
                </button>
              </div>
            </transition>

            <!-- Reports -->
            <button
              :class="['tab-btn', { active: activeTab === 'reports' }]"
              @click="switchTab('reports'); sidebarProjectsOpen = false"
            >
              <span class="tab-icon">📄</span> Reports
            </button>

            <!-- News -->
            <button
              :class="['tab-btn', { active: activeTab === 'news' }]"
              @click="switchTab('news'); sidebarProjectsOpen = false"
            >
              <span class="tab-icon">📰</span> News
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

              <section class="content-section" v-if="district.profile.coreValues?.length">
                <h2>Core Values</h2>
                <ul class="core-values-list">
                  <li v-for="(val, i) in district.profile.coreValues" :key="i" class="core-value-item">
                    <span class="core-value-dot">✦</span> {{ val }}
                  </li>
                </ul>
              </section>

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
                <div class="stat-card" v-if="district.population">
                  <div class="stat-icon">👥</div>
                  <div>
                    <h4>Population</h4>
                    <p>{{ district.population }}</p>
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

              <!-- Project Statistics from API -->
              <div v-if="statsPending" class="pstats-loading">
                <span class="pstats-spinner"></span> Loading project statistics…
              </div>
              <div v-else-if="groupedProjectStats.length" class="pstats-section">
                <div class="pstats-section-header">
                  <h3>Project Statistics<span v-if="selectedProject" class="pstats-section-proj-name"> — {{ selectedProject }}</span></h3>
                  <span class="item-count">{{ groupedProjectStats.length }} project{{ groupedProjectStats.length !== 1 ? 's' : '' }}</span>
                </div>

                <!-- Summary strip: overall totals, or selected-project totals when a project is active -->
                <div class="pstats-summary">
                  <div class="pstats-sum-card">
                    <span class="pstats-sum-val">{{ displayedSummary.totalSubProjects.toLocaleString() }}</span>
                    <span class="pstats-sum-label">{{ selectedProject ? 'Sub-projects' : 'Total Sub-projects' }}</span>
                  </div>
                  <div class="pstats-sum-card pstats-sum-card--green">
                    <span class="pstats-sum-val">{{ displayedSummary.totalCompleted.toLocaleString() }}</span>
                    <span class="pstats-sum-label">Completed</span>
                  </div>
                  <div class="pstats-sum-card pstats-sum-card--red">
                    <span class="pstats-sum-val">{{ displayedSummary.totalNotCompleted.toLocaleString() }}</span>
                    <span class="pstats-sum-label">Not Completed</span>
                  </div>
                  <div class="pstats-sum-card">
                    <span class="pstats-sum-val">{{ displayedSummary.totalBeneficiaries.toLocaleString() }}</span>
                    <span class="pstats-sum-label">Beneficiaries</span>
                  </div>
                  <div v-if="displayedSummary.totalFunds > 0" class="pstats-sum-card pstats-sum-card--blue">
                    <span class="pstats-sum-val">MWK {{ displayedSummary.totalFunds.toLocaleString() }}</span>
                    <span class="pstats-sum-label">Funds Disbursed</span>
                  </div>
                </div>

                <!-- Detail panel shown when a project is selected from the sidebar -->
                <transition name="fade-slide">
                  <div v-if="selectedProjectData" class="pstats-detail-panel">

                    <!-- Panel header -->
                    <div class="pstats-detail-header">
                      <div class="pstats-detail-title-row">
                        <h3 class="pstats-detail-title">{{ selectedProjectData.projectName }}</h3>
                        <button class="pstats-detail-close" @click="selectedProject = null" aria-label="Close">&#x2715;</button>
                      </div>
                      <!-- Project summary chips -->
                      <div class="pstats-detail-chips">
                        <div class="pstats-detail-chip">
                          <span class="pstats-detail-chip-val">{{ selectedProjectData.totalSubProjects.toLocaleString() }}</span>
                          <span class="pstats-detail-chip-lbl">Sub-projects</span>
                        </div>
                        <div class="pstats-detail-chip pstats-detail-chip--green">
                          <span class="pstats-detail-chip-val">{{ selectedProjectData.totalCompleted.toLocaleString() }}</span>
                          <span class="pstats-detail-chip-lbl">Completed</span>
                        </div>
                        <div class="pstats-detail-chip pstats-detail-chip--red">
                          <span class="pstats-detail-chip-val">{{ selectedProjectData.totalNotCompleted.toLocaleString() }}</span>
                          <span class="pstats-detail-chip-lbl">Not Completed</span>
                        </div>
                        <div class="pstats-detail-chip">
                          <span class="pstats-detail-chip-val">{{ selectedProjectData.totalBeneficiaries.toLocaleString() }}</span>
                          <span class="pstats-detail-chip-lbl">Beneficiaries</span>
                        </div>
                        <div v-if="selectedProjectData.totalFunds > 0" class="pstats-detail-chip pstats-detail-chip--blue">
                          <span class="pstats-detail-chip-val">MWK {{ selectedProjectData.totalFunds.toLocaleString() }}</span>
                          <span class="pstats-detail-chip-lbl">Funds Disbursed</span>
                        </div>
                        <div class="pstats-detail-chip pstats-detail-chip--pct"
                          :class="{
                            'pstats-detail-chip--pct-full': selectedProjectData.completionPct >= 100,
                            'pstats-detail-chip--pct-high': selectedProjectData.completionPct >= 75 && selectedProjectData.completionPct < 100,
                            'pstats-detail-chip--pct-mid':  selectedProjectData.completionPct >= 40 && selectedProjectData.completionPct < 75,
                          }"
                        >
                          <span class="pstats-detail-chip-val">{{ selectedProjectData.completionPct.toFixed(1) }}%</span>
                          <span class="pstats-detail-chip-lbl">Completion</span>
                        </div>
                      </div>
                      <!-- Overall progress for selected project -->
                      <div class="pstats-detail-progress-wrap">
                        <div class="pstats-detail-progress-track">
                          <div
                            class="pstats-progress-fill"
                            :style="{ width: Math.min(selectedProjectData.completionPct, 100) + '%' }"
                            :class="{
                              'pstats-progress-fill--full': selectedProjectData.completionPct >= 100,
                              'pstats-progress-fill--high': selectedProjectData.completionPct >= 75 && selectedProjectData.completionPct < 100,
                              'pstats-progress-fill--mid':  selectedProjectData.completionPct >= 40 && selectedProjectData.completionPct < 75,
                            }"
                          ></div>
                        </div>
                        <span class="pstats-detail-pct-label">{{ selectedProjectData.completionPct.toFixed(1) }}% overall completion</span>
                      </div>
                    </div>

                    <!-- Ward-by-ward table -->
                    <div class="pstats-ward-table-wrap">
                      <table class="pstats-ward-table">
                        <thead>
                          <tr>
                            <th>Ward</th>
                            <th>Constituency</th>
                            <th>Sub-projects</th>
                            <th>Completed</th>
                            <th>Not Completed</th>
                            <th>Progress</th>
                            <th>Beneficiaries</th>
                            <th>Funds Disbursed (MWK)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="row in selectedProjectData.wards" :key="row.id">
                            <td class="pstats-td-ward">{{ row.ward || '—' }}</td>
                            <td>{{ row.constituency || '—' }}</td>
                            <td>{{ row.totalProjects !== null ? row.totalProjects.toLocaleString() : '—' }}</td>
                            <td class="pstats-td-done">{{ row.completedProjects !== null ? row.completedProjects.toLocaleString() : '—' }}</td>
                            <td class="pstats-td-pending">{{ row.notCompleted !== null ? row.notCompleted.toLocaleString() : '—' }}</td>
                            <td>
                              <div class="pstats-mini-wrap">
                                <div class="pstats-mini-track">
                                  <div class="pstats-progress-fill pstats-mini-fill"
                                    :style="{ width: Math.min(row.completionPercentage, 100) + '%' }"
                                    :class="{
                                      'pstats-progress-fill--full': row.completionPercentage >= 100,
                                      'pstats-progress-fill--high': row.completionPercentage >= 75,
                                      'pstats-progress-fill--mid':  row.completionPercentage >= 40,
                                    }"
                                  ></div>
                                </div>
                                <span class="pstats-mini-pct">{{ row.completionPercentage.toFixed(0) }}%</span>
                              </div>
                            </td>
                            <td>{{ row.beneficiaries !== null ? Number(row.beneficiaries).toLocaleString() : '—' }}</td>
                            <td>{{ row.fundsDisbursed > 0 ? Number(row.fundsDisbursed).toLocaleString() : '—' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="pstats-acc-footer">
                      {{ selectedProjectData.wards.length }} ward record{{ selectedProjectData.wards.length !== 1 ? 's' : '' }}
                    </div>

                  </div>
                </transition>
              </div>

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
              <p v-else-if="!projectStats.length" class="empty-state-box" style="display:block">No projects available for this district yet.</p>
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

// Fetch LA projects stats for this local authority
const { data: statsData, pending: statsPending, refresh: refreshStats } = await useAsyncData(
  `la-stats:${districtSlug.value}`,
  async () => {
    const id = districtData.value?.id
    if (!id) return null
    try {
      return await $fetch(
        `${config.public.apiBase}/api/la-projects-stats?local_authority_id=${id}&per_page=100`
      )
    } catch {
      return null
    }
  },
  {
    watch: [districtSlug],
    default: () => null,
    getCachedData: () => null,
  }
)

// Force re-fetch every time this page mounts on the client
// so CMS updates always reflect immediately without needing a hard refresh
if (import.meta.client) {
  onMounted(() => { refreshData(); refreshStats() })
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
    (profileData.majorAchievements || profileData.jurisdiction || payload.population || profileData.structure)
      ? {
          type: 'stats_grid',
          data: {
            cards: [
              profileData.majorAchievements ? { icon: '🏆', title: 'Major Achievements', body: profileData.majorAchievements } : null,
              (profileData.jurisdiction || payload.jurisdiction) ? { icon: '📍', title: 'Jurisdiction', body: profileData.jurisdiction || payload.jurisdiction } : null,
              payload.population ? { icon: '👥', title: 'Population', body: payload.population } : null,
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
      coreValues: toList(profileData.coreValues),
      strategicObjectives: toList(profileData.strategicObjectives),
      keyFunctions: toList(profileData.keyFunctions),
      majorAchievements: profileData.majorAchievements || '',
      jurisdiction: profileData.jurisdiction || payload.jurisdiction || '',
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

const projectStats = computed(() => {
  const items = statsData.value?.data
  if (!Array.isArray(items) || !items.length) return []
  return items.map(stat => ({
    id: stat.id,
    projectName: stat.project?.name || 'Unknown Project',
    totalProjects: stat.total_projects ?? null,
    completedProjects: stat.total_projects_completed ?? null,
    notCompleted: (stat.total_projects != null && stat.total_projects_completed != null)
      ? Math.max(0, stat.total_projects - stat.total_projects_completed)
      : null,
    completionPercentage: parseFloat(stat.completion_percentage) || 0,
    beneficiaries: stat.no_of_beneficiaries ?? null,
    fundsDisbursed: parseFloat(stat.total_funds_disbursed) || 0,
    ward: stat.ward?.name || null,
    constituency: stat.ward?.constituency?.name || null,
  }))
})

const groupedProjectStats = computed(() => {
  const map = new Map()
  for (const stat of projectStats.value) {
    if (!map.has(stat.projectName)) map.set(stat.projectName, [])
    map.get(stat.projectName).push(stat)
  }
  return Array.from(map.entries()).map(([projectName, wards]) => {
    const total = wards.reduce((a, s) => a + (s.totalProjects || 0), 0)
    const completed = wards.reduce((a, s) => a + (s.completedProjects || 0), 0)
    return {
      projectName,
      wards,
      totalSubProjects: total,
      totalCompleted: completed,
      totalNotCompleted: Math.max(0, total - completed),
      totalBeneficiaries: wards.reduce((a, s) => a + (s.beneficiaries || 0), 0),
      totalFunds: wards.reduce((a, s) => a + (s.fundsDisbursed || 0), 0),
      completionPct: total > 0 ? (completed / total) * 100 : 0,
    }
  })
})

const overallSummary = computed(() => ({
  totalSubProjects: groupedProjectStats.value.reduce((a, g) => a + g.totalSubProjects, 0),
  totalCompleted:   groupedProjectStats.value.reduce((a, g) => a + g.totalCompleted, 0),
  totalNotCompleted: groupedProjectStats.value.reduce((a, g) => a + g.totalNotCompleted, 0),
  totalBeneficiaries: groupedProjectStats.value.reduce((a, g) => a + g.totalBeneficiaries, 0),
  totalFunds: groupedProjectStats.value.reduce((a, g) => a + g.totalFunds, 0),
}))

const expandedProjects = ref({})
const selectedProject = ref(null)
const toggleProject = (name) => {
  selectedProject.value = selectedProject.value === name ? null : name
}
const selectedProjectData = computed(() =>
  groupedProjectStats.value.find(g => g.projectName === selectedProject.value) || null
)
// Summary strip: shows selected project stats when one is active, overall otherwise
const displayedSummary = computed(() => selectedProjectData.value ?? overallSummary.value)

const tabs = [
  { id: 'profile',  title: 'Profile',  icon: '🏛️' },
  { id: 'projects', title: 'Projects', icon: '📋' },
  { id: 'reports',  title: 'Reports',  icon: '📄' },
  { id: 'news',     title: 'News',     icon: '📰' }
]

const activeTab = ref('profile')
const isTransitioning = ref(false)
const sidebarProjectsOpen = ref(false)

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

.tab-expand-chevron {
  flex-shrink: 0;
  color: #9ca3af;
  transition: transform 0.2s;
}
.tab-expand-chevron.open { transform: rotate(180deg); }

/* Sub-item list */
.tab-sub-list {
  background: #f8fafc;
  border-top: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
  overflow: hidden;
}

.tab-sub-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.55rem 1.2rem 0.55rem 2rem;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 0.845rem;
  cursor: pointer;
  color: #4b5563;
  border-left: 3px solid transparent;
  transition: all 0.15s;
}

.tab-sub-btn:hover { background: #f0f4f8; color: #111827; }
.tab-sub-btn.active {
  background: #eef2f7;
  color: #111827;
  border-left-color: #111827;
  font-weight: 600;
}

.tab-sub-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ca3af;
  flex-shrink: 0;
}

.tab-sub-btn.active .tab-sub-dot { background: #111827; }

.tab-sub-name { flex: 1; }

/* Slide transition for sub-list */
.sidebar-expand-enter-active,
.sidebar-expand-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  max-height: 300px;
  opacity: 1;
}
.sidebar-expand-enter-from,
.sidebar-expand-leave-to {
  max-height: 0;
  opacity: 0;
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

/* ── Core Values ── */
.core-values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.core-value-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.925rem;
  color: #374151;
  font-weight: 500;
}

.core-value-dot {
  color: #2563eb;
  font-size: 0.65rem;
  flex-shrink: 0;
}
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

/* ── Project Statistics Cards ── */
.pstats-section {
  margin-bottom: 2rem;
}

.pstats-section-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.pstats-section-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pstats-section-proj-name {
  font-weight: 600;
  color: #2563eb;
  text-transform: none;
  letter-spacing: 0;
}

/* Summary strip */
.pstats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.pstats-sum-card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 0.625rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.pstats-sum-card--green { background: #f0fdf4; border-color: #bbf7d0; }
.pstats-sum-card--blue  { background: #eff6ff; border-color: #bfdbfe; }

.pstats-sum-val {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.pstats-sum-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

/* ── Progress bar colours (shared by header + ward rows) ── */
.pstats-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #f59e0b;
  transition: width 0.5s ease;
}
.pstats-progress-fill--mid  { background: #3b82f6; }
.pstats-progress-fill--high { background: #10b981; }
.pstats-progress-fill--full { background: #16a34a; }

/* ── Summary strip extra colour ── */
.pstats-sum-card--red { background: #fff7f7; border-color: #fecaca; }

/* ── Detail panel (shown when project selected from sidebar) ── */
.pstats-detail-panel {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  background: white;
  margin-top: 0.25rem;
}

.pstats-detail-header {
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.1rem 1.25rem;
}

.pstats-detail-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.pstats-detail-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: 0.02em;
}

.pstats-detail-close {
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 0.35rem;
  padding: 0.15rem 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.4;
  transition: background 0.15s;
}
.pstats-detail-close:hover { background: #f3f4f6; }

.pstats-detail-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.pstats-detail-chip {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.45rem;
  padding: 0.35rem 0.75rem;
  min-width: 80px;
}

.pstats-detail-chip--green { background: #f0fdf4; border-color: #bbf7d0; }
.pstats-detail-chip--red   { background: #fff7f7; border-color: #fecaca; }
.pstats-detail-chip--blue  { background: #eff6ff; border-color: #bfdbfe; }

/* Completion % chip — colour shifts with progress */
.pstats-detail-chip--pct      { background: #f9fafb; border-color: #d1d5db; }
.pstats-detail-chip--pct .pstats-detail-chip-val { color: #6b7280; }

.pstats-detail-chip--pct-mid  { background: #eff6ff; border-color: #bfdbfe; }
.pstats-detail-chip--pct-mid  .pstats-detail-chip-val { color: #2563eb; }

.pstats-detail-chip--pct-high { background: #f0fdf4; border-color: #bbf7d0; }
.pstats-detail-chip--pct-high .pstats-detail-chip-val { color: #16a34a; }

.pstats-detail-chip--pct-full { background: #dcfce7; border-color: #86efac; }
.pstats-detail-chip--pct-full .pstats-detail-chip-val { color: #15803d; }

.pstats-detail-chip-val {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.pstats-detail-chip-lbl {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
  white-space: nowrap;
}

.pstats-detail-progress-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pstats-detail-progress-track {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.pstats-detail-pct-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.pstats-ward-table-wrap {
  overflow-x: auto;
}

.pstats-ward-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
}

.pstats-ward-table thead tr {
  background: #1e3a5f;
  color: white;
}

.pstats-ward-table th {
  padding: 0.6rem 0.9rem;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.pstats-ward-table td {
  padding: 0.55rem 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
}

.pstats-ward-table tbody tr:last-child td { border-bottom: none; }
.pstats-ward-table tbody tr:hover { background: #f3f4f6; }

.pstats-td-ward { font-weight: 600; color: #111827 !important; white-space: normal !important; min-width: 120px; }
.pstats-td-done    { color: #16a34a !important; font-weight: 600; }
.pstats-td-pending { color: #dc2626 !important; font-weight: 600; }

/* Mini progress bar in table cells */
.pstats-mini-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pstats-mini-track {
  width: 60px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
}

.pstats-mini-fill { height: 100%; border-radius: 999px; }

.pstats-mini-pct {
  font-size: 0.72rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.pstats-acc-footer {
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
  color: #6b7280;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
}

.pstats-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.pstats-spinner {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid #d1d5db;
  border-top-color: #111827;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

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
