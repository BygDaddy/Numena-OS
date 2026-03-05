import { TopBar } from "@/components/topbar";
import { CleanCard } from "@/components/housekeeping/clean-card";
import { cleanTasks } from "@/components/housekeeping/data";
import { CleanStatus } from "@/components/housekeeping/types";

const sections: { status: CleanStatus; label: string; dot: string }[] = [
  { status: "In Progress", label: "In Progress", dot: "bg-blue-400" },
  { status: "Scheduled",   label: "Scheduled",   dot: "bg-black/20" },
  { status: "Completed",   label: "Completed",   dot: "bg-green-400" },
];

export default function HousekeepingPage() {
  const inProgress = cleanTasks.filter((t) => t.status === "In Progress");
  const scheduled  = cleanTasks.filter((t) => t.status === "Scheduled");
  const completed  = cleanTasks.filter((t) => t.status === "Completed");
  const byStatus   = { "In Progress": inProgress, Scheduled: scheduled, Completed: completed };

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-black">Housekeeping</h1>
              <span className="text-xs bg-blue-100 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full font-medium">
                {inProgress.length} active
              </span>
            </div>
            <p className="text-sm text-black/40 mt-1">Turnovers, cleans & team assignments</p>
          </div>
          <div className="flex items-center gap-2">
            {["Today", "Tomorrow", "All"].map((tab) => (
              <button
                key={tab}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  tab === "Today"
                    ? "bg-black text-white font-medium"
                    : "bg-white border border-black/[0.07] text-black/50 hover:text-black/70"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {sections.map(({ status, label, dot }) => (
            <div key={status} className="bg-white border border-black/[0.07] rounded-xl px-4 py-3 flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`}></span>
              <span className="text-sm text-black/50">{label}</span>
              <span className="ml-auto text-xl font-semibold text-black">
                {byStatus[status].length}
              </span>
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map(({ status, label, dot }) => {
          const tasks = byStatus[status];
          if (tasks.length === 0) return null;
          return (
            <div key={status} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                <h2 className="text-sm font-semibold text-black">{label}</h2>
                <span className="text-xs text-black/30">{tasks.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <CleanCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
