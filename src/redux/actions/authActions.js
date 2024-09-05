// src/redux/actions/authActions.js
import api from "../../utils/api";
import { removeToken } from "../../utils/auth";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT = "LOGOUT";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const SHOW_SESSION_EXPIRED_MODAL = "SHOW_SESSION_EXPIRED_MODAL";
export const HIDE_SESSION_EXPIRED_MODAL = "HIDE_SESSION_EXPIRED_MODAL";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post("/auth/login", credentials);
    const { token } = response.data;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during login";
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    throw error;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const response = await api.post("/users/forgot-password", { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during password reset");
    }
  }
};

export const resetPassword = (email, otp, newPassword) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const response = await api.post("/users/reset-password", {
      email,
      otp,
      newPassword,
    });
    dispatch({ type: RESET_PASSWORD_SUCCESS });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during password reset");
    }
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await api.post("/auth/register", userData);
    dispatch({ type: REGISTER_SUCCESS });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during registration");
    }
  }
};

export const showSessionExpiredModal = () => (dispatch) => {
  dispatch({ type: SHOW_SESSION_EXPIRED_MODAL });
};

export const hideSessionExpiredModal = () => (dispatch) => {
  dispatch({ type: HIDE_SESSION_EXPIRED_MODAL });
};

export const logoutUser = () => (dispatch) => {
  removeToken();
  dispatch({ type: LOGOUT });
};
