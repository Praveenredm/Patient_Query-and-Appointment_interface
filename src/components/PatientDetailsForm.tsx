import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";

export interface PatientData {
  fullName: string;
  age: string;
  gender: string;
  location: string;
  contact: string;
}

interface PatientDetailsFormProps {
  data: PatientData;
  errors: Partial<Record<keyof PatientData, string>>;
  onChange: (field: keyof PatientData, value: string) => void;
  onNext: () => void;
}

const PatientDetailsForm = ({ data, errors, onChange, onNext }: PatientDetailsFormProps) => {
  return (
    <div className="healthcare-card max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Patient Details</h2>
          <p className="text-sm text-muted-foreground">Please provide your basic information</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              className={`h-12 rounded-xl text-base ${errors.fullName ? "border-destructive" : ""}`}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium">
              Age <span className="text-destructive">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              value={data.age}
              onChange={(e) => onChange("age", e.target.value)}
              className={`h-12 rounded-xl text-base ${errors.age ? "border-destructive" : ""}`}
            />
            {errors.age && (
              <p className="text-xs text-destructive">{errors.age}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Gender</Label>
            <Select value={data.gender} onValueChange={(v) => onChange("gender", v)}>
              <SelectTrigger className="h-12 rounded-xl text-base">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">Location</Label>
            <Input
              id="location"
              placeholder="City, State"
              value={data.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="h-12 rounded-xl text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-medium">
            Phone / Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact"
            placeholder="Enter phone number or email"
            value={data.contact}
            onChange={(e) => onChange("contact", e.target.value)}
            className={`h-12 rounded-xl text-base ${errors.contact ? "border-destructive" : ""}`}
          />
          {errors.contact && (
            <p className="text-xs text-destructive">{errors.contact}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} className="h-12 px-8 rounded-xl text-base font-semibold gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PatientDetailsForm;
