import { createContext, useContext, useReducer } from "react";
import { getLocalStorageProducts } from "../utils/storage";

const products = getLocalStorageProducts().slice(0, 10);
// object properties help with auto-completion
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemsQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const currentItem = products.find(
        (product) => product.id === action.payload
      );

      updatedItems.push({
        id: action.payload,
        price: currentItem.price,
        title: currentItem.title,
        description: currentItem.description,
        quantity: 1,
      });
    }

    return { items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];

    const updatedItemIndex = updatedItems.findIndex((item) => {
      return item.id === action.payload.productId;
    });

    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { items: updatedItems };
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, ShoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleUpdateCartItemsQuantity(productId, amount) {
    ShoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }

  function handleAddItemToCart(id) {
    ShoppingCartDispatch({ type: "ADD_ITEM", payload: id });
  }

  const contextValue = {
    items: shoppingCartState.items,
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
