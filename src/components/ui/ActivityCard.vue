<template>
  <div 
    @click="handleClick"
    class="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-[#277FCB] transition-all cursor-pointer group custom-shadow flex flex-col h-full"
  >
    <div class="bg-slate-200 aspect-video relative overflow-hidden flex-shrink-0">
      <img
        v-if="activity.thumbnail"
        :src="activity.thumbnail"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <span class="absolute top-2 left-2 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">{{activity.ceAmount}}</span>
      
      <!-- Primary tag display -->
      <div class="absolute bottom-2 left-2 right-2 text-white font-bold text-xs truncate">
        {{ activity.tags[0] }}  
      </div>
      
      <div v-if="compact" class="absolute bottom-2 right-2 bg-[#03C84F] w-2 h-2 rounded-full shadow-[0_0_8px_rgba(3,200,79,0.8)]"></div>
    </div>
    
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#277FCB] transition-colors mb-2 flex-grow">
        {{activity.title}}
      </h3>
      
      <div v-if="!compact" class="flex items-center justify-between text-[11px] text-slate-500 mt-auto">
        <span>Released: {{activity.releaseDate}}</span>
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg> 
          Audio
        </span>
      </div>
      <div v-else class="text-[11px] text-slate-500 uppercase tracking-tighter mt-auto">
        {{activity.releaseDate}}
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
</script>
