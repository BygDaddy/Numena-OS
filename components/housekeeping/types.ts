export type CleanType = "Departure Clean" | "Stayover Clean" | "Deep Clean" | "Pre-Arrival Clean";
export type CleanStatus = "Scheduled" | "In Progress" | "Completed";

export interface CleanTask {
  id: string;
  property: string;
  propertyColor: string;
  guestName: string;
  cleanType: CleanType;
  status: CleanStatus;
  assignedTeam: string;
  scheduledAt: string;
  checkInAt?: string;
  notes?: string;
}
