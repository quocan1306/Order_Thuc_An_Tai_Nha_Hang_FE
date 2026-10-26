
import { FiSearch, FiX } from "react-icons/fi";
import { FILTERS } from "../../utils/staffConstants";

function FilterToolbar({
    keyword,
    onKeywordChange,
    filter,
    onFilterChange,
    kpis,
}) {
    const tabs = [
        {
            key: FILTERS.ALL,
            label: `TẤT CẢ (${kpis.activeTables} bàn)`,
        },
        {
            key: FILTERS.PENDING,
            label: `CÓ MÓN CẦN PHỤC VỤ (${kpis.pendingTables} bàn)`,
        },
        {
            key: FILTERS.COMPLETED,
            label: `ĐÃ NHẬN ĐỦ MÓN (${kpis.completeTables} bàn)`,
        },
    ];

    return (
        <section className="mb-6 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative w-full min-w-0 xl:max-w-96">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        value={keyword}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        placeholder="Tìm bàn (VD: Bàn 05) hoặc tên món..."
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-[#C8102E] focus:bg-white focus:ring-2 focus:ring-[#C8102E]/20"
                    />

                    {keyword && (
                        <button
                            type="button"
                            aria-label="Xóa từ khóa tìm kiếm"
                            onClick={() => onKeywordChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 xl:w-auto xl:flex-wrap xl:justify-end xl:overflow-visible xl:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => onFilterChange(tab.key)}
                            aria-pressed={filter === tab.key}
                            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2.5 text-xs transition-colors sm:px-4 ${
                                filter === tab.key
                                    ? "bg-[#C8102E] font-extrabold text-white"
                                    : "bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FilterToolbar;
