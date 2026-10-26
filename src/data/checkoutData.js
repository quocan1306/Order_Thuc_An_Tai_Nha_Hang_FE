// Dữ liệu mẫu cho luồng thanh toán. Lấy món từ "ban-08" trong staffTables.js
// và bổ sung đơn giá (VND). Khi có API, thay bằng dữ liệu từ src/services.
import { initialTables } from "./staff/staffTables";

export const RESTAURANT_NAME = "Tiệm Nướng 3 anh em";
export const SERVICE_RATE = 0.1; // phí dịch vụ 10%
export const PROMOS = { GIAM10: 0.1, XINCHAO: 0.05 }; // mã giảm giá (theo %)

const PRICES = { "b8-1": 59000, "b8-2": 189000, "b8-3": 20000 };

const table = initialTables.find((t) => t.id === "ban-08");

export const CURRENT_TABLE = { code: table.code, location: "Cạnh cửa sổ · Tầng 2" };

export const sampleCart = table.items.map(({ id, name, qty, img }) => ({
    id, name, qty, img, price: PRICES[id],
}));
