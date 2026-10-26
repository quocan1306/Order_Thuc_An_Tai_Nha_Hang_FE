import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext";
import { RESTAURANT_NAME, CURRENT_TABLE } from "../data/checkoutData";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import OrderItems from "../components/checkout/OrderItems";
import PaymentDetails from "../components/checkout/PaymentDetails";
import BottomBar from "../components/checkout/BottomBar";
import "../styles/checkout.css";

export default function Checkout() {
    const navigate = useNavigate();
    const { items, totals, promo, applyPromo } = useCheckout();
    const [code, setCode] = useState(promo.code);
    const [msg, setMsg] = useState(promo.code ? "Đã áp dụng mã giảm giá" : "");

    const onApply = () => setMsg(applyPromo(code) ? "Đã áp dụng mã giảm giá" : "Mã giảm giá không hợp lệ");

    return (
        <div className="ck-page">
            <CheckoutHeader title="Xác nhận đơn" />
            <main className="ck-main">
                <section className="ck-dining">

                    <img
                        src="/logo.jpg"
                        alt={`Logo ${RESTAURANT_NAME}`}
                        className="ck-dining-icon"
                    />

                    <div>
                        <small>Đang dùng bữa tại</small>
                        <strong>{RESTAURANT_NAME} · {CURRENT_TABLE.code}</strong>
                        <small>{CURRENT_TABLE.location}</small>
                    </div>
                </section>

                <OrderItems items={items} />

                <section className="ck-card">
                    <div className="ck-promo">
                        <span aria-hidden>🏷️</span>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="NHẬP MÃ GIẢM GIÁ"
                            aria-label="Mã giảm giá"
                        />
                        <button onClick={onApply} disabled={!code.trim()}>Áp dụng</button>
                    </div>
                    {msg && <p className={`ck-hint ${msg.startsWith("Đã") ? "ok" : "err"}`}>{msg}</p>}
                </section>

                <PaymentDetails totals={totals} />
            </main>
            <BottomBar label="Tiếp tục thanh toán" amount={totals.total} onClick={() => navigate("/payment")} />
        </div>
    );
}
