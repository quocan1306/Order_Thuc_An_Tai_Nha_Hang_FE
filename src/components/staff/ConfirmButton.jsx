import { FiCheck } from "react-icons/fi";

function ConfirmButton({ onClick, className = "px-2.5 py-1.5 rounded-lg text-xs" }) {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-1.5 font-extrabold text-white bg-[#C8102E] hover:bg-[#990B22] active:scale-95 transition-all ${className}`}
        >
            <FiCheck />
            <span>Xác nhận đã giao</span>
        </button>
    );
}

export default ConfirmButton;
