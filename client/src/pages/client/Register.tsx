import React from "react";
import Navbar from "../../component/client/Nav";
import Register from "../../component/client/Auth/Register";


const RegisterPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <Navbar />
      </div>
      <div>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
