export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface MESERPDatabase {
  public: {
    Tables: {
      mm_user: {
        Row: {
          full_name: string | null
          userid: string
          username: string | null
        }
        Insert: {
          full_name?: string | null
          userid: string
          username?: string | null
        }
        Update: {
          full_name?: string | null
          userid?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mm_user_userid_fkey"
            columns: ["userid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mm_worktimerecord: {
        Row: {
          create_at: string
          end_time: string
          misc: string | null
          record_id: string
          start_time: string
          user_id: string
        }
        Insert: {
          create_at?: string
          end_time: string
          misc?: string | null
          record_id?: string
          start_time: string
          user_id: string
        }
        Update: {
          create_at?: string
          end_time?: string
          misc?: string | null
          record_id?: string
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mm_worktimerecord_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "mm_user"
            referencedColumns: ["userid"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      AddWorkTime: {
        Args: {
          start_time: string
          end_time: string
        }
        Returns: Json
      }
      search_worktime: {
        Args: {
          in_start_time: string
          in_end_time: string
        }
        Returns: {
          user_id: string
          start_time: string
          end_time: string
        }[]
      }
      verify_user_login: {
        Args: {
          username: string
          password: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
