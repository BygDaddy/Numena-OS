"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const STATUSES = ["Reported", "Scheduled", "Awaiting", "Resolved"] as const

export function StatusUpdater({ ticketId, currentStatus }: { ticketId: string; currentStatus: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(status: string) {
    setLoading(true)
    await fetch("/api/maintenance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ticketId, status }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex gap-1 flex-wrap pt-2 border-t border-black/[0.05]">
      {STATUSES.map(s => (
        <button key={s} onClick={() => updateStatus(s)} disabled={loading || s === currentStatus}
          className={`text-[10px] px-2 py-1 rounded-lg transition-colors ${
            s === currentStatus
              ? "bg-black text-white font-medium"
              : "bg-black/5 text-black/40 hover:bg-black/10"
          }`}>
          {s}
        </button>
      ))}
    </div>
  )
}
