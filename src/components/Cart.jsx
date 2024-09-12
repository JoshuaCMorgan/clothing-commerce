import { useCartContext } from "../store/shopping-cart-context";

export function Cart() {
  const { items, updateItemsQuantity } = useCartContext();

  let cartTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                  <button onClick={() => updateItemsQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemsQuantity(item.id, 1)}>
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
