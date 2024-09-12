import React from "react";
import { useCartContext } from "../store/shopping-cart-context";
export function Product({ image, title, price, description, id }) {
  const { addItemToCart } = useCartContext();

  return (
    <article className="product">
      <img src={image} />
      <div className="product-content">
        <div>
          <h3 className="product-title">{title}</h3>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
        </div>
        <p className="product-actions">
          <button className="btn" onClick={() => addItemToCart(id)}>
            Add to Cart
          </button>
        </p>
      </div>
    </article>
  );
}
