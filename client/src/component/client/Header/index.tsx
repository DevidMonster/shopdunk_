import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const Header = () => {
  return (
    <div className="static bg-[#515154] py-2 ">
      <div className="flex justify-around items-center max-w-7xl mx-auto">
        <div className="w-2/12">
          <Link to={`/`}>
            <img
              className="w-40"
              src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="w-full mx-5">
          <ul className="flex justify-around ">
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Iphone
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Ipad
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Mac
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Watch
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Âm thanh
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Phụ kiện
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Tin tức
              </Link>
            </li>
            <li>
              <Link className="text-[#d2d2d7] text-sm" to={`Iphone`}>
                Khuyến mại
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-2/12">
          <div className="hidden">
            <input type="text" />
          </div>
          <div className="flex justify-around">
            <Link to={`login`}>
              <IoIosSearch className="text-[white] text-2xl" />
            </Link>
            <Link to={`login`}>
              <BsBag className="text-[white]  text-2xl" />
            </Link>
            <Link to={`login`}>
              <AiOutlineUser className="text-[white]  text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
