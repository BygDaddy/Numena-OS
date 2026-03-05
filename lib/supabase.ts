import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  properties: {
    id: string
    name: string
    owner_name: string
    management_fee_percentage: number
    status: 'Active' | 'Inactive'
    created_at: string
  }
  bookings: {
    id: string
    guest_name: string
    property_id: string
    check_in: string
    check_out: string
    payment_status: 'Paid' | 'Pending' | 'Cancelled'
    gross_revenue: number
    platform: string
    num_guests: number
    notes: string
    created_at: string
  }
  housekeeping: {
    id: string
    booking_id: string
    property_id: string
    clean_type: 'Departure Clean' | 'Stayover Clean' | 'Deep Clean' | 'Pre-Arrival Clean'
    status: 'Scheduled' | 'In Progress' | 'Completed'
    assigned_team: string
    scheduled_at: string
    completed_at: string
    notes: string
    created_at: string
  }
  maintenance: {
    id: string
    property_id: string
    vendor_id: string
    issue_title: string
    description: string
    severity: 'Critical' | 'Moderate' | 'Low'
    status: 'Reported' | 'Scheduled' | 'Awaiting' | 'Resolved'
    estimated_cost: number
    logged_final_cost: number
    vendor_status: string
    scheduled_at: string
    resolved_at: string
    opened_at: string
    created_at: string
  }
  tasks: {
    id: string
    property_id: string
    title: string
    priority: 'Urgent' | 'High' | 'Normal' | 'Low'
    status: 'To Do' | 'In Progress' | 'Scheduled' | 'Done'
    assignee: string
    due_at: string
    created_at: string
  }
}
