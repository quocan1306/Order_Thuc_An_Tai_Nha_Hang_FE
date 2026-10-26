import { Outlet } from "react-router-dom";

// Layout riêng cho khu vực nhân viên (tách khỏi MainLayout của khách).
function StaffLayout() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Outlet />
        </div>
    );
}

export default StaffLayout;
