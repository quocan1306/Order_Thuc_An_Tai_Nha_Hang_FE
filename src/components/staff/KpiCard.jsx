const TONES = {
    default: { box: "bg-white border-slate-200", value: "text-slate-900", icon: "bg-slate-100 text-slate-700" },
    warning: { box: "bg-amber-50 border-amber-200", value: "text-amber-900", icon: "bg-amber-500 text-white" },
    success: { box: "bg-white border-slate-200", value: "text-emerald-600", icon: "bg-emerald-50 text-emerald-600" },
    info: { box: "bg-white border-slate-200", value: "text-indigo-600", icon: "bg-indigo-50 text-indigo-600" },
};

function KpiCard({ label, value, unit, icon: Icon, tone = "default" }) {
    const t = TONES[tone];
    return (
        <div className={`rounded-2xl p-4 border shadow-sm flex items-center justify-between ${t.box}`}>
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
                <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${t.value}`}>
                    {value} <span className="text-xs font-medium text-slate-400">{unit}</span>
                </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${t.icon}`}>
                <Icon />
            </div>
        </div>
    );
}

export default KpiCard;
