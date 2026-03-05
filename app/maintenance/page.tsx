import { TopBar } from "@/components/topbar";
import { KanbanBoard } from "@/components/maintenance/kanban-board";
import { getMaintenanceTickets } from "@/lib/queries";
import { Filter, ChevronDown } from "lucide-react";

export const revalidate = 30

export default async function MaintenancePage() {
  const tickets = await getMaintenanceTickets()
  const critical = tickets.filter((t: any) => t.severity === 'Critical' && t.status !== 'Resolved')
  const resolvedCost = tickets
    .filter((t: any) => t.status === 'Resolved' && t.logged_final_cost)
    .reduce((sum: number, t: any) => sum + Number(t.logged_final_cost), 0)

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-black">Maintenance</h1>
              {critical.length > 0 && (
                <span className="text-xs bg-red-100 text-red-600 border border-red-200 px-2.5 py-1 rounded-full font-medium">
                  {critical.length} critical
                </span>
              )}
            </div>
            <p className="text-sm text-black/40 mt-1">Issue tracker — repairs, vendors & costs</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm bg-white border border-black/[0.07] px-3 py-2 rounded-lg hover:bg-black/5">
              <Filter size={13} className="text-black/40" />
              All Vendors
              <ChevronDown size={12} className="text-black/30" />
            </button>
            {resolvedCost > 0 && (
              <div className="text-sm bg-white border border-black/[0.07] px-3 py-2 rounded-lg">
                <span className="text-black/40">Logged spend </span>
                <span className="font-semibold text-black">฿{resolvedCost.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
        <KanbanBoard tickets={tickets} />
      </div>
    </div>
  );
}
