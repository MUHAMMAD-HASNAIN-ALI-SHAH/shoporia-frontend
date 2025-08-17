import type { Order } from "@/interface/interface";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface Cart {
  _id?: string;
  email?: string;
  paymentStatus?: string;
}

interface CartState {
  cart: Cart | null;
  orders: Order[];
  isLoading: boolean;
  addToCartLoader: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (orderId: string, quantity: number) => Promise<void>;
  removeFromCart: (orderId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  orders: [],
  isLoading: false,
  addToCartLoader: false,

  // Get current cart and its orders
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/v4/cart");
      set({
        cart: response.data.cart,
        orders: response.data.orders || [],
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add item
  addToCart: async (productId, quantity) => {
    set({ addToCartLoader: true });
    try {
      const response = await axiosInstance.post("/api/v4/cart/add", {
        productId,
        quantity,
      });
      toast.success("Item added to cart successfully");
      set({
        cart: response.data.cart,
        orders: response.data.orders,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      set({ addToCartLoader: false });
    }
  },

  // Update item quantity
  updateQuantity: async (orderId, quantity) => {
    try {
      const response = await axiosInstance.put("/api/v4/cart/update", {
        orderId,
        quantity,
      });
      toast.success("Cart updated successfully");
      set({ orders: response.data.orders });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  },

  // Remove item
  removeFromCart: async (orderId) => {
    try {
      const response = await axiosInstance.delete(`/api/v4/cart/remove/${orderId}`);
      toast.success("Item removed from cart successfully");
      set({ orders: response.data.orders });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      await axiosInstance.delete("/api/v4/cart/clear");
      toast.success("Cart cleared successfully");
      set({ orders: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },
}));
