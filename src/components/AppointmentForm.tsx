import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  Video,
  Building2,
  Stethoscope,
} from "lucide-react";
import { TIME_SLOTS } from "@/lib/symptom-data";
import { useI18n } from "@/lib/i18n";

export interface AppointmentData {
  specialist: string;
  date: Date | undefined;
  timeSlot: string;
  mode: "in-person" | "teleconsultation";
}

interface AppointmentFormProps {
  data: AppointmentData;
  suggestedSpecialist: string;
  onChange: (data: AppointmentData) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const AppointmentForm = ({ data, suggestedSpecialist, onChange, onSubmit, onBack }: AppointmentFormProps) => {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="healthcare-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t("bookAppointment")}</h2>
            <p className="text-sm text-muted-foreground">{t("chooseSchedule")}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-accent/50 border border-primary/10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Stethoscope className="w-4 h-4" />
            {t("recommendedSpec")}
          </div>
          <p className="font-semibold text-foreground text-lg">{suggestedSpecialist}</p>
        </div>

        <div className="space-y-3 mb-6">
          <Label className="text-sm font-medium">{t("preferredDate")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 rounded-xl justify-start text-left text-base",
                  !data.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.date ? format(data.date, "PPP") : t("selectDate")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.date}
                onSelect={(d) => onChange({ ...data, date: d })}
                disabled={(d) => d < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-3 mb-6">
          <Label className="text-sm font-medium">{t("availableSlots")}</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => onChange({ ...data, timeSlot: slot })}
                className={`time-slot ${
                  data.timeSlot === slot ? "time-slot-selected" : "time-slot-unselected"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">{t("consultationMode")}</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onChange({ ...data, mode: "in-person" })}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                data.mode === "in-person"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Building2 className={`w-5 h-5 ${data.mode === "in-person" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <p className={`font-medium ${data.mode === "in-person" ? "text-primary" : "text-foreground"}`}>{t("inPerson")}</p>
                <p className="text-xs text-muted-foreground">{t("visitClinic")}</p>
              </div>
            </button>
            <button
              onClick={() => onChange({ ...data, mode: "teleconsultation" })}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                data.mode === "teleconsultation"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Video className={`w-5 h-5 ${data.mode === "teleconsultation" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <p className={`font-medium ${data.mode === "teleconsultation" ? "text-primary" : "text-foreground"}`}>{t("teleconsultation")}</p>
                <p className="text-xs text-muted-foreground">{t("videoCall")}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="h-12 px-6 rounded-xl gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("back")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!data.date || !data.timeSlot || isSubmitting}
          className="h-12 px-8 rounded-xl text-base font-semibold"
        >
          {isSubmitting ? t("booking") : t("confirmAppointment")}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentForm;
