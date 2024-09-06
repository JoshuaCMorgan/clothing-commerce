async function getProducts() {
  try {
    let response = await fetch("https://fakestoreapi.in/api/products");
    if (!response.ok) {
      throw new Error(await response.text());
    } else {
      let result = await response.json();
      return result;
    }
  } catch (error) {
    alert(error.message);
  }
}

export function getUserCart() {
  return JSON.parse(localStorage.getItem("userCart"));
}

export function getLocalStorageProducts() {
  return JSON.parse(localStorage.getItem("products"));
}
export async function loader() {
  const resource = await getProducts();
  const products = resource.products;

  if (getUserCart()) return;
  localStorage.clear();
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem(
    "userCart",
    JSON.stringify({ userProducts: [], userTotalPrice: "0.00" })
  );
}
