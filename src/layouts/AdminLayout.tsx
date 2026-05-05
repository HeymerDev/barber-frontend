import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth";

export const AdminLayout = () => {
  const role = useAuthStore((state) => state.role);

  if (role !== "admin") {
    return <Navigate to="/403" />;
  }

  return <Outlet />;
};
