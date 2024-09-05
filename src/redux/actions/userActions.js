// src/redux/actions/userActions.js
import api from "../../utils/api";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const fetchUsers =
  (page = 1) =>
  async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await api.get(`/users?page=${page}`);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };

export const addUser = (userData) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  try {
    const response = await api.post("/users/create-user", userData);
    dispatch({ type: ADD_USER_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: ADD_USER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during user creation");
    }
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.put(`/users/update-user/${userId}`, userData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during user update");
    }
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    await api.delete(`/users/${userId}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during user deletion");
    }
  }
};
