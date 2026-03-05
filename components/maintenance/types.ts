export type Priority = "CRITICAL" | "MODERATE" | "LOW";
export type TicketStatus = "Reported" | "Scheduled" | "Awaiting" | "Resolved";
export type VendorStatus = "Unconfirmed" | "Confirmed" | "En Route" | "Waiting" | "Completed";

export interface Ticket {
  id: string;
  property: string;
  propertyColor: string;
  priority: Priority;
  status: TicketStatus;
  title: string;
  description?: string;
  vendor?: string;
  vendorStatus?: VendorStatus;
  estimatedCost?: number;
  loggedCost?: number;
  scheduledAt?: string;
  partsInfo?: string;
  openedAt?: string;
  completedAt?: string;
  timeOnSite?: string;
  hasReceipt?: boolean;
}
