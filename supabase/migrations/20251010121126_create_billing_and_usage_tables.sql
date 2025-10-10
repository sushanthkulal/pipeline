/*
  # Create Billing and Water Usage Tables

  ## Overview
  This migration creates a comprehensive billing system for tracking water usage,
  payments, and user billing history.

  ## New Tables

  ### 1. `users`
  User account information
  - `id` (uuid, primary key) - Unique identifier for each user
  - `email` (text, unique) - User's email address
  - `name` (text) - User's full name
  - `house_number` (text) - House/connection number
  - `phone` (text) - Contact phone number
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. `water_usage`
  Monthly water consumption records
  - `id` (uuid, primary key) - Unique identifier for each usage record
  - `user_id` (uuid, foreign key) - Reference to user
  - `month` (text) - Month name (e.g., "January 2025")
  - `year` (integer) - Year
  - `month_number` (integer) - Month as number (1-12)
  - `usage_liters` (integer) - Water consumed in liters
  - `amount` (decimal) - Bill amount in rupees
  - `due_date` (date) - Payment due date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `payments`
  Payment transaction records
  - `id` (uuid, primary key) - Unique identifier for each payment
  - `user_id` (uuid, foreign key) - Reference to user
  - `usage_id` (uuid, foreign key) - Reference to water usage record
  - `amount` (decimal) - Payment amount
  - `payment_date` (timestamptz) - When payment was made
  - `payment_method` (text) - Payment mode (UPI, Cash, Bank Transfer, etc.)
  - `transaction_id` (text, nullable) - Transaction reference number
  - `status` (text) - Payment status (Completed, Pending, Failed)
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only view and manage their own data
  - Authenticated access required for all operations

  ## Indexes
  - User lookup optimization
  - Month-based queries
  - Payment status queries
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  house_number text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create water_usage table
CREATE TABLE IF NOT EXISTS water_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month text NOT NULL,
  year integer NOT NULL,
  month_number integer NOT NULL CHECK (month_number >= 1 AND month_number <= 12),
  usage_liters integer NOT NULL DEFAULT 0,
  amount decimal(10, 2) NOT NULL DEFAULT 0,
  due_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, year, month_number)
);

ALTER TABLE water_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own water usage"
  ON water_usage
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own water usage"
  ON water_usage
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_id uuid NOT NULL REFERENCES water_usage(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL,
  payment_date timestamptz DEFAULT now(),
  payment_method text NOT NULL,
  transaction_id text,
  status text DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for optimized queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_house_number ON users(house_number);
CREATE INDEX IF NOT EXISTS idx_water_usage_user_id ON water_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_water_usage_year_month ON water_usage(year, month_number);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_usage_id ON payments(usage_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);