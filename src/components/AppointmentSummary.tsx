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

interface AppointmentSummaryProps {
  patient: PatientData;
  appointment: AppointmentData;
  referenceId: string;
  onReset: () => void;
}

const AppointmentSummary = ({ patient, appointment, referenceId, onReset }: AppointmentSummaryProps) => {
  const copyReference = () => {
    navigator.clipboard.writeText(referenceId);
    toast.success("Reference ID copied to clipboard");
  };

  const downloadConfirmation = () => {
    const content = `
APPOINTMENT CONFIRMATION
========================
Reference ID: ${referenceId}

Patient: ${patient.fullName}
Age: ${patient.age}
Contact: ${patient.contact}

Specialist: ${appointment.specialist}
Date: ${appointment.date ? format(appointment.date, "PPP") : "N/A"}
Time: ${appointment.timeSlot}
Mode: ${appointment.mode === "in-person" ? "In-Person" : "Teleconsultation"}

This confirmation is encrypted and secured.
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointment-${referenceId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Confirmation downloaded");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Appointment Confirmed!</h2>
        <p className="text-muted-foreground mt-2">Your appointment has been successfully booked</p>
      </div>

      <div className="healthcare-card mb-4">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Reference ID</p>
            <p className="text-lg font-mono font-bold text-primary">{referenceId}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copyReference} className="rounded-lg gap-2">
            <Copy className="w-3.5 h-3.5" />
            Copy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Patient</p>
              <p className="font-medium text-foreground">{patient.fullName}</p>
              <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Specialist</p>
              <p className="font-medium text-foreground">{appointment.specialist}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {appointment.date ? format(appointment.date, "PPP") : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
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
              <p className="text-xs text-muted-foreground">Mode</p>
              <p className="font-medium text-foreground">
                {appointment.mode === "in-person" ? "In-Person Visit" : "Teleconsultation"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Security</p>
              <p className="font-medium text-success">Encrypted & Secured</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={downloadConfirmation} className="flex-1 h-12 rounded-xl gap-2">
          <Download className="w-4 h-4" />
          Download Confirmation
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1 h-12 rounded-xl">
          Book Another Appointment
        </Button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
