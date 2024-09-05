import React from "react";

function Header() {
  let cartTotal = 0;
  return (
    <header id="main-header">
      <div id="main-title">
        <img src="logo.svg" alt="products logo" />
        <h1>Your Shop</h1>
      </div>
      <p>
        <button className="btn">Cart ({cartTotal})</button>
      </p>
    </header>
  );
}

export default Header;
