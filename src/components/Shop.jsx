import React from "react";
import { getLocalStorageProducts } from "../utils/storage";
function Shop() {
  const products = getLocalStorageProducts().slice(0, 10);

  return (
    <section className="shop-container">
      <h2>Products for everyone</h2>
      <ul className="products">
        {products.map((item) => {
          const { id, title, price, description, image } = item;
          return (
            <li key={item.id}>
              <article className="product">
                <img src={image} />
                <div className="product-content">
                  <div>
                    <h3 className="product-title">{title}</h3>
                    <p className="product-price">${price}</p>
                    <p className="product-description">{description}</p>
                  </div>
                  <p className="product-actions">
                    <button className="btn" onClick={() => onAddToCart(id)}>
                      Add to Cart
                    </button>
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Shop;
