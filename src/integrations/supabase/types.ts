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
      Account: {
        Row: {
          balance: number | null
          createdAt: string | null
          currency: string
          id: string
          status: Database["public"]["Enums"]["AccountStatus"] | null
          type: Database["public"]["Enums"]["AccountType"]
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          balance?: number | null
          createdAt?: string | null
          currency: string
          id?: string
          status?: Database["public"]["Enums"]["AccountStatus"] | null
          type: Database["public"]["Enums"]["AccountType"]
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          balance?: number | null
          createdAt?: string | null
          currency?: string
          id?: string
          status?: Database["public"]["Enums"]["AccountStatus"] | null
          type?: Database["public"]["Enums"]["AccountType"]
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      ApiKey: {
        Row: {
          createdAt: string | null
          id: string
          key: string
          lastUsed: string | null
          name: string | null
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          createdAt?: string | null
          id?: string
          key: string
          lastUsed?: string | null
          name?: string | null
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          createdAt?: string | null
          id?: string
          key?: string
          lastUsed?: string | null
          name?: string | null
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ApiKey_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Profile: {
        Row: {
          address: string | null
          createdAt: string | null
          firstName: string | null
          id: string
          lastName: string | null
          phone: string | null
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          address?: string | null
          createdAt?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          phone?: string | null
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          address?: string | null
          createdAt?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          phone?: string | null
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Profile_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Transaction: {
        Row: {
          accountId: string | null
          amount: number
          createdAt: string | null
          currency: string
          description: string | null
          id: string
          status: Database["public"]["Enums"]["TransactionStatus"] | null
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          accountId?: string | null
          amount: number
          createdAt?: string | null
          currency: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["TransactionStatus"] | null
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          accountId?: string | null
          amount?: number
          createdAt?: string | null
          currency?: string
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["TransactionStatus"] | null
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Transaction_accountId_fkey"
            columns: ["accountId"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transaction_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string | null
          email: string
          id: string
          password: string
          updatedAt: string | null
          username: string
        }
        Insert: {
          createdAt?: string | null
          email: string
          id?: string
          password: string
          updatedAt?: string | null
          username: string
        }
        Update: {
          createdAt?: string | null
          email?: string
          id?: string
          password?: string
          updatedAt?: string | null
          username?: string
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
      AccountStatus: "ACTIVE" | "SUSPENDED" | "CLOSED"
      AccountType: "TRADING" | "WALLET" | "SAVINGS"
      TransactionStatus: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED"
      TransactionType: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "TRADE"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
