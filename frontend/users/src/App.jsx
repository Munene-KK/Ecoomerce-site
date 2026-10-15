import Footer from "./componets/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Viewproduct from "./pages/Viewproduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Electronics from "./pages/categories/Electronics";
import Deco from "./pages/categories/Deco";
import MainLayout from "./componets/MainLayout";
import Cart from "./pages/Cart";
import ViewCart from "./pages/ViewCart";
import Account from "./pages/Account";
const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/buy/:id" element={<Viewproduct />} />
            <Route path="/products/electronics" element={<Electronics />} />
            <Route path="/products/deco" element={<Deco />} />
            <Route path="/user/account" element={<Account />} />
          </Route>
          <Route path="/products/account/cart/:id" element={<Cart />} />
          <Route path="/products/viewcart" element={<ViewCart />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
};

export default App;
