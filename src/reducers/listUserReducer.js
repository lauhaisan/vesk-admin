import { LIST_USER } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listUserData: [],
  paging: {},
  messageError: ""
};

const listUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_USER.GET_LIST_USER:
      return {
        ...state,
        loading: true,
        messageError: ""
      };
    case LIST_USER.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        listUserData: action.data.items,
        paging: action.data.paging,
        messageError: ""
      };
    case LIST_USER.GET_LIST_USER_FAIL:
      return {
        ...state,
        loading: false,
        listUserData: [],
        messageError: action.data
      };
    // case LIST_USER.SET_STATE_REDUCER:
    //   return {
    //     ...state,
    //     ...action.data
    //   };

    default:
      return state;
  }
};

export default listUserReducer;
