import { vnd } from "../../utils/checkoutUtils";

export default function BottomBar({ label, amount, onClick }) {
    return (
        <footer className="ck-bar">
            <button className={`ck-cta ${amount == null ? "center" : ""}`} onClick={onClick}>
                <span>{label}</span>
                {amount != null && <b>{vnd(amount)}</b>}
            </button>
        </footer>
    );
}
