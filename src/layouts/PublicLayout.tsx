import { Toaster } from "sonner";
import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <>
      <Toaster position="bottom-right" theme="system" />
      <Outlet />
    </>
  );
};
