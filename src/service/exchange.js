import request from "../utils/request";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const createExchangeAPI = async (payload) => {
  return request(URL.CREATE_EXCHANGE, true, "POST", payload);
};

const getListExchangeAPI = async () => {
  return request(URL.GET_HISTORY_EXCHANGE, true);
};

export { createExchangeAPI, getListExchangeAPI };
