<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold border-l-4 border-[#277FCB] pl-3">{{ area }} Activities</h2>
      <a href="#" class="text-sm font-semibold text-[#277FCB] hover:underline">See All</a>
    </div>
    <div class="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
      <ActivityCard
        v-for="item in items"
        :key="item.ID"
        :item="item"
        @open-activity="$emit('openActivity', item)"
      />
    </div>
  </div>
</template>

<script setup>
import ActivityCard from './ActivityCard.vue'

defineProps({
  area: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

defineEmits(['openActivity'])
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>