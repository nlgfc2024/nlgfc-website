export type Block = {
  id: string
  type: string
  order: number
  data: Record<string, any>
}

export type PagePayload = {
  slug: string
  title: string
  blocks: Block[]
  updated_at: string
}

export type PageMap = Record<string, PagePayload>

export function usePageBlocks(slug: string): ReturnType<typeof useAsyncData<PagePayload>>
export function usePageBlocks(slugs: string[]): ReturnType<typeof useAsyncData<PageMap>>
export function usePageBlocks(slugOrSlugs: string | string[]) {
  const apiBase = useApiBase()
  if (Array.isArray(slugOrSlugs)) {
    const slugs = slugOrSlugs
    return useAsyncData<PageMap>(
      `pages:${slugs.join(',')}`,
      async () => {
        const results = await Promise.allSettled(
          slugs.map((s) => $fetch<PagePayload>(`${apiBase}/api/pages/${s}`))
        )
        const map: PageMap = {}
        for (let i = 0; i < results.length; i++) {
          const result = results[i]
          if (result.status !== 'fulfilled') {
            console.warn(`[usePageBlocks] Failed to load page "${slugs[i]}":`, (result as PromiseRejectedResult).reason?.message || result)
            continue
          }
          const p = result.value
          if (!p?.slug) {
            console.warn(`[usePageBlocks] Page "${slugs[i]}" returned no slug – skipping`)
            continue
          }
          map[p.slug] = p
        }
        return map
      },
      { server: false, lazy: true, default: () => ({} as PageMap) }
    )
  }

  const slug = slugOrSlugs
  return useAsyncData<PagePayload>(
    `page:${slug}`,
    () => $fetch(`${apiBase}/api/pages/${slug}`),
    { server: false, lazy: true }
  )
}
