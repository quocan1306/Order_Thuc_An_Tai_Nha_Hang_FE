
import { FiLogOut, FiUser } from "react-icons/fi";
import { STAFF } from "../../utils/staffConstants";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ role }) {
  const navigate = useNavigate();

  const roleName = role === "admin" ? "Quản trị viên" : "Nhân viên";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div>
        <p className="text-sm font-bold text-slate-900">
          Khu vực quản trị
        </p>
        <p className="text-xs text-slate-500">
          Hệ thống quản lý BBQ & HOTPOT MASTER
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-700">
            Trực tuyến
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <FiUser />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-900">
              {role === "admin" ? "Quản trị viên" : STAFF.name}
            </p>
            <p className="text-[10px] text-slate-500">{roleName}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          title="Rời khu vực quản trị"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-[#C8102E]"
        >
          <FiLogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
