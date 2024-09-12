import { createContext, useContext, useState } from "react";
import { getLocalStorageProducts } from "../utils/storage";

const products = getLocalStorageProducts().slice(0, 10);
// object properties help with auto-completion
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemsQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  function handleUpdateCartItemsQuantity(productId, amount) {
    setShoppingCart((previousShoppingCart) => {
      const updatedItems = [...previousShoppingCart.items];

      const updatedItemIndex = updatedItems.findIndex((item) => {
        return item.id === productId;
      });

      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return { items: updatedItems };
    });
  }

  function handleAddItemToCart(id) {
    setShoppingCart((previousShoppingCart) => {
      const updatedItems = [...previousShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const currentItem = products.find((product) => product.id === id);
        updatedItems.push({
          id,
          price: currentItem.price,
          title: currentItem.title,
          description: currentItem.description,
          quantity: 1,
        });
      }

      return { items: updatedItems };
    });
  }

  const contextValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemsQuantity: handleUpdateCartItemsQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
