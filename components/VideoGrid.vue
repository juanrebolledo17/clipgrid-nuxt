<script setup>
const page = ref(1)
const perPage = 6
const displayedVideos = ref([])
const isLoading = ref(false)
const hasMore = ref(true)

// Load initial videos
const loadVideos = async () => {
  try {
    isLoading.value = true
    const response = await fetch('/videos.json')
    const allVideos = await response.json()
    
    // Paginate the videos
    const startIndex = (page.value - 1) * perPage
    const newVideos = allVideos.slice(startIndex, startIndex + perPage)
    
    if (newVideos.length > 0) {
      displayedVideos.value = [...displayedVideos.value, ...newVideos]
      hasMore.value = newVideos.length === perPage
    } else {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Error loading videos:', error)
  } finally {
    isLoading.value = false
  }
}

// Initial load
onMounted(() => {
  loadVideos()
})

// Load more when scrolling
const loadMore = () => {
  if (!isLoading.value && hasMore.value) {
    page.value += 1
    loadVideos()
  }
}

// Intersection Observer for infinite scroll
const sentinel = ref(null)
const observer = ref(null)

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { threshold: 0.1 })
  
  if (sentinel.value) {
    observer.value.observe(sentinel.value)
  }
})

onBeforeUnmount(() => {
  if (observer.value && sentinel.value) {
    observer.value.unobserve(sentinel.value)
  }
})
</script>

<template>
 <div class="video-grid-container">
    <div class="video-grid">
      <div v-for="(video, index) in displayedVideos" :key="index" class="video-item">
        <iframe
          width="100%"
          height="315"
          :src="video.src"
          :title="video.title"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <h3>{{ video.title }}</h3>
        <div class="video-category">
          <p>{{ video.category }}</p>
        </div>
      </div>
    </div>
    
    <div ref="sentinel" class="sentinel"></div>
    
    <div v-if="isLoading" class="loading">
      <div class="dot-loading">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
    
    <div v-if="!hasMore && !isLoading" class="no-more">
      No more videos.
    </div>
  </div>
</template>

<style scoped>
.video-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-grid h3 {
  margin: 0;
  padding: 0.6rem 0;
}

.video-item {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.video-category {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.video-category p {
  color: #fff;
  background: #333;
  border-radius: 15px;
  font-size: 0.75rem;
  margin: 0;
  padding: 0.25rem 1.25rem;
  /* opacity: 0.9; */
}

.video-embed {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.video-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sentinel {
  height: 1px;
}

.loading, .no-more, .no-videos {
  text-align: center;
  padding: 20px;
  color: #666;
}

.dot-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333; /* Change color as needed */
  opacity: 0.4;
  animation: dot-pulse 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>