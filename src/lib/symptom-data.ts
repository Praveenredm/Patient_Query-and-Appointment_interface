export const SYMPTOMS = [
  "Headache", "Fever", "Cough", "Fatigue", "Nausea",
  "Chest Pain", "Breathlessness", "Dizziness", "Back Pain",
  "Joint Pain", "Sore Throat", "Abdominal Pain", "Skin Rash",
  "Insomnia", "Anxiety", "Blurred Vision", "Numbness",
  "Palpitations", "Weight Loss", "Swelling",
] as const;

export const HIGH_RISK_COMBINATIONS = [
  ["Chest Pain", "Breathlessness"],
  ["Chest Pain", "Palpitations"],
  ["Numbness", "Dizziness", "Headache"],
  ["Chest Pain", "Nausea", "Dizziness"],
];

export const DURATIONS = [
  "Less than 24 hours",
  "1-3 days",
  "4-7 days",
  "1-2 weeks",
  "2-4 weeks",
  "More than a month",
];

export type UrgencyLevel = "Low" | "Medium" | "High";

export interface SymptomAnalysis {
  category: string;
  urgency: UrgencyLevel;
  specialist: string;
  isEmergency: boolean;
  nearestHospital?: string;
}

export function analyzeSymptoms(symptoms: string[], severity: number): SymptomAnalysis {
  const isEmergency = HIGH_RISK_COMBINATIONS.some(combo =>
    combo.every(s => symptoms.includes(s))
  );

  if (isEmergency) {
    return {
      category: "Cardiac / Emergency",
      urgency: "High",
      specialist: "Emergency Medicine / Cardiologist",
      isEmergency: true,
      nearestHospital: "City General Hospital — 2.3 km away",
    };
  }

  const mapping: Record<string, { category: string; specialist: string }> = {
    "Headache": { category: "Neurological", specialist: "Neurologist" },
    "Fever": { category: "General / Infectious", specialist: "General Physician" },
    "Cough": { category: "Respiratory", specialist: "Pulmonologist" },
    "Chest Pain": { category: "Cardiac", specialist: "Cardiologist" },
    "Breathlessness": { category: "Respiratory / Cardiac", specialist: "Pulmonologist" },
    "Joint Pain": { category: "Musculoskeletal", specialist: "Orthopedist" },
    "Back Pain": { category: "Musculoskeletal", specialist: "Orthopedist" },
    "Skin Rash": { category: "Dermatological", specialist: "Dermatologist" },
    "Blurred Vision": { category: "Ophthalmological", specialist: "Ophthalmologist" },
    "Anxiety": { category: "Mental Health", specialist: "Psychiatrist" },
    "Insomnia": { category: "Mental Health / Neurological", specialist: "Psychiatrist" },
    "Abdominal Pain": { category: "Gastrointestinal", specialist: "Gastroenterologist" },
    "Nausea": { category: "Gastrointestinal", specialist: "Gastroenterologist" },
    "Palpitations": { category: "Cardiac", specialist: "Cardiologist" },
    "Dizziness": { category: "Neurological", specialist: "Neurologist" },
    "Numbness": { category: "Neurological", specialist: "Neurologist" },
    "Sore Throat": { category: "ENT", specialist: "ENT Specialist" },
    "Weight Loss": { category: "Endocrine / General", specialist: "Endocrinologist" },
    "Swelling": { category: "General", specialist: "General Physician" },
    "Fatigue": { category: "General", specialist: "General Physician" },
  };

  const primary = symptoms[0] || "Fatigue";
  const info = mapping[primary] || { category: "General", specialist: "General Physician" };

  let urgency: UrgencyLevel = "Low";
  if (severity >= 4 || symptoms.length >= 4) urgency = "High";
  else if (severity >= 3 || symptoms.length >= 2) urgency = "Medium";

  return {
    category: info.category,
    urgency,
    specialist: info.specialist,
    isEmergency: false,
  };
}

export const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export function generateReferenceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const prefix = "HC";
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${timestamp}-${random}`;
}
