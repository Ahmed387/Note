import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Modal from "./components/Modal/Modal";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthRoutes from "./components/AuthRoutes/AuthRoutes";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,

          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "modal",
          element: (
            <ProtectedRoutes>
              <Modal />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <AuthRoutes>
              {" "}
              <Register />
            </AuthRoutes>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
