<script setup>
import { useDistrictPDF } from '~/composables/useDistrictPDF';

definePageMeta({
    title: 'For all local authorities'
})


// Reactive variables
const selectedDistrict = ref('')
const selectedRegion = ref('')
const showRegionFilter = ref(false)
const searchQuery = ref('')
const sortCriteria = ref('name')
const sortDirection = ref('asc')
const activeContent = ref([])
const isLoading = ref(false)
const transitionName = ref('fade')
const hoveredDistrict = ref('')
// District ID mapping for SVG paths
const districtIdMap = {
  'Chitipa': 'MWCT',
  'Karonga': 'MWKR',
  'Likoma': 'MWLK',
  'Mmbelwa': 'MWMZ',
  'Nkhata Bay': 'MWNB',
  'Rumphi': 'MWRU',
  'Dedza': 'MWDE',
  'Dowa': 'MWDO',
  'Kasungu': 'MWKS',
  'Lilongwe': 'MWLI',
  'Lilongwe city': 'MWLI',
  'Mchinji': 'MWMC',
  'Nkhotakota': 'MWNK',
  'Ntcheu': 'MWNU',
  'Ntchisi': 'MWNI',
  'Salima': 'MWSA',
  'Balaka': 'MWBA',
  'Blantyre': 'MWBL',
  'Chikwawa': 'MWCK',
  'Chiradzulu': 'MWCR',
  'Machinga': 'MWMH',
  'Mangochi': 'MWMG',
  'Mwanza': 'MWMW',
  'Nsanje': 'MWNS',
  'Neno': 'MWNE',
  'Phalombe': 'MWPH',
  'Thyolo': 'MWTH',
  'Mulanje': 'MWMU',
  'Zomba': 'MWZO'
}

// Ref for SVG element
const svgRef = ref(null)

// Computed property to filter districts by region
const filteredDistricts = computed(() => {
    if (!selectedRegion.value) return districts
    return districts.filter(district => district.region === selectedRegion.value)
})

// Computed property to filter districts by search query
const searchedDistricts = computed(() => {
    let result = filteredDistricts.value
    
    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase().trim()
        result = result.filter(district =>
            district.name.toLowerCase().includes(query) ||
            district.region.toLowerCase().includes(query) ||
            district.description.toLowerCase().includes(query) ||
            district.population.toLowerCase().includes(query) ||
            district.area.toLowerCase().includes(query) ||
            district.capital.toLowerCase().includes(query)
        )
    }
    
    // Apply sorting
    return [...result].sort((a, b) => {
        let aValue, bValue
        
        // Only sort by name since other options were removed
        aValue = a.name
        bValue = b.name
        
        if (sortDirection.value === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
        }
    })
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

// Method to export data to CSV
const exportToCSV = () => {
  // Create CSV content
  const headers = ['Name', 'Region', 'Capital', 'Population', 'Area', 'Description', 'Phone', 'Email', 'Private Bag'];
  const csvContent = [
    headers.join(','),
    ...searchedDistricts.value.map(district => [
      district.name,
      district.region,
      district.capital || '',
      district.population || '',
      district.area || '',
      district.description || '',
      district.Phone || '',
      district.email || '',
      district.PrivateBag || ''
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'malawi_districts.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Method to export data to PDF
const exportToPDF = async () => {
  try {
    // Show loading state
    isLoading.value = true;
    
    // Try to dynamically import jsPDF
    const jsPDF = await import('jspdf');
    const autoTable = await import('jspdf-autotable');
    
    const doc = new jsPDF.default();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Malawi Districts Report', 14, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add table
    autoTable.default(doc, {
      startY: 40,
      head: [['Name', 'Region', 'Capital', 'Population', 'Area']],
      body: searchedDistricts.value.map(district => [
        district.name,
        district.region,
        district.capital || '',
        district.population || '',
        district.area || ''
      ]),
      styles: {
        fontSize: 8
      },
      headStyles: {
        fillColor: [0, 50, 13]
      }
    });
    
    // Save the PDF
    doc.save('malawi_districts.pdf');
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    
    // Show user-friendly message about missing dependencies
    alert(`PDF export requires additional libraries to be installed.
    
Please install the required dependencies:

npm install jspdf jspdf-autotable

or

yarn add jspdf jspdf-autotable

After installation, refresh the page and try again.

For now, you can use CSV export as an alternative.`);
    
    // Fallback to CSV export
    exportToCSV();
  } finally {
    isLoading.value = false;
  }
}

// Method to dynamically import district page data
const getDistrictPageData = async (pageSlug) => {
  try {
    // Dynamically import the district page component
    const districtModule = await import(`./${pageSlug}.vue`);
    
    // If the component has a default export with setup function
    if (districtModule && districtModule.default) {
      return districtModule.default;
    }
    
    return null;
  } catch (error) {
    console.warn(`Could not load district page data for ${pageSlug}:`, error);
    return null;
  }
};

// Method to extract detailed district data from page
const extractDistrictData = (district, pageData) => {
  // If we have detailed page data, use it; otherwise fall back to basic data
  if (pageData && pageData.data) {
    // This would be used if the page data was structured in a specific way
    // For now, we'll use the basic district data and enhance it where possible
  }
  
  // Prepare comprehensive district data for PDF generation
  const districtData = {
    profile: {
      about: district.description || 'No description available',
      vision: district.vision || "Not specified",
      mission: district.mission || "Not specified",
      values: district.values || [
        "Transparency and accountability: council shall discharge its duties in an open and reliable manner",
        "Integrity: the council shall act with honesty and without compromising the truth",
        "Client focused: the client shall be served in an efficient and effective manner",
        "Collaboration: council shall enhance interaction with all relevant stakeholders",
        "Open communication: the council shall enhance inter and intra communication",
        "Responsiveness: council shall provide services that are demand driven without discrimination"
      ],
      strategicObjectives: district.strategicObjectives || [
        "Not specified"
      ],
      keyFunctions: district.keyFunctions || [
        "Local governance and administration",
        "Development planning and implementation",
        "Service delivery and infrastructure development",
        "Revenue collection and financial management"
      ],
      additionalInfo: {
        "Major Achievements": district.majorAchievements || "Not specified",
        "Jurisdiction": district.jurisdiction || `Located in ${district.region} Region of Malawi`,
        "Population": district.population || 'Not specified',
        "Structure": district.structure || "Comprised of elected councillors and appointed technical staff"
      }
    },
    projects: district.projects || [
      {
        name: 'SSRLP,GESD,SEP',
        fullName: '2025',
        description: 'This is a sample project description for districts that do not have detailed project information.',
        objectives: [
          'Sample objective 1',
          'Sample objective 2'
        ],
        status: 'Not Active'
      }
    ],
    reports: district.reports || [],
    news: district.news || []
  };
  
  return districtData;
};

// Method to export district information to PDF
const exportDistrictInfoToPDF = async () => {
  // Check if a district is selected
  if (!selectedDistrict.value) {
    console.warn('No district selected for PDF export');
    return;
  }
  
  // Get the selected district details
  const district = selectedDistrictDetails.value;
  
  // Try to get detailed data from the district page
  let districtData;
  
  if (district.pageSlug) {
    try {
      // Try to import the district page to get detailed data
      const pageData = await getDistrictPageData(district.pageSlug);
      districtData = extractDistrictData(district, pageData);
    } catch (error) {
      console.warn('Could not load detailed district data, using basic data:', error);
      // Fallback to basic data extraction
      districtData = extractDistrictData(district, null);
    }
  } else {
    // Fallback to basic data extraction
    districtData = extractDistrictData(district, null);
  }
  
  // Call the useDistrictPDF composable to generate the PDF
  const { generateDistrictPDF } = useDistrictPDF();
  generateDistrictPDF(districtData, district.name);
}

// Method to select popular district
const selectPopularDistrict = (districtName) => {
    transitionName.value = 'slide-up'
    selectedDistrict.value = districtName
}

// Method to highlight selected district on map
const highlightSelectedDistrict = (districtName) => {
  if (!svgRef.value || !districtName) return
  
  const districtId = districtIdMap[districtName]
  if (!districtId) {
    console.warn(`District ID not found for: ${districtName}`)
    return
  }
  
  const svg = svgRef.value
  const districtPath = svg.querySelector(`#${districtId}`)
  if (!districtPath) {
    console.warn(`District path not found for ID: ${districtId}`)
    return
  }
  
  // Remove highlight from all districts first
  svg.querySelectorAll('path').forEach(path => {
    path.style.fill = '#6f9c76' // Default green color
    path.style.stroke = '#ffffff'
    path.style.strokeWidth = '1px'
    path.classList.remove('highlighted')
    path.style.filter = 'none'
  })
  
  // Highlight the selected district
  districtPath.style.fill = '#1f2937' // Gray-800 highlight
  districtPath.style.stroke = '#111827' // Gray-900 border
  districtPath.style.strokeWidth = '3px'
  districtPath.classList.add('highlighted')
  districtPath.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
  
  // Smooth animation
  districtPath.style.transition = 'all 0.3s ease'
}

// Add this function to handle mouseover events
const handleDistrictHover = (districtName) => {
  hoveredDistrict.value = districtName
}

// Add this function to handle mouseout events
const handleDistrictLeave = () => {
  hoveredDistrict.value = ''
}

// Add this function to handle district clicks on the map
const handleDistrictClick = (districtName) => {
  console.log('District clicked:', districtName)
  selectedDistrict.value = districtName
  
  // Optional: Show a brief notification
  if (process.client) {
    const event = new CustomEvent('district-selected', { 
      detail: { districtName } 
    })
    window.dispatchEvent(event)
  }
}

// Method to reset map highlighting
const resetMapHighlighting = () => {
  if (!svgRef.value) return
  
  const svg = svgRef.value
  // Reset all district colors and styles
  svg.querySelectorAll('path').forEach(path => {
    path.style.fill = '#6f9c76' // Default green
    path.style.stroke = '#ffffff'
    path.style.strokeWidth = '1px'
    path.classList.remove('highlighted')
    path.style.filter = 'none'
    path.style.transition = 'all 0.3s ease'
  })
}

// Watch for selectedDistrict changes
watch(selectedDistrict, (newDistrict) => {
  if (newDistrict) {
    highlightSelectedDistrict(newDistrict)
  } else {
    resetMapHighlighting()
  }
})

// Initialize map on component mount
onMounted(() => {
  // Initialize map highlighting
  nextTick(() => {
    resetMapHighlighting()
    
    // Test function - you can remove this in production
    if (process.env.NODE_ENV === 'development') {
      console.log('Map initialized. Available districts:', Object.keys(districtIdMap))
    }
  })
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
    <div class="p-6 max-w-6xl mx-auto">
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
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-bg-emerald-700  focus:border-blue-500"
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
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                    >
                        <option value="">Choose a district...</option>
                        <option
                            v-for="district in searchedDistricts"
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
                
                                 <!-- Export Buttons -->
                                

                <!-- Transition wrapper for content -->
                <transition :name="transitionName" mode="out-in">
                    <div v-if="isLoading" key="loading" class="flex justify-center items-center h-64">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    
                    <!-- Default Content (shown when no district is selected) -->
                    <div v-else-if="!selectedDistrict" key="default" class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div class="bg-gradient-to-r from-[#000C1A] via-[#001830] to-[#001F3F] px-6 py-4">
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
                        <div class="bg-gradient-to-r from-[#000C1A] via-[#001830] to-[#001F3F] px-6 py-4">
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
                                    class="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium flex items-center justify-center"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    View {{ selectedDistrictDetails.name }} Details
                                </button>
                                <button
                                    @click="exportDistrictInfoToPDF"
                                    class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium flex items-center justify-center"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export District Info to PDF
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
                                        class="inline-flex items-center px-3 py-1 bg-purple-100 text-gray-600 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors"
                                    >
                                        District Profile
                                    </a>
                                    <a
                                        :href="`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=projects`"
                                        @click="handleProjectsClick"
                                        class="inline-flex items-center px-3 py-1 bg-purple-100 text-gray-600 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors"
                                    >
                                        Projects
                                    </a>
                                    <a 
                                        :href="`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=news`"
                                        @click="handleNewsClick"
                                        class="inline-flex items-center px-3 py-1 bg-red-100 text-gray-600 text-xs font-medium rounded-full hover:bg-red-200 transition-colors"
                                    >
                                        News
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- Right side - SVG Map come here when you want to tamper with the map -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-800">Map of Malawi</h3>
                                        
                                        <!-- SVG Map Container -->
                                        <div class="border border-gray-300 rounded-lg p-4 shadow-sm transition-all duration-6000 hover:shadow-md">
                                            <div class="w-full max-w-4xl mx-auto">
                                                <!-- SVG Map -->
                                                <svg
                                                    ref="svgRef"
                                                    viewBox="0 0 1000 1000"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="w-full h-auto transition-all duration-500"
                                                    :class="{
                                                        'opacity-190': !selectedDistrict,
                                                        'scale-105': selectedDistrict
                                                    }"
                                                >
                                                    <g id="features">
                                                       
                                                         <path d="M488.8 184.7l-0.1 0-1.5-0.2-2.5-0.9-1.1 0-1.1 0.3-1.4 0.5-0.7 0-2.5-1.5-16.1-13.6-26.1-40.8-1.3-2.7-0.8-1.1-0.8-0.3-4.1 0.4-2.6 0-1.1-0.4-1.5-0.8-3.9-3.3-0.9-0.5-0.4-0.1-1.6-0.2-1.2-0.2-1.2-0.7-0.9-0.9-0.9-1.3-0.6-0.7-0.7-0.6-0.8-0.4-1.4-1-0.5-0.8-0.3-1 0.1-1.4 0.2-0.5 0.5-0.3 2.9-0.9 5.5-3.5 0.6-0.5 0.7-1 0.4-0.4 1.4-0.3 0.9-0.3 1.6-1.4 0.7-0.9 0.8-1.2 1-2.3 0.4-0.5 1.2-1 1.5-1.5 0.7-0.6 0.7-0.4 0.8-0.3 2-0.4 0.4-0.7 0.1-1.2-0.8-2-0.2-1.2-0.2-2.1-0.4-1.1-0.8-1.3-0.4-1.1 0-0.8 0.3-2 0.1-1.3-0.5-1-0.5-0.5-2.2-4.1 0.1 0 1.4-0.2 0 0.1 0.1 0 0.2 0 0.3 0 0.2-0.1 0-0.1 0.7-0.1 2.3-1.3 0.1 0.1 0 0.1 0 0.1 0 0.1-0.1 0.2 0 0.1 0 0.1 0 0.1 0 0.2-0.1 0.1 0 0.1-0.1 0.1 0 0.2 0.3 0.3 0.1 0.1 0.2 0.1 0.1-0.1 0.2-0.1 0-0.1 0.1-0.2 0.1-0.1 0.1-0.1 0.1 0 0.1 0 0.1 0.1 0.1 0.1 0.1-0.1 0-0.2 0.2-0.3 0-0.2 0-0.2 0.1-0.2 0.1 0 0.1-0.1 0.2 0 0.1-0.1 0-0.1 0-0.1 0-0.1-0.3-0.1 0-0.1 0-0.1 0.1 0 0.1 0 0.1 0 0.1 0 0.2-0.1 0.2-0.1 0.1 0 0-0.1 0-0.1 0.1 0-0.1-0.2 0.4-0.1 0.1 0 0.1 0.1 0.1-0.1 0-0.1 0.1 0 0.4-0.2 0 0.1 0.1 0.1 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0 0.1 0.2 0 2.6 1.6 2.9 3 3 1.9 2.6 1.1 3.3 2 1.7 1.4 0 0.1 0.1 0.1 0.1 0 0.8 0.7 1.3 2.3 1.3 0.9-0.9 0.9-0.5 3.8 0.9 8 2.7 6.3 0.8 0.5 0.9 0.1 0.7 0.3 0.3 1.1 0 4 1.3 7.9 3.3 7.8 9.4 13.6 6.4 6.4 3.5 2.7 1.9 1.6 0.8 1.7 0.5 1.7 1.2 1.8 4.1 4.7 0.9 1.6 1.2 4 1.3 2.9 0.2 0.4-0.7 1.2-0.7 0.1-0.8-0.1-0.9 0.3-1.9 1.7-0.7 1 0.2 3.7 0.3 1 0.4 0.9 0.1 0.8-0.8 0.9-2.7 1.6-0.8 0.8-1 2 0.3 0.8z" id="MWKR" name="Karonga" @mouseover="handleDistrictHover('Karonga')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Karonga')"
  </path>
  <path d="M461.8 169.3l16.1 13.6 2.5 1.5 0.7 0 1.4-0.5 1.1-0.3 1.1 0 2.5 0.9 1.5 0.2 0.1 0 0.4 1 1.3 1.8 1 1.9-0.1 1.4-0.7 4 0 1.8 1.6 6.3 1.9 22.3-0.1 4-4.3 3.3-15.7 9.3-1.6-3-1.4-2.1-1.6-1.9-7.4-5.9-0.8-0.2-0.4 0.6-0.2 0.8-0.8 5-1 0.7-1.6 0.2-10.8-1.5-3.5 0.4-4.1 1.1-0.6 0.4-0.2 0.7 0.2 0.7 0.4 0.7 0.3 0.5 0.1 0.5-0.1 0.7-0.3 0.8-0.7 0.8-0.8 0.6-0.9 0.3-0.9 0.1-1.1 0-1-0.7-0.6-0.8-0.9-1.9-0.7-0.6-1-0.1-4.4 0.6-1.2 0-1.4-0.2-1.5-0.9-1.2-0.9-1.2-1.1-1.1-0.9-1.2-0.3-1.5 0.3-0.9 0.6-0.6 0.8-1.4 2.5-0.7 0.8-1.7 1.8-2 1.7-2.3 1.7-1 0.3-0.9-0.3-0.4-1.1 0.1-1 0.4-0.9 0.4-0.9 0.2-1.1 0-1.2-0.3-2-0.5-2-0.6-0.7-0.9-0.4-3.9-0.2-4.2-0.7-5.2-2.1-2.2-0.9-0.4-3.5-0.8-3.7-1.7-1.4-1.6 0.2-1.4 0-0.9-0.6 0.1-1.7 1-2 1.1-0.4 1.2 0.3 1.4 0.1 1.7-1.1 2.1-3.2 1.4-1.2 1.5-0.6 2.9-0.5 1.6-0.7 1.6-0.2 3.7 0.7 1.8 0.1 1.5-0.7 2.1-2.1 1.7-0.3 2.3-1.4 1.3-2 1.8-4.7 5.6-6.3 1.5-1 1.5-0.6 4.4-3.3 1.8-1.6 1.9-2.8-0.1-0.5 3.3-1.3 28.1-12.7z" id="MWRU" name="Rumphi" @mouseover="handleDistrictHover('Rumphi')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Rumphi')"
  </path>
  <path d="M569.6 278.9l0.5 0.9 2.1 1.8-2.2-1.8-0.4-0.9z m-95.5-37.1l15.7-9.3 4.3-3.3-0.3 10.7 0.7 3.8 1.6 2.2-3.1 5.6-0.8 3 1.2 3 0.7 1.1 0 1.2-0.3 2.9 0.3 1.8 0.8 1 1.1 0.7 1 1.2 2.3 6.6 0.7 14.5 2.3 8.3-0.1 3.4 0.6 1.2 0.7 1.1 0.6 1.7 0.6 3.1-0.1 3.8-1 2.3-4.6 4.5-1.3 0.7-0.7 0.7-0.5 0.7-0.4 1.5-0.4 0.6-1.2 1-2.7 1.5-1.1 1.1-1.3 2.6-0.9 3.5 0 3.4 1.4 2.4-13 10-1.4 1.9-0.7 2-0.6 4.5-1.4 5.8-0.4 3.7-1.3 5.7 0 1.9-0.2 0-8.4-2-4.6-2-1.5-1-2.5-2.2-1.1-0.4-1 0-2.1 0.5-6.8 0-1-0.2-0.7-0.5-0.6-0.6-0.6-0.9-0.5-0.6-0.7-0.4-1.9-0.7-0.9-0.5-0.7-0.6-0.1-1 0.3-1.1 1.1-1.9 1.1-1.3 1.1-0.8 1.2-0.4 1.2-0.1 1.3-0.3 1.1-0.6 0.9-0.9 2.3-3.1 0.4-1.1-0.3-1.4-0.4-1.1-0.5-1.5-0.1-1.6 0-2.3-0.2-1.8-0.7-2.7 0.1-1.1 0.3-1 1-1.6 0.5-2.4 0.7-2.1 0-1.9-0.4-1-1.6-1.4-0.5-0.7-0.3-0.8-0.1-0.7-0.3-0.6-0.4-0.3-1.3-1.2-0.7-0.9-0.5-1.2-0.2-1.2-0.1-1.2 0-1.4 0.3-2.4 1.3-6.4 0.5-1.3 0.9-1.2 1.6-2 1.3-1 1.1-0.7 0.7-0.3 0.7-0.4 2.4-2.4 0.9-0.5 0.9-0.3 0.9 0 0.6 0.1 4.5 1.3 0.8 0.1 0.9-0.1 1.1-0.3 1-0.6 0.9-1.2 0.9-1.6 1.3-3.2 1.1-1.4 1.2-0.8 1.7-0.1 0.6 0.1 0.7 0.1 1.2 0.6 0.5 0.2 0.4-0.2 1.6-0.8 2.1-0.5 1-0.5 0.5-1 0.1-2-1.4-4.3-1.6-1.8-0.4-0.7-2.7-10.5-0.6-0.9-0.8-0.6-1.7-0.9-0.3-1.4 0.2-2.1 2.8-9.3 1.2-8.3z" id="MWNB" name="Nkhata Bay" @mouseover="handleDistrictHover('Nkhata Bay')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Nkhata Bay')"
  </path>
  <path d="M548.7 357l0.9-3.2 1.2-1 3.2 1.6-1.9 1 0 1.3 0.4 1.4-0.5 1.5-1.2 0.6-1.3-0.4-1.1-0.8-0.7-0.7 1-1.3z" id="MWLK" name="Likoma" @mouseover="handleDistrictHover('Likoma')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Likoma')"
  </path>
  <path d="M427.7 71.9l2.2 4.1 0.5 0.5 0.5 1-0.1 1.3-0.3 2 0 0.8 0.4 1.1 0.8 1.3 0.4 1.1 0.2 2.1 0.2 1.2 0.8 2-0.1 1.2-0.4 0.7-2 0.4-0.8 0.3-0.7 0.4-0.7 0.6-1.5 1.5-1.2 1-0.4 0.5-1 2.3-0.8 1.2-0.7 0.9-1.6 1.4-0.9 0.3-1.4 0.3-0.4 0.4-0.7 1-0.6 0.5-5.5 3.5-2.9 0.9-0.5 0.3-0.2 0.5-0.1 1.4 0.3 1 0.5 0.8 1.4 1 0.8 0.4 0.7 0.6 0.6 0.7 0.9 1.3 0.9 0.9 1.2 0.7 1.2 0.2 1.6 0.2 0.4 0.1 0.9 0.5 3.9 3.3 1.5 0.8 1.1 0.4 2.6 0 4.1-0.4 0.8 0.3 0.8 1.1 1.3 2.7 26.1 40.8-28.1 12.7-3.3 1.3 0-0.4-0.1-1.2-0.8-2.1 0-3-3.1-0.4-1.8-2.1-2.2-5.2-0.9-1-3.2-2.8-0.9-1.4-3-7.1-0.4-2.8 0.7-6.5-0.3-3.6-1.6-1.9-2.3-1.6-2.1-2.8-3-1-2-1.8-1.9-2-2.4-2-9.3-4.2-1.5-2.1 0-3 0.6-2.9 2.2-5.5 3.4-5.3 0.8-2.4-0.7-3.2-1.8-4.6-0.8-0.9-4.2-1.6-1.4-0.7-1.4-1.2-0.9-1.4-1.7-3.2-1.2-1.3-2.9-1.8-1.1-1.6-0.3-1.7 0.4-1.1 0.6-1 0.3-1.2-0.2-1.8-0.5-1.5-1.6-2.9-2.3-1.6-6.1-0.4-2.7-1.2-0.6 3-0.4 3.4-1 2.1-2.5-0.9-0.7-1.1-0.2-1.4-0.5-1.2-1.2-0.6-1.6 0.4-1.2 0.8-1.3 0.6-1.5-0.5-1.4-3.1 2-8.4 0-3.1-1-0.5-1.7-1.6-0.7-0.4-1.4 0-0.7 0.6-0.7 0.2-1.1-0.9-0.6-1.6-0.2-6.7 0.8-0.8 0.2 0 0.5 0 1-0.2 1.1-0.2 0.3 0 0.2-0.1 0.3-0.1 0.2-0.3 0.4-0.2 0.7-0.5 0.4-0.3 0.3-0.2 1.7 1 5.7 5.7 7 5.4 1.1 0.5 3.1 0.6 3.3 1.4 0.4 0.2 1.1-0.3 1.3-1.1-0.1 0.1 0.1 0.1 0.1 0.1 0.1 0 0.1 0.1 0.1 0 0.1 0.1 0.1 0 0.2 0.1 0.2 0 0.1 0 0.1 0 0-0.1 0.1 0.1 0.1 0 0.1 0 0.1 0 0.1 0.1 0.1 0 0 0.1 0.1 0.1 0.1 0.1 0.1 0 0.1 0 0-0.1 0-0.1 0-0.1 0-0.1 0.1-0.1 0.1-0.1 0-0.1 0.1 0 0-0.1 0-0.1 0.1 0.1 0-0.1 0.1 0 0-0.1 0.1 0.1 0 0.1 0.1 0 0.1-0.1 0-0.1 0.1 0 0.1 0 0.1-0.1 0-0.2 0.1-0.1 1.5 0.5 1.4 0.1 1-0.3 0.6-0.4 0 0.1 0.1 0.1 0 0.1 0.1 0 0.1-0.1 0-0.1 0.1 0 0-0.1 0.2 0 0.1 0 0 0.1 0 0.1 0.1 0.1 0.1 0.1 0 0.1 0.1 0 0.1 0 0.1 0 0-0.1 0.1-0.1 0.1 0.1 0.1 0 0.1 0.1 0.1-0.1 0.1 0 0.1 0 0.1-0.1 0.1-0.1-0.1-0.2 0.1-0.1 0.1 0 0.1-0.2 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0-0.1-0.1 0-0.1 0 0-0.1 0-0.1-0.1-0.1 0.1 0 0.1-0.1 0.4 0.2 0.1 0 0.9 0.3 6.5 4.6 2.1 2 1.9 4.3 1.4 2.2 1.8 1.2 2.2 0.7 4.7 0.3 2.3-0.5 0.1 0.1 0.2 0 0.2 0 0 0.1 0.1 0.1 0.1 0.1 0.1 0.1 0.1-0.1 0.1 0.1 0.2-0.1 0.1-0.1 0.1 0 0.2 0 0.1-0.1 0.1-0.1 0-0.1 0.1 0 0.1-0.1 0.1 0 0.1 0.1 0.1 0 0.1 0 0.1-0.1 0-0.1 0-0.1 0.2-0.1 0.2 0 0.1-0.2 0.1 0 0.1 0 0.1-0.1 0.2 0 0-0.1 0.1-0.2 0.1-0.1 0.2 0.1 0.2 0 0-0.1 0.1-0.1 0-0.1 0.1 0 0.3-0.1 0.1-0.1 0-0.3 0.1-0.1 0.1-0.1 0-0.2 0-0.1 1.8-0.8 3.9 0.4 3.4 1.1 3 0.6z" id="MWCT" name="Chitipa" @mouseover="handleDistrictHover('Chitipa')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Chitipa')"
  </path>
  <path d="M386.8 230l2.2 0.9 5.2 2.1 4.2 0.7 3.9 0.2 0.9 0.4 0.6 0.7 0.5 2 0.3 2 0 1.2-0.2 1.1-0.4 0.9-0.4 0.9-0.1 1 0.4 1.1 0.9 0.3 1-0.3 2.3-1.7 2-1.7 1.7-1.8 0.7-0.8 1.4-2.5 0.6-0.8 0.9-0.6 1.5-0.3 1.2 0.3 1.1 0.9 1.2 1.1 1.2 0.9 1.5 0.9 1.4 0.2 1.2 0 4.4-0.6 1 0.1 0.7 0.6 0.9 1.9 0.6 0.8 1 0.7 1.1 0 0.9-0.1 0.9-0.3 0.8-0.6 0.7-0.8 0.3-0.8 0.1-0.7-0.1-0.5-0.3-0.5-0.4-0.7-0.2-0.7 0.2-0.7 0.6-0.4 4.1-1.1 3.5-0.4 10.8 1.5 1.6-0.2 1-0.7 0.8-5 0.2-0.8 0.4-0.6 0.8 0.2 7.4 5.9 1.6 1.9 1.4 2.1 1.6 3-1.2 8.3-2.8 9.3-0.2 2.1 0.3 1.4 1.7 0.9 0.8 0.6 0.6 0.9 2.7 10.5 0.4 0.7 1.6 1.8 1.4 4.3-0.1 2-0.5 1-1 0.5-2.1 0.5-1.6 0.8-0.4 0.2-0.5-0.2-1.2-0.6-0.7-0.1-0.6-0.1-1.7 0.1-1.2 0.8-1.1 1.4-1.3 3.2-0.9 1.6-0.9 1.2-1 0.6-1.1 0.3-0.9 0.1-0.8-0.1-4.5-1.3-0.6-0.1-0.9 0-0.9 0.3-0.9 0.5-2.4 2.4-0.7 0.4-0.7 0.3-1.1 0.7-1.3 1-1.6 2-0.9 1.2-0.5 1.3-1.3 6.4-0.3 2.4 0 1.4 0.1 1.2 0.2 1.2 0.5 1.2 0.7 0.9 1.3 1.2 0.4 0.3 0.3 0.6 0.1 0.7 0.3 0.8 0.5 0.7 1.6 1.4 0.4 1 0 1.9-0.7 2.1-0.5 2.4-1 1.6-0.3 1-0.1 1.1 0.7 2.7 0.2 1.8 0 2.3 0.1 1.6 0.5 1.5 0.4 1.1 0.3 1.4-0.4 1.1-2.3 3.1-0.9 0.9-1.1 0.6-1.3 0.3-1.2 0.1-1.2 0.4-1.1 0.8-1.1 1.3-1.1 1.9-0.3 1.1 0.1 1 0.7 0.6 0.9 0.5 1.9 0.7 0.7 0.4 0.5 0.6 0.6 0.9 0.6 0.6 0.7 0.5 1 0.2 6.8 0-7.4 6.2-2 3.2 0 1 0.5 3.3 0.4 1.3 1 1 1.3 0.5 3.6 0.3 1.6 1 1.5 1.5 1.7 3.6 1.2 1.7 2.1 2.4 0.4 1.8 0.2 2.6 0.6 1.7 0.7 1.4 0.9 1.2 1 1.1 1.1 0.6 3-0.1 1.5 0.2 4.2 2.1 1.3 0.5 1.4 0.3 1.4 0.2 1.4-0.1 2.7-0.7 1 0 1.2 0.6 0.3 0.5 0.1 0.4-0.1 0.3-0.2 0.3-1.8 1.6-0.9 1.2-0.9 2.6-0.3 0.9-0.6 0.6-0.6 0.3-2.2 0.3-2.4 0.6-1 0.4-0.9 0.5-1.9 1.5-1.2 0.8-3.7 1.3-3.4 0.5-0.9 0.4-0.8 0.6-0.7 0.6-0.6 0.7-3.1 5.3-2.6 3.5-0.9 0.3-1 0.5-0.4 0.4-0.4 0.2-0.5 0-0.7-0.4-2.5-2.2-1-0.6-0.8-0.2-0.6 0.1-1.3 0.1-0.5 0.2-0.5 0.3-0.4 0.3-0.9 0.7-0.5 0.3-1.2 0.4-0.6 0.1-0.7 0-1.6-0.1-1.5-0.2-1.3-0.4-0.5-0.3-0.6-0.3-0.6-0.6-1.3-1.4-2-3-0.7-0.8-0.5-0.3-0.6-0.3-0.8-0.1-0.7 0-1.4 0.1-0.5-0.5-0.4-1.3 0.1-3.4 0.3-1.4 0.5-0.9 0.4-0.4 0.4-0.4 0.2-0.5 0-0.9-0.3-0.9-0.8-1.5-1.4-1.8-0.3-0.8-0.2-1.3-0.1-6.3 0.3-1.4 0.2-0.6 0.3-0.6 0.4-0.4 1.1-1.3 0.3-0.5 0.3-0.6 0.2-0.6 0.1-0.8-0.6-0.8-0.8-0.6-5.1-1.1-1.7-0.4 0.5-0.3 1-1.9-0.2-2.3-1.3-0.5-1.9 0-4.4-1.5-8.4 2.5-4-1.4-2.3-3.5-2-8.1-1.4-3.8-1.3-1.6-3.2-3.1-0.9-1.9-0.1-3.9 0.4-3.9 4.5-10.6 1-6 0.7-1.8 0.4-1.9-0.5-1.6-1.3-2.6 0-1.8 1.5-4.4 0.4-4.3-1-14.9-0.3-4-0.7-1.9-1.5-1.8-1.9-0.3-2 0.3-1.9 0-1.9-0.8-0.4-0.9 1.7-3.6 0.8-2.2 0.1-1.4-0.5-9.9 1-1.6 2.9 2.4 1-1.6 0-1.5-0.2-1.5 0.2-1.7 0.5-0.6 1.8-0.7 0.6-0.6 0.1-0.7-0.4-1.3 0.2-0.8 8-12.3 1.6-3.3 1-3.5-3.7-6.4-2.5-2.6-2.1-2.9-1.7-3.2-1.1-3.5-0.3-3.4z" id="MWMZ" name="Mzimba" @mouseover="handleDistrictHover('Mzimba')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Mzimba')"
  </path>
  <path d="M412.2 392.9l1.7 0.4 5.1 1.1 0.8 0.6 0.6 0.8-0.1 0.8-0.2 0.6-0.3 0.6-0.3 0.5-1.1 1.3-0.4 0.4-0.3 0.6-0.2 0.6-0.3 1.4 0.1 6.3 0.2 1.3 0.3 0.8 1.4 1.8 0.8 1.5 0.3 0.9 0 0.9-0.2 0.5-0.4 0.4-0.4 0.4-0.5 0.9-0.3 1.4-0.1 3.4 0.4 1.3 0.5 0.5 1.4-0.1 0.7 0 0.8 0.1 0.6 0.3 0.5 0.3 0.7 0.8 2 3 1.3 1.4 0.6 0.6 0.6 0.3 0.5 0.3 1.3 0.4 1.5 0.2 1.6 0.1 0.7 0 0.6-0.1 1.2-0.4 0.5-0.3 0.9-0.7 0.4-0.3 0.5-0.3 0.5-0.2 1.3-0.1 0.6-0.1 0.8 0.2 1 0.6 2.5 2.2 0.7 0.4 0.5 0 0.4-0.2 0.4-0.4 1-0.5 0.9-0.3-1.5 9.2-0.1 3.7 0.3 1.1 0.5 1.3 0.6 0.6 0.8 0.4 0.9 0 6.5-0.8 0.9 0 1 0.2 1.1 0.3 1.4 0.9 1 1.3 1.2 2 3.8 4.4 0.5 1.5 0.2 0.7-0.2 0.3-1.2 0.6-4.5 3.7-0.3 0.4-0.5 0.8-0.8 2.2-0.3 0.4-1.5 1.4-8.3 4.1-0.9 0.8-1.1 1.1-0.2 0.9-0.6 1.3-0.7 0.6-1.1 0.7-1.7 0.7-1.5 1.2-0.7 0.8-1.4 2.7-2.3 2.6-1.3 1.1-1.1 0.6-0.8 0.4-0.4 0.6-0.3 0.8-0.4 0.5-0.5 0.3-2 0.3-1.9 0.7-1.7 1-1.8 0.8-1.7 0.2-1.8 1.8-1 2.5-0.4 0.9-0.5 0.6-1 0.7-1.7 0.9-0.5 0.4-1.2 2.4-0.9 0.7-0.9 1.2-0.7 0.5-0.7 0.2-0.7 0-0.7-0.1-0.5-0.2-0.4-0.1-0.4-0.3-0.8-0.7-0.4-0.4-0.5-0.4-0.7-0.2-1 0-0.5 0.4-0.4 0.5 0 0.7 0.2 0.5 0.3 0.5 0.6 1 0.3 0.5 0.2 0.6 0 0.7-0.1 0.6-0.9 2.7-0.4 0.7-1.4 2.3-0.8 2.7-2.1 4-1 1.3-0.6 0.3-1.1 0.3-0.7 0.5-1 2.4-0.2 0.9 0.2 0.6 0.3 0.5 0.3 0.8 0 1.1-0.2 1.9-0.4 1-0.4 0.7-3.3 2.8-2.1 2.3-4.6-5.2-3.1-1.9-1.2-1.1-1.6-1.9-4-3.8-1.4-1.8-1-1.9-1.3-3.3-1.8-4-0.6-1.4-0.1-1.5 0.5-2.4 0-1.2-0.6-1.7-0.6-0.8-0.7-0.3-25.1 1.5-1.6 0.2 1.6-6.6 2.1-4.6 2.8-3.6 3.5-1 0.6-1.6-0.4-1.4-1.8-2.7-0.9-2-0.5-1.9-0.1-2.1 1.8-12.9 3.1-7.2 0.5-3.2-0.9-2.9-2.8-2.6-3.1-1.9-0.7-1.3-0.7-8.6 0.4-2 1.5-3.2 4.1-6.1 3.5-7 1.2-1.6 1.6-1.5 1-0.4 0.8 0.2 0.6 0.7 0.5 0.9 0.8 0.7 1-0.4 1-0.9 0.9-0.5 1.8-0.5 0.9-0.1 1.1 0.3 0.8 0.8 1.3 2.6 0.5 0.6 1.2-0.1 0.5-0.6 0.4-0.8 0.7-0.6 0.5-0.4 0.5-0.5 0.7-0.4 1.2-0.4 1.6-1.1 1.9-4 1.3-1.5 0.9-0.4 3-0.5 1.5 0.1 1.1 0.6 0.9 0.6 0.9 0.3 2.6-0.6 2.6-1.6 2.3-2.4 1.8-2.7 1.3-1.2 3.4-1.4 1.1-1.4 0-2.9 0.6-0.8 1.7-0.3 0.8-2 3-1.8z" id="MWKS" name="Kasungu" @mouseover="handleDistrictHover('Kasungu')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Kasungu')"
  </path>
  <path d="M342.8 507.2l1.6-0.2 25.1-1.5 0.7 0.3 0.6 0.8 0.6 1.7 0 1.2-0.5 2.4 0.1 1.5 0.6 1.4 1.8 4 1.3 3.3 1 1.9 1.4 1.8 4 3.8 1.6 1.9 1.2 1.1 3.1 1.9 4.6 5.2-0.7 1.7-0.8 1-0.4 0.4-0.7 1-0.5 1.1-0.4 1.4-0.2 0.5-1.6 1.8-0.3 0.5-0.2 0.5 0 0.7 0.3 0.9 0.1 0.9-0.2 1.3-0.4 0.8-0.4 0.7-0.7 0.9-0.2 0.6-0.2 0.8-0.2 3-0.2 1-0.3 0.7-0.8 0.9-0.2 0.8 0.2 1 1.1 2.3 1 1.3 1 1 0.9 0.7 0.7 0.9 0.5 0.8 1.7 4.4 2.3 3.5 0.5 1.2 0.2 1.4-0.2 1.6-0.4 0.9-0.1 0.8 0 1.1 0.8 3.6-0.2 1.8-0.9 2.7-0.2 1.4 0.2 1.6 1.8 4.8 1.3 5.9-0.3 2.1-0.3-0.6-0.8-0.7-1-0.4-1.7-1.1-0.9-1.1-2.9-4.7-0.5-2.1 0.6-5.9-1.2-3.3-2.6-2-6.3-3.5-1.9-2.4-3.6-6.7-1.6-1.4-1.1 0.7-1.1 3-1.1 1-3.9 1.1-1.6 0.9-1.6 1.7-3.5 5.9-2.1 0.5-2.7-3.5-0.6-1.8 0.4-5.9 0.2-0.7 0-0.6-0.7-1-0.9-0.5-2 0.2-1-0.8-0.7-1.9-0.2-1.7-0.5-1.8-5.7-7-1.6-1.5-3.5-1.3-4.2-0.9-3.3-1.4-0.7-3.2 1.3-1.3 4.1-2 1-1.3-0.6-1.4-4.3-6.1-3.1-1.4-4.1 0-3.7-0.8-1.3-3.8 0.5-2.4 1.1-0.9 1.6 0.1 2.2 0.8 1.4-0.3 3.1-2.6 1.5-1 4.2-0.6 1.5-1.1 0.5-2.6-0.1-2.1 0.3-1.9 0.9-1.3 2.1-0.3 3.3-1.7 2-4.5 1.5-6.3z" id="MWMC" name="Mchinji" @mouseover="handleDistrictHover('Mchinji')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Mchinji')"
  </path>
  <path d="M449.7 366l2.1-0.5 1 0 1.1 0.4 2.5 2.2 1.5 1 4.6 2 8.4 2 0.2 0 0 0.1 1 7.6 2.1 5.6 0.2 1.1 0 1.3 0.4 1.1 2 0.8 0.6 0.9 0.2 1.1-0.2 0.9 2.6 0.6 2.2-0.3 2.3 0 2.6 1.7 3.6 10.4 0.4 2.6-0.1 1.1-0.7 1.1-1.1 1.2-0.5 1.1-0.3 2.9 0 2.8 0.5 3 1.8 5.4 2.4 4.3 1.7 2 4.3 1.9 0.1 2.5-1.5 5.7 0.7 2.5 3.5 3.1 1.2 2 0.1 1.5-0.7 2.8 0.3 1.4 0.8 0.8 0.9-0.7 0.6-1.4 0.3-1.1 0.3 1.6-0.8 3.5-0.2 2 1.3 5.9 0.2 19 1.1 8.1-0.5 3.3-2.5 3.5-1.4 3.3 0.4 3.9 1.4 3.8 0.6 1-0.3 0-9.8 5.6-4.7 2.1-2.8 0.5-1.4 0.2-3.4 1.6-1-15.5-2.4-9 0.2-1.8 0.4-1.5 0.5-1.1 0.1-0.9-1-6.2-0.3-1.2-0.6-0.9-1.3-0.2-1.1 0-0.9-0.2-0.7-0.5-0.4-1.1-0.1-1.2 0.2-1 0.3-1 0.2-0.9-0.3-0.6-0.5-0.1-4.8 1.5-0.5 0.3-0.2 0.5-0.8 2.9-0.4 1-0.5 0.6-0.8 0.7-0.9 0.2-0.9-0.3-1-0.7-0.8-0.8-0.6-0.7 0.1-2-0.1-1.1-1.3-2.3-0.6-0.9-0.6-0.6-0.8-2.3-0.1-5.8 1.5-1.4 0.3-0.4 0.8-2.2 0.5-0.8 0.3-0.4 4.5-3.7 1.2-0.6 0.2-0.3-0.2-0.7-0.5-1.5-3.8-4.4-1.2-2-1-1.3-1.4-0.9-1.1-0.3-1-0.2-0.9 0-6.5 0.8-0.9 0-0.8-0.4-0.6-0.6-0.5-1.3-0.3-1.1 0.1-3.7 1.5-9.2 2.6-3.5 3.1-5.3 0.6-0.7 0.7-0.6 0.8-0.6 0.9-0.4 3.4-0.5 3.7-1.3 1.2-0.8 1.9-1.5 0.9-0.5 1-0.4 2.4-0.6 2.2-0.3 0.6-0.3 0.6-0.6 0.3-0.9 0.9-2.6 0.9-1.2 1.8-1.6 0.2-0.3 0.1-0.3-0.1-0.4-0.3-0.5-1.2-0.6-1 0-2.7 0.7-1.4 0.1-1.4-0.2-1.4-0.3-1.3-0.5-4.2-2.1-1.5-0.2-3 0.1-1.1-0.6-1-1.1-0.9-1.2-0.7-1.4-0.6-1.7-0.2-2.6-0.4-1.8-2.1-2.4-1.2-1.7-1.7-3.6-1.5-1.5-1.6-1-3.6-0.3-1.3-0.5-1-1-0.4-1.3-0.5-3.3 0-1 2-3.2 7.4-6.2z" id="MWNK" name="Nkhotakota" @mouseover="handleDistrictHover('Nkhotakota')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Nkhotakota')"
  </path>
  <path d="M566.2 526.5l-1.1 4.8-0.2-2.3 0.2-1.8 0.3-1 0.7 0.3 0.1 0z m-83.3-3.1l3.4-1.6 1.4-0.2 2.8-0.5 4.7-2.1 9.8-5.6 0.3 0 5.6 9.3 2.4 5.4 2.2 2.6 1 1.5 1.1 1.1 1.6 0.5 2.1-0.4 3.5-1.3 1.8 0.2 1.5 1 0.9 1.4 1.5 3.3 1.5 1.7 3.4 3 0.7 1.7 0.8 1.2 1.8 1.3 1.3 1.6-0.5 1.9-1.3 2.1 0 1.7 0.4 1.6-0.2 2.2-0.6 0.9-1.9 1.5-0.7 0.9-0.1 1.1 0.8 2 0.2 0.9-2 5.5-0.8 1.3-2.9 3.2-1.9 2.5-0.5 3 1.9 10.2 0.3 0.9-0.6 0.3-0.5 0.3-0.6 0.4-0.8 0.6-2.4 2.6-0.6 0.5-0.5 0.2-1.3-0.9-1.9-1.9-3.6-5.4-3.8-6.9-1.6-1.9-7-6.9-5-7.1-1.2-0.4-1.4 0-0.9 0.2-0.9 0.3-4 2-1.1 0.4-1-0.1-0.6-0.5-0.2-0.8 0.1-0.7 0.5-0.9 0.7-0.9 1.5-1 3.2-1.3 1.3-1.3 0.2-3.3 0.5-0.5 0.1-0.1 0.2-0.2 0.5-0.3 0.7-0.3 1.1-0.2 1.7-0.6 0.5-0.3 0.6-0.4 0.3-0.5 0.2-0.6 0.1-0.8-0.1-0.4-0.5-0.6-1-0.5-0.7-0.7-0.3-1 0-0.7 0.1-1.1 0-1.3-0.3-1.1-0.8-0.6-0.7-0.1-0.7 0.3-4.1 2.2-1.1 0.2-1 0-0.8-0.2-1-0.6-0.9-0.8-5.2-5.1-0.7-0.6-1.4-0.8-0.1-0.4 0.4-0.8 0.6-1 0.3-1.8 0-1.4-1.8-8.6 2-1.8z" id="MWSA" name="Salima" @mouseover="handleDistrictHover('Salima')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Salima')"
  </path>
  <path d="M566.2 526.5l3.4 2.2 11.7 10.7 10 9.2 9.9 11.9 12.3 14.7 10.4 12.5 9.7 11.7 7.7 14.8 9.9 12.6 11.9 15.2 4.2 5.2-0.1 0.1-3.1 2.5-2.6 1-3.4 0.1-2.8 0.4-5.6 1.3-2.5 1-1.6 1-1.7 1.9-0.3 0.6 0 0.8 0.5 4-0.1 1.6-0.5 1.6-1.2 1.6-1.2 0.6-1.2 0.5-1.7 0.9-3 3.2-1.6 0.8-1.8 0.4-1.7-0.4-5.8-2-1.3-0.2-0.8-0.4-0.7-0.6-1.2-2-1.3-1.4-1.9-1.7-0.7-0.5-0.6-0.3-0.5-0.2-0.8-0.1-0.3 0.2-0.3 0.5-0.2 1.2-0.2 0.5-0.6 0.9-0.4 1.1 0 0.7 0 0.6 0.1 0.6 0.5 1.5 0.1 0.3-0.2 0.9-31.3 0-1.1 0-3.9-2.9-3.4-1.6-1.5-1.4-13.3-17.8-3.1-9.4-1.7-8.3-0.7-11.9 0-4.9 0-0.2 1-0.3 1.7-0.3 2-0.8 1.8-1.2 0.8-1.3 0.1-1 0.5-0.6 1.3-0.8 0.2-1-0.7-1.2-0.9-1.2-0.5-1.1 1.1-3.1 2.6-2.9 2-2.8-0.7-2.8-1.8-3.3 0.4-3.1 2.2-1.5 3.4 1 1.5 1.2 2.5 2.7 1.6 0.9-1 4.1 0.9 4.8 2.6 3.3 3.7-0.9 0.5 0.6 1.4 1.2 0.5 0.6 2.6-0.4 2.8 2.5 2.2 3.8 0.9 3.4 0.7 1.1 2.8 3.4 0.4 0.7 2 0.7 1.3 1.6 2.2 3.4 5.5 4.8 0.2 0.5 0.3 0.7 0.4 0.8 0.6 0.4 1-0.1 1.7-1.2 0.9-0.3 0.8-0.8 0.9-2 0.6-2 0-1.2-1.8-2.8-4.7-9.6-1.2-3.6-0.4-4.2-3.6-5.6-1-2 0.1-1.9 0.4-2 0.1-1.8-1.3-3.1-4.1-6.4-0.9-3.3-0.2-4.1-0.4-2.2-0.8-2.7-0.1-2-0.4-0.7-1.4-1.7-1.3-1.9-1.4-4.1-0.6-3.3-1.6-2.2-4.3-0.9-11.8 0.4-1.7-0.2-2.1-1-2.6-2.7-0.6-3.1 0.8-7.5-0.5-5.4 1.1-4.8z" id="MWMG" name="Mangochi" @mouseover="handleDistrictHover('Mangochi')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Mangochi')"
  </path>
  <path d="M667.3 647.2l4.1 5.3 5.6 5.7 1.3 1.7 0.6 2 1.2 24.7 0.8 1 1.4 0.2 2.5 0-4.3 10.1-3.1 7.5-5.5 13.1-0.8 2.9 0 2.8 0.5 1.9-29.4-0.5-0.3 0.2-0.5 0.3-0.2 0.3-1.1 0.9-1.2 0.8-1.5 0.6-2.4 0.8-1.5 0.2-1.3 0-2.1-0.7-5.8-2.4-2.3-0.5-1.3 0.1-1.3 0.4-0.7 0.5-2.2 2.3-1.1 0.7-1.1 0-1.4-0.2-1.9-0.7-1.9-0.4-1.1 0.2-0.9 0.7-1 1-1.4 0.9-1.1 0-0.8-0.6-0.5-0.7-0.9-2 0.9-0.9 0.9-1.9 0.4-2.5 1.6-4.4 0.7-3.1 2-4.2 0.3-1.1 0.1-1.9 0.3-1 0.8-1.4 3.4-5.5 1.7-1.2 1.2-1 0.8-2.6 1.1-9.5-0.2-5.6-1.3-5.1-2.7-2.9-0.4-0.2 0.2-0.9-0.1-0.3-0.5-1.5-0.1-0.6 0-0.6 0-0.7 0.4-1.1 0.6-0.9 0.2-0.5 0.2-1.2 0.3-0.5 0.3-0.2 0.8 0.1 0.5 0.2 0.6 0.3 0.7 0.5 1.9 1.7 1.3 1.4 1.2 2 0.7 0.6 0.8 0.4 1.3 0.2 5.8 2 1.7 0.4 1.8-0.4 1.6-0.8 3-3.2 1.7-0.9 1.2-0.5 1.2-0.6 1.2-1.6 0.5-1.6 0.1-1.6-0.5-4 0-0.8 0.3-0.6 1.7-1.9 1.6-1 2.5-1 5.6-1.3 2.8-0.4 3.4-0.1 2.6-1 3.1-2.5 0.1-0.1z" id="MWMH" name="Machinga"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M511 632l-0.9-1.4-3.2-1.7-1 0.2-0.9 0.5-0.8 0.7-0.9 0.6-0.9 0.2-1.8-0.2-0.9 0.1-11.3 4-8.3 0.3-3.6 1.5-0.9 1.2-1.3 3-0.9 0.6-12-1.6-3.3 0-3.1 0.8-6.7 4-3.2 1.2-3.2-0.3-6.1-4.8-2.5 0.8-1.7 2.7-1 3.4 0 4.1-0.3 2.1-1.2 0.8-2-0.7-1.3-1.2-1-1.5-0.7-2 2-1 1-1.6 1.2-0.7 1-0.9 2.5-4 0.4-1.3 0.3-5.1 0.4-1.8 0.5-1.7 0.9-1.4 1-1.2 1.5-0.9 7.9-3.8 1.3-1 1.3-1.4 2.4-1.7 1.4-0.5 2.1 0.2 1.1-0.3 2.7-1.1 1.1-0.2 1 0 1-0.5 0.9-1 0.6-1.9 0.5-5.5 0.5-1.6 0.9-1.2 1.6-0.9 4.4-0.5 1.2-0.6 1.4-1.2 1.4-1.5 1.3-1.9 1.7-1.3 1.8-1.8 1.1-3.3 0.7-1.4 1-1.5 1.7-1.9 1.4-2.1 1.7-1.6 1-1.5 3.1-5.9 0.5-1.4 0.5-1.2 0.6-0.8 1.4-0.7 2.9-2.1 2.1-2 2-3.4 5 7.1 7 6.9 1.6 1.9 3.8 6.9 3.6 5.4 1.9 1.9 1.3 0.9 0.5-0.2 0.6-0.5 2.4-2.6 0.8-0.6 0.6-0.4 0.5-0.3 0.6-0.3 0.3 0.7 4 4.8 0.7 1.2 0.3 1.6 0.7 1.9 0.9 1.8 0.9 1.2 2 1.5 1.6 0.5 1.8 0.1 2 0.8 1.9 1.7-0.1 1.5-0.6 1.5 0.3 1.8 1.6 1.1 1.8-0.4 1.9-1 0.8-0.3 0 0.2 0 4.9-9.3 5.7-8.5 6.4-6.5 2.7-1.8 0.4-1.2-0.1-1.3-1.2-1.9-0.8-0.8-0.6-0.7-0.5-0.8-0.3-1-0.3-1.7-0.2-2.7-0.5-0.6 0-0.6 0.2-1.2 0.9-1.4 1.2z" id="MWDE" name="Dedza"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M391.6 539.7l2.1-2.3 3.3-2.8 0.4-0.7 0.4-1 0.2-1.9 0-1.1-0.3-0.8-0.3-0.5-0.2-0.6 0.2-0.9 1-2.4 0.7-0.5 1.1-0.3 0.6-0.3 1-1.3 2.1 1.5 0.6 0.5 0.5 0.9 0 0.9-0.7 4.1 0 1.8 1.9 8.7 0.2 1.6 0.5 1.7 1.1 1.7 5.3 2.7 6.7 0.1 18-5 1.1-0.1 0.6 0.3 0.2 1 0.1 1.1 0.3 1.1 0.7 2.6 0.4 2.8 0.5 1.5 1.4 1.1 2 0.7 4.1-0.1 5.4-0.8 1.6-0.1 1.8 0.1 2.7 0.7 3.4 1.4 2.3 0.6 0.7 0.3 1.4 0.9 0.9 0.8 0.4 0.4 0.6 0.9 1 1 1.7 0.9 5.9-0.7 2.3-0.5 2.1-0.9 1.4-0.8 1.3-0.6 1.5-0.3 4.1 0.5 1.1 0 3.2-1.8-0.2 3.3-1.3 1.3-3.2 1.3-1.5 1-0.7 0.9-0.5 0.9-0.1 0.7 0.2 0.8 0.6 0.5 1 0.1 1.1-0.4 4-2 0.9-0.3 0.9-0.2 1.4 0 1.2 0.4-2 3.4-2.1 2-2.9 2.1-1.4 0.7-0.6 0.8-0.5 1.2-0.5 1.4-3.1 5.9-1 1.5-1.7 1.6-1.4 2.1-1.7 1.9-1 1.5-0.7 1.4-1.1 3.3-1.8 1.8-1.7 1.3-1.3 1.9-1.4 1.5-1.4 1.2-1.2 0.6-4.4 0.5-1.6 0.9-0.9 1.2-0.5 1.6-0.5 5.5-0.6 1.9-0.9 1-1 0.5-1 0-1.1 0.2-2.7 1.1-1.1 0.3-2.1-0.2-1.4 0.5-2.4 1.7-1.3 1.4-1.3 1-7.9 3.8-1.5 0.9-1 1.2-0.9 1.4-0.5 1.7-0.4 1.8-0.3 5.1-0.4 1.3-2.5 4-1 0.9-1.2 0.7-1 1.6-2 1-1.6-4.4-1-1.5-1.3-1-3-1.5-1.3-1-1-1.5-0.6-1.5-0.7-1.4-1.6-1.3-4.8-2.2-1.4-1.2-2.1-2.8-5.8-11.8-2-2.8-1.6-3.1 0.3-2.1-1.3-5.9-1.8-4.8-0.2-1.6 0.2-1.4 0.9-2.7 0.2-1.8-0.8-3.6 0-1.1 0.1-0.8 0.4-0.9 0.2-1.6-0.2-1.4-0.5-1.2-2.3-3.5-1.7-4.4-0.5-0.8-0.7-0.9-0.9-0.7-1-1-1-1.3-1.1-2.3-0.2-1 0.2-0.8 0.8-0.9 0.3-0.7 0.2-1 0.2-3 0.2-0.8 0.2-0.6 0.7-0.9 0.4-0.7 0.4-0.8 0.2-1.3-0.1-0.9-0.3-0.9 0-0.7 0.2-0.5 0.3-0.5 1.6-1.8 0.2-0.5 0.4-1.4 0.5-1.1 0.7-1 0.4-0.4 0.8-1 0.7-1.7z" id="MWLI" name="Lilongwe" @mouseover="handleDistrictHover('Lilongwe')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Lilongwe')"
  </path>
  <path d="M568.7 902.8l0.8-1.3 0.1 0 2.4-3.8 1.9-1.8 2.1-1.3 1.4-0.6 0.6-0.7 0.1-0.7-0.3-0.9-0.1-1.3 0.6-2 0.7-1.3 6.2-6.9 2.2-2.1 0.8-0.5 0.4-0.5 0.3-0.8 3.7-17.5 6.4 7 0.9 0.4 1.1 0.2 0.4-0.8 2-0.4 5.3 1.6 0 0.1-0.4 1.6 0 4.7-0.6 2.1-1.6 1.7-7.9 5.3-1.5 1 1.9 5.3 1.8 3 0.5 1.2 0.7 1 1.2 0.4 1.1 0.2 2.5 1 0.7 0.4 0.5 0.5 0.6 1.3 0.5 0.6 0.3 0.2 1 0.5 0.3 0.2 2.7 3 0.4 0.6 0.3 7.9 0.5 2.4 2.3 4.6 0.5 3-2.8 2.4-0.3 2.5 0.3 4.6-0.4 0.5-0.7 0.5-0.5 0.7 0 0.7 0.5 0.6 3.7 2.2 0.7 1-0.6 1.5-1.2 2.2-0.1 1.9 1 4.5 0.1 2.4-0.3 2-0.6 1.7-0.8 1.3-0.1 0-6.5 0.7-11.5-0.3-6-1-1.7-1.7 0.4-3.1-3.8-5.7 0.9-3.7 2.5-2.1 2.9-1.4 2.5-1.8 1.3-3.3 0.4-3.8-0.1-4.4-1-3.7-2.6-1.9-3.8-0.1-3.4 0.3-3.2-0.5-3.4-2.7-2.1-2.8-0.9-1.1-1.6-1.1-0.8-0.3-1.7-0.3-0.8-0.5-0.5-0.9-0.4-2.3-0.5-1-0.8-0.5z" id="MWNS" name="Nsanje" @mouseover="handleDistrictHover('Nsanje')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Nsanje')"
  </path>
  <path d="M568.7 902.8l-1-0.8-2-0.9-1.7-1-1.2-1.8-0.8-2.6-0.9-1.6-5.3-4.6-1.2-1.6-2-3.9-1.5-1.7-7.2-3.8-0.9-0.4-0.7-0.5-1.4-3.5-0.6-1.1-0.7-0.9-3.7-2.8-1.5-1.4-1.2-1.8-3.2-8.3-2.5-2.6-5.1-0.8-3.9-0.1-2.2-2.3-4.7-10.4 0.4-4 2.3-7.7-0.5-3.3-2-2.7-9.5-10.1-1.6-1-3.8-1.9-1.4-1.2-1.3-3.3-0.2-4.2 0.6-4.2 1.2-2.9 3.3-3.6 2-1.5 1.9-1 2.4-0.7 1.2-0.7 0.1-0.1 1.6 0.7 16.1 6.9 4.5 1.5 24.2 0.6 11.6 1.1 1.4 0.3 0.5 0.4 0.2 0.5 0.6 1.6 0.3 0.6 0.2 0.6 0 0.8-0.4 1-1.3 2.4-0.4 1.2 0.2 2.3-0.1 1-1.8 3.3 0 1.4 0.5 0.5 1.1 0 1.2-0.1 1.2 0.3 0.4 0.6-0.1 0.6-0.8 1.2-0.1 0.7 0 1 0.4 1.8 0.4 0.7 0.3 0.2 0.7-0.6 6.5 10.6 15.3 17.6 0.1 0.9 0.1 1.2-0.2 0.9 1.5 5-3.7 17.5-0.3 0.8-0.4 0.5-0.8 0.5-2.2 2.1-6.2 6.9-0.7 1.3-0.6 2 0.1 1.3 0.3 0.9-0.1 0.7-0.6 0.7-1.4 0.6-2.1 1.3-1.9 1.8-2.4 3.8-0.1 0-0.8 1.3z" id="MWCK" name="Chikwawa" @mouseover="handleDistrictHover('Chikwawa')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Chikwawa')"
  </path>
  <path d="M506.7 787.5l7-9.9 1.4-3.8 0.3-4.7 13.5 1.5 13.5 1.4 12.2 1.3 0.3 7.4-0.2 0.8-0.6 0.9-0.7 0.8-1.8 1 0 1.5 0.8 2.7 0.7 8.8-24.2-0.6-4.5-1.5-16.1-6.9-1.6-0.7z" id="MWMW" name="Mwanza" @mouseover="handleDistrictHover('Mwanza')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Mwanza')"
  </path>
  <path d="M515.4 769.1l-1-7.1 0-4 1.4-2 2.1-1 2.2-3.7 2.3-1.4 0.8-1.5 0.5-2.9 0.6-1.5 1.3-1.8 1.4-0.9 1.5-0.8 1.5-1.2 2.1-3.1 0.4-3-1.1-8.4 1.6 0.1 5.3 1.1 6.8 2.1 0.5 0 1.9-0.3 0.9 0.1 0.9 0.2 1.6 0.6 4.5 0.8 1.7 0.6 1.4 0.6 0.9 0.8 1 1 0.5 1.6 0.3 1.3 0.1 1.2-0.1 0.7-0.3 1.2 0.1 0.6 0.2 0.4 0.8 0.2 0.5 0 1.3-1.5 24.1 1.3-5 3.1-0.3 0.2-2.1 1-3.6 0.4-1.1 0.4-3.2 2.7-1.1 0.5-1.8 2.8-4.2 12.3-1.7 2.7-2 0.8-5.6 3.6-1.3 1.3-0.3 2-12.2-1.3-13.5-1.4-13.5-1.5z" id="MWNE" name="Neno" @mouseover="handleDistrictHover('Neno')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Neno')"
  </path>
  <path d="M531.4 724.8l-1.2-9.1 0.2-2 1.1-1.3-0.3-1.3-0.7-1.5-0.3-1.7 0.7-1.6 2.3-3.3 0.8-1.7 0.3-2-0.9-1.8-1.2-1.8-1-1.9-0.7-2.3-0.3-2 0-8.7-0.7-3.7-1.2-3.5-1.9-3.8-1.1-4 1.6-7-0.2-4-1.8-3.7-6-5.9-2.6-3.3-3.8-7.7-1.5-2.2 1.4-1.2 1.2-0.9 0.6-0.2 0.6 0 2.7 0.5 1.7 0.2 1 0.3 0.8 0.3 0.7 0.5 0.8 0.6 1.9 0.8 1.3 1.2 1.2 0.1 1.8-0.4 6.5-2.7 8.5-6.4 9.3-5.7 0.7 11.9 1.7 8.3 3.1 9.4 13.3 17.8 1.5 1.4 3.4 1.6 3.9 2.9-0.6 1.4 0.2 1.8 0.5 1.9 0 1.2-0.2 1.5-1.9 6.8-0.5 1-5.8 8.1-0.3 0.8-0.2 0.5 0.4 1.1 0.1 0.8 0 1-8.5 38-1.3 1.5-0.5 0-0.8-0.2-0.2-0.4-0.1-0.6 0.3-1.2 0.1-0.7-0.1-1.2-0.3-1.3-0.5-1.6-1-1-0.9-0.8-1.4-0.6-1.7-0.6-4.5-0.8-1.6-0.6-0.9-0.2-0.9-0.1-1.9 0.3-0.5 0-6.8-2.1-5.3-1.1-1.6-0.1z" id="MWNU" name="Ntcheu" @mouseover="handleDistrictHover('Ntcheu')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Ntcheu')"
  </path>
  <path d="M671.6 726.1l2.7 11 3.2 13.3-0.3 4.9 0 0.1-0.1 0-13 0.5-4.3 1.3-2.8 1.3-1.6 1.8-2.7 2.5-6 4-1.3 0.6-1.3 0.9-0.9 0.9-1.5 3.7-2.7 2-0.9 0.7-3.4 4-0.9 0.3-1.4 0.2-4.8 0.2-1.4 0.3-1.6 0.7-0.9 0.4-3.2 0.2-5.1-1.8-1.3-0.8-1.4-1.2-1.6-2.4-0.8-1.6-0.9-2.6-0.8-1.1-1-0.8-1.8-0.8-1.2-0.8-0.8-1.2-0.1-1.2 0.2-1.7-0.2-0.7-0.6-0.2-1.3 0.7-0.8 0.5-0.7 0.4-0.8-0.3-1.6 0.3-1.5 0.1-0.6-0.1-0.7-0.3-0.5-0.6-0.1-0.9 0.2-0.8 0.4-0.7 2.3-2.8 0.3-0.7-0.1-0.4-0.8-0.2-2 0-0.9-0.2-1.1-0.9-1.1-1.2-3.8-5.7-2.6-2.2-2.4-4.4 5-3.1 4.6-1.2 1.4-1.4 2.3-3.7 5.2-4.9 0.9 2 0.5 0.7 0.8 0.6 1.1 0 1.4-0.9 1-1 0.9-0.7 1.1-0.2 1.9 0.4 1.9 0.7 1.4 0.2 1.1 0 1.1-0.7 2.2-2.3 0.7-0.5 1.3-0.4 1.3-0.1 2.3 0.5 5.8 2.4 2.1 0.7 1.3 0 1.5-0.2 2.4-0.8 1.5-0.6 1.2-0.8 1.1-0.9 0.2-0.3 0.5-0.3 0.3-0.2 29.4 0.5z" id="MWZO" name="Zomba"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M641.7 772.9l1.5-3.7 0.9-0.9 1.3-0.9 1.3-0.6 6-4 2.7-2.5 1.6-1.8 2.8-1.3 4.3-1.3 13-0.5 0.1 0-0.7 9.4-1 14.8-0.7 10.5-1.1 17-1.2 4.4 0 0.1-0.1 0-0.1 0-0.1-0.1-0.2-0.1-0.1 0-0.3 0-0.1 0-0.2-0.1-0.5-0.4-0.2 0-0.2 0-0.2 0.1-0.1 0-0.3 0-0.1 0-0.2 0-0.4 0.2-0.3 0.1-0.1 0.1-0.1 0.1-0.2 0.1-0.5 0.3-0.1 0.1-0.2 0-0.1 0-0.1 0.1-0.3 0.1-0.2 0.1-0.1 0.1-0.1 0.1-0.2 0.2-0.1 0.1-0.2 0-0.1 0.1-0.2 0-0.5-0.2-0.4-0.1-0.2-0.2-0.9-0.8-0.8-0.4-2-1.6-1.7-1.7-1.4-1-0.5-0.1-2.8 1-4.5 4-0.6-0.7-3.3-9.2-0.2-0.5-0.2-0.1-0.1-0.1-0.1 0-0.1 0-0.2 0.1-0.2 0.1-0.1 0-0.1 0-0.1-0.1-0.1 0-0.1-0.1-0.1-0.1-0.1-0.2-0.2-0.2-0.1-0.1 0-0.2-0.2-0.1-0.2-0.3-0.1-0.1-0.1 0-0.1 0.1-0.1 0 0-0.1-0.2-0.1-0.1-0.1-0.1 0-0.1-0.1-0.2-0.2-0.2-0.1-0.2-0.2-0.2-0.4-0.6-1.8-0.4-2.3-0.8-10.9 0-0.1-0.1-0.1-0.1-0.1-0.2-0.1-0.2-0.1-0.1 0-0.3-0.1-0.1-0.1-0.1 0-0.4 0-0.1 0-0.1 0-0.1 0-0.1-0.2 0.1-0.6 0.2-0.7 1.3-2.2 0.3-0.4 0.1-0.1 0-0.1 0.2-0.2 0.1-0.3 0.6-1.1 0.1-0.1 0.2 0 0.1-0.1 0.1-0.1 0.1-0.1 0.2-0.3 0-0.1 0.1-0.2 0.4-1.2 0.2-0.6 0-0.2-0.1-0.2-0.9-1z" id="MWPH" name="Phalombe"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M620.5 781.9l3.2-0.2 0.9-0.4 1.6-0.7 1.4-0.3 4.8-0.2 1.4-0.2 0.9-0.3 3.4-4 0.9-0.7 2.7-2 0.9 1 0.1 0.2 0 0.2-0.2 0.6-0.4 1.2-0.1 0.2 0 0.1-0.2 0.3-0.1 0.1-0.1 0.1-0.1 0.1-0.2 0-0.1 0.1-0.6 1.1-0.1 0.3-0.2 0.2 0 0.1-0.1 0.1-0.3 0.4-1.3 2.2-0.2 0.7-0.1 0.6 0.1 0.2 0.1 0 0.1 0 0.1 0 0.4 0 0.1 0 0.1 0.1 0.3 0.1 0.1 0 0.2 0.1 0.2 0.1 0.1 0.1 0.1 0.1 0 0.1 0.8 10.9 0.4 2.3 0.6 1.8 0.2 0.4 0.2 0.2 0.2 0.1 0.2 0.2 0.1 0.1 0.1 0 0.1 0.1 0.2 0.1 0 0.1 0.1 0 0.1-0.1 0.1 0 0.1 0.1 0.2 0.3 0.2 0.1 0 0.2 0.1 0.1 0.2 0.2 0.1 0.2 0.1 0.1 0.1 0.1 0.1 0 0.1 0.1 0.1 0 0.1 0 0.2-0.1 0.2-0.1 0.1 0 0.1 0 0.1 0.1 0.2 0.1 0.2 0.5 3.3 9.2 0.6 0.7 4.5-4 2.8-1 0.5 0.1 1.4 1 1.7 1.7 2 1.6 0.8 0.4 0.9 0.8 0.2 0.2 0.4 0.1 0.5 0.2 0.2 0 0.1-0.1 0.2 0 0.1-0.1 0.2-0.2 0.1-0.1 0.1-0.1 0.2-0.1 0.3-0.1 0.1-0.1 0.1 0 0.2 0 0.1-0.1 0.5-0.3 0.2-0.1 0.1-0.1 0.1-0.1 0.3-0.1 0.4-0.2 0.2 0 0.1 0 0.3 0 0.1 0 0.2-0.1 0.2 0 0.2 0 0.5 0.4 0.2 0.1 0.1 0 0.3 0 0.1 0 0.2 0.1 0.1 0.1 0.1 0 0.1 0 0-0.1-0.8 3.1 0.1 1.8 0.6 3.7-0.1 1.8-1.1 2.6-1.7 1.9-8.3 5.8-1.2 0.6-1 0.1-2.2-0.4-1.2 0.1-10.8 3.3-2.8 0.3-0.6 0.7-0.3 1.8-0.7 1.1-1.5-0.1-1.5-0.7-1-0.9-0.8-2-1.9-1.3-2.3-0.6-2.3-0.2-2.6 0.7-2.1 1.5-8 7.2-0.6 0.8-1.3-1.3-0.4-0.6-0.1-1.1 0.2-1.2 0.8-2.1 0.7-1.2 0.7-0.8 0.6-0.5 1-1.1 0.5-3.4-1.4-10.8 1.5-3.8 0.5-0.6 0.6-1.3 0.1-1.7-1.6-19.7 0.1-4.4 2.2-6.7z" id="MWMU" name="Mulanje"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M608.7 866.9l0-0.1-5.3-1.6-2 0.4-0.4 0.8-1.1-0.2-0.9-0.4-6.4-7-1.5-5 0.2-0.9-0.1-1.2-0.1-0.9-15.3-17.6-6.5-10.6 3.1-0.8 0.9-0.6 2.9-2.6 1.1-1.4 2.1-4 0.8-1 0.8-0.8 0.6-0.3 0.7-0.2 2.2-0.1 1.6-0.4 12.3-7.4 4.2 0 1.1 0.3 0.7 0.6 0.8 1.1 0.8 1 4.1 3.8 0.7 1.1 0.6 1.7 0.6 2.5 0.5 1.1 0.9 1.2 1.4 1.4 2.3 1.3 1.4 10.8-0.5 3.4-1 1.1-0.6 0.5-0.7 0.8-0.7 1.2-0.8 2.1-0.2 1.2 0.1 1.1 0.4 0.6 1.3 1.3-2.5 3-2.1 4.5-0.8 5.5 0.3 1.3 1.3 3.3-0.4 1.2-2.7 3.3-0.2 0.6z" id="MWTH" name="Thyolo"> @mouseover="handleDistrictHover(name)" @mouseout="handleDistrictLeave()" @click="handleDistrictClick(name)"
  </path>
  <path d="M401.8 522.3l2.1-4 0.8-2.7 1.4-2.3 0.4-0.7 0.9-2.7 0.1-0.6 0-0.7-0.2-0.6-0.3-0.5-0.6-1-0.3-0.5-0.2-0.5 0-0.7 0.4-0.5 0.5-0.4 1 0 0.7 0.2 0.5 0.4 0.4 0.4 0.8 0.7 0.4 0.3 0.4 0.1 0.5 0.2 0.7 0.1 0.7 0 0.7-0.2 0.7-0.5 0.9-1.2 0.9-0.7 1.2-2.4 0.5-0.4 1.7-0.9 1-0.7 0.5-0.6 0.4-0.9 1-2.5 1.8-1.8 0.9 4.1 0.5 0.5 0.9 0.7 1.3 0.7 1.6 1.2 3.1 3.1 1.6 2.3 1.3 2.4 2.5 6.5 0.3 1.6 0.3 5.2 0.4 2.1 0.6 0.9 0.6 0.4 0.8 0.1 5.9 0.1 6.3-2.1 1.2-0.3 1.8 0 1.8 0.4 2.9 1.1 1.6 0.3 3.2-0.2 1.8 0 6.5 2.4 1.1 0.2 1 0 0.7-0.1 3.2-1.4 1-0.5 1.8 8.6 0 1.4-0.3 1.8-0.6 1-0.4 0.8 0.1 0.4 1.4 0.8 0.7 0.6 5.2 5.1 0.9 0.8 1 0.6 0.8 0.2 1 0 1.1-0.2 4.1-2.2 0.7-0.3 0.7 0.1 0.8 0.6 0.3 1.1 0 1.3-0.1 1.1 0 0.7 0.3 1 0.7 0.7 1 0.5 0.5 0.6 0.1 0.4-0.1 0.8-0.2 0.6-0.3 0.5-0.6 0.4-0.5 0.3-1.7 0.6-1.1 0.2-0.7 0.3-0.5 0.3-0.2 0.2-0.1 0.1-0.5 0.5-3.2 1.8-1.1 0-4.1-0.5-1.5 0.3-1.3 0.6-1.4 0.8-2.1 0.9-2.3 0.5-5.9 0.7-1.7-0.9-1-1-0.6-0.9-0.4-0.4-0.9-0.8-1.4-0.9-0.7-0.3-2.3-0.6-3.4-1.4-2.7-0.7-1.8-0.1-1.6 0.1-5.4 0.8-4.1 0.1-2-0.7-1.4-1.1-0.5-1.5-0.4-2.8-0.7-2.6-0.3-1.1-0.1-1.1-0.2-1-0.6-0.3-1.1 0.1-18 5-6.7-0.1-5.3-2.7-1.1-1.7-0.5-1.7-0.2-1.6-1.9-8.7 0-1.8 0.7-4.1 0-0.9-0.5-0.9-0.6-0.5-2.1-1.5z" id="MWDO" name="Dowa" @mouseover="handleDistrictHover('Dowa')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Dowa')"
  </path>
  <path d="M580.6 672.3l1.1 0 31.3 0 0.4 0.2 2.7 2.9 1.3 5.1 0.2 5.6-1.1 9.5-0.8 2.6-1.2 1-1.7 1.2-3.4 5.5-0.8 1.4-0.3 1-0.1 1.9-0.3 1.1-2 4.2-0.7 3.1-1.6 4.4-0.4 2.5-0.9 1.9-0.9 0.9-5.2 4.9-2.3 3.7-1.4 1.4-4.6 1.2-24.1-1.3 8.5-38 0-1-0.1-0.8-0.4-1.1 0.2-0.5 0.3-0.8 5.8-8.1 0.5-1 1.9-6.8 0.2-1.5 0-1.2-0.5-1.9-0.2-1.8 0.6-1.4z" id="MWBA" name="Balaka" @mouseover="handleDistrictHover('Balaka')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Balaka')"
  </path>
  <path d="M597.9 764.6l1.6-0.3 0.8 0.3 0.7-0.4 0.8-0.5 1.3-0.7 0.6 0.2 0.2 0.7-0.2 1.7 0.1 1.2 0.8 1.2 1.2 0.8 1.8 0.8 1 0.8 0.8 1.1 0.9 2.6 0.8 1.6 1.6 2.4 1.4 1.2 1.3 0.8 5.1 1.8-2.2 6.7-0.1 4.4 1.6 19.7-0.1 1.7-0.6 1.3-0.5 0.6-1.5 3.8-2.3-1.3-1.4-1.4-0.9-1.2-0.5-1.1-0.6-2.5-0.6-1.7-0.7-1.1-4.1-3.8-0.8-1-0.8-1.1-0.7-0.6-1.1-0.3-4.2 0-2.6-4.9-0.7-2.1-0.2-2.4 0.3-11.5-0.3-3.4-0.5-2.2-0.7-0.9-0.2-1.7 0.1-1.3 4.3-8z" id="MWCR" name="Chiradzulu" @mouseover="handleDistrictHover('Chiradzulu')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Chiradzulu')"
  </path>
  <path d="M569.3 822.6l-0.7 0.6-0.3-0.2-0.4-0.7-0.4-1.8 0-1 0.1-0.7 0.8-1.2 0.1-0.6-0.4-0.6-1.2-0.3-1.2 0.1-1.1 0-0.5-0.5 0-1.4 1.8-3.3 0.1-1-0.2-2.3 0.4-1.2 1.3-2.4 0.4-1 0-0.8-0.2-0.6-0.3-0.6-0.6-1.6-0.2-0.5-0.5-0.4-1.4-0.3-11.6-1.1-0.7-8.8-0.8-2.7 0-1.5 1.8-1 0.7-0.8 0.6-0.9 0.2-0.8-0.3-7.4 0.3-2 1.3-1.3 5.6-3.6 2-0.8 1.7-2.7 4.2-12.3 1.8-2.8 1.1-0.5 3.2-2.7 1.1-0.4 3.6-0.4 2.1-1 0.3-0.2 2.4 4.4 2.6 2.2 3.8 5.7 1.1 1.2 1.1 0.9 0.9 0.2 2 0 0.8 0.2 0.1 0.4-0.3 0.7-2.3 2.8-0.4 0.7-0.2 0.8 0.1 0.9 0.5 0.6 0.7 0.3 0.6 0.1 1.5-0.1-4.3 8-0.1 1.3 0.2 1.7 0.7 0.9 0.5 2.2 0.3 3.4-0.3 11.5 0.2 2.4 0.7 2.1 2.6 4.9-12.3 7.4-1.6 0.4-2.2 0.1-0.7 0.2-0.6 0.3-0.8 0.8-0.8 1-2.1 4-1.1 1.4-2.9 2.6-0.9 0.6-3.1 0.8z" id="MWBL" name="Blantyre" @mouseover="handleDistrictHover('Blantyre')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Blantyre')"
  </path>
  <path d="M424.2 493.5l1.7-0.2 1.8-0.8 1.7-1 1.9-0.7 2-0.3 0.5-0.3 0.4-0.5 0.3-0.8 0.4-0.6 0.8-0.4 1.1-0.6 1.3-1.1 2.3-2.6 1.4-2.7 0.7-0.8 1.5-1.2 1.7-0.7 1.1-0.7 0.7-0.6 0.6-1.3 0.2-0.9 1.1-1.1 0.9-0.8 8.3-4.1 0.1 5.8 0.8 2.3 0.6 0.6 0.6 0.9 1.3 2.3 0.1 1.1-0.1 2 0.6 0.7 0.8 0.8 1 0.7 0.9 0.3 0.9-0.2 0.8-0.7 0.5-0.6 0.4-1 0.8-2.9 0.2-0.5 0.5-0.3 4.8-1.5 0.5 0.1 0.3 0.6-0.2 0.9-0.3 1-0.2 1 0.1 1.2 0.4 1.1 0.7 0.5 0.9 0.2 1.1 0 1.3 0.2 0.6 0.9 0.3 1.2 1 6.2-0.1 0.9-0.5 1.1-0.4 1.5-0.2 1.8 2.4 9 1 15.5-2 1.8-1 0.5-3.2 1.4-0.7 0.1-1 0-1.1-0.2-6.5-2.4-1.8 0-3.2 0.2-1.6-0.3-2.9-1.1-1.8-0.4-1.8 0-1.2 0.3-6.3 2.1-5.9-0.1-0.8-0.1-0.6-0.4-0.6-0.9-0.4-2.1-0.3-5.2-0.3-1.6-2.5-6.5-1.3-2.4-1.6-2.3-3.1-3.1-1.6-1.2-1.3-0.7-0.9-0.7-0.5-0.5-0.9-4.1z" id="MWNI" name="Ntchisi" @mouseover="handleDistrictHover('Ntchisi')" @mouseout="handleDistrictLeave()" @click="handleDistrictClick('Ntchisi')"
  </path>
                                                    
                                                    </g>
                                                </svg>
                                            </div>
                                            
                                            <!-- Map Legend -->
                                            <div class="mt-4 text-sm transition-colors duration-300"
                                            :class="selectedDistrict ? 'text-gray-700 font-medium' : 'text-gray-600'">
                                            <div class="flex items-center justify-between">
                                            <span>Map of Malawi</span>
                                            <span v-if="selectedDistrict" class="flex items-center">
                                            <span class="w-2 h-2 bg-gray-700 rounded-full mr-2 animate-pulse"></span>
                                                {{ selectedDistrict }} selected
                                                </span>
                                                </div>
                                </div>
                                        </div>
                
                <!-- Map Info -->
                                <transition name="fade-slide-up">
                                    <div v-if="selectedDistrictDetails" class="text-sm text-gray-900 bg-emerald-800 border border-blue-200 rounded-md p-3 transition-all duration-300 hover:shadow-sm">
                                        <div class="font-medium text-gray-900 mb-2">Currently viewing Details for {{ selectedDistrictDetails.name }}</div>
                                        <ul class="space-y-2">
                                            <li class="flex items-start">
                                                <svg class="h-5 w-5 text-gray-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>Phone: {{ selectedDistrictDetails.Phone }}</span>
                                            </li>
                                            <li class="flex items-start">
                                                <svg class="h-5 w-5  text-gray-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>Email: {{ selectedDistrictDetails.email }}</span>
                                            </li>
                                            <li class="flex items-start">
                                                <svg class="h-5 w-5  text-gray-800 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <span>Private Bag: {{ selectedDistrictDetails.PrivateBag }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else class="text-sm text-gray-800 bg-emerald-700 border border-gray-200 rounded-md p-3 transition-all duration-300 hover:shadow-sm">
                                        <div class="flex items-center">
                                            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Select a district from the dropdown to highlight it and see all details</span>
                                        </div>
                                    </div>
                                </transition>
                                
                                <!-- Hover display for district names -->
                                <transition name="fade">
                                    <div v-if="hoveredDistrict && hoveredDistrict !== selectedDistrict" 
                                         class="mt-2 text-center text-sm font-medium text-gray-700 bg-gray-100 p-2 rounded border-l-4 border-gray-400 shadow-sm">
                                        <div class="flex items-center justify-center">
                                            <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span>{{ hoveredDistrict }}</span>
                                        </div>
                                        <div class="text-xs text-gray-500 mt-1">Click to select</div>
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
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
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

/* SVG district styling and highlighting */
path {
  transition: all 0.3s ease;
  cursor: pointer;
  stroke: #ffffff;
  stroke-width: 1px;
  fill: #6f9c76; /* Default green color */
}

path:hover:not(.highlighted) {
  fill: #059669 !important; /* Hover green - slightly darker */
  stroke: #ffffff;
  stroke-width: 2px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  transform: scale(1.02);
}

path.highlighted {
  fill: #1f2937 !important; /* Selected gray-800 */
  stroke: #111827 !important;
  stroke-width: 3px !important;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)) !important;
  z-index: 10;
}

/* Animation for smooth highlighting */
path.highlighted {
  animation: pulse 2s ease-in-out;
}

@keyframes pulse {
  0% { fill: #6f9c76; }
  50% { fill: #374151; }
  100% { fill: #1f2937; }
}

/* Fade transition for hover display */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}



</style>
