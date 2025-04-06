
export type Product = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  rating: number;
  ratingCount: number;
  category: string;  // Now can include 'kids' as a category
  description?: string;
  stock?: number;
  sku?: string;
  created_at?: string;  // Added for Supabase
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Banner = {
  id: number;
  image: string;
  alt: string;
  url: string;
};
