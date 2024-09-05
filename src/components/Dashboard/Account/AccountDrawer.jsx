// src/components/Account/AccountDrawer.js
import React, { useEffect, useState } from "react";
import { Drawer, Avatar, Typography, Divider, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { decodeToken } from "../../../utils/auth";
import api from "../../../utils/api";

const { Title, Text } = Typography;

const AccountDrawer = ({ visible, onClose }) => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const decodedToken = decodeToken();
        if (!decodedToken || !decodedToken.userId) {
          console.error("Invalid or missing token");
          setLoading(false);
          return;
        }
        const response = await api.get(`/users/${decodedToken.userId}`);
        if (response.data && response.data.data && response.data.data.user) {
          //   console.log("drawer :", response.data.data);
          setAccountInfo(response.data.data.user);
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchAccountInfo();
    }
  }, [visible]);

  return (
    <Drawer
      title="Account Information"
      placement="right"
      onClose={onClose}
      open={visible}
      width={300}
    >
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin size="large" />
        </div>
      ) : accountInfo ? (
        <>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Title level={4} style={{ marginTop: 16, marginBottom: 0 }}>
              {accountInfo.username}
            </Title>
            <Text type="secondary">{accountInfo.role.name}</Text>
          </div>
          <Divider />
          <p>
            <strong>Email:</strong> {accountInfo.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(accountInfo.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Role Description:</strong> {accountInfo.role.description}
          </p>
        </>
      ) : (
        <Text>Unable to fetch account information.</Text>
      )}
    </Drawer>
  );
};

export default AccountDrawer;
