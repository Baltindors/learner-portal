<template>
  <div class="flex-grow flex flex-col items-center justify-center p-8 bg-black/40 relative">
    <!-- MAIN ARTWORK/VISUAL -->
    <div class="w-full max-w-2xl text-center">
      <div class="relative inline-block mb-10 group">
        <div class="absolute -inset-4 bg-[#277FCB]/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <div class="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#065184] to-[#277FCB] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden mx-auto">
          <svg class="w-32 h-32 text-white/20 absolute -bottom-4 -right-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
          <div class="z-10 p-10">
            <div class="text-white text-xl font-bold mb-2">PRIME</div>
            <div class="h-1 w-12 bg-white/40 mb-4 mx-auto rounded"></div>
            <div v-if="activeEpisode" class="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] leading-tight">{{activeEpisode.code}}</div>
          </div>
          
          <!-- Visualizer Bars -->
          <div v-if="isPlaying" class="absolute bottom-6 left-0 right-0 flex items-end justify-center gap-1 h-8">
            <div v-for="n in 5" :key="n" class="w-1.5 bg-white/40 rounded-full animate-pulse" :style="{height: (30 + Math.random()*70) + '%', animationDelay: (n*0.1) + 's'}"></div>
          </div>
        </div>
      </div>

      <!-- TIMESTAMPS / SEGMENTS -->
      <div class="mb-8 w-full max-w-lg mx-auto">
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Jump to Section</h4>
        <div class="flex flex-wrap justify-center gap-2">
          <button v-for="seg in mockSegments" :key="seg.time" 
                  class="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-[11px] font-medium transition-all">
            <span class="opacity-50 mr-1">{{seg.time}}</span> {{seg.label}}
          </button>
        </div>
      </div>

      <!-- CENTERED CONTROLS -->
      <div class="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between text-[10px] text-slate-400 mb-2">
            <span>04:12</span>
            <span>{{ activeEpisode?.duration || '00:00' }}</span>
          </div>
          <div class="h-1.5 w-full bg-white/10 rounded-full relative cursor-pointer overflow-hidden group">
            <div class="absolute top-0 left-0 h-full bg-[#277FCB] rounded-full transition-all group-hover:bg-[#3498db]" style="width: 28%"></div>
          </div>
        </div>

        <!-- Media Context -->
        <div class="flex items-center justify-between">
          <button class="p-2 opacity-50 hover:opacity-100 transition-opacity"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a1 1 0 00-2 0v12a1 1 0 002 0V4zM11 4a1 1 0 10-2 0v12a1 1 0 102 0V4zM17 4a1 1 0 10-2 0v12a1 1 0 102 0V4z"/></svg></button>
          
          <div class="flex items-center gap-6">
            <button class="p-2 opacity-80 hover:opacity-100"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg></button>
            
            <button @click="togglePlay" class="w-16 h-16 bg-[#277FCB] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#277FCB]/30">
              <svg v-if="!isPlaying" class="w-8 h-8 ml-1 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.75.433l10-6.5a.5.5 0 000-.866l-10-6.5A.5.5 0 004.5 3z"/></svg>
              <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            </button>
            
            <button class="p-2 opacity-80 hover:opacity-100"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg></button>
          </div>

          <button class="p-2 opacity-50 hover:opacity-100"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1h2V3zM4.5 5A1.5 1.5 0 003 6.5v8A1.5 1.5 0 004.5 16h11a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0015.5 5h-11zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/></svg></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';
import { mockSegments } from '../../data/activities';

const { activeEpisode, isPlaying } = useActivities();

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};
</script>
