import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  email: string
  name: string
  house_number: string
  phone?: string
  created_at: string
}

export type WaterUsage = {
  id: string
  user_id: string
  month: string
  year: number
  month_number: number
  usage_liters: number
  amount: number
  due_date: string
  created_at: string
}

export type Payment = {
  id: string
  user_id: string
  usage_id: string
  amount: number
  payment_date: string
  payment_method: string
  transaction_id?: string
  status: 'Completed' | 'Pending' | 'Failed'
  created_at: string
}

export type UsageWithPayment = WaterUsage & {
  payment?: Payment
  isOverdue: boolean
}
