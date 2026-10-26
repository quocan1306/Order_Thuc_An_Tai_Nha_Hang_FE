import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
        <FiShoppingBag className="h-12 w-12 text-red-700" strokeWidth={1.5} />

        <p className="mt-4 text-lg text-gray-900">Giỏ đồ ăn của bạn đang trống</p>
        <p className="mt-1 text-xs text-gray-500">
          Thêm vài món ngon để bắt đầu nhé!
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 rounded-xl bg-red-700 px-8 py-3 text-sm font-medium text-white active:bg-red-800"
        >
          Xem thực đơn
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;