
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext(null);

function readStorage(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage("foodOrderCart")
  );

  const [calledOrders, setCalledOrders] = useState(() =>
    readStorage("foodCalledOrders")
  );

  // Lưu giỏ hàng và các lượt gọi vào trình duyệt
  useEffect(() => {
    localStorage.setItem("foodOrderCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "foodCalledOrders",
      JSON.stringify(calledOrders)
    );
  }, [calledOrders]);

  // Thêm món vào giỏ hoặc tăng số lượng món đã có
  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  };

  // Thay đổi số lượng món
  const changeQuantity = (productId, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Xóa món khỏi giỏ
  const removeFromCart = (productId) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== productId)
    );
  };

  // Xác nhận gọi món: tạo một lượt gọi mới
  const placeOrder = () => {
    if (cart.length === 0) return null;

    const now = new Date();

    const newOrder = {
      id: Date.now(),
      time: now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: cart.map((item) => ({ ...item })),
      status: "Chờ nhà hàng xác nhận",
    };

    setCalledOrders((previous) => [
      newOrder,
      ...previous,
    ]);

    setCart([]);

    return newOrder;
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        calledOrders,
        addToCart,
        changeQuantity,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder phải được sử dụng bên trong OrderProvider"
    );
  }

  return context;
}
