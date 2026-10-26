import { Navigate, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react
import { useCheckout } from "../context/CheckoutContext";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import OrderItems from "../components/checkout/OrderItems";
import PaymentDetails from "../components/checkout/PaymentDetails";
import BottomBar from "../components/checkout/BottomBar";
import "../styles/checkout.css";

export default function OrderSummary() {
    const navigate = useNavigate();
    const { items, totals, orderCode, reset } = useCheckout();

    // Vào thẳng trang này (hoặc tải lại) khi chưa có đơn → quay về bước xác nhận
    if (!orderCode) return <Navigate to="/checkout" replace />;

    const newOrder = () => { reset(); navigate("/"); };

    return (
        <div className="ck-page">
            <CheckoutHeader title="Chi tiết đơn hàng" onBack={() => navigate("/")} />
            <main className="ck-main">
                <section className="ck-code">
                    <p>Mã đơn hàng</p>
                    <h2>{orderCode}</h2>
                    <QRCodeSVG value={orderCode} size={168} />
                    <p>Vui lòng đưa mã QR hoặc mã đơn 8 ký tự này cho thu ngân</p>
                </section>
                <OrderItems items={items} />
                <PaymentDetails totals={totals} />
            </main>
            <BottomBar label="Đơn mới" onClick={newOrder} />
        </div>
    );
}
