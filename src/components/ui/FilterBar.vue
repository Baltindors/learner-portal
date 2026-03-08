<template>
  <div class="mb-8 flex flex-col gap-3">
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-wrap lg:flex-nowrap items-center gap-2">
      
      <div class="relative flex-grow min-w-[200px]">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search activities..." 
          class="w-full py-2 px-4 bg-transparent border-r border-slate-200 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
        />
      </div>

      <div class="relative group">
        <button class="px-4 py-2 text-sm font-semibold text-[#277FCB] border border-[#277FCB] rounded hover:bg-[#277FCB]/10 transition-colors flex items-center gap-1 whitespace-nowrap">
          Profession
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button v-for="prof in filterOptions.professions" :key="prof" @click="addFilter('Profession', prof)" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700">
            {{ prof }}
          </button>
        </div>
      </div>

      <div class="relative group">
        <button class="px-4 py-2 text-sm font-semibold text-[#277FCB] border border-[#277FCB] rounded hover:bg-[#277FCB]/10 transition-colors flex items-center gap-1 whitespace-nowrap">
          Specialty
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button v-for="spec in filterOptions.specialties" :key="spec" @click="addFilter('Specialty', spec)" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700">
            {{ spec }}
          </button>
        </div>
      </div>

      <div class="relative group">
        <button class="px-4 py-2 text-sm font-semibold text-[#277FCB] border border-[#277FCB] rounded hover:bg-[#277FCB]/10 transition-colors flex items-center gap-1 whitespace-nowrap">
          Activity Type
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button v-for="type in filterOptions.types" :key="type" @click="addFilter('Type', type)" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700">
            {{ type }}
          </button>
        </div>
      </div>

      <div class="relative group">
        <button class="px-4 py-2 text-sm font-semibold text-[#277FCB] border border-[#277FCB] rounded hover:bg-[#277FCB]/10 transition-colors flex items-center gap-1 whitespace-nowrap">
          CME Amount
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button v-for="amount in filterOptions.cmeAmounts" :key="amount" @click="addFilter('CME', amount)" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700">
            {{ amount }}
          </button>
        </div>
      </div>

      <button v-if="activeFilters.length > 0" @click="clearAllFilters" class="px-3 py-2 text-sm text-slate-500 hover:text-slate-800 underline whitespace-nowrap transition-colors">
        Clear all
      </button>

    </div>

    <div v-if="activeFilters.length > 0" class="flex flex-wrap items-center gap-2 px-1">
      <div 
        v-for="(filter, index) in activeFilters" 
        :key="index"
        class="bg-[#66B2FF] text-white text-[13px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
      >
        {{ filter.category }}: {{ filter.value }}
        <button @click="removeFilter(index)" class="hover:bg-white/20 rounded-full p-0.5 transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivities } from '../../composables/useActivities';

// Bring everything in from the global state!
const { 
  searchQuery, 
  activeFilters, 
  addFilter, 
  removeFilter, 
  clearAllFilters 
} = useActivities();

// List of options for the dropdown menus
const filterOptions = {
  professions: ['Physician', 'Nurse', 'Pharmacist', 'Physician Assistant'],
  specialties: ['Oncology', 'Infectious Disease', 'Cardiology', 'Neurology', 'Internal Medicine'],
  types: ['Podcast', 'Webinar', 'Case Study', 'Article'],
  cmeAmounts: ['0.25 CE', '0.50 CE', '1.00 CE', '2.00 CE']
};
</script>