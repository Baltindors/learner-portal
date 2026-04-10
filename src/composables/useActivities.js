import { ref, computed } from 'vue';
import { mockActivities, therapeuticAreasList } from '../data/activities';

// Shared global state for the prototype
const searchQuery = ref('');
const activeEpisode = ref(null);
const isPlaying = ref(false);
const activities = ref(mockActivities);

// Controls the prominent search panel visibility
const isSearchPanelOpen = ref(false); 

// Global state for our active filter pills
const activeFilters = ref([]);

// Global state for user profile and personalized homepage
const userProfile = ref({
  professions: [],
  specialties: [],
  formats: [],
  timeCommitments: [],
  isCustomHomepage: localStorage.getItem('isCustomHomepage') === 'true'
});

// Global state for hybrid playback mode ('video' or 'audio')
const preferredMode = ref('video');

// Global state for AI Prototype Features
const searchMode = ref('standard'); // 'standard' | 'ai'
const isAiProcessing = ref(false);
const aiResponseInsight = ref('');

// Player playback and countdown state
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

  // --- FILTER MANIPULATION METHODS ---
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
      
      if (searchMode.value === 'ai') {
        const isLungCancerQuery = q.includes('lung') || q.includes('cancer');
        result = result.filter(item => {
          if (isLungCancerQuery) {
            return item.tags?.includes('Oncology') || item.title?.toLowerCase().includes('nsclc');
          }
          return item.title?.toLowerCase().includes(q) || 
                 item.code?.toLowerCase().includes(q) || 
                 item.tags?.some(tag => tag.toLowerCase().includes(q));
        });
      } else {
        result = result.filter(item => 
          item.title?.toLowerCase().includes(q) || 
          item.code?.toLowerCase().includes(q) || 
          item.tags?.some(tag => tag.toLowerCase().includes(q))
        );
      }
    }

    if (activeFilters.value.length > 0) {
      const filtersByCategory = activeFilters.value.reduce((groups, filter) => {
        if (!groups[filter.category]) groups[filter.category] = [];
        groups[filter.category].push(filter.value);
        return groups;
      }, {});

      // Step B: Filter the activities
      result = result.filter(item => {
        return Object.entries(filtersByCategory).every(([category, selectedValues]) => {
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

  const filteredList = computed(() => processedActivities.value);

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

  // --- PLAYBACK AND AUTO-ADVANCE LOGIC ---
  const stopTimers = () => {
    if (playbackTimer) clearInterval(playbackTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    playbackTimer = null;
    countdownTimer = null;
  };

  const playNextEpisode = () => {
    const currentIndex = currentSeries.value.findIndex(ep => ep.id === activeEpisode.value?.id);
    if (currentIndex >= 0 && currentIndex < currentSeries.value.length - 1) {
      activeEpisode.value = currentSeries.value[currentIndex + 1];
      startSimulatedPlayback();
    } else {
      stopTimers();
      activeEpisode.value = null; 
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
    
    playbackTimer = setInterval(() => {
      if (isPlaying.value) {
        playbackProgress.value += 1;
        if (playbackProgress.value >= 100) {
          clearInterval(playbackTimer);
          playbackProgress.value = 100;
          isPlaying.value = false;
          
          const currentIndex = currentSeries.value.findIndex(ep => ep.id === activeEpisode.value?.id);
          if (currentIndex >= 0 && currentIndex < currentSeries.value.length - 1) {
            startCountdown();
          } else {
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

  const togglePlaybackMode = () => {
    preferredMode.value = preferredMode.value === 'video' ? 'audio' : 'video';
  };

  // --- USER PROFILE PREFERENCES ---
  const toggleCustomHomepage = () => {
    userProfile.value.isCustomHomepage = !userProfile.value.isCustomHomepage;
    localStorage.setItem('isCustomHomepage', userProfile.value.isCustomHomepage);
  };

  const mapCmeToDuration = (ceAmount) => {
    switch (ceAmount) {
      case '0.25 CE': return '15 Minutes';
      case '0.50 CE': return '30 Minutes';
      case '0.75 CE': return '45 Minutes';
      case '1.00 CE': return '1 Hour';
      case '1.50 CE': return '1.5 Hours';
      case '2.00 CE': return '2 Hours';
      default: return ceAmount;
    }
  };

  const tailoredActivities = computed(() => {
    if (userProfile.value.specialties.length === 0) return [];
    return activities.value.filter(item => {
      return userProfile.value.specialties.some(sp => item.therapeuticAreas?.includes(sp) || item.tags?.includes(sp));
    });
  });

  return {
    activities,
    searchQuery,
    filteredList,
    therapeuticAreas,
    groupedByArea,
    setGlobalSearch,
    mySavedLibrary,
    
    // Exporting the new user profile variables & functions
    userProfile,
    toggleCustomHomepage,
    tailoredActivities,
    mapCmeToDuration,
    
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

    // AI Prototype Features
    searchMode,
    isAiProcessing,
    aiResponseInsight,

    // ADDED THIS EXPORT SO THE HEADER & APP.VUE CAN USE IT
    isSearchPanelOpen,

    // New playback features
    preferredMode,
    togglePlaybackMode,
    playbackProgress,
    isCountingDown,
    isSeriesEnded,
    countdownValue,
    startSimulatedPlayback,
    stopTimers,
    loadActivityAndPlay
  };
}