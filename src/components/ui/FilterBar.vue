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
          <button 
            v-for="prof in filterOptions.professions" 
            :key="prof" 
            @click="handleFilterClick('Profession', prof)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Profession', prof) ? 'text-[#277FCB] font-bold bg-[#277FCB]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Profession', prof)" class="w-4 h-4 text-[#277FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
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
          <button 
            v-for="spec in filterOptions.specialties" 
            :key="spec" 
            @click="handleFilterClick('Specialty', spec)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Specialty', spec) ? 'text-[#277FCB] font-bold bg-[#277FCB]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Specialty', spec)" class="w-4 h-4 text-[#277FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
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
          <button 
            v-for="type in filterOptions.types" 
            :key="type" 
            @click="handleFilterClick('Type', type)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Type', type) ? 'text-[#277FCB] font-bold bg-[#277FCB]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Type', type)" class="w-4 h-4 text-[#277FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
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
          <button 
            v-for="amount in filterOptions.cmeAmounts" 
            :key="amount" 
            @click="handleFilterClick('CME', amount)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('CME', amount) ? 'text-[#277FCB] font-bold bg-[#277FCB]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('CME', amount)" class="w-4 h-4 text-[#277FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
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

const { 
  searchQuery, 
  activeFilters, 
  addFilter, 
  removeFilter, 
  clearAllFilters 
} = useActivities();

// Helper to check if a specific filter is currently active
const isFilterActive = (category, value) => {
  return activeFilters.value.some(f => f.category === category && f.value === value);
};

// NEW: Toggle logic! If it's active, remove it. If it isn't, add it.
const handleFilterClick = (category, value) => {
  const index = activeFilters.value.findIndex(f => f.category === category && f.value === value);
  if (index > -1) {
    removeFilter(index); // It's already there, so uncheck it!
  } else {
    addFilter(category, value); // It's not there, so add it!
  }
};

// List of options for the dropdown menus
const filterOptions = {
  professions: ['Physician', 'Nurse', 'Pharmacist', 'Physician Assistant'],
  specialties: ['Oncology', 'Infectious Disease', 'Cardiology', 'Neurology', 'Internal Medicine'],
  types: ['Podcast', 'Webinar', 'Case Study', 'Article'],
  cmeAmounts: ['0.25 CE', '0.50 CE', '1.00 CE', '2.00 CE']
};
</script>