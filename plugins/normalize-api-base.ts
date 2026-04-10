/**
 * Normalise runtimeConfig.public.apiBase so it always contains only
 * the origin (scheme + host + port) — never a sub-path like /nlgfc-website.
 *
 * The CMS / Laravel API is served from the server root, whereas the
 * Nuxt front-end is deployed under /nlgfc-website/.  Without this plugin
 * every $fetch call that uses apiBase would hit the wrong URL.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const raw = String(config.public.apiBase || config.public.baseUrl || '')
  try {
    ;(config.public as any).apiBase = new URL(raw).origin
  } catch {
    // Not a valid URL – leave the value as-is (e.g. empty string in dev).
  }
})
