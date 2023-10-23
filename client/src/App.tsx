import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";
import Product from "./pages/client/Product";
import Home from "./pages/client/Home";
import ProductDetail from "./pages/client/ProductDetail";
import LoginPage from "./pages/client/Login";
import RegisterPage from "./pages/client/Register";
// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth">
        </Route>
        <Route path="/" element={<LayoutClient/>}>
            <Route index element={<Home/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="products" element={<Product/>} />
            <Route path="products/:id" element={<ProductDetail/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
