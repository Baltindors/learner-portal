<template>
  <main class="flex-grow flex flex-col bg-slate-900 text-white overflow-hidden">
    <!-- TOP NAV FOR PLAYER -->
    <div class="p-4 flex justify-between items-center border-b border-white/10">
      <button @click="$emit('closeActivity')" class="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Portal
      </button>
      <div class="text-center flex-1 hidden md:block">
        <div class="text-xs uppercase tracking-widest text-slate-400 mb-1">Now Playing • Part {{ getEpisodeOrder(activeEpisode.Code) }}</div>
        <div class="text-sm font-bold text-white max-w-md mx-auto truncate">{{ activeEpisode.Title }}</div>
      </div>
      <div class="flex gap-4">
        <button class="text-sm opacity-70">Credit Inquiry</button>
        <button class="text-sm opacity-70">Support</button>
      </div>
    </div>

    <!-- MAIN PLAYER CONTENT -->
    <div class="flex-grow flex">
      <!-- LEFT: VIDEO/PLAYER -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 bg-black flex items-center justify-center relative">
          <div class="text-center">
            <div class="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
              </svg>
            </div>
            <div class="text-lg font-bold">{{ activeEpisode.Title }}</div>
            <div class="text-sm text-slate-400">{{ activeEpisode.Code }}</div>
          </div>
          <!-- PLAY/PAUSE CONTROLS -->
          <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
              </svg>
            </button>
            <button class="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
              <svg v-if="!isPlaying" class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l8-5-8-5z"/>
              </svg>
              <svg v-else class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
              </svg>
            </button>
          </div>
        </div>
        <!-- PROGRESS BAR -->
        <div class="bg-slate-800 p-4">
          <div class="flex items-center gap-4 text-sm">
            <span>00:00</span>
            <div class="flex-1 bg-slate-600 h-1 rounded">
              <div class="bg-[#277FCB] h-1 rounded w-1/4"></div>
            </div>
            <span>15:30</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: DETAILS -->
      <div class="w-80 bg-slate-800 border-l border-white/10 flex flex-col">
        <!-- TABS -->
        <div class="flex border-b border-white/10">
          <button
            v-for="tab in ['faculty', 'segments', 'transcript']"
            :key="tab"
            @click="rightTab = tab"
            :class="['flex-1 py-3 text-sm font-medium capitalize', rightTab === tab ? 'text-white border-b-2 border-[#277FCB]' : 'text-slate-400 hover:text-white']"
          >
            {{ tab }}
          </button>
        </div>

        <!-- TAB CONTENT -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- FACULTY -->
          <div v-if="rightTab === 'faculty'">
            <h3 class="text-lg font-bold mb-4">Faculty</h3>
            <div v-for="faculty in mockFaculty" :key="faculty.name" class="mb-4">
              <div class="font-semibold">{{ faculty.name }}</div>
              <div class="text-sm text-slate-400">{{ faculty.title }}</div>
            </div>
          </div>

          <!-- SEGMENTS -->
          <div v-if="rightTab === 'segments'">
            <h3 class="text-lg font-bold mb-4">Segments</h3>
            <div v-for="segment in mockSegments" :key="segment.time" class="flex items-center gap-3 mb-3 cursor-pointer hover:text-[#277FCB]">
              <div class="w-2 h-2 bg-[#277FCB] rounded-full"></div>
              <div class="text-sm">{{ segment.time }}</div>
              <div class="text-sm flex-1">{{ segment.label }}</div>
            </div>
          </div>

          <!-- TRANSCRIPT -->
          <div v-if="rightTab === 'transcript'">
            <h3 class="text-lg font-bold mb-4">Transcript</h3>
            <div class="text-sm text-slate-300">
              <p class="mb-2">[00:00] Welcome to this clinical podcast on...</p>
              <p class="mb-2">[02:45] Let's discuss the clinical guidelines...</p>
              <p class="mb-2">[07:15] Now, let's look at some case studies...</p>
              <p class="mb-2">[12:30] In conclusion, thank you for listening...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { mockFaculty, mockSegments, getEpisodeOrder } from '../stores/podcastStore.js'

const props = defineProps({
  activeEpisode: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeActivity'])

const rightTab = ref('faculty')
const isPlaying = ref(false)
</script>

<style scoped>
</style>