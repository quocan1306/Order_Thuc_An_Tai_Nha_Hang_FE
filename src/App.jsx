import { BrowserRouter, Routes, Route } from "react-router-dom";

import StaffLayout from "./layouts/StaffLayout";
import StaffService from "./pages/staff/StaffService";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CalledOrders from "./pages/CalledOrders";
import Checkout from "./pages/Checkout";           // thêm
import Payment from "./pages/Payment";             // thêm
import OrderSummary from "./pages/OrderSummary";   // thêm
import { OrderProvider } from "./context/OrderContext";
import { CheckoutProvider } from "./context/CheckoutContext"; // thêm

function App() {
  return (
    <OrderProvider>
      <CheckoutProvider>
        <BrowserRouter>
          <Routes>
            {/* Trang thực đơn */}
            <Route
              path="/"
              element={
                <MainLayout tableNo="108">
                  <Home />
                </MainLayout>
              }
            />

            {/* Chi tiết món */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Giỏ đồ ăn */}
            <Route
              path="/cart"
              element={
                <MainLayout tableNo="108" showHeader={false}>
                  <Cart />
                </MainLayout>
              }
            />

            {/* Món đã gọi */}
            <Route
              path="/called-orders"
              element={
                <MainLayout tableNo="108" showHeader={false}>
                  <CalledOrders />
                </MainLayout>
              }
            />

            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffService />} />
            </Route>

            {/* Thanh toán */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </BrowserRouter>
      </CheckoutProvider>
    </OrderProvider>
  );
}

export default App;