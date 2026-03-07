import { ref, computed } from 'vue';
import { mockActivities, therapeuticAreasList } from '../data/activities';

// Shared global state for the prototype
const searchQuery = ref('');
const activeEpisode = ref(null);
const isPlaying = ref(false);

// Moved outside the function so the saved library state persists 
// across different components and page navigation!
const activities = ref(mockActivities);

export function useActivities() {
  const therapeuticAreas = ref(therapeuticAreasList);

  // NEW: Computed property for saved library items
  const mySavedLibrary = computed(() => {
    return activities.value.filter(item => item.inLibrary === true);
  });

  const filteredList = computed(() => {
    if (!searchQuery.value) return [];
    const q = searchQuery.value.toLowerCase();
    return activities.value.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.code.toLowerCase().includes(q) || 
      item.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  const groupedByArea = computed(() => {
    const groups = {};
    therapeuticAreas.value.forEach(area => {
      groups[area] = activities.value.filter(item => 
        item.tags.includes(area)
      );
    });
    return groups;
  });

  const setGlobalSearch = (query) => {
    searchQuery.value = query;
  };

  const getEpisodeOrder = (code) => {
    return parseInt(code.substring(6)) || 1;
  };

  const currentSeries = computed(() => {
    if (!activeEpisode.value) return [];
    const prefix = activeEpisode.value.code.substring(0, 6);
    return activities.value
      .filter(item => item.code.startsWith(prefix))
      .sort((a, b) => getEpisodeOrder(a.code) - getEpisodeOrder(b.code));
  });

  const relatedSeries = computed(() => {
    if (!activeEpisode.value) return [];
    
    // Safety check if tags array is empty or undefined
    if (!activeEpisode.value.tags || activeEpisode.value.tags.length === 0) return [];
    
    const currentTag = activeEpisode.value.tags[0];
    const prefix = activeEpisode.value.code.substring(0, 6);
    return activities.value.filter(item => 
      item.tags.includes(currentTag) && !item.code.startsWith(prefix)
    ).slice(0, 5);
  });
  
  const getActivityById = (id) => {
    return activities.value.find(item => item.id === id);
  };

  return {
    activities,
    searchQuery,
    filteredList,
    therapeuticAreas,
    groupedByArea,
    setGlobalSearch,
    
    // NEW: Export the library so components can use it
    mySavedLibrary,
    
    // Player specific state
    activeEpisode,
    isPlaying,
    currentSeries,
    relatedSeries,
    getEpisodeOrder,
    getActivityById
  };
}