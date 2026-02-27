import { useState, useRef, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const VoiceInput = ({ value, onChange }: VoiceInputProps) => {
  const { t, lang } = useI18n();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(t("voiceNotSupported"));
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === "ta" ? "ta-IN" : "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      onChange(value ? value + " " + transcript : transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, lang, value, onChange, t]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{t("voiceInput")}</Label>
        <button
          onClick={toggleListening}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            isListening
              ? "bg-destructive/10 text-destructive border border-destructive/30"
              : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>{t("listening")}</span>
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>{t("tapToSpeak")}</span>
            </>
          )}
        </button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("describeSymptoms")}
        className="min-h-[100px] rounded-xl text-base resize-none"
      />
    </div>
  );
};

export default VoiceInput;
