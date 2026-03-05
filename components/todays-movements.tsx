"use client"

import { MessageCircle, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { EditBookingModal } from "./modals/edit-booking-modal"

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function getStatusStyle(checkIn: string, checkOut: string) {
  const today = new Date().toISOString().split('T')[0]
  if (checkIn === today) return { label: 'Awaiting Arrival', color: 'text-black/50 bg-black/5' }
  if (checkOut === today) return { label: 'Departing Today', color: 'text-yellow-700 bg-yellow-50' }
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (checkOut === yesterday) return { label: 'Checked Out', color: 'text-black/30 bg-black/5' }
  return { label: 'In Stay', color: 'text-blue-600 bg-blue-50' }
}

export function TodaysMovements({ bookings }: { bookings: any[] }) {
  const [editing, setEditing] = useState<any>(null)

  return (
    <>
      <div className="bg-white border border-black/[0.07] rounded-xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-black">Today's Movements</h2>
            <p className="text-xs text-black/40 mt-0.5">Check-ins, check-outs & payment status</p>
          </div>
          <div className="flex gap-1">
            {["All", "Arrivals", "Departures"].map((tab) => (
              <button key={tab} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                tab === "All" ? "bg-black/8 text-black font-medium" : "text-black/40 hover:text-black/60"
              }`}>{tab}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 text-[10px] text-black/30 uppercase tracking-wide px-2 pb-2 border-b border-black/[0.07]">
          <span>Guest</span><span>Villa</span><span>Status</span><span>Payment</span><span>Actions</span>
        </div>

        <div className="divide-y divide-black/[0.05]">
          {bookings.length === 0 && (
            <p className="text-sm text-black/30 text-center py-8">No movements today</p>
          )}
          {bookings.map((b: any) => {
            const status = getStatusStyle(b.check_in, b.check_out)
            return (
              <div key={b.id} className="grid grid-cols-5 items-center py-3 px-2 hover:bg-black/[0.01] cursor-pointer rounded-lg"
                onClick={() => setEditing(b)}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black/8 flex items-center justify-center text-xs font-semibold text-black/60">
                    {getInitials(b.guest_name)}
                  </div>
                  <div>
                    <p className="text-sm text-black font-medium leading-tight">{b.guest_name}</p>
                    <p className="text-[11px] text-black/35">{b.platform} · {b.num_guests}g</p>
                  </div>
                </div>
                <span className="text-sm text-black/60">{b.properties?.name}</span>
                <span className={`text-xs px-2 py-1 rounded-lg w-fit ${status.color}`}>{status.label}</span>
                <div>
                  <p className={`text-xs font-medium ${b.payment_status === 'Paid' ? 'text-green-600' : b.payment_status === 'Pending' ? 'text-yellow-600' : 'text-red-500'}`}>
                    {b.payment_status === 'Paid' ? '100% Paid' : b.payment_status === 'Pending' ? 'Deposit Pending' : 'Cancelled'}
                  </p>
                  <p className="text-[11px] text-black/35">฿{Number(b.gross_revenue).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <button className="p-1.5 rounded-lg bg-black/5 hover:bg-black/10">
                    <MessageCircle size={13} className="text-black/40" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-black/5 hover:bg-black/10" onClick={() => setEditing(b)}>
                    <MoreHorizontal size={13} className="text-black/40" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {editing && <EditBookingModal booking={editing} onClose={() => setEditing(null)} />}
    </>
  )
}
