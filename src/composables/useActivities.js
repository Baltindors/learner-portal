import { ref, computed } from 'vue';
import { mockActivities, therapeuticAreasList } from '../data/activities';

// Shared global state for the prototype
const searchQuery = ref('');
const activeEpisode = ref(null);
const isPlaying = ref(false);
const activities = ref(mockActivities);

// NEW: Global state for our active filter pills
const activeFilters = ref([]);

// NEW: Player playback and countdown state
const playbackProgress = ref(0); // 0 to 100
const isCountingDown = ref(false);
const isSeriesEnded = ref(false);
const countdownValue = ref(5);
let playbackTimer = null;
let countdownTimer = null;

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

    if (activeFilters.value.length > 0) {

      const filtersByCategory = activeFilters.value.reduce((groups, filter) => {
        if (!groups[filter.category]) groups[filter.category] = [];
        groups[filter.category].push(filter.value);
        return groups;
      }, {});

      // Step B: Filter the activities
      result = result.filter(item => {
        // An activity must pass EVERY category that has an active filter (AND between categories)
        return Object.entries(filtersByCategory).every(([category, selectedValues]) => {
          
          // An activity must match AT LEAST ONE value inside this category (OR within category)
          return selectedValues.some(value => {
            if (category === 'Profession') return item.professions?.includes(value);
            if (category === 'Specialty') return item.specialties?.includes(value) || item.tags?.includes(value);
            if (category === 'Type') return item.type === value;
            if (category === 'CME Amount' || category === 'CME') return item.cmeAmount === value || item.ceAmount === value;
            return false;
          });

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

  // --- NEW: PLAYBACK AND AUTO-ADVANCE LOGIC ---
  const stopTimers = () => {
    if (playbackTimer) clearInterval(playbackTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    playbackTimer = null;
    countdownTimer = null;
  };

  const playNextEpisode = () => {
    // Determine next episode
    const currentIndex = currentSeries.value.findIndex(ep => ep.id === activeEpisode.value?.id);
    if (currentIndex >= 0 && currentIndex < currentSeries.value.length - 1) {
      activeEpisode.value = currentSeries.value[currentIndex + 1];
      startSimulatedPlayback();
    } else {
      // End of series
      stopTimers();
      activeEpisode.value = null; // We can use null or a flag to show the end screen
      isPlaying.value = false;
    }
  };

  const startCountdown = () => {
    stopTimers();
    isCountingDown.value = true;
    isSeriesEnded.value = false;
    countdownValue.value = 5;
    
    countdownTimer = setInterval(() => {
      countdownValue.value--;
      if (countdownValue.value <= 0) {
        clearInterval(countdownTimer);
        isCountingDown.value = false;
        playNextEpisode();
      }
    }, 1000);
  };

  const startSimulatedPlayback = () => {
    stopTimers();
    isPlaying.value = true;
    isCountingDown.value = false;
    isSeriesEnded.value = false;
    playbackProgress.value = 0;
    
    // Simulate 10-second playback (updates 100 times, every 100ms)
    playbackTimer = setInterval(() => {
      if (isPlaying.value) {
        playbackProgress.value += 1;
        if (playbackProgress.value >= 100) {
          clearInterval(playbackTimer);
          playbackProgress.value = 100;
          isPlaying.value = false;
          
          // Check if this was the last episode
          const currentIndex = currentSeries.value.findIndex(ep => ep.id === activeEpisode.value?.id);
          if (currentIndex >= 0 && currentIndex < currentSeries.value.length - 1) {
            startCountdown();
          } else {
            // Reached end of series immediately show end screen
            stopTimers();
            isCountingDown.value = false;
            isSeriesEnded.value = true;
          }
        }
      }
    }, 100);
  };

  const loadActivityAndPlay = (activity) => {
    stopTimers();
    activeEpisode.value = activity;
    isSeriesEnded.value = false;
    isCountingDown.value = false;
    startSimulatedPlayback();
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
    getActivityById,

    // New playback features
    playbackProgress,
    isCountingDown,
    isSeriesEnded,
    countdownValue,
    startSimulatedPlayback,
    stopTimers,
    loadActivityAndPlay
  };
}