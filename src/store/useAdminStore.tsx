import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useProductStore } from "./useProductStore";
import type { Order, Product } from "@/interface/interface";

interface AdminState {
  orders: Order[];
  productForEditOrDelete: Product | null;
  addProductLoader: boolean;
  gettingAllOrdersLoader: boolean;
  getAllOrders: () => Promise<void>;
  editProductLoader: boolean;
  deleteProductLoader: boolean;
  deleteProduct: (productId: string) => void;
  addProduct: (productData: Product) => Promise<number>;
  editProduct: (productId: string, productData: Product) => Promise<number>;
  setProductForEditOrDelete: (productId: string) => void;
  removeProductForEditOrDelete: () => void;
  updateOrderStatusLoader: boolean;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  orders: [],
  productForEditOrDelete: null,
  addProductLoader: false,
  gettingAllOrdersLoader: false,
  editProductLoader: false,
  deleteProductLoader: false,
  updateOrderStatusLoader: false,

  addProduct: async (productData) => {
    try {
      set({ addProductLoader: true });
      await axiosInstance.post("/api/v2/admin/product", productData);
      toast.success("Product added successfully");
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
    if (product) set({ productForEditOrDelete: product });
  },

  removeProductForEditOrDelete: () => set({ productForEditOrDelete: null }),

  getAllOrders: async () => {
    set({ gettingAllOrdersLoader: true });
    try {
      const response = await axiosInstance.get("/api/v6/order/get-all-orders");
      const ordersData = response.data ?? [];

      set({ orders: ordersData });
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      set({ gettingAllOrdersLoader: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      if (get().updateOrderStatusLoader) return;
      set({ updateOrderStatusLoader: true });
      await axiosInstance.post(`/api/v6/order/update-order-status`, {
        orderId,
        status,
      });
      set({
        orders: useAdminStore.getState().orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: status as
                  | "pending"
                  | "placed"
                  | "canceled"
                  | "shipped"
                  | "delivered",
              }
            : order
        ),
      });
      if (!toast.isActive("order-status")) {
        toast.success("Order status updated successfully", {
          toastId: "order-status",
        });
      }
      set({ updateOrderStatusLoader: false });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.msg || "Failed to update order status"
      );
      set({ updateOrderStatusLoader: false });
    }
  },
}));
