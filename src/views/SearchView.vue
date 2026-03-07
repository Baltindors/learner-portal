<template>
  <div v-if="searchQuery" class="mb-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold">Search Results for "{{searchQuery}}"</h2>
      <button @click="clearSearch" class="text-sm text-[#277FCB] font-semibold hover:underline">Clear Search</button>
    </div>
    
    <div v-if="filteredList.length === 0" class="text-center py-12 text-slate-500">
      No activities found matching your search criteria.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ActivityCard 
        v-for="item in filteredList" 
        :key="item.id" 
        :activity="item" 
      />
    </div>
  </div>
  <div v-else class="text-center py-12">
    <h2 class="text-xl font-bold">Enter a search term above.</h2>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useActivities } from '../composables/useActivities';
import ActivityCard from '../components/ui/ActivityCard.vue';

const router = useRouter();
const { searchQuery, filteredList, setGlobalSearch } = useActivities();

const clearSearch = () => {
  setGlobalSearch('');
  router.push({ name: 'home' });
};
</script>
