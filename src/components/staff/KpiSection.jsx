
import { FiAward, FiBell, FiCheckCircle, FiCoffee } from "react-icons/fi";
import KpiCard from "./KpiCard";
import { pad2 } from "../../utils/staffStats";

function KpiSection({ kpis }) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            <KpiCard
                label="Bàn đang phục vụ"
                value={pad2(kpis.activeTables)}
                unit="bàn"
                icon={FiCoffee}
            />

            <KpiCard
                label="Món đang chờ giao"
                value={pad2(kpis.pendingDishes)}
                unit="món"
                icon={FiBell}
                tone="warning"
            />

            <KpiCard
                label="Món đã phục vụ"
                value={pad2(kpis.servedDishes)}
                unit="món"
                icon={FiCheckCircle}
                tone="success"
            />

            <KpiCard
                label="Bàn đã nhận đủ món"
                value={pad2(kpis.completeTables)}
                unit="bàn"
                icon={FiAward}
                tone="info"
            />
        </div>
    );
}

export default KpiSection;
