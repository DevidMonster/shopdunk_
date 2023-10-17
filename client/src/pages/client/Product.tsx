import React from "react";
import Banner from "../../component/client/Banner";
import Sub from "../../component/client/Subscribe";
import Navbar from "../../component/client/Nav";
import Item from "../../component/client/Item";

const Product = () => {
  return (
    <div>
      <div className="">
        <div className="bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Navbar />
          </div>
        </div>
        <div className="">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-2xl font-semibold my-5">
              Iphone
            </div>
            <div>
              <Banner />
            </div>
            <div>
              <Item />
            </div>
          </div>
          <div></div>
        </div>
        <div className="bg-slate-100">
          <div className="max-w-7xl mx-auto">
            <Sub />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
