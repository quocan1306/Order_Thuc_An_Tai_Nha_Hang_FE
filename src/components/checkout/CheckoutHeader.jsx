
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CURRENT_TABLE } from "../../data/checkoutData";

export default function CheckoutHeader({ title, onBack }) {
    const navigate = useNavigate();

    return (
        <header className="ck-header">
            <button
                type="button"
                className="ck-back"
                onClick={onBack || (() => navigate(-1))}
                aria-label="Quay lại"
                title="Quay lại"
            >
                <FiArrowLeft size={22} strokeWidth={2} />
            </button>

            <h1>{title}</h1>

            <div className="ck-seat">
                <small>Bạn đang ngồi tại</small>
                <strong>{CURRENT_TABLE.code}</strong>
            </div>
        </header>
    );
}
