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
import Dashboard from "../Layouts/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
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
        element: <Order></Order>,
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Admin Routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },

      // Users Route
      {
        path: "cart",
        element: <Cart></Cart>,
      },
    ],
  },
]);
