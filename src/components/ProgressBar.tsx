import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "step-indicator-active"
                      : isActive
                      ? "step-indicator-active shadow-lg shadow-primary/30"
                      : "step-indicator-inactive"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                <span
                  className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 -mt-5 mx-2 rounded-full transition-colors duration-300 ${
                    currentStep > stepNum + 1
                      ? "bg-primary"
                      : currentStep > stepNum
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
