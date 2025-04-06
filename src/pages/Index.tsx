
import { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";
import BannerCarousel from "../components/BannerCarousel";
import DealsSection from "../components/DealsSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import { useProductStore } from "../store/ProductStore";
import { Product } from "../types";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

const Index = () => {
  const { products, fetchProducts, fetchProductsByCategory, isLoading: storeLoading } = useProductStore();
  const { toast } = useToast();
  
  const [tshirts, setTshirts] = useState<Product[]>([]);
  const [hoodies, setHoodies] = useState<Product[]>([]);
  const [jeans, setJeans] = useState<Product[]>([]);
  const [dresses, setDresses] = useState<Product[]>([]);
  const [kids, setKids] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoadingCategories(true);
        await fetchProducts();
        
        // Fetch products by category in parallel
        const [
          fetchedTshirts,
          fetchedHoodies,
          fetchedJeans,
          fetchedDresses,
          fetchedKids
        ] = await Promise.all([
          fetchProductsByCategory("tshirts"),
          fetchProductsByCategory("hoodies"),
          fetchProductsByCategory("jeans"),
          fetchProductsByCategory("dresses"),
          fetchProductsByCategory("kids")
        ]);
        
        setTshirts(fetchedTshirts);
        setHoodies(fetchedHoodies);
        setJeans(fetchedJeans);
        setDresses(fetchedDresses);
        setKids(fetchedKids);
      } catch (err) {
        console.error("Error loading products:", err);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } finally {
        setLoadingCategories(false);
      }
    };
    
    loadAllProducts();
  }, [fetchProducts, fetchProductsByCategory, toast]);

  // Use a simple variable to check if we're in a loading state
  const isLoading = storeLoading || loadingCategories;

  console.log('Component rendering with:', { storeLoading, loadingCategories, isLoading });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1 container mx-auto px-4 py-4">
        <BannerCarousel />
        <div className="my-6">
          <DealsSection products={products} />
          
          {isLoading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white p-4 rounded shadow-sm">
                  <div className="h-8 bg-gray-200 w-1/4 mb-4 rounded animate-pulse"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="bg-gray-100 h-48 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {tshirts.length > 0 && (
                <ProductSection 
                  title="T-shirts" 
                  products={tshirts} 
                  viewAllLink="/categories/tshirts" 
                />
              )}
              
              {hoodies.length > 0 && (
                <ProductSection 
                  title="Hoodies" 
                  products={hoodies} 
                  viewAllLink="/categories/hoodies" 
                />
              )}
              
              {jeans.length > 0 && (
                <ProductSection 
                  title="Jeans" 
                  products={jeans} 
                  viewAllLink="/categories/jeans" 
                />
              )}
              
              {dresses.length > 0 && (
                <ProductSection 
                  title="Dresses" 
                  products={dresses} 
                  viewAllLink="/categories/dresses" 
                />
              )}
              
              {kids.length > 0 && (
                <ProductSection 
                  title="Kids Collection" 
                  products={kids} 
                  viewAllLink="/categories/kids" 
                />
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
