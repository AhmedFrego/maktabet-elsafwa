export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      academic_years: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      cover_types: {
        Row: {
          available_amount: number | null
          id: string
          name: string
          price: number
        }
        Insert: {
          available_amount?: number | null
          id?: string
          name: string
          price: number
        }
        Update: {
          available_amount?: number | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      notes: {
        Row: {
          academic_year: string
          created_at: string
          created_by: string
          default_cover: string | null
          default_paper: string
          extra_note_name: string | null
          id: string
          pages: number | null
          subject: string
          teacher: string
          term: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          academic_year: string
          created_at?: string
          created_by?: string
          default_cover?: string | null
          default_paper: string
          extra_note_name?: string | null
          id?: string
          pages?: number | null
          subject: string
          teacher: string
          term?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string
          created_by?: string
          default_cover?: string | null
          default_paper?: string
          extra_note_name?: string | null
          id?: string
          pages?: number | null
          subject?: string
          teacher?: string
          term?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_academic_year_fkey"
            columns: ["academic_year"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_default_cover_fkey"
            columns: ["default_cover"]
            isOneToOne: false
            referencedRelation: "cover_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_default_paper_fkey"
            columns: ["default_paper"]
            isOneToOne: false
            referencedRelation: "paper_sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_teacher_fkey"
            columns: ["teacher"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_teacher_fkey1"
            columns: ["teacher"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_term_fkey"
            columns: ["term"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_sizes: {
        Row: {
          black_price: number
          color_price: number
          id: string
          size: string
        }
        Insert: {
          black_price: number
          color_price: number
          id?: string
          size: string
        }
        Update: {
          black_price?: number
          color_price?: number
          id?: string
          size?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          academic_years: string | null
          id: string
          name: string
          subject: string
        }
        Insert: {
          academic_years?: string | null
          id?: string
          name: string
          subject?: string
        }
        Update: {
          academic_years?: string | null
          id?: string
          name?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_academic_years_fkey"
            columns: ["academic_years"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      terms: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
