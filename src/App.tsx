import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import components
import Navbar from "./components/Navbar/Navbar";
// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Page404 from "./pages/Page404";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Pharma from "./pages/Pharma";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/login";
import ServiceBooking from "./pages/ServiceBooking";
import MedicineDetail from './pages/MedicineDetail';
import ProductDetail from './pages/ProductDetail';


// Styles
import "./assets/styles/_reset.scss";
import "./assets/styles/_variables.scss";
import "./assets/styles/style.scss";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pharma" element={<Pharma />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servicebooking" element={<ServiceBooking />} />
          <Route path="/service/:serviceId" element={<ServiceBooking />} />
          <Route path="/medicine/:id" element={<MedicineDetail />} />
          <Route path="/products/:categoryId/:subcategoryId/product/:productId" element={<ProductDetail />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
