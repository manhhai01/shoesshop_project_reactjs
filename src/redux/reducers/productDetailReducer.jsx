import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { customNavigate } from "../../App";
import { http } from "../../utils/configInterceptor";

const initialState = {
  productDetail: {},
};

const productDetailReducer = createSlice({
  name: "productDetailReducer",
  initialState,
  reducers: {
    setProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const { setProductDetailAction } = productDetailReducer.actions;

export default productDetailReducer.reducer;

export const getProductDetailActionApi = (id) => {
  return async (dispatch) => {
    
      // let reusult;
      // reusult = await axios({
      //   url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      //   method: "GET",
      // });

      const res = await http.get(`/api/Product/getbyid?id=${id}`);

      if(res) {
        const actionDispatcher = setProductDetailAction(res.data?.content);
        dispatch(actionDispatcher);
      } 
  };
};
