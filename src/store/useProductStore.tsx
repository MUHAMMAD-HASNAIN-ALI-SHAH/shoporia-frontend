import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  status: string;
  ratingsAverage?: number;
  rattingsCount?: number;
}

interface ProductState {
  products: Product[];
  getAllProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get("/api/v3/product");
      set({ products: response.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to fetch products");
    }
  },
}));
