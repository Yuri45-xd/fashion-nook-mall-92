
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProductStore } from "@/store/ProductStore";
import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";
import { Spinner } from "@/components/ui/spinner";

const ProductsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { deleteProduct, fetchProducts, isLoading } = useProductStore();
  const { toast } = useToast();

  useEffect(() => {
    // Load products when component mounts
    fetchProducts();
  }, [fetchProducts]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete !== null) {
      const success = await deleteProduct(productToDelete);
      
      if (success) {
        toast({
          title: "Success",
          description: "Product deleted successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive"
        });
      }
      
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const refreshProducts = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
    toast({
      title: "Updated",
      description: "Product list refreshed"
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={refreshProducts} 
              disabled={isRefreshing || isLoading}
            >
              {isRefreshing ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : (
                <span>Refresh</span>
              )}
            </Button>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-flipkart-blue">
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <ProductForm
                  product={editingProduct || undefined}
                  onSubmit={() => {
                    setIsFormOpen(false);
                    setEditingProduct(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading && !isRefreshing ? (
          <div className="py-12 text-center">
            <Spinner className="mx-auto h-8 w-8 mb-4" />
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <ProductsTable 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
            isRefreshing={isRefreshing}
          />
        )}
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-gray-500">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteProduct}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManager;
