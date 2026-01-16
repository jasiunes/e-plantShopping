
// src/components/CartItem.jsx
import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) return null;

  const { id, name, price, quantity, image } = item;
  const itemTotal = Number(price) * Number(quantity); // toplam = birim fiyat × adet

  return (
    <div
      className="cart-item"
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        gap: "12px",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
      />

      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ color: "#555", marginTop: 4 }}>
          Unit price:{" "}
          {Number(price).toLocaleString(undefined, {
            style: "currency",
            currency: "EUR",
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8, gap: 8 }}>
          <button
            aria-label="Decrease quantity"
            onClick={() => onDecrease?.(id)}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span>{quantity}</span>
          <button aria-label="Increase quantity" onClick={() => onIncrease?.(id)}>
            +
          </button>
          <button
            aria-label="Remove item"
            onClick={() => onRemove?.(id)}
            style={{ marginLeft: 12, color: "#a00" }}
          >
            Remove
          </button>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: 700 }}>
          {itemTotal.toLocaleString(undefined, { style: "currency", currency: "EUR" })}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          ({quantity} ×{" "}
          {Number(price).toLocaleString(undefined, {
            style: "currency",
            currency: "EUR",
          })}
          )
        </div>
      </div>
    </div>
  );
};

export default CartItem;
