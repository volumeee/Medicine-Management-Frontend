// src/components/Auth/Login.js
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Typography,
  Image,
  Alert,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";
import styled, { keyframes } from "styled-components";
import logoImage from "../../assets/logo.png";

const { Title } = Typography;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await dispatch(loginUser(values));
      if (response.token) {
        setToken(response.token);
        setLoginSuccess(true);
        message.success(
          "Login successful. You will be redirected to the dashboard."
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        let errorMessage = error.message;
        if (errorMessage === "Network Error") {
          errorMessage = "Internal server error";
        }
        setErrorMessage(`Login failed. ${errorMessage}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
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
          Login
        </Title>
        {loginSuccess && (
          <Alert
            message="Login Successful"
            description="You will be redirected to the dashboard shortly."
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        {errorMessage && (
          <Alert
            message="Login Failed"
            description={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          Don't have an account? <a href="/register">Register</a>
        </div>
        {errorMessage && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        )}
      </StyledCard>
    </LoginWrapper>
  );
};

export default Login;
