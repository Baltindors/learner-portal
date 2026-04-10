<template>
  <div class="flex-grow flex flex-col min-h-screen bg-[#f9fbfd]">
    <AppHeader />
    
    <div 
      v-if="isSearchPanelOpen && route.name !== 'activity-frontmatter' && route.name !== 'activity'"
      class="bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top duration-500"
    >
      <div class="container mx-auto px-6 py-10">
        <FilterBar />
      </div>
    </div>

    <main class="flex-grow container mx-auto px-6 py-8">
      <router-view />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useActivities } from './composables/useActivities';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import FilterBar from './components/ui/FilterBar.vue';

const route = useRoute();
// We import isSearchPanelOpen from the global state so the Header toggle can control it
const { isSearchPanelOpen } = useActivities();
</script>