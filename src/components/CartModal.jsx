import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });
  let total = 125.34;
  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <div id="cart">
        {cartItems.length === 0 && <p>No items in cart!</p>}
        <p id="cart-total">
          Cart Total: <strong>${total}</strong>
        </p>
      </div>
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
