import { isAxiosError } from "axios";
import api from "../config/axios";
import { toast } from "sonner";

export const login = async (email: string, password: string) => {
  try {
    const {
      data: { token, message },
    } = await api.post("/login", { email, password });
    localStorage.setItem("AUTH_TOKEN", token);
    toast.success(message);
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};
