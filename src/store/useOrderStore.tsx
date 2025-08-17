import type { Order } from "@/interface/interface";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export interface OrderGroup {
  cartId: string;
  email: string;
  paymentStatus: string;
  createdAt: string;
  items: Order[]; // array of individual order items
}

export interface OrderState {
  myOrders: OrderGroup[];  // always an array
  isLoading: boolean;
  getMyOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  myOrders: [],
  isLoading: false,

  getMyOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/v6/order/get-my-orders");
      set({ myOrders: response.data ?? [] });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ myOrders: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
