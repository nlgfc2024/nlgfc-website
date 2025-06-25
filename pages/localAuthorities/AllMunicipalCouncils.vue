<script setup>
definePageMeta({
    title: 'all Municipal Councils' 
})

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
        slug: 'chitipa'
    },
    { 
        name: 'Karonga', 
        region: 'Northern',
        capital: 'Karonga',
        population: '365,028',
        area: '3,355 km²',
        description: 'Karonga is known for its rich archaeological sites and borders Lake Malawi.',
        slug: 'karonga'
    },
    { 
        name: 'Likoma', 
        region: 'Northern',
        capital: 'Likoma',
        population: '14,527',
        area: '18 km²',
        description: 'Likoma is an island district in Lake Malawi, known for its cathedral and beaches.',
        slug: 'likoma'
    },
    { 
        name: 'Mzimba', 
        region: 'Northern',
        capital: 'Mzuzu',
        population: '700,806',
        area: '10,430 km²',
        description: 'Mzimba is the largest district in the Northern Region and includes Mzuzu city.',
        slug: 'mzimba'
    },
    { 
        name: 'Nkhata Bay', 
        region: 'Northern',
        capital: 'Nkhata Bay',
        population: '164,761',
        area: '4,071 km²',
        description: 'Nkhata Bay is famous for its scenic lakeshore and tourism activities.',
        slug: 'nkhata-bay'
    },
    { 
        name: 'Rumphi', 
        region: 'Northern',
        capital: 'Rumphi',
        population: '169,112',
        area: '4,769 km²',
        description: 'Rumphi is known for its mountainous terrain and the Nyika National Park.',
        slug: 'rumphi'
    },
    
    // Central Region
    { 
        name: 'Dedza', 
        region: 'Central',
        capital: 'Dedza',
        population: '830,512',
        area: '3,624 km²',
        description: 'Dedza is known for pottery and borders Mozambique.',
        slug: 'dedza'
    },
    { 
        name: 'Dowa', 
        region: 'Central',
        capital: 'Dowa',
        population: '411,387',
        area: '3,041 km²',
        description: 'Dowa is an agricultural district known for tobacco farming.',
        slug: 'dowa'
    },
    { 
        name: 'Kasungu', 
        region: 'Central',
        capital: 'Kasungu',
        population: '842,953',
        area: '7,878 km²',
        description: 'Kasungu is home to Kasungu National Park and is an agricultural hub.',
        slug: 'kasungu'
    },
    { 
        name: 'Lilongwe', 
        region: 'Central',
        capital: 'Lilongwe',
        population: '2,395,454',
        area: '6,159 km²',
        description: 'Lilongwe is the capital city of Malawi and the largest urban center.',
        slug: 'lilongwe'
    },
    { 
        name: 'Mchinji', 
        region: 'Central',
        capital: 'Mchinji',
        population: '602,305',
        area: '3,356 km²',
        description: 'Mchinji borders Zambia and is a major cross-border trade center.',
        slug: 'mchinji'
    },
    { 
        name: 'Nkhotakota', 
        region: 'Central',
        capital: 'Nkhotakota',
        population: '395,897',
        area: '4,259 km²',
        description: 'Nkhotakota is located on Lake Malawi and has a rich historical heritage.',
        slug: 'nkhotakota'
    },
    { 
        name: 'Ntcheu', 
        region: 'Central',
        capital: 'Ntcheu',
        population: '659,608',
        area: '3,424 km²',
        description: 'Ntcheu is known for its mountainous landscape and borders Mozambique.',
        slug: 'ntcheu'
    },
    { 
        name: 'Ntchisi', 
        region: 'Central',
        capital: 'Ntchisi',
        population: '321,568',
        area: '1,655 km²',
        description: 'Ntchisi is one of the smaller districts in the Central Region.',
        slug: 'ntchisi'
    },
    { 
        name: 'Salima', 
        region: 'Central',
        capital: 'Salima',
        population: '478,346',
        area: '2,196 km²',
        description: 'Salima is located on Lake Malawi and is known for its beaches and fishing.',
        slug: 'salima'
    },
    
    // Southern Region
    { 
        name: 'Balaka', 
        region: 'Southern',
        capital: 'Balaka',
        population: '316,748',
        area: '2,193 km²',
        description: 'Balaka is known for its sugar production and borders Lake Malawi.',
        slug: 'balaka'
    },
    { 
        name: 'Blantyre', 
        region: 'Southern',
        capital: 'Blantyre',
        population: '1,316,250',
        area: '2,012 km²',
        description: 'Blantyre is the commercial capital of Malawi and the second-largest city.',
        slug: 'blantyre'
    },
    { 
        name: 'Chikwawa', 
        region: 'Southern',
        capital: 'Chikwawa',
        population: '564,684',
        area: '4,755 km²',
        description: 'Chikwawa is known for sugar estates and is located in the lower Shire valley.',
        slug: 'chikwawa'
    },
    { 
        name: 'Chiradzulu', 
        region: 'Southern',
        capital: 'Chiradzulu',
        population: '356,875',
        area: '767 km²',
        description: 'Chiradzulu is one of the smallest districts and is known for tea production.',
        slug: 'chiradzulu'
    },
    { 
        name: 'Machinga', 
        region: 'Southern',
        capital: 'Liwonde',
        population: '602,272',
        area: '3,771 km²',
        description: 'Machinga is home to Liwonde National Park and borders Lake Malawi.',
        slug: 'machinga'
    },
    { 
        name: 'Mangochi', 
        region: 'Southern',
        capital: 'Mangochi',
        population: '1,148,635',
        area: '6,273 km²',
        description: 'Mangochi is located on Lake Malawi and is known for tourism and fishing.',
        slug: 'mangochi'
    },
    { 
        name: 'Mwanza', 
        region: 'Southern',
        capital: 'Mwanza',
        population: '138,015',
        area: '2,259 km²',
        description: 'Mwanza borders Mozambique and is known for its border trade.',
        slug: 'mwanza'
    },
    { 
        name: 'Nsanje', 
        region: 'Southern',
        capital: 'Nsanje',
        population: '297,257',
        area: '1,942 km²',
        description: 'Nsanje is the southernmost district and borders both Mozambique and Zambia.',
        slug: 'nsanje'
    },
    { 
        name: 'Neno', 
        region: 'Southern',
        capital: 'Neno',
        population: '138,289',
        area: '1,535 km²',
        description: 'Neno is one of the newest districts, created in 2003.',
        slug: 'neno'
    },
    { 
        name: 'Phalombe', 
        region: 'Southern',
        capital: 'Phalombe',
        population: '431,593',
        area: '1,394 km²',
        description: 'Phalombe is known for its agricultural activities and tea estates.',
        slug: 'phalombe'
    },
    { 
        name: 'Thyolo', 
        region: 'Southern',
        capital: 'Thyolo',
        population: '721,456',
        area: '1,715 km²',
        description: 'Thyolo is famous for its tea and coffee plantations.',
        slug: 'thyolo'
    },
    { 
        name: 'Zomba', 
        region: 'Southern',
        capital: 'Zomba',
        population: '745,790',
        area: '2,580 km²',
        description: 'Zomba is the former capital of Malawi and home to the University of Malawi.',
        slug: 'zomba'
    }
]

// Reactive variables
const selectedDistrict = ref('')
const selectedRegion = ref('')
const showRegionFilter = ref(false)

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

// Method to generate district URL
const getDistrictUrl = (slug) => {
    return `/localAuthorities/${slug}`
}

// Method to handle district link click
const handleDistrictLinkClick = (district) => {
    console.log('Navigating to:', getDistrictUrl(district.slug))
    // In a real Nuxt app, you would use:
    // await navigateTo(getDistrictUrl(district.slug))
}

// Method to clear filters
const clearFilters = () => {
    selectedDistrict.value = ''
    selectedRegion.value = ''
}
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
                >
                    Clear Selection
                </button>

                <!-- Selected District Display with Details -->
                <div v-if="selectedDistrictDetails" class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <h3 class="text-xl font-bold text-white">{{ selectedDistrictDetails.name }} District</h3>
                        <p class="text-blue-100 text-sm">{{ selectedDistrictDetails.region }} Region</p>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 space-y-4">
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-3 rounded-md">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Capital</p>
                                <p class="text-sm font-semibold text-gray-800">{{ selectedDistrictDetails.capital }}</p>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-md">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Population</p>
                                <p class="text-sm font-semibold text-gray-800">{{ selectedDistrictDetails.population }}</p>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-md">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Area</p>
                            <p class="text-sm font-semibold text-gray-800">{{ selectedDistrictDetails.area }}</p>
                        </div>
                        
                        <!-- Description -->
                        <div>
                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">About</p>
                            <p class="text-sm text-gray-700 leading-relaxed">{{ selectedDistrictDetails.description }}</p>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                            <button 
                                @click="handleDistrictLinkClick(selectedDistrictDetails)"
                                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
                            >
                                View {{ selectedDistrictDetails.name }} Details
                            </button>
                            <a 
                                :href="getDistrictUrl(selectedDistrictDetails.slug)"
                                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium text-center"
                            >
                                Visit District Page
                            </a>
                        </div>
                        
                        <!-- Quick Links -->
                        <div class="pt-2">
                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">Quick Links</p>
                            <div class="flex flex-wrap gap-2">
                                <a 
                                    :href="`/localAuthorities/${selectedDistrictDetails.slug}/services`"
                                    class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full hover:bg-green-200 transition-colors"
                                >
                                    Services
                                </a>
                                <a 
                                    :href="`/localAuthorities/${selectedDistrictDetails.slug}/contacts`"
                                    class="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full hover:bg-yellow-200 transition-colors"
                                >
                                    Contacts
                                </a>
                                <a 
                                    :href="`/localAuthorities/${selectedDistrictDetails.slug}/projects`"
                                    class="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors"
                                >
                                    Projects
                                </a>
                                <a 
                                    :href="`/localAuthorities/${selectedDistrictDetails.slug}/news`"
                                    class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full hover:bg-red-200 transition-colors"
                                >
                                    News
                                </a>
                                  <a 
                                    :href="`/localAuthorities/${selectedDistrictDetails.slug}/news`"
                                    class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full hover:bg-red-200 transition-colors"
                                >
                                updates
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right side - SVG Map -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-800">Map of Malawi</h3>
                
                <!-- SVG Map Container -->
                <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                    <div class="w-full max-w-md mx-auto">
                        <!-- SVG Map -->
                        <img 
                            src="./malawi.svg" 
                            alt="Map of Malawi showing all districts"
                            class="w-full h-auto"
                            :class="{ 'opacity-50': !selectedDistrict }"
                        />
                    </div>
                    
                    <!-- Map Legend -->
                    <div class="mt-4 text-sm text-gray-600">
                        <div class="flex items-center justify-between">
                            <span>Map of Malawi</span>
                            <span v-if="selectedDistrict" class="text-blue-600 font-medium">
                                {{ selectedDistrict }} highlighted
                            </span>
                        </div>
                    </div>
                </div>
                
                    <!-- Map Info -->
                    <div class="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3">
                        <strong>Map Features:</strong>
                        <ul class="mt-2 ml-4 list-disc space-y-1">
                            <li>Shows all 28 districts of Malawi</li>
                            <li>Organized by Northern, Central, and Southern regions</li>
                            <li v-if="selectedDistrictDetails">
                                Currently viewing: <strong>{{ selectedDistrictDetails.name }}</strong>
                                <br><span class="text-xs text-gray-500">Population: {{ selectedDistrictDetails.population }} | Area: {{ selectedDistrictDetails.area }}</span>
                            </li>
                            <li v-else>Select a district from the dropdown to highlight it</li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>
</template>