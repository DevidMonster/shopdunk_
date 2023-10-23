import React from "react";
import Header from "../component/client/Header";
import Footer from "../component/client/Footer";
import { Outlet } from "react-router-dom";
import Sub from "../component/client/Subscribe";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <div className="bg-slate-100">
        <div className="max-w-7xl py-5 mx-auto">
          <Sub />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutClient;
