// src/components/Auth/Register.js
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
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
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

const RegisterWrapper = styled.div`
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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const userData = {
        ...values,
        roleName: "pharmacist",
      };
      const response = await dispatch(registerUser(userData));
      if (response.message === "User registered successfully") {
        setRegistrationSuccess(true);
        message.success(
          "Registration successful. You will be redirected to the login page."
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterWrapper>
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
          Register
        </Title>
        {registrationSuccess && (
          <Alert
            message="Registration Successful"
            description="You will be redirected to the login page shortly."
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        {errorMessage && (
          <Alert
            message="Registration Failed"
            description={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </StyledCard>
    </RegisterWrapper>
  );
};

export default Register;
