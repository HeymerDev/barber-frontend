import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import { PublicLayout } from "./layouts/PublicLayout";
import { BarberLayout } from "./layouts/BarberLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        index: true,
        element: <h2>Book</h2>,
      },
    ],
  },

  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,

        children: [
          {
            index: true,
            element: <h2>Admin</h2>,
          },
        ],
      },

      {
        path: "/barber",
        element: <BarberLayout />,

        children: [
          {
            index: true,
            element: <h2>Barbero</h2>,
          },
        ],
      },
    ],
  },
]);

export default router;
