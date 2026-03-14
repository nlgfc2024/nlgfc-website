interface DonorProjectsOptions {
  key?: string
  perPage?: number
  limit?: number
}

export function useDonorProjects(options: DonorProjectsOptions = {}) {
  const {
    key = 'donor-projects',
    perPage = 100,
    limit
  } = options

  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = useAsyncData(
    key,
    async () => {
      const baseUrl = config.public.baseUrl || 'http://localhost:8000'
      const fundingTypes = await $fetch(`${baseUrl}/api/funding-types`)
      const fundingTypesArray = Array.isArray(fundingTypes) ? fundingTypes : []

      const donorFundingType = fundingTypesArray.find((type) => {
        const name = type?.name || ''
        const slug = type?.slug || ''

        return (
          (typeof name === 'string' && name.toLowerCase().includes('donor')) ||
          (typeof slug === 'string' && slug.toLowerCase().includes('donor'))
        )
      })

      if (!donorFundingType?.id) {
        return []
      }

      const response: any = await $fetch(
        `${baseUrl}/api/projects?per_page=${perPage}&funding_type_id=${donorFundingType.id}`
      )

      const projects = Array.isArray(response) ? response : response?.data || []
      return typeof limit === 'number' ? projects.slice(0, limit) : projects
    },
    {
      default: () => []
    }
  )

  return {
    data,
    loading: pending,
    error,
    refresh
  }
}
