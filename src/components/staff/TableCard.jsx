import { FiCheckCircle, FiClock, FiLoader, FiThumbsUp, FiUsers } from "react-icons/fi";
import OrderItem from "./OrderItem";
import { getTableStats } from "../../utils/staffStats";
import { FEATURED_TABLE_ID } from "../../utils/staffConstants";

function TableCard({ table, onConfirm }) {
    const { pendingCount, servedCount, totalCount, progressPercent, isComplete } = getTableStats(table);
    const featured = table.id === FEATURED_TABLE_ID;

    return (
        <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden ${featured ? "border-[#C8102E] ring-2 ring-[#C8102E]/20" : "border-slate-200"}`}>
            <div className={`p-4 border-b border-slate-100 flex items-center justify-between ${featured ? "bg-red-50/60" : "bg-slate-50/70"}`}>
                <div className="flex items-center gap-2.5">
                    <span className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-extrabold text-sm ${isComplete ? "bg-emerald-500" : "bg-slate-900"}`}>
                        {table.code.replace("BÀN ", "")}
                    </span>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-slate-900 text-base">{table.code}</h3>
                            {featured && <span className="text-[10px] font-black uppercase bg-[#C8102E] text-white px-1.5 py-0.5 rounded">Trọng tâm</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><FiUsers className="text-[10px]" /> {table.guestCount} khách</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><FiClock className="text-[10px]" /> {table.orderTime}</span>
                        </div>
                    </div>
                </div>
                {isComplete ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <FiCheckCircle /> Đã đủ món
                    </span>
                ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <FiLoader className="animate-spin" style={{ animationDuration: "3s" }} /> Chờ {pendingCount} món
                    </span>
                )}
            </div>

            <div className="px-4 pt-3 pb-1">
                <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Tiến độ phục vụ:</span>
                    <span className={`font-extrabold ${isComplete ? "text-emerald-600" : "text-slate-700"}`}>
                        {servedCount}/{totalCount} món ({progressPercent}%)
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isComplete ? "bg-emerald-500" : "bg-[#C8102E]"}`} style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            <div className="p-3.5 divide-y divide-slate-100 flex-1 overflow-y-auto max-h-72">
                {table.items.map((item) => (
                    <OrderItem key={item.id} item={item} onConfirm={() => onConfirm(table.id, item.id)} />
                ))}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Mã order: #ORD-{table.id.toUpperCase()}</span>
                {isComplete ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1"><FiThumbsUp /> Hoàn thành</span>
                ) : (
                    <span className="text-[#C8102E] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" /> Cần phục vụ
                    </span>
                )}
            </div>
        </div>
    );
}

export default TableCard;
