<template>
  <header class="prime-header text-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center custom-shadow">
    <div class="flex items-center gap-4">
      <div class="font-bold text-2xl tracking-tight">PRIME<span class="font-light opacity-80 pl-1">EDUCATION</span></div>
      <div class="hidden md:block h-6 w-px bg-white/20 mx-2"></div>
      <nav class="hidden md:flex gap-6 text-sm font-medium opacity-90">
        <a href="#" class="hover:text-white border-b-2 border-white pb-1">Home</a>
        <a href="#" class="hover:opacity-100 opacity-70 transition-opacity">Credit Center</a>
        <a href="#" class="hover:opacity-100 opacity-70 transition-opacity">Specialty Centers</a>
      </nav>
    </div>
    <div class="relative w-full max-w-md mx-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search activities..."
        class="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <svg class="absolute left-3 top-2.5 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<style scoped>
.prime-header {
  background-color: #065184;
}
.custom-shadow {
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
}
</style>