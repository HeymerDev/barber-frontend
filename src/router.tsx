import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import { PublicLayout } from "./layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
