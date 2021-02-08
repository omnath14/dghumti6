import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";

import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={addToCart}
            className="btn mb-4"
            style={{
              borderRadius: "5px",
              padding: "5px",
              width: "120px",
              color: "white",
              backgroundColor: "#523906",
            }}
          >
            Add to cart
          </button>
        </div>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 0 ? 0 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-danger"
        >
          <small>Remove from cart</small>
        </button>
      )
    );
  };

  return (
    <div
      className="card mb-4 card-fix"
      style={{ border: "1px solid #523906", borderRadius: "13px" }}
    >
      {shouldRedirect(redirect)}
      <Link to={`/product/${product._id}`}>
        <ShowImage item={product} url="product" />
      </Link>
      <span style={{ margin: "15px" }}>
        Rs. <span style={{ fontSize: "20px" }}>{product.price}</span>{" "}
        {/* <del style={{ fontSize: "14px", color: "#999999" }}>
          {product.cprice}
        </del> */}
        {"    "}
      </span>
      <div style={{ height: "45px", lineHeight: "16px", textAlign: "center" }}>
        <small className="mb-3">{product.description.substring(0, 20)}</small>
      </div>
      {showCartUpdateOptions(cartUpdate)}
      {showRemoveButton(showRemoveProductButton)}
      {showAddToCartBtn(showAddToCartButton)}
    </div>
  );
};

export default Card;
