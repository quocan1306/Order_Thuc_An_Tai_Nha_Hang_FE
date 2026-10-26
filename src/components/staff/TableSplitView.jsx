import { getTableStats } from "../../utils/staffStats";
import OrderStatusBadge from "./OrderStatusBadge";
import ConfirmButton from "./ConfirmButton";
import { STAFF } from "../../utils/staffConstants";

function TableListItem({ table, selected, onSelect }) {
    const s = getTableStats(table);
    return (
        <div
            onClick={onSelect}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${selected ? "bg-red-50 border-[#C8102E]" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
        >
            <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-lg text-white font-extrabold text-xs flex items-center justify-center ${s.isComplete ? "bg-emerald-600" : "bg-slate-800"}`}>
                    {table.code.replace("BÀN ", "")}
                </span>
                <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{table.code}</h4>
                    <p className="text-xs text-slate-500">{table.guestCount} khách • {table.orderTime}</p>
                </div>
            </div>
            <div className="text-right">
                {s.isComplete ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">Đủ món</span>
                ) : (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">Chờ {s.pendingCount} món</span>
                )}
                <div className="text-[10px] text-slate-400 mt-1 font-semibold">{s.servedCount}/{s.totalCount} món</div>
            </div>
        </div>
    );
}

function DetailPane({ table, onConfirm, onMarkAll }) {
    const s = getTableStats(table);
    return (
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[750px] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-black text-slate-900">{table.code} - CHI TIẾT GIAO MÓN</h2>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${s.isComplete ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-300"}`}>
                            {s.isComplete ? "ĐÃ GIAO ĐỦ MÓN" : "ĐANG CHỜ PHỤC VỤ"}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Số khách: {table.guestCount} người • Gọi món: {table.orderTime}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs font-medium text-slate-500">Tiến độ đĩa món</span>
                    <div className="text-lg font-black text-slate-900">{s.servedCount} / {s.totalCount} món</div>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-slate-100 py-3 pr-2">
                {table.items.map((item) => (
                    <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img src={item.img} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-[#C8102E]/10 text-[#C8102E] font-black text-xs px-2 py-0.5 rounded">SL: {item.qty}</span>
                                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                                    {item.isChilled && <span className="bg-[#F59E0B] text-[10px] font-black px-1.5 rounded text-slate-900">CHILLED MEAT</span>}
                                </div>
                                {item.note ? (
                                    <div className="text-xs text-amber-800 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-block mt-1">
                                        Bếp lưu ý: {item.note}
                                    </div>
                                ) : (
                                    <div className="text-xs text-slate-400 mt-1 italic">Không có ghi chú thêm</div>
                                )}
                            </div>
                        </div>
                        {item.status === "SERVED" ? (
                            <OrderStatusBadge className="text-xs px-3 py-2 rounded-xl" />
                        ) : (
                            <ConfirmButton onClick={() => onConfirm(table.id, item.id)} className="px-4 py-2 text-xs rounded-xl" />
                        )}
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Nhân viên phụ trách: <strong>{STAFF.name}</strong></span>
                {!s.isComplete && (
                    <button onClick={() => onMarkAll(table.id)} className="text-[#C8102E] font-bold hover:underline">
                        ✓ Đánh dấu giao toàn bộ bàn này
                    </button>
                )}
            </div>
        </div>
    );
}

function TableSplitView({ tables, selectedTable, onSelect, onConfirm, onMarkAll }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-[750px] flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h3 className="font-bold text-slate-900 text-sm">Danh sách bàn ăn</h3>
                    <span className="text-xs text-slate-500">Chọn bàn để xem chi tiết</span>
                </div>
                <div className="overflow-y-auto space-y-2 flex-1 pr-1">
                    {tables.map((t) => (
                        <TableListItem key={t.id} table={t} selected={t.id === selectedTable?.id} onSelect={() => onSelect(t.id)} />
                    ))}
                </div>
            </div>
            {selectedTable && <DetailPane table={selectedTable} onConfirm={onConfirm} onMarkAll={onMarkAll} />}
        </div>
    );
}

export default TableSplitView;
