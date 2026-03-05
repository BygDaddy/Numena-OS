"use client"

import { useState, useEffect } from "react"
import { X, BedDouble, Wrench, CheckSquare } from "lucide-react"
import { useRouter } from "next/navigation"

type Tab = "booking" | "maintenance" | "task"

export function NewActionModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("booking")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [properties, setProperties] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/properties").then(r => r.json()).then(setProperties)
  }, [])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = new FormData(e.currentTarget)
    const data = Object.fromEntries(form.entries())

    const endpoint = tab === "booking" ? "/api/bookings"
      : tab === "maintenance" ? "/api/maintenance"
      : "/api/tasks"

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.refresh()
      onClose()
    } else {
      const err = await res.json()
      setError(err.error ?? "Something went wrong")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
          <h2 className="text-base font-semibold text-black">New Action</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5">
            <X size={16} className="text-black/40" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-4">
          {([
            { key: "booking", label: "Booking", icon: BedDouble },
            { key: "maintenance", label: "Maintenance", icon: Wrench },
            { key: "task", label: "Task", icon: CheckSquare },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                tab === key ? "bg-black text-white" : "text-black/40 hover:bg-black/5"
              }`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-5 space-y-3">
          {tab === "booking" && (
            <>
              <Field label="Guest Name" name="guest_name" placeholder="John & Jane Smith" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Check-in" name="check_in" type="date" required />
                <Field label="Check-out" name="check_out" type="date" required />
              </div>
              <SelectField label="Property" name="property_id" required
                options={properties.map(p => ({ value: p.id, label: p.name }))} />
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Platform" name="platform"
                  options={[
                    { value: "Airbnb", label: "Airbnb" },
                    { value: "Booking.com", label: "Booking.com" },
                    { value: "Direct", label: "Direct" },
                  ]} />
                <SelectField label="Payment" name="payment_status"
                  options={[
                    { value: "Pending", label: "Pending" },
                    { value: "Paid", label: "Paid" },
                  ]} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Revenue (฿)" name="gross_revenue" type="number" placeholder="0" />
                <Field label="Guests" name="num_guests" type="number" placeholder="2" />
              </div>
            </>
          )}

          {tab === "maintenance" && (
            <>
              <Field label="Issue Title" name="issue_title" placeholder="A/C not cooling" required />
              <SelectField label="Property" name="property_id" required
                options={properties.map(p => ({ value: p.id, label: p.name }))} />
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Severity" name="severity"
                  options={[
                    { value: "Critical", label: "Critical" },
                    { value: "Moderate", label: "Moderate" },
                    { value: "Low", label: "Low" },
                  ]} />
                <Field label="Est. Cost (฿)" name="estimated_cost" type="number" placeholder="0" />
              </div>
              <Field label="Description" name="description" placeholder="Details about the issue..." />
            </>
          )}

          {tab === "task" && (
            <>
              <Field label="Task Title" name="title" placeholder="Pre-arrival deep clean" required />
              <SelectField label="Property" name="property_id" required
                options={properties.map(p => ({ value: p.id, label: p.name }))} />
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Priority" name="priority"
                  options={[
                    { value: "Urgent", label: "Urgent" },
                    { value: "High", label: "High" },
                    { value: "Normal", label: "Normal" },
                    { value: "Low", label: "Low" },
                  ]} />
                <Field label="Assignee" name="assignee" placeholder="Remek, HK..." />
              </div>
            </>
          )}

          {error && <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 mt-1">
            {loading ? "Saving..." : `Create ${tab === "booking" ? "Booking" : tab === "maintenance" ? "Ticket" : "Task"}`}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, type = "text", placeholder, required }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="text-xs font-medium text-black/50 block mb-1">{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required}
        className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black placeholder:text-black/25 outline-none focus:border-black/20 focus:bg-white transition-colors" />
    </div>
  )
}

function SelectField({ label, name, options, required }: {
  label: string; name: string; options: { value: string; label: string }[]; required?: boolean
}) {
  return (
    <div>
      <label className="text-xs font-medium text-black/50 block mb-1">{label}</label>
      <select name={name} required={required}
        className="w-full bg-black/[0.03] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-black/20 focus:bg-white transition-colors">
        <option value="">Select...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
