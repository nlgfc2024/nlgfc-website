import { ref, computed } from 'vue'

/**
 * Composable function for managing district data
 */
export const useDistrictData = () => {
  // Reactive variables
  const districts = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Load district data from JSON file
  const loadDistricts = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      // Fetch district data from public JSON file
      const response = await fetch('/districts.json')
      if (!response.ok) {
        throw new Error(`Failed to load district data: ${response.status} ${response.statusText}`)
      }
      
      districts.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Error loading district data:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Get unique regions from districts
  const regions = computed(() => {
    if (!districts.value.length) return []
    return [...new Set(districts.value.map(district => district.region))]
  })

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

  return {
    // Data
    districts,
    regions,
    districtIdMap,
    
    // State
    isLoading,
    error,
    
    // Methods
    loadDistricts
  }
}