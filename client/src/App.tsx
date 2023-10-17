import { Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<LayoutClient/>}>
            <Route index element={<Home/>} />
            <Route path="product" element={<Product/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
