import { FiEdit2 } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import ConfirmButton from "./ConfirmButton";

function OrderItem({ item, onConfirm }) {
    return (
        <div className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    {item.isChilled && (
                        <span className="absolute top-0 right-0 bg-[#F59E0B] text-[8px] font-black text-slate-900 px-1 rounded-bl">CHILLED</span>
                    )}
                </div>
                <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-xs text-[#C8102E]">x{item.qty}</span>
                        <h4 className="font-bold text-xs text-slate-900 truncate" title={item.name}>{item.name}</h4>
                    </div>
                    {item.note && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold px-1.5 rounded mt-0.5">
                            <FiEdit2 className="text-[9px]" /> {item.note}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex-shrink-0">
                {item.status === "SERVED" ? <OrderStatusBadge /> : <ConfirmButton onClick={onConfirm} />}
            </div>
        </div>
    );
}

export default OrderItem;
