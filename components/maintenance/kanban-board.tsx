"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TicketCard } from "./ticket-card"
import { useRouter } from "next/navigation"

const columns = [
  { status: "Reported",  label: "Reported",  dot: "bg-red-400",    badge: "TRIAGE",      badgeColor: "text-black/30" },
  { status: "Scheduled", label: "Scheduled", dot: "bg-blue-400",   badge: "ACTIVE",      badgeColor: "text-blue-500" },
  { status: "Awaiting",  label: "Awaiting",  dot: "bg-yellow-400", badge: "BLOCKED",     badgeColor: "text-yellow-600" },
  { status: "Resolved",  label: "Resolved",  dot: "bg-green-400",  badge: "COST LOGGED", badgeColor: "text-green-600" },
]

function SortableTicket({ ticket }: { ticket: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ticket.id })
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "opacity-40" : ""} {...attributes} {...listeners}>
      <TicketCard ticket={ticket} />
    </div>
  )
}

export function KanbanBoard({ tickets: initialTickets }: { tickets: any[] }) {
  const router = useRouter()
  const [tickets, setTickets] = useState(initialTickets)
  const [dragging, setDragging] = useState<any>(null)

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const ticketId = active.id as string
    const newStatus = over.id as string

    if (!columns.find(c => c.status === newStatus)) return

    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t))
    setDragging(null)

    await fetch("/api/maintenance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ticketId, status: newStatus }),
    })
    router.refresh()
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={e => setDragging(tickets.find(t => t.id === e.active.id))}
      onDragEnd={handleDragEnd}>
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

              <SortableContext items={colTickets.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div id={col.status} className="space-y-3 min-h-[100px] rounded-xl p-1 -m-1 transition-colors">
                  {colTickets.map((ticket) => (
                    <SortableTicket key={ticket.id} ticket={ticket} />
                  ))}
                  {colTickets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-black/[0.06] rounded-xl">
                      <p className="text-xs text-black/25">Drop here</p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          )
        })}
      </div>

      <DragOverlay>
        {dragging && (
          <div className="rotate-1 shadow-lg opacity-90">
            <TicketCard ticket={dragging} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
