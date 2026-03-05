import { supabase } from './supabase'

export async function getMaintenanceTickets() {
  const { data, error } = await supabase
    .from('maintenance')
    .select(`
      *,
      properties(name),
      vendors(name)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getTodaysBookings() {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, properties(name)`)
    .or(`check_in.eq.${today},check_out.eq.${today}`)
    .order('check_in')

  if (error) throw error
  return data
}

export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, properties(name)`)
    .order('check_in', { ascending: false })

  if (error) throw error
  return data
}

export async function getLiveTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select(`*, properties(name)`)
    .neq('status', 'Done')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getHousekeepingTasks() {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('housekeeping')
    .select(`*, properties(name), bookings(guest_name, check_in, check_out)`)
    .order('scheduled_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'Active')

  if (error) throw error
  return data
}

export async function getDashboardStats() {
  const today = new Date().toISOString().split('T')[0]

  const [properties, bookings, tasks, maintenance] = await Promise.all([
    supabase.from('properties').select('id').eq('status', 'Active'),
    supabase.from('bookings').select('*, properties(name)')
      .lte('check_in', today)
      .gte('check_out', today),
    supabase.from('tasks').select('*').neq('status', 'Done'),
    supabase.from('maintenance').select('*').eq('severity', 'Critical').neq('status', 'Resolved'),
  ])

  return {
    occupancy: bookings.data?.length && properties.data?.length
      ? Math.round((bookings.data.length / properties.data.length) * 100)
      : 0,
    activeGuests: bookings.data?.reduce((sum, b) => sum + (b.num_guests || 0), 0) ?? 0,
    activeBookings: bookings.data ?? [],
    openTasks: tasks.data ?? [],
    criticalIssues: maintenance.data ?? [],
  }
}
