"use client";

interface Step {
  id: number;
  label: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                idx + 1 <= currentStep
                  ? "bg-brand-blue text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full ${
                  idx + 1 < currentStep ? "bg-brand-blue" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        Paso {currentStep} de {steps.length}: <span className="font-medium text-gray-900">{steps[currentStep - 1].label}</span>
      </div>
    </div>
  );
}
