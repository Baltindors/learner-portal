<template>
  <aside class="w-80 border-l border-white/10 hidden xl:flex flex-col bg-slate-900/50">
    <div class="p-6">
      <div class="flex items-center gap-2 mb-6">
        <button 
          @click="activeTab = 'faculty'" 
          :class="['text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all', activeTab === 'faculty' ? 'text-white border-[#277FCB]' : 'text-slate-500 border-transparent hover:text-white']">
          Faculty
        </button>
        <button 
          @click="activeTab = 'transcript'" 
          :class="['text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all', activeTab === 'transcript' ? 'text-white border-[#277FCB]' : 'text-slate-500 border-transparent hover:text-white']">
          Transcript
        </button>
      </div>

      <div v-if="activeTab === 'faculty'" class="space-y-6">
        <div v-for="f in mockFaculty" :key="f.name" class="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-700 rounded-full flex-shrink-0"></div>
            <div>
              <div class="text-sm font-bold">{{f.name}}</div>
              <div class="text-[10px] text-slate-400">{{f.title}}</div>
            </div>
          </div>
          <div class="text-[11px] text-slate-300 leading-relaxed italic">"Expert contributor in multiple Oncology and Hematology podcast series."</div>
          <button class="text-[10px] text-[#277FCB] font-bold text-left hover:underline">View Disclosure →</button>
        </div>
      </div>

      <div v-if="activeTab === 'transcript'" class="space-y-4 text-xs text-slate-400 leading-relaxed flex-1 overflow-y-auto pr-2 no-scrollbar">
        <p v-for="i in 10" :key="i" :class="{'text-white font-medium': i === 3}">
          <span class="text-[10px] font-mono mr-2 text-slate-500">0{{i}}:24</span>
          In this clinical scenario, we observe a significant deviation in the standard of care protocols when patients present with comorbid hypertension. This session aims to bridge that gap by outlining evidence-based strategies...
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { mockFaculty } from '../../data/activities';

const activeTab = ref('faculty');
</script>
