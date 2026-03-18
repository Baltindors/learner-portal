<template>
  <div v-if="activeEpisode" 
       :class="['flex-grow flex flex-col overflow-hidden absolute inset-0 z-[100] transition-colors duration-500', 
                preferredMode === 'audio' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900']">
    <!-- TOP NAV FOR PLAYER -->
    <div :class="['p-4 flex justify-between items-center border-b shrink-0 transition-colors duration-500',
                  preferredMode === 'audio' ? 'border-white/10' : 'border-slate-200']">
      <button @click="goBack" class="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Activity
      </button>
      <div class="text-center flex-1 hidden md:flex flex-col items-center justify-center">
        <div :class="['text-xs uppercase tracking-widest mb-1 transition-colors duration-500',
                      preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">
          Now Playing • Part {{getEpisodeOrder(activeEpisode.code)}}
        </div>
        <div :class="['text-sm font-bold max-w-md mx-auto truncate transition-colors duration-500',
                      preferredMode === 'audio' ? 'text-white' : 'text-slate-900']">
          {{activeEpisode.title}}
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <!-- MODE SWITCHER -->
        <div class="flex items-center bg-black/10 rounded-full p-1 border border-black/5 dark:bg-white/10 dark:border-white/5 mr-4 overflow-hidden relative" :class="preferredMode === 'audio' ? 'bg-white/10 border-white/5' : 'bg-black/5 border-black/5'">
            <!-- Animated Background pill -->
            <div class="absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out" :class="preferredMode === 'video' ? 'left-1' : 'left-[calc(50%+2px)]'"></div>
            <button @click="togglePlaybackMode" :class="['relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-300', preferredMode === 'video' ? 'text-slate-900' : 'text-slate-500 hover:text-white']">Video</button>
            <button @click="togglePlaybackMode" :class="['relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-300', preferredMode === 'audio' ? 'text-slate-900' : 'text-slate-500 hover:text-white']">Audio</button>
        </div>

        <button class="text-sm opacity-70 hover:opacity-100 transition-opacity">Claim Credit</button>
        <button class="text-sm opacity-70 hover:opacity-100 transition-opacity">Support</button>
      </div>
    </div>

    <!-- MAIN PLAYER LAYOUT -->
    <div class="flex-grow flex overflow-hidden">
      <!-- SIDEBAR: EPISODES & RELATED -->
      <PlayerSidebar />

      <!-- CENTER: THE PLAYER -->
      <PlayerCenter />

      <!-- RIGHT PANEL: FACULTY & TRANSCRIPT -->
      <PlayerRightPanel />
    </div>
  </div>
  <div v-else class="flex items-center justify-center p-12 h-screen w-screen absolute inset-0 z-[100] transition-colors duration-500" :class="preferredMode === 'audio' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" :class="preferredMode === 'audio' ? 'border-white' : 'border-slate-900'"></div>
      <p>Loading activity...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useActivities } from '../composables/useActivities';

import PlayerSidebar from '../components/player/PlayerSidebar.vue';
import PlayerCenter from '../components/player/PlayerCenter.vue';
import PlayerRightPanel from '../components/player/PlayerRightPanel.vue';

const route = useRoute();
const router = useRouter();
const { activeEpisode, getActivityById, isPlaying, getEpisodeOrder, loadActivityAndPlay, stopTimers, preferredMode, togglePlaybackMode } = useActivities();

const loadActivity = (id) => {
  const activity = getActivityById(id);
  if (activity) {
    loadActivityAndPlay(activity);
  } else {
    // Navigate home if activity not found
    router.push('/');
  }
};

onMounted(() => {
  loadActivity(route.params.id);
});

// Watch for route changes (e.g., clicking related items in sidebar)
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadActivity(newId);
  }
});

const goBack = () => {
  const currentId = activeEpisode.value?.id || route.params.id;
  
  activeEpisode.value = null;
  isPlaying.value = false;
  stopTimers();
  
  router.push({ 
    name: 'activity-frontmatter', 
    params: { id: currentId } 
  });
};
</script>
