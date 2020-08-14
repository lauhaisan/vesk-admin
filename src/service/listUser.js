import request from "../utils/request";
import URL from "../utils/url";

const getListUserAPI = async payload => {
  //   const URL_WITH_PARAMS = `${URL.GET_USER_INFO}?userId=${payload.id}`;
  return request(URL.GET_LIST_USER);
};

const getUserByIdAPI = async payload => {
  const URL_WITH_PARAMS = `${URL.GET_USER_BY_ID}/${payload}`;
  return request(URL_WITH_PARAMS);
};

export { getListUserAPI, getUserByIdAPI };
