
import React, { useState } from "react";
import ProductList from "./components/ProductList"; // mevcutsa

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true); // butona basınca ürünleri göster
  };

  if (showProducts) {
    return <ProductList />; // ProductList JSX'i direkt göster
  }

  return (
    <section className="landing">
      <h1>Welcome to Paradise Nursery</h1>
      <button onClick={handleGetStarted}>Get Started</button>
    </section>
  );
}

export default App;
