import request from "../utils/request";
import URL from "../utils/url";

// request( param1: url,param2: isAuth, param3: method = "GET",param4: payload)

const signUpAPI = async payload => {
  return request(URL.SIGNUP, false, "POST", payload);
};

const signInAPI = async payload => {
  return request(URL.SIGNIN, false, "POST", payload);
};

// const logoutAPI = async () => {
//   const { refreshToken } = await getToken();
//   const payload = { refreshToken };
//   return request(URL.LOGOUT, false, "POST", payload);
// };

// const getMyInfoAPI = async () => {
//   return request(URL.GET_MY_INFO, true);
// };

export {
  signUpAPI,
  signInAPI
  // logoutAPI
  // , getMyInfoAPI
};
