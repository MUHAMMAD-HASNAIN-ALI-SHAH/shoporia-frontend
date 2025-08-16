import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useProductStore } from "./useProductStore";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  status: string;
}

interface AdminState {
  productForEditOrDelete: Product | null;
  addProductLoader: boolean;
  editProductLoader: boolean;
  deleteProductLoader: boolean;
  deleteProduct: (productId: string) => void;
  addProduct: (productData: Product) => Promise<number>;
  editProduct: (productId: string, productData: Product) => Promise<number>;
  setProductForEditOrDelete: (productId: string) => void;
  removeProductForEditOrDelete: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  productForEditOrDelete: null,
  addProductLoader: false,
  editProductLoader: false,
  deleteProductLoader: false,
  addProduct: async (productData) => {
    try {
      set({ addProductLoader: true });
      await axiosInstance.post("/api/v2/admin/product", productData);
      toast.success("Product added successfully");
      set({ addProductLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to add product");
      return 0;
    } finally {
      set({ addProductLoader: false });
    }
  },
  editProduct: async (productId, productData) => {
    try {
      set({ editProductLoader: true });
      const response = await axiosInstance.put(
        `/api/v2/admin/product/${productId}`,
        productData
      );
      toast.success("Product updated successfully");
      set({ editProductLoader: false });
      const product = response.data.product;
      useProductStore.getState().updateProduct(productId, product);
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to update product");
      return 0;
    } finally {
      set({ editProductLoader: false });
    }
  },
  deleteProduct: async (productId) => {
    try {
      console.log("Deleting product with ID:", productId);
      set({ deleteProductLoader: true });
      await axiosInstance.delete(`/api/v2/admin/product/${productId}`);
      toast.success("Product deleted successfully");
      useProductStore.getState().getAllProducts();
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to delete product");
      return 0;
    } finally {
      set({ deleteProductLoader: false });
    }
  },
  setProductForEditOrDelete: (productId) => {
    const products = useProductStore.getState().products;
    const product = products.find((p) => p._id === productId);
    if (product) {
      set({ productForEditOrDelete: product });
    }
  },
  removeProductForEditOrDelete: () => set({ productForEditOrDelete: null }),
}));
