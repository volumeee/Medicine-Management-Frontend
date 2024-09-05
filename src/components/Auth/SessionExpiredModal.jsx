// src/components/SessionExpiredModal.jsx
import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const SessionExpiredModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Modal
      title="Session Expired"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Login"
      cancelText="Close"
    >
      <p>Your session has expired. Please login again to continue.</p>
    </Modal>
  );
};

export default SessionExpiredModal;
