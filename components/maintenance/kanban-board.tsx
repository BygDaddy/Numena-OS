import { TicketCard } from "./ticket-card";

const columns = [
  { status: "Reported",  label: "Reported",  dot: "bg-red-400",    badge: "TRIAGE",      badgeColor: "text-black/30" },
  { status: "Scheduled", label: "Scheduled", dot: "bg-blue-400",   badge: "ACTIVE",      badgeColor: "text-blue-500" },
  { status: "Awaiting",  label: "Awaiting",  dot: "bg-yellow-400", badge: "BLOCKED",     badgeColor: "text-yellow-600" },
  { status: "Resolved",  label: "Resolved",  dot: "bg-green-400",  badge: "COST LOGGED", badgeColor: "text-green-600" },
]

export function KanbanBoard({ tickets }: { tickets: any[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTickets = tickets.filter((t) => t.status === col.status)
        return (
          <div key={col.status} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot}`}></span>
                <span className="text-sm font-semibold text-black">{col.label}</span>
                <span className="text-xs bg-black/8 text-black/40 w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {colTickets.length}
                </span>
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${col.badgeColor}`}>{col.badge}</span>
            </div>
            <div className={`h-0.5 rounded-full ${col.dot} opacity-40`}></div>
            <div className="space-y-3">
              {colTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
              {colTickets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-xs text-black/25">No tickets</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
