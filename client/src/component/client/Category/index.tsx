import React from "react";
import { Link } from "react-router-dom";
import { GoGitCompare } from "react-icons/go";
import "./index.css"

const Category = () => {
  return (
    <div className="flex justify-between items-center h-28" >
      <div className=" w-[80%]">
        <ul className="py-5 flex w-[100%] overflow-x-auto">
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>Tất cả</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 15</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 14</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 13</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 12</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 11</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone SE</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 7</Link>
          </li>
          <li className="min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 pb-2 border-transparent hover:text-blue-500 hover:border-blue-500 	">
            <Link to={`iphone`}>iphone 6</Link>
          </li>
        </ul>
      </div>
      <div className="">
        <button className="bg-white flex justify-center items-center border px-5 py-3 rounded-md">
            <div className="mr-4 text-2xl">
                <GoGitCompare/>
            </div>
            <div className="text-base">
                So sánh Iphone
            </div>
        </button>
      </div>
    </div>
  );
};

export default Category;
