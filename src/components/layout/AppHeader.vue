<template>
  <header class="bg-[#065184] prime-header text-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center custom-shadow">
    <div class="flex items-center gap-4">
      <router-link to="/" class="font-bold text-2xl tracking-tight flex items-center">
        PRIME<span class="font-light opacity-80 pl-1">EDUCATION</span>
      </router-link>
      <div class="hidden md:block h-6 w-px bg-white/20 mx-2"></div>
      <nav class="hidden md:flex gap-6 text-sm font-medium opacity-90">
        <router-link to="/" class="hover:text-white border-b-2 border-transparent hover:border-white transition-all pb-1" active-class="border-white text-white">Home</router-link>
        <a href="#" class="hover:opacity-100 opacity-70 transition-opacity">Specialty Centers</a>
        <a href="#" class="hover:opacity-100 opacity-70 transition-opacity">Credit Center</a>
      </nav>
    </div>
    
    <div class="relative w-full max-w-md mx-4">
      <input 
        v-model="localQuery" 
        @input="handleSearch"
        type="text" 
        placeholder="Search clinical topics, faculty, or activity codes..." 
        class="w-full bg-white/10 border border-white/20 rounded-full py-2 px-5 text-sm focus:outline-none focus:bg-white focus:text-slate-900 transition-all placeholder:text-white/60"
      />
    </div>
    
    <div class="flex items-center gap-4">
      <button class="bg-white/10 p-2 rounded-full hover:bg-white/20">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
      </button>
      <div class="w-8 h-8 rounded-full bg-[#277FCB] flex items-center justify-center font-bold text-xs cursor-pointer">LS</div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useActivities } from '../../composables/useActivities';

const router = useRouter();
const route = useRoute();
const { searchQuery, setGlobalSearch } = useActivities();

const localQuery = ref(searchQuery.value);

// Sync local input with global query
watch(searchQuery, (newVal) => {
  localQuery.value = newVal;
});

const handleSearch = () => {
  setGlobalSearch(localQuery.value);
  
  if (localQuery.value && route.name !== 'search') {
    router.push({ name: 'search' });
  } else if (!localQuery.value && route.name === 'search') {
    router.push({ name: 'home' });
  }
};
</script>
