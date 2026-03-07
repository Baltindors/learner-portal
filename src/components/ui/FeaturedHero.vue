<template>
  <div class="mb-12 bg-[#065184] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
    <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
    <div class="flex-1 z-10">
      <span class="bg-[#277FCB] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 inline-block">New Series</span>
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">Mastering Oncology Care in 2026</h1>
      <p class="text-white/80 max-w-xl mb-6 text-lg">Deep dive into the latest clinical guidelines and patient outcomes with leading experts from across the globe.</p>
      <div class="flex gap-4">
        <button @click="startFeatured" class="bg-white text-[#065184] px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">Start Learning</button>
        <button class="bg-white/10 border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors">+ Watchlist</button>
      </div>
    </div>
    <div class="w-64 h-64 bg-slate-200/20 rounded-xl hidden lg:flex items-center justify-center backdrop-blur-md border border-white/10">
      <svg class="w-32 h-32 text-white/40" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';

const router = useRouter();
const { activities, activeEpisode, isPlaying } = useActivities();

const startFeatured = () => {
  // Hardcoded to the first mock item for prototype purposes
  const featured = activities.value[0];
  if (featured) {
    activeEpisode.value = featured;
    isPlaying.value = true;
    router.push({ name: 'activity', params: { id: featured.id } });
  }
};
</script>
