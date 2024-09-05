// src/redux/reducers/medicineReducer.js

import {
  FETCH_MEDICINES_REQUEST,
  FETCH_MEDICINES_SUCCESS,
  FETCH_MEDICINES_FAILURE,
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  ADD_MEDICINE_FAILURE,
  UPDATE_MEDICINE_REQUEST,
  UPDATE_MEDICINE_SUCCESS,
  UPDATE_MEDICINE_FAILURE,
  DELETE_MEDICINE_REQUEST,
  DELETE_MEDICINE_SUCCESS,
  DELETE_MEDICINE_FAILURE,
} from "../actions/medicineActions";

const initialState = {
  medicines: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

const medicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDICINES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEDICINES_SUCCESS:
      return {
        ...state,
        loading: false,
        medicines: action.payload.data.data,
        currentPage: action.payload.data.page.current,
        totalPages: action.payload.data.page.total,
        totalItems: action.payload.data.meta.total,
      };
    case FETCH_MEDICINES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_MEDICINE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_MEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        medicines: [...state.medicines, action.payload],
      };
    case ADD_MEDICINE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_MEDICINE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_MEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        medicines: state.medicines.map((medicine) =>
          medicine.id === action.payload.id ? action.payload : medicine
        ),
      };
    case UPDATE_MEDICINE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_MEDICINE_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_MEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        medicines: state.medicines.filter(
          (medicine) => medicine.id !== action.payload
        ),
      };
    case DELETE_MEDICINE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default medicineReducer;
