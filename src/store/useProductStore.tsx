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
  getProductByIdFromExistingProducts: (
    productId: string
  ) => Product | undefined;
  updateProduct: (productId: string, updatedData: Partial<Product>) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],

  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get("/api/v3/product");
      set({ products: response.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to fetch products");
    }
  },
  getProductByIdFromExistingProducts: (productId) => {
    const products = get().products;
    return products.find((product) => product._id === productId);
  },
  updateProduct: (productId, updatedData) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? { ...product, ...updatedData } : product
      ),
    }));
  },
}));
