<template>
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
    <!-- Left Sidebar -->
    <div class="w-64 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-sm">
      <div class="p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-6">Resource Center</h2>
        <nav class="space-y-2">
          <div v-for="(tab, tabIndex) in tabs" :key="tabIndex" class="group">
            <div
                @click="toggleTab(tabIndex)"
                class="flex items-center justify-between w-full text-left py-3 px-4 font-medium text-slate-700 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:shadow-md hover:text-slate-900 hover:border-l-4 hover:border-blue-500"
                :class="{
                'bg-white shadow-md text-slate-900 border-l-4 border-blue-600': expandedTab === tabIndex,
                'hover:translate-x-1': expandedTab !== tabIndex
              }"
            >
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-3 text-slate-500" :class="{ 'text-blue-600': expandedTab === tabIndex }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="tab.name === 'Publications & Downloads'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  <path v-else-if="tab.name === 'Project Documents'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  <path v-else-if="tab.name === 'Reports'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a4 4 0 01-4 4z"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                {{ tab.name }}
              </span>
              <svg
                  class="w-4 h-4 text-slate-400 transition-transform duration-300"
                  :class="{ 'rotate-180 text-blue-600': expandedTab === tabIndex }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <div
                v-if="expandedTab === tabIndex"
                class="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300"
            >
              <a
                  v-for="(sub, subIndex) in tab.subcategories"
                  :key="subIndex"
                  @click="selectSub(tabIndex, subIndex)"
                  class="flex items-center w-full text-left py-2 px-4 text-sm font-medium text-slate-600 rounded-md cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:translate-x-2 hover:border-l-3 hover:border-blue-400"
                  :class="{
                  'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-l-3 border-blue-500 shadow-sm': activeTab === tabIndex && activeSub === subIndex
                }"
              >
                <div class="w-2 h-2 rounded-full mr-3 transition-colors duration-200"
                     :class="{
                       'bg-blue-500': activeTab === tabIndex && activeSub === subIndex,
                       'bg-slate-300': !(activeTab === tabIndex && activeSub === subIndex)
                     }">
                </div>
                {{ sub.name }}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-4">
      <section v-if="displayedDocuments.length">
        <h3 class="font-bold text-gray-600 text-lg mb-6">{{ currentTitle }}</h3>

        <!-- Video Grid Layout -->
        <transition-group
            v-if="currentSubcategoryType === 'Video'"
            name="grid-item"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            appear
        >
          <div
              v-for="(doc, index) in displayedDocuments"
              :key="doc.name"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="aspect-video">
              <iframe
                  :src="getVideoEmbedUrl(doc.link)"
                  class="w-full h-full"
                  frameborder="0"
                  allowfullscreen
                  :title="doc.name"
              ></iframe>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-gray-800 mb-2">{{ doc.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ doc.description }}</p>
              <a href="https://www.youtube.com/@nlgfcmalawi2455">
                <p class="text-[12px] font-semibold text-gray-600 mb-2">Watch More on NLGFC YouTube Channel</p>
              </a>
              <span class="inline-block text-xs bg-red-100 text-red-800 rounded px-2 py-1">
                {{ doc.type }}
              </span>
            </div>
          </div>
        </transition-group>

        <!-- Image Gallery Iframe Layout -->
        <div
            v-else-if="currentSubcategoryType === 'Image Gallery'"
            class="w-full">
            <!--I removed index on the v-for loop since we're using iframe now -->
          <div
              v-for="doc in displayedDocuments"
              :key="doc.name"
              class="bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl"
          >
            <!-- Header with gallery info -->
            <div class="bg-gradient-to-r from-gray-900 to-indigo-600 text-white p-4">
              <h4 class="font-semibold text-lg mb-1">{{ doc.name }}</h4>
              <p class="text-blue-100 text-sm">{{ doc.description }}</p>
              <span class="inline-block text-xs bg-white bg-opacity-20 text-blue-500 rounded px-2 py-1 mt-2">
                {{ doc.type }}
              </span>
            </div>

            <!-- Iframe container -->
            <div class="relative w-full" style="height: 600px;">
              <iframe
                  :src="doc.link"
                  class="w-full h-full border-0"
                  frameborder="0"
                  :title="doc.name"
                  allowfullscreen
                  loading="lazy"
                  @load="hideLoadingOverlay"
              ></iframe>

              <!-- Loading overlay -->
              <div
                  :class="['absolute inset-0 bg-gray-100 flex items-center justify-center transition-opacity duration-500', iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100']"
              >
                <div class="text-center">
                  <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p class="text-gray-600">Loading gallery...</p>
                </div>
              </div>
            </div>

            <!-- Footer with external link -->
            <div class="bg-gray-50 p-3 flex justify-between items-center">
              <span class="text-sm text-gray-600">External Gallery Content</span>
              <a
                  :href="doc.link"
                  target="_blank"
                  class="inline-flex items-center px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                  title="Open in new tab"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Open Gallery
              </a>
            </div>
          </div>
        </div>

        <!-- Default Document Grid Layout -->
        <transition-group
            v-else
            name="grid-item"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            appear
        >
          <div
              v-for="(doc, index) in displayedDocuments"
              :key="doc.name"
              class="relative bg-white rounded-2xl border-b-2 border-gray-400 shadow-sm hover:border-b-blue-500 transition-all duration-300 p-4 flex flex-col justify-between group hover:scale-105 hover:shadow-sm"
              :style="{ animationDelay: `${index * 100}ms` }"
          >
            <a
                :href="doc.link"
                target="_blank"
                class="absolute bottom-2 right-2 w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
                title="Download / View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/>
              </svg>
            </a>

            <div class="flex items-center mb-3">
              <img
                  v-if="doc.thumbnail"
                  :src="doc.thumbnail"
                  alt="Thumbnail"
                  class="w-12 h-12 rounded-lg object-cover mr-2"
              />
              <div>
                <h3 class="font-semibold text-gray-800 text-base">{{ doc.name }}</h3>
                <span class="inline-block text-xs bg-gray-200 rounded px-2 py-0.5 mt-1 text-gray-700">
                  {{ doc.type }}
                </span>
              </div>
            </div>

            <p class="text-sm text-gray-600">
              {{ doc.description || 'No description available.' }}
            </p>
            <p class="text-[12px] font-semibold text-blue-600">
              {{ doc.date || 'No date available.' }}
            </p>
          </div>
        </transition-group>
      </section>

      <!-- Loading State -->
      <transition name="fade" mode="out-in">
        <div v-if="!displayedDocuments.length" class="flex flex-col items-center justify-center py-16">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600 text-lg">Select a subcategory to view content</p>
        </div>
      </transition>
    </div>

    <!-- Image Modal (removed since we're using iframe now) -->
    <transition name="modal">
      <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="closeImageModal">
        <div class="relative max-w-4xl max-h-screen p-4">
          <button
              @click="closeImageModal"
              class="absolute top-2 right-2 text-white hover:text-gray-300 z-10 transition-colors duration-200"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <img
              :src="selectedImage.link"
              :alt="selectedImage.name"
              class="max-w-full max-h-full object-contain"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h3 class="font-semibold">{{ selectedImage.name }}</h3>
            <p class="text-sm">{{ selectedImage.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// ID mapping for subcategories
const subcategoryIdMap = {
  // Publications & Downloads
  'press-releases': { tab: 0, sub: 0 },
  'success-stories': { tab: 0, sub: 1 },
  'speeches': { tab: 0, sub: 2 },
  'research-discussions': { tab: 0, sub: 3 },
  'budget-documents': { tab: 0, sub: 4 },
  'disbursements': { tab: 0, sub: 5 },
  'newsletters': { tab: 0, sub: 6 },
  'manuals-guidelines': { tab: 0, sub: 7 },
  'policies-strategies': { tab: 0, sub: 8 },

  // Project Documents
  'ssrlp': { tab: 1, sub: 0 },
  'gesd': { tab: 1, sub: 1 },
  'rcrp2': { tab: 1, sub: 2 },

  // Reports
  'audit-reports': { tab: 2, sub: 0 },
  'financial-reports': { tab: 2, sub: 1 },
  'financial-statements': { tab: 2, sub: 2 },
  'lapa-synthesis': { tab: 2, sub: 3 },

  // Knowledge Management Portal
  'image-gallery': { tab: 3, sub: 0 },
  'video-library': { tab: 3, sub: 1 }
};

// Reverse mapping for generating IDs from tab/sub indices
const getIdFromTabSub = (tabIndex, subIndex) => {
  for (const [id, mapping] of Object.entries(subcategoryIdMap)) {
    if (mapping.tab === tabIndex && mapping.sub === subIndex) {
      return id;
    }
  }
  return null;
};

const tabs = ref([
  {
    name: 'Publications & Downloads',
    subcategories: [
      {
        name: 'Press Releases',
        id: 'press-releases',
        contents: [
          {
            name: 'Uthenga Wapadera Wa Covid 19 Emergency Cash Transfers',
            link: '/downloads/ECT_UTHENGA_WAPADERA_WA_COVID_19_LILONGWE_IMMEDIATE_RELEASE_APRIL_19_2020_1.pdf',
            type: 'PDF',
            description: 'ECT - Uthenga Wapadera Wa Covid 19 - Lilongwe - Immediate Release',
            date: '19 April 2020'
          },
          {
            name: 'Press Release on Covid-19',
            link: '/downloads/Councils_Cumulative_funding_figures_for_Publication_April_2020.xlsx',
            type: 'Excel',
            description: 'Revised after Governors meetings with MNOS MAMN and MUSCCO',
            date: '22  Jan 2025'
          },
          {
            name: 'Councils Funding Figures',
            link: '/downloads/Councils_funding_figures_for_publication_April_2020 _Word_Version.docx',
            type: 'Word',
            description: 'Council funding figures for publications',
            date: 'April, 2020'
          },
          {
            name: 'Councils accumulative Funding Figures',
            link: '/downloads/Councils_funding_figures_for_publication_April_2020 _Word_Version.docx',
            type: 'Word',
            description: 'Council accumulative funding figures for publications',
            date: 'April, 2020'
          },
          {
            name: 'Uthenga Wapedera - Special Announcemnts on GoM COVID 19 Responce',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Special announcement on Government of Malawi COVID-19 response',

          },
          {
            name: 'Special Communication on Covid 19 Emergency Cash Transfers',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Special Communication',
          },
          {
            name: 'Governance to Enable Service Delivery',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Governance to Enable Service Delivery (GESD) Project approval',
          },
          {
            name: 'STOPCOVID-19 NLGFC',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Details on the STOPCOVID-19 NLGFC initiative',
          },
          {
            name: 'SSRL_Effectiveness declaration',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'SSRL Effectiveness declaration notification',
            date: 'June 1 2020'
          },
          {
            name: 'Second Disbursment OF Covid -19 Urban Cash Payments',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Immediate release on second disbursement of COVID-19 urban cash payments',
          },
          {
            name: 'Local Authorities (LAs) Funding Advice',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'RCRP Expression of Interest for project implementation',
            date: 'December 2021'
          },
          {
            name: 'Press Release Appointment of ED',
            link: '/downloads/press-mar2025.pdf',
            type: 'PDF',
            description: 'Appointment of Dr. Kondwani Santhe As Exective Director  For NLGFC',
            date: 'August 2022'
          }
        ]
      },
      {
        name: 'Success Stories',
        id: 'success-stories',
        contents: [
          {
            name: 'NLGFC [PWP] Success Stories MASAF IV',
            link: '/downloads/success1.pdf',
            type: 'PDF',
            description: 'NLGFC PWP Success Stories for Booklet-MASAF IV.',
            date: 'December 2024'
          },
          {
            name: 'CS-EPWP Balaka Newsletters',
            link: '/downloads/success2.pdf',
            type: 'PDF',
            description: 'Climate Smart Newslatter for Balaka District.',
            date: 'December 2024'
          },
          {
            name: 'Lilongwe CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Lilongwe CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Likoma CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Likoma CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Machinga CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Machinga CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Mwanza CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Mwanza CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Nsanje CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Nsanje CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Ntcheu CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Ntcheu CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Salima CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Salima CS-EPWP success story',
            date: 'December 2024'
          },
          {
            name: 'Zomba CS-EPWP Succcess Stories',
            link: '/downloads/success3.pdf',
            type: 'PDF',
            description: 'Summary of Zomba CS-EPWP success story',
            date: 'December 2024'
          }
        ]
      },
      {
        name: 'Speeches',
        id: 'speeches',
        contents: [
          {
            name: 'NLGFC [PWP] Success Stories MASAF IV',
            link: '/downloads/success1.pdf',
            type: 'PDF',
            description: 'NLGFC PWP Success Stories for Booklet-MASAF IV.',
            date: 'December 2024'
          }
        ]
      },
      {
        name: 'Research & Discussions',
        id: 'research-discussions',
        contents: [
          {
            name: 'Research on Local Governance',
            link: 'https://example.com/gallery',
            type: 'pdf',
            description: 'Gallery showcasing project highlights.',
            date: 'January 2025'
          }
        ]
      },
      {
        name: 'Budget Documents',
        id: 'budget-documents',
        contents: [
          {
            name: 'Budget Document 2025',
            link: '/downloads/budget-2025.pdf',
            type: 'PDF',
            description: 'Budget document for the year 2025.',
            date: 'January 2025'
          }
        ]
      },
      {
        name: 'Disbursements',
        id: 'disbursements',
        contents: [
          {
            name: 'Disbursement Report Q1 2025',
            link: '/downloads/disbursement-q1-2025.pdf',
            type: 'Excel',
            description: 'Disbursement report for the first quarter of 2025.',
            date: 'January 2025'
          }
        ]
      },
      {
        name: 'Newsletters & Magazines',
        id: 'newsletters',
        contents: [
          {
            name: 'January Newsletter',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from January 2025 newsletter.',
            date: 'January 2025'
          },
          {
            name: 'February Newsletter',
            link: '/downloads/newsletter-feb2025.pdf',
            type: 'PDF',
            description: 'Highlights from February 2025 newsletter.',
            date: 'February 2025'
          },
          {
            name: 'March Newsletter',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from March 2025 newsletter.',
            date: 'March 2025'
          },
          {
            name: 'April Newsletter',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from April 2025 newsletter.',
            date: 'April 2025'
          },
          {
            name: 'May Newsletter',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from May 2025 newsletter.',
            date: 'May 2025'
          },
          {
            name: 'June Newsletter',
            link: '/downloads/newsletter-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from June 2025 newsletter.',
            date: 'June 2025'
          }
        ]
      },
      {
        name: 'Manuals and Guidelines',
        id: 'manuals-guidelines',
        contents: []
      },
      {
        name: 'Policies and Strategies',
        id: 'policies-strategies',
        contents: [
          {
            name: 'Policy Framework 2025',
            link: '/downloads/policy-framework-2025.pdf',
            type: 'PDF',
            description: 'Framework for policy implementation in 2025.'
          },
          {
            name: 'Strategic Plan 2025',
            link: '/downloads/strategic-plan-2025.pdf',
            type: 'PDF',
            description: 'Strategic plan outlining goals and objectives for 2025.'
          }
        ]
      }
    ]
  },
  {
    name: 'Project Documents',
    subcategories: [
      {
        name: 'SSRLP',
        id: 'ssrlp',
        contents: [
          {
            name: 'SSRLP Report 2025',
            link: '/downloads/ssrlp-report-2025.pdf',
            type: 'PDF',
            description: 'SSRLP annual report for 2025.'
          },
          {
            name: 'SSRLP Guidelines',
            link: '/downloads/ssrlp-guidelines.pdf',
            type: 'PDF',
            description: 'Guidelines for SSRLP project implementation.'
          }
        ]
      },
      {
        name: 'GESD',
        id: 'gesd',
        contents: [
          {
            name: 'GESD Plan 2025',
            link: '/downloads/gesd-plan-2025.pdf',
            type: 'PDF',
            description: 'GESD strategic plan for 2025.'
          }
        ]
      },
      {
        name: 'RCRP 2',
        id: 'rcrp2',
        contents: [
          {
            name: 'RCRP Overview',
            link: '/downloads/rcrp-overview.pdf',
            type: 'PDF',
            description: 'Overview of the RCRP project.'
          },
          {
            name: 'RCRP Implementation Guide',
            link: '/downloads/rcrp-guide.pdf',
            type: 'PDF',
            description: 'Implementation guide for RCRP projects.'
          }
        ]
      }
    ]
  },
  {
    name: 'Reports',
    subcategories: [
      {
        name: 'Audit Reports',
        id: 'audit-reports',
        contents: [
          {
            name: 'Annual Report 2024',
            link: '/downloads/annual-report-2024.pdf',
            type: 'PDF',
            description: 'Comprehensive overview of 2024 activities.'
          },
          {
            name: 'Monthly Report - Jan 2025',
            link: '/downloads/monthly-report-jan2025.pdf',
            type: 'PDF',
            description: 'Highlights from January 2025 monthly report.'
          }
        ]
      },
      {
        name: 'Financial Reports',
        id: 'financial-reports',
        contents: [
          {
            name: 'Financial Report Q1 2025',
            link: '/downloads/financial-report-q1-2025.pdf',
            type: 'PDF',
            description: 'Financial overview for the first quarter of 2025.'
          },
          {
            name: 'Budget Report 2025',
            link: '/downloads/budget-report-2025.pdf',
            type: 'PDF',
            description: 'Detailed budget report for the year 2025.'
          }
        ]
      },
      {
        name: 'Financial statements',
        id: 'financial-statements',
        contents: [
          {
            name: 'Project Evaluation 2024',
            link: '/downloads/project-evaluation-2024.pdf',
            type: 'PDF',
            description: 'Evaluation of projects completed in 2024.'
          },
          {
            name: 'Mid-Year Evaluation 2025',
            link: '/downloads/mid-year-evaluation-2025.pdf',
            type: 'PDF',
            description: 'Mid-year evaluation report for 2025.'
          }
        ]
      },
      {
        name: 'LAPA Synthesis',
        id: 'lapa-synthesis',
        contents: [
          {
            name: 'Project Evaluation Report 2024',
            link: '/downloads/project-evaluation-2024.pdf',
            type: 'PDF',
            description: 'Evaluation report for projects completed in 2024.'
          },
          {
            name: 'Mid-Year Evaluation Report 2025',
            link: '/downloads/mid-year-evaluation-2025.pdf',
            type: 'PDF',
            description: 'Mid-year evaluation report for 2025.'
          }
        ]
      }
    ]
  },
  {
    name: 'Knowledge Management',
    subcategories: [
      {
        name: 'Image Gallery',
        id: 'image-gallery',
        contents: [
          {
            name: 'Community Event Photos',
            link: 'https://demo2.gov.mw/nlgfc-portal/public/?page=1',
            type: 'Gallery',
            description: 'Gallery showcasing community events, activities and projects.'
          }
        ]
      },
      {
        name: 'Video',
        id: 'video-library',
        contents: [
          {
            name: 'Phalombe District Council',
            link: 'https://www.youtube.com/watch?v=xfMlyumpENU',
            type: 'Video',
            description: 'GESD project overview in Phalombe District Council.'
          },
          {
            name: 'Nkhotakota District Council',
            link: 'https://www.youtube.com/watch?v=YTbn2duu4og',
            type: 'Video',
            description: 'GESD project overview in Nkhotakota District council.'
          },
          {
            name: 'Mmbelwa District Council',
            link: 'https://www.youtube.com/watch?v=YTbn2duu4og',
            type: 'Video',
            description: 'GESD project Impact in Mmbelwa District Council.'
          },
          {
            name: 'Scalable Safety Nets',
            link: 'https://www.youtube.com/watch?v=JY_A56sfnlU',
            type: 'Video',
            description: 'Scalable Safety Nets under SSRLP Tidzidalire project overview.'
          },
          {
            name: 'Ntchisi District Council',
            link: 'https://www.youtube.com/watch?v=MCQCw74_V-0',
            type: 'Video',
            description: 'GESD project Impact'
          }
        ]
      }
    ]
  }
]);

const expandedTab = ref(null);
const activeTab = ref(null);
const activeSub = ref(null);
const selectedImage = ref(null);
const iframeLoaded = ref(false);

// Function to handle query parameters and open specific tab/subcategory
function handleQueryParams() {
  const idParam = route.query.id;
  const tabParam = route.query.tab;
  const subParam = route.query.sub;

  // Handle ID-based routing (preferred)
  if (idParam && subcategoryIdMap[idParam]) {
    const mapping = subcategoryIdMap[idParam];
    const tabIndex = mapping.tab;
    const subIndex = mapping.sub;

    // Set the active tab and subcategory
    expandedTab.value = tabIndex;
    activeTab.value = tabIndex;
    activeSub.value = subIndex;
    return;
  }

  // Fallback to old tab/sub parameter system
  if (tabParam !== undefined && subParam !== undefined) {
    const tabIndex = parseInt(tabParam);
    const subIndex = parseInt(subParam);

    // Validate indices
    if (tabIndex >= 0 && tabIndex < tabs.value.length &&
        subIndex >= 0 && subIndex < tabs.value[tabIndex].subcategories.length) {

      // Set the active tab and subcategory
      expandedTab.value = tabIndex;
      activeTab.value = tabIndex;
      activeSub.value = subIndex;
    }
  }
}

// Watch for route changes to handle navigation
watch(() => route.query, (newQuery) => {
  handleQueryParams();
}, { immediate: true });

// Call on component mount
onMounted(() => {
  handleQueryParams();
});

function toggleTab(index) {
  expandedTab.value = expandedTab.value === index ? null : index;
  if (expandedTab.value === null) {
    activeTab.value = null;
    activeSub.value = null;
    // Clear query parameters when collapsing
    router.push({ query: {} });
  }
}

function selectSub(tabIndex, subIndex) {
  activeTab.value = tabIndex;
  activeSub.value = subIndex;
  // Reset iframe loaded state when switching subcategories
  iframeLoaded.value = false;

  // Get the ID for this tab/sub combination
  const subcategoryId = getIdFromTabSub(tabIndex, subIndex);

  // Update the URL with ID parameter (preferred) or fallback to tab/sub
  if (subcategoryId) {
    router.push({
      query: { id: subcategoryId }
    });
  } else {
    // Fallback to old system
    router.push({
      query: {
        tab: tabIndex,
        sub: subIndex
      }
    });
  }
}

function hideLoadingOverlay() {
  iframeLoaded.value = true;
}

function openImageModal(image) {
  selectedImage.value = image;
}

function closeImageModal() {
  selectedImage.value = null;
}

function getVideoEmbedUrl(url) {
  // Convert YouTube URLs to embed format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url; // Return original URL if not YouTube
}

const displayedDocuments = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return tabs.value[activeTab.value].subcategories[activeSub.value].contents || [];
  }
  return [];
});

const currentTitle = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return `${tabs.value[activeTab.value].name} - ${tabs.value[activeTab.value].subcategories[activeSub.value].name}`;
  }
  return '';
});

const currentSubcategoryType = computed(() => {
  if (activeTab.value !== null && activeSub.value !== null) {
    return tabs.value[activeTab.value].subcategories[activeSub.value].name;
  }
  return '';
});

</script>

<style scoped>
/* Grid item animations */
.grid-item-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.grid-item-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.grid-item-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.grid-item-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.grid-item-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.grid-item-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

/* Staggered animation delay */
.grid-item-enter-active:nth-child(1) { transition-delay: 0ms; }
.grid-item-enter-active:nth-child(2) { transition-delay: 100ms; }
.grid-item-enter-active:nth-child(3) { transition-delay: 200ms; }
.grid-item-enter-active:nth-child(4) { transition-delay: 300ms; }
.grid-item-enter-active:nth-child(5) { transition-delay: 400ms; }
.grid-item-enter-active:nth-child(6) { transition-delay: 500ms; }

/* Fade transition for loading state */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Modal animations */
.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Additional hover animations */
.group:hover {
  transform: translateY(-2px);
}

/* Smooth scale animations for cards */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced grid item animations with spring effect */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.grid-item-enter-active {
  animation: fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Responsive staggered delays */
@media (min-width: 768px) {
  .grid-item-enter-active:nth-child(7) { transition-delay: 600ms; }
  .grid-item-enter-active:nth-child(8) { transition-delay: 700ms; }
  .grid-item-enter-active:nth-child(9) { transition-delay: 800ms; }
  .grid-item-enter-active:nth-child(10) { transition-delay: 900ms; }
}

/* Pulse effect for loading state */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Iframe loading animation */
.iframe-loading {
  pointer-events: none;
}

/* Hide loading overlay after iframe loads */
iframe {
  background: white;
}

</style>
