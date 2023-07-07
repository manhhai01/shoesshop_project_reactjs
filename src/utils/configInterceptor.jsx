import axios from "axios";
import { customNavigate } from "../App";
import { USER_LOGIN, getStoreJson, setStoreJson } from "./config";

// tạo bản sao của axios
export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
  timeout: 3000, // set thời gian chờ
});

//cấu hình cho request
http.interceptors.request.use(
  (req) => {
    if (getStoreJson(USER_LOGIN)) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
      };
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//cấu hình cho responses
http.interceptors.response.use(
  (res) => {
    // Tất cả kết quả trả về từ http đều chạy vào hàm này

    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      // Nếu chưa xác thực thì về trang login
      customNavigate.push("/login");
      return;
    } else if (err.response?.status === 400) {
      // Chuyển hướng trang về login
      console.log(err.response.config.url);

      if (err.response?.config.url.includes("/api/Product/getbyid")) {
        customNavigate.push("/");
      } else if(err.response?.config.url.includes("/api/Users/signup")) {
        alert(err.response.data.message);
        customNavigate.push("/register");
      }
      return;
    }

    return Promise.reject(err);
  }
);
