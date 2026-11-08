
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiCoffee,
} from "react-icons/fi";

const stats = [
  {
    label: "Tổng đơn hàng",
    value: "128",
    description: "Trong ngày hôm nay",
    icon: FiShoppingBag,
    color: "blue",
  },
  {
    label: "Doanh thu",
    value: "12.500.000đ",
    description: "Trong ngày hôm nay",
    icon: FiDollarSign,
    color: "emerald",
  },
  {
    label: "Nhân viên",
    value: "12",
    description: "Tài khoản nhân viên",
    icon: FiUsers,
    color: "violet",
  },
  {
    label: "Tổng số bàn",
    value: "08",
    description: "Bàn trong nhà hàng",
    icon: FiCoffee,
    color: "amber",
  },
];

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
};

function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Dashboard Admin
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tổng quan hoạt động kinh doanh của nhà hàng
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <div className={`rounded-xl p-3 ${colorStyles[item.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                {item.value}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Khu vực nội dung */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <h2 className="font-bold text-slate-900">
            Tổng quan kinh doanh
          </h2>

          <div className="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <p className="font-semibold text-slate-500">
                Biểu đồ doanh thu
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Sẽ được tích hợp khi có dữ liệu Backend
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-900">
            Hoạt động gần đây
          </h2>

          <div className="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-400">
              Chưa có dữ liệu hoạt động
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
