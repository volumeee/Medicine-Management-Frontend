// src/config/OfflineDetector.jsx
import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: ${(props) => (props.show ? "0" : "-100px")};
  left: 0;
  right: 0;
  z-index: 1000;
  transition: bottom 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? "1" : "0")};
`;

const OfflineDetector = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOffline) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  return (
    <StyledAlert
      message="You are offline"
      description="Some features may be unavailable. Please check your internet connection."
      type="error"
      showIcon
      show={show}
    />
  );
};

export default OfflineDetector;
