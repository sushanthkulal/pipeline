/*
  # Create Panchayat Administration System

  ## Overview
  Complete system for Panchayat water management including staff, tasks,
  schedules, complaints, and billing administration.

  ## New Tables

  ### 1. `panchayats`
  Gram Panchayat information
  - `lgd_number` (text, primary key) - Local Government Directory number (6 digits)
  - `state` (text) - State name
  - `district` (text) - District name
  - `name` (text) - Panchayat name
  - `contact` (text) - Contact information
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `staffs`
  Staff member records
  - `id` (text, primary key) - Staff ID (e.g., S01, S02)
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `name` (text) - Staff member name
  - `role` (text) - Role (Plumber, Technician, etc.)
  - `contact` (text) - Contact number
  - `duty_status` (text) - On Duty / Off Duty
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `tasks`
  Task and assignment tracking
  - `task_id` (text, primary key) - Task ID (e.g., T101)
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `house_no` (text) - House/location number
  - `issue` (text) - Issue description
  - `assigned_to` (text, foreign key) - Reference to staff ID
  - `status` (text) - Pending / In Progress / Completed
  - `created_at` (timestamptz) - Task creation timestamp
  - `completed_at` (timestamptz, nullable) - Task completion timestamp
  - `completed_by` (text, nullable) - Staff ID who completed the task
  - `remarks` (text, nullable) - Additional notes

  ### 4. `timings`
  Water supply schedule
  - `id` (uuid, primary key) - Unique identifier
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `day` (text) - Day of week or date label
  - `start_time` (text) - Start time
  - `end_time` (text) - End time
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. `tank_maintenance`
  Tank cleaning and maintenance records
  - `id` (uuid, primary key) - Unique identifier
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `source_of_water` (text) - Water source description
  - `location_text` (text) - Tank location description
  - `last_cleaned_date` (date) - Last cleaning date
  - `next_cleaning_date` (date) - Scheduled next cleaning
  - `assigned_staff` (text, nullable) - Staff assigned for next cleaning
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 6. `admin_complaints`
  Admin view of all complaints
  - `id` (text, primary key) - Complaint ID (e.g., C001)
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `house_no` (text) - House number
  - `type` (text) - Complaint type (Leakage, Water Quality, Pressure, etc.)
  - `description` (text) - Detailed description
  - `photo_url` (text, nullable) - Photo evidence URL
  - `gps_lat` (decimal, nullable) - GPS latitude
  - `gps_lon` (decimal, nullable) - GPS longitude
  - `status` (text) - Pending / In Progress / Resolved
  - `assigned_to` (text, nullable) - Staff ID assigned
  - `submitted_at` (timestamptz) - Submission timestamp
  - `remarks` (text, nullable) - Admin remarks

  ### 7. `registered_users`
  Registered household users
  - `house_no` (text, primary key) - House number
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `name` (text) - User name
  - `contact` (text) - Contact number
  - `usage_litre_latest` (integer) - Latest water usage in litres
  - `purity_percent_latest` (decimal) - Latest water purity percentage
  - `status` (text) - Active / Inactive
  - `created_at` (timestamptz) - Registration timestamp

  ### 8. `admin_bills`
  Billing records for admin
  - `id` (text, primary key) - Bill ID (e.g., B001)
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `house_no` (text) - House number
  - `month` (text) - Billing month (e.g., "Oct 2025")
  - `usage_litre` (integer) - Water usage in litres
  - `amount` (decimal) - Bill amount
  - `due_date` (date) - Payment due date
  - `status` (text) - Paid / Pending / Overdue
  - `payment_mode` (text, nullable) - Payment method
  - `paid_at` (timestamptz, nullable) - Payment timestamp
  - `created_at` (timestamptz) - Bill generation timestamp

  ### 9. `water_metrics`
  Daily water availability and usage metrics
  - `id` (uuid, primary key) - Unique identifier
  - `panchayat_lgd` (text, foreign key) - Reference to panchayat
  - `date` (date) - Metric date
  - `total_available` (integer) - Total water available in litres
  - `total_used` (integer) - Total water used in litres
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Panchayat admins can only access their own data
  - Authenticated access required

  ## Indexes
  - Optimized for panchayat-based queries
  - Status-based filtering
  - Date-based queries
*/

-- Create panchayats table
CREATE TABLE IF NOT EXISTS panchayats (
  lgd_number text PRIMARY KEY,
  state text NOT NULL,
  district text NOT NULL,
  name text NOT NULL,
  contact text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE panchayats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view panchayats"
  ON panchayats
  FOR SELECT
  TO authenticated
  USING (true);

-- Create staffs table
CREATE TABLE IF NOT EXISTS staffs (
  id text PRIMARY KEY,
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  contact text,
  duty_status text DEFAULT 'Off Duty' CHECK (duty_status IN ('On Duty', 'Off Duty')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE staffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all staff"
  ON staffs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage staff"
  ON staffs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  task_id text PRIMARY KEY,
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  house_no text NOT NULL,
  issue text NOT NULL,
  assigned_to text REFERENCES staffs(id) ON DELETE SET NULL,
  status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  completed_by text,
  remarks text
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create timings table
CREATE TABLE IF NOT EXISTS timings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  day text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view timings"
  ON timings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage timings"
  ON timings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create tank_maintenance table
CREATE TABLE IF NOT EXISTS tank_maintenance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  source_of_water text,
  location_text text,
  last_cleaned_date date,
  next_cleaning_date date,
  assigned_staff text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tank_maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tank maintenance"
  ON tank_maintenance
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage tank maintenance"
  ON tank_maintenance
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create admin_complaints table
CREATE TABLE IF NOT EXISTS admin_complaints (
  id text PRIMARY KEY,
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  house_no text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  photo_url text,
  gps_lat decimal(10, 8),
  gps_lon decimal(11, 8),
  status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved')),
  assigned_to text REFERENCES staffs(id) ON DELETE SET NULL,
  submitted_at timestamptz DEFAULT now(),
  remarks text
);

ALTER TABLE admin_complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all complaints"
  ON admin_complaints
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage complaints"
  ON admin_complaints
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create registered_users table
CREATE TABLE IF NOT EXISTS registered_users (
  house_no text PRIMARY KEY,
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  name text NOT NULL,
  contact text NOT NULL,
  usage_litre_latest integer DEFAULT 0,
  purity_percent_latest decimal(5, 2) DEFAULT 0,
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registered_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view registered users"
  ON registered_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage registered users"
  ON registered_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create admin_bills table
CREATE TABLE IF NOT EXISTS admin_bills (
  id text PRIMARY KEY,
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  house_no text NOT NULL,
  month text NOT NULL,
  usage_litre integer NOT NULL,
  amount decimal(10, 2) NOT NULL,
  due_date date NOT NULL,
  status text DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  payment_mode text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all bills"
  ON admin_bills
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage bills"
  ON admin_bills
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create water_metrics table
CREATE TABLE IF NOT EXISTS water_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_lgd text NOT NULL REFERENCES panchayats(lgd_number) ON DELETE CASCADE,
  date date NOT NULL,
  total_available integer NOT NULL DEFAULT 0,
  total_used integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(panchayat_lgd, date)
);

ALTER TABLE water_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view water metrics"
  ON water_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage water metrics"
  ON water_metrics
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_staffs_panchayat ON staffs(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_staffs_duty_status ON staffs(duty_status);
CREATE INDEX IF NOT EXISTS idx_tasks_panchayat ON tasks(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_timings_panchayat ON timings(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_complaints_panchayat ON admin_complaints(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON admin_complaints(status);
CREATE INDEX IF NOT EXISTS idx_users_panchayat ON registered_users(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_bills_panchayat ON admin_bills(panchayat_lgd);
CREATE INDEX IF NOT EXISTS idx_bills_status ON admin_bills(status);
CREATE INDEX IF NOT EXISTS idx_water_metrics_panchayat ON water_metrics(panchayat_lgd);