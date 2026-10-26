import { vnd } from "../../utils/checkoutUtils";

export default function OrderItems({ items }) {
    return (
        <section className="ck-card">
            <h2>Tóm tắt đơn hàng</h2>
            {items.map((i) => (
                <div className="ck-item" key={i.id}>
                    <img src={i.img} alt={i.name} />
                    <div>
                        <strong>{i.name}</strong>
                        <small>x{i.qty}</small>
                    </div>
                    <b>{vnd(i.price * i.qty)}</b>
                </div>
            ))}
        </section>
    );
}
