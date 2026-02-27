import { useI18n, type Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { lang, setLang, t } = useI18n();

  const toggle = () => {
    setLang(lang === "en" ? "ta" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-muted-foreground" />
      <span>{lang === "en" ? t("tamil") : t("english")}</span>
    </button>
  );
};

export default LanguageToggle;
