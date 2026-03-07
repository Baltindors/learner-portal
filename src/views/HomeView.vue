<template>
  <div>
    <FeaturedHero />

    <ActivityRail 
      v-if="mySavedLibrary && mySavedLibrary.length > 0"
      title="My Saved" 
      :items="mySavedLibrary" 
    />

    <template v-for="area in therapeuticAreas" :key="area">
      <ActivityRail 
        v-if="groupedByArea[area] && groupedByArea[area].length > 0"
        :title="area" 
        :items="groupedByArea[area]" 
      />
    </template>
  </div>
</template>

<script setup>
import { useActivities } from '../composables/useActivities';
import FeaturedHero from '../components/ui/FeaturedHero.vue';
import ActivityRail from '../components/ui/ActivityRail.vue';

// Added mySavedLibrary to the destructured import
const { therapeuticAreas, groupedByArea, mySavedLibrary } = useActivities();
</script>