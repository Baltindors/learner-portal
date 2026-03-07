<template>
  <div 
    @click="handleClick"
    class="flex flex-col gap-3 cursor-pointer group h-full"
  >
    <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-sm">
      <img
        v-if="activity.thumbnail"
        :src="activity.thumbnail"
        alt=""
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

      <span v-if="activity.ceAmount" class="absolute top-2 left-2 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
        {{activity.ceAmount}}
      </span>

      <div v-if="activity.progress" class="absolute bottom-0 left-0 right-0 h-1.5 bg-white/40 z-10">
        <div class="h-full bg-[#34A853]" :style="{ width: activity.progress + '%' }"></div>
      </div>

      <div class="absolute inset-0 bg-[#065184]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20">
        <svg class="w-14 h-14 text-white mb-2 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        <span class="text-white text-xs font-bold uppercase tracking-widest">{{ activity.type || 'Activity' }}</span>
      </div>
    </div>
    
    <div class="flex flex-col flex-grow px-1">
      <div class="flex items-start justify-between gap-3 mb-1">
        <h3 class="text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#277FCB] transition-colors text-slate-900 dark:text-white">
          {{activity.title}}
        </h3>
        
        <button 
          @click.stop="toggleLibrary" 
          class="text-slate-400 hover:text-[#277FCB] transition-colors p-1 flex-shrink-0 mt-0.5"
          title="Add to Library"
        >
          <svg v-if="!activity.inLibrary" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <svg v-else class="w-5 h-5 text-[#277FCB]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
      
      <div class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-auto flex items-center flex-wrap gap-y-1">
        <template v-if="activity.totalEpisodes">
          <span>{{ activity.totalEpisodes }} EPISODES</span>
          <span v-if="activity.currentEpisode" class="mx-1.5">&bull;</span>
          <span v-if="activity.currentEpisode">PART {{ activity.currentEpisode }}</span>
          <span v-if="activity.duration" class="mx-1.5">&bull;</span>
          <span v-if="activity.duration">{{ activity.duration }}</span>
        </template>
        <template v-else>
          <span>{{activity.releaseDate}}</span>
          <span v-if="activity.duration" class="mx-1.5">&bull;</span>
          <span v-if="activity.duration">{{ activity.duration }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const { activeEpisode, isPlaying } = useActivities();

const handleClick = () => {
  // Set global player state
  activeEpisode.value = props.activity;
  isPlaying.value = true;
  
  // Navigate to player view
  router.push({ name: 'activity', params: { id: props.activity.id } });
};

// Handle adding/removing from library
const toggleLibrary = () => {
  // .stop modifier on the @click above prevents the parent card from navigating
  props.activity.inLibrary = !props.activity.inLibrary;
};
</script>