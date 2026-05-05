import { isAxiosError } from "axios";
import api from "../config/axios";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth";

export const login = async (email: string, password: string) => {
  try {
    const {
      data: { token, message, role },
    } = await api.post("/login", { email, password });
    localStorage.setItem("AUTH_TOKEN", token);
    useAuthStore.getState().setAuth(role);
    toast.success(message);
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};
