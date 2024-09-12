import { useRef } from "react";
import CartModal from "./CartModal";

function Header({ cart, onUpdateCartItemsQuantity }) {
  const modal = useRef();
  console.log({ cart });

  const cartQuantity = cart.items.length;

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  function handleOpenCartClick() {
    modal.current.open();
  }
  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemsQuantity}
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.svg" alt="products logo" />
          <h1>Your Shop</h1>
        </div>
        <p>
          <button className="btn" onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </button>
        </p>
      </header>
    </>
  );
}

export default Header;
