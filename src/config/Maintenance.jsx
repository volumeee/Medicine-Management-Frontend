// src/config/Maintenance.jsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Maintenance = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="warning"
      title={`${pageName} Maintenance`}
      subTitle={`Sorry, the ${pageName.toLowerCase()} page is currently under maintenance. Please try again later.`}
      extra={[
        <Button key="back" onClick={() => navigate(-1)}>
          Go Back
        </Button>,
        <Button
          type="primary"
          key="home"
          onClick={() => navigate("/dashboard/home")}
        >
          Back to home
        </Button>,
      ]}
    />
  );
};

export default Maintenance;
