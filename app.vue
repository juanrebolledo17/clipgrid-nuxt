<template>
  <div>
    <header>
      <h1>ClipGrid</h1>
    </header>
    <main>
      <VideoGrid />
    </main>
    <BackToTop />
    <footer>
      <p>&copy; {{ year }} ClipGrid. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import VideoGrid from '~/components/VideoGrid.vue'
import BackToTop from '~/components/BackToTop.vue'
const year = ref(new Date().getFullYear())
</script>

<style>
body {
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  padding: 0;
  background: #fff;
  overflow-x: hidden; 
}

@-moz-document url-prefix() {
  html {
    scrollbar-width: thin;
    scrollbar-color: #333 #f1f1f1;
  }
}

body::-webkit-scrollbar {
  width: 12px;               
  height: 12px;
  background: transparent;
  border-radius: 10px;     
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;      
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

header {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  font-family: 'Lato', 'Calibri', sans-serif;
  letter-spacing: 2px;
  margin: 0;
}

footer {
  width: 100%;
  background: rgb(51, 51, 51);
  color: #fff;
  font-size: 0.75rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
