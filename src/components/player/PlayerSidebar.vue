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
      <div class="space-y-2">
        <div v-for="rel in relatedSeries" :key="rel.id" 
             @click="playActivity(rel)"
             class="flex gap-3 group cursor-pointer relative p-2 rounded-lg hover:bg-white/5 transition-colors pr-32">
          <div class="w-16 h-12 bg-white/10 rounded flex-shrink-0 overflow-hidden">
            <!-- Green dot removed -->
          </div>
          <div class="flex-1 py-0.5">
            <div class="text-[10px] text-slate-400 mb-0.5">{{rel.tags[0]}}</div>
            <div class="text-[11px] font-bold line-clamp-2 leading-tight group-hover:text-[#277FCB]">{{rel.title}}</div>
          </div>
          
          <!-- HOVER ACTION MENU -->
          <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click.stop="playActivity(rel)" class="w-7 h-7 rounded-full bg-[#277FCB] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Play">
              <svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.75.433l10-6.5a.5.5 0 000-.866l-10-6.5A.5.5 0 004.5 3z"/></svg>
            </button>
            <button @click.stop="openInfo(rel)" class="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors shadow-lg" title="Info">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button @click.stop="toggleSave(rel)" class="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors shadow-lg" title="Save">
              <svg v-if="rel.isSaved" class="w-3.5 h-3.5 text-[#03C84F]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- INFO MODAL -->
    <InfoModal :is-open="showInfoModal" :activity="activeInfoActivity" @close="showInfoModal = false" />
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';
import InfoModal from '../ui/InfoModal.vue';

const router = useRouter();
const { activeEpisode, currentSeries, relatedSeries, getEpisodeOrder, loadActivityAndPlay } = useActivities();

const showInfoModal = ref(false);
const activeInfoActivity = ref(null);

const playActivity = (activity) => {
  loadActivityAndPlay(activity);
  router.push({ name: 'activity', params: { id: activity.id } });
};

const openInfo = (activity) => {
  activeInfoActivity.value = activity;
  showInfoModal.value = true;
};

const toggleSave = (activity) => {
  // Simple toggle for prototype purposes
  activity.isSaved = !activity.isSaved;
};
</script>
