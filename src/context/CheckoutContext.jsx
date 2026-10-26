import { createContext, useContext, useMemo, useState } from "react";
import { sampleCart, PROMOS } from "../data/checkoutData";
import { calcTotals, genOrderCode } from "../utils/checkoutUtils";

const CheckoutContext = createContext(null);
export const useCheckout = () => useContext(CheckoutContext);

const EMPTY_PROMO = { code: "", rate: 0 };
const EMPTY_CUSTOMER = { name: "", email: "" };

export function CheckoutProvider({ children }) {
    const [promo, setPromo] = useState(EMPTY_PROMO);
    const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
    const [method, setMethod] = useState("online"); // "online" | "cashier"
    const [orderCode, setOrderCode] = useState("");

    const totals = useMemo(() => calcTotals(sampleCart, promo.rate), [promo.rate]);

    const applyPromo = (raw) => {
        const code = raw.trim().toUpperCase();
        if (!PROMOS[code]) return false;
        setPromo({ code, rate: PROMOS[code] });
        return true;
    };

    const placeOrder = () => setOrderCode(genOrderCode());

    const reset = () => {
        setPromo(EMPTY_PROMO);
        setCustomer(EMPTY_CUSTOMER);
        setMethod("online");
        setOrderCode("");
    };

    return (
        <CheckoutContext.Provider value={{
            items: sampleCart, totals, promo, applyPromo,
            customer, setCustomer, method, setMethod,
            orderCode, placeOrder, reset,
        }}>
            {children}
        </CheckoutContext.Provider>
    );
}
