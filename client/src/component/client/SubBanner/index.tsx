import React from "react";
import { Link } from "react-router-dom";


const SubBanner = () => {
  return (
    <div className="mt-10">
      <Link to={``}>
        <img
          className="w-full"
          src="https://shopdunk.com/images/uploaded/Trang%20ch%E1%BB%A7/2.jpeg"
          alt=""
        />
      </Link>
    </div>
  );
};

export default SubBanner;
