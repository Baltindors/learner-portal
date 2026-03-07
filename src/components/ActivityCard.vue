<template>
  <div
    @click="$emit('openActivity', item)"
    class="flex-shrink-0 w-72 bg-white rounded-lg border border-slate-200 hover:border-[#277FCB] transition-all cursor-pointer group"
  >
    <div class="bg-slate-200 aspect-video relative rounded-t-lg overflow-hidden">
      <img
      v-if="item.thumbnail"
      :src="item.thumbnail"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
      />
      <span class="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">{{ item.ceAmount }}</span>
      <div class="absolute bottom-2 right-2 bg-[#03C84F] w-2 h-2 rounded-full shadow-[0_0_8px_rgba(3,200,79,0.8)]"></div>
    </div>
    <div class="p-4">
      <h3 class="text-sm font-bold leading-snug line-clamp-2 mb-2 h-10 group-hover:text-[#277FCB]">{{ item.Title }}</h3>
      <div class="text-[11px] text-slate-500 uppercase tracking-tighter">{{ item.Releases }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['openActivity'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>