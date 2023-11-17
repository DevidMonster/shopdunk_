import Header from "../component/client/Header";
import Footer from "../component/client/Footer";
import { Outlet } from "react-router-dom";
import Sub from "../component/client/Subscribe";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getToken } from "../api/auth";
import { saveTokenAndUser } from "../slice/auth.slice";
import { setCartName, setItem } from "../slice/cart.slice";

const LayoutClient = () => {
  const dispatch = useDispatch();
  const getTokenAndUser = async () => {
    const { data } = await getToken();
    if (data) {
      dispatch(
        saveTokenAndUser({ accessToken: data.accessToken, user: data.data })
      );
      dispatch(setCartName(data.data.email || "cart"));
    }
    dispatch(setItem());
  };
  useEffect(() => {
    getTokenAndUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
