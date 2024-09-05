// src/config/NotFound.jsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={[
        <Button key="back" onClick={() => navigate(-1)}>
          Go Back
        </Button>,
        <Button
          type="primary"
          key="home"
          onClick={() => navigate("/dashboard/home")}
        >
          Back Home
        </Button>,
      ]}
    />
  );
};

export default NotFound;
