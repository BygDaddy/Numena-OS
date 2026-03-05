import { TopBar } from "@/components/topbar";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { getMonthBookings, getProperties } from "@/lib/queries";

export const revalidate = 30

export default async function CalendarPage() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const [bookings, properties] = await Promise.all([
    getMonthBookings(year, month),
    getProperties(),
  ])

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <TopBar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">Live Calendar</h1>
            <p className="text-sm text-black/40 mt-1">Bookings, check-ins & availability</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white border border-black/[0.07] px-3 py-2 rounded-lg">
            <span className="text-black font-medium">
              {now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
        <CalendarGrid bookings={bookings} properties={properties} year={year} month={month} />
      </div>
    </div>
  )
}
