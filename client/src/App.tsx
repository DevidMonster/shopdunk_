import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import DashBoard from "./pages/admin/DashBoard";
import ProductsList from "./pages/admin/Product/ProductsList";
import EditProduct from "./pages/admin/Product/EditProduct";
import AddProduct from "./pages/admin/Product/AddProduct";
import LayoutClient from "./layout/LayoutClient";
import Product from "./pages/client/Product";
import Home from "./pages/client/Home";
import CategoriesList from "./pages/admin/Category/CategoriesList";
import ProductDetail from "./pages/client/ProductDetail";
import LoginPage from "./pages/client/Login";
import RegisterPage from "./pages/client/Register";
import NotFoundPage from "./pages/admin/NotFoundPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getToken } from "./api/auth";
import { saveTokenAndUser } from "./slice/auth.slice";
// import "./App.css";

function App() {
  const dispatch = useDispatch()
  const getTokenAndUser = async() => {
    const { data } = await getToken()
    dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data}))
  }
  useEffect(() => {
    getTokenAndUser()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/auth"></Route>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="products" element={<Product />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />}></Route>
          <Route path="dashboard" element={<DashBoard />}></Route>
          <Route path="products" element={<ProductsList />}></Route>
          <Route path="products/:id" element={<EditProduct />}></Route>
          <Route path="products_add" element={<AddProduct />}></Route>
          <Route path="categories" element={<CategoriesList />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
