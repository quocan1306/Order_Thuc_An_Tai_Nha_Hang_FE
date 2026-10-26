import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import { products } from "../data/mockData";

function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const product = products.find(
        (item) => String(item.id) === String(id)
    );

    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState("");

    // Nếu không tìm thấy sản phẩm
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">
                        Không tìm thấy món ăn.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    // Tăng số lượng
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // Giảm số lượng
    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(0, prev - 1));
    };

    // Thêm món vào giỏ
    const handleAddToCart = () => {
        if (quantity === 0) {
            return;
        }

        console.log("Thêm vào giỏ:", {
            product,
            quantity,
            note,
        });

        // Sau này xử lý Cart Context / API ở đây
    };

    return (
        <div className="min-h-screen bg-white flex justify-center">

            {/* Container mobile */}
            <div className="w-full max-w-md min-h-screen bg-white relative">

                {/* =========================
                    ẢNH MÓN ĂN
                ========================= */}
                <div className="relative w-full h-[440px] bg-gray-100">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Nút đóng */}
                    <button
                        onClick={() => navigate(-1)}
                        className="
                            absolute
                            top-5
                            left-5
                            w-12
                            h-12
                            rounded-full
                            bg-white/80
                            backdrop-blur-sm
                            flex
                            items-center
                            justify-center
                            shadow-sm
                            hover:bg-white
                            active:scale-95
                            transition
                        "
                    >
                        <FiX className="w-7 h-7 text-gray-700" />
                    </button>
                </div>

                {/* =========================
                    NỘI DUNG CHI TIẾT
                ========================= */}
                <div
                    className="
                        relative
                        -mt-5
                        bg-white
                        rounded-t-[36px]
                        px-4
                        pt-7
                        pb-32
                        min-h-[450px]
                    "
                >

                    {/* Thanh kéo */}
                    <div className="flex justify-center mb-7">
                        <div className="w-32 h-2 bg-gray-300 rounded-full" />
                    </div>

                    {/* Tên món */}
                    <h1 className="text-[32px] leading-tight font-bold text-gray-900">
                        {product.name}
                    </h1>

                    {/* Loại món */}
                    <p className="text-xl text-red-600 mt-3">
                        {product.type || "Buffet"}
                    </p>

                    {/* Mô tả */}
                    {product.description && (
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* =========================
                        GHI CHÚ CHO MÓN ĂN
                    ========================= */}
                    <div className="mt-8">

                        {/* Tiêu đề + số ký tự */}
                        <div className="flex items-center justify-between mb-3">

                            <h2 className="text-2xl font-bold text-gray-900">
                                Ghi chú cho món ăn
                            </h2>

                            <span className="text-xs text-gray-400">
                                {note.length}/200
                            </span>

                        </div>

                        {/* Textbox ghi chú */}
                        <textarea
                            value={note}
                            onChange={(e) => {
                                if (e.target.value.length <= 200) {
                                    setNote(e.target.value);
                                }
                            }}
                            placeholder="Ví dụ: Không hành, ít cay, nướng chín kỹ..."
                            maxLength={200}
                            className="
                                w-full
                                h-36
                                border
                                border-gray-300
                                rounded-xl
                                p-4
                                text-base
                                text-gray-800
                                placeholder:text-gray-400
                                resize-none
                                outline-none
                                transition
                                focus:border-red-500
                                focus:ring-2
                                focus:ring-red-100
                            "
                        />

                        {/* Hướng dẫn */}
                        <p className="text-xs text-gray-400 mt-2">
                            Ghi chú sẽ được gửi cùng món ăn cho nhân viên.
                        </p>

                    </div>

                </div>

                {/* =========================
                    BOTTOM ACTION
                ========================= */}
                <div
                    className="
                        fixed
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        w-full
                        max-w-md
                        bg-white
                        border-t
                        border-gray-100
                        px-4
                        py-4
                        flex
                        items-center
                        gap-4
                        z-50
                    "
                >

                    {/* =========================
                        SỐ LƯỢNG
                    ========================= */}
                    <div className="flex items-center gap-4">

                        {/* Giảm */}
                        <button
                            onClick={decreaseQuantity}
                            disabled={quantity === 0}
                            className="
                                w-14
                                h-14
                                rounded-xl
                                bg-gray-400
                                text-white
                                flex
                                items-center
                                justify-center
                                disabled:opacity-70
                                active:scale-95
                                transition
                            "
                        >
                            <FiMinus className="w-7 h-7" />
                        </button>

                        {/* Số lượng */}
                        <span className="text-2xl font-semibold w-5 text-center">
                            {quantity}
                        </span>

                        {/* Tăng */}
                        <button
                            onClick={increaseQuantity}
                            className="
                                w-14
                                h-14
                                rounded-xl
                                bg-gray-900
                                text-white
                                flex
                                items-center
                                justify-center
                                active:scale-95
                                transition
                            "
                        >
                            <FiPlus className="w-7 h-7" />
                        </button>

                    </div>

                    {/* =========================
                        THÊM VÀO GIỎ
                    ========================= */}
                    <button
                        onClick={handleAddToCart}
                        disabled={quantity === 0}
                        className="
                            flex-1
                            h-14
                            rounded-xl
                            bg-gray-300
                            text-white
                            text-lg
                            font-bold
                            disabled:cursor-not-allowed
                            enabled:bg-red-600
                            enabled:hover:bg-red-700
                            transition
                        "
                    >
                        Thêm vào giỏ
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetail;