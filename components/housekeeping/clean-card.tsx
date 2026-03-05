import { Clock, Users, CheckCircle, Loader, Calendar } from "lucide-react";
import { CleanTask, CleanStatus, CleanType } from "./types";

const statusConfig: Record<CleanStatus, { label: string; color: string; icon: React.ReactNode }> = {
  Scheduled: {
    label: "Scheduled",
    color: "bg-black/5 text-black/50",
    icon: <Calendar size={11} />,
  },
  "In Progress": {
    label: "In Progress",
    color: "bg-blue-50 text-blue-600",
    icon: <Loader size={11} className="animate-spin" />,
  },
  Completed: {
    label: "Completed",
    color: "bg-green-50 text-green-600",
    icon: <CheckCircle size={11} />,
  },
};

const cleanTypeColor: Record<CleanType, string> = {
  "Departure Clean": "bg-orange-50 text-orange-600 border-orange-200",
  "Stayover Clean": "bg-blue-50 text-blue-600 border-blue-200",
  "Deep Clean": "bg-purple-50 text-purple-600 border-purple-200",
  "Pre-Arrival Clean": "bg-green-50 text-green-600 border-green-200",
};

export function CleanCard({ task }: { task: CleanTask }) {
  const status = statusConfig[task.status];

  return (
    <div className={`bg-white border border-black/[0.07] rounded-xl p-4 space-y-3 ${
      task.status === "Completed" ? "opacity-60" : ""
    }`}>
      {/* Property + Type */}
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${task.propertyColor}`}>
          {task.property}
        </span>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${cleanTypeColor[task.cleanType]}`}>
          {task.cleanType}
        </span>
      </div>

      {/* Guest */}
      <div className="flex items-center gap-1.5 text-sm text-black/70">
        <Users size={13} className="text-black/30" />
        {task.guestName}
      </div>

      {/* Time */}
      <div className="flex items-center gap-1.5 text-xs text-black/40">
        <Clock size={11} />
        {task.scheduledAt}
        {task.checkInAt && (
          <span className="ml-1 text-orange-600 font-medium">· Check-in {task.checkInAt}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-black/[0.05]">
        <div className="flex items-center gap-1.5 text-xs text-black/40">
          <div className="w-5 h-5 rounded bg-black/8 flex items-center justify-center text-[10px] font-semibold text-black/50">
            {task.assignedTeam.split(" ")[1]}
          </div>
          {task.assignedTeam}
        </div>
        <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg ${status.color}`}>
          {status.icon}
          {status.label}
        </div>
      </div>
    </div>
  );
}
