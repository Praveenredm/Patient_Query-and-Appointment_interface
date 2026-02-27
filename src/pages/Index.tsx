import { useState, useCallback } from "react";
import ProgressBar from "@/components/ProgressBar";
import PatientDetailsForm, { type PatientData } from "@/components/PatientDetailsForm";
import SymptomsForm, { type SymptomsData } from "@/components/SymptomsForm";
import AppointmentForm, { type AppointmentData } from "@/components/AppointmentForm";
import AppointmentSummary from "@/components/AppointmentSummary";
import LanguageToggle from "@/components/LanguageToggle";
import { analyzeSymptoms, generateReferenceId } from "@/lib/symptom-data";
import { useI18n } from "@/lib/i18n";
import { Heart } from "lucide-react";

const initialPatient: PatientData = { fullName: "", age: "", gender: "", location: "", contact: "" };
const initialSymptoms: SymptomsData = { symptoms: [], severity: 1, duration: "", description: "" };
const initialAppointment: AppointmentData = { specialist: "", date: undefined, timeSlot: "", mode: "in-person" };

const Index = () => {
  const { t } = useI18n();
  const steps = [t("step1"), t("step2"), t("step3")];

  const [step, setStep] = useState(1);
  const [patient, setPatient] = useState<PatientData>(initialPatient);
  const [symptoms, setSymptoms] = useState<SymptomsData>(initialSymptoms);
  const [appointment, setAppointment] = useState<AppointmentData>(initialAppointment);
  const [errors, setErrors] = useState<Partial<Record<keyof PatientData, string>>>({});
  const [isEmergency, setIsEmergency] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePatient = useCallback(() => {
    const e: typeof errors = {};
    if (!patient.fullName.trim()) e.fullName = t("fullNameRequired");
    if (!patient.age.trim() || isNaN(Number(patient.age)) || Number(patient.age) < 1 || Number(patient.age) > 150) e.age = t("validAge");
    if (!patient.contact.trim()) e.contact = t("contactRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [patient, t]);

  const handlePatientChange = (field: keyof PatientData, value: string) => {
    setPatient((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const goToStep2 = () => {
    if (validatePatient()) setStep(2);
  };

  const goToStep3 = () => {
    const analysis = analyzeSymptoms(symptoms.symptoms, symptoms.severity);
    setAppointment((a) => ({ ...a, specialist: analysis.specialist }));
    setStep(3);
  };

  const handleSubmit = () => {
    setReferenceId(generateReferenceId());
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setPatient(initialPatient);
    setSymptoms(initialSymptoms);
    setAppointment(initialAppointment);
    setErrors({});
    setIsEmergency(false);
    setReferenceId("");
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{t("appName")}</h1>
              <p className="text-xs text-muted-foreground">{t("appSubtitle")}</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {!isSubmitted && <ProgressBar currentStep={step} steps={steps} />}

        {isSubmitted ? (
          <AppointmentSummary
            patient={patient}
            appointment={appointment}
            referenceId={referenceId}
            onReset={handleReset}
          />
        ) : step === 1 ? (
          <PatientDetailsForm
            data={patient}
            errors={errors}
            onChange={handlePatientChange}
            onNext={goToStep2}
          />
        ) : step === 2 ? (
          <SymptomsForm
            data={symptoms}
            onChange={setSymptoms}
            onNext={goToStep3}
            onBack={() => setStep(1)}
            onEmergency={setIsEmergency}
          />
        ) : (
          <AppointmentForm
            data={appointment}
            suggestedSpecialist={appointment.specialist}
            onChange={setAppointment}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
          />
        )}
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <p className="text-center text-xs text-muted-foreground">{t("footerText")}</p>
      </footer>
    </div>
  );
};

export default Index;
