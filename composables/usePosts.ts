export const useLatestPosts = () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPosts = async (count = 3) => {
    loading.value = true
    error.value = null
    
    try {
      const { data }: { data: any } = await $fetch(`http://localhost:8000/api/posts/latest/${count}`)
      posts.value = data
    } catch (err: any) {
      error.value = err
      console.error('Failed to fetch posts:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts
  }
}

export const useAllPosts = () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data }: { data: any } = await $fetch('http://localhost:8000/api/posts')
      posts.value = data
    } catch (err: any) {
      error.value = err
      console.error('Failed to fetch posts:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts
  }
}