<template>
  <div 
    class="mb-12 relative w-full min-h-[420px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl group bg-white border border-slate-200 flex"
    @mouseenter="pauseTimer"
    @mouseleave="startTimer"
  >
    <div 
      v-for="(activity, index) in latestActivities" 
      :key="activity.id"
      class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
      :class="currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <div v-if="activity.thumbnail" class="absolute inset-0 md:inset-auto md:right-0 md:top-0 w-full md:w-2/3 h-full">
        <img 
          :src="activity.thumbnail" 
          alt="" 
          class="absolute inset-0 w-full h-full object-cover object-center md:object-right"
        />
        
        <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 md:hidden"></div>
        
        <div class="hidden md:block absolute inset-0 bg-gradient-to-r from-white from-0% via-white/50 via-15% to-transparent to-30%"></div>
      </div>
      <div v-else class="absolute inset-0 w-full h-full bg-slate-50"></div>
      
      <div class="absolute inset-0 p-6 pt-10 md:p-12 flex flex-col justify-center w-full md:w-2/3 lg:w-3/5">
        
        <div class="flex items-center gap-2 mb-3 md:mb-4">
          <span class="bg-[#065184] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded shadow-sm">
            Latest Release
          </span>
          <span v-if="activity.cmeAmount || activity.ceAmount" class="bg-[#277FCB]/10 text-[#277FCB] border border-[#277FCB]/20 text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
            {{ activity.cmeAmount || activity.ceAmount }}
          </span>
        </div>
        
        <div class="text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
          <span>{{ activity.type || 'Activity' }}</span>
          <span class="text-slate-300">&bull;</span>
          <span>{{ activity.releaseDate }}</span>
        </div>

        <h2 class="font-['Inter'] text-2xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-6 md:mb-6 leading-snug md:leading-none line-clamp-4 md:line-clamp-3 drop-shadow-sm">
          {{ activity.title }}
        </h2>

        <div class="flex flex-wrap items-center gap-3">
          <button 
            @click="startLearning(activity)" 
            class="bg-[#277FCB] hover:bg-[#66B2FF] text-white font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-colors shadow-md flex items-center gap-2 text-sm md:text-base"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>
            Start Learning
          </button>
          
          <button 
            @click="toggleLibrary(activity)" 
            class="bg-white text-[#277FCB] border border-[#277FCB] hover:bg-[#277FCB]/10 py-2.5 px-4 md:py-3 md:px-4 rounded-lg transition-all shadow-sm flex items-center gap-2 font-semibold text-sm md:text-base"
          >
            <svg v-if="!activity.inLibrary" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <svg v-else class="w-5 h-5 text-[#277FCB]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            {{ activity.inLibrary ? 'Saved' : 'Save' }}
          </button>
        </div>

      </div>
    </div>

    <div class="absolute bottom-4 md:bottom-6 left-6 md:left-12 flex items-center gap-2 z-20">
      <button 
        v-for="(activity, index) in latestActivities" 
        :key="'dot-' + index"
        @click="goToSlide(index)"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'w-8 bg-[#0F172A]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
      ></button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useActivities } from '../../composables/useActivities';

const router = useRouter();
const { activities, activeEpisode, isPlaying } = useActivities();

const latestActivities = computed(() => {
  return activities.value.slice(0, 3);
});

const currentIndex = ref(0);
let timer = null;

const startTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % latestActivities.value.length;
  }, 5000); 
};

const pauseTimer = () => {
  if (timer) clearInterval(timer);
};

const goToSlide = (index) => {
  currentIndex.value = index;
  startTimer(); 
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const startLearning = (activity) => {
  activeEpisode.value = activity;
  isPlaying.value = true;
  router.push({ name: 'activity', params: { id: activity.id } });
};

const toggleLibrary = (activity) => {
  activity.inLibrary = !activity.inLibrary;
};
</script>