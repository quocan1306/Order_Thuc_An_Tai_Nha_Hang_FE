import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiBell, FiShoppingCart, FiUser } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { categories } from "../../data/mockData";

const Header = ({ tableNo = "108", cartCount = 0, onCallStaff }) => {
  const [activeTab, setActiveTab] = useState("single");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-md bg-white shadow-sm">
      {/* Thanh trên cùng */}
      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
        <div className="flex items-center">
          <img
            src="/logo.jpg"
            alt="SmartDine Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={onCallStaff || (() => alert("Đã gửi yêu cầu gọi nhân viên."))}
          className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
        >
          <FiBell className="h-3.5 w-3.5" />
          <span>Gọi NV</span>
        </button>

        <div className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-800">
          Bàn {tableNo}
        </div>

        <div className="flex items-center gap-2.5 text-gray-700">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label="Mở giỏ hàng"
            className="relative p-1"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => alert("Chức năng tài khoản đang được phát triển.")}
            aria-label="Tài khoản"
            className="p-1"
          >
            <FiUser className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => alert("Chức năng yêu thích đang được phát triển.")}
            aria-label="Yêu thích"
            className="p-1 text-red-600"
          >
            <FaStar className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Danh mục */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => navigate(cat.id === "all" ? "/" : `/?cat=${cat.id}`)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
              activeCat === cat.id
                ? "bg-red-600 font-bold text-white"
                : "bg-gray-100 font-medium text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;