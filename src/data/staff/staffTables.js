// Dữ liệu mẫu cho màn hình phục vụ tại bàn.
// Khi có API, thay bằng dữ liệu từ src/services.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&q=80`;
const IMG = {
    pork: u("photo-1544025162-d76694265947"),
    beef: u("photo-1558030006-450675393462"),
    hotpot: u("photo-1569058242253-92a9c755a0ec"),
    drink: u("photo-1513558161293-cdaf765ed2fd"),
    chicken: u("photo-1626082927389-6cd097cdc6ec"),
    rice: u("photo-1603133872878-684f208fb84b"),
};

const P = "PENDING";
const S = "SERVED";
const dish = (id, name, qty, note, status, isChilled, img) => ({ id, name, qty, note, status, isChilled, img });

export const initialTables = [
    { id: "ban-01", code: "BÀN 01", guestCount: 4, orderTime: "15 phút trước", waitMinutes: 15, items: [
        dish("b1-1", "Ba chỉ heo cuộn sốt", 2, "Sốt cay riêng", P, true, IMG.pork),
        dish("b1-2", "Lõi vai bò Mỹ Chilled", 1, "", P, true, IMG.beef),
        dish("b1-3", "Nước suối Lavie 500ml", 2, "Ướp lạnh", P, false, IMG.drink),
    ] },
    { id: "ban-02", code: "BÀN 02", guestCount: 2, orderTime: "22 phút trước", waitMinutes: 22, items: [
        dish("b2-1", "Cơm chiên hải sản", 1, "Không hành tây", P, false, IMG.rice),
        dish("b2-2", "Gà chiên nước mắm", 1, "", S, false, IMG.chicken),
        dish("b2-3", "Trà đào cam sả", 2, "Ít đường", S, false, IMG.drink),
    ] },
    { id: "ban-03", code: "BÀN 03", guestCount: 6, orderTime: "8 phút trước", waitMinutes: 8, items: [
        dish("b3-1", "Ba chỉ heo tươi Chilled", 3, "Cắt lát mỏng", P, true, IMG.pork),
        dish("b3-2", "Lõi nạc vai bò Úc", 2, "", P, true, IMG.beef),
        dish("b3-3", "Rau nấm tổng hợp", 2, "", S, false, IMG.hotpot),
        dish("b3-4", "Bia Tiger bạc", 6, "Kèm xô đá", S, false, IMG.drink),
    ] },
    { id: "ban-04", code: "BÀN 04", guestCount: 3, orderTime: "28 phút trước", waitMinutes: 28, items: [
        dish("b4-1", "Mông bò sốt tiêu đen", 2, "", S, true, IMG.beef),
        dish("b4-2", "Kim chi Hàn Quốc", 1, "Thêm đĩa", S, false, IMG.rice),
        dish("b4-3", "Nước ngọt Coca lon", 3, "Kèm ly đá", S, false, IMG.drink),
    ] },
    { id: "ban-05", code: "BÀN 05", guestCount: 4, orderTime: "12 phút trước", waitMinutes: 12, items: [
        dish("b5-1", "Ba chỉ heo tươi Chilled Meat", 2, "Cắt dày", P, true, IMG.pork),
        dish("b5-2", "Lẩu Thái hải sản", 1, "Ít cay", P, false, IMG.hotpot),
        dish("b5-3", "Mì xào bò rau cải", 1, "", S, false, IMG.rice),
        dish("b5-4", "Trà đào cam sả", 1, "Ít đá", S, false, IMG.drink),
    ] },
    { id: "ban-06", code: "BÀN 06", guestCount: 2, orderTime: "5 phút trước", waitMinutes: 5, items: [
        dish("b6-1", "Bò Wagyu nướng sốt Nhật", 1, "Nướng tái vừa", P, true, IMG.beef),
        dish("b6-2", "Nước ép dưa hấu tươi", 2, "Không đường", S, false, IMG.drink),
    ] },
    { id: "ban-07", code: "BÀN 07", guestCount: 5, orderTime: "35 phút trước", waitMinutes: 35, items: [
        dish("b7-1", "Sườn bò rút xương sốt BBQ", 2, "", S, true, IMG.beef),
        dish("b7-2", "Lẩu Tomyum chua cay", 1, "", S, false, IMG.hotpot),
        dish("b7-3", "Bánh bao chiên sữa", 2, "", S, false, IMG.rice),
    ] },
    { id: "ban-08", code: "BÀN 08", guestCount: 3, orderTime: "40 phút trước", waitMinutes: 40, items: [
        dish("b8-1", "Khoai tây chiên bơ tỏi", 1, "Chiên giòn", S, false, IMG.rice),
        dish("b8-2", "Mông bò Úc thái mỏng", 2, "", S, true, IMG.beef),
        dish("b8-3", "Nước ngọt Coca-Cola", 3, "Lạnh không đá", S, false, IMG.drink),
    ] },
];
