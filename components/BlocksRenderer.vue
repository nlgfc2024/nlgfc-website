<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

type BlockItem = { id?: string; type?: string; data?: Record<string, any> }

// props
const props = defineProps<{
  blocks: BlockItem[]
}>()

/**
 * Minimal fallback component for unknown blocks.
 */
const UnknownBlock = {
  props: { type: { type: String, default: 'Unknown' } },
  template: `
    <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 my-4">
      <strong>Unknown block:</strong> {{ type }}
    </div>
  `,
}

/**
 * Helper to create lazy components with sensible defaults.
 */
function createLazy(loader: () => Promise<any>) {
  return defineAsyncComponent({
    loader,
    // show loading spinner through <Suspense> instead of an inline component
    delay: 0,
    timeout: 15000, // 15s; tweak to your infra
    suspensible: true,
    // Optional error component could go here if you prefer inline errors
  })
}

/**
 * One place to declare block → component file mapping.
 * Adding a new block = add one line here.
 */
const lazyMap: Record<string, () => Promise<any>> = {
  IconHeadingBlock: () => import('./blocks/IconHeadingBlock.vue'),
  RichTextBlock: () => import('./blocks/RichTextBlock.vue'),
  BulletListBlock: () => import('./blocks/BulletListBlock.vue'),
  BadgeRowBlock: () => import('./blocks/BadgeRowBlock.vue'),
  CardGridBlock: () => import('./blocks/CardGridBlock.vue'),
  ValuesGridBlock: () => import('./blocks/ValuesGridBlock.vue'),
  ImageZoomableBlock: () => import('./blocks/ImageZoomableBlock.vue'),
  FunctionGroupBlock: () => import('./blocks/FunctionGroupBlock.vue'),
  ProjectContentBlock: () => import('./blocks/ProjectContentBlock.vue'),
  FeaturesGridBlock: () => import('./blocks/FeaturesGridBlock.vue'),
<<<<<<< HEAD
=======
  CtaBlock: () => import('./blocks/CtaBlock.vue'),
  IframeBlock: () => import('./blocks/IframeBlock.vue'),
  ImageBlock: () => import('./blocks/ImageBlock.vue'),
  MandatePanelBlock: () => import('./blocks/MandatePanelBlock.vue'),
>>>>>>> a2e9e2f8dcde85d531de9107a5559409612887b3
}

/**
 * Build the live registry of async components.
 */
const registry: Record<string, any> = {} as Record<string, any>
for (const key in lazyMap) {
  if (Object.prototype.hasOwnProperty.call(lazyMap, key)) {
    registry[key] = createLazy(lazyMap[key])
  }
}

/**
 * Make sure we’re resilient to different “type” shapes.
 */
function extractShortType(fullType?: string) {
  if (!fullType) return ''
  // strip leading backslashes, split, filter out empties
  const parts = fullType.replace(/^\\+/, '').split('\\').filter(Boolean)
  return parts[parts.length - 1] || fullType
}

/**
 * Map API payload → block props our Vue components expect.
 * Keep this “dumb” and defensive so bad inputs don’t explode the page.
 */
function normalizeProps(shortType: string, data: Record<string, any> = {}) {
  switch (shortType) {
    case 'IconHeadingBlock':
      return {
        heading: data.heading ?? data.title ?? '',
        title: data.title ?? '',
        subheading: data.subheading ?? '',
        icon: data.icon ?? null,
        align: data.align ?? 'left',
        size: data.size ?? 'md',
        icon_bg: data.icon_bg ?? null,
        icon_color: data.icon_color ?? null,
      }

    case 'RichTextBlock':
      return {
        html: data.html ?? data.content ?? '',
        content: data.content ?? '',
        max_width: data.max_width ?? null,
        muted: Boolean(data.muted ?? false),
        lead: Boolean(data.lead ?? false),
      }

    case 'BulletListBlock': {
      const items = Array.isArray(data.items) ? data.items : (Array.isArray(data.bullets) ? data.bullets : (Array.isArray(data.list) ? data.list : []))
      const mapped = items.map((it: any) => ({
        label: typeof it === 'string' ? it : (it?.label ?? it?.text ?? ''),
        description: typeof it === 'string' ? undefined : (it?.description ?? it?.body ?? it?.subtext ?? undefined),
        icon: typeof it === 'string' ? undefined : (it?.icon ?? it?.lead_icon ?? undefined),
      }))
      return {
        style: data.style ?? 'checks',
        show_leading_icons: data.show_leading_icons ?? true,
        default_icon: data.default_icon ?? 'heroicon-o-check',
        columns: data.columns ?? '1',
        items: mapped,
      }
    }

    case 'BadgeRowBlock': {
      const badges = Array.isArray(data.badges) ? data.badges : (Array.isArray(data.tags) ? data.tags : [])
      const mapped = badges.map((b: any) => (typeof b === 'string' ? { label: b } : { label: b?.label ?? b?.text ?? '' }))
      return { badges: mapped }
    }

    case 'CardGridBlock': {
      const cards = Array.isArray(data.cards) ? data.cards : (Array.isArray(data.items) ? data.items : [])
      const mapped = cards.map((c: any) => ({
        title: c?.title ?? c?.heading ?? '',
        body: c?.body ?? c?.text ?? c?.description ?? '',
      }))
      return { cards: mapped }
    }

    case 'ValuesGridBlock':
      return {
        values: Array.isArray(data.values) ? data.values : [],
        columns_md: data.columns_md ?? 2,
        tile_bg: data.tile_bg ?? 'bg-gray-50',
        tile_border: data.tile_border ?? 'border-gray-200',
        hover_border: data.hover_border ?? 'hover:border-blue-200',
      }

    case 'ImageZoomableBlock':
      return {
        src: data.src ?? data.image ?? data.image_url ?? '',
        alt: data.alt ?? data.caption ?? '',
      }

<<<<<<< HEAD
=======
    case 'ImageBlock':
      return {
        src: data.src ?? data.image ?? data.image_url ?? '',
        alt: data.alt ?? '',
        fit: data.fit ?? 'contain',
        height: data.height ?? 'h-80',
      }

    case 'IframeBlock':
      return {
        src: data.src ?? '',
        height: Number(data.height ?? 600),
        title: data.title ?? '',
        allow_transparency: Boolean(data.allow_transparency ?? true),
      }

    case 'CtaBlock':
      return {
        title: data.title ?? '',
        body: data.body ?? '',
        link_label: data.link_label ?? 'See more',
        link_url: data.link_url ?? '#',
        link_external: Boolean(data.link_external ?? true),
        tone: data.tone ?? 'blue',
      }

>>>>>>> a2e9e2f8dcde85d531de9107a5559409612887b3
    case 'FunctionGroupBlock': {
      const rows = Array.isArray(data.functions) ? data.functions : (Array.isArray(data.items) ? data.items : [])
      const mapped = rows.map((fn: any) => ({
        title: fn?.title ?? fn?.heading ?? '',
        description: fn?.description ?? fn?.body ?? fn?.text ?? '',
        badges: Array.isArray(fn?.badges ?? fn?.tags)
          ? (fn.badges ?? fn.tags).map((b: any) => (typeof b === 'string' ? { label: b } : { label: b?.label ?? b?.text ?? '' }))
          : [],
      }))
      return {
        heading: data.heading ?? data.title ?? '',
        intro: data.intro ?? data.description ?? '',
        functions: mapped,
      }
    }

    case 'ProjectContentBlock':
      return {
        title: data.title ?? '',
        label: data.label ?? '',
        theme: data.theme ?? 'blue',
        show_header: data.show_header ?? true,
        body: data.body ?? '',
<<<<<<< HEAD
=======
        heading_level: data.heading_level ?? 'h2',
      }

    case 'MandatePanelBlock':
      return {
        icon: data.icon ?? 'heroicon-o-rectangle-stack',
        heading: data.heading ?? '',
        body: data.body ?? '',
        theme: data.theme ?? 'emerald',
        heading_level: data.heading_level ?? 'h3',
>>>>>>> a2e9e2f8dcde85d531de9107a5559409612887b3
      }

    case 'FeaturesGridBlock': {
      const features = Array.isArray(data.features) ? data.features : []
      const mapped = features.map((f: any) => ({
        title: f?.title ?? '',
        icon: f?.icon ?? 'heroicon-o-sparkles',
        icon_bg: f?.icon_bg ?? '#D1FAE5',
        icon_color: f?.icon_color ?? '#059669',
        items: Array.isArray(f?.items) ? f.items.map((it: any) => ({ label: typeof it === 'string' ? it : (it?.label ?? '') })) : [],
      }))
      return {
        title: data.title ?? 'Key Features',
        columns: data.columns ?? '2',
        features: mapped,
      }
    }

    default:
      // Pass-through for unknown types so the fallback can display something
      return data || {}
  }
}

type RenderItem =
  | { kind: 'single'; id: string; type: string; props: Record<string, any> }
  | { kind: 'group'; id: string; headingProps: Record<string, any>; bodyType: string; bodyProps: Record<string, any> }

/**
 * Build the list of render instructions (with optional grouping).
 * Defensive against missing ids / types / next item.
 */
const renderItems = computed<RenderItem[]>(() => {
  const list = Array.isArray(props.blocks) ? props.blocks : []
  const items: RenderItem[] = []

  for (let i = 0; i < list.length; i++) {
    const current = list[i] || {}
    const next = list[i + 1] || null

    const currType = extractShortType(current.type)
    const nextType = extractShortType(next?.type)

    // group: IconHeadingBlock + (RichTextBlock | ValuesGridBlock)
    const canGroup =
      currType === 'IconHeadingBlock' &&
      (nextType === 'RichTextBlock' || nextType === 'ValuesGridBlock')

    if (canGroup && next) {
      items.push({
        kind: 'group',
        id: `${current.id ?? i}__${next.id ?? i + 1}`,
        headingProps: normalizeProps('IconHeadingBlock', current.data),
        bodyType: nextType,
        bodyProps: normalizeProps(nextType, next.data),
      })
      i++ // skip next, we already consumed it
      continue
    }

    // regular single
    items.push({
      kind: 'single',
      id: String(current.id ?? i),
      type: currType,
      props: normalizeProps(currType, current.data),
    })
  }

  return items
})
</script>

<template>
  <div>
    <template v-for="item in renderItems" :key="item.id">
      <!-- grouped card -->
      <div
        v-if="item.kind === 'group'"
        class="bg-white rounded-xl shadow-sm p-8 mb-10 border border-gray-100"
      >
        <Suspense>
          <component :is="registry['IconHeadingBlock']" v-bind="item.headingProps" />
          <template #fallback>
            <div class="animate-pulse h-8 bg-gray-100 rounded w-40 mb-4" />
          </template>
        </Suspense>

        <Suspense>
          <component :is="registry[item.bodyType] || UnknownBlock" v-bind="item.bodyProps" :type="item.bodyType" />
          <template #fallback>
            <div class="animate-pulse h-24 bg-gray-100 rounded" />
          </template>
        </Suspense>
      </div>

      <!-- single -->
<<<<<<< HEAD
      <Suspense v-else>
        <component :is="registry[item.type] || UnknownBlock" v-bind="item.props" :type="item.type" />
        <template #fallback>
          <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
        </template>
      </Suspense>
=======
      <div v-else class="mb-10 last:mb-0">
        <Suspense>
          <component :is="registry[item.type] || UnknownBlock" v-bind="item.props" :type="item.type" />
          <template #fallback>
            <div class="animate-pulse h-24 bg-gray-100 rounded my-4" />
          </template>
        </Suspense>
      </div>
>>>>>>> a2e9e2f8dcde85d531de9107a5559409612887b3
    </template>
  </div>
</template>
