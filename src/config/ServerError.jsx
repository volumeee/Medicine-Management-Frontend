import React from "react";
import { Result, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const ServerError = ({ onRetry }) => {
  return (
    <Result
      status="500"
      title="Internal Server Error"
      subTitle="Sorry, the server is not responding. Please try again later."
      extra={[
        <Button
          type="primary"
          key="retry"
          icon={<ReloadOutlined />}
          onClick={onRetry}
        >
          Try Again
        </Button>,
        <Button
          key="contact"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Support
        </Button>,
      ]}
    />
  );
};

export default ServerError;
