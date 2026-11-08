
import { FiColumns, FiGrid, FiList } from "react-icons/fi";
import { LAYOUT_TABS } from "../../utils/staffConstants";

const ICONS = {
  grid: FiGrid,
  split: FiColumns,
  priority: FiList,
};

function StaffViewTabs({ layout, onLayoutChange }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-bold text-slate-900">
          Chế độ hiển thị bàn
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Chọn cách theo dõi và điều phối món ăn
        </p>
      </div>

      <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
        {LAYOUT_TABS.map((tab) => {
          const Icon = ICONS[tab.key];
          const active = layout === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onLayoutChange(tab.key)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all ${
                active
                  ? "bg-red-50 font-bold text-[#C8102E]"
                  : "font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default StaffViewTabs;
