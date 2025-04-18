// lib/store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any | null;
  requireLogin: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  setRequireLogin: (requireLogin: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      requireLogin: false,
      setToken: (token) => set({ token, requireLogin: false }),
      setUser: (user) => set({ user, requireLogin: false }),
      setRequireLogin: (requireLogin) => set({ requireLogin }),
      clearAuth: () => set({ token: null, user: null, requireLogin: false }),
    }),
    {
      name: "auth-storage", // key trong localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // chỉ lưu token và user
    }
  )
);
