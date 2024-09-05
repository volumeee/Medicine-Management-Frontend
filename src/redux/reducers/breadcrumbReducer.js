// breadcrumbReducer.js
import { UPDATE_BREADCRUMBS } from "../actions/breadcrumbAction";

const initialState = {
  breadcrumbs: [],
};

const breadcrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload.filter(
          (snippet) => snippet !== "dashboard"
        ),
      };
    default:
      return state;
  }
};

export default breadcrumbReducer;
