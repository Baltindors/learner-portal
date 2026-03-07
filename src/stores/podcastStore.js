import { ref } from 'vue'

const rawCsvData = `ID,Code,Title,Releases,Tags
9301,72PC251,Pulmonary Arterial Hypertension Unveiled: From Pathways to Presentation,19-Nov-25,Allergy/Immunology; Cardiology; Pulmonary Medicine; Podcast; 2025
9473,72PC253,Advancing Immune Checkpoint Inhibitor Use in Resectable Melanoma,18-Nov-25,Dermatology; Oncology; Podcast; 2025
9474,72PC254,Navigating the Complexities of NSCLC: From Diagnosis to Treatment,17-Nov-25,Oncology; Pulmonary Medicine; Podcast; 2025
9475,72PC255,Understanding the Role of Immunotherapy in Advanced Melanoma,16-Nov-25,Dermatology; Oncology; Podcast; 2025
9476,72PC256,Advances in the Management of Atrial Fibrillation,15-Nov-25,Cardiology; Internal Medicine; Podcast; 2025
9477,72PC257,Exploring the Latest in Infectious Disease Therapies,14-Nov-25,Infectious Disease; Internal Medicine; Podcast; 2025
9478,72PC258,Neurological Disorders: Current Challenges and Innovations,13-Nov-25,Neurology; Internal Medicine; Podcast; 2025
9479,72PC259,Cardiovascular Risk Assessment and Management,12-Nov-25,Cardiology; Internal Medicine; Podcast; 2025
9480,72PC260,Infectious Disease Outbreaks: Preparedness and Response,11-Nov-25,Infectious Disease; Public Health; Podcast; 2025
9481,72PC261,Advances in Neurological Imaging and Diagnostics,10-Nov-25,Neurology; Radiology; Podcast; 2025
9482,72PC262,Oncology Nursing: Supporting Patients Through Treatment,09-Nov-25,Oncology; Nursing; Podcast; 2025
9483,72PC263,Cardiology in Primary Care: Key Updates,08-Nov-25,Cardiology; Family Medicine; Podcast; 2025
9484,72PC264,Immunology and Autoimmune Diseases: New Frontiers,07-Nov-25,Immunology; Rheumatology; Podcast; 2025
9485,72PC265,Pulmonary Medicine: COPD and Beyond,06-Nov-25,Pulmonary Medicine; Internal Medicine; Podcast; 2025
9486,72PC266,Dermatology: Skin Disorders and Therapies,05-Nov-25,Dermatology; Internal Medicine; Podcast; 2025
9487,72PC267,Endocrinology: Diabetes Management Strategies,04-Nov-25,Endocrinology; Internal Medicine; Podcast; 2025
9488,72PC268,Gastroenterology: Liver Diseases and Treatments,03-Nov-25,Gastroenterology; Internal Medicine; Podcast; 2025
9489,72PC269,Nephrology: Kidney Health and Dialysis,02-Nov-25,Nephrology; Internal Medicine; Podcast; 2025
9490,72PC270,Psychiatry: Mental Health in Clinical Practice,01-Nov-25,Psychiatry; Internal Medicine; Podcast; 2025
9491,72PC271,Hematology: Blood Disorders and Therapies,30-Oct-25,Hematology; Oncology; Podcast; 2025
9492,72PC272,Orthopedics: Joint and Bone Health,29-Oct-25,Orthopedics; Internal Medicine; Podcast; 2025
9493,72PC273,Urology: Prostate and Bladder Issues,28-Oct-25,Urology; Internal Medicine; Podcast; 2025
9494,72PC274,Ophthalmology: Vision and Eye Health,27-Oct-25,Ophthalmology; Internal Medicine; Podcast; 2025
9495,72PC275,Otolaryngology: ENT Disorders,26-Oct-25,Otolaryngology; Internal Medicine; Podcast; 2025
9496,72PC276,Obstetrics and Gynecology: Women's Health,25-Oct-25,Obstetrics/Gynecology; Internal Medicine; Podcast; 2025
9497,72PC277,Pediatrics: Child Health and Development,24-Oct-25,Pediatrics; Internal Medicine; Podcast; 2025
9498,72PC278,Emergency Medicine: Critical Care Updates,23-Oct-25,Emergency Medicine; Internal Medicine; Podcast; 2025
9499,72PC279,Anesthesiology: Pain Management,22-Oct-25,Anesthesiology; Internal Medicine; Podcast; 2025
9500,72PC280,Radiology: Imaging Technologies,21-Oct-25,Radiology; Internal Medicine; Podcast; 2025
9501,72PC281,Pathology: Diagnostic Insights,20-Oct-25,Pathology; Internal Medicine; Podcast; 2025
9502,72PC282,Pharmacology: Drug Development,19-Oct-25,Pharmacology; Internal Medicine; Podcast; 2025
9503,72PC283,Toxicology: Poisoning and Overdose,18-Oct-25,Toxicology; Emergency Medicine; Podcast; 2025
9504,72PC284,Genetics: Hereditary Diseases,17-Oct-25,Genetics; Internal Medicine; Podcast; 2025
9505,72PC285,Public Health: Epidemiology,16-Oct-25,Public Health; Internal Medicine; Podcast; 2025
9506,72PC286,Sports Medicine: Injury Prevention,15-Oct-25,Sports Medicine; Orthopedics; Podcast; 2025
9507,72PC287,Forensic Medicine: Legal Aspects,14-Oct-25,Forensic Medicine; Internal Medicine; Podcast; 2025
9508,72PC288,Rehabilitation Medicine: Recovery,13-Oct-25,Rehabilitation; Internal Medicine; Podcast; 2025
9509,72PC289,Palliative Care: End-of-Life,12-Oct-25,Palliative Care; Internal Medicine; Podcast; 2025
9510,72PC290,Integrative Medicine: Holistic Approaches,11-Oct-25,Integrative Medicine; Internal Medicine; Podcast; 2025
9511,72PC291,Telemedicine: Remote Healthcare,10-Oct-25,Telemedicine; Internal Medicine; Podcast; 2025
9512,72PC292,Nutrition: Diet and Health,09-Oct-25,Nutrition; Internal Medicine; Podcast; 2025
9513,72PC293,Sleep Medicine: Disorders and Treatments,08-Oct-25,Sleep Medicine; Internal Medicine; Podcast; 2025
9514,72PC294,Allergy: Sensitivities and Management,07-Oct-25,Allergy; Internal Medicine; Podcast; 2025
9515,72PC295,Infectious Disease: Viral Outbreaks,06-Oct-25,Infectious Disease; Public Health; Podcast; 2025
9516,72PC296,Neurology: Stroke Prevention,05-Oct-25,Neurology; Cardiology; Podcast; 2025
9517,72PC297,Cardiology: Heart Failure,04-Oct-25,Cardiology; Internal Medicine; Podcast; 2025
9518,72PC298,Oncology: Breast Cancer,03-Oct-25,Oncology; Surgery; Podcast; 2025
9519,72PC299,Dermatology: Psoriasis,02-Oct-25,Dermatology; Rheumatology; Podcast; 2025
9520,72PC300,Endocrinology: Thyroid Disorders,01-Oct-25,Endocrinology; Internal Medicine; Podcast; 2025`

export const therapeuticAreas = [
  'Oncology',
  'Infectious Disease',
  'Neurology',
  'Cardiology',
  'Internal Medicine'
]

export const mockFaculty = [
  { name: 'Dr. Sarah Jenkins, MD', title: 'Oncology Specialist, Memorial Health' },
  { name: 'Dr. Marcus Thorne, PharmD', title: 'Lead Clinical Pharmacist' }
]

export const mockSegments = [
  { time: '00:00', label: 'Introduction' },
  { time: '02:45', label: 'Clinical Guidelines' },
  { time: '07:15', label: 'Case Studies' },
  { time: '12:30', label: 'Closing & Credits' }
]

export const podcastData = ref([])
export const searchQuery = ref('')
export const activeEpisode = ref(null)
export const isPlaying = ref(false)
export const isMinimized = ref(false)
export const rightTab = ref('faculty')

export function parseCsvData() {
  const lines = rawCsvData.trim().split('\n')
  const headers = lines[0].split(',')
  const data = lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
    if (!values) return null
    return {
      ID: values[0],
      Code: values[1],
      Title: values[2].replace(/"/g, ''),
      Releases: values[3],
      Tags: values[4]
    }
  }).filter(Boolean)
  podcastData.value = data
}

export function getGroupedByArea() {
  const grouped = {}
  therapeuticAreas.forEach(area => {
    grouped[area] = podcastData.value.filter(item => item.Tags.includes(area))
  })
  return grouped
}

export function getEpisodeOrder(code) {
  const episode = podcastData.value.find(item => item.Code === code)
  return episode ? episode.ID : 'N/A'
}