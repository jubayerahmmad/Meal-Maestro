import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Loader from "../components/Loader";

const MainLayout = () => {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </Suspense>
  );
};

export default MainLayout;
