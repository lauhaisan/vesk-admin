import request from "../utils/request";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListAdsAPI = async payload => {
  return request(URL.GET_LIST_ADVERTISING, true);
};

const getAdsByIdAPI = async payload => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_ADVERTISING}/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editAdsAPI = async payload => {
  const URL_WITH_PARAMS = `${URL.ADMIN_CRUD_ADVERTISING}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

export { getListAdsAPI, getAdsByIdAPI, editAdsAPI };
