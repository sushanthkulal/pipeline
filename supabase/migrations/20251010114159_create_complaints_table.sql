/*
  # Create Complaints Table

  1. New Tables
    - `complaints`
      - `id` (uuid, primary key) - Unique identifier for each complaint
      - `user_id` (uuid) - Reference to the user who submitted the complaint
      - `user_name` (text) - Name of the user submitting the complaint
      - `problem_type` (text) - Type of water-related issue
      - `description` (text) - Detailed description of the problem
      - `photo_url` (text, nullable) - URL to the uploaded photo of the issue
      - `gps_latitude` (decimal) - GPS latitude coordinate
      - `gps_longitude` (decimal) - GPS longitude coordinate
      - `status` (text) - Current status (Submitted, Pending, In Progress, Resolved)
      - `created_at` (timestamptz) - Timestamp when complaint was created
      - `updated_at` (timestamptz) - Timestamp when complaint was last updated
      - `location_code` (text, nullable) - Location code (e.g., H005, H007)
      - `assigned_to` (text, nullable) - Name of person assigned to handle complaint

  2. Security
    - Enable RLS on `complaints` table
    - Add policy for authenticated users to read their own complaints
    - Add policy for authenticated users to create complaints
    - Add policy for authenticated users to update their own complaints
*/

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text NOT NULL,
  problem_type text NOT NULL,
  description text NOT NULL,
  photo_url text,
  gps_latitude decimal(10, 8),
  gps_longitude decimal(11, 8),
  status text DEFAULT 'Submitted',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  location_code text,
  assigned_to text
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (user_name = current_user)
  WITH CHECK (user_name = current_user);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);