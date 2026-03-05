const COLORS = [
  "bg-blue-200 text-blue-800",
  "bg-purple-200 text-purple-800",
  "bg-green-200 text-green-800",
  "bg-orange-200 text-orange-800",
  "bg-pink-200 text-pink-800",
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month - 1, 1).getDay()
  return day === 0 ? 6 : day - 1 // Mon=0
}

export function CalendarGrid({ bookings, properties, year, month }: {
  bookings: any[]
  properties: any[]
  year: number
  month: number
}) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  // Map property id → color index
  const propColorMap: Record<string, number> = {}
  properties.forEach((p, i) => { propColorMap[p.id] = i % COLORS.length })

  // For each day, find bookings active on that day
  function getBookingsForDay(day: number) {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookings.filter(b => b.check_in <= date && b.check_out > date)
  }

  const emptyCells: (number | null)[] = Array.from({ length: firstDay }, () => null)
  const dayCells: (number | null)[] = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const cells: (number | null)[] = [...emptyCells, ...dayCells]

  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-white border border-black/[0.07] rounded-xl overflow-hidden">
      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-black/[0.07]">
        {properties.map((p, i) => (
          <div key={p.id} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${COLORS[i % COLORS.length].split(' ')[0]}`}></span>
            <span className="text-xs text-black/50">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-black/[0.07]">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-black/30 py-2">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const isToday = day === today && month === currentMonth && year === currentYear
          const dayBookings = day ? getBookingsForDay(day) : []

          return (
            <div key={i} className={`min-h-[90px] p-2 border-r border-b border-black/[0.04] ${
              !day ? 'bg-black/[0.01]' : 'hover:bg-black/[0.01]'
            }`}>
              {day && (
                <>
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-medium rounded-full mb-1 ${
                    isToday ? 'bg-black text-white' : 'text-black/50'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayBookings.map((b: any) => {
                      const colorIdx = propColorMap[b.property_id] ?? 0
                      const isCheckIn = b.check_in === `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
                      const isCheckOut = b.check_out === `${year}-${String(month).padStart(2,'0')}-${String(day + 1).padStart(2,'0')}`
                      return (
                        <div key={b.id} className={`text-[10px] px-1.5 py-0.5 rounded truncate ${COLORS[colorIdx]}`}>
                          {isCheckIn ? '→ ' : ''}{b.guest_name.split(' ')[0]}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
