// Sidebar.jsx
import React, { useMemo } from "react";
import { Image, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  BarChartOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import logoImage from "../../assets/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -20px;
`;

const AppName = styled.h1`
  font-size: 16px;
  color: #1890ff;
  text-align: center;
`;

const Sidebar = React.memo(({ collapsed }) => {
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      {
        key: "home",
        icon: <HomeOutlined />,
        label: "Home",
        path: "/dashboard/home",
      },
      {
        key: "users",
        icon: <UserOutlined />,
        label: "Users",
        path: "/dashboard/users",
      },
      {
        key: "medicines",
        icon: <MedicineBoxOutlined />,
        label: "Medicines",
        path: "/dashboard/medicines",
      },
      {
        key: "suppliers",
        icon: <ContactsOutlined />,
        label: "Suppliers",
        path: "/dashboard/suppliers",
      },
      {
        key: "purchases",
        icon: <ShoppingCartOutlined />,
        label: "Purchases",
        path: "/dashboard/purchases",
      },
      {
        key: "sales",
        icon: <SolutionOutlined />,
        label: "Sales",
        path: "/dashboard/sales",
      },
      {
        key: "reports",
        icon: <BarChartOutlined />,
        label: "Reports",
        path: "/dashboard/reports",
      },
    ],
    []
  );

  const currentKey = location.pathname.split("/").pop();

  return (
    <>
      <LogoWrapper
        style={{
          marginBottom: collapsed ? "10px" : "10px",
          marginTop: collapsed ? "-10px" : "10px",
        }}
      >
        <Image
          src={logoImage}
          alt="App Logo"
          width={100}
          preview={false}
          style={{
            transform: `scale(${collapsed ? 0.6 : 1})`,
            transition: "transform 0.3s ease",
            marginBottom: "-20px",
          }}
        />
        {!collapsed && <AppName>Pharmacy App</AppName>}
      </LogoWrapper>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentKey]}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: (
            <NavLink to={item.path}>{collapsed ? "" : item.label}</NavLink>
          ),
          title: !collapsed ? "" : item.label,
        }))}
      />
    </>
  );
});

export default Sidebar;
