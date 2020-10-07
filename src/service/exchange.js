import request from "../utils/request";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const createExchangeAPI = async (payload) => {
  return request(URL.CREATE_EXCHANGE, true, "POST", payload);
};

const getListExchangeAPI = async () => {
  return request(URL.GET_HISTORY_EXCHANGE, true);
};

const getExchangeRateAPI = async () => {
  return request(URL.GET_EXCHANGE_RATE, true);
};

const updateExchangeRateAPI = async (payload) => {
  const { idRate, rate } = payload;
  const URL_WITH_PARAMS = `${URL.UPDATE_EXCHANGE_RATE}/${idRate}`;
  return request(URL_WITH_PARAMS, true, "PUT", { rate });
};

const approveExchangeAPI = async (payload) => {
  return request(URL.APPROVE_EXCHANGE, true, "POST", payload);
};

export {
  createExchangeAPI,
  getListExchangeAPI,
  getExchangeRateAPI,
  updateExchangeRateAPI,
  approveExchangeAPI,
};
