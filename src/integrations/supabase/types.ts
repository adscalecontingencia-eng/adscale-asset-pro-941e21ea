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
      gsc_daily_metrics: {
        Row: {
          clicks: number
          created_at: string
          ctr: number
          date: string
          id: string
          impressions: number
          position: number
        }
        Insert: {
          clicks?: number
          created_at?: string
          ctr?: number
          date: string
          id?: string
          impressions?: number
          position?: number
        }
        Update: {
          clicks?: number
          created_at?: string
          ctr?: number
          date?: string
          id?: string
          impressions?: number
          position?: number
        }
        Relationships: []
      }
      gsc_index_status: {
        Row: {
          created_at: string
          id: string
          page: string
          priority: string | null
          reason: string | null
          snapshot_date: string
          state: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page: string
          priority?: string | null
          reason?: string | null
          snapshot_date: string
          state?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page?: string
          priority?: string | null
          reason?: string | null
          snapshot_date?: string
          state?: string | null
        }
        Relationships: []
      }
      gsc_page_snapshots: {
        Row: {
          clicks: number
          created_at: string
          ctr: number
          id: string
          impressions: number
          page: string
          page_type: string | null
          position: number
          query_count: number
          snapshot_date: string
          status: string | null
          top_query: string | null
        }
        Insert: {
          clicks?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          page: string
          page_type?: string | null
          position?: number
          query_count?: number
          snapshot_date: string
          status?: string | null
          top_query?: string | null
        }
        Update: {
          clicks?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          page?: string
          page_type?: string | null
          position?: number
          query_count?: number
          snapshot_date?: string
          status?: string | null
          top_query?: string | null
        }
        Relationships: []
      }
      gsc_query_snapshots: {
        Row: {
          clicks: number
          country: string | null
          created_at: string
          ctr: number
          device: string | null
          id: string
          impressions: number
          intent: string | null
          opportunity: string | null
          page: string | null
          page_type: string | null
          position: number
          query: string
          score: number | null
          snapshot_date: string
        }
        Insert: {
          clicks?: number
          country?: string | null
          created_at?: string
          ctr?: number
          device?: string | null
          id?: string
          impressions?: number
          intent?: string | null
          opportunity?: string | null
          page?: string | null
          page_type?: string | null
          position?: number
          query: string
          score?: number | null
          snapshot_date: string
        }
        Update: {
          clicks?: number
          country?: string | null
          created_at?: string
          ctr?: number
          device?: string | null
          id?: string
          impressions?: number
          intent?: string | null
          opportunity?: string | null
          page?: string | null
          page_type?: string | null
          position?: number
          query?: string
          score?: number | null
          snapshot_date?: string
        }
        Relationships: []
      }
      newsletter_leads: {
        Row: {
          created_at: string
          device: string | null
          email: string
          id: string
          landing_page: string | null
          pillar_label: string | null
          pillar_slug: string | null
          referrer: string | null
          session_id: string | null
          source_route: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string
          device?: string | null
          email: string
          id?: string
          landing_page?: string | null
          pillar_label?: string | null
          pillar_slug?: string | null
          referrer?: string | null
          session_id?: string | null
          source_route?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string
          device?: string | null
          email?: string
          id?: string
          landing_page?: string | null
          pillar_label?: string | null
          pillar_slug?: string | null
          referrer?: string | null
          session_id?: string | null
          source_route?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      seo_action_items: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          id: string
          metric: string | null
          page: string | null
          priority: string
          query: string | null
          recommendation: string
          result_json: Json | null
          score: number | null
          status: string
          type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metric?: string | null
          page?: string | null
          priority?: string
          query?: string | null
          recommendation: string
          result_json?: Json | null
          score?: number | null
          status?: string
          type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metric?: string | null
          page?: string | null
          priority?: string
          query?: string | null
          recommendation?: string
          result_json?: Json | null
          score?: number | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      seo_optimizations: {
        Row: {
          after_json: Json | null
          applied_at: string
          before_json: Json | null
          created_by: string | null
          id: string
          notes: string | null
          page: string
          type: string
        }
        Insert: {
          after_json?: Json | null
          applied_at?: string
          before_json?: Json | null
          created_by?: string | null
          id?: string
          notes?: string | null
          page: string
          type: string
        }
        Update: {
          after_json?: Json | null
          applied_at?: string
          before_json?: Json | null
          created_by?: string | null
          id?: string
          notes?: string | null
          page?: string
          type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_clicks: {
        Row: {
          channel: string | null
          created_at: string
          cta_label: string | null
          device: string | null
          fbclid: string | null
          gclid: string | null
          id: string
          landing_page: string | null
          referrer: string | null
          route: string | null
          search_engine: string | null
          search_keyword: string | null
          session_id: string | null
          source: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          channel?: string | null
          created_at?: string
          cta_label?: string | null
          device?: string | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          referrer?: string | null
          route?: string | null
          search_engine?: string | null
          search_keyword?: string | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          channel?: string | null
          created_at?: string
          cta_label?: string | null
          device?: string | null
          fbclid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          referrer?: string | null
          route?: string | null
          search_engine?: string | null
          search_keyword?: string | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
