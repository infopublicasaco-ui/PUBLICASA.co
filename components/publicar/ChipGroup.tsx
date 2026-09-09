"use client";

interface ChipGroupProps {
  items: { key: string; label: string; icon?: string }[];
  selected: Record<string, boolean>;
  onChange: (key: string) => void;
  multiple?: boolean;
}

export function ChipGroup({ items, selected, onChange, multiple = true }: ChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onChange(item.key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected[item.key]
              ? "bg-brand-blue text-white"
              : "border border-gray-300 text-gray-700 hover:border-gray-400"
          }`}
        >
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
