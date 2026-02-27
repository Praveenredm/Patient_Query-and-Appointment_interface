import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "en" | "ta";

const translations = {
  en: {
    // Header
    appName: "MediCare",
    appSubtitle: "Patient Query & Appointments",

    // Steps
    step1: "Patient Details",
    step2: "Symptoms",
    step3: "Appointment",

    // Patient Details
    patientDetailsTitle: "Patient Details",
    patientDetailsSubtitle: "Please provide your basic information",
    fullName: "Full Name",
    age: "Age",
    gender: "Gender",
    location: "Location",
    phoneEmail: "Phone / Email",
    enterFullName: "Enter your full name",
    enterAge: "Enter age",
    selectGender: "Select gender",
    cityState: "City, State",
    enterPhoneEmail: "Enter phone number or email",
    male: "Male",
    female: "Female",
    other: "Other",
    preferNot: "Prefer not to say",
    continue: "Continue",
    back: "Back",
    required: "*",

    // Validation
    fullNameRequired: "Full name is required",
    validAge: "Please enter a valid age",
    contactRequired: "Phone or email is required",

    // Symptoms
    symptomsTitle: "Symptoms",
    symptomsSubtitle: "Select all symptoms you're experiencing",
    severityLevel: "Severity Level",
    duration: "Duration",
    durationPlaceholder: "How long have you had symptoms?",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    describeSymptoms: "Describe your symptoms in detail...",
    voiceInput: "Voice Input",
    listening: "Listening...",
    tapToSpeak: "Tap to speak",
    voiceNotSupported: "Voice input is not supported in your browser",

    // Symptom names
    symptomHeadache: "Headache",
    symptomFever: "Fever",
    symptomCough: "Cough",
    symptomFatigue: "Fatigue",
    symptomNausea: "Nausea",
    symptomChestPain: "Chest Pain",
    symptomBreathlessness: "Breathlessness",
    symptomDizziness: "Dizziness",
    symptomBackPain: "Back Pain",
    symptomJointPain: "Joint Pain",
    symptomSoreThroat: "Sore Throat",
    symptomAbdominalPain: "Abdominal Pain",
    symptomSkinRash: "Skin Rash",
    symptomInsomnia: "Insomnia",
    symptomAnxiety: "Anxiety",
    symptomBlurredVision: "Blurred Vision",
    symptomNumbness: "Numbness",
    symptomPalpitations: "Palpitations",
    symptomWeightLoss: "Weight Loss",
    symptomSwelling: "Swelling",

    // Durations
    durationLess24: "Less than 24 hours",
    duration1to3: "1-3 days",
    duration4to7: "4-7 days",
    duration1to2w: "1-2 weeks",
    duration2to4w: "2-4 weeks",
    durationMonth: "More than a month",

    // Emergency
    emergencyAlert: "Emergency Alert",
    emergencyText: "Your symptom combination indicates a potential emergency. Please seek immediate medical attention.",
    emergencyDisabled: "Normal appointment booking has been disabled. Please call emergency services or visit the nearest hospital.",

    // Intelligence
    symptomIntelligence: "Symptom Intelligence",
    aiAssessment: "AI-powered preliminary assessment",
    possibleCategory: "Possible Category",
    urgencyLevel: "Urgency Level",
    recommendedSpecialist: "Recommended Specialist",

    // Appointment
    bookAppointment: "Book Appointment",
    chooseSchedule: "Choose your preferred schedule",
    recommendedSpec: "Recommended Specialist",
    preferredDate: "Preferred Date",
    selectDate: "Select a date",
    availableSlots: "Available Time Slots",
    consultationMode: "Consultation Mode",
    inPerson: "In-Person",
    visitClinic: "Visit the clinic",
    teleconsultation: "Teleconsultation",
    videoCall: "Video call",
    confirmAppointment: "Confirm Appointment",
    booking: "Booking...",

    // Summary
    appointmentConfirmed: "Appointment Confirmed!",
    successfullyBooked: "Your appointment has been successfully booked",
    referenceId: "Reference ID",
    copy: "Copy",
    patient: "Patient",
    specialist: "Specialist",
    date: "Date",
    time: "Time",
    mode: "Mode",
    security: "Security",
    encryptedSecured: "Encrypted & Secured",
    inPersonVisit: "In-Person Visit",
    downloadConfirmation: "Download Confirmation",
    bookAnother: "Book Another Appointment",
    copiedToClipboard: "Reference ID copied to clipboard",
    confirmationDownloaded: "Confirmation downloaded",

    // Footer
    footerText: "© 2026 MediCare — Your data is encrypted and secured with AES-256 encryption",

    // Language
    english: "English",
    tamil: "தமிழ்",
  },
  ta: {
    // Header
    appName: "MediCare",
    appSubtitle: "நோயாளி வினவல் & சந்திப்புகள்",

    // Steps
    step1: "நோயாளி விவரங்கள்",
    step2: "அறிகுறிகள்",
    step3: "சந்திப்பு",

    // Patient Details
    patientDetailsTitle: "நோயாளி விவரங்கள்",
    patientDetailsSubtitle: "உங்கள் அடிப்படை தகவலை வழங்கவும்",
    fullName: "முழு பெயர்",
    age: "வயது",
    gender: "பாலினம்",
    location: "இடம்",
    phoneEmail: "தொலைபேசி / மின்னஞ்சல்",
    enterFullName: "உங்கள் முழு பெயரை உள்ளிடவும்",
    enterAge: "வயதை உள்ளிடவும்",
    selectGender: "பாலினத்தை தேர்ந்தெடுக்கவும்",
    cityState: "நகரம், மாநிலம்",
    enterPhoneEmail: "தொலைபேசி எண் அல்லது மின்னஞ்சலை உள்ளிடவும்",
    male: "ஆண்",
    female: "பெண்",
    other: "மற்றவை",
    preferNot: "சொல்ல விரும்பவில்லை",
    continue: "தொடரவும்",
    back: "பின்",
    required: "*",

    // Validation
    fullNameRequired: "முழு பெயர் அவசியம்",
    validAge: "சரியான வயதை உள்ளிடவும்",
    contactRequired: "தொலைபேசி அல்லது மின்னஞ்சல் அவசியம்",

    // Symptoms
    symptomsTitle: "அறிகுறிகள்",
    symptomsSubtitle: "நீங்கள் அனுபவிக்கும் அனைத்து அறிகுறிகளையும் தேர்ந்தெடுக்கவும்",
    severityLevel: "தீவிரம்",
    duration: "கால அளவு",
    durationPlaceholder: "எவ்வளவு காலமாக அறிகுறிகள் உள்ளன?",
    mild: "லேசான",
    moderate: "மிதமான",
    severe: "கடுமையான",
    describeSymptoms: "உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும்...",
    voiceInput: "குரல் உள்ளீடு",
    listening: "கேட்கிறது...",
    tapToSpeak: "பேச தட்டவும்",
    voiceNotSupported: "உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை",

    // Symptom names
    symptomHeadache: "தலைவலி",
    symptomFever: "காய்ச்சல்",
    symptomCough: "இருமல்",
    symptomFatigue: "சோர்வு",
    symptomNausea: "குமட்டல்",
    symptomChestPain: "நெஞ்சு வலி",
    symptomBreathlessness: "மூச்சுத் திணறல்",
    symptomDizziness: "தலை சுற்றல்",
    symptomBackPain: "முதுகு வலி",
    symptomJointPain: "மூட்டு வலி",
    symptomSoreThroat: "தொண்டை வலி",
    symptomAbdominalPain: "வயிற்று வலி",
    symptomSkinRash: "தோல் அரிப்பு",
    symptomInsomnia: "தூக்கமின்மை",
    symptomAnxiety: "பதற்றம்",
    symptomBlurredVision: "மங்கலான பார்வை",
    symptomNumbness: "மரத்துப்போதல்",
    symptomPalpitations: "இதயத் துடிப்பு",
    symptomWeightLoss: "எடை இழப்பு",
    symptomSwelling: "வீக்கம்",

    // Durations
    durationLess24: "24 மணி நேரத்திற்கும் குறைவாக",
    duration1to3: "1-3 நாட்கள்",
    duration4to7: "4-7 நாட்கள்",
    duration1to2w: "1-2 வாரங்கள்",
    duration2to4w: "2-4 வாரங்கள்",
    durationMonth: "ஒரு மாதத்திற்கும் மேல்",

    // Emergency
    emergencyAlert: "அவசர எச்சரிக்கை",
    emergencyText: "உங்கள் அறிகுறி சேர்க்கை சாத்தியமான அவசரநிலையைக் குறிக்கிறது. உடனடியாக மருத்துவ உதவியை நாடவும்.",
    emergencyDisabled: "சாதாரண சந்திப்பு முன்பதிவு முடக்கப்பட்டுள்ளது. அவசர சேவைகளை அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்குச் செல்லவும்.",

    // Intelligence
    symptomIntelligence: "அறிகுறி நுண்ணறிவு",
    aiAssessment: "AI இயங்கும் முதற்கட்ட மதிப்பீடு",
    possibleCategory: "சாத்தியமான வகை",
    urgencyLevel: "அவசர நிலை",
    recommendedSpecialist: "பரிந்துரைக்கப்பட்ட நிபுணர்",

    // Appointment
    bookAppointment: "சந்திப்பு முன்பதிவு",
    chooseSchedule: "உங்கள் விருப்பமான அட்டவணையைத் தேர்ந்தெடுக்கவும்",
    recommendedSpec: "பரிந்துரைக்கப்பட்ட நிபுணர்",
    preferredDate: "விருப்பமான தேதி",
    selectDate: "ஒரு தேதியைத் தேர்ந்தெடுக்கவும்",
    availableSlots: "கிடைக்கும் நேர இடங்கள்",
    consultationMode: "ஆலோசனை முறை",
    inPerson: "நேரில்",
    visitClinic: "மருத்துவமனைக்கு செல்லவும்",
    teleconsultation: "தொலை ஆலோசனை",
    videoCall: "காணொலி அழைப்பு",
    confirmAppointment: "சந்திப்பை உறுதிப்படுத்தவும்",
    booking: "முன்பதிவு செய்கிறது...",

    // Summary
    appointmentConfirmed: "சந்திப்பு உறுதிப்படுத்தப்பட்டது!",
    successfullyBooked: "உங்கள் சந்திப்பு வெற்றிகரமாக முன்பதிவு செய்யப்பட்டுள்ளது",
    referenceId: "குறிப்பு எண்",
    copy: "நகல்",
    patient: "நோயாளி",
    specialist: "நிபுணர்",
    date: "தேதி",
    time: "நேரம்",
    mode: "முறை",
    security: "பாதுகாப்பு",
    encryptedSecured: "மறையாக்கம் & பாதுகாப்பானது",
    inPersonVisit: "நேரில் வருகை",
    downloadConfirmation: "உறுதிப்படுத்தலை பதிவிறக்கவும்",
    bookAnother: "மற்றொரு சந்திப்பை முன்பதிவு செய்யவும்",
    copiedToClipboard: "குறிப்பு எண் நகலெடுக்கப்பட்டது",
    confirmationDownloaded: "உறுதிப்படுத்தல் பதிவிறக்கப்பட்டது",

    // Footer
    footerText: "© 2026 MediCare — உங்கள் தரவு AES-256 மறையாக்கத்துடன் பாதுகாக்கப்படுகிறது",

    // Language
    english: "English",
    tamil: "தமிழ்",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

// Map English symptom names to translation keys
export const SYMPTOM_KEY_MAP: Record<string, TranslationKey> = {
  "Headache": "symptomHeadache",
  "Fever": "symptomFever",
  "Cough": "symptomCough",
  "Fatigue": "symptomFatigue",
  "Nausea": "symptomNausea",
  "Chest Pain": "symptomChestPain",
  "Breathlessness": "symptomBreathlessness",
  "Dizziness": "symptomDizziness",
  "Back Pain": "symptomBackPain",
  "Joint Pain": "symptomJointPain",
  "Sore Throat": "symptomSoreThroat",
  "Abdominal Pain": "symptomAbdominalPain",
  "Skin Rash": "symptomSkinRash",
  "Insomnia": "symptomInsomnia",
  "Anxiety": "symptomAnxiety",
  "Blurred Vision": "symptomBlurredVision",
  "Numbness": "symptomNumbness",
  "Palpitations": "symptomPalpitations",
  "Weight Loss": "symptomWeightLoss",
  "Swelling": "symptomSwelling",
};

export const DURATION_KEY_MAP: Record<string, TranslationKey> = {
  "Less than 24 hours": "durationLess24",
  "1-3 days": "duration1to3",
  "4-7 days": "duration4to7",
  "1-2 weeks": "duration1to2w",
  "2-4 weeks": "duration2to4w",
  "More than a month": "durationMonth",
};
