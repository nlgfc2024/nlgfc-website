/**
 * Standard composable for fetching data from API endpoints
 * 
 * This composable provides a consistent pattern for:
 * - Data fetching with loading states
 * - Error handling
 * - Data transformation
 * - Default values
 * - Server-side rendering support
 * 
 * @example
 * ```ts
 * const { data, loading, error, refresh } = useApiData(
 *   'partners',
 *   '/api/partners',
 *   {
 *     transform: (response) => Array.isArray(response) ? response : response?.data || [],
 *     default: () => []
 *   }
 * )
 * ```
 */

interface UseApiDataOptions<T = any> {
  /**
   * Transform function to process the API response
   * Useful for normalizing different response formats
   */
  transform?: (response: any) => T;
  
  /**
   * Default value to use before data is loaded
   */
  default?: () => T;
  
  /**
   * Whether to fetch on server side (default: true)
   */
  server?: boolean;
  
  /**
   * Whether to wait for fetching to complete (default: false)
   */
  lazy?: boolean;
  
  /**
   * Whether to fetch immediately (default: true)
   */
  immediate?: boolean;
  
  /**
   * Error handler callback
   */
  onResponseError?: (context: { response: any }) => void;
  
  /**
   * Success handler callback
   */
  onResponse?: (context: { response: any }) => void;
}

/**
 * Standard API data fetching composable
 * 
 * @param key - Unique key for caching (required for useAsyncData)
 * @param url - API endpoint URL (can be relative or absolute)
 * @param options - Configuration options
 * @returns Object with data, loading, error, and refresh function
 */
export function useApiData<T = any>(
  key: string,
  url: string,
  options: UseApiDataOptions<T> = {}
) {
  const {
    transform,
    default: defaultValue,
    server = true,
    lazy = false,
    immediate = true,
    onResponseError,
    onResponse
  } = options;

  // Get base URL from runtime config (origin only, no app path)
  const baseUrl = useApiBase();
  
  // Construct full URL if relative
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  // Use useAsyncData for better SSR support and caching
  const { data, pending, error, refresh } = useAsyncData<T>(
    key,
    () => $fetch(fullUrl, { timeout: 15000, retry: 0 }),
    {
      server,
      lazy,
      immediate,
      default: defaultValue,
      transform: transform || ((response: any) => response),
      onResponseError: onResponseError || (({ response }) => {
        console.error(`[${key}] API Error:`, response?._data || response);
      }),
      onResponse: onResponse || (({ response }) => {
        // Optional: Log successful responses in development
        if (process.dev) {
          console.log(`[${key}] API Success:`, response);
        }
      })
    }
  );

  // Computed property to ensure data is always the expected type
  const transformedData = computed(() => {
    if (!data.value) return defaultValue ? defaultValue() : null;
    return data.value;
  });

  return {
    data: transformedData,
    loading: pending,
    error,
    refresh
  };
}

/**
 * Standard API data fetching composable for array responses
 * Ensures the result is always an array
 * 
 * @param key - Unique key for caching
 * @param url - API endpoint URL
 * @param options - Configuration options
 * @returns Object with data array, loading, error, and refresh function
 */
export function useApiDataArray<T = any>(
  key: string,
  url: string,
  options: Omit<UseApiDataOptions<T[]>, 'default' | 'transform'> = {}
) {
  return useApiData<T[]>(
    key,
    url,
    {
      ...options,
      default: () => [] as T[],
      transform: (response: any) => {
        // Handle different response formats
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }
    }
  );
}

