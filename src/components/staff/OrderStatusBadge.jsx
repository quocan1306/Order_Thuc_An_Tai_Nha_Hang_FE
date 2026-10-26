import { FiCheckCircle } from "react-icons/fi";

function OrderStatusBadge({ className = "" }) {
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg select-none ${className}`}>
            <FiCheckCircle />
            <span>ĐÃ NHẬN MÓN</span>
        </span>
    );
}

export default OrderStatusBadge;
