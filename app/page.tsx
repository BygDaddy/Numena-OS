import { TopBar } from "@/components/topbar";
import { StatCard } from "@/components/stat-card";
import { TodaysMovements } from "@/components/todays-movements";
import { LiveRadar } from "@/components/live-radar";
import { BedDouble, Users, ArrowLeftRight, AlertTriangle } from "lucide-react";
import { getDashboardStats, getTodaysBookings, getLiveTasks } from "@/lib/queries";

export const revalidate = 30

export default async function DashboardPage() {
  const [stats, todaysBookings, liveTasks] = await Promise.all([
    getDashboardStats(),
    getTodaysBookings(),
    getLiveTasks(),
  ])

  const today = new Date().toISOString().split('T')[0]
  const checkIns  = todaysBookings.filter((b: any) => b.check_in === today)
  const checkOuts = todaysBookings.filter((b: any) => b.check_out === today)

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-black">Operation Center</h1>
            <span className="flex items-center gap-1.5 text-xs bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              LIVE
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white border border-black/[0.07] px-3 py-2 rounded-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-black/60">All Properties</span>
            <span className="text-black/30 ml-1">Global View</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={<BedDouble size={20} className="text-black/30" />}
            label="Today's Occupancy"
            value={`${stats.occupancy}%`}
            progress={stats.occupancy}
          />
          <StatCard
            icon={<Users size={20} className="text-black/30" />}
            label="Active Guests"
            value={String(stats.activeGuests)}
            subtitle={`Across ${stats.activeBookings.length} bookings`}
            progress={Math.min(stats.activeGuests * 10, 100)}
            progressColor="bg-blue-400"
          />
          <StatCard
            icon={<ArrowLeftRight size={20} className="text-black/30" />}
            label="Check-ins & Check-outs"
            value={`${checkIns.length} in / ${checkOuts.length} out`}
            badge="TODAY"
            badgeColor="text-yellow-600"
            detail={[
              ...checkIns.map((b: any) => `→ ${b.guest_name}`),
              ...checkOuts.map((b: any) => `← ${b.guest_name}`),
            ].join(' · ') || 'No movements today'}
          />
          <StatCard
            icon={<AlertTriangle size={20} className="text-black/30" />}
            label="Critical Issues"
            value={String(stats.criticalIssues.length)}
            badge={stats.criticalIssues.length > 0 ? "NEEDS ACTION" : "ALL CLEAR"}
            badgeColor={stats.criticalIssues.length > 0 ? "text-red-500" : "text-green-600"}
            issues={stats.criticalIssues.slice(0, 2).map((i: any) => i.issue_title)}
          />
        </div>

        {/* Bottom split */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <TodaysMovements bookings={todaysBookings} />
          </div>
          <div>
            <LiveRadar tasks={liveTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
