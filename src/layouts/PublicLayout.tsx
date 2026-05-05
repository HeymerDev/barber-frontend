import { Toaster } from "sonner";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth";

export const PublicLayout = () => {
  const role = useAuthStore((state) => state.role);
  const token = localStorage.getItem("AUTH_TOKEN");

  if (token) {
    return <Navigate to={`/${role}`} />;
  }
  return (
    <>
      <Toaster position="bottom-right" theme="system" />
      <Outlet />
    </>
  );
};
