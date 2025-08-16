import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";

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
  addProductLoader: boolean;
  addProduct: (productData: Product) => Promise<number>;
}

export const useAdminStore = create<AdminState>((set) => ({
  addProductLoader: false,
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
}));
