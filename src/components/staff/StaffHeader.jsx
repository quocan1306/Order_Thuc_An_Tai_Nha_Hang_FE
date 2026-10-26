import { FiColumns, FiGrid, FiList, FiLogOut, FiZap } from "react-icons/fi";
import { LAYOUT_TABS, STAFF } from "../../utils/staffConstants";

const ICONS = { grid: FiGrid, split: FiColumns, priority: FiList };

function StaffHeader({ layout, onLayoutChange }) {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-slate-900 border-2 border-[#C8102E] flex items-center justify-center text-[#F59E0B] text-lg flex-shrink-0">
                        <FiZap />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-lg text-slate-900">BBQ &amp; HOTPOT MASTER</span>
                            <span className="bg-[#C8102E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">Phục Vụ Tại Bàn</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Hệ thống điều phối món ăn &amp; trạng thái bàn ăn thực tế</p>
                    </div>
                </div>

                <nav className="hidden xl:flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                    {LAYOUT_TABS.map((tab) => {
                        const Icon = ICONS[tab.key];
                        const active = layout === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => onLayoutChange(tab.key)}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-all ${active ? "bg-white text-[#C8102E] font-bold shadow-sm" : "font-semibold text-slate-600 hover:text-slate-900"}`}
                            >
                                <Icon /> <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">Trực tuyến</span>
                    </div>
                    <div className="hidden sm:block text-right pl-3 border-l border-slate-200">
                        <div className="text-xs font-bold text-slate-900">{STAFF.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{STAFF.shift}</div>
                    </div>
                    <button className="text-slate-400 hover:text-[#C8102E] p-1.5 transition" title="Đăng xuất">
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default StaffHeader;
