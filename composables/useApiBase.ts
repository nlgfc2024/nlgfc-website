/**
 * Returns the API base URL (origin only, no path).
 *
 * The CMS / Laravel API lives at the server root (e.g. http://host:8080/api/…)
 * while the Nuxt app is deployed under a sub-path (/nlgfc-website/).
 * This composable strips any trailing path so API calls never include
 * the app prefix.
 */
export function useApiBase(): string {
  const config = useRuntimeConfig()
  const raw = String(config.public.apiBase || config.public.baseUrl || '')
  try {
    return new URL(raw).origin
  } catch {
    // During SSR, derive from the incoming request so $fetch has an absolute URL
    if (import.meta.server) {
      try {
        return useRequestURL().origin
      } catch {
        // no request context available
      }
    }
    return raw.replace(/\/+$/, '')
  }
}
