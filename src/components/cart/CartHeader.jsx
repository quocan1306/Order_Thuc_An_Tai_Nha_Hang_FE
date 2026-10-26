import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function CartHeader({ tableNo = "108" }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Quay lại"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-800"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Giỏ đồ ăn</h1>
      </div>

      <div className="text-right">
        <p className="text-[11px] text-gray-500">Bạn đang ngồi tại</p>
        <p className="text-sm font-bold text-gray-900">Bàn {tableNo}</p>
      </div>
    </div>
  );
}

export default CartHeader;