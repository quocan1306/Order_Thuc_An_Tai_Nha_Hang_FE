import { FiBell, FiCheck, FiX } from "react-icons/fi";

function ConfirmModal({ pending, onCancel, onConfirm }) {
    if (!pending) return null;
    const { table, item } = pending;

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2 text-[#C8102E]">
                        <FiBell className="text-lg" />
                        <h4 className="font-bold text-slate-900">Xác nhận đã giao món</h4>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 p-1" onClick={onCancel}><FiX /></button>
                </div>
                <div className="p-6 text-center">
                    <h3 className="font-extrabold text-slate-900 text-lg mb-1">{item.name} (SL: {item.qty})</h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Giao tận tay khách tại <strong className="text-[#C8102E]">{table.code}</strong>
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-left mb-5 space-y-1 text-slate-600">
                        <p>• <strong>Ghi chú bếp:</strong> <span className="text-amber-700 font-semibold">{item.note || "Không có ghi chú"}</span></p>
                        <p>• <strong>Thời gian chờ:</strong> {table.waitMinutes} phút</p>
                        <p>• Sau khi xác nhận, món chuyển sang <strong>ĐÃ NHẬN MÓN</strong>.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition" onClick={onCancel}>
                            Hủy bỏ
                        </button>
                        <button className="py-2.5 px-4 bg-[#C8102E] hover:bg-[#990B22] text-white rounded-xl text-xs font-extrabold transition active:scale-95 flex items-center justify-center gap-1.5" onClick={onConfirm}>
                            <FiCheck /> Đã giao xong
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
