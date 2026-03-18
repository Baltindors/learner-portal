<template>
  <aside :class="['w-80 border-r hidden lg:flex flex-col transition-colors duration-500',
                  preferredMode === 'audio' ? 'border-white/10 bg-transparent text-white' : 'border-slate-200 bg-white text-slate-900']">
    <div :class="['p-6 border-b transition-colors duration-500', preferredMode === 'audio' ? 'border-white/10' : 'border-slate-200']">
      <h3 :class="['text-xs font-bold uppercase tracking-widest mb-4 transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">Series Parts</h3>
      <div class="space-y-3">
        <div v-for="ep in currentSeries" :key="ep.id" 
             @click="playActivity(ep)"
             :class="['p-3 rounded-lg cursor-pointer transition-all border', 
                      activeEpisode.id === ep.id 
                        ? (preferredMode === 'audio' ? 'bg-[#277FCB]/20 border-[#277FCB]' : 'bg-[#277FCB]/10 border-[#277FCB]') 
                        : (preferredMode === 'audio' ? 'bg-white/5 border-transparent hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300')]">
          <div class="text-[10px] font-bold text-[#277FCB] mb-1">PART {{getEpisodeOrder(ep.code)}}</div>
          <div :class="['text-xs font-semibold leading-tight line-clamp-2 transition-colors duration-500', preferredMode === 'audio' ? 'text-white' : 'text-slate-900']">{{ep.title}}</div>
        </div>
      </div>
    </div>
    
    <div v-if="relatedSeries.length > 0" class="p-6 overflow-y-auto no-scrollbar">
      <h3 :class="['text-xs font-bold uppercase tracking-widest mb-4 transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">You May Also Like</h3>
      <div class="space-y-6"> <div v-for="rel in relatedSeries" :key="rel.id" 
             :class="['group flex flex-col gap-3 p-3 rounded-xl transition-colors', preferredMode === 'audio' ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200']">
          
          <div @click="playActivity(rel)" :class="['w-full aspect-video rounded-lg overflow-hidden cursor-pointer relative', preferredMode === 'audio' ? 'bg-slate-800' : 'bg-slate-200']">
            <img 
              v-if="rel.thumbnail" 
              :src="rel.thumbnail" 
              class="w-full h-full object-cover transition-transform group-hover:scale-105" 
            />
            <div v-else :class="['w-full h-full flex items-center justify-center', preferredMode === 'audio' ? 'text-white/20' : 'text-slate-400']">
               <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
            </div>
          </div>

          <div class="flex-1">
            <div class="text-[10px] text-[#277FCB] font-bold uppercase tracking-wider mb-1">
              {{ rel.tags[0] }}
            </div>
            <div @click="playActivity(rel)" :class="['text-sm font-bold leading-snug cursor-pointer group-hover:text-[#277FCB] transition-colors duration-500', preferredMode === 'audio' ? 'text-white' : 'text-slate-900']">
              {{ rel.title }}
            </div>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <button @click="playActivity(rel)" class="flex-1 bg-[#277FCB] hover:bg-[#3498db] text-white text-[10px] font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.75.433l10-6.5a.5.5 0 000-.866l-10-6.5A.5.5 0 004.5 3z"/></svg>
              START
            </button>
            <button @click="openInfo(rel)" class="w-9 h-8 bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center rounded-md transition-colors" title="Info">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button @click="toggleSave(rel)" class="w-9 h-8 bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center rounded-md transition-colors" title="Save">
              <svg v-if="rel.inLibrary" class="w-4 h-4 text-[#03C84F]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <InfoModal :is-open="showInfoModal" :activity="activeInfoActivity" @close="showInfoModal = false" />
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';
import InfoModal from '../ui/InfoModal.vue';

const router = useRouter();
const { activeEpisode, currentSeries, relatedSeries, getEpisodeOrder, loadActivityAndPlay, preferredMode } = useActivities();

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
