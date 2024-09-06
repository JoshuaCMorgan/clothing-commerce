import { useState } from "react";
import { loader } from "./utils/storage";
import Header from "./components/Header";
import Shop from "./components/Shop";
import "./index.css";

// async function getProducts() {
//   try {
//     let response = await fetch("https://api.escuelajs.co/api/v1/products");
//     if (!response.ok) {
//       throw new Error(await response.text());
//     } else {
//       let result = await response.json();
//       return result;
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// }

// function getUserCart() {
//   return JSON.parse(localStorage.getItem("userCart"));
// }
// async function init() {
//   const products = await getProducts();

//   if (getUserCart()) return;
//   localStorage.clear();
//   localStorage.setItem("products", JSON.stringify(products));
//   localStorage.setItem(
//     "userCart",
//     JSON.stringify({ userProducts: [], userTotalPrice: "0.00" })
//   );
// }

// await init();
await loader();

function App() {
  return (
    <>
      <Header></Header>
      <Shop></Shop>
    </>
  );
}

export default App;
