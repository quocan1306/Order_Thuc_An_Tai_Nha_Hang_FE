import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { useOrder } from "../context/OrderContext";
import CartHeader from "../components/cart/CartHeader";

function CalledOrders() {
  const navigate = useNavigate();
  const { calledOrders } = useOrder();

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const totalPrice = calledOrders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (orderSum, item) => orderSum + item.price * item.quantity,
        0
      ),
    0
  );

  const totalQuantity = calledOrders.reduce(
    (sum, order) =>
      sum + order.items.reduce((orderSum, item) => orderSum + item.quantity, 0),
    0
  );

  return (
    <div className="-m-3 min-h-screen bg-gray-100 pb-44">
      <header className="sticky top-0 z-20 bg-white">
        <CartHeader title="Gọi món của bạn" />

        <div className="grid grid-cols-2 border-b border-gray-200 text-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="border-b-2 border-transparent py-3 font-medium text-gray-500"
          >
            Giỏ đồ ăn
          </button>

          <button
            type="button"
            className="border-b-2 border-red-700 py-3 font-semibold text-red-700"
          >
            Món đã gọi
          </button>
        </div>
      </header>

      {calledOrders.length === 0 ? (
        <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <FiShoppingBag
              className="h-9 w-9 text-red-700"
              strokeWidth={1.6}
            />
          </div>

          <p className="mt-4 text-lg text-gray-900">Bạn chưa gọi món nào</p>
          <p className="mt-1 text-xs text-gray-500">
            Món sẽ xuất hiện ở đây sau khi bạn xác nhận gọi món.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 rounded-xl bg-red-700 px-8 py-3 text-sm font-medium text-white active:bg-red-800"
          >
            Xem thực đơn
          </button>
        </div>
      ) : (
        <main className="space-y-6 p-3">
          {calledOrders.map((order, index) => {
            const orderQuantity = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return (
              <section key={order.id}>
                <div className="mb-3 flex items-center justify-between text-sm font-semibold text-gray-900">
                  <span className="flex items-center gap-1.5">
                    <FiClock className="h-4 w-4 text-gray-400" />
                    Lượt {calledOrders.length - index} - Giờ {order.time}
                  </span>
                  <span className="text-red-700">{orderQuantity} món</span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
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
                          <span className="text-xs text-gray-500">
                            SL: {item.quantity}
                          </span>
                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      )}

      {calledOrders.length > 0 && (
        <div className="fixed bottom-[60px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-white p-4 shadow-[0_-4px_14px_rgba(0,0,0,0.08)]">
          <p className="mb-3 text-xs text-red-700">
            Tổng tiền chưa bao gồm VAT và phí dịch vụ
          </p>


          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="flex w-full items-center justify-between rounded-xl bg-red-700 px-4 py-4 text-white active:bg-red-800"
          >
            <span className="font-semibold">
              {formatPrice(totalPrice)}
            </span>

            <span className="flex items-center gap-2 font-semibold">
              Thanh toán
              <FiArrowRight className="h-5 w-5" />
            </span>
          </button>


          <p className="mt-2 text-right text-xs text-gray-500">
            Tổng số lượng: {totalQuantity} món
          </p>
        </div>
      )}
    </div>
  );
}

export default CalledOrders;