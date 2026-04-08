<template>
  <aside
    :class="[
      'w-96 2xl:w-[450px] border-l hidden xl:flex flex-col transition-colors duration-500',
      preferredMode === 'audio'
        ? 'border-white/10 bg-slate-900/50 text-white'
        : 'border-slate-200 bg-white text-slate-900',
    ]"
  >
    <div class="p-6 pb-4 shrink-0 flex items-center gap-4">
      <button
        @click="activeTab = 'aiNavigator'"
        :class="[
          'text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all flex items-center gap-1',
          activeTab === 'aiNavigator'
            ? 'text-indigo-500 border-indigo-500'
            : 'text-slate-500 border-transparent hover:text-indigo-400',
        ]"
      >
        <span>✨ AI Navigator</span>
      </button>
      <button
        @click="activeTab = 'transcript'"
        :class="[
          'text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all',
          activeTab === 'transcript'
            ? preferredMode === 'audio'
              ? 'text-white border-[#277FCB]'
              : 'text-slate-900 border-[#277FCB]'
            : 'text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-white',
        ]"
      >
        Transcript
      </button>
    </div>

    <!-- Active Content Area -->
    <div class="flex-1 overflow-hidden relative">
      <div
        v-if="activeTab === 'transcript'"
        :class="[
          'p-6 pt-0 space-y-4 text-xs leading-relaxed w-full h-full overflow-y-auto pr-8 no-scrollbar',
          preferredMode === 'audio' ? 'text-slate-400' : 'text-slate-600',
        ]"
      >
        <p
          v-for="i in 10"
          :key="i"
          :class="{
            'font-medium': i === 3,
            'text-white': i === 3 && preferredMode === 'audio',
            'text-slate-900': i === 3 && preferredMode === 'video',
          }"
        >
          <span
            :class="[
              'text-[10px] font-mono mr-2 transition-colors duration-500',
              preferredMode === 'audio' ? 'text-slate-500' : 'text-slate-400',
            ]"
            >0{{ i }}:24</span
          >
          In this clinical scenario, we observe a significant deviation in the standard of care
          protocols when patients present with comorbid hypertension. This session aims to bridge
          that gap by outlining evidence-based strategies...
        </p>
      </div>

      <div v-if="activeTab === 'aiNavigator'" class="absolute inset-0">
        <AIChatPanel />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useActivities } from '../../composables/useActivities'
import AIChatPanel from './AIChatPanel.vue'

const activeTab = ref('aiNavigator')
const { preferredMode } = useActivities()
</script>
