
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

export const ProductService = {
  // Initialize the database with products if empty
  async initializeProducts(): Promise<void> {
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (!existingProducts || existingProducts.length === 0) {
      console.log('Initializing products database...');
      
      // Add stock information to initial products
      const enhancedProducts = initialProducts.map(product => ({
        ...product,
        stock: Math.floor(Math.random() * (100 - 10)) + 10, // Random stock between 10-100
        description: `High quality ${product.category} with great comfort and style. Perfect for casual and formal occasions.`,
        sku: `${product.category.substring(0, 3).toUpperCase()}-${product.id}00${product.id}`
      }));
      
      // Insert all products in batches to avoid payload size limits
      const batchSize = 5;
      for (let i = 0; i < enhancedProducts.length; i += batchSize) {
        const batch = enhancedProducts.slice(i, i + batchSize);
        const { error } = await supabase.from('products').insert(batch);
        if (error) console.error('Error initializing products:', error);
      }
    }
  },

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data || [];
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: true });
    
    if (error) {
      console.error(`Error fetching ${category} products:`, error);
      return [];
    }
    
    return data || [];
  },

  // Get a product by ID
  async getProductById(id: number): Promise<Product | undefined> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product ${id}:`, error);
      return undefined;
    }
    
    return data;
  },

  // Add a new product
  async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    // Generate a new product ID
    const { data: maxIdData } = await supabase
      .from('products')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    
    const newId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;
    
    const newProduct = { ...product, id: newId };
    
    const { data, error } = await supabase
      .from('products')
      .insert(newProduct)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding product:', error);
      return null;
    }
    
    return data;
  },

  // Update an existing product
  async updateProduct(product: Product): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', product.id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating product ${product.id}:`, error);
      return null;
    }
    
    return data;
  },

  // Delete a product
  async deleteProduct(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting product ${id}:`, error);
      return false;
    }
    
    return true;
  },

  // Update product stock
  async updateStock(id: number, newStock: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', id);
    
    if (error) {
      console.error(`Error updating stock for product ${id}:`, error);
      return false;
    }
    
    return true;
  }
};
