import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import productDetailReducer from "./reducers/productDetailReducer";
import userReducer from "./reducers/userReducer";
import cartsReducer from "./reducers/cartsReducer";

export const store = configureStore({
  reducer: {
    productReducer,
    productDetailReducer,
    userReducer,
    cartsReducer,
  },
});
