<script setup>
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

await navigateTo(`/news/${slug.value}?source=resource`, { redirectCode: 301, replace: true })
</script>
