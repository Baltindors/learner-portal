<template>
  <header class="bg-[#065184] text-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-md">
    <div class="flex items-center gap-4">
      <router-link to="/" class="font-bold text-2xl tracking-tight flex items-center">
        PRIME<span class="font-light opacity-80 pl-1">EDUCATION</span>
      </router-link>
      <div class="hidden md:block h-6 w-px bg-white/20 mx-2"></div>
      
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium opacity-90">
        <router-link to="/" class="hover:text-white border-b-2 border-transparent hover:border-white transition-all pb-1" active-class="border-white text-white">Home</router-link>
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
    
    <div class="flex items-center gap-4">
      <button class="bg-white/10 p-2 rounded-full hover:bg-white/20">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
      </button>
      <div class="w-8 h-8 rounded-full bg-[#277FCB] flex items-center justify-center font-bold text-xs cursor-pointer">JS</div>
    </div>
  </header>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';

// We only need therapeuticAreas for the dropdown menu now!
// All the search logic has been removed since FilterBar handles it globally.
const { therapeuticAreas } = useActivities();
</script>