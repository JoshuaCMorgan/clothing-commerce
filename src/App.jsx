import { useState } from "react";
import { loader, getLocalStorageProducts } from "./utils/storage";
import Header from "./components/Header";
import { Product } from "./components/Product";
import Shop from "./components/Shop";
import { CartContext } from "./store/shopping-cart-context";
await loader();
const products = getLocalStorageProducts().slice(0, 10);

function App() {
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
    <CartContext.Provider value={contextValue}>
      <Header />
      <Shop>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Product {...product} />;
            </li>
          );
        })}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
