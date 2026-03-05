-- ============================================
-- NUMENA OS — Seed Data
-- ============================================

-- PROPERTIES
INSERT INTO properties (name, owner_name, management_fee_percentage, status) VALUES
  ('Sacarat V1', 'Somchai Prasert', 15.00, 'Active'),
  ('Sacarat V2', 'Somchai Prasert', 15.00, 'Active'),
  ('Bophut Villa', 'James Whitfield', 20.00, 'Active');

-- VENDORS
INSERT INTO vendors (name, type, phone) VALUES
  ('Samui AirCon Pros', 'AirCon', '+66 77 000 111'),
  ('Island Electrical', 'Electrical', '+66 77 000 222'),
  ('Thai Pool Tech', 'Pool', '+66 77 000 333'),
  ('Koh Samui Plumbing', 'Plumbing', '+66 77 000 444'),
  ('Somchai (handyman)', 'Handyman', '+66 81 000 555');

-- BOOKINGS
INSERT INTO bookings (guest_name, property_id, check_in, check_out, payment_status, gross_revenue, platform, num_guests)
SELECT 'James & Lily Watson', id, '2026-03-05', '2026-03-09', 'Pending', 16200, 'Booking.com', 2
FROM properties WHERE name = 'Sacarat V1';

INSERT INTO bookings (guest_name, property_id, check_in, check_out, payment_status, gross_revenue, platform, num_guests)
SELECT 'Marco & Elena Kowalski', id, '2026-02-28', '2026-03-06', 'Paid', 46200, 'Airbnb', 4
FROM properties WHERE name = 'Sacarat V2';

INSERT INTO bookings (guest_name, property_id, check_in, check_out, payment_status, gross_revenue, platform, num_guests)
SELECT 'Sophie Delacroix', id, '2026-03-03', '2026-03-05', 'Paid', 18400, 'Direct', 1
FROM properties WHERE name = 'Sacarat V1';

-- MAINTENANCE
INSERT INTO maintenance (property_id, vendor_id, issue_title, description, severity, status, estimated_cost, vendor_status, opened_at)
SELECT p.id, v.id, 'Master Bedroom A/C Leaking', 'Reported 2h ago · Guest complaint', 'Critical', 'Reported', 3500, 'Unconfirmed', NOW()
FROM properties p, vendors v WHERE p.name = 'Sacarat V2' AND v.name = 'Samui AirCon Pros';

INSERT INTO maintenance (property_id, vendor_id, issue_title, description, severity, status, estimated_cost, vendor_status, opened_at)
SELECT p.id, v.id, 'Garden Path Lights Out (x3)', 'Reported yesterday · Staff walkthrough', 'Low', 'Reported', 800, 'Unconfirmed', NOW() - INTERVAL '1 day'
FROM properties p, vendors v WHERE p.name = 'Bophut Villa' AND v.name = 'Island Electrical';

INSERT INTO maintenance (property_id, vendor_id, issue_title, severity, status, estimated_cost, vendor_status, scheduled_at)
SELECT p.id, v.id, 'Pool Pump Low Pressure', 'Moderate', 'Scheduled', 2200, 'Confirmed', '2026-03-01 09:00:00'
FROM properties p, vendors v WHERE p.name = 'Sacarat V2' AND v.name = 'Thai Pool Tech';

INSERT INTO maintenance (property_id, vendor_id, issue_title, severity, status, estimated_cost, vendor_status, scheduled_at)
SELECT p.id, v.id, 'Hot Water Heater Failure', 'Critical', 'Scheduled', 4500, 'En Route', NOW() + INTERVAL '30 min'
FROM properties p, vendors v WHERE p.name = 'Sacarat V1' AND v.name = 'Koh Samui Plumbing';

INSERT INTO maintenance (property_id, vendor_id, issue_title, severity, status, estimated_cost, vendor_status, opened_at)
SELECT p.id, v.id, 'Roof Tiles Cracked (2 pcs)', 'Moderate', 'Awaiting', 1800, 'Waiting', '2026-02-20'
FROM properties p, vendors v WHERE p.name = 'Sacarat V1' AND v.name = 'Somchai (handyman)';

INSERT INTO maintenance (property_id, vendor_id, issue_title, severity, status, estimated_cost, logged_final_cost, vendor_status, resolved_at)
SELECT p.id, v.id, 'Bathroom Exhaust Fan Replaced', 'Moderate', 'Resolved', 2500, 2200, 'Completed', '2026-02-25'
FROM properties p, vendors v WHERE p.name = 'Sacarat V2' AND v.name = 'Island Electrical';

INSERT INTO maintenance (property_id, vendor_id, issue_title, severity, status, estimated_cost, logged_final_cost, vendor_status, resolved_at)
SELECT p.id, v.id, 'Front Gate Hinge Repair', 'Low', 'Resolved', 600, 500, 'Completed', '2026-02-26'
FROM properties p, vendors v WHERE p.name = 'Bophut Villa' AND v.name = 'Somchai (handyman)';

-- TASKS
INSERT INTO tasks (property_id, title, priority, status, assignee)
SELECT id, 'A/C Not Cooling — Master Bedroom', 'Urgent', 'To Do', 'M'
FROM properties WHERE name = 'Sacarat V2';

INSERT INTO tasks (property_id, title, priority, status, assignee)
SELECT id, 'Pre-Arrival Deep Clean', 'High', 'In Progress', 'HK'
FROM properties WHERE name = 'Sacarat V1';

INSERT INTO tasks (property_id, title, priority, status, assignee)
SELECT id, 'Pool pH Check', 'Normal', 'Scheduled', 'V'
FROM properties WHERE name = 'Sacarat V2';
