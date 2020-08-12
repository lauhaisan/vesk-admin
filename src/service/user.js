import request from "../utils/request";
import URL from "../utils/url";
import { getToken } from "../utils/token";

const signUpAPI = async (payload) => {
  return request(URL.SIGNUP, "POST", payload, true);
};

const signInAPI = async (payload) => {
  return request(URL.SIGNIN, "POST", payload, true);
};

const logoutAPI = async () => {
  const { refreshToken } = await getToken();
  const payload = { refreshToken };
  return request(URL.LOGOUT, "POST", payload, true);
};

const getMyInfoAPI = async () => {
  return request(URL.GET_MY_INFO);
};
const getUserInfoAPI = async (payload) => {
  const URL_WITH_PARAMS=`${URL.GET_USER_INFO}?userId=${payload.id}`
  return request(URL_WITH_PARAMS);
};
export { signUpAPI, signInAPI, logoutAPI, getMyInfoAPI, getUserInfoAPI };
