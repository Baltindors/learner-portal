<template>
  <div class="flex flex-col w-full max-w-7xl mx-auto">
    
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
      <h2 class="text-xl md:text-2xl font-bold text-[#005082]">Find Educational Activities</h2>
      
      <div 
        :class="[
          'flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 w-fit', 
          searchMode === 'ai' ? 'bg-[#8e2de2]/5 border-[#8e2de2]/30 text-[#8e2de2]' : 'bg-slate-50 border-slate-200 text-slate-600'
        ]"
      >
        <svg class="w-4 h-4 transition-colors duration-300" :class="searchMode === 'ai' ? 'text-[#8e2de2]' : 'text-slate-400'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        <span class="text-sm font-semibold" :class="searchMode === 'ai' ? 'text-[#4a00e0]' : 'text-slate-600'">AI Search</span>
        
        <label class="relative inline-flex items-center cursor-pointer ml-1">
          <input type="checkbox" class="sr-only peer" :checked="searchMode === 'ai'" @change="toggleAiMode">
          <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#8e2de2] peer-checked:to-[#4a00e0]"></div>
        </label>
      </div>
    </div>

    <div 
      :class="[
        'rounded-xl mb-6 transition-all duration-300 relative', 
        searchMode === 'ai' ? 'bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] p-[2px] shadow-[0_4px_20px_rgba(142,45,226,0.25)]' : 'bg-[#2b7bc0] p-[2px] shadow-md'
      ]"
    >
      <div class="flex flex-col md:flex-row items-center bg-white rounded-[10px] p-2 gap-2 w-full">
        
        <div class="flex items-center flex-grow w-full px-2">
          <svg class="w-6 h-6 mr-3 flex-shrink-0 transition-colors duration-300" :class="searchMode === 'ai' ? 'text-[#8e2de2]' : 'text-[#2b7bc0]'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          
          <div class="relative flex-grow">
            <input 
              v-model="localQuery"
              @input="handleSearch"
              type="text" 
              :placeholder="searchMode === 'ai' ? 'Ask AI to find specific topics, formats, or CME needs...' : 'Search by keyword, topic, or title...'" 
              class="w-full py-2 bg-transparent focus:outline-none text-lg text-slate-800 placeholder-slate-400"
            />
            
            <div v-if="isAiProcessing" class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8e2de2] flex items-center gap-1.5 animate-pulse">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </div>
          </div>
        </div>

        <button 
          @click="handleSearch"
          :class="[
            'w-full md:w-auto px-8 py-3.5 text-base font-bold rounded-lg text-white transition-all whitespace-nowrap', 
            searchMode === 'ai' ? 'bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] hover:opacity-90 hover:shadow-[0_2px_10px_rgba(142,45,226,0.25)]' : 'bg-[#2b7bc0] hover:bg-[#005082]'
          ]"
        >
          Search
        </button>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      
      <div class="relative group flex-grow md:flex-grow-0">
        <button class="w-full md:w-auto bg-white border border-slate-300 text-slate-600 font-semibold px-4 py-2.5 rounded-lg hover:border-[#2b7bc0] hover:text-[#2b7bc0] transition-colors flex items-center justify-between gap-2 text-sm shadow-sm">
          Profession
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button 
            v-for="prof in filterOptions.professions" 
            :key="prof" 
            @click="handleFilterClick('Profession', prof)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Profession', prof) ? 'text-[#2b7bc0] font-bold bg-[#2b7bc0]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Profession', prof)" class="w-4 h-4 text-[#2b7bc0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
            {{ prof }}
          </button>
        </div>
      </div>

      <div class="relative group flex-grow md:flex-grow-0">
        <button class="w-full md:w-auto bg-white border border-slate-300 text-slate-600 font-semibold px-4 py-2.5 rounded-lg hover:border-[#2b7bc0] hover:text-[#2b7bc0] transition-colors flex items-center justify-between gap-2 text-sm shadow-sm">
          Specialty
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button 
            v-for="spec in filterOptions.specialties" 
            :key="spec" 
            @click="handleFilterClick('Specialty', spec)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Specialty', spec) ? 'text-[#2b7bc0] font-bold bg-[#2b7bc0]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Specialty', spec)" class="w-4 h-4 text-[#2b7bc0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
            {{ spec }}
          </button>
        </div>
      </div>

      <div class="relative group flex-grow md:flex-grow-0">
        <button class="w-full md:w-auto bg-white border border-slate-300 text-slate-600 font-semibold px-4 py-2.5 rounded-lg hover:border-[#2b7bc0] hover:text-[#2b7bc0] transition-colors flex items-center justify-between gap-2 text-sm shadow-sm">
          Activity Type
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button 
            v-for="type in filterOptions.types" 
            :key="type" 
            @click="handleFilterClick('Type', type)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('Type', type) ? 'text-[#2b7bc0] font-bold bg-[#2b7bc0]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('Type', type)" class="w-4 h-4 text-[#2b7bc0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
            {{ type }}
          </button>
        </div>
      </div>

      <div class="relative group flex-grow md:flex-grow-0">
        <button class="w-full md:w-auto bg-white border border-slate-300 text-slate-600 font-semibold px-4 py-2.5 rounded-lg hover:border-[#2b7bc0] hover:text-[#2b7bc0] transition-colors flex items-center justify-between gap-2 text-sm shadow-sm">
          CME Amount
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 md:right-0 md:left-auto mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
          <button 
            v-for="amount in filterOptions.cmeAmounts" 
            :key="amount" 
            @click="handleFilterClick('CME', amount)" 
            class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center transition-colors"
            :class="isFilterActive('CME', amount) ? 'text-[#2b7bc0] font-bold bg-[#2b7bc0]/5' : 'text-slate-700'"
          >
            <span class="w-5 flex-shrink-0 flex items-center justify-start mr-1">
              <svg v-if="isFilterActive('CME', amount)" class="w-4 h-4 text-[#2b7bc0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </span>
            {{ amount }}
          </button>
        </div>
      </div>

      <button v-if="activeFilters.length > 0" @click="clearAllFilters" class="w-full md:w-auto text-center px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 underline transition-colors">
        Clear all
      </button>

    </div>

    <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-3 mt-6">
      <div 
        v-for="(filter, index) in activeFilters" 
        :key="index"
        class="bg-[#edf2f7] text-[#2d3748] border border-[#e2e8f0] text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 animate-in zoom-in duration-200"
      >
        {{ filter.category }}: {{ filter.value }}
        <button @click="removeFilter(index)" class="text-slate-400 hover:text-red-500 text-lg leading-none mt-px transition-colors" title="Remove filter">
          &times;
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useActivities } from '../../composables/useActivities';

const { 
  searchQuery, 
  activeFilters, 
  addFilter, 
  removeFilter, 
  clearAllFilters,
  searchMode,
  isAiProcessing
} = useActivities();

const localQuery = ref(searchQuery.value);
let searchTimeout = null;

const handleSearch = () => {
  if (searchMode.value === 'ai') {
    isAiProcessing.value = true;
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery.value = localQuery.value;
      isAiProcessing.value = false;
    }, 1000);
  } else {
    searchQuery.value = localQuery.value;
  }
};

const toggleAiMode = () => {
  searchMode.value = searchMode.value === 'standard' ? 'ai' : 'standard';
  if (searchMode.value === 'standard') {
    isAiProcessing.value = false;
    if (searchTimeout) clearTimeout(searchTimeout);
    searchQuery.value = localQuery.value;
  } else {
    if (localQuery.value) {
      handleSearch();
    }
  }
};

// Helper to check if a specific filter is currently active
const isFilterActive = (category, value) => {
  return activeFilters.value.some(f => f.category === category && f.value === value);
};

// Toggle logic! If it's active, remove it. If it isn't, add it.
const handleFilterClick = (category, value) => {
  const index = activeFilters.value.findIndex(f => f.category === category && f.value === value);
  if (index > -1) {
    removeFilter(index); 
  } else {
    addFilter(category, value); 
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