// src/action/supplierActions.js

import api from "../../utils/api";

export const FETCH_SUPPLIERS_REQUEST = "FETCH_SUPPLIERS_REQUEST";
export const FETCH_SUPPLIERS_SUCCESS = "FETCH_SUPPLIERS_SUCCESS";
export const FETCH_SUPPLIERS_FAILURE = "FETCH_SUPPLIERS_FAILURE";

export const ADD_SUPPLIER_REQUEST = "ADD_SUPPLIER_REQUEST";
export const ADD_SUPPLIER_SUCCESS = "ADD_SUPPLIER_SUCCESS";
export const ADD_SUPPLIER_FAILURE = "ADD_SUPPLIER_FAILURE";

export const UPDATE_SUPPLIER_REQUEST = "UPDATE_SUPPLIER_REQUEST";
export const UPDATE_SUPPLIER_SUCCESS = "UPDATE_SUPPLIER_SUCCESS";
export const UPDATE_SUPPLIER_FAILURE = "UPDATE_SUPPLIER_FAILURE";

export const DELETE_SUPPLIER_REQUEST = "DELETE_SUPPLIER_REQUEST";
export const DELETE_SUPPLIER_SUCCESS = "DELETE_SUPPLIER_SUCCESS";
export const DELETE_SUPPLIER_FAILURE = "DELETE_SUPPLIER_FAILURE";

export const fetchSuppliers =
  (page = 1) =>
  async (dispatch) => {
    dispatch({ type: FETCH_SUPPLIERS_REQUEST });
    try {
      const response = await api.get(`/suppliers?page=${page}`);
      dispatch({ type: FETCH_SUPPLIERS_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_SUPPLIERS_FAILURE, payload: error.message });
    }
  };

export const addSupplier = (data) => async (dispatch) => {
  dispatch({ type: ADD_SUPPLIER_REQUEST });
  try {
    const response = await api.post("/suppliers", data);
    dispatch({ type: ADD_SUPPLIER_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: ADD_SUPPLIER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during supplier creation");
    }
  }
};

export const updateSupplier = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_SUPPLIER_REQUEST });
  try {
    const response = await api.put(`/suppliers/${id}`, data);
    dispatch({ type: UPDATE_SUPPLIER_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_SUPPLIER_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during supplier update");
    }
  }
};

export const deleteSupplier = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUPPLIER_REQUEST });
  try {
    await api.delete(`/suppliers/${id}`);
    dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_SUPPLIER_FAILURE, payload: error.message });
  }
};
