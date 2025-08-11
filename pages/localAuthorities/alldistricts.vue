<script setup>
definePageMeta({
    title: 'For all local authorities' 
})

// Reactive variables
const selectedDistrict = ref('')
const selectedRegion = ref('')
const showRegionFilter = ref(false)
const activeContent = ref([])
const isLoading = ref(false)
const transitionName = ref('fade')

// Computed property to filter districts by region
const filteredDistricts = computed(() => {
    if (!selectedRegion.value) return districts
    return districts.filter(district => district.region === selectedRegion.value)
})

// Unique regions for the region filter
const regions = ['Northern', 'Central', 'Southern']

// Computed property to get selected district details
const selectedDistrictDetails = computed(() => {
    if (!selectedDistrict.value) return null
    return districts.find(district => district.name === selectedDistrict.value)
})

// Popular districts for quick access
const popularDistricts = [
    { name: 'Lilongwe' },
    { name: 'Blantyre' },
    { name: 'Mzuzu' },
    { name: 'Zomba' },
    { name: 'Kasungu' },
    { name: 'Mangochi' }
]

// Method to handle projects click
const handleProjectsClick = async (e) => {
    e.preventDefault();
    transitionName.value = 'slide-left'
    isLoading.value = true
    
    try {
        await navigateTo(`/localAuthorities/${selectedDistrictDetails.value.pageSlug}?tab=projects`);
    } catch (error) {
        console.error('Error navigating to projects:', error);
    } finally {
        isLoading.value = false
    }
};

// Method to handle news click
const handleNewsClick = async (e) => {
    e.preventDefault();
    transitionName.value = 'slide-left'
    isLoading.value = true
    
    try {
        await navigateTo(`/localAuthorities/${selectedDistrictDetails.value.pageSlug}?tab=news`);
    } catch (error) {
        console.error('Error navigating to news:', error);
    } finally {
        isLoading.value = false
    }
};

// Method to generate district URL
const getDistrictUrl = (pageSlug) => {
    return `/localAuthorities/${pageSlug}`
}

// Method to handle district link click
const handleDistrictLinkClick = async (district) => {
    transitionName.value = 'slide-left'
    isLoading.value = true
    console.log('Navigating to:', getDistrictUrl(district.pageSlug))
    await navigateTo(getDistrictUrl(district.pageSlug))
    isLoading.value = false
}

// Method to clear filters
const clearFilters = () => {
    transitionName.value = 'fade'
    selectedDistrict.value = ''
    selectedRegion.value = ''
}

// Method to select popular district
const selectPopularDistrict = (districtName) => {
    transitionName.value = 'slide-up'
    selectedDistrict.value = districtName
}


   

// All 28 districts in Malawi organized by region with detailed information
const districts = [
    // Northern Region
    { 
        name: 'Chitipa', 
        region: 'Northern',
        capital: 'Chitipa',
        population: '234,927',
        area: '4,288 km²',
        description: 'Chitipa is located in the far north of Malawi, bordering Tanzania and Zambia.',
        slug: '',
        pageSlug: 'chitipaDistrict'
    },
    { 
        name: 'Karonga', 
        region: 'Northern',
        capital: 'Karonga',
        population: '365,028',
        Phone:'(+265) 1 362 222',
        email:'karongadc@gov.mw',
        PrivateBag:'35',
        area: '3,355 km²',
        description: 'Karonga is known for its rich archaeological sites and borders Lake Malawi.',
        slug: 'karonga',
        pageSlug: 'karongaDistrict'
    },
    { 
        name: 'Likoma', 
        region: 'Northern',
        capital: 'Likoma',
        population: '14,527',
        Phone:'(+265)999313084',
        email:'abunkhoma@gmail.com',
        PrivateBag:'77',
        area: '18 km²',
        description: 'Likoma is an island district in Lake Malawi, known for its cathedral and beaches.',
        slug: 'likoma',
        pageSlug: 'likomaDistrict'
    },
    { 
        name: 'Mmbelwa', 
        region: 'Northern',
        capital: 'Mzuzu',
        population: '700,806',
        Phone:'+265 (1) 342 255',
        email:'dcmzimbay@globemw.net / rodgers.newa@gmail.com',
        PrivateBag:'132',
        area: '10,430 km²',
        description: 'Mzimba is the largest district in the Northern Region and includes Mzuzu city.',
        slug: 'mmbelwa',
        pageSlug: 'mmbelwaDistrict'
    },
    { 
        name: 'Nkhata Bay', 
        region: 'Northern',
        capital: 'Nkhata Bay',
        population: '164,761',
        Phone:'(+265) 888 861 237 / 999 40 06 31',
        email:'davidkgondwe@gmail.com',
        PrivateBag:'1',
        area: '4,071 km²',
        description: 'Nkhata Bay is famous for its scenic lakeshore and tourism activities.',
        slug: 'nkhata-bay',
        pageSlug: 'nkhatabayDistrict'
    },
    { 
        name: 'Rumphi', 
        region: 'Northern',
        capital: 'Rumphi',
        population: '169,112',
        Phone:'(+265)999957881',
        email:'rumphidistrictcouncil@gmail.com',
        PrivateBag:'224',
        area: '4,769 km²',
        description: 'Rumphi is known for its mountainous terrain and the Nyika National Park.',
        slug: 'rumphi',
        pageSlug: 'rumphiDistrict'
    },
    
    // Central Region
    { 
        name: 'Dedza', 
        region: 'Central',
        capital: 'Dedza',
        population: '830,512',
        Phone:'(+265) 999 312 700/993 435 219',
        email:'dedzadc@gmail.com',
        PrivateBag:'140',
        area: '3,624 km²',
        description: 'Dedza is known for pottery and borders Mozambique.',
        slug: 'dedza',
        pageSlug: 'dedzaDistrict'
    },
    { 
        name: 'Dowa', 
        region: 'Central',
        capital: 'Dowa',
        population: '411,387',
        area: '3,041 km²',
        description: 'Dowa is an agricultural district known for tobacco farming.',
        slug: 'dowa',
        pageSlug: 'dowaDistrict'
    },
    { 
        name: 'Kasungu', 
        region: 'Central',
        capital: 'Kasungu',
        population: '842,953',
        Phone:'(+265) 888 201 790',
        email:'kasungu@kasungudc.gov.mw',
        PrivateBag:'1',
        area: '7,878 km²',
        description: 'Kasungu is home to Kasungu National Park and is an agricultural hub.',
        slug: 'kasungu',
        pageSlug: 'kasunguDistrict'
    },
    { 
        name: 'Lilongwe city', 
        region: 'Central',
        capital: 'Lilongwe',
        population: '2,395,454',
        Phone:'(+265)888308225 / 995625207',
        email:'info@lilongwedc.gov',
        PrivateBag:'93',
        area: '6,159 km²',
        description: 'Lilongwe is the capital city of Malawi and the largest urban center.',
        slug: 'https://lcc.mw/',
        pageSlug: 'lilongwecitycouncil'
   
    },
    { 
        name: 'Lilongwe', 
        region: 'Central',
        capital: 'Lilongwe',
        population: '2,395,454',
        Phone:'(+265)888308225 / 995625207',
        email:'info@lilongwedc.gov',
        PrivateBag:'93',
        area: '6,159 km²',
        description: 'Lilongwe is the capital city of Malawi and the largest urban center.',
        slug: '',
        pageSlug: 'lilongweDistrict'
   
    },
    { 
        name: 'Mchinji', 
        region: 'Central',
        capital: 'Mchinji',
        population: '602,305',
        Phone:'(+265)(1)242901/306/882400305/999947168',
        email:'mchinjidc@gmail.com',
        PrivateBag:'1',
        area: '3,356 km²',
        description: 'Mchinji borders Zambia and is a major cross-border trade center.',
        slug: 'mchinji',
        pageSlug: 'mchinjiDistrict'
    },
    { 
        name: 'Nkhotakota', 
        region: 'Central',
        capital: 'Nkhotakota',
        population: '395,897',
        Phone:'(+265) 992 999 223 / 999 278 385',
        email:'nkkdcoffice@gmail.com',
        PrivateBag:'48',
        area: '4,259 km²',
        description: 'Nkhotakota is located on Lake Malawi and has a rich historical heritage.',
        slug: 'nkhotakota',
        pageSlug: 'nkhotakotaDistrict'
    },
    { 
        name: 'Ntcheu', 
        region: 'Central',
        capital: 'Ntcheu',
        population: '659,608',
        Phone:'(+265) 993 007 214',
        email:'ngaiyayegeorge@yahoo.com',
        PrivateBag:'1',
        area: '3,424 km²',
        description: 'Ntcheu is known for its mountainous landscape and borders Mozambique.',
        slug: 'ntcheu',
        pageSlug: 'ntcheuDistrict'
    },
    { 
        name: 'Ntchisi', 
        region: 'Central',
        capital: 'Ntchisi',
        population: '321,568',
        area: '1,655 km²',
        description: 'Ntchisi is one of the smaller districts in the Central Region.',
        slug: 'ntchisi',
        pageSlug: 'ntchisiDistrict'
    },
    { 
        name: 'Salima', 
        region: 'Central',
        capital: 'Salima',
        population: '478,346',
        Phone:'0126201/181',
        email:'salimacouncil2017@gmail.com ',
        PrivateBag:'15',
        area: '2,196 km²',
        description: 'Salima is located on Lake Malawi and is known for its beaches and fishing.',
        slug: 'salima',
        pageSlug: 'salimaDistrict'
    },
    
    // Southern Region
    { 
        name: 'Balaka', 
        region: 'Southern',
        capital: 'Balaka',
        population: '316,748',
        Phone:'(+265) 1552049/888 354 776',
        email:'info@balakadc.com',
        PrivateBag:'1',
        area: '2,193 km²',
        description: 'Balaka is known for its sugar production and borders Lake Malawi.',
        slug: '',
        pageSlug: 'balakaDistrict'
    },
    { 
        name: 'Blantyre', 
        region: 'Southern',
        capital: 'Blantyre',
        population: '1,316,250',
        area: '2,012 km²',
        description: 'Blantyre is the commercial capital of Malawi and the second-largest city.',
        slug: 'blantyre',
        pageSlug: 'blantyreDistrict'
    },
    { 
        name: 'Chikwawa', 
        region: 'Southern',
        capital: 'Chikwawa',
        population: '564,684',
        Phone:'(+265) 01 420 214/01 420 562',
        email:'dc@chikwawadc.gov.mw',
        PrivateBag:'1',
        area: '4,755 km²',
        description: 'Chikwawa is known for sugar estates and is located in the lower Shire valley.',
        slug: 'chikwawaDistrict',
        pageSlug: 'chikwawaDistrict'
    },
    { 
        name: 'Chiradzulu', 
        region: 'Southern',
        capital: 'Chiradzulu',
        population: '356,875',
        Phone:'(+265)888536880',
        email:'chiradzuludc@chiradzuludc.gov.mw',
        PrivateBag:'1',
        area: '767 km²',
        description: 'Chiradzulu is one of the smallest districts and is known for tea production.',
        slug: '',
        pageSlug: 'chiradzuluDistrict'
    },
    { 
        name: 'Machinga', 
        region: 'Southern',
        capital: 'Liwonde',
        population: '602,272',
        Phone:'(+265)999214268',
        email:'mateuma@yahoo.com',
        PrivateBag:'1',
        area: '3,771 km²',
        description: 'Machinga is home to Liwonde National Park and borders Lake Malawi.',
        slug: 'machinga',
        pageSlug: 'machingaDistrict'
    },
    { 
        name: 'Mangochi', 
        region: 'Southern',
        capital: 'Mangochi',
        population: '1,148,635',
        Phone:'+265 (0) 1594200',
        email:'daviechigwe@gmail.com',
        PrivateBag:'138',
        area: '6,273 km²',
        description: 'Mangochi is located on Lake Malawi and is known for tourism and fishing.',
        slug: 'mangochi',
        pageSlug: 'mangochiDistrict'
    },
    { 
        name: 'Mwanza', 
        region: 'Southern',
        capital: 'Mwanza',
        population: '138,015',
        Phone:'(+265)996618718',
        email:'shambiwe@gmail.com',
        PrivateBag:'+265) 01432294',
        area: '2,259 km²',
        description: 'Mwanza borders Mozambique and is known for its border trade.',
        slug: 'mwanza',
        pageSlug: 'mwanzaDistrict'
    },
    { 
        name: 'Nsanje', 
        region: 'Southern',
        capital: 'Nsanje',
        population: '297,257',
        area: '1,942 km²',
        description: 'Nsanje is the southernmost district and borders both Mozambique and Zambia.',
        slug: 'nsanjeDistrict',
        pageSlug: 'nsanjeDistrict'
    },
    { 
        name: 'Neno', 
        region: 'Southern',
        capital: 'Neno',
        population: '138,289',
        Phone:'(+265)881399785',
        email:'nenodistrictcouncil@gmail.com',
        PrivateBag:'11',
        area: '1,535 km²',
        description: 'Neno is one of the newest districts, created in 2003.',
        slug: 'neno',
        pageSlug: 'nenoDistrict'
    },
    { 
        name: 'Phalombe', 
        region: 'Southern',
        capital: 'Phalombe',
        population: '431,593',
        Phone:'(+265) 1480237',
        email:'phalombedistrictcouncil@gmail.com',
        PrivateBag:'32',
        area: '1,394 km²',
        description: 'Phalombe is known for its agricultural activities and tea estates.',
        slug: 'phalombe',
        pageSlug: 'phalombeDistrict'
    },
    { 
        name: 'Thyolo', 
        region: 'Southern',
        capital: 'Thyolo',
        population: '721,456',
        Phone:'(+265)999510741',
        email:'thyoloassembly@yahoo.com',
        PrivateBag:'5',
        area: '1,715 km²',
        description: 'Thyolo is famous for its tea and coffee plantations.',
        slug: 'thyolo',
        pageSlug: 'thyoloDistrict'
    },
    { 
        name: 'Zomba', 
        region: 'Southern',
        capital: 'Zomba',
        population: '745,790',
        area: '2,580 km²',
        description: 'Zomba is the former capital of Malawi and home to the University of Malawi.',
        slug: 'zomba',
        pageSlug: 'zombaDistrict'
    }
]

</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Malawi Districts</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left side - Controls -->
            <div class="space-y-6">
                <!-- Region Filter Toggle -->
                <div class="flex items-center space-x-3">
                    <input 
                        type="checkbox" 
                        id="regionFilter" 
                        v-model="showRegionFilter"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    >
                    <label for="regionFilter" class="text-sm font-medium text-gray-700">
                        Filter by Region
                    </label>
                </div>

                <!-- Region Dropdown (conditional) -->
                <transition name="fade-slide-down">
                    <div v-if="showRegionFilter" class="space-y-2">
                        <label for="region" class="block text-sm font-medium text-gray-700">
                            Select Region
                        </label>
                        <select 
                            id="region"
                            v-model="selectedRegion"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Regions</option>
                            <option v-for="region in regions" :key="region" :value="region">
                                {{ region }} Region
                            </option>
                        </select>
                    </div>
                </transition>

                <!-- District Dropdown -->
                <div class="space-y-2">
                    <label for="district" class="block text-sm font-medium text-gray-700">
                        Select District
                    </label>
                    <select 
                        id="district"
                        v-model="selectedDistrict"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Choose a district...</option>
                        <option 
                            v-for="district in filteredDistricts" 
                            :key="district.name" 
                            :value="district.name"
                        >
                            {{ district.name }} ({{ district.region }})
                        </option>
                    </select>
                </div>

                <!-- Clear Button -->
                <button 
                    @click="clearFilters"
                    class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    :class="{ 'opacity-50': !selectedDistrict && !selectedRegion }"
                    :disabled="!selectedDistrict && !selectedRegion"
                >
                    Clear Selection
                </button>

                <!-- Transition wrapper for content -->
                <transition :name="transitionName" mode="out-in">
                    <div v-if="isLoading" key="loading" class="flex justify-center items-center h-64">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    
                    <!-- Default Content (shown when no district is selected) -->
                    <div v-else-if="!selectedDistrict" key="default" class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white">Malawi Local Authorities</h3>
                            <p class="text-blue-100 text-sm">All Districts Information</p>
                        </div>
                        
                        <div class="p-6 space-y-4">
                            <div class="prose prose-sm text-gray-700">
                                <h4 class="text-lg font-semibold text-gray-800">Welcome to Malawi Local Authorities Portal</h4>
                                <p>This portal provides information about all districts in Malawi. To get started:</p>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                        Select a district from the dropdown to view detailed information
                                    </li>
                                    <li class="flex items-start">
                                        <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                        Use the region filter to narrow down your search
                                    </li>
                                    <li class="flex items-start">
                                        <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                        Explore projects, news, and other information for each district
                                    </li>
                                </ul>
                                
                                <h4 class="text-lg font-semibold text-gray-800 mt-6">About Malawi's Local Government</h4>
                                <p>Malawi is divided into 28 districts across 3 regions (Northern, Central, and Southern). Each district has its own local government structure responsible for delivering services to residents.</p>
                                
                                <h4 class="text-lg font-semibold text-gray-800 mt-6">Quick Facts</h4>
                                <ul class="grid grid-cols-2 gap-4 mt-4">
                                    <li class="bg-blue-50 p-3 rounded-lg">
                                        <strong class="block text-sm text-blue-600">Total Districts</strong>
                                        <span class="text-2xl font-bold text-gray-800">28</span>
                                    </li>
                                    <li class="bg-green-50 p-3 rounded-lg">
                                        <strong class="block text-sm text-green-600">Regions</strong>
                                        <span class="text-xl font-bold text-gray-800">Northern, Central, Southern</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="pt-4 border-t border-gray-200">
                                <h5 class="text-sm font-medium mb-2">Popular Districts</h5>
                                <div class="flex flex-wrap gap-2">
                                    <button 
                                        v-for="district in popularDistricts" 
                                        :key="district.name"
                                        @click="selectPopularDistrict(district.name)"
                                        class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center"
                                    >
                                        <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {{ district.name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Selected District Display (shown when a district is selected) -->
                    <div v-else key="district" class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                        <!-- Header -->
                        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                            <h3 class="text-xl font-bold text-white">{{ selectedDistrictDetails.name }} District</h3>
                            <p class="text-blue-100 text-sm">{{ selectedDistrictDetails.region }} Region</p>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-6 space-y-4">
                            <!-- Quick Stats -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-gray-50 p-3 rounded-md transition-all hover:bg-blue-50 hover:shadow-sm">
                                    <p class="text-xs text-gray-500 uppercase tracking-wide">Capital</p>
                                    <p class="text-sm font-semibold text-gray-800">{{ selectedDistrictDetails.capital }}</p>
                                </div>
                                <div class="bg-gray-50 p-3 rounded-md transition-all hover:bg-blue-50 hover:shadow-sm">
                                    <p class="text-xs text-gray-500 uppercase tracking-wide">Population</p>
                                    <p class="text-sm font-semibold text-gray-800">{{ selectedDistrictDetails.population }}</p>
                                </div>
                            </div>
                            
                            <!-- Description -->
                            <div class="transition-all duration-200 hover:bg-gray-50 hover:shadow-xs p-3 rounded-lg">
                                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">About</p>
                                <p class="text-sm text-gray-700 leading-relaxed">{{ selectedDistrictDetails.description }}</p>
                            </div>
                            
                            
                            
                            <!-- Action Buttons -->
                            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                <button 
                                    @click="handleDistrictLinkClick(selectedDistrictDetails)"
                                    class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium flex items-center justify-center"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    View {{ selectedDistrictDetails.name }} Details
                                </button>
                                <a 
                                    :href="selectedDistrictDetails.slug"
                                    target="_blank"
                                    class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium text-center flex items-center justify-center"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    Visit District Page
                                </a>
                            </div>
                            
                            <!-- Quick Links -->
                            <div class="pt-2">
                                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">Quick Links</p>
                                <div class="flex flex-wrap gap-2">
                                    <a
                                        :href="`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=projects`"
                                        @click="handleProjectsClick"
                                        class="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors"
                                    >
                                        District Profile
                                    </a>
                                    <a
                                        :href="`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=projects`"
                                        @click="handleProjectsClick"
                                        class="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors"
                                    >
                                        Projects
                                    </a>
                                    <a 
                                        :href="`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=news`"
                                        @click="handleNewsClick"
                                        class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full hover:bg-red-200 transition-colors"
                                    >
                                        News
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- Right side - SVG Map -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-800">Map of Malawi</h3>
                
                <!-- SVG Map Container -->
                <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    <div class="w-full max-w-md mx-auto">
                        <!-- SVG Map -->
                        <img 
                            src="./malawi.svg" 
                            alt="Map of Malawi showing all districts"
                            class="w-full h-auto transition-all duration-500"
                            :class="{ 
                                'opacity-50': !selectedDistrict,
                                'scale-105': selectedDistrict
                            }"
                        />
                    </div>
                    
                    <!-- Map Legend -->
                    <div class="mt-4 text-sm text-gray-600 transition-colors duration-300"
                         :class="{ 'text-blue-600 font-medium': selectedDistrict }">
                        <div class="flex items-center justify-between">
                            <span>Map of Malawi</span>
                            <span v-if="selectedDistrict">
                                {{ selectedDistrict }} highlighted
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Map Info -->
                <transition name="fade-slide-up">
                    <div v-if="selectedDistrictDetails" class="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3 transition-all duration-300 hover:shadow-sm">
                        <div class="font-medium text-blue-800 mb-2">Currently viewing Details for {{ selectedDistrictDetails.name }}</div>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Phone: {{ selectedDistrictDetails.Phone }}</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Email: {{ selectedDistrictDetails.email }}</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <span>Private Bag: {{ selectedDistrictDetails.PrivateBag }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3 transition-all duration-300 hover:shadow-sm">
                        <div class="flex items-center">
                            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Select a district from the dropdown to highlight it and see all details</span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style>
/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: all 0.2s ease-out;
}

.fade-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.2s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>