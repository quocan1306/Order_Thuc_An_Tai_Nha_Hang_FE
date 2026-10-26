import { FiCheckCircle } from "react-icons/fi";

function ToastContainer({ toasts }) {
    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium bg-slate-900 text-white border border-slate-700">
                    <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                    <span>{t.message}</span>
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;
