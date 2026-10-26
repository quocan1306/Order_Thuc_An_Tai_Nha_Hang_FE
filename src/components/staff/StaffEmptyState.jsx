import { FiSearch } from "react-icons/fi";

function StaffEmptyState({ onReset }) {
    return (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl mb-3">
                <FiSearch />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Không tìm thấy bàn hoặc món phù hợp</h3>
            <p className="text-sm text-slate-500 mt-1">Thử từ khóa khác như "Bàn 01", "Ba chỉ heo" hoặc "Lõi vai".</p>
            <button className="mt-4 px-4 py-2 bg-[#C8102E] text-white text-xs font-bold rounded-xl" onClick={onReset}>
                Xem tất cả bàn
            </button>
        </div>
    );
}

export default StaffEmptyState;
