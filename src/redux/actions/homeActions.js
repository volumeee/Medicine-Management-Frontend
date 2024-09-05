// src/redux/actions/homeActions.js
import api from "../../utils/api";

export const FETCH_HOME_DATA_REQUEST = "FETCH_HOME_DATA_REQUEST";
export const FETCH_HOME_DATA_SUCCESS = "FETCH_HOME_DATA_SUCCESS";
export const FETCH_HOME_DATA_FAILURE = "FETCH_HOME_DATA_FAILURE";

export const FETCH_MODAL_DATA_REQUEST = "FETCH_MODAL_DATA_REQUEST";
export const FETCH_MODAL_DATA_SUCCESS = "FETCH_MODAL_DATA_SUCCESS";
export const FETCH_MODAL_DATA_FAILURE = "FETCH_MODAL_DATA_FAILURE";

export const fetchHomeData = (startDate, endDate) => async (dispatch) => {
  dispatch({ type: FETCH_HOME_DATA_REQUEST });
  try {
    let url = `/home?limit=5`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await api.get(url);
    dispatch({
      type: FETCH_HOME_DATA_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({ type: FETCH_HOME_DATA_FAILURE, payload: error.message });
  }
};

export const fetchModalData =
  (dataType, page, startDate, endDate) => async (dispatch) => {
    dispatch({ type: FETCH_MODAL_DATA_REQUEST });
    try {
      let url = `/home?limit=5`;

      switch (dataType) {
        case "supplierRank":
          url += `&supplierPage=${page}`;
          break;
        case "pharmacistRank":
          url += `&pharmacistPage=${page}`;
          break;
        case "recentSales":
          url += `&salesPage=${page}`;
          break;
        default:
          break;
      }

      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await api.get(url);
      dispatch({
        type: FETCH_MODAL_DATA_SUCCESS,
        payload: { dataType, data: response.data.data },
      });
      return response.data.data;
    } catch (error) {
      dispatch({ type: FETCH_MODAL_DATA_FAILURE, payload: error.message });
    }
  };
