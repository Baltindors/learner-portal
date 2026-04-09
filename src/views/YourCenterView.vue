<template>
  <div class="py-2 animate-in fade-in duration-500">
    <!-- Overlay onboarding trigger -->
    <div v-if="userProfile.professions.length === 0" class="fixed inset-0 bg-slate-900/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full animate-in zoom-in-95 duration-300">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-[#277FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#065184] to-[#277FCB]">Tailor Your Experience</h2>
          <p class="text-slate-500 mt-2">Select your profession and specialties to personalize your learning center.</p>
        </div>
        
        <div class="mb-6">
          <label class="block font-semibold mb-3 text-slate-800 text-sm uppercase tracking-wider">Your Profession</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="prof in professionsList" :key="prof" 
              class="px-4 py-2 border rounded-full text-sm font-medium transition-all"
              :class="tempProfile.professions.includes(prof) ? 'bg-[#277FCB] text-white border-[#277FCB] shadow-md transform scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-[#277FCB] hover:text-[#277FCB]'"
              @click="toggleTempProfession(prof)">
              {{ prof }}
            </button>
          </div>
        </div>

        <div class="mb-8">
          <label class="block font-semibold mb-3 text-slate-800 text-sm uppercase tracking-wider">Your Specialties</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="spec in therapeuticAreas" :key="spec" 
              class="px-4 py-2 border rounded-full text-sm font-medium transition-all"
              :class="tempProfile.specialties.includes(spec) ? 'bg-[#277FCB] text-white border-[#277FCB] shadow-md transform scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-[#277FCB] hover:text-[#277FCB]'"
              @click="toggleTempSpecialty(spec)">
              {{ spec }}
            </button>
          </div>
        </div>

        <div class="flex justify-end border-t border-slate-100 pt-6">
          <button @click="saveProfile" 
            :disabled="tempProfile.professions.length === 0 || tempProfile.specialties.length === 0"
            class="bg-[#277FCB] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1a5b94] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Save Preferences
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="bg-gradient-to-br from-[#065184] via-[#1069A3] to-[#277FCB] rounded-xl p-10 text-white mb-12 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
        <!-- Abstract design elements -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl"></div>
        
        <div class="relative z-10">
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Welcome to Your Personal Center</h1>
          <p class="text-lg md:text-xl text-blue-100 font-light flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Tailored activities and recommendations just for you.
          </p>
        </div>
        
        <div class="mt-8 md:mt-0 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col items-center gap-3 relative z-10 w-full md:w-auto shadow-lg">
          <span class="font-semibold text-sm uppercase tracking-wide text-blue-50">Set As Default Homepage</span>
          <button 
            @click="toggleCustomHomepage"
            class="w-16 h-8 rounded-full transition-colors relative flex items-center shadow-inner cursor-pointer"
            :class="userProfile.isCustomHomepage ? 'bg-green-400' : 'bg-white/20'"
            aria-label="Toggle Custom Homepage"
          >
            <span class="absolute top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-sm" 
              :class="userProfile.isCustomHomepage ? 'translate-x-9' : 'translate-x-1'"></span>
          </button>
        </div>
      </div>

      <!-- Rails -->
      <ActivityRail v-if="continueWatching.length > 0" title="Continue Watching" :items="continueWatching" />
      
      <div v-if="userProfile.specialties.length > 0">
        <ActivityRail :title="`Recommended for ${userProfile.specialties[0]}`" :items="tailoredActivities" />
      </div>
      
      <ActivityRail v-if="mySavedLibrary.length > 0" title="My Saved Activities" :items="mySavedLibrary" />
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useActivities } from '../composables/useActivities';
import { professionsList } from '../data/activities';
import ActivityRail from '../components/ui/ActivityRail.vue';

const { userProfile, toggleCustomHomepage, mySavedLibrary, activities, tailoredActivities, therapeuticAreas } = useActivities();

const tempProfile = ref({
  professions: [...userProfile.value.professions],
  specialties: [...userProfile.value.specialties]
});

const toggleTempProfession = (prof) => {
  const index = tempProfile.value.professions.indexOf(prof);
  if (index >= 0) tempProfile.value.professions.splice(index, 1);
  else tempProfile.value.professions.push(prof);
};

const toggleTempSpecialty = (spec) => {
  const index = tempProfile.value.specialties.indexOf(spec);
  if (index >= 0) tempProfile.value.specialties.splice(index, 1);
  else tempProfile.value.specialties.push(spec);
};

const saveProfile = () => {
  userProfile.value.professions = [...tempProfile.value.professions];
  userProfile.value.specialties = [...tempProfile.value.specialties];
};

const continueWatching = computed(() => {
  // Pull activities with progress > 0 that match specialty
  return activities.value.filter(item => 
    item.progress > 0 && 
    userProfile.value.specialties.some(sp => 
      item.therapeuticAreas?.includes(sp) || item.tags?.includes(sp)
    )
  );
});
</script>
