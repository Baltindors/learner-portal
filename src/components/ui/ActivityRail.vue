<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold border-l-4 border-[#277FCB] pl-3">{{ title }} Activities</h2>
      <a href="#" class="text-sm font-semibold text-[#277FCB] hover:underline">See All</a>
    </div>
    <div class="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
      <div v-for="item in items" :key="item.id" class="flex-shrink-0 w-72">
        <ActivityCard :activity="item" :compact="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ActivityCard from './ActivityCard.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>
