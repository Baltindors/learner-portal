<template>
  <div class="flex flex-col gap-8 pb-12">
    <div class="bg-gradient-to-r from-[#065184] to-[#277FCB] rounded-2xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
      <div class="absolute right-0 top-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
      
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-white/30">
            Specialty Center
          </span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4">{{ centerName }} Center</h1>
        <p class="text-white/80 max-w-2xl text-lg leading-relaxed">
          Explore the latest clinical updates, evidence-based guidelines, and expert perspectives dedicated to {{ centerName }}.
        </p>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold border-l-4 border-[#277FCB] pl-3">Latest in {{ centerName }}</h2>
        <span class="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{{ centerActivities.length }} Activities</span>
      </div>
      
      <div v-if="centerActivities.length === 0" class="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
        <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <h3 class="text-lg font-semibold text-slate-600">No activities found</h3>
        <p class="text-slate-500 mt-1">Check back later for new content in this center.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ActivityCard 
          v-for="activity in centerActivities" 
          :key="activity.id" 
          :activity="activity" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useActivities } from '../composables/useActivities';
import ActivityCard from '../components/ui/ActivityCard.vue';

const route = useRoute();

// We can reuse the groupedByArea property you already have!
const { groupedByArea } = useActivities();

// Get the name from the URL (e.g., "Oncology" from /center/Oncology)
const centerName = computed(() => route.params.name);

// Look up the activities for this specific area
const centerActivities = computed(() => {
  return groupedByArea.value[centerName.value] || [];
});
</script>