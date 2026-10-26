import { vnd } from "../../utils/checkoutUtils";

const Row = ({ label, value }) => (
    <div className="ck-row"><span>{label}</span><b>{value}</b></div>
);

export default function PaymentDetails({ totals }) {
    const { count, subtotal, discount, service, total } = totals;
    return (
        <section className="ck-card">
            <h2>Chi tiết thanh toán</h2>
            <Row label={`Tạm tính (${count} món)`} value={vnd(subtotal)} />
            {discount > 0 && <Row label="Giảm giá" value={`-${vnd(discount)}`} />}
            <Row label="Phí dịch vụ (10%)" value={vnd(service)} />
            <div className="ck-row ck-total"><span>Tổng cộng</span><strong>{vnd(total)}</strong></div>
        </section>
    );
}
