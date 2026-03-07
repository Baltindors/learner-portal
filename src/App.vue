<template>
  <div class="flex-grow flex flex-col">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';

// No complex logic needed here, layout wraps the router view
</script>
