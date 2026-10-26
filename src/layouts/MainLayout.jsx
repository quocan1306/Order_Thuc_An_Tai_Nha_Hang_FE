
import Header from "../components/layout/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import {
  FiHome,
  FiClipboard,
  FiClock,
  FiBell,
} from "react-icons/fi";

function MainLayout({
  children,
  tableNo = "108",
  onCallStaff,
  showHeader = true,
}) {
  const { cart, calledOrders } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  // Số lượng món đang nằm trong giỏ, chưa xác nhận gọi
  const cartCount = (cart || []).reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // Số lượng món đã xác nhận gọi
  const calledCount = (calledOrders || []).reduce(
    (total, order) =>
      total +
      (order.items || []).reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      ),
    0
  );

  const isHome = location.pathname === "/";
  const isCalledOrders =
    location.pathname === "/called-orders" || location.pathname === "/cart";

  const navClass = (active) =>
    `relative flex flex-col items-center text-[11px] ${
      active
        ? "font-semibold text-red-600"
        : "text-gray-500 hover:text-red-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="relative flex min-h-screen w-full max-w-md flex-col bg-white pb-16 shadow-xl">
        {showHeader && (
          <Header
            tableNo={tableNo}
            cartCount={cartCount}
            onCallStaff={onCallStaff}
          />
        )}

        <main className="min-h-0 flex-1 p-3">
          {children}
        </main>

        <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-gray-200 bg-white px-4 py-2">
          <button
            onClick={() => navigate("/")}
            className={navClass(isHome)}
          >
            <FiHome className="mb-0.5 h-5 w-5" />
            <span>Thực đơn</span>
          </button>

          <button
            onClick={() => navigate("/called-orders")}
            className={navClass(isCalledOrders)}
          >
            <FiClipboard className="mb-0.5 h-5 w-5" />
            <span>Đơn đã gọi</span>

            {calledCount > 0 && (
              <span className="absolute -top-1 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                {calledCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/history")}
            className={navClass(location.pathname === "/history")}
          >
            <FiClock className="mb-0.5 h-5 w-5" />
            <span>Lịch sử</span>
          </button>

          <button
            onClick={
              onCallStaff ||
              (() => alert("Đã gửi yêu cầu gọi phục vụ."))
            }
            className={navClass(false)}
          >
            <FiBell className="mb-0.5 h-5 w-5 text-red-500" />
            <span>Gọi phục vụ</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MainLayout;
