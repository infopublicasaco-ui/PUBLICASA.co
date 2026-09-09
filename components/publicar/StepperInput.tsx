"use client";

interface StepperInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export function StepperInput({ value, onChange, label, min = 0, max, step = 1 }: StepperInputProps) {
  const numValue = value ? parseInt(value) : 0;

  const increment = () => {
    const newValue = numValue + step;
    if (max === undefined || newValue <= max) {
      onChange(String(newValue));
    }
  };

  const decrement = () => {
    const newValue = Math.max(min, numValue - step);
    onChange(String(newValue));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          className="rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-50"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm"
          min={min}
          max={max}
        />
        <button
          type="button"
          onClick={increment}
          className="rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
}
