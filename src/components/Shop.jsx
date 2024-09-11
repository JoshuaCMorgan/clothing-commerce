import { Product } from "./Product";
import React from "react";

function Shop({ children }) {
  return (
    <section className="shop-container">
      <h2>Products for the whole family</h2>
      <ul className="products">{children}</ul>
    </section>
  );
}

export default Shop;
