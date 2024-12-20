// types/supabase.ts
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
      donations: {
        Row: {
          // Your table row types
        }
        Insert: {
          // Your insert types
        }
        Update: {
          // Your update types
        }
      }
    }
  }
}