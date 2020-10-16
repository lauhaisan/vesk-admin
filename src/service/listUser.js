import request from "../utils/request";
import URL from "../constant/url";
import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListUserAPI = async (payload) => {
  return request(URL.GET_LIST_USER, true);
};

const getUserByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_USER_BY_ID}/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editUserAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.EDIT_USER}/${payload.userId}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

const searchUserApi = async ({ email, userName }) => {
  const param = `email=${email}&userName=${userName}`;
  const URL_WITH_PARAMS = `${URL.EDIT_USER}/search?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const getCreateWebAPI = async (payload) => {
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.GET_LIST_CREATE_WEB}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

export {
  getListUserAPI,
  getUserByIdAPI,
  editUserAPI,
  searchUserApi,
  getCreateWebAPI,
};
