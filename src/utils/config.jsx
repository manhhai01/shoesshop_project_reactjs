import axios from "axios";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const NAME_REGEX = /^[a-zA-Z]+$/;
export const PHONE_REGEX = /^\d{10,11}$/;

export const USER_LOGIN = "userLogin";
export const USER_CARTS = "userCarts";
export const TOKEN = "accessToken";
export const DOMAIN = "https://shop.cyberlearn.vn/api";

const configClient = {
  setStoreJson: (name, data) => {
    let sData = JSON.stringify(data);
    localStorage.setItem(name, sData);
  },

  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      let sData = localStorage.getItem(name);
      let data = JSON.parse(sData);
      return data;
    }
    return undefined;
  },
  // Lưu chuỗi
  setStore: (name, data) => {
    localStorage.setItem(name, data);
  },
  // Lấy chuỗi
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return undefined;
  },
};

export const { setStoreJson, getStoreJson, setStore, getStore } = configClient;

export const convertDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};
