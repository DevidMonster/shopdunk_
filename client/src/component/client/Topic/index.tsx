import React from "react";
import { Link } from "react-router-dom";

const Topic = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <button className="border rounded-xl flex justify-around items-center px-5 py-10  bg-white hover:drop-shadow-xl">
        <div className="w-[28%]">
          <img
            src="https://shopdunk.com/images/uploaded/trang%20danh%20muc/iphone/Image-Standard.png"
            alt=""
          />
        </div>
        <div className="w-[40%] mr-20">
          <p className="text-2xl font-semibold mb-5">
            Tìm Iphone phù hợp với bạn
          </p>
          <Link className="text-blue-600" to={`iphone`}>
            So sánh các Iphone{" "}
          </Link>
        </div>
      </button>
      <button className="border rounded-xl flex justify-around items-center px-5 py-10  bg-white hover:drop-shadow-xl">
        <div className="w-[28%]">
          <img
            src="https://shopdunk.com/images/uploaded/trang%20danh%20muc/iphone/Image-Standard-1.png"
            alt=""
          />
        </div>
        <div className="w-[40%] mr-20">
          <p className="text-2xl font-semibold mb-5">
            Tìm Iphone phù hợp với bạn
          </p>
          <Link className="text-blue-600" to={`iphone`}>
            So sánh các Iphone{" "}
          </Link>
        </div>
      </button>
    </div>
  );
};

export default Topic;
