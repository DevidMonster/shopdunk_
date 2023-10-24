import React from "react";
import Banner from "../../component/client/Banner";
import Sub from "../../component/client/Subscribe";
import Navbar from "../../component/client/Nav";
import Item from "../../component/client/Item";
import Category from "../../component/client/Category";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Topic from "../../component/client/Topic";
import Description from "../../component/client/Category-Description";
import Comment from "../../component/client/Comment";
import FeedBack from "../../component/client/Feedback";

const Product = () => {
  return (
    <div>
      <div className="">
        <div className="bg-white ">
          <div className="max-w-7xl mx-auto">
            <Navbar />
          </div>
        </div>
        <div className="bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div>
              <div>
                <div className="text-center text-4xl font-semibold mb-5">
                  iphone
                </div>
                <div>
                  <Banner />
                </div>
                <div className="my-3">
                  <Category />
                </div>
                <div>
                  <Item />
                </div>
              </div>
              <div className="text-center py-10">
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </div>
            <div>
              <Topic />
            </div>
            <div className="mt-10">
              <Description />
            </div>
            <div className="my-10">
              <FeedBack />
            </div>
            <div className="pb-10">
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
