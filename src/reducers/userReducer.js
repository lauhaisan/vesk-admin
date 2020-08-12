import { USER } from "../constant";

const INITIAL_STATE = {
  loading: false,
  isSignUpSuccessfully: "",
  messageSignUp: "",
  isSignInSuccessfully: "",
  messageSignIn: "",
  expiredToken: false,
  loadingGetInfo: false,
  myInfo: {},
  widthMenu: "firstRender"
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.UPDATE_STATE:
      return {
        ...state,
        ...action.data
      };
    case USER.SIGNUP:
      return {
        ...state,
        loading: true,
        messageSignUp: ""
      };
    case USER.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignUpSuccessfully: true,
        messageSignUp: ""
      };
    case USER.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        isSignUpSuccessfully: false,
        messageSignUp: action.data.message
      };
    case USER.SIGNIN:
      return {
        ...state,
        loading: true,
        messageSignIn: ""
      };
    case USER.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignInSuccessfully: true,
        messageSignIn: ""
      };
    case USER.SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        isSignInSuccessfully: false,
        messageSignIn: action.data.message
      };
    case USER.EXPIRED_TOKEN:
      return {
        ...state,
        expiredToken: true
      };
    case USER.LOGOUT:
      return {
        ...state,
        loading: true
      };
    case USER.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        expiredToken: false
      };
    case USER.LOGOUT_FAIL:
      return {
        ...state,
        loading: false
      };
    case USER.GET_MY_INFO:
      return {
        ...state,
        loadingGetInfo: true
      };
    case USER.GET_MY_INFO_SUCCESS:
      return {
        ...state,
        loadingGetInfo: false,
        myInfo: action.data.currentuser
      };
    case USER.GET_MY_INFO_FAIL:
      return {
        ...state,
        loadingGetInfo: false,
        myInfo: {}
      };

    default:
      return state;
  }
};

export default userReducer;
