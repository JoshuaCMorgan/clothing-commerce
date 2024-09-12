import React from "react";
export function Cart({ items, onUpdateItemQuantity }) {
  let cartTotal = items.reduce((acc, currValue) => {
    return acc + currValue.price * currValue.quantity;
  }, 0);

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;
            const formattedTitle = `${item.title
              .split(" ")
              .slice(0, 2)
              .join(" ")}`;
            return (
              <li key={item.id}>
                <div>
                  <span>{formattedTitle}</span>
                  <span>({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total">
        Cart Total: <strong>${cartTotal}</strong>
      </p>
    </div>
  );
}
