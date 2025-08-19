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
  const config = useRuntimeConfig()
  if (Array.isArray(slugOrSlugs)) {
    const slugs = slugOrSlugs
    return useAsyncData<PageMap>(
      `pages:${slugs.join(',')}`,
      async () => {
        const results = await Promise.all(
          slugs.map((s) => $fetch<PagePayload>(`${config.public.apiBase}/api/pages/${s}`))
        )
        const map: PageMap = {}
        for (const p of results) {
          map[p.slug] = p
        }
        return map
      },
      { server: true }
    )
  }

  const slug = slugOrSlugs
  return useAsyncData<PagePayload>(
    `page:${slug}`,
    () => $fetch(`${config.public.apiBase}/api/pages/${slug}`),
    { server: true }
  )
}
