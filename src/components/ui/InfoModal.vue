<template>
  <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <!-- BACKDROP -->
    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md" @click="$emit('close')"></div>
    
    <!-- MODAL CONTENT -->
    <div class="relative w-full max-w-lg bg-slate-800 border border-white/10 rounded-2xl p-8 shadow-2xl">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <h2 class="text-xl font-bold text-white mb-2">Activity Information</h2>
      <p class="text-slate-400 text-sm mb-6">Placeholder for Activity Frontmatter Information.</p>
      
      <div v-if="activity" class="bg-white/5 rounded-xl p-4 mb-6">
        <div class="text-[10px] text-[#277FCB] font-bold uppercase tracking-wider mb-1">{{ activity.code }}</div>
        <div class="text-sm font-semibold text-white">{{ activity.title }}</div>
        <div class="text-xs text-slate-400 mt-2">{{ activity.tags?.join(', ') || 'No tags available' }}</div>
      </div>
      
      <div class="flex justify-end gap-3">
        <button @click="$emit('close')" class="px-5 py-2 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  activity: Object
});
defineEmits(['close']);
</script>
