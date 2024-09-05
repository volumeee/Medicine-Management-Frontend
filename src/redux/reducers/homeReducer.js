// src/redux/reducers/homeReducer.js
import {
  FETCH_HOME_DATA_REQUEST,
  FETCH_HOME_DATA_SUCCESS,
  FETCH_HOME_DATA_FAILURE,
  FETCH_MODAL_DATA_REQUEST,
  FETCH_MODAL_DATA_SUCCESS,
  FETCH_MODAL_DATA_FAILURE,
} from "../actions/homeActions";

const initialState = {
  loading: false,
  error: null,
  cardData: {},
  rankData: {
    supplierRank: { data: [], meta: {} },
    pharmacistRank: { data: [], meta: {} },
  },
  recentData: {
    recentSales: { data: [], meta: {} },
  },
  charts: {},
  bestSellingMedicines: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_DATA_REQUEST:
    case FETCH_MODAL_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case FETCH_MODAL_DATA_SUCCESS:
      const { dataType, data } = action.payload;
      return {
        ...state,
        loading: false,
        rankData: {
          ...state.rankData,
          [dataType]: data.rankData?.[dataType] || state.rankData[dataType],
        },
        recentData: {
          ...state.recentData,
          [dataType]: data.recentData?.[dataType] || state.recentData[dataType],
        },
      };
    case FETCH_HOME_DATA_FAILURE:
    case FETCH_MODAL_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
