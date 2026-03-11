<template>
  <div v-if="activeEpisode" class="flex-grow flex flex-col bg-slate-900 text-white overflow-hidden absolute inset-0 z-[100]">
    <!-- TOP NAV FOR PLAYER -->
    <div class="p-4 flex justify-between items-center border-b border-white/10 shrink-0">
      <button @click="goBack" class="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Home
      </button>
      <div class="text-center flex-1 hidden md:block">
        <div class="text-xs uppercase tracking-widest text-slate-400 mb-1">Now Playing • Part {{getEpisodeOrder(activeEpisode.code)}}</div>
        <div class="text-sm font-bold text-white max-w-md mx-auto truncate">{{activeEpisode.title}}</div>
      </div>
      <div class="flex gap-4">
        <button class="text-sm opacity-70">Claim Credit</button>
        <button class="text-sm opacity-70">Support</button>
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
  <div v-else class="flex items-center justify-center p-12 h-screen w-screen bg-slate-900 absolute inset-0 z-[100]">
    <div class="text-white text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
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
const { activeEpisode, getActivityById, isPlaying, getEpisodeOrder, loadActivityAndPlay, stopTimers } = useActivities();

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
  activeEpisode.value = null;
  isPlaying.value = false;
  stopTimers();
  router.push('/');
};
</script>
