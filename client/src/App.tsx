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
import ScrollToTop from "./component/ScrollToTop";
import { setCartName, setItem } from "./slice/cart.slice";
import UserList from "./pages/admin/User/UserList";
import EditUser from "./pages/admin/User/EditUser";
import AddUser from "./pages/admin/User/AddUser";
import SearchResultPage from "./pages/client/SearchResultPage";
import AccountDetail from "./pages/client/AccountDetait";
import Cart from "./pages/client/Cart";
import ShoppingCart from "./pages/client/ShoppingCart";
import BranchList from "./pages/admin/Branch/BranchList";
import AddBranch from "./pages/admin/Branch/AddBranch";
import EditBranch from "./pages/admin/Branch/EditBranch";
import OrderList from "./pages/admin/Order/OrderList";
// import "./App.css";

function App() {
  const dispatch = useDispatch()
  const getTokenAndUser = async() => {
    const { data } = await getToken()
    if(data) {
      dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data}))
      dispatch(setCartName(data.data.email || 'cart'))
    }
    dispatch(setItem())
  }
  useEffect(() => {
    getTokenAndUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path="/auth"></Route>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchResultPage />} />
          <Route path="account" element={<AccountDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shoppingCart/completed/:id" element={<ShoppingCart link="/account"/>} />
          <Route path=":category" element={<Product />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />}></Route>
          <Route path="dashboard" element={<DashBoard />}></Route>
          <Route path="products" element={<ProductsList />}></Route>
          <Route path="products/:id" element={<EditProduct />}></Route>
          <Route path="products_add" element={<AddProduct />}></Route>
          <Route path="categories" element={<CategoriesList />}></Route>
          <Route path="users" element={<UserList />}></Route>
          <Route path="users/edit/:id" element={<EditUser />}></Route>
          <Route path="users/add" element={<AddUser />}></Route>
          <Route path="branch" element={<BranchList />}></Route>
          <Route path="branch/add" element={<AddBranch />}></Route>
          <Route path="branch/edit/:id" element={<EditBranch />}></Route>
          <Route path="order" element={<OrderList />}></Route>
          <Route path="order/:id" element={<ShoppingCart link="/admin/order"/>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
