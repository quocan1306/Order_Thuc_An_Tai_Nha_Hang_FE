import { FILTERS, STATUS } from "./staffConstants";

export function getTableStats(table) {
    const pendingCount = table.items.filter((i) => i.status === STATUS.PENDING).length;
    const totalCount = table.items.length;
    const servedCount = totalCount - pendingCount;
    const progressPercent = totalCount ? Math.round((servedCount / totalCount) * 100) : 100;
    return { pendingCount, servedCount, totalCount, progressPercent, isComplete: pendingCount === 0 };
}

export function getKpis(tables) {
    return tables.reduce(
        (acc, t) => {
            const s = getTableStats(t);
            acc.pendingDishes += s.pendingCount;
            acc.servedDishes += s.servedCount;
            if (s.isComplete) acc.completeTables += 1;
            else acc.pendingTables += 1;
            return acc;
        },
        { activeTables: tables.length, pendingDishes: 0, servedDishes: 0, completeTables: 0, pendingTables: 0 }
    );
}

export function filterTables(tables, filter, keyword) {
    const kw = keyword.trim().toLowerCase();
    return tables.filter((table) => {
        const s = getTableStats(table);
        if (filter === FILTERS.PENDING && s.pendingCount === 0) return false;
        if (filter === FILTERS.COMPLETED && !s.isComplete) return false;
        if (!kw) return true;
        return (
            table.code.toLowerCase().includes(kw) ||
            table.items.some((i) => i.name.toLowerCase().includes(kw) || i.note?.toLowerCase().includes(kw))
        );
    });
}

export const pad2 = (n) => String(n).padStart(2, "0");
