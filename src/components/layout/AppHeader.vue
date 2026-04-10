<template>
  <header class="bg-[#065184] text-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-md">
    <div class="flex items-center gap-4">
      <router-link to="/" class="font-bold text-2xl tracking-tight flex items-center">
        PRIME<span class="font-light opacity-80 pl-1">EDUCATION</span>
      </router-link>
      <div class="hidden md:block h-6 w-px bg-white/20 mx-2"></div>
      
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium opacity-90">
        <router-link to="/" class="hover:text-white border-b-2 border-transparent hover:border-white transition-all pb-1" active-class="border-white text-white" exact-active-class="border-white text-white">Home</router-link>
        <router-link to="/your-center" class="hover:opacity-100 opacity-70 transition-opacity" active-class="opacity-100 border-b-2 border-white pb-1">Your Center</router-link>
        <a href="#" class="hover:opacity-100 opacity-70 transition-opacity">Credit Center</a>
        
        <div class="relative group py-2">
          <button class="flex items-center gap-1 hover:opacity-100 opacity-70 transition-opacity">
            Specialty Centers
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          <div class="absolute top-full left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 translate-y-2 pt-2 z-50">
            <div class="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col p-1.5">
              <router-link 
                v-for="area in therapeuticAreas" 
                :key="area"
                :to="{ name: 'center', params: { name: area } }"
                class="px-4 py-2.5 text-slate-700 hover:text-[#277FCB] hover:bg-slate-50 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between group/item"
              >
                {{ area }} Center
                <svg class="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7-7"></path></svg>
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
    
    <div class="flex items-center gap-2 md:gap-4">
      <button 
        @click="toggleSearch" 
        :class="[
          'p-2 rounded-full transition-all duration-300 w-9 h-9 flex items-center justify-center',
          isSearchPanelOpen ? 'bg-white text-[#065184]' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
        ]"
        title="Toggle Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>

      <button class="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all duration-300 w-9 h-9 flex items-center justify-center hover:scale-105" title="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </button>

      <div class="w-9 h-9 rounded-full bg-[#3b8cd6] flex items-center justify-center font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity">LS</div>

      <button class="md:hidden bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all duration-300 w-9 h-9 flex items-center justify-center" title="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';

// Added isSearchPanelOpen to the destructured object
const { therapeuticAreas, isSearchPanelOpen } = useActivities();

// Function to toggle the search panel state
const toggleSearch = () => {
  isSearchPanelOpen.value = !isSearchPanelOpen.value;
};
</script>