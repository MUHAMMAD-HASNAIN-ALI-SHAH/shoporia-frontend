import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

interface Address {
  _id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

interface ProfileState {
  address: Address | null;
  loading: boolean;
  error: string | null;

  fetchMyAddress: () => Promise<void>;
  saveAddress: (data: Address) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  address: null,
  loading: false,
  error: null,

  fetchMyAddress: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.get("/api/v7/address", { withCredentials: true });
      set({ address: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch address", loading: false });
    }
  },

  saveAddress: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.put("/api/v7/address", data, { withCredentials: true });
      toast.success("Address saved successfully");
      set({ address: res.data.address, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to save address", loading: false });
    }
  },
}));
