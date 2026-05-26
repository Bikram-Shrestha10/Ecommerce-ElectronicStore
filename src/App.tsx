import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-150">
          
          {/* Header element */}
          <Navbar />
          
          {/* Main Layout body Router outlets */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              {/* <Route path="/cart" element={<Cart />} /> */}
              {/* <Route path="/checkout" element={<Checkout />} /> */}
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </main>

          {/* Sitemapped Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
