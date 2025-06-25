<script setup>
    definePageMeta({
    title: 'About Us'
    })

    const route = useRoute()
    const activeTab = ref('mvc')
    const openSubMenu = ref(null)
    const imageError = ref(false)

    const handleImageError = () => {
    imageError.value = true;
    console.error("Organogram image failed to load");
    };

    // Board of Directors
    const board = {
    chairperson: {
        name: "Commissioner Richard Chapweteka",
        position: "Board Chairperson",
        image: "/images/board/CommissionerRichardChapwetekaBoardChairperson.png",
        reportsTo: null,
        subordinates: [
        "member1",
        "member2",
        "member3",
        "member4"
        ]
    },
    member1: {
        name: "Abel Mwambinga",
        position: "Board Member",
        image: "/images/board/Abel MwambingaBoardMember.png",
        reportsTo: "chairperson"
    },
    member2: {
        name: "Councilor Davie Maunde",
        position: "Board Member",
        image: "/images/board/CouncilorDavieMaundeBoardMember.png",
        reportsTo: "chairperson"
    },
    member3: {
        name: "Mary Mkwanda",
        position: "Board Member",
        image: "/images/board/MrsMaryMkwandaBoardMember.png",
        reportsTo: "chairperson"
    },
    member4: {
        name: "Lilian Khofi",
        position: "Board Member",
        image: "/images/board/Ms.LilianKhofiVice.png",
        reportsTo: "chairperson"
    }
    }

    // Executive Management
    const leadership = {
    executiveDirector: {
        name: "Kondwani Santhe (PhD)",
        position: "Executive Director",
        image: "/images/management/kondwani-santhe--ed.png",
        reportsTo: null,
        subordinates: [
        "directorInfrastructure",
        "directorFinance",
        "directorCorporate"
        ]
    },
    directorInfrastructure: {
        name: "Paul Chipeta",
        position: "Director of Social & Economic Development Services",
        image: "/images/management/directorEconomicDevelopment.png",
        reportsTo: "executiveDirector"
    },
    directorFinance: {
        name: "Linda Kapanda",
        position: "Director of Finance & Fiscal Decentralization",
        image: "/images/management/financeDirector.png",
        reportsTo: "executiveDirector"
    },
    directorCorporate: {
        name: "Stanley Chuthi",
        position: "Director of Administration & Corporate Services",
        image: "/images/management/directorCorporateServices.png",
        reportsTo: "executiveDirector"
    }
    }

    const menuItems = [
    { 
        items: [
        { id: 'mvc', title: 'Mission, Vision and Core Values' },
        { id: 'powers', title: 'Powers and Functions' },
        { id: 'board', title: 'Board of Directors' },
        { id: 'management', title: 'Executive Management' },
        // { id: 'structure', title: 'Organogram' },
        ]
    },
    { 
        items: [
        { 
            id: 'directorates', 
            title: 'Directorates and Divisions',
            subItems: [
            { id: 'finance', title: 'Finance & Fiscal Decentralization' },
            { id: 'corporate', title: 'Corporate & Strategic Services' },
            { id: 'social', title: 'Social & Economic Development Services' },
            { id: 'planning', title: 'Planning, M&E' },
            { id: 'procurement', title: 'Procurement' },
            { id: 'audit', title: 'Internal Audit' }
            ]
        }
        ]
    }
    ]

    const isActive = (tabId) => {
    return activeTab.value === tabId
    }
    onMounted(() => {
    if (route.hash) {
        updateActiveTabFromHash(route.hash.replace('#', ''))
    } else {
        // Set default tab if no hash is present
        activeTab.value = 'mvc'
    }
    })

    watch(() => route.hash, (hash) => {
    if (hash) {
        updateActiveTabFromHash(hash.replace('#', ''))
    }
    })

function updateActiveTabFromHash(hash) {
  for (const group of menuItems) {
    for (const item of group.items) {
      if (item.id === hash) {
        if (!item.subItems) {
          activeTab.value = item.id;
        } else {
          // For parent items, just open the menu but don't change tab
          openSubMenu.value = item.id;
        }
        return;
      }
      if (item.subItems) {
        const match = item.subItems.find(sub => sub.id === hash);
        if (match) {
          activeTab.value = match.id;
          openSubMenu.value = item.id; // Open the parent menu
          return;
        }
      }
    }
  }
}
// Organogram image zoom and download
const zoom = ref(100);
const imageLoaded = ref(false);

const zoomIn = () => {
  if (zoom.value < 200) zoom.value += 25;
};

const zoomOut = () => {
  if (zoom.value > 50) zoom.value -= 25;
};

const downloadImage = () => {
  const link = document.createElement('a');
  link.href = '/images/samples/organo.png';
  link.download = 'organogram.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

</script>

<template>
  <div class="min-h-[calc(100vh-120px)] bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Sidebar Navigation -->
      <nav class="w-full md:w-64 flex-shrink-0 border-r border-gray-200 pr-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">About NLGFC</h2>

        <div class="space-y-6">
            <div v-for="(group, groupIndex) in menuItems" :key="groupIndex">
            <ul class="space-y-1">
                <li v-for="item in group.items" :key="item.id">
                <NuxtLink
                    :to="`#${item.id}`"
                    @click="activeTab = item.id"
                    class="flex items-center justify-between px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                    :class="{
                    'bg-blue-50 text-gray-800 font-medium border-l-4 border-blue-500': activeTab === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeTab))
                    }"
                >
                    <span>{{ item.title }}</span>
                    <svg 
                    v-if="item.subItems" 
                    class="w-4 h-4 ml-2 transition-transform duration-200"
                    :class="{ 'rotate-90': openSubMenu === item.id }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>

                <ul 
                    v-if="item.subItems"
                    class="ml-4 pl-4 border-l border-gray-300 space-y-1 mt-1"
                    :class="{ 'hidden': openSubMenu !== item.id }"
                >
                    <li v-for="subItem in item.subItems" :key="subItem.id">
                    <NuxtLink
                        :to="`#${subItem.id}`"
                        @click="activeTab = subItem.id"
                        class="block px-3 py-2 rounded text-gray-600 hover:bg-blue-50 hover:text-gray-800 text-sm"
                        :class="{
                        'bg-blue-100 text-blue-800 font-medium border-l-2 border-blue-500': activeTab === subItem.id
                        }"
                    >
                        {{ subItem.title }}
                    </NuxtLink>
                    </li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
      </nav>
      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <!-- Mission, Vision, Core Values -->
        <div v-show="activeTab === 'mvc'" class="prose max-w-none">
            <!-- Mission Section -->
            <div class="bg-white rounded-xl shadow-sm p-8 mb-10 border border-gray-100">
                <div class="flex items-start mb-6">
                    <div class="bg-blue-100 p-3 rounded-lg mr-6">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
                        <p class="text-gray-700 text-lg leading-relaxed">
                            To provide efficient and effective technical, financial and economic management services for mobilization, 
                            distribution and utilization of resources for quality service delivery by Local Governments
                        </p>
                    </div>
                </div>
            </div>

            <!-- Vision Section -->
            <div class="bg-white rounded-xl shadow-sm p-8 mb-10 border border-gray-100">
                <div class="flex items-start">
                    <div class="bg-purple-100 p-3 rounded-lg mr-6">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
                        <p class="text-gray-700 text-lg leading-relaxed">
                            Delivering effective and responsive financing for Local Governments
                        </p>
                    </div>
                </div>
            </div>

            <!-- Core Values Section -->
            <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <div class="flex items-start mb-6">
                    <div class="bg-green-100 p-3 rounded-lg mr-6">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Our Core Values</h2>
                        <p class="text-gray-600">
                            The fundamental beliefs that guide our actions and decisions
                        </p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Professionalism -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Professionalism</h3>
                                <p class="text-gray-700 text-sm">Integrity, ethical and impartial conduct in all our operations.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Corruption-free -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Corruption and fraud-free</h3>
                                <p class="text-gray-700 text-sm">Upholding high moral standards in all our dealings.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Transparent and accountable -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Transparent and accountable</h3>
                                <p class="text-gray-700 text-sm">Maintaining openness and responsibility in all operations.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Innovation and learning -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Innovation and learning</h3>
                                <p class="text-gray-700 text-sm">Staying relevant in a changing environment through continuous improvement.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Customer focused -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Customer focused</h3>
                                <p class="text-gray-700 text-sm">Demand driven, equality and responsive to stakeholder needs.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Teamwork -->
                    <div class="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 mb-1">Teamwork</h3>
                                <p class="text-gray-700 text-sm">Unity of purpose and synergy in achieving our goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="activeTab === 'powers'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Powers and Functions of NLGFC
                </h2>
                <p class="text-lg text-gray-600">
                    Constitutional mandates and operational responsibilities under Malawi law
                </p>
            </div>

            <!-- Powers Section -->
            <div class="mb-14">
                <div class="flex items-start mb-6">
                    <div class="bg-blue-100 p-3 rounded-lg mr-5">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Constitutional Powers</h3>
                        <p class="text-gray-700 mb-6">
                            The National Local Government Finance Committee (NLGFC) was established by the constitution of the Republic of Malawi (Section 149 of 1994) and it assumes other powers and functions as conferred on it by the Local Government Act (1998).
                        </p>
                    </div>
                </div>

                <div class="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                    <ul class="space-y-4">
                        <li class="flex items-start text-gray-700">
                            <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>
                                <span class="font-medium text-gray-800">Receive estimates and budgets:</span> Receive all estimates of revenue and all projected budgets of all local government authorities
                            </span>
                        </li>
                        <li class="flex items-start text-gray-700">
                            <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>
                                <span class="font-medium text-gray-800">Supervise and audit accounts:</span> Supervise and audit accounts of local government authorities, in accordance with any Act of Parliament, Assembly, subject to the recommendations of the Auditor General
                            </span>
                        </li>
                        <li class="flex items-start text-gray-700">
                            <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>
                                <span class="font-medium text-gray-800">Fund distribution:</span> Make recommendations relating to the distribution of funds allocated to local government authorities, and vary the amount payable from time to time and area to area according to, and with sole consideration of, economic, geographic and demographic variables
                            </span>
                        </li>
                        <li class="flex items-start text-gray-700">
                            <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>
                                <span class="font-medium text-gray-800">Consolidated budget preparation:</span> Prepare a consolidated budget for all local government authorities and estimates after consultation with the Treasury, which shall be presented to the National Assembly by the Minister responsible for Local Government before the commencement of each financial year
                            </span>
                        </li>
                        <li class="flex items-start text-gray-700">
                            <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>
                                <span class="font-medium text-gray-800">Supplementary funds:</span> Make application to that Minister for supplementary funds where necessary
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Functions Section -->
            <div>
                <div class="flex items-start mb-6">
                    <div class="bg-blue-100 p-3 rounded-lg mr-5">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Operational Functions</h3>
                        <p class="text-gray-700 mb-6">
                            The NLGFC carries out its mandate through these core functions:
                        </p>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Function 1 -->
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">Financial Governance</h4>
                                <p class="text-gray-700">
                                    Ensure transparency, accountability, reporting and good governance of public funds in Local Authorities as enshrined in:
                                </p>
                                <div class="mt-3 flex flex-wrap gap-2">
                                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Public Finance Management Act 2022</span>
                                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Public Audit Act 2017</span>
                                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Public Procurement and Disposal of Assets Act 2017</span>
                                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Compliance and Practices Act 2003</span>
                                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Local Government Act 1998</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Function 2 -->
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">Resource Mobilization</h4>
                                <p class="text-gray-700">
                                    Mobilise financial resources for other recurrent transactions and development from government and development partners for allocation and disbursement to Local Authorities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Board of Directors Content -->
        <div v-show="activeTab === 'board'" class="prose max-w-none">
          
          <div class="space-y-4">
                <div class="board-page">
                   
                    <!-- Top Level - Board Chair -->
                    <div class="org-level top-level">
                    <div class="board-card">
                        <div class="board-image">
                        <img :src="board.chairperson.image" :alt="board.chairperson.name">
                        </div>
                        <h2>{{ board.chairperson.name }}</h2>
                        <p class="position">{{ board.chairperson.position }}</p>
                    </div>
                    </div>
                    
                    <!-- Connecting lines -->
                    <div class="connector-container">
                    <div class="connector-line"></div>
                    </div>
                    
                    <!-- Second Level - Board Members -->
                    <div class="org-level middle-level">
                    <div 
                        v-for="(id, index) in board.chairperson.subordinates" 
                        :key="index" 
                        class="board-card"
                    >
                        <div class="board-image">
                        <img :src="board[id].image" :alt="board[id].name">
                        </div>
                        <h3>{{ board[id].name }}</h3>
                        <p class="position">{{ board[id].position }}</p>
                    </div>
                    </div>
                </div>
          </div>
        </div>
        <!-- Executive Management Content -->
        <div v-show="activeTab === 'management'" class="prose max-w-none">

            <div class="space-y-4">
                <div class="executive-page">
                    
                    <!-- Top Level - Executive Director -->
                    <div class="org-level top-level">
                        <div class="executive-card">
                            <div class="executive-image">
                            <img :src="leadership.executiveDirector.image" :alt="leadership.executiveDirector.name">
                            </div>
                            <h2>{{ leadership.executiveDirector.name }}</h2>
                            <p class="position">{{ leadership.executiveDirector.position }}</p>
                        </div>
                    </div>
                    
                    <!-- Connecting line -->
                    <div class="connector">
                    </div>
                    
                    <!-- Second Level - Directors -->
                    <div class="org-level middle-level">
                        <div 
                            v-for="(id, index) in leadership.executiveDirector.subordinates" 
                            :key="index" 
                            class="executive-card">
                            <div class="executive-image">
                            <img :src="leadership[id].image" :alt="leadership[id].name">
                            </div>
                            <h3>{{ leadership[id].name }}</h3>
                            <p class="position">{{ leadership[id].position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Finance Directorate Content -->
        <div v-show="activeTab === 'finance'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Directorate of Finance and Fiscal Decentralization
                </h2>
                <p class="text-lg text-gray-600">
                    The Directorate is headed by the Director Finance and Fiscal Decentralisation and its key functions include managing and accounting for local authorities (LAs) financial resources, monitoring and regulating finance utilization, promoting effective LAs budgeting and fiscal decentralization.
                </p>
            </div>

            <!-- Key Functions Section -->
            <div class="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
                <div class="flex items-start mb-2">
                    <div class="bg-blue-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Functions</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Managing and accounting for local authorities (LAs) financial resources</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Monitoring and regulating finance utilization</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Promoting effective LAs budgeting and fiscal decentralization</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Disbursing and accounting for LA financial resources</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Monitoring LGA financial regulations, procedures, systems and controls</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Divisions Section -->
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Divisions
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Accounts Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Accounts and Disbursement Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Manages LGA budget coordination, financial disbursement, and accounting.</p>
                        </div>
                    </div>
                    
                    <!-- Budgeting Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Budgeting and Fiscal Decentralization Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Oversees LGA budgeting and promotes fiscal decentralization.</p>
                        </div>
                    </div>
                    
                    <!-- Financial Regulation Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow md:col-span-2">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Financial Regulation, Compliance and Reporting Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Ensures compliance with financial standards, supports audits, and consolidates LGA reports.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Corporate Services Directorate Content -->
        <div v-show="activeTab === 'corporate'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Directorate of Corporate and Strategic Services
                </h2>
                <p class="text-lg text-gray-600">
                    The Directorate is headed by Directorate of Administration and Corporate Services. The directorate is responsible for providing corporate services and strategic institutional support.
                </p>
            </div>

            <!-- Divisions Section -->
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Divisions and Sections
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- HR Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Human Resource and Administrative Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Handles HR functions like recruitment, payroll, records, and office administration.</p>
                        </div>
                    </div>
                    
                    <!-- ICT Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">ICT Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Manages IT infrastructure, Malawi Social Registry database, and supports digital systems like Nthandizi-MIS and LGA-IFMIS.</p>
                        </div>
                    </div>
                    
                    <!-- Knowledge Management Section -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Knowledge Management and Communication Section</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700">Manages communication, public relations, documentation, and knowledge systems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Social and Economic Development Services Directorate Content -->
        <div v-show="activeTab === 'social'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Directorate of Social and Economic Development Services
                </h2>
                <p class="text-lg text-gray-600">
                    Director of Social and Economic Services is the head of this directorate and its key function is to support local economic development and social transformation interventions in LAs in Malawi.
                </p>
            </div>

            <!-- Divisions Section -->
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Divisions
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Infrastructure Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Infrastructure and Community Development Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700 mb-4">Monitors and supports infrastructure, enterprise, and community-driven development programs.</p>
                        </div>
                    </div>
                    
                    <!-- Capacity Development Division -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Capacity Development and Environment Division</h4>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-700 mb-4">Oversees capacity development in LGAs and manages environmental and social safeguards.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Planning, Monitoring and Evaluation Division Content -->
        <div v-show="activeTab === 'planning'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Planning, Monitoring and Evaluation Division
                </h2>
                <p class="text-lg text-gray-600">
                    A standalone division headed by the Planning, Monitoring and Evaluation Manager that directly reports to the Executive Director.
                </p>
            </div>

            <!-- Key Functions Section -->
            <div class="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
                <div class="flex items-start mb-2">
                    <div class="bg-blue-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Functions</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Provide technical support for strategic planning, monitoring, and evaluation</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Lead institutional planning and policy review processes</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Manage organizational data systems and reporting</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Conduct research and analysis to inform decision-making</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Oversee monitoring and evaluation framework implementation</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Coordinate performance reporting across the organization</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Responsibilities Section -->
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Core Responsibilities
                </h3>
                
                <div class="grid md:grid-cols-1 gap-6">
                    <!-- Main Responsibility Card -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Technical Support & Organizational Leadership</h4>
                        </div>
                        <div class="p-6">
                            <ul class="space-y-3 text-gray-700">
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Provides technical support for strategic planning, monitoring, and evaluation across the organization</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Leads institutional planning and policy review initiatives</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Manages organizational data systems and research activities</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Oversees monitoring and evaluation framework implementation</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Coordinates performance reporting to executive leadership</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Procurement and Assets Disposal Division Content -->
        <div v-show="activeTab === 'procurement'" class="prose max-w-none">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                    Procurement and Assets Disposal Division
                </h2>
                <p class="text-lg text-gray-600">
                    A standalone division headed by the Procurement Manager that directly reports to the Executive Director.
                </p>
            </div>

            <!-- Key Functions Section -->
            <div class="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
                <div class="flex items-start mb-2">
                    <div class="bg-blue-100 p-2 rounded-lg mr-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Functions</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Manage procurement of goods, works, and services</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Oversee asset disposal processes</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Handle procurement contract management</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Provide procurement support to Local Authorities (LAs)</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Ensure compliance with procurement regulations</span>
                            </li>
                            <li class="flex items-start">
                                <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span class="text-gray-700">Maintain procurement records and documentation</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Core Operations Section -->
            <div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Core Operations
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Procurement Card -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Procurement Management</h4>
                        </div>
                        <div class="p-6">
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>End-to-end procurement processes for goods and services</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Works procurement and contractor management</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Tendering and bidding processes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Assets Disposal Card -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Assets Management</h4>
                        </div>
                        <div class="p-6">
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Asset disposal planning and execution</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Inventory and asset register management</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Asset valuation and condition assessment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Support Services Card -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow md:col-span-2">
                        <div class="bg-gray-700 px-6 py-4">
                            <h4 class="font-semibold text-white">Support Services</h4>
                        </div>
                        <div class="p-6">
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Procurement contract administration and management</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Technical support to Local Authorities on procurement matters</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Capacity building for procurement staff</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Internal Audit and Risk Division Content -->
        <div v-show="activeTab === 'audit'" class="prose max-w-none">
        <!-- Header Section -->
        <div class="mb-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
            Internal Audit and Risk Division
        </h2>
        <p class="text-lg text-gray-600">
            Provides internal audit and risk management services headed by the Internal Audit and Risk Manager.
        </p>
        </div>

        <!-- Key Functions Section -->
        <div class="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
        <div class="flex items-start mb-2">
            <div class="bg-blue-100 p-2 rounded-lg mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Functions</h3>
                <ul class="space-y-3">
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Conduct comprehensive internal audits</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Investigate fraud and financial irregularities</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Evaluate resource utilization and efficiency</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Assess organizational risks and controls</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Coordinate external audit processes</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mt-1 mr-3 text-blue-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Support Local Authorities on audit and risk matters</span>
                    </li>
                </ul>
            </div>
        </div>
        </div>

        <!-- Core Responsibilities Section -->
        <div>
        <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Core Responsibilities
        </h3>

        <div class="grid md:grid-cols-2 gap-6">
            <!-- Audit Services Card -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div class="bg-gray-700 px-6 py-4">
                    <h4 class="font-semibold text-white">Audit Services</h4>
                </div>
                <div class="p-6">
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Conduct financial and operational audits</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Investigate suspected fraud cases</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Evaluate compliance with policies and regulations</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Risk Management Card -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div class="bg-gray-700 px-6 py-4">
                    <h4 class="font-semibold text-white">Risk Management</h4>
                </div>
                <div class="p-6">
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Identify and assess organizational risks</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Develop risk mitigation strategies</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Monitor control effectiveness</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Coordination & Support Card -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow md:col-span-2">
                <div class="bg-gray-700 px-6 py-4">
                    <h4 class="font-semibold text-white">Coordination & Support</h4>
                </div>
                <div class="p-6">
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Coordinate external audit processes for NLGFC</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Provide audit and risk support to Local Authorities</span>
                        </li>
                        <li class="flex items-start">
                            <span class="flex-shrink-0 mt-1 mr-2 text-blue-500">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Facilitate audit follow-up and corrective actions</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
        </div>
        <!-- Organogram Section -->
        <div v-show="activeTab === 'structure' || activeTab === 'directorates'" class="prose max-w-none">
            <div class="mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-3 pb-3 border-b-2 border-blue-100">
                Directorates and Divisions
                </h2>
                <p class="text-lg text-gray-600">
                Organizational structure and functional relationships within NLGFC
                </p>
            </div>

            <!-- Organogram Container with Enhanced Features -->
             <div class="bg-white rounded-lg shadow border border-gray-200">
    <!-- Controls -->
    <div class="flex justify-between items-center p-3 border-b border-gray-200">
      <div class="flex space-x-2">
        <!-- Zoom Controls -->
        <div class="flex items-center space-x-1 bg-gray-100 rounded-md px-2">
          <button 
            @click="zoomOut" 
            :disabled="zoom <= 50"
            class="p-1 text-gray-700 disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <span class="text-sm">{{ zoom }}%</span>
          <button 
            @click="zoomIn" 
            :disabled="zoom >= 200"
            class="p-1 text-gray-700 disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Download Button -->
      <button 
        @click="downloadImage"
        class="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="text-sm">Download</span>
      </button>
    </div>
    
    <!-- Image Container -->
    <div class="relative overflow-hidden h-96">
      <div 
        class="absolute inset-0 flex items-center justify-center transition-transform duration-200"
        :style="{ transform: `scale(${zoom/100})`, transformOrigin: 'center' }"
      >
        <img 
          src="/images/samples/organo.png" 
          alt="Organogram"
          class="max-w-full max-h-full object-contain"
          @load="imageLoaded = true"
        >
      </div>
      
      <!-- Loading State -->
      <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
        </div>




      </main>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: calc(100vh - 120px);
}

.prose {
  max-width: 800px;
  margin: 0 auto;
}

/* Sidebar group styling */
nav .space-y-6 > div {
  margin-bottom: 1.5rem;
}

nav h3 {
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}

/*Board of DIRECTOS */
.board-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-size: 2rem;
}

.org-level {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.top-level {
  margin-bottom: 1rem;
}

.middle-level {
  margin-top: 1rem;
}

.board-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.top-level .board-card {
  background: #f8f9fa;
  border-top: 4px solid #2c3e50;
  width: 220px;
}

.position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.board-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
}

.top-level .board-image {
  width: 110px;
  height: 110px;
}

.board-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.connector-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.connector-line {
  height: 30px;
  width: 80%;
  max-width: 800px;
  border-bottom: 2px solid #ddd;
}

@media (max-width: 768px) {
  .org-level {
    gap: 1rem;
  }
  
  .board-card {
    width: 160px;
    padding: 1rem;
  }
  
  .top-level .board-card {
    width: 180px;
  }
  
  .board-image {
    width: 80px;
    height: 80px;
  }
  
  .top-level .board-image {
    width: 90px;
    height: 90px;
  }
  
  .connector-line {
    width: 60%;
  }
}

@media (max-width: 480px) {
  .org-level {
    flex-direction: column;
    align-items: center;
  }
  
  .board-card {
    width: 100%;
    max-width: 250px;
  }
  
  .connector-line {
    height: 20px;
    width: 2px;
    border-bottom: none;
    border-left: 2px solid #ddd;
  }
}

/* Executive Management Styles */
.executive-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.org-level {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.top-level {
  margin-bottom: 1rem;
}

.middle-level {
  margin-top: 1rem;
}

.executive-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 250px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.top-level .executive-card {
  background: #f8f9fa;
  border-top: 4px solid #e74c3c;
}

.position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

.connector {
  height: 40px;
  width: 2px;
  background: #ddd;
  margin: 0 auto;
}

.executive-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
}

.executive-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .org-level {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .connector {
    height: 20px;
  }
  
  .executive-card {
    width: 100%;
    max-width: 300px;
  }
}


</style>