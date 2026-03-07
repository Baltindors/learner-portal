<template>
  <PlayerView :active-episode="activeEpisode" @close-activity="closeActivity" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import PlayerView from '../components/PlayerView.vue'
import { activeEpisode } from '../stores/podcastStore.js'

const router = useRouter()

function closeActivity() {
  activeEpisode.value = null
  router.push('/')
}
</script>

<style scoped>
</style>