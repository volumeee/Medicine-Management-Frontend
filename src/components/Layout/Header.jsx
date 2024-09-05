// src/components/Layout/Header.js
import React, { useState } from "react";
import { Layout, Button, Menu, Dropdown, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";

//lazy load components
const AccountDrawer = React.lazy(() =>
  import("../Dashboard/Account/AccountDrawer")
);

const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountDrawerVisible, setAccountDrawerVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const showAccountDrawer = () => {
    setAccountDrawerVisible(true);
  };

  const closeAccountDrawer = () => {
    setAccountDrawerVisible(false);
  };

  const menuItems = [
    {
      key: "0",
      label: <a onClick={showAccountDrawer}>Profile</a>,
    },
    {
      key: "1",
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div style={{ marginRight: "16px" }}>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
      <AccountDrawer
        visible={accountDrawerVisible}
        onClose={closeAccountDrawer}
      />
    </Header>
  );
};

export default AppHeader;
