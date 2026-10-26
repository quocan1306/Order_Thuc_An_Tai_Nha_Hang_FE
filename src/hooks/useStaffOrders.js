import { useCallback, useMemo, useState } from "react";
import { getStaffOrders } from "../services/staffOrderService";
import { FILTERS, STATUS, FEATURED_TABLE_ID } from "../utils/staffConstants";
import { filterTables, getKpis } from "../utils/staffStats";

export default function useStaffOrders() {
    const [tables, setTables] = useState(getStaffOrders);
    const [layout, setLayout] = useState("grid");
    const [filter, setFilter] = useState(FILTERS.ALL);
    const [keyword, setKeyword] = useState("");
    const [selectedId, setSelectedId] = useState(FEATURED_TABLE_ID);
    const [pending, setPending] = useState(null); // { table, item }
    const [toasts, setToasts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("Vừa xong");

    const kpis = useMemo(() => getKpis(tables), [tables]);
    const filtered = useMemo(() => filterTables(tables, filter, keyword), [tables, filter, keyword]);
    const selectedTable = useMemo(
        () => filtered.find((t) => t.id === selectedId) || filtered[0] || null,
        [filtered, selectedId]
    );

    const showToast = useCallback((message) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    }, []);

    const requestConfirm = (tableId, itemId) => {
        const table = tables.find((t) => t.id === tableId);
        const item = table?.items.find((i) => i.id === itemId);
        if (table && item) setPending({ table, item });
    };

    const cancelConfirm = () => setPending(null);

    const confirmDelivery = () => {
        if (!pending) return;
        const { table, item } = pending;
        setTables((prev) =>
            prev.map((t) =>
                t.id !== table.id
                    ? t
                    : { ...t, items: t.items.map((i) => (i.id === item.id ? { ...i, status: STATUS.SERVED } : i)) }
            )
        );
        setPending(null);
        showToast(`Đã giao ${item.name} x${item.qty} đến ${table.code}`);
    };

    const markAllServed = (tableId) => {
        const table = tables.find((t) => t.id === tableId);
        if (!table) return;
        setTables((prev) =>
            prev.map((t) =>
                t.id === tableId ? { ...t, items: t.items.map((i) => ({ ...i, status: STATUS.SERVED })) } : t
            )
        );
        showToast(`Đã giao toàn bộ món tại ${table.code}`);
    };

    const refresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setLastUpdated(new Date().toLocaleTimeString("vi-VN"));
            showToast("Đã đồng bộ dữ liệu bàn và món ăn mới nhất");
        }, 600);
    };

    return {
        layout, setLayout, filter, setFilter, keyword, setKeyword,
        filtered, kpis, selectedTable, setSelectedId,
        pending, requestConfirm, cancelConfirm, confirmDelivery, markAllServed,
        toasts, refreshing, refresh, lastUpdated,
    };
}
