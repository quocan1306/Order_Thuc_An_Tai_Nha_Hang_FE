import { FiAlertTriangle, FiBell, FiCheckCircle, FiClock } from "react-icons/fi";
import ConfirmButton from "./ConfirmButton";
import { URGENT_WAIT_MINUTES } from "../../utils/staffConstants";

const HEADERS = ["Mã bàn", "Món ăn", "Số lượng", "Ghi chú bếp", "Thời gian gọi", "Trạng thái", "Thao tác"];

function PriorityView({ tables, onConfirm }) {
    const rows = tables
        .flatMap((table) => table.items.filter((i) => i.status === "PENDING").map((item) => ({ table, item })))
        .sort((a, b) => b.table.waitMinutes - a.table.waitMinutes);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="font-extrabold text-slate-900">Món đang chờ phục vụ (xếp theo thời gian chờ)</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Ưu tiên mang đến bàn nhanh nhất cho thực khách</p>
                </div>
                <div className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300 inline-flex items-center gap-1.5 self-start">
                    <FiAlertTriangle /> Cần phục vụ gấp các món chờ từ {URGENT_WAIT_MINUTES} phút
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[11px] font-extrabold uppercase text-slate-500 bg-slate-100 border-b border-slate-200">
                            {HEADERS.map((h, i) => (
                                <th key={h} className={`py-3 px-5 ${i === HEADERS.length - 1 ? "text-right" : ""}`}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-12 text-center text-slate-400">
                                    <FiCheckCircle className="text-emerald-500 text-3xl mx-auto mb-2" />
                                    <p className="font-bold text-slate-700">Không còn món nào đang chờ phục vụ.</p>
                                </td>
                            </tr>
                        ) : (
                            rows.map(({ table, item }) => {
                                const urgent = table.waitMinutes >= URGENT_WAIT_MINUTES;
                                return (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-3.5 px-5 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                                                    {table.code.replace("BÀN ", "")}
                                                </span>
                                                <span className="font-extrabold text-slate-900">{table.code}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-5">
                                            <div className="flex items-center gap-3">
                                                <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                                        {item.name}
                                                        {item.isChilled && <span className="bg-[#F59E0B] text-[9px] font-black px-1 rounded text-slate-900">CHILLED</span>}
                                                    </div>
                                                    <span className="text-[11px] text-slate-400">Mã: #{item.id.toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-5 font-black text-[#C8102E] whitespace-nowrap">x{item.qty}</td>
                                        <td className="py-3.5 px-5">
                                            {item.note ? (
                                                <span className="text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded">{item.note}</span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">--</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-5 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 text-xs font-bold ${urgent ? "text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse" : "text-slate-600"}`}>
                                                <FiClock /> {table.waitMinutes} phút trước
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                                                <FiBell /> Đang chờ giao
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                            <ConfirmButton onClick={() => onConfirm(table.id, item.id)} className="px-3 py-1.5 text-xs rounded-lg" />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PriorityView;
