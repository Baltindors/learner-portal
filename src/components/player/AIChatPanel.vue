<template>
  <div :class="['flex flex-col h-full', preferredMode === 'audio' ? 'text-white' : 'text-slate-900']">
    
    <div class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
      <div v-for="(msg, idx) in messages" :key="idx" 
           :class="['flex flex-col max-w-[90%]', msg.sender === 'User' ? 'ml-auto items-end' : 'mr-auto items-start']">
        
        <span class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">{{ msg.sender }}</span>
        
        <div :class="['p-3 rounded-lg text-sm leading-relaxed shadow-sm', 
             msg.sender === 'User' ? 'bg-[#277FCB] text-white' : (preferredMode === 'audio' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 border border-slate-200 text-slate-800')]">
          <p v-html="formatMessage(msg.text)"></p>
        </div>
        
      </div>
      
      <div v-if="isListening" class="flex flex-col items-center justify-center py-6 text-indigo-500">
        <div class="flex items-center gap-1 mb-2">
          <div class="w-1 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
          <div class="w-1 h-5 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
          <div class="w-1 h-4 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
          <div class="w-1 h-2 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 0.3s"></div>
        </div>
        <span class="text-xs font-semibold animate-pulse">Listening...</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t shrink-0" :class="preferredMode === 'audio' ? 'border-white/10 bg-slate-900/50' : 'border-slate-200 bg-white'">
      <div class="relative flex items-center">
        <input 
          v-model="userInput" 
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Ask a clinical question..." 
          class="w-full py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none transition-colors border"
          :class="preferredMode === 'audio' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-400'"
        />
        
        <button 
          @click="startListening" 
          class="absolute right-2 p-1.5 rounded-full hover:bg-indigo-100/50 text-indigo-500 transition-colors"
          title="Voice input"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useActivities } from '../../composables/useActivities';

const { activeEpisode, preferredMode } = useActivities();

const messages = ref([]);
const userInput = ref('');
const isListening = ref(false);

const generateWelcome = () => {
  if (activeEpisode.value) {
    const topic = activeEpisode.value.tags?.[0] || 'clinical settings';
    messages.value = [{
      sender: 'AI Expert',
      text: `I've analyzed the ${topic} guidelines for this session. How can I help you today?`
    }];
  } else {
    messages.value = [{
      sender: 'AI Expert',
      text: "I'm ready. Select an activity to get started."
    }];
  }
};

onMounted(() => {
  generateWelcome();
});

watch(activeEpisode, () => {
  generateWelcome();
});

const formatMessage = (text) => {
  // Convert [Source: X] into a span with hover tooltip
  // We use dark styling for tooltips if needed or just use title attribute
  return text.replace(/\[Source: (.*?)\]/g, `<span class="inline-block mx-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded cursor-help border border-indigo-200" title="$1">Citation</span>`);
};

const handleAiResponse = (userText) => {
  let aiText = '';
  const q = userText.toLowerCase();
  
  if (q.includes('dosage') || q.includes('dose') || q.includes('dosages')) {
    aiText = "Based on the latest protocols discussed in this session, the recommended starting dosage is 10mg daily, escalating as tolerated. Adjustments should be made for renal impairment. [Source: NCCN Guidelines 2026] [Source: FDA Prescribing Info]";
  } else {
    const defaultTag = activeEpisode.value?.tags?.[0] || 'general practice';
    aiText = `In the context of ${defaultTag}, evidence suggests that interdisciplinary care models improve patient outcomes significantly. Would you like me to find specific case studies related to this? [Source: Clinical Review 2025]`;
  }
  
  messages.value.push({
    sender: 'AI Expert',
    text: aiText
  });
};

const sendMessage = () => {
  if (!userInput.value.trim()) return;
  const txt = userInput.value.trim();
  messages.value.push({ sender: 'User', text: txt });
  userInput.value = '';
  
  setTimeout(() => {
    handleAiResponse(txt);
  }, 600);
};

const startListening = () => {
  if (isListening.value) return;
  isListening.value = true;
  
  setTimeout(() => {
    isListening.value = false;
    const fakeQuestion = "What are the recommended dosages for this treatment?";
    messages.value.push({ sender: 'User', text: fakeQuestion });
    
    setTimeout(() => {
      handleAiResponse(fakeQuestion);
    }, 800);
  }, 3000);
};
</script>
