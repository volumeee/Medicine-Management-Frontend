// src/redux/reducers/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SHOW_SESSION_EXPIRED_MODAL,
  HIDE_SESSION_EXPIRED_MODAL,
} from "../actions/authActions";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showSessionExpiredModal: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, token: null };
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SHOW_SESSION_EXPIRED_MODAL:
      return { ...state, showSessionExpiredModal: true };
    case HIDE_SESSION_EXPIRED_MODAL:
      return { ...state, showSessionExpiredModal: false };
    default:
      return state;
  }
};

export default authReducer;
