import React from "react";
import { Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";

const HomeTemplate = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout>
        <HeaderComponent />
        <NavbarComponent />
        <div style={{ minHeight: 650, backgroundColor: "white" }}>
          <Outlet />
        </div>
        <FooterComponent />
      </Layout>
    </Space>
  );
};

export default HomeTemplate;
