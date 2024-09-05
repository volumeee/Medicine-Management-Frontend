// src/redux/reducers/supplierReducer.js

import {
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  ADD_SUPPLIER_REQUEST,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_FAILURE,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAILURE,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAILURE,
} from "../actions/supplierActions";

const initialState = {
  suppliers: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUPPLIERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUPPLIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: action.payload.data.data,
        currentPage: action.payload.data.page.current,
        totalPages: action.payload.data.page.total,
        totalItems: action.payload.data.meta.total,
      };
    case FETCH_SUPPLIERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_SUPPLIER_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: [...state.suppliers, action.payload],
      };
    case ADD_SUPPLIER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_SUPPLIER_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.map((supplier) =>
          supplier.id === action.payload.id ? action.payload : supplier
        ),
      };
    case UPDATE_SUPPLIER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_SUPPLIER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ),
      };
    case DELETE_SUPPLIER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default supplierReducer;
