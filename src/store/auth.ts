import { create } from "zustand";

interface AuthState {
  role: string | null;
  isAuthenticated: boolean;

  setAuth: (role: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: localStorage.getItem("ROLE"),

  isAuthenticated: !!localStorage.getItem("AUTH_TOKEN"),

  setAuth: (role) =>
    set({
      role,
      isAuthenticated: true,
    }),

  logout: () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("ROLE");

    set({
      role: null,
      isAuthenticated: false,
    });
  },
}));
