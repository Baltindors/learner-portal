<template>
  <aside class="w-80 border-r border-white/10 hidden lg:flex flex-col">
    <div class="p-6 border-b border-white/10">
      <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Series Parts</h3>
      <div class="space-y-3">
        <div v-for="ep in currentSeries" :key="ep.id" 
             @click="playActivity(ep)"
             :class="['p-3 rounded-lg cursor-pointer transition-all border', activeEpisode.id === ep.id ? 'bg-[#277FCB]/20 border-[#277FCB]' : 'bg-white/5 border-transparent hover:bg-white/10']">
          <div class="text-[10px] font-bold text-[#277FCB] mb-1">PART {{getEpisodeOrder(ep.code)}}</div>
          <div class="text-xs font-semibold leading-tight line-clamp-2">{{ep.title}}</div>
        </div>
      </div>
    </div>
    
    <div v-if="relatedSeries.length > 0" class="p-6 overflow-y-auto no-scrollbar">
      <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">You May Also Like</h3>
      <div class="space-y-4">
        <div v-for="rel in relatedSeries" :key="rel.id" 
             @click="playActivity(rel)"
             class="flex gap-3 group cursor-pointer">
          <div class="w-16 h-12 bg-white/10 rounded flex-shrink-0 overflow-hidden relative">
            <div class="absolute bottom-1 right-1 bg-[#03C84F] w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(3,200,79,0.8)]"></div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 mb-0.5">{{rel.tags[0]}}</div>
            <div class="text-[11px] font-bold line-clamp-2 leading-tight group-hover:text-[#277FCB]">{{rel.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';

const router = useRouter();
const { activeEpisode, currentSeries, relatedSeries, getEpisodeOrder, isPlaying } = useActivities();

const playActivity = (activity) => {
  activeEpisode.value = activity;
  isPlaying.value = true;
  router.push({ name: 'activity', params: { id: activity.id } });
};
</script>
