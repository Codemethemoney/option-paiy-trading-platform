import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const calculateStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return (score / 5) * 100;
  };

  const strength = calculateStrength(password);

  return (
    <div className="space-y-2 mt-2">
      <Progress value={strength} className="h-2" />
      <p className="text-sm text-gray-500">
        Password strength: {strength < 40 ? "Weak" : strength < 80 ? "Medium" : "Strong"}
      </p>
    </div>
  );
};