import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import BottomBar from "../components/checkout/BottomBar";
import "../styles/checkout.css";

export default function Payment() {
    const navigate = useNavigate();
    const { totals, customer, setCustomer, method, setMethod, placeOrder } = useCheckout();
    const [errors, setErrors] = useState({});

    const bind = (key) => ({
        value: customer[key],
        onChange: (e) => setCustomer({ ...customer, [key]: e.target.value }),
    });

    const submit = () => {
        const next = {};
        if (!customer.name.trim()) next.name = "Vui lòng nhập họ và tên";
        if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email)) next.email = "Email không hợp lệ";
        setErrors(next);
        if (Object.keys(next).length) return;
        placeOrder();
        navigate("/order-summary");
    };

    return (
        <div className="ck-page">
            <CheckoutHeader title="Thanh toán" />
            <main className="ck-main ck-flat">
                <section className="ck-block">
                    <h2>Thông tin khách hàng</h2>
                    <label>Họ và tên
                        <input placeholder="Nhập họ và tên" {...bind("name")} aria-invalid={!!errors.name} />
                        {errors.name && <p className="ck-hint err">{errors.name}</p>}
                    </label>
                    <label>Gửi hóa đơn qua email
                        <input type="email" placeholder="Nhập email (không bắt buộc)" {...bind("email")} aria-invalid={!!errors.email} />
                        {errors.email && <p className="ck-hint err">{errors.email}</p>}
                    </label>
                </section>

                <section className="ck-block">
                    <h2>Phương thức thanh toán</h2>
                    <div className="ck-methods">
                        <button className={method === "online" ? "on" : ""} onClick={() => setMethod("online")}>
                            <span>📱</span>Thanh toán online
                        </button>
                        <button className={method === "cashier" ? "on" : ""} onClick={() => setMethod("cashier")}>
                            <span>💵</span>Thanh toán tại quầy
                        </button>
                    </div>
                    {method === "online" && (
                        <div className="ck-card ck-radio">
                            <span className="ck-qr-icon">▦</span>
                            <strong>VietQR</strong>
                            <i className="ck-dot" />
                        </div>
                    )}
                </section>
            </main>
            <BottomBar label="Đặt món" amount={totals.total} onClick={submit} />
        </div>
    );
}
