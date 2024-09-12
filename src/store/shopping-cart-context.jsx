import { createContext, useContext } from "react";
// object properties help with auto-completion
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemsQuantity: () => {},
});

export function useCartContext() {
  return useContext(CartContext);
}
