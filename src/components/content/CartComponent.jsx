import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeItemQuantityAction,
  getUserOrdersActionApi,
  removeCartsReducerAction,
} from "../../redux/reducers/cartsReducer";

const CartComponent = () => {
  const { arrayProduct } = useSelector((state) => state.cartsReducer);

  const dispatch = useDispatch();

  const getUserOrderFuntion = async () => {
    const actionAsync = getUserOrdersActionApi();
    dispatch(actionAsync);
  };

  const renderItemCarts = () => {
    return arrayProduct?.map((item, index) => {
      return (
        <tr key={index}>
          <th style={{ verticalAlign: "middle" }} scope="row"></th>
          <td style={{ verticalAlign: "middle" }}>{item.id}</td>
          <td style={{ verticalAlign: "middle" }}>
            <img style={{ width: 60, height: 60 }} src={item.image} alt="" />
          </td>
          <td style={{ verticalAlign: "middle" }}>{item.name}</td>
          <td style={{ verticalAlign: "middle" }}>{item.price}</td>
          <td style={{ verticalAlign: "middle" }}>
            <button
              style={{
                width: 30,
                backgroundColor: "#6200EE",
                padding: "1px 3px",
                margin: "0px 4px",
              }}
              className="btn text-white"
              onClick={(e) => {
                const payload = { id: item.id, quantity: 1 };
                dispatch(changeItemQuantityAction(payload));
              }}
            >
              +
            </button>
            <span>{item.quantity}</span>
            <button
              style={{
                width: 30,
                backgroundColor: "#6200EE",
                padding: "1px 3px",
                margin: "0px 4px",
              }}
              className="btn text-white"
              onClick={(e) => {
                const payload = { id: item.id, quantity: -1 };
                dispatch(changeItemQuantityAction(payload));
              }}
            >
              -
            </button>
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {item.price * item.quantity}
          </td>
          <td className="text-center" style={{ verticalAlign: "middle" }}>
            <button
              style={{
                width: 80,
                backgroundColor: "#6200EE",
                padding: "2px 10px",
                margin: "0px 4px",
              }}
              className="btn text-white"
            >
              Edit
            </button>
            <button
              style={{
                width: 80,
                backgroundColor: "#EB5757",
                padding: "2px 10px",
                margin: "0px 4px",
              }}
              className="btn text-white"
              onClick={() => {
                dispatch(removeCartsReducerAction(item.id));
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container mt-5">
      <h3>Carts</h3>
      <hr />
      <table className="table table table-striped table-hover mt-5">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">image</th>
            <th scope="col">name</th>
            <th scope="col">price</th>
            <th scope="col">quantity</th>
            <th scope="col">total</th>
            <th className="text-center" scope="col">
              action
            </th>
          </tr>
        </thead>
        <tbody>{renderItemCarts()}</tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button
          style={{ backgroundColor: "#F2994A" }}
          className="btn text-white"
          onClick={getUserOrderFuntion}
        >
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
