
// src/components/Cart.jsx
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { increase, decrease, removeItem, clearCart } from "../store/cartSlice"; // yollarını projene göre ayarla
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart?.items ?? []);

  const cartTotal = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity), 0),
    [items]
  );

  const handleIncrease = (id) => dispatch(increase(id));
  const handleDecrease = (id) => dispatch(decrease(id));
  const handleRemove = (id) => dispatch(removeItem(id));

  const handleCheckout = () => {
    // burada ödeme akışına geçebilirsin (ör. /checkout)
    // demo: sepeti temizle ve teşekkür sayfasına yönlendir
    dispatch(clearCart());
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    // ürün listesine geri dön
    navigate("/products");
  };

  if (!items.length) {
    return (
      <section className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* TOTAL CART AMOUNT (required) */}
      <div
        className="cart-total"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid #eee",
        }}
      >
        <strong>Total:</strong>
        <strong>
          {cartTotal.toLocaleString(undefined, { style: "currency", currency: "EUR" })}
        </strong>
      </div>

      {/* ACTION BUTTONS (required) */}
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckout} style={{ background: "#2e7d32", color: "#fff" }}>
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
