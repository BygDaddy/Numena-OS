"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export function EditBookingModal({ booking, onClose }: { booking: any; onClose: () => void }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const data = Object.fromEntries(form.entries())
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, ...data }),
    })
    router.refresh()
    onClose()
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm("Delete this booking?")) return
    await fetch("/api/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id }),
    })
    router.refresh()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
          <h2 className="text-base font-semibold text-black">Edit Booking</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5">
            <X size={16} className="text-black/40" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="text-xs font-medium text-black/50 block mb-1">Guest Name</label>
            <input name="guest_name" defaultValue={booking.guest_name}
              className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-black/50 block mb-1">Check-in</label>
              <input type="date" name="check_in" defaultValue={booking.check_in}
                className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-black/50 block mb-1">Check-out</label>
              <input type="date" name="check_out" defaultValue={booking.check_out}
                className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-black/50 block mb-1">Payment Status</label>
              <select name="payment_status" defaultValue={booking.payment_status}
                className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20">
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-black/50 block mb-1">Revenue (฿)</label>
              <input type="number" name="gross_revenue" defaultValue={booking.gross_revenue}
                className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20" />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={handleDelete}
              className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Delete
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
