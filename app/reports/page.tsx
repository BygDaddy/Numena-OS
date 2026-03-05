import { TopBar } from "@/components/topbar";
import { getOwnerReport, getProperties } from "@/lib/queries";
import { TrendingUp, Home, DollarSign, Calendar } from "lucide-react";

export const revalidate = 30

export default async function ReportsPage() {
  const [bookings, properties] = await Promise.all([
    getOwnerReport(),
    getProperties(),
  ])

  // Group by property
  const byProperty: Record<string, { property: any; bookings: any[]; revenue: number; nights: number }> = {}

  bookings.forEach((b: any) => {
    const pid = b.property_id
    if (!byProperty[pid]) {
      byProperty[pid] = { property: b.properties, bookings: [], revenue: 0, nights: 0 }
    }
    byProperty[pid].bookings.push(b)
    byProperty[pid].revenue += Number(b.gross_revenue)
    const nights = Math.ceil((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000)
    byProperty[pid].nights += nights
  })

  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + Number(b.gross_revenue), 0)

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">Owner Reports</h1>
            <p className="text-sm text-black/40 mt-1">Revenue, occupancy & payouts per property</p>
          </div>
          <div className="text-sm bg-white border border-black/[0.07] px-3 py-2 rounded-lg">
            <span className="text-black/40">All time · </span>
            <span className="font-semibold text-black">฿{totalRevenue.toLocaleString()} total</span>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-black/[0.07] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-black/30" />
              <span className="text-xs text-black/40 uppercase tracking-wide">Total Revenue</span>
            </div>
            <p className="text-2xl font-semibold text-black">฿{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-black/[0.07] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-black/30" />
              <span className="text-xs text-black/40 uppercase tracking-wide">Total Bookings</span>
            </div>
            <p className="text-2xl font-semibold text-black">{bookings.length}</p>
          </div>
          <div className="bg-white border border-black/[0.07] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-black/30" />
              <span className="text-xs text-black/40 uppercase tracking-wide">Properties</span>
            </div>
            <p className="text-2xl font-semibold text-black">{properties.length}</p>
          </div>
        </div>

        {/* Per property breakdown */}
        <div className="space-y-4">
          {Object.values(byProperty).map(({ property, bookings: pBookings, revenue, nights }) => {
            const fee = property?.management_fee_percentage ?? 0
            const mgmtFee = revenue * (fee / 100)
            const ownerPayout = revenue - mgmtFee

            return (
              <div key={property?.name} className="bg-white border border-black/[0.07] rounded-xl p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-semibold text-black">{property?.name}</h2>
                    <p className="text-xs text-black/40">Owner: {property?.owner_name} · {fee}% management fee</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-green-600">฿{ownerPayout.toLocaleString()}</p>
                    <p className="text-xs text-black/30">Owner payout</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Gross Revenue", value: `฿${revenue.toLocaleString()}` },
                    { label: "Mgmt Fee", value: `฿${mgmtFee.toLocaleString()}` },
                    { label: "Bookings", value: pBookings.length },
                    { label: "Nights Sold", value: nights },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-black/[0.02] rounded-lg px-3 py-2">
                      <p className="text-[10px] text-black/30 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-semibold text-black mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Bookings table */}
                <div className="border border-black/[0.07] rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 text-[10px] text-black/30 uppercase tracking-wide px-3 py-2 bg-black/[0.02] border-b border-black/[0.05]">
                    <span>Guest</span><span>Check-in</span><span>Check-out</span><span>Platform</span><span className="text-right">Revenue</span>
                  </div>
                  {pBookings.map((b: any) => (
                    <div key={b.id} className="grid grid-cols-5 px-3 py-2.5 border-b border-black/[0.04] last:border-0 text-sm">
                      <span className="text-black font-medium truncate">{b.guest_name}</span>
                      <span className="text-black/50">{new Date(b.check_in).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      <span className="text-black/50">{new Date(b.check_out).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      <span className="text-black/40 text-xs">{b.platform}</span>
                      <span className="text-right font-medium text-black">฿{Number(b.gross_revenue).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {Object.keys(byProperty).length === 0 && (
            <div className="bg-white border border-black/[0.07] rounded-xl p-12 text-center">
              <TrendingUp size={32} className="text-black/15 mx-auto mb-3" />
              <p className="text-sm text-black/30">No paid bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
