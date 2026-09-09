"use client";

interface Option {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ToggleGroup({ options, value, onChange, label }: ToggleGroupProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="flex gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-lg px-4 py-3 font-medium transition-all ${
              value === option.value
                ? "bg-brand-blue text-white shadow-md"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
