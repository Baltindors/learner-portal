<template>
  <div class="flex-grow flex flex-col">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-6 py-8">
      <FilterBar v-if="route.name !== 'activity-frontmatter' && route.name !== 'activity'" />
      
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import FilterBar from './components/ui/FilterBar.vue';

const route = useRoute();
</script>