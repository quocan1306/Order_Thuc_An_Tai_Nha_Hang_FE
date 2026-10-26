import { SERVICE_RATE } from "../data/checkoutData";

export const vnd = (n) => `${new Intl.NumberFormat("vi-VN").format(Math.round(n))}₫`;

export const calcTotals = (items, discountRate = 0) => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = subtotal * discountRate;
    const service = (subtotal - discount) * SERVICE_RATE;
    return {
        count: items.reduce((s, i) => s + i.qty, 0),
        subtotal, discount, service,
        total: subtotal - discount + service,
    };
};

// Mã đơn 8 ký tự, bỏ các ký tự dễ nhầm (0/O, 1/I)
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const genOrderCode = () =>
    Array.from({ length: 8 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
