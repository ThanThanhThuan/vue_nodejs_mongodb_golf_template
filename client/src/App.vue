<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router';
// Assuming you have split these into components as recommended
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';
import LoginOffcanvas from './components/LoginOffcanvas.vue';
</script>

<template>
  <main>
    <!-- 1. The Navigation Bar -->
    <NavBar />

    <!-- 2. The Login Logic (Hidden by default, triggered by NavBar button) -->
    <LoginOffcanvas />

    <!-- 3. The Dynamic Content (HomeView.vue, EventDetailView.vue, etc.) -->
    <RouterView />
  </main>

  <!-- 4. The Footer -->
  <SiteFooter />
</template>

<style>
/* No styles needed here as we are loading global CSS in index.html */
</style>