import React from "react";
import Banner from "../../component/client/Banner";
import Item from "../../component/client/Item";
import Sub from "../../component/client/Subscribe";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <div className="bg-[#f8f9fa]">
        <Banner />
        <div className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-3 gap-5 mb-16">
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/banner_thang10/Banner%20%C3%82m%20thanh.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/banner_thang10/Banner%20TCDM.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/bonus%20banner/387x166%201.png"
                alt=""
              />
            </div>
          </div>
          <Item />
        </div>
      </div>
      <div className="bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <Sub />
        </div>
      </div>
    </div>
  );
};

export default Home;
