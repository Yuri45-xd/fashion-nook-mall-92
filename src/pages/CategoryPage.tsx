
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryNav from "../components/CategoryNav";
import ProductCard from "../components/ProductCard";
import { ChevronDown, Filter } from "lucide-react";
import { useProductStore } from "../store/ProductStore";
import { Product } from "../types";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fetchProductsByCategory } = useProductStore();
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      if (categoryName) {
        setIsLoading(true);
        try {
          const fetchedProducts = await fetchProductsByCategory(categoryName);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error(`Error loading ${categoryName} products:`, error);
          toast({
            title: "Error",
            description: `Failed to load ${categoryName} products`,
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadProducts();
  }, [categoryName, fetchProductsByCategory, toast]);

  // Handle sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "newest") return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    // Default: popularity - sort by rating and rating count
    return b.rating * b.ratingCount - a.rating * a.ratingCount;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filters Button */}
          <button 
            className="md:hidden btn-primary flex items-center justify-center gap-2 mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} /> Filters <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium border-b pb-2 mb-4">Filters</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex gap-2 items-center">
                  <input type="range" className="w-full" min="0" max="5000" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>₹0</span>
                  <span>₹5000+</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Brand</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Fashion Grown</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Urban Style</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Metro Fashion</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Discount</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>50% or more</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>40% or more</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>30% or more</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-semibold capitalize">
                  {categoryName || 'Products'}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort By:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-md py-1 px-2 text-sm"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-md h-64 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                
                {sortedProducts.length === 0 && (
                  <div className="col-span-full py-16 text-center">
                    <p className="text-lg text-gray-500">No products found in this category.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
