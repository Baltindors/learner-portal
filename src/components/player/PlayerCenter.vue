<template>
  <div :class="['flex-grow flex flex-col items-center justify-center p-8 relative transition-colors duration-500', 
                preferredMode === 'audio' ? 'bg-black/40' : 'bg-transparent']">
    <!-- MAIN ARTWORK/VISUAL -->
    <div class="w-full max-w-2xl text-center">
      <!-- AUDIO MODE VISUALIZATION -->
      <div v-if="preferredMode === 'audio'" class="relative inline-block mb-10 group">
        <div class="absolute -inset-4 bg-[#277FCB]/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <div class="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#065184] to-[#277FCB] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden mx-auto">
          <svg class="w-32 h-32 text-white/20 absolute -bottom-4 -right-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
          <div class="z-10 p-10">
            <div class="text-white text-xl font-bold mb-2">PRIME</div>
            <div class="h-1 w-12 bg-white/40 mb-4 mx-auto rounded"></div>
            <div v-if="activeEpisode" class="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] leading-tight">PODCAST</div>
          </div>
          
          <!-- Visualizer Bars -->
          <div v-if="isPlaying" class="absolute bottom-6 left-0 right-0 flex items-end justify-center gap-1 h-8">
            <div v-for="n in 5" :key="n" class="w-1.5 bg-white/40 rounded-full animate-pulse" :style="{height: (30 + Math.random()*70) + '%', animationDelay: (n*0.1) + 's'}"></div>
          </div>
        </div>
      </div>

      <!-- VIDEO MODE PLAYER PLACEHOLDER -->
      <div v-else class="w-full aspect-video bg-black rounded-lg shadow-xl relative overflow-hidden mb-10 group flex items-center justify-center">
         <div v-if="isPlaying" class="absolute inset-0 bg-transparent">
           <!-- Simulated video playing -->
           <div class="absolute top-4 left-4 text-white text-sm font-bold bg-black/50 px-3 py-1 rounded backdrop-blur">
             Activity Video Stream
           </div>
         </div>
         <div v-else class="absolute inset-0 flex items-center justify-center bg-black/40">
           <!-- Paused state or poster -->
           <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
             <svg class="w-10 h-10 ml-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.75.433l10-6.5a.5.5 0 000-.866l-10-6.5A.5.5 0 004.5 3z"/></svg>
           </div>
         </div>
      </div>

      <!-- TIMESTAMPS / SEGMENTS -->
      <div class="mb-8 w-full max-w-lg mx-auto">
        <h4 :class="['text-[10px] font-bold uppercase tracking-widest mb-3 transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">Jump to Section</h4>
        <div class="flex flex-wrap justify-center gap-2">
          <button v-for="seg in mockSegments" :key="seg.time" 
                  :class="['border rounded-full px-4 py-1.5 text-[11px] font-medium transition-all', 
                           preferredMode === 'audio' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm']">
            <span :class="['mr-1 transition-opacity', preferredMode === 'audio' ? 'opacity-50' : 'opacity-60']">{{seg.time}}</span> {{seg.label}}
          </button>
        </div>
      </div>

      <!-- CENTERED CONTROLS -->
      <div :class="['w-full max-w-lg mx-auto backdrop-blur-md rounded-3xl p-6 border shadow-2xl transition-colors duration-500', 
                    preferredMode === 'audio' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-slate-200/50']">
        <!-- Progress Bar -->
        <div class="mb-6">
          <div :class="['flex justify-between text-[10px] mb-2 tabular-nums transition-colors duration-500', 
                        preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">
            <span>00:{{ Math.floor((playbackProgress / 100) * 10).toString().padStart(2, '0') }}</span>
            <span>00:10</span>
          </div>
          <div :class="['h-1.5 w-full rounded-full relative cursor-pointer overflow-hidden group transition-colors duration-500', 
                        preferredMode === 'audio' ? 'bg-white/10' : 'bg-slate-200']">
            <div class="absolute top-0 left-0 h-full bg-[#277FCB] rounded-full transition-all group-hover:bg-[#3498db]" :style="{ width: `${playbackProgress}%` }"></div>
          </div>
        </div>

        <!-- Media Context -->
        <div :class="['flex items-center justify-between transition-colors duration-500', preferredMode === 'audio' ? 'text-white' : 'text-slate-700']">
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

    <!-- COUNTDOWN OVERLAY -->
    <div v-if="isCountingDown" class="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col items-center justify-center">
      <div class="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-4">Next Episode Auto-Play In</div>
      <div class="text-8xl font-black text-white mb-8 tabular-nums">{{countdownValue}}</div>
      <div class="w-24 h-24 rounded-full border-4 border-[#277FCB]/30 border-t-[#277FCB] animate-spin"></div>
    </div>
    
    <!-- END OF SERIES SCREEN -->
<div 
  v-if="isSeriesEnded" 
  class="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 text-center transition-all duration-700"
  :class="preferredMode === 'audio' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'"
>
  <h2 class="text-3xl font-black mb-2" :class="preferredMode === 'audio' ? 'text-white' : 'text-slate-900'">
    Series Complete
  </h2>
  <p class="mb-10 text-lg" :class="preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500'">
    Up Next / You May Also Like
  </p>
  
  <div class="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
    <div 
      v-for="rel in relatedSeries" 
      :key="rel.id" 
      @click="loadActivityAndPlay(rel)"
      class="w-64 border rounded-xl p-5 cursor-pointer text-left transition-all hover:-translate-y-1 hover:shadow-xl"
      :class="preferredMode === 'audio' 
        ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:shadow-[#277FCB]/20' 
        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm shadow-slate-200'"
    >
      <div class="h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden" 
           :class="preferredMode === 'audio' ? 'bg-slate-700' : 'bg-slate-200'">
        <img 
          v-if="rel.thumbnail" 
          :src="rel.thumbnail" 
          class="w-full h-full object-cover"
          alt=""
        />
        <svg v-else class="w-8 h-8" :class="preferredMode === 'audio' ? 'text-white/20' : 'text-slate-400'" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
        </svg>
      </div>
      <div class="text-[10px] text-[#277FCB] font-bold mb-1 line-clamp-1 uppercase tracking-wider">
        {{rel.tags[0]}}
      </div>
      <div class="text-sm font-semibold line-clamp-2 leading-tight" 
           :class="preferredMode === 'audio' ? 'text-white' : 'text-slate-800'">
        {{rel.title}}
      </div>
    </div>
  </div>
  
  <button 
    @click="stopTimers(); activeEpisode = null" 
    class="mt-10 px-8 py-3 rounded-full border text-sm font-bold transition-colors"
    :class="preferredMode === 'audio' 
      ? 'border-white/20 text-white opacity-80 hover:opacity-100 hover:bg-white/5' 
      : 'border-slate-300 text-slate-700 hover:bg-slate-100'"
  >
    Browse Library
  </button>
</div>
  </div>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';
import { mockSegments } from '../../data/activities';

const { 
  activeEpisode, isPlaying, playbackProgress, 
  isCountingDown, countdownValue, isSeriesEnded,
  relatedSeries, loadActivityAndPlay, stopTimers, startSimulatedPlayback, preferredMode
} = useActivities();

const togglePlay = () => {
  if (isPlaying.value) {
    stopTimers();
    isPlaying.value = false;
  } else {
    startSimulatedPlayback();
  }
};
</script>
