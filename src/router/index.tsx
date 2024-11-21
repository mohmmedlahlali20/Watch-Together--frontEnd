import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Login, Register } from "../components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
