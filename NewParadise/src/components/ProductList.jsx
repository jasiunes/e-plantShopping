
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice"; // yolunu projenize göre ayarlayın
import "../styles.css";

const catalog = [
  {
    category: "Citrus",
    items: [
      { id: "c1", name: "Lemon Tree", price: 29.99, image: "/images/citrus-lemon.jpg" },
      { id: "c2", name: "Orange Tree", price: 34.99, image: "/images/citrus-orange.jpg" },
      { id: "c3", name: "Lime Tree", price: 32.5, image: "/images/citrus-lime.jpg" },
    ],
  },
  {
    category: "Indoor",
    items: [
      { id: "i1", name: "Ficus Elastica", price: 24.99, image: "/images/indoor-ficus.jpg" },
      { id: "i2", name: "Monstera Deliciosa", price: 39.99, image: "/images/indoor-monstera.jpg" },
      { id: "i3", name: "Snake Plant", price: 19.99, image: "/images/indoor-snake.jpg" },
    ],
  },
  {
    category: "Herbs",
    items: [
      { id: "h1", name: "Mint", price: 4.99, image: "/images/herb-mint.jpg" },
      { id: "h2", name: "Basil", price: 3.99, image: "/images/herb-basil.jpg" },
      { id: "h3", name: "Rosemary", price: 5.49, image: "/images/herb-rosemary.jpg" },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items ?? []);

  // Sepetteki ürünleri hızlıca sorgulamak için Set kullan
  const cartIds = useMemo(() => new Set(cartItems.map((it) => it.id)), [cartItems]);

  const handleAdd = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <section className="product-list" aria-label="Plant product categories">
      {catalog.map((block) => (
        <div key={block.category} className="category-block">
          {/* Kategori Başlığı */}
          <h2 className="category-title">{block.category}</h2>

          {/* Ürün Kartları: map() ile dinamik render */}
          <div className="products-grid">
            {block.items.map((p) => {
              const isInCart = cartIds.has(p.id);
              return (
                <article className="product-card" key={p.id}>
                  <img
                    className="product-thumb"
                    src={p.image}
                    alt={`${p.name} thumbnail`}
                    loading="lazy"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">
                      {p.price.toLocaleString(undefined, {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </div>
                    <button
                      className="add-btn"
                      onClick={() => handleAdd(p)}
                      disabled={isInCart}
                      aria-pressed={isInCart}
                      style={{
                        marginTop: 8,
                        padding: "8px 12px",
                        borderRadius: 8,
                        background: isInCart ? "#9e9e9e" : "#2e7d32",
                        color: "#fff",
                        border: "none",
                        cursor: isInCart ? "not-allowed" : "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {isInCart ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
