import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Video,
  Building2,
  Download,
  Copy,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import type { PatientData } from "./PatientDetailsForm";
import type { AppointmentData } from "./AppointmentForm";
import { useI18n } from "@/lib/i18n";

interface AppointmentSummaryProps {
  patient: PatientData;
  appointment: AppointmentData;
  referenceId: string;
  onReset: () => void;
}

const AppointmentSummary = ({ patient, appointment, referenceId, onReset }: AppointmentSummaryProps) => {
  const { t } = useI18n();

  const copyReference = () => {
    navigator.clipboard.writeText(referenceId);
    toast.success(t("copiedToClipboard"));
  };

  const downloadConfirmation = () => {
    const content = `
APPOINTMENT CONFIRMATION
========================
${t("referenceId")}: ${referenceId}

${t("patient")}: ${patient.fullName}
${t("age")}: ${patient.age}
Contact: ${patient.contact}

${t("specialist")}: ${appointment.specialist}
${t("date")}: ${appointment.date ? format(appointment.date, "PPP") : "N/A"}
${t("time")}: ${appointment.timeSlot}
${t("mode")}: ${appointment.mode === "in-person" ? t("inPersonVisit") : t("teleconsultation")}

${t("encryptedSecured")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointment-${referenceId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("confirmationDownloaded"));
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{t("appointmentConfirmed")}</h2>
        <p className="text-muted-foreground mt-2">{t("successfullyBooked")}</p>
      </div>

      <div className="healthcare-card mb-4">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t("referenceId")}</p>
            <p className="text-lg font-mono font-bold text-primary">{referenceId}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copyReference} className="rounded-lg gap-2">
            <Copy className="w-3.5 h-3.5" />
            {t("copy")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">{t("patient")}</p>
              <p className="font-medium text-foreground">{patient.fullName}</p>
              <p className="text-sm text-muted-foreground">{t("age")}: {patient.age}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">{t("specialist")}</p>
              <p className="font-medium text-foreground">{appointment.specialist}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">{t("date")}</p>
              <p className="font-medium text-foreground">
                {appointment.date ? format(appointment.date, "PPP") : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">{t("time")}</p>
              <p className="font-medium text-foreground">{appointment.timeSlot}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {appointment.mode === "in-person" ? (
              <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
            ) : (
              <Video className="w-5 h-5 text-muted-foreground mt-0.5" />
            )}
            <div>
              <p className="text-xs text-muted-foreground">{t("mode")}</p>
              <p className="font-medium text-foreground">
                {appointment.mode === "in-person" ? t("inPersonVisit") : t("teleconsultation")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">{t("security")}</p>
              <p className="font-medium text-success">{t("encryptedSecured")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={downloadConfirmation} className="flex-1 h-12 rounded-xl gap-2">
          <Download className="w-4 h-4" />
          {t("downloadConfirmation")}
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1 h-12 rounded-xl">
          {t("bookAnother")}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
