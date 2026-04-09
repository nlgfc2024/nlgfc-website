import { ref } from 'vue'

export const usePartners = () => {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || config.public.baseUrl || 'http://localhost:8000').replace(/\/+$/, '')
  const partners = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPartners = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data }: { data: any } = await $fetch(`${apiBase}/api/partners`)
      partners.value = data
    } catch (err: any) {
      error.value = err
      console.error('Failed to fetch partners:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    partners,
    loading,
    error,
    fetchPartners
  }
}
