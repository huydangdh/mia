import { createClient } from "@supabase/supabase-js";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface MESERP_Database {
  public: {
    Tables: {
      mm_user: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          password: string | null
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          password?: string | null
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          password?: string | null
          role?: string | null
          username?: string | null
        }
      }
      mm_worktimerecord: {
        Row: {
          created_at: string | null
          end_time: string
          record_id: string
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_time: string
          record_id: string
          start_time: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_time?: string
          record_id?: string
          start_time?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

const supabaseUrl = 'https://gtjynrhgxnemxzyvdrsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anlucmhneG5lbXh6eXZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0Mzg4MzcsImV4cCI6MTk5NDAxNDgzN30.Kjoe4qrCyfr2nEbZVaCd55GLmcw7pD-h-VjsJFoURF0'
const supabase = createClient(supabaseUrl, supabaseKey)

  
export default supabase
