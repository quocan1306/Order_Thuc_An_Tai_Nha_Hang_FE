import { FiClock, FiRefreshCw } from "react-icons/fi";

function PageTitle({ lastUpdated, refreshing, onRefresh }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                    Quản lý phục vụ món ăn tại bàn
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <FiClock /> Cập nhật: {lastUpdated}
                    </span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Theo dõi tiến độ bếp ra món, đối soát món ăn và xác nhận khi bàn giao cho thực khách.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onRefresh} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition active:scale-95">
                    <FiRefreshCw className={`text-[#C8102E] ${refreshing ? "animate-spin" : ""}`} />
                    <span>Làm mới dữ liệu</span>
                </button>
                <div className="text-xs bg-slate-200/70 text-slate-700 px-3 py-2 rounded-xl font-semibold hidden lg:block">
                    Ca làm việc: <span className="font-bold text-slate-900">17:00 - 23:00</span>
                </div>
            </div>
        </div>
    );
}

export default PageTitle;
