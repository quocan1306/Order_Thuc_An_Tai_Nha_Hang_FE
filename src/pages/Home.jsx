import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../components/card/ProductCard";
import { products } from "../data/mockData";
import { useOrder } from "../context/OrderContext";
import bannerImg from "../assets/ex/banner.jpg";

// Bỏ dấu tiếng Việt để gõ "ba chi" vẫn tìm ra "Ba chỉ"
const normalize = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

function Home() {
  const navigate = useNavigate();
  const { cart, addToCart } = useOrder();
  const [keyword, setKeyword] = useState("");
  const [searchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    const q = normalize(keyword.trim());
    return products.filter((p) => {
      const matchCat = activeCat === "all" || p.category === activeCat;
      const matchKeyword = !q || normalize(p.name).includes(q);
      return matchCat && matchKeyword;
    });
  }, [keyword, activeCat]);

  return (
    <div className="pb-36">
      {/* Banner + thanh search */}
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl">
        <img
          src={bannerImg}
          alt="Banner"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />

        <div className="absolute bottom-3 left-3 right-3 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 shadow-lg">
          <FiSearch className="text-lg text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm bò, ba chỉ, đồ uống..."
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Danh sách món */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-gray-500">
          Không tìm thấy món phù hợp
        </p>
      )}

      {totalQuantity > 0 && (
        <div className="fixed bottom-[72px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-3">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="flex w-full items-center justify-between rounded-2xl bg-red-700 px-5 py-4 text-left text-white shadow-lg active:bg-red-800"
          >
            <div>
              <p className="text-base font-semibold">{totalQuantity} món</p>
              <p className="text-xs text-gray-300">Xem đơn hàng</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-xl">→</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;