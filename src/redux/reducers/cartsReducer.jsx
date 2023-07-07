import { createSlice } from "@reduxjs/toolkit";
import { USER_CARTS, getStoreJson, setStoreJson } from "../../utils/config";
import { http } from "../../utils/configInterceptor";
import { customNavigate } from "../../App";

const getUserCartFromLocalStorage = () => {
  const carts = getStoreJson(USER_CARTS);
  const orders = carts.map((item) => {
    return { productId: item.id, quantity: item.quantity };
  });

  return orders;
};

const initialState = {
  arrayProduct: getStoreJson(USER_CARTS) || [],
  userOrders: getUserCartFromLocalStorage(),
};

const cartsReducer = createSlice({
  name: "cartsReducer",
  initialState,
  reducers: {
    addCartsReducerAction: (state, action) => {
      const addItem = action.payload;
      let itemCart = state.arrayProduct.find((item) => item.id === addItem.id);
      if (itemCart) {
        itemCart.quantity += addItem.quantity;
      } else {
        state.arrayProduct.push(addItem);
      }
      setStoreJson(USER_CARTS, state.arrayProduct);
    },

    removeCartsReducerAction: (state, action) => {
      state.arrayProduct = state.arrayProduct.filter(
        (item) => item.id !== action.payload
      );
      setStoreJson(USER_CARTS, state.arrayProduct);
    },

    changeItemQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      let itemChange = state.arrayProduct.find((item) => item.id === id);
      if (itemChange) {
        itemChange.quantity += quantity;
        if (itemChange.quantity < 1) {
          alert("Sản phẩm không thể giảm số lượng, bạn có thể xoá sản phẩm !");
          itemChange.quantity -= quantity;
        }
      }
      setStoreJson(USER_CARTS, state.arrayProduct);
    },

    resetAction: (state, action) => {
      state.arrayProduct = action.payload.arrayProduct;
      state.userOrders = action.payload.userOrders;
    },
  },
});

export const {
  addCartsReducerAction,
  removeCartsReducerAction,
  changeItemQuantityAction,
  resetAction
} = cartsReducer.actions;

export default cartsReducer.reducer;

export const getUserOrdersActionApi = () => {
  return async (dispatch) => {
    const resProfile = await http.post("/api/Users/getProfile");

    if (resProfile) {
      const email = resProfile.data.content.email;
      const orderDetail = initialState.userOrders;
      const reqBody = { orderDetail, email };
      console.log(reqBody);

      const resOrder = await http.post("/api/Users/order", reqBody);

      if (resOrder) {
        alert("Đặt hàng thành công!");
        setStoreJson(USER_CARTS, []);
        const payload = {arrayProduct: [], userOrders: {}}
        const action = resetAction(payload)
        dispatch(action)
        customNavigate.push("/")
      }
    }
  };
};
