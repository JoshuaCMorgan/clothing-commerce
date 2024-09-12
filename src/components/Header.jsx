import { useRef } from "react";
import CartModal from "./CartModal";

function Header({ cart, onUpdateCartItemQuantity }) {
  const modal = useRef();
  const itemsCount = cart.items.length;
  let modalActions = <button>Close</button>;

  if (itemsCount > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }
  let cartTotal = 0;

  function handleOpenCartClick() {
    modal.current.open();
  }
  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.svg" alt="products logo" />
          <h1>Your Shop</h1>
        </div>
        <p>
          <button className="btn" onClick={handleOpenCartClick}>
            Cart ({cartTotal})
          </button>
        </p>
      </header>
    </>
  );
}

export default Header;
