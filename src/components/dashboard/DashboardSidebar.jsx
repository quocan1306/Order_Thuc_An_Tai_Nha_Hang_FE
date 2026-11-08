
import { NavLink } from "react-router-dom";
import {
  FiZap,
  FiGrid,
  FiClipboard,
  FiBell,
  FiCoffee,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiPackage,
} from "react-icons/fi";

const STAFF_MENU = [
  {
    title: "TỔNG QUAN",
    items: [
      { label: "Dashboard phục vụ", path: "/staff", icon: FiGrid },
    ],
  },
  {
    title: "VẬN HÀNH",
    items: [
      { label: "Quản lý đơn hàng", icon: FiClipboard, disabled: true },
      { label: "Yêu cầu phục vụ", icon: FiBell, disabled: true },
      { label: "Quản lý bàn", icon: FiCoffee, disabled: true },
    ],
  },
];

const ADMIN_MENU = [
  {
    title: "TỔNG QUAN",
    items: [
      { label: "Dashboard", path: "/admin", icon: FiGrid },
    ],
  },
  {
    title: "QUẢN LÝ NHÀ HÀNG",
    items: [
      { label: "Quản lý đơn hàng", icon: FiClipboard, disabled: true },
      { label: "Quản lý món ăn", icon: FiPackage, disabled: true },
      { label: "Quản lý danh mục", icon: FiGrid, disabled: true },
      { label: "Quản lý bàn", icon: FiCoffee, disabled: true },
    ],
  },
  {
    title: "QUẢN TRỊ HỆ THỐNG",
    items: [
      { label: "Quản lý nhân viên", icon: FiUsers, disabled: true },
      { label: "Báo cáo doanh thu", icon: FiBarChart2, disabled: true },
      { label: "Cài đặt hệ thống", icon: FiSettings, disabled: true },
    ],
  },
];

function DashboardSidebar({ role }) {
  const menu = role === "admin" ? ADMIN_MENU : STAFF_MENU;

  const renderMenu = (mobile = false) => (
    <div className={mobile ? "flex gap-2 overflow-x-auto" : "space-y-6"}>
      {menu.map((group) => (
        <div key={group.title} className={mobile ? "shrink-0" : ""}>
          {!mobile && (
            <p className="mb-2 px-3 text-[10px] font-bold tracking-wider text-slate-400">
              {group.title}
            </p>
          )}

          <div className={mobile ? "flex gap-2" : "space-y-1"}>
            {group.items.map((item) => {
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <div
                    key={item.label}
                    title="Chức năng đang được phát triển"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 ${
                      mobile ? "whitespace-nowrap bg-slate-50" : ""
                    }`}
                  >
                    <Icon className="shrink-0 text-base" />
                    <span>{item.label}</span>
                    {!mobile && (
                      <span className="ml-auto text-[9px]">Sắp có</span>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-red-50 text-[#C8102E]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    } ${mobile ? "whitespace-nowrap" : ""}`
                  }
                >
                  <Icon className="shrink-0 text-base" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[72px] items-center gap-3 border-b border-slate-200 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C8102E] bg-slate-900 text-lg text-amber-400">
            <FiZap />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-900">
              BBQ & HOTPOT
            </p>
            <p className="text-[10px] font-medium text-slate-500">
              MASTER MANAGEMENT
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {renderMenu()}
        </div>

        <div className="border-t border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700">
            Restaurant Management
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Version 1.0.0
          </p>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
        {renderMenu(true)}
      </div>
    </>
  );
}

export default DashboardSidebar;
