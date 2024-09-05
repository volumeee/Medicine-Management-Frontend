// src/utils/auth.js
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = (token) => localStorage.getItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/login") {
        navigate("/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [location, navigate]);

  return { isAuthenticated };
};

export const decodeToken = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

const publicRoutes = ["/login", "/register", "/forgot-password"];
