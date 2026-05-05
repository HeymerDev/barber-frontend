import { Navigate, Outlet } from "react-router";

export const PrivateLayout = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
