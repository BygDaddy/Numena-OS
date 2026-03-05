import { Clock, Truck, Package, CheckCircle, Calendar, Home, Receipt } from "lucide-react";

const priorityStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-600 border-red-200",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low:      "bg-green-100 text-green-700 border-green-200",
}

const vendorStatusStyles: Record<string, { text: string; dot: string }> = {
  Unconfirmed: { text: "text-black/35", dot: "bg-black/20" },
  Confirmed:   { text: "text-green-600", dot: "bg-green-500" },
  "En Route":  { text: "text-blue-600",  dot: "bg-blue-500" },
  Waiting:     { text: "text-yellow-600", dot: "bg-yellow-500" },
  Completed:   { text: "text-green-600", dot: "bg-green-500" },
}

export function TicketCard({ ticket }: { ticket: any }) {
  const priority = ticket.severity
  const vendorName = ticket.vendors?.name ?? ticket.vendor_name
  const propertyName = ticket.properties?.name ?? ''
  const vs = vendorStatusStyles[ticket.vendor_status] ?? vendorStatusStyles.Unconfirmed

  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4 space-y-3">
      {/* Property + Priority */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Home size={11} className="text-black/30" />
          <span className="text-[11px] font-medium text-black/60">{propertyName}</span>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyles[priority] ?? priorityStyles.Low}`}>
          {priority?.toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-black leading-snug">{ticket.issue_title}</p>

      {/* Description */}
      {ticket.description && (
        <div className="flex items-center gap-1.5 text-[11px] text-black/40">
          <Clock size={11} />
          {ticket.description}
        </div>
      )}

      {/* Scheduled */}
      {ticket.scheduled_at && ticket.status === 'Scheduled' && (
        <div className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg ${
          ticket.vendor_status === 'En Route' ? 'bg-blue-50 text-blue-600' : 'bg-black/5 text-black/50'
        }`}>
          {ticket.vendor_status === 'En Route' ? <Truck size={11} /> : <Calendar size={11} />}
          {ticket.vendor_status === 'En Route'
            ? 'Vendor en route — ETA 30 min'
            : new Date(ticket.scheduled_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          }
        </div>
      )}

      {/* Parts / Awaiting */}
      {ticket.status === 'Awaiting' && (
        <div className="flex items-center gap-1.5 text-[11px] bg-yellow-50 text-yellow-700 px-2.5 py-1.5 rounded-lg">
          <Package size={11} />
          Parts on order — ETA Mar 5
        </div>
      )}

      {/* Resolved */}
      {ticket.status === 'Resolved' && ticket.resolved_at && (
        <div className="flex items-center gap-1.5 text-[11px] text-green-600">
          <CheckCircle size={11} />
          Completed {new Date(ticket.resolved_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
        </div>
      )}

      {/* Vendor */}
      {vendorName && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[12px] text-black/60">
            <div className="w-5 h-5 rounded bg-black/8 flex items-center justify-center text-[9px]">⚡</div>
            {vendorName}
          </div>
          {ticket.vendor_status && (
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${vs.dot}`}></span>
              <span className={`text-[11px] ${vs.text}`}>{ticket.vendor_status}</span>
            </div>
          )}
        </div>
      )}

      {/* Cost */}
      <div className="flex items-center justify-between pt-1 border-t border-black/[0.05]">
        {ticket.status === 'Resolved' ? (
          <>
            <span className="text-sm font-semibold text-green-600">
              Logged: ฿{Number(ticket.logged_final_cost).toLocaleString()}
            </span>
            <button className="flex items-center gap-1 text-[11px] text-black/35 hover:text-black/60">
              <Receipt size={11} /> Receipt
            </button>
          </>
        ) : (
          <>
            <span className="text-sm font-medium text-black/60">
              Est: ฿{Number(ticket.estimated_cost).toLocaleString()}
            </span>
            {ticket.opened_at && ticket.status === 'Awaiting' && (
              <span className="text-[11px] text-black/30">
                Opened {new Date(ticket.opened_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
              </span>
            )}
            {ticket.status === 'Reported' && (
              <button className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-black/80">
                Assign & Schedule
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
