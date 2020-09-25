import { LIST_USER } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listUserData: [],
  paging: {},
  messageError: "",
  loadingGetUserById: false,
  loadingEditUser: false,
  editUserSuccessfully: "",
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
    case LIST_USER.EDIT_USER:
      return {
        ...state,
        loadingEditUser: true,
        editUserSuccessfully: "",
        messageError: "",
      };
    case LIST_USER.EDIT_USER_SUCCESS:
      return {
        ...state,
        loadingEditUser: false,
        editUserSuccessfully: true,
        messageError: "",
      };
    case LIST_USER.EDIT_USER_FAIL:
      return {
        ...state,
        loadingEditUser: false,
        editUserSuccessfully: false,
        messageError: action.data,
      };
    case LIST_USER.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data,
      };
    case LIST_USER.SEARCH_USER:
      return {
        ...state,
        loading: true,
        messageError: "",
      };
    case LIST_USER.SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        listUserData: action.data.items,
        paging: action.data.paging,
        messageError: "",
      };
    case LIST_USER.SEARCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        listUserData: [],
        messageError: action.data,
      };

    default:
      return state;
  }
};

export default listUserReducer;
