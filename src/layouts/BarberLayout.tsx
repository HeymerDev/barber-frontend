import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth";

export const BarberLayout = () => {
  const role = useAuthStore((state) => state.role);
  if (role !== "barber") {
    return <Navigate to="/403" />;
  }

  return (
    <>
      <section className="pt-24 py-5">
        <Outlet />
      </section>
    </>
  );
};
