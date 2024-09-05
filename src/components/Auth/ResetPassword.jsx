// src/components/Auth/ResetPassword.js
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Typography,
  Steps,
  Alert,
  Image,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { forgotPassword, resetPassword } from "../../redux/actions/authActions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";

const { Title } = Typography;
const { Step } = Steps;

const ResetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -20px;
`;

const AppName = styled.h1`
  font-size: 24px;
  color: #1890ff;
`;

const ResetPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (currentStep === 1 && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResendOTP(true);
    }
    return () => clearTimeout(timer);
  }, [currentStep, countdown]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // setTimeout(() => setAlert(null), 8000);
  };

  const onSendOTP = async (values) => {
    setLoading(true);
    try {
      const response = await dispatch(forgotPassword(values.email));
      setEmail(values.email);
      showAlert("success", `Check your email: ${values.email} for OTP`);
      setCurrentStep(1);
      setCountdown(60);
      setCanResendOTP(false);
    } catch (error) {
      if (error.message) {
        showAlert("error", error.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await dispatch(
        resetPassword(email, values.otp, values.newPassword)
      );
      if (response.message === "Password reset successfully") {
        showAlert("success", response.message);
        message.success(
          "Password reset successfully. You will be redirected to the login page."
        );
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      if (error.message) {
        showAlert("error", error.message || "Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (canResendOTP) {
      setLoading(true);
      try {
        const response = await dispatch(forgotPassword(email));
        showAlert("success", `New OTP sent to ${email}`);
        setCountdown(60);
        setCanResendOTP(false);
      } catch (error) {
        if (error.message) {
          showAlert("error", error.message || "Failed to resend OTP");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const steps = [
    {
      title: "Send OTP",
      content: (
        <Form name="send_otp" onFinish={onSendOTP}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Reset Password",
      content: (
        <Form
          name="reset_password"
          onFinish={onResetPassword}
          layout="vertical"
        >
          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "Please input the OTP!" }]}
          >
            <Input.OTP
              length={5}
              style={{ width: "100%" }}
              placeholder="Enter OTP"
              inputType="numeric"
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please input new password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Reset Password
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleResendOTP} disabled={!canResendOTP} block>
              {canResendOTP ? "Resend OTP" : `Resend OTP (${countdown}s)`}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <ResetWrapper>
      <StyledCard>
        <LogoWrapper>
          <Image
            src={logoImage}
            alt="App Logo"
            width={100}
            preview={false}
            style={{ marginBottom: "-30px" }}
          />
          <AppName>Pharmacy App</AppName>
        </LogoWrapper>
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          Reset Password
        </Title>
        {alert && (
          <Alert
            message={alert.type === "success" ? "Success" : "Error"}
            description={alert.message}
            type={alert.type}
            showIcon
            closable
            onClose={() => setAlert(null)}
            style={{ marginBottom: "16px" }}
          />
        )}
        <Steps current={currentStep} style={{ marginBottom: "24px" }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[currentStep].content}
      </StyledCard>
    </ResetWrapper>
  );
};

export default ResetPassword;
