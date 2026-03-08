import { ref, computed } from 'vue';
import { mockActivities, therapeuticAreasList } from '../data/activities';

// Shared global state for the prototype
const searchQuery = ref('');
const activeEpisode = ref(null);
const isPlaying = ref(false);
const activities = ref(mockActivities);

// NEW: Global state for our active filter pills
const activeFilters = ref([]);

export function useActivities() {
  const therapeuticAreas = ref(therapeuticAreasList);

  const mySavedLibrary = computed(() => {
    return activities.value.filter(item => item.inLibrary === true);
  });

  // --- NEW: FILTER MANIPULATION METHODS ---
  const addFilter = (category, value) => {
    const exists = activeFilters.value.some(f => f.category === category && f.value === value);
    if (!exists) {
      activeFilters.value.push({ category, value });
    }
  };

  const removeFilter = (index) => {
    activeFilters.value.splice(index, 1);
  };

  const clearAllFilters = () => {
    activeFilters.value = [];
  };

  // --- NEW: MASTER FILTERING LOGIC ---
  const processedActivities = computed(() => {
    let result = activities.value;

    // 1. Text Search
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      result = result.filter(item => 
        item.title?.toLowerCase().includes(q) || 
        item.code?.toLowerCase().includes(q) || 
        item.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 2. Dropdown Pill Filters
    if (activeFilters.value.length > 0) {
      result = result.filter(item => {
        // An activity must match EVERY active pill to stay on the screen
        return activeFilters.value.every(filter => {
          if (filter.category === 'Profession') return item.professions?.includes(filter.value);
          if (filter.category === 'Specialty') return item.specialties?.includes(filter.value) || item.tags?.includes(filter.value);
          if (filter.category === 'Type') return item.type === filter.value;
          // Handles if you named it cmeAmount or ceAmount in your data
          if (filter.category === 'CME Amount' || filter.category === 'CME') return item.cmeAmount === filter.value || item.ceAmount === filter.value;
          return true;
        });
      });
    }

    return result;
  });

  // filteredList now just returns the master processed list
  const filteredList = computed(() => processedActivities.value);

  // groupedByArea now groups the processed list! 
  // (If a user filters by "Nurse", rails without Nurse activities will automatically hide)
  const groupedByArea = computed(() => {
    const groups = {};
    therapeuticAreas.value.forEach(area => {
      groups[area] = processedActivities.value.filter(item => 
        item.tags?.includes(area)
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
    mySavedLibrary,
    
    // Exporting the new filter variables & functions
    activeFilters,
    addFilter,
    removeFilter,
    clearAllFilters,
    
    activeEpisode,
    isPlaying,
    currentSeries,
    relatedSeries,
    getEpisodeOrder,
    getActivityById
  };
}