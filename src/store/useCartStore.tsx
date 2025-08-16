import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface CartItem {
  product: {
    _id: string;
    name?: string;
    price?: number;
    images?: string;
  };
  quantity: number;
}

export interface Cart {
  _id?: string;
  email?: string; // ✅ corrected (backend uses email)
  items: CartItem[];
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  addToCartLoader: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  addToCartLoader: false,

  // Get current cart
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/v4/cart");
      set({ cart: response.data.cart ?? response.data });
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
      set({ cart: response.data.cart });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      set({ addToCartLoader: false });
    }
  },

  // Update item quantity (increase / decrease)
  updateQuantity: async (productId, quantity) => {
    try {
      const response = await axiosInstance.put("/api/v4/cart/update", {
        productId,
        quantity,
      });
      toast.success("Cart updated successfully");
      set({ cart: response.data.cart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  },

  // Remove item
  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v4/cart/remove/${productId}`
      );
      toast.success("Item removed from cart successfully");
      set({ cart: response.data.cart });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete("/api/v4/cart/clear");
      toast.success("Cart cleared successfully");
      set({ cart: response.data.cart });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },
}));
