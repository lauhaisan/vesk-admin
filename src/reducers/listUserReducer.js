import { LIST_USER } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listUserData: [],
  paging: {},
  messageError: "",
  loadingGetUserById: false,
  itemUser: {},
};

const listUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_USER.GET_LIST_USER:
      return {
        ...state,
        loading: true,
        messageError: "",
      };
    case LIST_USER.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        listUserData: action.data.items,
        paging: action.data.paging,
        messageError: "",
      };
    case LIST_USER.GET_LIST_USER_FAIL:
      return {
        ...state,
        loading: false,
        listUserData: [],
        messageError: action.data,
      };
    case LIST_USER.GET_USER_BY_ID:
      return {
        ...state,
        loadingGetUserById: true,
        messageError: "",
      };
    case LIST_USER.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loadingGetUserById: false,
        itemUser: action.data,
        messageError: "",
      };
    case LIST_USER.GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loadingGetUserById: false,
        itemUser: {},
        messageError: action.data,
      };
    case LIST_USER.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default listUserReducer;
