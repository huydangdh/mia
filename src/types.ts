export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      mm_application: {
        Row: {
          app_created_at: string
          app_created_by: string
          app_description: string | null
          app_id: string
          app_name: string
        }
        Insert: {
          app_created_at: string
          app_created_by: string
          app_description?: string | null
          app_id?: string
          app_name: string
        }
        Update: {
          app_created_at?: string
          app_created_by?: string
          app_description?: string | null
          app_id?: string
          app_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "mm_application_app_created_by_fkey"
            columns: ["app_created_by"]
            referencedRelation: "mm_user"
            referencedColumns: ["userid"]
          }
        ]
      }
      mm_approle: {
        Row: {
          app_id: string
          role_created_at: string | null
          role_name: string
          user_id: string
        }
        Insert: {
          app_id: string
          role_created_at?: string | null
          role_name: string
          user_id: string
        }
        Update: {
          app_id?: string
          role_created_at?: string | null
          role_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mm_approle_app_id_fkey"
            columns: ["app_id"]
            referencedRelation: "mm_application"
            referencedColumns: ["app_id"]
          },
          {
            foreignKeyName: "mm_approle_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "mm_user"
            referencedColumns: ["userid"]
          }
        ]
      }
      mm_menulist: {
        Row: {
          menu_created_at: string | null
          menu_description: string | null
          menu_id: number
          menu_name: string
        }
        Insert: {
          menu_created_at?: string | null
          menu_description?: string | null
          menu_id?: number
          menu_name: string
        }
        Update: {
          menu_created_at?: string | null
          menu_description?: string | null
          menu_id?: number
          menu_name?: string
        }
        Relationships: []
      }
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
      f_check_role_user_application: {
        Args: {
          in_user_id: string
          in_app_id: string
          in_role_name: string
        }
        Returns: boolean
      }
      search_worktime: {
        Args: {
          in_start_time: string
          in_end_time: string
        }
        Returns: {
          record_id: string
          user_id: string
          username: string
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