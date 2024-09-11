import { useState } from "react";
import { loader, getLocalStorageProducts } from "./utils/storage";
import Header from "./components/Header";
import { Product } from "./components/Product";
import Shop from "./components/Shop";
import "./index.css";

await loader();
const products = getLocalStorageProducts().slice(0, 10);
console.log(products);

function App() {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });
  /*
id, price, title, description,
*/
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

  return (
    <>
      <Header cart={shoppingCart}></Header>
      <Shop>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Product {...product} onAddToCart={handleAddItemToCart} />;
            </li>
          );
        })}
      </Shop>
    </>
  );
}

export default App;
