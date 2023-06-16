export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

// write function add start_time and end_time to mm_worktimerecord
  export interface MESERPDatabase {
    public: {
      Tables: {
        mm_user: {
          Row: {
            userid: string
            username: string | null
          }
          Insert: {
            userid: string
            username?: string | null
          }
          Update: {
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
              referencedRelation: "users"
              referencedColumns: ["id"]
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
      }
      Enums: {
        [_ in never]: never
      }
      CompositeTypes: {
        [_ in never]: never
      }
    }
  }
  
