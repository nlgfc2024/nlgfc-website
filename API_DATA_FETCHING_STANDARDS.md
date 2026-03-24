# API Data Fetching Standards

This document outlines the standard patterns and best practices for fetching data from APIs in the NLGFC website frontend. Following these standards ensures consistency, performance, and maintainability across all pages.

## Table of Contents

1. [Overview](#overview)
2. [Standard Composable: `useApiData`](#standard-composable-useapidata)
3. [Standard Composable: `useApiDataArray`](#standard-composable-useapidatarray)
4. [HTML Content Handling](#html-content-handling)
5. [Best Practices](#best-practices)
6. [Examples](#examples)
7. [Migration Guide](#migration-guide)

## Overview

All API data fetching should use the standard composables provided in `composables/useApiData.ts`. These composables provide:

- ✅ Consistent error handling
- ✅ Loading states
- ✅ Server-side rendering (SSR) support
- ✅ Automatic caching
- ✅ Data transformation
- ✅ Default values
- ✅ Type safety

## Standard Composable: `useApiData`

Use `useApiData` for fetching any API endpoint. It handles single objects or custom response formats.

### Basic Usage

```typescript
import { useApiData } from '~/composables/useApiData';

const { data, loading, error, refresh } = useApiData(
  'unique-key',           // Unique cache key
  '/api/endpoint',        // API endpoint (relative or absolute)
  {
    transform: (response) => response,  // Optional transform function
    default: () => null,                  // Optional default value
    server: true,                         // Fetch on server (default: true)
    lazy: false,                          // Wait for fetch (default: false)
    immediate: true,                      // Fetch immediately (default: true)
    onResponseError: ({ response }) => {  // Optional error handler
      console.error('Error:', response);
    }
  }
);
```

### Parameters

- **key** (string, required): Unique identifier for caching. Should be descriptive (e.g., 'latest-posts', 'partner-list')
- **url** (string, required): API endpoint. Can be relative (`/api/posts`) or absolute (`http://localhost:8000/api/posts`)
- **options** (object, optional): Configuration options

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `transform` | Function | `(response) => response` | Transform function to process API response |
| `default` | Function | `undefined` | Function returning default value before data loads |
| `server` | boolean | `true` | Fetch on server side for SSR |
| `lazy` | boolean | `false` | Wait for fetching to complete before rendering |
| `immediate` | boolean | `true` | Fetch immediately on component mount |
| `onResponseError` | Function | `undefined` | Error handler callback |
| `onResponse` | Function | `undefined` | Success handler callback |

### Return Values

- **data**: Computed ref containing the fetched data (or default value)
- **loading**: Ref indicating loading state
- **error**: Ref containing error information if fetch fails
- **refresh**: Function to manually refresh the data

## Standard Composable: `useApiDataArray`

Use `useApiDataArray` for endpoints that return arrays. It ensures the result is always an array and handles common response formats.

### Basic Usage

```typescript
import { useApiDataArray } from '~/composables/useApiData';

const { data, loading, error, refresh } = useApiDataArray(
  'partners',
  '/api/partners'
);

// data.value is always an array, never undefined
```

### Features

- Automatically defaults to empty array `[]`
- Handles responses in formats: `[]`, `{ data: [] }`, or `{ items: [] }`
- Ensures type safety for array operations

## HTML Content Handling

When displaying content from the API that may contain HTML tags, use the HTML utility functions to strip tags and create excerpts.

### Import HTML Utilities

```typescript
import { useHtmlUtils } from '~/composables/useHtmlUtils';

const { stripHtmlTags, getExcerpt } = useHtmlUtils();
```

### Functions

#### `stripHtmlTags(html, maxLength?)`

Strips HTML tags from a string and returns plain text.

```typescript
const plainText = stripHtmlTags('<p>Hello <strong>World</strong></p>');
// Returns: "Hello World"

const truncated = stripHtmlTags('<p>Long content...</p>', 50);
// Returns: "Long content..." (truncated to 50 chars)
```

#### `getExcerpt(html, length?)`

Extracts a plain text excerpt from HTML content (default: 150 characters).

```typescript
const excerpt = getExcerpt(post.content, 150);
// Returns: Plain text excerpt, max 150 characters
```

### Example Usage

```typescript
const newsItems = computed(() => {
  if (!postsData.value) return [];
  
  return postsData.value.map((post) => ({
    id: post.id,
    title: post.title,
    content: getExcerpt(post.content, 150), // Strip HTML and get excerpt
    // ... other fields
  }));
});
```

## Best Practices

### 1. Always Use Standard Composables

✅ **DO:**
```typescript
const { data, loading, error } = useApiDataArray('partners', '/api/partners');
```

❌ **DON'T:**
```typescript
const partners = ref([]);
const loading = ref(false);
const error = ref(null);
// Manual fetch logic...
```

### 2. Use Descriptive Cache Keys

✅ **DO:**
```typescript
useApiData('latest-posts-homepage', '/api/posts/latest/3')
useApiData('partner-list-footer', '/api/partners')
```

❌ **DON'T:**
```typescript
useApiData('data', '/api/posts')
useApiData('items', '/api/partners')
```

### 3. Handle Loading and Error States

Always provide UI feedback for loading and error states:

```vue
<template>
  <!-- Loading State -->
  <div v-if="loading" class="loading-skeleton">
    <!-- Loading UI -->
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error-message">
    <p>Failed to load data. Please try again.</p>
    <button @click="refresh">Retry</button>
  </div>

  <!-- Success State -->
  <div v-else-if="data && data.length > 0">
    <!-- Display data -->
  </div>

  <!-- Empty State -->
  <div v-else class="empty-state">
    <p>No data available.</p>
  </div>
</template>
```

### 4. Strip HTML Tags from Content

When displaying content that may contain HTML:

✅ **DO:**
```typescript
const { getExcerpt } = useHtmlUtils();
content: getExcerpt(post.content, 150)
```

❌ **DON'T:**
```typescript
content: post.content?.substring(0, 150) + '...' // May include HTML tags
```

### 5. Use Relative URLs

✅ **DO:**
```typescript
useApiData('posts', '/api/posts/latest/3')
```

❌ **DON'T:**
```typescript
useApiData('posts', 'http://localhost:8000/api/posts/latest/3')
```

The composable automatically prepends the base URL from `nuxt.config.ts`.

### 6. Provide Default Values

Always provide sensible defaults:

```typescript
useApiData('posts', '/api/posts', {
  default: () => []
})
```

### 7. Transform Data Appropriately

Use transform functions to normalize different API response formats:

```typescript
useApiData('posts', '/api/posts', {
  transform: (response) => {
    // Handle different response formats
    if (Array.isArray(response)) {
      return response;
    }
    return response?.data || [];
  }
})
```

## Examples

### Example 1: Fetching Partners List

```vue
<script setup>
import { useApiDataArray } from '~/composables/useApiData';

const { data: partners, loading, error, refresh } = useApiDataArray(
  'partners',
  '/api/partners'
);
</script>

<template>
  <div v-if="loading">Loading partners...</div>
  <div v-else-if="error">Error loading partners</div>
  <div v-else-if="partners && partners.length > 0">
    <div v-for="partner in partners" :key="partner.id">
      {{ partner.name }}
    </div>
  </div>
  <div v-else>No partners available</div>
</template>
```

### Example 2: Fetching Latest Posts with HTML Stripping

```vue
<script setup>
import { useApiData } from '~/composables/useApiData';
import { useHtmlUtils } from '~/composables/useHtmlUtils';

const { getExcerpt } = useHtmlUtils();

const { data: postsData, loading, error } = useApiData(
  'latest-posts',
  '/api/posts/latest/3',
  {
    default: () => [],
    transform: (response) => Array.isArray(response) ? response : response?.data || []
  }
);

const newsItems = computed(() => {
  if (!postsData.value || !Array.isArray(postsData.value)) return [];
  
  return postsData.value.map((post) => ({
    id: post.id,
    title: post.title || '',
    content: getExcerpt(post.content, 150), // Strip HTML tags
    image: post.image || '/images/default.jpg',
    date: post.created_at ? new Date(post.created_at).toLocaleDateString() : '',
    link: `/news/${post.slug}`
  }));
});
</script>

<template>
  <div v-if="loading">Loading news...</div>
  <div v-else-if="error">Error loading news</div>
  <div v-else-if="newsItems.length > 0">
    <article v-for="article in newsItems" :key="article.id">
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p> <!-- HTML tags already stripped -->
    </article>
  </div>
  <div v-else>No news available</div>
</template>
```

### Example 3: Fetching Single Resource

```vue
<script setup>
import { useApiData } from '~/composables/useApiData';

const route = useRoute();

const { data: post, loading, error } = useApiData(
  `post-${route.params.slug}`,
  `/api/posts/${route.params.slug}`,
  {
    default: () => null
  }
);
</script>

<template>
  <div v-if="loading">Loading post...</div>
  <div v-else-if="error">Post not found</div>
  <article v-else-if="post">
    <h1>{{ post.title }}</h1>
    <div v-html="post.content"></div> <!-- Render HTML if needed -->
  </article>
</template>
```

## Migration Guide

### Migrating from `useFetch` or `useAsyncData`

**Before:**
```typescript
const { data, pending, error } = useFetch(
  'http://localhost:8000/api/partners',
  {
    server: true,
    lazy: false,
    immediate: true,
    default: () => []
  }
);
```

**After:**
```typescript
const { data, loading, error } = useApiDataArray(
  'partners',
  '/api/partners'
);
```

### Migrating from Manual Fetching

**Before:**
```typescript
const partners = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchPartners = async () => {
  loading.value = true;
  try {
    const response = await $fetch('http://localhost:8000/api/partners');
    partners.value = response.data || response;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPartners();
});
```

**After:**
```typescript
const { data: partners, loading, error, refresh } = useApiDataArray(
  'partners',
  '/api/partners'
);
```

## Performance Considerations

1. **Caching**: The composable uses Nuxt's `useAsyncData` which provides automatic caching based on the key
2. **SSR**: Server-side rendering is enabled by default for better SEO and initial load performance
3. **Lazy Loading**: Use `lazy: true` for non-critical data that can load after initial render
4. **Deduplication**: Multiple components using the same key will share the same data fetch

## Troubleshooting

### Issue: Data is undefined

**Solution:** Always provide a default value:
```typescript
useApiData('key', '/api/endpoint', {
  default: () => [] // or null, {}, etc.
})
```

### Issue: HTML tags showing in content

**Solution:** Use HTML utilities to strip tags:
```typescript
const { getExcerpt } = useHtmlUtils();
content: getExcerpt(post.content, 150)
```

### Issue: Array operations failing

**Solution:** Use `useApiDataArray` which ensures array type:
```typescript
const { data } = useApiDataArray('key', '/api/endpoint');
// data.value is always an array
```

## Summary

- ✅ Always use `useApiData` or `useApiDataArray` for API calls
- ✅ Use descriptive cache keys
- ✅ Handle loading, error, and empty states
- ✅ Strip HTML tags from content using `getExcerpt` or `stripHtmlTags`
- ✅ Use relative URLs (composable handles base URL)
- ✅ Provide default values
- ✅ Transform data to normalize response formats

Following these standards ensures consistent, performant, and maintainable code across the entire application.

