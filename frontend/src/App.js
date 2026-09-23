import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { OrderProvider } from "@/context/OrderContext";
import Header from "@/components/restaurant/Header";
import Footer from "@/components/restaurant/Footer";
import HomePage from "@/components/restaurant/RestaurantSite";
import MenuPage from "@/components/order/MenuPage";
import CartSheet from "@/components/order/CartSheet";
import SignInDialog from "@/components/order/SignInDialog";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <ScrollToTop />
        <div className="bg-[#0d0b09] min-h-screen">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CartSheet />
        <SignInDialog />
        <Toaster theme="dark" position="top-center" richColors={false} />
      </OrderProvider>
    </BrowserRouter>
  );
}

export default App;
