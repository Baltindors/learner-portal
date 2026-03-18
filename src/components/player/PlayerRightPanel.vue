<template>
  <aside :class="['w-80 border-l hidden xl:flex flex-col transition-colors duration-500', 
                  preferredMode === 'audio' ? 'border-white/10 bg-slate-900/50 text-white' : 'border-slate-200 bg-white text-slate-900']">
    <div class="p-6">
      <div class="flex items-center gap-2 mb-6">
        <button 
          @click="activeTab = 'faculty'" 
          :class="['text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all', 
                   activeTab === 'faculty' ? (preferredMode === 'audio' ? 'text-white border-[#277FCB]' : 'text-slate-900 border-[#277FCB]') : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white']">
          Faculty
        </button>
        <button 
          @click="activeTab = 'transcript'" 
          :class="['text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all', 
                   activeTab === 'transcript' ? (preferredMode === 'audio' ? 'text-white border-[#277FCB]' : 'text-slate-900 border-[#277FCB]') : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white']">
          Transcript
        </button>
      </div>

      <div v-if="activeTab === 'faculty'" class="space-y-6">
        <div v-for="f in mockFaculty" :key="f.name" :class="['flex flex-col gap-3 p-4 rounded-xl border transition-colors duration-500', 
             preferredMode === 'audio' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200']">
          <div class="flex items-center gap-4">
            <div :class="['w-12 h-12 rounded-full flex-shrink-0 transition-colors duration-500', preferredMode === 'audio' ? 'bg-slate-700' : 'bg-slate-300']"></div>
            <div>
              <div class="text-sm font-bold">{{f.name}}</div>
              <div :class="['text-[10px] transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-500']">{{f.title}}</div>
            </div>
          </div>
          <div :class="['text-[11px] leading-relaxed italic transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-300' : 'text-slate-600']">"Expert contributor in multiple Oncology and Hematology podcast series."</div>
          <button class="text-[10px] text-[#277FCB] font-bold text-left hover:underline">View Disclosure →</button>
        </div>
      </div>

      <div v-if="activeTab === 'transcript'" :class="['space-y-4 text-xs leading-relaxed flex-1 overflow-y-auto pr-2 no-scrollbar', preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-600']">
        <p v-for="i in 10" :key="i" :class="{'font-medium': i === 3, 'text-white': i === 3 && preferredMode === 'audio', 'text-slate-900': i === 3 && preferredMode === 'video'}">
          <span :class="['text-[10px] font-mono mr-2 transition-colors duration-500', preferredMode === 'audio' ? 'text-slate-500' : 'text-slate-400']">0{{i}}:24</span>
          In this clinical scenario, we observe a significant deviation in the standard of care protocols when patients present with comorbid hypertension. This session aims to bridge that gap by outlining evidence-based strategies...
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { mockFaculty } from '../../data/activities';
import { useActivities } from '../../composables/useActivities';

const activeTab = ref('faculty');
const { preferredMode } = useActivities();
</script>
