import React, { useEffect } from "react";
import { Layout } from "antd";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN, getStoreJson } from "../utils/config";
import { setUserLogin } from "../redux/reducers/userReducer";

const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 65,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#000000",
};

const logoCyberSoftStyle = {
  height: 50,
  width: 160,
  cursor: "pointer",
};

const itemNavbar = {
  margin: "0 24px",
  fontSize: 15,
  fontWeight: 300,
  cursor: "pointer",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const HeaderComponent = () => {
  const { arrayProduct } = useSelector((state) => state.cartsReducer);

  const { userLogin } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const renderLogin = () => {
    if (userLogin?.accessToken) {
      return (
        <>
          <NavLink style={navLinkStyle} to={"/profile"}>
            <div style={itemNavbar}>{userLogin.email}</div>
          </NavLink>

          <NavLink style={navLinkStyle} to={"/"}>
            <div
              style={itemNavbar}
              onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                const action = setUserLogin({});
                dispatch(action)
              }}
            >
              Logout
            </div>
          </NavLink>
        </>
      );
    }

    return (
      <>
        <NavLink style={navLinkStyle} to={"/login"}>
          <div style={itemNavbar} className="login">
            Login
          </div>
        </NavLink>

        <NavLink style={navLinkStyle} to={"/register"}>
          <div style={itemNavbar} className="register">
            Register
          </div>
        </NavLink>
      </>
    );
  };

  return (
    <Header style={headerStyle}>
      <Row>
        <Col span={18} push={6}>
          <nav style={{ backgroundColor: "black" }}>
            <div className="d-flex justify-content-end">
              <NavLink style={navLinkStyle} to={`/search`}>
                <div style={itemNavbar} className="search d-flex">
                  <div className="icon_search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div>Search</div>
                </div>
              </NavLink>
              <NavLink style={navLinkStyle} to={"/cart"}>
                <div style={itemNavbar} className="cart d-flex">
                  <div className="icon-cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div>Cart({arrayProduct.length})</div>
                </div>
              </NavLink>
              {renderLogin()}
            </div>
          </nav>
        </Col>
        <Col span={6} pull={18}>
          <NavLink to="/">
            <img
              style={logoCyberSoftStyle}
              src="/images/logo_cybersoft.png"
              alt="logo_cybersoft"
            />
          </NavLink>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
