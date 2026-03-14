<template>
  <div class="relative min-h-screen bg-slate-50 flex" v-if="activity">
    
    <!-- Left Navigation Rail -->
    <nav class="hidden md:flex flex-col items-center w-20 border-r border-slate-200 bg-white shadow-sm fixed top-0 left-0 h-screen z-10 pt-20">
      <div class="flex flex-col gap-8 flex-grow">
        <a href="#overview" class="flex flex-col items-center gap-1 text-slate-400 hover:text-[#277FCB] transition-colors group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest text-[#277FCB]">Overview</span>
        </a>
        <a href="#cme" class="flex flex-col items-center gap-1 text-slate-400 hover:text-[#277FCB] transition-colors group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest mt-1">CME</span>
        </a>
        <a href="#faculty" class="flex flex-col items-center gap-1 text-slate-400 hover:text-[#277FCB] transition-colors group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest mt-1">Faculty</span>
        </a>
        <a href="#agenda" class="flex flex-col items-center gap-1 text-slate-400 hover:text-[#277FCB] transition-colors group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest mt-1">Agenda</span>
        </a>
        <a href="#goals" class="flex flex-col items-center gap-1 text-slate-400 hover:text-[#277FCB] transition-colors group">
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest mt-1">Goals</span>
        </a>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="flex-grow md:ml-20">
      
      <!-- Banner / Header Area -->
      <div class="bg-gradient-to-r from-[#065184] via-[#065184]/90 to-white pt-10 pb-20 relative overflow-hidden flex">
        <!-- Optional background image can go here based on data thumbnail using absolute positioning -->
        <img v-if="activity.thumbnail" :src="activity.thumbnail" class="absolute right-0 top-0 h-full w-1/2 object-cover object-right opacity-80 mix-blend-multiply" style="mask-image: linear-gradient(to right, transparent, black 100%); -webkit-mask-image: linear-gradient(to right, transparent, black 100%);" alt="" />
        <div class="container mx-auto max-w-7xl px-8 relative z-10 hidden md:block mt-8 flex-grow">
          <h1 class="text-3xl font-extrabold uppercase tracking-tight max-w-4xl text-slate-800 bg-white/90 p-6 inline-block mb-4 leading-tight shadow-sm">{{ activity.title }}</h1>
          <div class="flex gap-4">
            <span class="bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm" v-if="activity.ceAmount">{{ activity.ceAmount }}</span>
            <span class="bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm" v-if="activity.releaseDate">Released: {{ activity.releaseDate }}</span>
            <span class="bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm" v-if="activity.type">{{ activity.type }}</span>
          </div>
        </div>
      </div>

      <!-- Centered Content -->
      <div class="container mx-auto max-w-7xl px-6 lg:px-8 py-10 -mt-16 relative z-20">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Left Column (Clinical Content) -->
          <div class="lg:col-span-8 space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            
            <!-- Mobile Header Content -->
            <div class="md:hidden block mb-6">
              <h1 class="text-2xl font-bold mb-4 text-slate-800">{{ activity.title }}</h1>
               <div class="flex flex-wrap gap-2">
                <span class="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full" v-if="activity.ceAmount">{{ activity.ceAmount }}</span>
                <span class="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full" v-if="activity.releaseDate">Released: {{ activity.releaseDate }}</span>
                <span class="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full" v-if="activity.type">{{ activity.type }}</span>
              </div>
            </div>

            <!-- Funding Disclosure -->
            <div class="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-600">
              <div class="flex-shrink-0 mt-0.5 text-slate-400">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <span class="font-bold text-slate-800 uppercase tracking-wider text-xs block mb-1">Funding Disclosure</span>
                This activity is provided by PRIME Education. There is no fee to participate. This activity is supported by educational grants from PRIME Education.
              </div>
            </div>

            <!-- Accordion Sections -->
            <div class="space-y-4">
              
              <!-- Program Overview -->
              <div id="overview" class="border border-slate-200 rounded-lg overflow-hidden">
                <button @click="toggleSection('overview')" class="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="w-8 h-8 rounded-full bg-[#EAF2F8] text-[#277FCB] font-bold text-xs flex items-center justify-center">01</span>
                    <h2 class="text-sm font-bold uppercase tracking-widest text-slate-800">Program Overview</h2>
                  </div>
                  <svg class="w-5 h-5 text-slate-400 transform transition-transform" :class="{'rotate-180': openSections.overview}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="openSections.overview" class="p-6 pt-0 text-sm text-slate-600 space-y-4 border-t border-slate-100 bg-white">
                  <p><strong>Intended Audience:</strong> Oncologists, surgeons, radiologists, and their clinical teams (including NPs/PAs, nurses, and pharmacists) caring for patients with early-stage NSCLC.</p>
                  <p>As multimodal treatment options for resectable NSCLC expand, oncology teams face growing complexity in multidisciplinary care and adverse event management. In this podcast, expert faculty explore the practical integration of systemic therapies into treatment planning for resectable NSCLC.</p>
                </div>
              </div>

              <!-- CME Information -->
              <div id="cme" class="border border-slate-200 rounded-lg overflow-hidden">
                <button @click="toggleSection('cme')" class="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="w-8 h-8 rounded-full bg-[#EAF2F8] text-[#277FCB] font-bold text-xs flex items-center justify-center">02</span>
                    <h2 class="text-sm font-bold uppercase tracking-widest text-slate-800">CME/CE Information & Instructions</h2>
                  </div>
                  <svg class="w-5 h-5 text-slate-400 transform transition-transform" :class="{'rotate-180': openSections.cme}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="openSections.cme" class="p-6 pt-0 text-sm text-slate-600 space-y-4 border-t border-slate-100 bg-white">
                  <div class="bg-indigo-50/50 border border-indigo-100 p-4 rounded text-xs space-y-2">
                    <p class="font-bold text-slate-800">Joint Accreditation Statement</p>
                    <p>In support of improving patient care, PRIME® is jointly accredited by the Accreditation Council for Continuing Medical Education (ACCME), the Accreditation Council for Pharmacy Education (ACPE), and the American Nurses Credentialing Center (ANCC).</p>
                  </div>
                  <p><strong>Interprofessional Teams</strong><br/>Learners will receive {{ activity.ceAmount }} Interprofessional Continuing Education (IPCE) credits.</p>
                  <p><strong>Physician Credit Designation</strong><br/>Maximum of {{ activity.ceAmount }} AMA PRA Category 1 Credits&trade;.</p>
                  <p><strong>Pharmacist Accreditation</strong><br/>UAN: JA0007144-0000-26-123-H01-P. Approved for {{ activity.ceAmount }} contact hour.</p>
                  
                  <div class="mt-4">
                    <p class="font-bold text-xs uppercase tracking-wider mb-2">Obtaining CE Credit</p>
                    <ol class="list-decimal list-inside space-y-1 ml-1 text-slate-500">
                      <li>Complete the pre-activity evaluation</li>
                      <li>Complete the activity in its entirety</li>
                      <li>Complete a post-activity evaluation</li>
                      <li>Download and/or print a certificate</li>
                    </ol>
                  </div>
                </div>
              </div>

               <!-- Faculty -->
              <div id="faculty" class="border border-slate-200 rounded-lg overflow-hidden">
                <button @click="toggleSection('faculty')" class="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="w-8 h-8 rounded-full bg-[#EAF2F8] text-[#277FCB] font-bold text-xs flex items-center justify-center">03</span>
                    <h2 class="text-sm font-bold uppercase tracking-widest text-slate-800">Faculty</h2>
                  </div>
                  <svg class="w-5 h-5 text-slate-400 transform transition-transform" :class="{'rotate-180': openSections.faculty}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="openSections.faculty" class="p-6 pt-4 text-sm text-slate-600 border-t border-slate-100 bg-white">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Faculty Card 1 -->
                    <div class="flex gap-4 border border-slate-100 p-4 rounded hover:shadow-sm transition-shadow">
                      <div class="w-12 h-12 bg-slate-200 rounded-md flex-shrink-0"></div>
                      <div>
                        <div class="font-bold text-slate-800 mb-0.5">Jessica Donington, MD</div>
                        <div class="text-[9px] font-bold uppercase tracking-wider text-[#277FCB] mb-1">Speaker</div>
                        <div class="text-xs text-slate-500 leading-snug">Chief, Section of Thoracic Surgery, UChicago Medicine</div>
                      </div>
                    </div>
                    <!-- Faculty Card 2 -->
                    <div class="flex gap-4 border border-slate-100 p-4 rounded hover:shadow-sm transition-shadow">
                      <div class="w-12 h-12 bg-slate-200 rounded-md flex-shrink-0"></div>
                      <div>
                        <div class="font-bold text-slate-800 mb-0.5">Heather Wakelee, MD</div>
                        <div class="text-[9px] font-bold uppercase tracking-wider text-[#277FCB] mb-1">Speaker</div>
                        <div class="text-xs text-slate-500 leading-snug">Chief, Division of Oncology, Stanford University</div>
                      </div>
                    </div>
                    <!-- Faculty Card 3 -->
                    <div class="flex gap-4 border border-slate-100 p-4 rounded hover:shadow-sm transition-shadow md:col-span-2 lg:col-span-1">
                      <div class="w-12 h-12 bg-slate-200 rounded-md flex-shrink-0"></div>
                      <div>
                        <div class="font-bold text-slate-800 mb-0.5">Douglas S Burgoyne, PharmD</div>
                        <div class="text-[9px] font-bold uppercase tracking-wider text-[#065184] mb-1">Moderator</div>
                        <div class="text-xs text-slate-500 leading-snug">University of Utah College of Pharmacy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <!-- Agenda -->
              <div id="agenda" class="border border-slate-200 rounded-lg overflow-hidden">
                <button @click="toggleSection('agenda')" class="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="w-8 h-8 rounded-full bg-[#EAF2F8] text-[#277FCB] font-bold text-xs flex items-center justify-center">04</span>
                    <h2 class="text-sm font-bold uppercase tracking-widest text-slate-800">Agenda</h2>
                  </div>
                  <svg class="w-5 h-5 text-slate-400 transform transition-transform" :class="{'rotate-180': openSections.agenda}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="openSections.agenda" class="p-6 pt-4 text-sm text-slate-600 border-t border-slate-100 bg-white">
                  <ul class="list-disc list-outside ml-4 space-y-2">
                    <li>Integrating Systemic Therapies for Resectable NSCLC</li>
                    <li v-for="seg in mockSegments" :key="seg.label">{{ seg.label }} (Approx. {{ seg.time }})</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column (Snapshot Card) -->
          <div class="lg:col-span-4">
            <div class="sticky top-6 rounded-lg overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col">
              
              <!-- Snapshot Header -->
              <div class="bg-[#065184] text-white p-4">
                <h3 class="font-bold text-sm tracking-widest uppercase">Activity Snapshot</h3>
              </div>
              
              <div class="p-6 flex-grow flex flex-col">
                <!-- Data Grid -->
                <div class="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 text-sm mb-6">
                  <div class="font-semibold text-slate-700">Activity Type:</div>
                  <div class="text-slate-600">{{ activity.type }}</div>
                  
                  <div class="font-semibold text-slate-700">Release Date:</div>
                  <div class="text-slate-600">{{ activity.releaseDate }}</div>
                  
                  <div class="font-semibold text-slate-700">Expiration Date:</div>
                  <div class="text-slate-600">Feb 26, 2027</div>

                  <div class="font-semibold text-slate-700">Activity Price:</div>
                  <div class="text-slate-600">Free</div>
                </div>

                <!-- CE Credits list -->
                <div class="border-t border-slate-200 pt-5 mb-6">
                  <h4 class="font-bold text-sm text-slate-800 mb-3">Continuing Education Credits:</h4>
                  <ul class="space-y-2 text-xs text-slate-600">
                    <li class="flex gap-2 items-start"><span class="text-slate-300">&bull;</span> {{ activity.ceAmount }} CME/CE for <strong>Physicians</strong> (ACCME)</li>
                    <li class="flex gap-2 items-start"><span class="text-slate-300">&bull;</span> {{ activity.ceAmount }} CME/CE for <strong>Physician Associates</strong> (AAPA)</li>
                    <li class="flex gap-2 items-start"><span class="text-slate-300">&bull;</span> {{ activity.ceAmount }} CME/CE for <strong>Nurse Practitioners</strong> (AANP)</li>
                    <li class="flex gap-2 items-start"><span class="text-slate-300">&bull;</span> {{ activity.ceAmount }} CPE for <strong>Pharmacists</strong> (ACPE + NABP)</li>
                    <li class="flex gap-2 items-start"><span class="text-slate-300">&bull;</span> {{ activity.ceAmount }} CNE for <strong>Nurses</strong> (ANCC)</li>
                  </ul>
                </div>

                <!-- Duration & review info -->
                <div class="grid grid-cols-[130px_1fr] gap-y-2 gap-x-2 text-[11px] mb-8 mt-auto">
                    <div class="font-semibold text-slate-700">Estimated Duration:</div>
                    <div class="text-slate-600">{{ activity.duration || '15:00' }} minutes</div>
                    
                    <div class="font-semibold text-slate-700">Last Reviewed:</div>
                    <div class="text-slate-600">{{ activity.releaseDate }}</div>
                </div>

                <button @click="startActivity" class="w-full bg-[#185542] hover:bg-[#124231] text-white font-bold tracking-widest uppercase py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                  Start Activity
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="animate-pulse flex flex-col items-center">
      <div class="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
      <div class="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Activity...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useActivities } from '../composables/useActivities';
import { mockSegments } from '../data/activities';

const route = useRoute();
const router = useRouter();
const { getActivityById, loadActivityAndPlay } = useActivities();

const activity = ref(null);

const openSections = ref({
  overview: true,
  cme: true,
  faculty: true,
  agenda: true
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

const startActivity = () => {
  if (activity.value) {
    loadActivityAndPlay(activity.value);
    router.push({ name: 'activity', params: { id: activity.value.id } });
  }
};

onMounted(() => {
  if (route.params.id) {
    activity.value = getActivityById(route.params.id);
  }
});
</script>
