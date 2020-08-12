import { PRODUCT } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listProduct: [],
  messageError: ""
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT.GET_ALL_PRODUCT:
      return {
        ...state,
        loading: true,
        messageError: ""
      };
    case PRODUCT.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        listProduct: action.data,
        messageError: ""
      };
    case PRODUCT.GET_ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        listProduct: [],
        messageError: action.data
      };
    case PRODUCT.CLEAR_DATA:
      return {
        ...state,
        loading: false,
        listProduct: [],
        messageError: ""
      };
    case PRODUCT.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};

export default productReducer;
