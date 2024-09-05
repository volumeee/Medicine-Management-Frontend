// src/redux/actions/medicineActions.js
import api from "../../utils/api";

export const FETCH_MEDICINES_REQUEST = "FETCH_MEDICINES_REQUEST";
export const FETCH_MEDICINES_SUCCESS = "FETCH_MEDICINES_SUCCESS";
export const FETCH_MEDICINES_FAILURE = "FETCH_MEDICINES_FAILURE";

export const ADD_MEDICINE_REQUEST = "ADD_MEDICINE_REQUEST";
export const ADD_MEDICINE_SUCCESS = "ADD_MEDICINE_SUCCESS";
export const ADD_MEDICINE_FAILURE = "ADD_MEDICINE_FAILURE";

export const UPDATE_MEDICINE_REQUEST = "UPDATE_MEDICINE_REQUEST";
export const UPDATE_MEDICINE_SUCCESS = "UPDATE_MEDICINE_SUCCESS";
export const UPDATE_MEDICINE_FAILURE = "UPDATE_MEDICINE_FAILURE";

export const DELETE_MEDICINE_REQUEST = "DELETE_MEDICINE_REQUEST";
export const DELETE_MEDICINE_SUCCESS = "DELETE_MEDICINE_SUCCESS";
export const DELETE_MEDICINE_FAILURE = "DELETE_MEDICINE_FAILURE";

export const fetchMedicines =
  (page = 1) =>
  async (dispatch) => {
    dispatch({ type: FETCH_MEDICINES_REQUEST });
    try {
      const response = await api.get(`/medicines?page=${page}`);
      dispatch({ type: FETCH_MEDICINES_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FETCH_MEDICINES_FAILURE, payload: error.message });
    }
  };

export const addMedicine = (data) => async (dispatch) => {
  dispatch({ type: ADD_MEDICINE_REQUEST });
  try {
    const response = await api.post("/medicines", data);
    dispatch({ type: ADD_MEDICINE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: ADD_MEDICINE_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during medicine creation");
    }
  }
};

export const updateMedicine = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_MEDICINE_REQUEST });
  try {
    const response = await api.put(`/medicines/${id}`, data);
    dispatch({ type: UPDATE_MEDICINE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_MEDICINE_FAILURE, payload: error.response.data });
      throw error.response.data;
    } else {
      throw new Error("An error occurred during medicine update");
    }
  }
};

export const deleteMedicine = (id) => async (dispatch) => {
  dispatch({ type: DELETE_MEDICINE_REQUEST });
  try {
    await api.delete(`/medicines/${id}`);
    dispatch({ type: DELETE_MEDICINE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_MEDICINE_FAILURE, payload: error.message });
  }
};
