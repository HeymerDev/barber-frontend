import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth";
import AdminNavbar from "../components/navigation/Navbar";
import { Toaster } from "sonner";

export const AdminLayout = () => {
  const role = useAuthStore((state) => state.role);

  if (role !== "admin") {
    return <Navigate to="/403" />;
  }

  return (
    <>
      <header>
        <AdminNavbar />
      </header>

      <section className="pt-24 py-5">
        <Outlet />
      </section>
      <Toaster position="bottom-right" theme="system" />
    </>
  );
};
