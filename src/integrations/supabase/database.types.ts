 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      business_card_content: {
        Row: {
          about_media_1: string | null
          about_media_2: string | null
          about_media_3: string | null
          address1: string | null
          address2: string | null
          bio: string | null
          card_id: string
          company: string | null
          cover_image_url: string | null
          created_at: string | null
          email: string | null
          facebook: string | null
          id: string
          kakao_id: string | null
          kakao_qr: string | null
          language: string
          linkedin: string | null
          name: string
          phone: string | null
          phone2: string | null
          profile_image_url: string | null
          shopee: string | null
          tax_info: string | null
          tiktok: string | null
          title: string | null
          twitter: string | null
          updated_at: string | null
          website: string | null
          website2: string | null
          wechat_id: string | null
          wechat_qr: string | null
          youtube_channel: string | null
          youtube_url: string | null
          zalo_number: string | null
          zalo_qr: string | null
        }
        Insert: {
          about_media_1?: string | null
          about_media_2?: string | null
          about_media_3?: string | null
          address1?: string | null
          address2?: string | null
          bio?: string | null
          card_id: string
          company?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          kakao_id?: string | null
          kakao_qr?: string | null
          language: string
          linkedin?: string | null
          name: string
          phone?: string | null
          phone2?: string | null
          profile_image_url?: string | null
          shopee?: string | null
          tax_info?: string | null
          tiktok?: string | null
          title?: string | null
          twitter?: string | null
          updated_at?: string | null
          website?: string | null
          website2?: string | null
          wechat_id?: string | null
          wechat_qr?: string | null
          youtube_channel?: string | null
          youtube_url?: string | null
          zalo_number?: string | null
          zalo_qr?: string | null
        }
        Update: {
          about_media_1?: string | null
          about_media_2?: string | null
          about_media_3?: string | null
          address1?: string | null
          address2?: string | null
          bio?: string | null
          card_id?: string
          company?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          kakao_id?: string | null
          kakao_qr?: string | null
          language?: string
          linkedin?: string | null
          name?: string
          phone?: string | null
          phone2?: string | null
          profile_image_url?: string | null
          shopee?: string | null
          tax_info?: string | null
          tiktok?: string | null
          title?: string | null
          twitter?: string | null
          updated_at?: string | null
          website?: string | null
          website2?: string | null
          wechat_id?: string | null
          wechat_qr?: string | null
          youtube_channel?: string | null
          youtube_url?: string | null
          zalo_number?: string | null
          zalo_qr?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_card_content_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "business_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      business_cards: {
        Row: {
          created_at: string | null
          default_language: string
          id: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_language: string
          id?: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_language?: string
          id?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_cards_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          cards_count: number | null
          created_at: string | null
          email: string
          id: string
          last_active: string | null
          name: string
          plan: string
          role: string
          status: string
          updated_at: string | null
        }
        Insert: {
          cards_count?: number | null
          created_at?: string | null
          email: string
          id?: string
          last_active?: string | null
          name: string
          plan: string
          role: string
          status: string
          updated_at?: string | null
        }
        Update: {
          cards_count?: number | null
          created_at?: string | null
          email?: string
          id?: string
          last_active?: string | null
          name?: string
          plan?: string
          role?: string
          status?: string
          updated_at?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
