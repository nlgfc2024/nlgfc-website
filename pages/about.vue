<script setup>
definePageMeta({
  title: 'About NLGFC'
})

const activeTab = ref('mission') // Default active tab
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
      { id: 'directorates', title: 'Directorates and Divisions' }
     
    ]
  },

]

// Set active tab from route hash if present
onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '')
    const exists = menuItems.some(group => 
      group.items.some(item => item.id === hash)
    )
    if (exists) {
      activeTab.value = hash
    }
  }
})
</script>

<template>
  <div class="about-page bg-white">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-6xl">
      <!-- Government-style Sidebar -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="border-r border-gray-200 pr-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2 border-l-4 border-gray-600">About NLGFC</h2>
          <div class="space-y-6">
            <div v-for="(group, groupIndex) in menuItems" :key="groupIndex">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pl-2">
                {{ group.title }}
              </h3>
              <ul class="space-y-1">
                <li v-for="item in group.items" :key="item.id">
                  <NuxtLink
                    :to="`#${item.id}`"
                    @click="activeTab = item.id"
                    class="block px-4 py-3 rounded transition-colors text-gray-700 hover:bg-blue-50 hover:text-gray-800"
                    :class="{
                      'bg-blue-50 text-gray-800 font-medium border-l-4 border-gray-600': activeTab === item.id
                    }"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
        <!-- Mission Content -->
        <div v-show="activeTab === 'mvc'" class="prose max-w-none">
            <!-- Header Section -->
            
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

                <div class="bg-blue-50/50 p-6 rounded-lg border border-blue-100 mt-6">
                    <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Strategic Priorities
                    </h3>
                    <ul class="space-y-3 pl-2">
                        <li class="flex items-start">
                        <span class="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-3 mt-0.5 flex-shrink-0">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Enhance public service delivery through digital transformation</span>
                        </li>
                        <li class="flex items-start">
                        <span class="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-3 mt-0.5 flex-shrink-0">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span class="text-gray-700">Promote accountability and transparency in all operations</span>
                        </li>
                    </ul>
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
                    To be a model government agency recognized for excellence in public service and innovative governance solutions.
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
                <div class="bg-gray-50/50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
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
                <div class="bg-gray-50/50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                    <div class="flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-1">Corruption and fraud-free</h3>
                        <p class="text-gray-700 text-sm">We uphold the highest moral standards in all our dealings.</p>
                    </div>
                    </div>
                </div>

                <!-- Transparency -->
                <div class="bg-gray-50/50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                    <div class="flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-1">Transparent and accountable</h3>
                        <p class="text-gray-700 text-sm">Openness in all our processes and responsible for our actions.</p>
                    </div>
                    </div>
                </div>

                <!-- Innovation -->
                <div class="bg-gray-50/50 p-5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                    <div class="flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 mb-1">Innovation and learning</h3>
                        <p class="text-gray-700 text-sm">Continuously improving and adapting to changing environments.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- Powers and Functions Content -->
        <div v-show="activeTab === 'powers'" class="prose max-w-none">

          <div class="space-y-4">
            <p class="text-gray-700 leading-relaxed">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Powers of NLGFC</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            The National Local Government Finance Committee (NLGFC) was established by the constitution of the Republic of Malawi (Section 149 of 1994) and it assumes other powers and functions as conferred on it by the Local Government Act (1998). As enshrined in the constitution of the Republic of Malawi, NLGFC has powers to:
          </p>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
            <ol class="space-y-4 list-decimal pl-5">
              <li class="text-gray-700">
                Receive all estimates of revenue and all projected budgets of all local government authorities;
              </li>
              <li class="text-gray-700">
                Supervise and audit accounts of local government authorities, in accordance with any Act of Parliament, Assembly, subject to the recommendations of the Auditor General;
              </li>
              <li class="text-gray-700">
                Make recommendations relating to the distribution of funds allocated to local government authorities, and vary the amount payable from time to time and area to area according to, and with sole consideration of, economic, geographic and demographic variables;
              </li>
              <li class="text-gray-700">
                Prepare a consolidated budget for all local government authorities and estimates after consultation with the Treasury, which shall be presented to the National Assembly by the Minister responsible for Local Government before the commencement of each financial year; and
              </li>
              <li class="text-gray-700">
                Make application to that Minister for supplementary funds where necessary.
              </li>
            </ol>
          </div>
            </p>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Functions of NLGFC</h2>

          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-700">
                  Ensure transparency, accountability, reporting and good governance of public funds in LAs as enshrined in the Public Finance Management Act 2022, Public Audit Act, 2017, Public Procurement and Disposal of Assets Act 2017, Compliance and Practices Act 2003 and the Local Government Act of 1998.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-700">
                  Mobilise financial resources for other recurrent transactions and development from government and development partners for allocation and disbursement to LAs.
                </p>
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
                <div class="connector"></div>
                
                <!-- Second Level - Directors -->
                <div class="org-level middle-level">
                <div 
                    v-for="(id, index) in leadership.executiveDirector.subordinates" 
                    :key="index" 
                    class="executive-card"
                >
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

        <!-- Directorates and Divisions Content -->
        <div v-show="activeTab === 'directorates'" class="prose max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Directorates and Divisions</h2>
          <div class="space-y-4">
           <h2 class="text-lg font-semibold text-gray-900 mb-4 pl-2">Organizational Structure</h2>
       
             <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Directorate of Finance and Fiscal Decentralization
          </h2>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Functions</h3>
              <ul class="space-y-3 list-disc pl-5">
                <li>Managing and accounting for local authorities (LAs) financial resources</li>
                <li>Monitoring and regulating finance utilization</li>
                <li>Promoting effective LAs budgeting and fiscal decentralization</li>
                <li>Disbursing and accounting for LA financial resources</li>
                <li>Monitoring LGA financial regulations, procedures, systems and controls</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Divisions</h3>
              
              <div class="space-y-6">
                <!-- Accounts Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Accounts and Disbursement Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Manages LGA budget coordination, financial disbursement, and accounting.</p>
                  </div>
                </div>
                
                <!-- Budgeting Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Budgeting and Fiscal Decentralization Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Oversees LGA budgeting and promotes fiscal decentralization.</p>
                  </div>
                </div>
                
                <!-- Financial Regulation Division -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h4 class="font-medium text-gray-900">Financial Regulation, Compliance and Reporting Division</h4>
                  </div>
                  <div class="p-6">
                    <p>Ensures compliance with financial standards, supports audits, and consolidates LGA reports.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
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