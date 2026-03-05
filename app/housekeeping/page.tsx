import { TopBar } from "@/components/topbar";
import { CleanCard } from "@/components/housekeeping/clean-card";
import { getHousekeepingTasks } from "@/lib/queries";

const sections = [
  { status: "In Progress", label: "In Progress", dot: "bg-blue-400" },
  { status: "Scheduled",   label: "Scheduled",   dot: "bg-black/20" },
  { status: "Completed",   label: "Completed",   dot: "bg-green-400" },
]

export const revalidate = 30

export default async function HousekeepingPage() {
  const tasks = await getHousekeepingTasks()

  const byStatus: Record<string, any[]> = {
    "In Progress": tasks.filter((t: any) => t.status === "In Progress"),
    "Scheduled":   tasks.filter((t: any) => t.status === "Scheduled"),
    "Completed":   tasks.filter((t: any) => t.status === "Completed"),
  }

  const inProgressCount = byStatus["In Progress"].length

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-black">Housekeeping</h1>
              {inProgressCount > 0 && (
                <span className="text-xs bg-blue-100 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full font-medium">
                  {inProgressCount} active
                </span>
              )}
            </div>
            <p className="text-sm text-black/40 mt-1">Turnovers, cleans & team assignments</p>
          </div>
          <div className="flex items-center gap-2">
            {["Today", "Tomorrow", "All"].map((tab) => (
              <button key={tab} className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                tab === "Today"
                  ? "bg-black text-white font-medium"
                  : "bg-white border border-black/[0.07] text-black/50 hover:text-black/70"
              }`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {sections.map(({ status, label, dot }) => (
            <div key={status} className="bg-white border border-black/[0.07] rounded-xl px-4 py-3 flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`}></span>
              <span className="text-sm text-black/50">{label}</span>
              <span className="ml-auto text-xl font-semibold text-black">{byStatus[status].length}</span>
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map(({ status, label, dot }) => {
          const sectionTasks = byStatus[status]
          if (sectionTasks.length === 0) return null
          return (
            <div key={status} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                <h2 className="text-sm font-semibold text-black">{label}</h2>
                <span className="text-xs text-black/30">{sectionTasks.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {sectionTasks.map((task: any) => (
                  <CleanCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )
        })}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-2xl mb-2">✨</p>
            <p className="text-sm text-black/30">No cleans scheduled today</p>
          </div>
        )}
      </div>
    </div>
  )
}
