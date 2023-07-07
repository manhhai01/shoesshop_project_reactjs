import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { customNavigate } from "../../App";
import { USER_LOGIN, getStoreJson, setStoreJson } from "../../utils/config";
import { http } from "../../utils/configInterceptor";

const initialState = {
  userRegister: {},
  userLogin: getStoreJson(USER_LOGIN),
  userProfile: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserRegister: (state, action) => {
      state.userRegister = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  setUserRegister,
  setUserLogin,
  setUserProfile,
  setUserProfileUpdate,
} = userReducer.actions;

export default userReducer.reducer;

export const getRegisterActionApi = (userRegister) => {
  return async (dispatch) => {
    // const result = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Users/signup",
    //   method: "POST",
    //   data: userRegister,
    // });

    const res = await http.post("/api/Users/signup", userRegister);

    if (res) {
      const action = setUserRegister(res?.data.content);
      dispatch(action);
      alert("Đăng ký thành công");
      customNavigate.push("/login");
    }
  };
};

// login
export const getloginActionApi = (userLogin) => {
  // userLogin {email, password}
  return async (dispatch) => {
    // xử lý api
    // const res = await http.post("/api/Users/signin");
    // const res = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Users/signin",
    //   method: "POST",
    //   data: userLogin,
    // });

    const res = await http.post("/api/Users/signin", userLogin);

    // Sau khi đăng nhập thành công
    // => đưa lên store redux
    if (res) {
      const action = setUserLogin(res?.data.content);
      dispatch(action);

      // đem giá trị đăng nhập thành công lưu vào localstorage
      setStoreJson(USER_LOGIN, res.data.content);

      customNavigate.push("/profile");
    }
  };
};

export const getProfileActonApi = () => {
  return async (dispatch) => {
    // const res = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Users/getProfile",
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
    //   },
    // });

    const res = await http.post("/api/Users/getProfile");

    // đưa lên store redux
    const action = setUserProfile(res?.data.content);
    dispatch(action);
  };
};

export const getUpdateProfileActionApi = (userProfile) => {
  return async (dispatch) => {
    const res = await http.post("/api/Users/updateProfile", userProfile);

    console.log(res)
    if(res) {
      alert("Tài khoản update thành công !")
    }
  };
};
