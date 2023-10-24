import React from "react";
import Banner from "../../component/client/Banner";
import Item from "../../component/client/Item";
import Sub from "../../component/client/Subscribe";
import { Link } from "react-router-dom";
import SubBanner from "../../component/client/SubBanner";
import { MdArrowForwardIos } from "react-icons/md";


const Home = () => {
  return (
    <div>
      <div className="bg-[#f8f9fa]">
        <div className="max-w-full">
          <Banner />
        </div>
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
          <div className="mt-24">
            <div>
              <div className="text-center text-4xl font-semibold my-10">
                <Link to={`iphone`}>iphone</Link>
              </div>
              <div>
                <Item />
              </div>
              <div className="text-sky-600 my-10">
                <Link
                  to={`iphone`}
                  className="mx-auto p-2 w-60 flex justify-center items-center border-[1px] rounded-lg border-sky-600	"
                >
                  <p> Xem tất cả Iphone </p>
                  <MdArrowForwardIos />
                </Link>
              </div>
            </div>
            <div>
              <div className="text-center text-4xl font-semibold my-10">
                <Link to={`iphone`}>Ipad</Link>
              </div>
              <div>
                <Item />
              </div>
              <div className="text-sky-600 my-10">
                <Link
                  to={`iphone`}
                  className="mx-auto p-2 w-60 flex justify-center items-center border-[1px] rounded-lg border-sky-600	"
                >
                  <p> Xem tất cả Ipad </p>
                  <MdArrowForwardIos />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <SubBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
