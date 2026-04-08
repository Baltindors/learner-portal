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
    
    <div class="p-6 overflow-y-auto no-scrollbar flex-1 space-y-6">
      <h3 :class="['text-xs font-bold uppercase tracking-widest transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">Course Faculty</h3>
      
      <div v-for="f in mockFaculty" :key="f.name" :class="['flex flex-col gap-3 p-4 rounded-xl border transition-colors duration-500', 
           preferredMode === 'audio' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200']">
        <div class="flex items-center gap-4">
          <div :class="['w-10 h-10 rounded-full flex-shrink-0 transition-colors duration-500', preferredMode === 'audio' ? 'bg-slate-700' : 'bg-slate-300']"></div>
          <div>
            <div class="text-sm font-bold">{{f.name}}</div>
            <div :class="['text-[10px] transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">{{f.title}}</div>
          </div>
        </div>
        <div :class="['text-[10px] leading-relaxed italic transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-300' : 'text-slate-600']">"Expert contributor in multiple Oncology and Hematology podcast series."</div>
        <button class="text-[10px] text-[#277FCB] font-bold text-left hover:underline">View Disclosure →</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mockFaculty } from '../../data/activities';
import { useActivities } from '../../composables/useActivities';

const router = useRouter();
const { activeEpisode, currentSeries, getEpisodeOrder, loadActivityAndPlay, preferredMode } = useActivities();

const playActivity = (activity) => {
  loadActivityAndPlay(activity);
  router.push({ name: 'activity', params: { id: activity.id } });
};
</script>
