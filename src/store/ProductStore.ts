
import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware";
import { ProductService } from "../services/ProductService";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<Product[]>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product | null>;
  deleteProduct: (id: number) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<Product | null>;
  getProductById: (id: number) => Promise<Product | undefined>;
  updateStock: (id: number, newStock: number) => Promise<boolean>;
  
  // Selector methods (synchronous, work with local state)
  getProductsByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,
      initialized: false,
      
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          // Initialize products if needed
          if (!get().initialized) {
            await ProductService.initializeProducts();
            set({ initialized: true });
          }
          
          const products = await ProductService.getAllProducts();
          set({ products, isLoading: false });
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch products', 
            isLoading: false 
          });
        }
      },
      
      fetchProductsByCategory: async (category: string) => {
        set({ isLoading: true, error: null });
        try {
          const products = await ProductService.getProductsByCategory(category);
          return products;
        } catch (error) {
          console.error(`Error fetching ${category} products:`, error);
          set({ 
            error: error instanceof Error ? error.message : `Failed to fetch ${category} products`, 
            isLoading: false 
          });
          return [];
        } finally {
          set({ isLoading: false });
        }
      },
      
      addProduct: async (product) => {
        set({ isLoading: true, error: null });
        try {
          const newProduct = await ProductService.addProduct(product);
          if (newProduct) {
            set((state) => ({ 
              products: [...state.products, newProduct],
              isLoading: false 
            }));
          }
          return newProduct;
        } catch (error) {
          console.error('Error adding product:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add product', 
            isLoading: false 
          });
          return null;
        }
      },
      
      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const success = await ProductService.deleteProduct(id);
          if (success) {
            set((state) => ({ 
              products: state.products.filter(product => product.id !== id),
              isLoading: false 
            }));
          }
          return success;
        } catch (error) {
          console.error(`Error deleting product ${id}:`, error);
          set({ 
            error: error instanceof Error ? error.message : `Failed to delete product ${id}`, 
            isLoading: false 
          });
          return false;
        }
      },
      
      updateProduct: async (updatedProduct) => {
        set({ isLoading: true, error: null });
        try {
          const result = await ProductService.updateProduct(updatedProduct);
          if (result) {
            set((state) => ({ 
              products: state.products.map(product => 
                product.id === updatedProduct.id ? updatedProduct : product
              ),
              isLoading: false 
            }));
          }
          return result;
        } catch (error) {
          console.error(`Error updating product ${updatedProduct.id}:`, error);
          set({ 
            error: error instanceof Error ? error.message : `Failed to update product ${updatedProduct.id}`, 
            isLoading: false 
          });
          return null;
        }
      },
      
      getProductById: async (id) => {
        // First check if we have it in our local state
        const localProduct = get().products.find(product => product.id === id);
        if (localProduct) return localProduct;
        
        // If not, fetch from API
        return await ProductService.getProductById(id);
      },
      
      updateStock: async (id, newStock) => {
        set({ isLoading: true, error: null });
        try {
          const success = await ProductService.updateStock(id, newStock);
          if (success) {
            set((state) => ({
              products: state.products.map(product => 
                product.id === id ? { ...product, stock: newStock } : product
              ),
              isLoading: false
            }));
          }
          return success;
        } catch (error) {
          console.error(`Error updating stock for product ${id}:`, error);
          set({ 
            error: error instanceof Error ? error.message : `Failed to update stock for product ${id}`, 
            isLoading: false 
          });
          return false;
        }
      },
      
      // Synchronous selector that works with local state
      getProductsByCategory: (category) => {
        return get().products.filter(product => product.category === category);
      }
    }),
    {
      name: "product-storage",
    }
  )
);
