"use client";

import { formatCOP } from "@/lib/format";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export function CurrencyInput({ value, onChange, label, placeholder, required }: CurrencyInputProps) {
  const numValue = value ? parseInt(value) : 0;
  const displayValue = numValue > 0 ? formatCOP(numValue) : "";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          placeholder={placeholder || "0"}
        />
        {displayValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">
            {displayValue}
          </div>
        )}
      </div>
    </div>
  );
}
