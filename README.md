# PRIME Clinical Podcast Portal (Vue 3 Prototype)

This project transforms the original static HTML prototype into a modular, maintainable Vue 3 frontend application using Vite and the Composition API.

## Architecture Overview

The application is structured to be completely driven by a structured local data model, moving away from hardcoded UI logic.

### 1. Data Model (`src/data/activities.js`)
All content is centralized in a structured JavaScript array. This file replaces the inline CSV parsing from the original file. 

Each activity is represented as an object with predictable metadata:
```javascript
{
  id: "10006",
  code: "54PC255",
  title: "...",
  tags: ["Infectious Disease", "Podcast", "2025"],
  therapeuticAreas: ["Infectious Disease"],
  // Future fields: transcript, module data, etc.
}
```
**To add new activities or types:** Simply append a new object to this array. The UI will automatically generate new rails, search results, and related content based on the provided tags and `therapeuticAreas`.

### 2. State Management (`src/composables/useActivities.js`)
Instead of a heavy store like Pinia/Vuex, this prototype uses a lightweight Vue Composable to share global reactivity. It exports:
- The base `activities` list
- Derived data (`filteredList`, `groupedByArea`, `currentSeries`)
- Global player state (`activeEpisode`, `isPlaying`)
- Search state (`searchQuery`)

Because this composable creates state outside of the standard component scope (or uses references defined globally inside the module), any component can import it and immediately reflect or alter the global state.

### 3. Components
The UI is broken down into reusable logic:
- `/layout/AppHeader.vue`: The sticky standard header containing the navigation and the search bar.
- `/ui/ActivityCard.vue`: Standardizes how an activity is visually represented across the portal and search results.
- `/ui/ActivityRail.vue`: Dynamic horizontal scrollers that automatically populate based on the therapeutic areas defined in the data model.
- `/player/*`: Isolated, deeply contextual player components (Sidebar, Center, RightPanel) that depend heavily on the `activeEpisode` state.

### 4. Routing
Vue Router separates the core functional states of the portal:
- `/` (HomeView): The dashboard with the Featured Hero and Activity Rails.
- `/search` (SearchView): A grid of search results, dynamically showing/hiding based on the `searchQuery`.
- `/activity/:id` (ActivityView): A full-screen overlay for immersive audio playback and transcript reading.

## Running the Project Local

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
