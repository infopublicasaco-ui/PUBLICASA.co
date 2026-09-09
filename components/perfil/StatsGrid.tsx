import { getStatColor } from "@/lib/colors";

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const color = getStatColor(idx);
        return (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <p className={`mt-2 text-2xl font-bold ${color.text}`}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
