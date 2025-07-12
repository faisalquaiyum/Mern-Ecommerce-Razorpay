import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Footer from "./components/Footer";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfimation";
import CustomerServicePage from "./components/CustomerServicePage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      {/*to stick footer on bottom when content empty */}
      <div className="min-h-screen flex flex-col">
        <BrowserRouter>
          <Navbar />
          <main className="flex-grow">
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<ShowProduct />} />
              <Route path="/product/search/:term" element={<SearchProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/customer-service" element={<CustomerServicePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Address />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/orderconfirmation"
                element={<OrderConfirmation />}
              />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
