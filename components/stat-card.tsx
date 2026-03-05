interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  progress?: number;
  progressColor?: string;
  badge?: string;
  badgeColor?: string;
  detail?: string;
  issues?: string[];
}

export function StatCard({
  icon, label, value, trend, trendUp, subtitle, progress,
  progressColor = "bg-yellow-400", badge, badgeColor, detail, issues,
}: StatCardProps) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        {icon}
        {trend && (
          <span className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-500"}`}>
            {trend}
          </span>
        )}
        {badge && (
          <span className={`text-[10px] font-semibold tracking-wide ${badgeColor}`}>{badge}</span>
        )}
        {subtitle && <span className="text-[10px] text-black/30 uppercase tracking-wide">{subtitle}</span>}
      </div>

      <div>
        <p className="text-2xl font-semibold text-black">{value}</p>
        <p className="text-xs text-black/40 mt-0.5">{label}</p>
      </div>

      {progress !== undefined && (
        <div className="h-1 bg-black/8 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${progress}%` }} />
        </div>
      )}

      {detail && <p className="text-xs text-black/35">{detail}</p>}

      {issues && (
        <div className="space-y-1">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-black/50">
              <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-red-500" : "bg-yellow-500"}`}></span>
              {issue}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
