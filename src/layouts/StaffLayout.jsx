
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function StaffLayout() {
  const location = useLocation();

  // Tạm mô phỏng role bằng URL trong giai đoạn chưa có đăng nhập.
  const role = location.pathname.startsWith("/admin")
    ? "admin"
    : "staff";

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <DashboardSidebar role={role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader role={role} />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffLayout;
