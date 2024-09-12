import Header from "./components/Header";
import { Product } from "./components/Product";
import { loader, getLocalStorageProducts } from "../src/utils/storage";
import Shop from "./components/Shop";
import CartContextProvider from "../src/store/shopping-cart-context";
await loader();
const products = getLocalStorageProducts().slice(0, 10);
function App() {
  return (
    <CartContextProvider>
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
    </CartContextProvider>
  );
}

export default App;
