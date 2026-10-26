
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import { useOrder } from "../context/OrderContext";
import CartHeader from "../components/cart/CartHeader";
import EmptyCart from "../components/cart/EmptyCart";

function Cart() {
  const navigate = useNavigate();

  const { cart, changeQuantity, removeFromCart, placeOrder } = useOrder();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  // Mở modal xác nhận xóa món
  const handleAskDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  // Xác nhận xóa món khỏi giỏ hàng
  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    removeFromCart(selectedItem.id);
    setSelectedItem(null);
    setShowDeleteModal(false);
  };

  // Đóng modal và giữ nguyên món ăn
  const handleCancelDelete = () => {
    setSelectedItem(null);
    setShowDeleteModal(false);
  };

  // Xác nhận gọi món, không hiện popup mặc định của trình duyệt
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const order = placeOrder();

    if (order) {
      navigate("/called-orders");
    }
  };

  const isEmpty = cart.length === 0;

  return (
    <>
      <div
        className={`-m-3 min-h-screen bg-gray-100 ${
          isEmpty ? "" : "pb-44"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white">
          <CartHeader />

          <div className="grid grid-cols-2 border-b border-gray-200 text-center text-sm">
            <button
              type="button"
              className="border-b-2 border-red-700 py-3 font-semibold text-red-700"
            >
              Giỏ đồ ăn
            </button>

            <button
              type="button"
              onClick={() => navigate("/called-orders")}
              className="border-b-2 border-transparent py-3 font-medium text-gray-500"
            >
              Món đã gọi
            </button>
          </div>
        </header>

        {/* Nội dung giỏ hàng */}
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <main className="space-y-3 p-3">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 rounded-xl bg-gray-100 object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <h2 className="line-clamp-2 text-sm font-semibold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-red-700">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Tăng giảm số lượng */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label="Giảm số lượng"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-800 active:bg-gray-200"
                        >
                          <FiMinus className="h-4 w-4" />
                        </button>

                        <span className="min-w-5 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label="Tăng số lượng"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white active:bg-red-800"
                        >
                          <FiPlus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Nút mở modal xác nhận xóa */}
                      <button
                        type="button"
                        onClick={() => handleAskDelete(item)}
                        aria-label={`Xóa ${item.name}`}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* Gọi thêm món */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border border-dashed border-red-300 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                + Gọi thêm món
              </button>
            </main>

            {/* Thanh tạm tính cố định */}
            <div className="fixed bottom-[60px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-white p-4 shadow-[0_-4px_14px_rgba(0,0,0,0.08)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gray-600">Tạm tính</span>

                <strong className="text-lg text-gray-900">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full rounded-xl bg-red-700 px-4 py-4 font-semibold text-white transition active:bg-red-800"
              >
                Xác nhận gọi món
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal xác nhận xóa món */}
      {showDeleteModal && selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5"
          onClick={handleCancelDelete}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Nút đóng */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancelDelete}
                aria-label="Đóng"
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Icon cảnh báo */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiAlertTriangle className="h-7 w-7" />
            </div>

            {/* Nội dung xác nhận */}
            <h2
              id="delete-modal-title"
              className="mt-4 text-center text-lg font-bold text-gray-900"
            >
              Xóa món ăn?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Bạn có chắc muốn xóa{" "}
              <span className="font-semibold text-gray-900">
                {selectedItem.name}
              </span>{" "}
              khỏi giỏ hàng không?
            </p>

            {/* Nút thao tác */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:bg-gray-100"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-700 py-3 text-sm font-semibold text-white transition hover:bg-red-800 active:bg-red-900"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
