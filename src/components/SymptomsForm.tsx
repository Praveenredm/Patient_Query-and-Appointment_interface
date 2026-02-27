import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  MapPin,
  Stethoscope,
  Gauge,
  ShieldAlert,
} from "lucide-react";
import { SYMPTOMS, DURATIONS, analyzeSymptoms, type SymptomAnalysis } from "@/lib/symptom-data";
import { useI18n, SYMPTOM_KEY_MAP, DURATION_KEY_MAP } from "@/lib/i18n";
import VoiceInput from "./VoiceInput";

export interface SymptomsData {
  symptoms: string[];
  severity: number;
  duration: string;
  description: string;
}

interface SymptomsFormProps {
  data: SymptomsData;
  onChange: (data: SymptomsData) => void;
  onNext: () => void;
  onBack: () => void;
  onEmergency: (isEmergency: boolean) => void;
}

const SymptomsForm = ({ data, onChange, onNext, onBack, onEmergency }: SymptomsFormProps) => {
  const { t } = useI18n();
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);

  useEffect(() => {
    if (data.symptoms.length > 0) {
      const result = analyzeSymptoms(data.symptoms, data.severity);
      setAnalysis(result);
      onEmergency(result.isEmergency);
    } else {
      setAnalysis(null);
      onEmergency(false);
    }
  }, [data.symptoms, data.severity]);

  const toggleSymptom = (symptom: string) => {
    const updated = data.symptoms.includes(symptom)
      ? data.symptoms.filter((s) => s !== symptom)
      : [...data.symptoms, symptom];
    onChange({ ...data, symptoms: updated });
  };

  const urgencyColor = (level: string) => {
    switch (level) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Emergency Banner */}
      {analysis?.isEmergency && (
        <div className="emergency-banner flex items-start gap-3 animate-in fade-in duration-300">
          <AlertTriangle className="w-6 h-6 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg">{t("emergencyAlert")}</h3>
            <p className="text-sm mt-1">{t("emergencyText")}</p>
            <div className="flex items-center gap-2 mt-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>{analysis.nearestHospital}</span>
            </div>
            <p className="text-xs mt-2 opacity-75">{t("emergencyDisabled")}</p>
          </div>
        </div>
      )}

      <div className="healthcare-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t("symptomsTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("symptomsSubtitle")}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {SYMPTOMS.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`symptom-chip ${
                data.symptoms.includes(symptom) ? "symptom-chip-selected" : "symptom-chip-unselected"
              }`}
            >
              {t(SYMPTOM_KEY_MAP[symptom])}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              {t("severityLevel")}: <span className="text-primary font-bold">{data.severity}/5</span>
            </Label>
            <Slider
              value={[data.severity]}
              onValueChange={([v]) => onChange({ ...data, severity: v })}
              min={1}
              max={5}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("mild")}</span>
              <span>{t("moderate")}</span>
              <span>{t("severe")}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">{t("duration")}</Label>
            <Select value={data.duration} onValueChange={(v) => onChange({ ...data, duration: v })}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder={t("durationPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d} value={d}>{t(DURATION_KEY_MAP[d])}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Voice Input */}
        <VoiceInput
          value={data.description}
          onChange={(v) => onChange({ ...data, description: v })}
        />
      </div>

      {/* Symptom Intelligence Panel */}
      {analysis && !analysis.isEmergency && (
        <div className="healthcare-card border-primary/20 bg-accent/30 animate-in fade-in duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{t("symptomIntelligence")}</h3>
              <p className="text-xs text-muted-foreground">{t("aiAssessment")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{t("possibleCategory")}</p>
              <p className="font-semibold text-foreground">{analysis.category}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{t("urgencyLevel")}</p>
              <p className={`font-semibold ${urgencyColor(analysis.urgency)}`}>
                {analysis.urgency}
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{t("recommendedSpecialist")}</p>
              <div className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-primary" />
                <p className="font-semibold text-foreground">{analysis.specialist}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="h-12 px-6 rounded-xl gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("back")}
        </Button>
        <Button
          onClick={onNext}
          disabled={data.symptoms.length === 0 || analysis?.isEmergency}
          className="h-12 px-8 rounded-xl text-base font-semibold gap-2"
        >
          {t("continue")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SymptomsForm;
