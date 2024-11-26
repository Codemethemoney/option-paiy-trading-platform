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
      AIInsight: {
        Row: {
          confidence: number | null
          content: Json
          id: string
          metadata: Json | null
          timestamp: string | null
          type: string
          userId: string | null
        }
        Insert: {
          confidence?: number | null
          content: Json
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          type: string
          userId?: string | null
        }
        Update: {
          confidence?: number | null
          content?: Json
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          type?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "AIInsight_userId_fkey"
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
      KYC: {
        Row: {
          createdAt: string | null
          documentNumber: string | null
          documentType: Database["public"]["Enums"]["DocumentType"] | null
          id: string
          riskScore: number | null
          status: Database["public"]["Enums"]["KYCStatus"] | null
          updatedAt: string | null
          userId: string | null
          verificationScore: number | null
        }
        Insert: {
          createdAt?: string | null
          documentNumber?: string | null
          documentType?: Database["public"]["Enums"]["DocumentType"] | null
          id?: string
          riskScore?: number | null
          status?: Database["public"]["Enums"]["KYCStatus"] | null
          updatedAt?: string | null
          userId?: string | null
          verificationScore?: number | null
        }
        Update: {
          createdAt?: string | null
          documentNumber?: string | null
          documentType?: Database["public"]["Enums"]["DocumentType"] | null
          id?: string
          riskScore?: number | null
          status?: Database["public"]["Enums"]["KYCStatus"] | null
          updatedAt?: string | null
          userId?: string | null
          verificationScore?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "KYC_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Option: {
        Row: {
          createdAt: string | null
          expiration: string
          id: string
          premium: number
          status: Database["public"]["Enums"]["OptionStatus"] | null
          strike: number
          type: Database["public"]["Enums"]["OptionType"]
          underlyingSymbol: string
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          createdAt?: string | null
          expiration: string
          id?: string
          premium: number
          status?: Database["public"]["Enums"]["OptionStatus"] | null
          strike: number
          type: Database["public"]["Enums"]["OptionType"]
          underlyingSymbol: string
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          createdAt?: string | null
          expiration?: string
          id?: string
          premium?: number
          status?: Database["public"]["Enums"]["OptionStatus"] | null
          strike?: number
          type?: Database["public"]["Enums"]["OptionType"]
          underlyingSymbol?: string
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Option_userId_fkey"
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
      RiskMetric: {
        Row: {
          aiRecommendations: Json | null
          alpha: number | null
          assetAllocation: Json | null
          beta: number | null
          correlationMatrix: Json | null
          delta: number | null
          gamma: number | null
          id: string
          informationRatio: number | null
          marketRegime: Json | null
          maxDrawdown: number | null
          portfolioValue: number
          rho: number | null
          sectorExposure: Json | null
          sentimentAnalysis: Json | null
          sharpeRatio: number | null
          sortinoRatio: number | null
          theta: number | null
          timestamp: string | null
          userId: string | null
          valueAtRisk: number
          vega: number | null
        }
        Insert: {
          aiRecommendations?: Json | null
          alpha?: number | null
          assetAllocation?: Json | null
          beta?: number | null
          correlationMatrix?: Json | null
          delta?: number | null
          gamma?: number | null
          id?: string
          informationRatio?: number | null
          marketRegime?: Json | null
          maxDrawdown?: number | null
          portfolioValue: number
          rho?: number | null
          sectorExposure?: Json | null
          sentimentAnalysis?: Json | null
          sharpeRatio?: number | null
          sortinoRatio?: number | null
          theta?: number | null
          timestamp?: string | null
          userId?: string | null
          valueAtRisk: number
          vega?: number | null
        }
        Update: {
          aiRecommendations?: Json | null
          alpha?: number | null
          assetAllocation?: Json | null
          beta?: number | null
          correlationMatrix?: Json | null
          delta?: number | null
          gamma?: number | null
          id?: string
          informationRatio?: number | null
          marketRegime?: Json | null
          maxDrawdown?: number | null
          portfolioValue?: number
          rho?: number | null
          sectorExposure?: Json | null
          sentimentAnalysis?: Json | null
          sharpeRatio?: number | null
          sortinoRatio?: number | null
          theta?: number | null
          timestamp?: string | null
          userId?: string | null
          valueAtRisk?: number
          vega?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "RiskMetric_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
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
      DocumentType: "PASSPORT" | "DRIVING_LICENSE" | "NATIONAL_ID"
      KYCStatus: "PENDING" | "APPROVED" | "REJECTED"
      OptionStatus: "ACTIVE" | "EXPIRED" | "EXERCISED"
      OptionType: "CALL" | "PUT"
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
