export default defineEventHandler(async (event) => {
  return {
    videos: await $fetch('/content/videos.json')
  }
})