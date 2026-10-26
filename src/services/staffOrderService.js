import { initialTables } from "../data/staff/staffTables";

// Hiện đang trả dữ liệu mẫu. Khi có API, thay bằng fetch/axios
// (ví dụ: return fetch("/api/staff/tables").then((r) => r.json())).
export function getStaffOrders() {
    return structuredClone(initialTables);
}
