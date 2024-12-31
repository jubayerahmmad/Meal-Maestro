// import React from "react";
// import MainLayout from "../Layouts/MainLayout";
// import Home from "../pages/Home/Home/Home";
// import Menu from "../pages/Menu/Menu";
// import Order from "../pages/Order/Order";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/AuthPages/Login";
import Register from "../pages/AuthPages/Register";
import PrivateRoute from "./PrivateRoute";
const MainLayout = lazy(() => import("../Layouts/MainLayout"));
const Home = lazy(() => import("../pages/Home/Home/Home"));
const Menu = lazy(() => import("../pages/Menu/Menu"));
const Order = lazy(() => import("../pages/Order/Order"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: (
          <PrivateRoute>
            <Menu></Menu>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:category",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
