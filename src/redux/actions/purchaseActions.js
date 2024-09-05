//  src/redux/actions/purchaseActions.js

import api from "../../utils/api";

export const FETCH_PURCHASES_REQUEST = "FETCH_PURCHASES_REQUEST";
export const FETCH_PURCHASES_SUCCESS = "FETCH_PURCHASES_SUCCESS";
export const FETCH_PURCHASES_FAILURE = "FETCH_PURCHASES_FAILURE";

export const ADD_PURCHASE_REQUEST = "ADD_PURCHASE_REQUEST";
export const ADD_PURCHASE_SUCCESS = "ADD_PURCHASE_SUCCESS";
export const ADD_PURCHASE_FAILURE = "ADD_PURCHASE_FAILURE";

export const UPDATE_PURCHASE_REQUEST = "UPDATE_PURCHASE_REQUEST";
export const UPDATE_PURCHASE_SUCCESS = "UPDATE_PURCHASE_SUCCESS";
export const UPDATE_PURCHASE_FAILURE = "UPDATE_PURCHASE_FAILURE";

export const DELETE_PURCHASE_REQUEST = "DELETE_PURCHASE_REQUEST";
export const DELETE_PURCHASE_SUCCESS = "DELETE_PURCHASE_SUCCESS";
export const DELETE_PURCHASE_FAILURE = "DELETE_PURCHASE_FAILURE";

export const fetchPurchases =
  (page = 1) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PURCHASES_REQUEST });
    try {
      const response = await api.get(`/purchases?page=${page}`);
      dispatch({ type: FETCH_PURCHASES_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_PURCHASES_FAILURE, payload: error.message });
    }
  };

export const addPurchase = (data) => async (dispatch) => {
  dispatch({ type: ADD_PURCHASE_REQUEST });
  try {
    const response = await api.post("/purchases", data);
    dispatch({ type: ADD_PURCHASE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: ADD_PURCHASE_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during purchase creation");
    }
  }
};

export const updatePurchase = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_PURCHASE_REQUEST });
  try {
    const response = await api.put(`/purchases/${id}`, data);
    dispatch({ type: UPDATE_PURCHASE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_PURCHASE_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during purchase update");
    }
  }
};

export const deletePurchase = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PURCHASE_REQUEST });
  try {
    await api.delete(`/purchases/${id}`);
    dispatch({ type: DELETE_PURCHASE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PURCHASE_FAILURE, payload: error.message });
  }
};
