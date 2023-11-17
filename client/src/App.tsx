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
import ScrollToTop from "./component/ScrollToTop";
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
import Voucher from "./pages/admin/Voucher/Voucher";
import BannerList from "./pages/admin/Banner/BannerList";
import AddBanner from "./pages/admin/Banner/AddBanner";
import EditBanner from "./pages/admin/Banner/EditBanner";
import ListComment from "./pages/admin/Comment/ListComment";
// import "./App.css";

function App() {

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
          <Route path="voucher" element={<Voucher/>}></Route>
          <Route path="banner" element={<BannerList/>}></Route>
          <Route path="banner/add" element={<AddBanner/>}></Route>
          <Route path="banner/:id" element={<EditBanner/>}></Route>
          <Route path="comment" element={<ListComment/>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
