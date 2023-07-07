import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../utils/configInterceptor";

const initialState = {
  products: [],
  productSearch: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProductsAction: (state, action) => {
      state.products = action.payload;
    },

    setProductSearchAction: (state, action) => {
      state.productSearch = action.payload;
    },
  },
});

export const { setProductsAction, setProductSearchAction } =
  productReducer.actions;

export default productReducer.reducer;

// async action

export const getProductsActionApi = () => {
  return async (dispatch) => {
    // const result = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Product",
    //   method: "GET",
    // });

    const res = await http.get("/api/Product");

    if (res) {
      const action = setProductsAction(res?.data.content);
      dispatch(action);
    }
  };
};

export const getProductSearchActionApi = (keyword) => {
  return async (dispatch) => {
    // const result = await axios({
    //   url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
    //   method: "GET",
    // });

    const res = await http.get(`/api/Product?keyword=${keyword}`);

    if (res) {
      const action = setProductSearchAction(res?.data.content);
      dispatch(action);
    }
  };
};
