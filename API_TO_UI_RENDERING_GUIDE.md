# API to UI Rendering Guide (Step-by-Step)

This is a general workflow for rendering any backend API data in the frontend.

## Goal

Turn API responses into stable, clean UI with:

- predictable data shape
- loading/error/empty/success states
- safe text rendering
- reusable fetch logic

---

## Step 1: Confirm the API contract

Before writing UI code, confirm:

1. endpoint URL (example: `/api/posts`, `/api/projects`)
2. response shape (`[]`, `{ data: [] }`, or object)
3. pagination fields (`current_page`, `last_page`, `per_page`, etc.)
4. media fields (example: `image`, `bg_image`, `logo`)
5. rich text fields (example: HTML descriptions)

If this is unclear, read API docs first.

---

## Step 2: Configure base URL once

Use runtime config in Nuxt:

```ts
// nuxt.config.ts
runtimeConfig: {
  public: {
    baseUrl: 'http://localhost:8000'
  }
}
```

Use relative endpoints in composables (example: `/api/projects`) and let composables build full URLs.

---

## Step 3: Pick the right fetch pattern

Use standard composables:

- `useApiData` for object/custom responses
- `useApiDataArray` for array list responses

Or create a domain composable when logic is reused (example: `useDonorProjects`).

---

## Step 4: Normalize response data

Always map API data to UI-friendly fields in a computed mapper.

Example checklist:

- `title`: fallback if null
- `description`: strip HTML tags if rich text
- `image/logo`: convert storage path to full URL
- `link`: derive route from slug

Keep mapping in one place so templates stay simple.

---

## Step 5: Sanitize and format content

For rich text fields used in cards/lists:

- remove HTML tags for preview text
- truncate to a consistent length
- format dates before rendering

Use utilities from [composables/useHtmlUtils.ts](composables/useHtmlUtils.ts).

---

## Step 6: Implement all 4 UI states

Every data section should handle:

1. Loading state (skeleton/spinner)
2. Error state (message + retry button)
3. Success state (render data)
4. Empty state (friendly fallback text)

Do not render success template directly without state guards.

---

## Step 7: Render lists safely

For `v-for` lists:

- use stable unique keys (`id` preferred)
- avoid keying `<template v-for>` directly
- key concrete elements instead

This prevents rendering bugs and Vue warnings.

---

## Step 8: Add retry and refresh

Expose retry via composable `refresh` and wire it to error state button.

Example:

```vue
<button @click="refresh">Try Again</button>
```

---

## Step 9: Support navigation/deep links

If cards link to detailed sections/pages:

- use slug-based URLs/hashes
- resolve hash/slug to internal tab/section IDs
- re-resolve when async data arrives late

This ensures copied links open the correct view.

---

## Step 10: Validate before shipping

Run diagnostics and check:

- no new TypeScript/script errors
- no broken image URLs
- no raw HTML tags in preview text
- loading/error/empty states all visible and usable

---

## Reusable implementation pattern

1. Build composable for endpoint logic.
2. Build computed mapper for UI shape.
3. Keep template focused on rendering and state handling.
4. Reuse composable across pages.

---

## Practical references in this workspace

- API standards: [API_DATA_FETCHING_STANDARDS.md](API_DATA_FETCHING_STANDARDS.md)
- Project-specific rendering example: [PROJECTS_DATA_RENDERING_GUIDE.md](PROJECTS_DATA_RENDERING_GUIDE.md)
- Generic composable pattern: [composables/useApiData.ts](composables/useApiData.ts)
- Domain composable example: [composables/useDonorProjects.ts](composables/useDonorProjects.ts)
- Homepage rendering example: [pages/index.vue](pages/index.vue)

---

## Quick start template

```ts
const { data, loading, error, refresh } = useApiData('my-key', '/api/my-endpoint', {
  default: () => [],
  transform: (response) => Array.isArray(response) ? response : response?.data || []
})

const uiItems = computed(() => {
  if (!Array.isArray(data.value)) return []

  return data.value.map((item) => ({
    id: item.id,
    title: item.title || 'Untitled',
    description: item.description || '',
  }))
})
```

Use this as your base, then add media URL mapping, sanitization, and deep-link behavior as needed.
