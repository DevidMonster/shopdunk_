import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import DashBoard from "./pages/admin/DashBoard";
import ProductsList from "./pages/admin/Product/ProductsList";
import EditProduct from "./pages/admin/Product/EditProduct";
import AddProduct from "./pages/admin/Product/AddProduct";
import LayoutClient from "./layout/LayoutClient";
import Product from "./pages/client/Product";
import Home from "./pages/client/Home";
// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth">
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />}></Route>
          <Route path="products" element={<ProductsList />}></Route>
          <Route path="products/:id" element={<EditProduct />}></Route>
          <Route path="products_add" element={<AddProduct />}></Route>
        </Route>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
