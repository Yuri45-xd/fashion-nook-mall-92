
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
      products: {
        Row: {
          id: number
          title: string
          price: number
          originalPrice: number
          discountPercentage: number
          image: string
          rating: number
          ratingCount: number
          category: string
          description: string | null
          stock: number | null
          sku: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          price: number
          originalPrice: number
          discountPercentage: number
          image: string
          rating: number
          ratingCount: number
          category: string
          description?: string | null
          stock?: number | null
          sku?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          price?: number
          originalPrice?: number
          discountPercentage?: number
          image?: string
          rating?: number
          ratingCount?: number
          category?: string
          description?: string | null
          stock?: number | null
          sku?: string | null
          created_at?: string
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
  }
}
