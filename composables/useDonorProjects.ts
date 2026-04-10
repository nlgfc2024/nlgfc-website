interface DonorProjectsOptions {
  key?: string
  perPage?: number
  limit?: number
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  timeout?: number
}

export function useDonorProjects(options: DonorProjectsOptions = {}) {
  const {
    key = 'donor-projects',
    perPage = 100,
    limit,
    server = false,
    lazy = true,
    immediate = true,
    timeout = 10000,
  } = options

  const baseUrl = useApiBase()

  const { data, pending, error, refresh } = useAsyncData(
    key,
    async () => {
      try {
        const fundingTypes = await $fetch(`${baseUrl}/api/funding-types`, { timeout, retry: 0 })
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
          `${baseUrl}/api/projects?per_page=${perPage}&funding_type_id=${donorFundingType.id}`,
          { timeout, retry: 0 }
        )

        const projects = Array.isArray(response) ? response : response?.data || []
        return typeof limit === 'number' ? projects.slice(0, limit) : projects
      } catch (fetchError) {
        console.error('[useDonorProjects] Failed to load donor projects:', fetchError)
        return []
      }
    },
    {
      server,
      lazy,
      immediate,
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
