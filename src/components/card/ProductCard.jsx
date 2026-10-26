import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  // Format giá tiền Việt Nam Đồng
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  // Click vào card → đi tới trang chi tiết
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Click nút + → thêm nhanh vào giỏ
  const handleAddToCart = (e) => {
    // Không cho sự kiện click lan lên Card
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-gray-100
        overflow-hidden
        flex
        flex-col
        justify-between
        p-2
        cursor-pointer
        active:scale-[0.98]
        transition
      "
    >
      {/* =========================
          ẢNH SẢN PHẨM
      ========================= */}
      <div className="relative bg-[#8B0000] rounded-lg p-2 flex items-center justify-center aspect-square overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />

        {/* Label */}
        {product.badge && (
          <div className="
            absolute
            top-1
            right-1
            bg-yellow-500
            text-black
            text-[9px]
            font-bold
            px-1.5
            py-0.5
            rounded-sm
          ">
            Chilled Meat
          </div>
        )}
      </div>

      {/* =========================
          THÔNG TIN SẢN PHẨM
      ========================= */}
      <div className="mt-2 flex-1 flex flex-col justify-between">

        {/* Tên món */}
        <h3 className="
          text-xs
          font-semibold
          text-gray-800
          line-clamp-2
          min-h-[32px]
        ">
          {product.name}
        </h3>

        {/* Giá + nút thêm */}
        <div className="flex items-center justify-between mt-2 pt-1">

          <span className="text-xs font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          {/* Nút + */}
          <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Thêm ${product.name}`}
              className="
                w-7
                h-7
                bg-red-700
                text-white
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-red-800
                active:scale-90
                transition
                shadow-md
              "
            >
            <FiPlus className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;