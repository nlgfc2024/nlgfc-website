# Local Authorities — How It Is Implemented

This document explains every file involved in the Local Authorities section of the NLGFC website and how they connect to each other.

---

## File Structure

```
pages/
  localAuthorities/
    alldistricts.vue           Interactive map page (entry point)
    [district].vue             Single dynamic detail page for all 28 districts
    malawi.svg                 SVG map shapes (embedded inside alldistricts.vue)
    district-pages-architecture.md    This file

composables/
  useDistrictContent.js        Single source of truth for all district data
```

---

## How the Pages Connect

```
User visits /localAuthorities/alldistricts
        |
        v
  alldistricts.vue
  (SVG map + dropdown selector)
        |
        | User clicks a district shape or selects from dropdown
        v
  navigateTo('/localAuthorities/kasungu')
        |
        v
  [district].vue
   reads 'kasungu' from route.params.district
   calls getDistrictBySlug('kasungu') from useDistrictContent.js
   renders: Profile  Projects  Reports  News tabs
```

---

## File 1 — `alldistricts.vue` (Map Page)

### What it does
- Renders the interactive SVG map of all 28 Malawi districts
- Shows a searchable dropdown to select a district by name
- Highlights the selected district on the map
- Shows a summary info panel for the selected district
- Navigates to `[district].vue` when the user clicks "View Full Profile"

### Key data: the `districts` array

Near the bottom of `<script setup>` is an array of all 28 district objects.
Each looks like this:

```js
{
  name: 'Kasungu',
  region: 'Central',
  capital: 'Kasungu',
  population: '842,953',
  area: '7,878 km²',
  phone: '(+265) 888 201 790',
  email: 'kasungu@kasungudc.gov.mw',
  PrivateBag: '1',
  description: 'Kasungu is home to Kasungu National Park...',
  slug: 'kasungu',
  pageSlug: 'kasungu',    // <-- becomes the URL: /localAuthorities/kasungu
}
```

The `pageSlug` field is the most important  it is the URL segment used when
navigating to the detail page.

### Key data: `districtIdMap`

This object bridges district **names** to SVG `<path>` **IDs**:

```js
const districtIdMap = {
  'Chitipa':    'MWCT',
  'Karonga':    'MWKR',
  'Kasungu':    'MWKS',
  'Blantyre':   'MWBL',
  'Zomba':      'MWZO',
  // ... all 28
}
```

### How map highlighting works

```
User clicks a district path on the SVG
       |
       v
@click="handleDistrictClick('Kasungu')" fires
       |
       v
selectedDistrict.value = 'Kasungu'
       |
       v
watch(selectedDistrict) triggers highlightSelectedDistrict()
       |
       v
districtIdMap['Kasungu']    'MWKS'
       |
       v
svgRef.value.querySelector('#MWKS')    finds the DOM element
       |
       v
path.style.fill = '#1f2937'            turns the shape dark grey
path.style.filter = 'drop-shadow(...)'
```

`svgRef` is a Vue template ref on the `<svg>` element that gives JavaScript
direct access to query and style individual paths.

`resetMapHighlighting()` restores all paths to the default green (`#6f9c76`)
when a new district is selected or the selection is cleared.

### Navigation to detail page

```js
// View Full Profile
await navigateTo(`/localAuthorities/${selectedDistrictDetails.pageSlug}`)
//  /localAuthorities/kasungu

// Go straight to a specific tab
await navigateTo(`/localAuthorities/${selectedDistrictDetails.pageSlug}?tab=projects`)
//  /localAuthorities/kasungu?tab=projects
```

---

## File 2 — `malawi.svg` (Map Drawing, embedded in alldistricts.vue)

The SVG contains one `<path>` element per district. Each path has Vue event
handlers directly on it:

```html
<path
  d="M 488.8 184.7 l -0.1 0 ..."   <!-- geographic coordinate data -->
  id="MWKS"                          <!-- matched by districtIdMap -->
  name="Kasungu"                     <!-- display name -->
  @click="handleDistrictClick('Kasungu')"
  @mouseover="handleDistrictHover('Kasungu')"
  @mouseout="handleDistrictLeave()"
/>
```

- `d="..."`  the raw path coordinates that draw the district boundary.
  Vue never reads or changes this.
- `id="MWKS"`  used by `querySelector('#MWKS')` to find and style the element.
- `name="Kasungu"`  human-readable label, matches the `districts` array.
- Event handlers use **string literals** (e.g. `'Kasungu'`), not variables,
  because SVG attributes don't have access to JavaScript scope.

All 28 district paths are wrapped in a `<g id="features">` group inside a
single `<svg>` element that is bound with `ref="svgRef"`.

---

## File 3 — `[district].vue` (District Detail Page)

### Why square brackets?

The filename `[district].vue` uses Nuxt's dynamic routing syntax.
Square brackets tell Nuxt to treat that segment as a parameter:

| URL visited                          | `route.params.district` |
|--------------------------------------|-------------------------|
| `/localAuthorities/kasungu`          | `'kasungu'`             |
| `/localAuthorities/blantyre`         | `'blantyre'`            |
| `/localAuthorities/nkhata-bay`       | `'nkhata-bay'`          |
| `/localAuthorities/lilongwe-city`    | `'lilongwe-city'`       |

**All 28 districts use this one file**  no separate page per district.

### How it reads the URL

```js
const slug = computed(() => route.params.district)
// e.g. 'kasungu'

const { getDistrictBySlug } = useDistrictContent()
const district = computed(() => getDistrictBySlug(slug.value))
// returns the full object from useDistrictContent.js, or null if not found
```

If `getDistrictBySlug()` returns `null` (unknown slug), the template shows a
"District Not Found" message with a link back to the map.

### How the `?tab=` query parameter works

```js
const activeTab = computed({
  get: () => route.query.tab || 'profile',   // default tab is 'profile'
  set: (tab) => router.replace({ query: { ...route.query, tab } })
})
```

This means:
- `/localAuthorities/kasungu`  Profile tab opens
- `/localAuthorities/kasungu?tab=projects`  Projects tab opens directly
- Switching tabs updates the URL so the browser back button works correctly

### The four tabs

| Tab key    | What is shown                                                    |
|------------|------------------------------------------------------------------|
| `profile`  | About, Vision, Mission, Core Values, Key Functions               |
| `projects` | Project cards (status, description, donor, budget, period)       |
| `reports`  | Downloadable report links (PDF)                                  |
| `news`     | News article cards with images and excerpts                      |

Each tab shows a friendly empty state if no data has been added yet.

---

## File 4 — `useDistrictContent.js` (Data Store)

This composable is the **single source of truth** for all district data.

### Structure

```js
const districts = [
  {
    slug: 'kasungu',             // URL identifier  must match pageSlug in alldistricts.vue
    name: 'Kasungu',
    region: 'Central',
    capital: 'Kasungu',
    population: '842,953',
    area: '7,878 km²',
    phone: '(+265) 888 201 790',
    email: 'kasungu@kasungudc.gov.mw',
    privateBag: '1',
    description: 'Short description shown in meta/hero',
    profile: {
      about: 'Long paragraph about the district',
      vision: 'The district vision statement',
      mission: 'The district mission statement',
      values: ['Integrity', 'Transparency', 'Accountability', ...],
      keyFunctions: ['Function 1', 'Function 2', ...]
    },
    projects: [
      {
        title: 'Project name',
        status: 'Ongoing',          // Ongoing | Completed | Planned
        description: '...',
        donor: 'World Bank',
        budget: 'MWK 50,000,000',
        period: '20232026'
      }
    ],
    reports: [
      {
        title: 'Annual Report 2024',
        type: 'Annual Report',
        year: '2024',
        url: '/documents/kasungu-annual-2024.pdf'
      }
    ],
    news: [
      {
        title: 'News headline',
        date: 'January 10, 2025',
        excerpt: 'Short summary...',
        image: '/images/kasungu-news.jpg',
        slug: 'kasungu-news-jan-2025'    // links to /news/this-slug
      }
    ]
  },
  // ... repeat for all 28 districts
]

export const useDistrictContent = () => {
  const getDistrictBySlug   = (slug)   => districts.find(d => d.slug === slug) || null
  const getAllDistricts      = ()       => districts
  const getDistrictsByRegion = (region) => districts.filter(d => d.region === region)
  return { getDistrictBySlug, getAllDistricts, getDistrictsByRegion }
}
```

### To update district content

Edit **only** `useDistrictContent.js`:
- Add a project  add an object to the `projects` array
- Add a report   add an object to the `reports` array
- Add news       add an object to the `news` array
- Change the about text  edit `profile.about`

No other files need to change.

---

## All 28 Districts and Their Slugs

| District         | Slug              | Region   |
|------------------|-------------------|----------|
| Chitipa          | `chitipa`         | Northern |
| Karonga          | `karonga`         | Northern |
| Likoma           | `likoma`          | Northern |
| Mmbelwa          | `mmbelwa`         | Northern |
| Nkhata Bay       | `nkhata-bay`      | Northern |
| Rumphi           | `rumphi`          | Northern |
| Dedza            | `dedza`           | Central  |
| Dowa             | `dowa`            | Central  |
| Kasungu          | `kasungu`         | Central  |
| Lilongwe City    | `lilongwe-city`   | Central  |
| Lilongwe         | `lilongwe`        | Central  |
| Mchinji          | `mchinji`         | Central  |
| Nkhotakota       | `nkhotakota`      | Central  |
| Ntcheu           | `ntcheu`          | Central  |
| Ntchisi          | `ntchisi`         | Central  |
| Salima           | `salima`          | Central  |
| Balaka           | `balaka`          | Southern |
| Blantyre         | `blantyre`        | Southern |
| Chikwawa         | `chikwawa`        | Southern |
| Chiradzulu       | `chiradzulu`      | Southern |
| Machinga         | `machinga`        | Southern |
| Mangochi         | `mangochi`        | Southern |
| Mwanza           | `mwanza`          | Southern |
| Nsanje           | `nsanje`          | Southern |
| Neno             | `neno`            | Southern |
| Phalombe         | `phalombe`        | Southern |
| Thyolo           | `thyolo`          | Southern |
| Zomba            | `zomba`           | Southern |

---

## How to Add a New District (Future)

1. Add an entry to the `districts` array in `useDistrictContent.js` with a new `slug`.
2. Add a matching entry to the `districts` array in `alldistricts.vue` with the same `slug` as `pageSlug`.
3. Add the SVG `<path>` for the district to the map, setting `id` and adding the three Vue event handlers.
4. Add the district name and SVG id to `districtIdMap` in `alldistricts.vue`.

No new `.vue` files are needed.

---

## How to Fix Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Clicking a district on the map does nothing | `handleDistrictClick` uses variable `name` instead of string literal | Change to `handleDistrictClick('DistrictName')` |
| District shape doesn't highlight | `districtIdMap` is missing that district | Add `'DistrictName': 'MWXX'` to `districtIdMap` |
| Detail page shows "District Not Found" | `slug` in `useDistrictContent.js` doesn't match `pageSlug` in `alldistricts.vue` | Make both values identical |
| `?tab=projects` link doesn't open Projects tab | Tab key mismatch | Check tab keys in `[district].vue` match exactly: `profile`, `projects`, `reports`, `news` |
| SVG path parse error in dev server | `<path>` tag not self-closed (missing `/>`) | Change `</path>` to `/>` on the opening tag |

