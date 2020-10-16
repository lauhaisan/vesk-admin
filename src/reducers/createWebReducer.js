import { CREATE_WEBSITE } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listCreateWeb: [],
};

const createWebReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_WEBSITE.UPDATE_CREATE_WEBSITE_STORE:
      return {
        ...state,
        ...action.data,
      };
    case CREATE_WEBSITE.CREATE_WEBSITE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_WEBSITE.CREATE_WEBSITE_SUCCESS:
      return {
        ...state,
        loading: false,
        listCreateWeb: action.data.items,
      };
    case CREATE_WEBSITE.CREATE_WEBSITE_FAIL:
      return {
        ...state,
        loading: false,
        listCreateWeb: [],
      };
    default:
      return state;
  }
};

export default createWebReducer;
