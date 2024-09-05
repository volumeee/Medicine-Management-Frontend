// src/redux/reducers/purchaseReducer.js

import {
  FETCH_PURCHASES_REQUEST,
  FETCH_PURCHASES_SUCCESS,
  FETCH_PURCHASES_FAILURE,
  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_SUCCESS,
  ADD_PURCHASE_FAILURE,
  UPDATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_FAILURE,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  DELETE_PURCHASE_FAILURE,
} from "../actions/purchaseActions";

const initialState = {
  purchases: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PURCHASES_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: action.payload.data.data,
        currentPage: action.payload.data.page.current,
        totalPages: action.payload.data.page.total,
        totalItems: action.payload.data.meta.total,
      };
    case FETCH_PURCHASES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PURCHASE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: [...state.purchases, action.payload],
      };
    case ADD_PURCHASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PURCHASE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: state.purchases.map((purchase) =>
          purchase.id === action.payload.id ? action.payload : purchase
        ),
      };
    case UPDATE_PURCHASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PURCHASE_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchases: state.purchases.filter(
          (purchase) => purchase.id !== action.payload
        ),
      };
    case DELETE_PURCHASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default purchaseReducer;
