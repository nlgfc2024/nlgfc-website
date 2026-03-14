# Projects Data Rendering Guide (Frontend)

This guide explains the exact pattern used in this project to render **donor-funded projects** dynamically from the API.

## 1) Data flow (high level)

1. Fetch funding types from `/api/funding-types`.
2. Find the funding type whose `name` or `slug` contains `donor`.
3. Fetch projects from `/api/projects` with `funding_type_id=<donorId>`.
4. Map API fields into UI-safe card fields (title, description, background image, logo, link).
5. Render with loading/error/empty/success states.

This is implemented in the reusable composable below.

## 2) Reusable composable

Use [composables/useDonorProjects.ts](composables/useDonorProjects.ts).

### What it returns

- `data`: donor projects array
- `loading`: pending state
- `error`: fetch error state
- `refresh`: retry function

### Options

- `key` (default: `donor-projects`) – cache key for `useAsyncData`
- `perPage` (default: `100`) – backend page size for `/api/projects`
- `limit` (optional) – local slice limit after fetch

### Example usage

```ts
const { data: donorProjects, loading, error, refresh } = useDonorProjects({
  key: 'homepage-donor-projects',
  perPage: 100,
  limit: 5
})
```

## 3) Homepage card rendering pattern

Implemented in [pages/index.vue](pages/index.vue).

### Mapping rules used

- Title: `project.name || project.title`
- Description: strip HTML tags before rendering (`stripHtmlTags(project.description)`)
- Background image: `project.bg_image` first, then fallback fields
- Logo: `project.logo`
- Link: `/projects/currentProjects#${project.slug}`

### Why descriptions showed `<p>` tags before

The backend description is rich text (HTML). If rendered directly as string interpolation, tags can appear as text. Fix: sanitize before display.

```ts
description: project.description
  ? stripHtmlTags(project.description)
  : 'No project description available.'
```

### URL helper used for media

```ts
const toStorageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${baseUrl}/storage/${path}`
}
```

Use this for both `bg_image` and `logo` so each card gets its own media.

## 4) Required UI states (always include)

For robust rendering, keep these states in the template:

- Loading: skeleton cards/spinner
- Error: user-facing message + retry (`refresh`)
- Success: render card list when data has items
- Empty: friendly message when no donor projects are returned

## 5) Hash navigation alignment (homepage -> current projects)

Implemented in [pages/projects/currentProjects.vue](pages/projects/currentProjects.vue).

- Homepage links use donor project slug hash (e.g. `#ssrlp`, `#gesd`)
- Current projects page resolves hashes with:
  - direct tab-id match
  - page slug match
  - donor API slug/name aliases via `donorSlugToTab`

This ensures deep links from homepage open the correct donor section.

## 6) Common issues and fixes

### A) Background image not showing

Check:

1. API record has `bg_image` value.
2. Storage file exists.
3. URL resolves: `${baseUrl}/storage/<bg_image>`.
4. `baseUrl` in Nuxt runtime config points to the correct backend.

### B) Same logo repeated on all cards

Cause: hardcoded logo path in mapper.  
Fix: map `logo` from each project record (`project.logo`) and build URL per card.

### C) HTML tags in description

Cause: rich text content from backend.  
Fix: `stripHtmlTags()` before rendering.

## 7) Minimal checklist for new project sections

When adding another projects list page:

1. Reuse `useDonorProjects` (or create a variant composable if filter differs).
2. Normalize media URLs using `toStorageUrl` pattern.
3. Sanitize rich text fields for card previews.
4. Implement loading/error/empty states.
5. Use slug-based links for consistent routing.

## 8) Backend endpoints used by frontend

- `GET /api/funding-types`
- `GET /api/projects?per_page=100&funding_type_id=<id>`

Reference backend docs: [../nlgfc_api/api-documentation/projects-api-reference.md](../nlgfc_api/api-documentation/projects-api-reference.md)
