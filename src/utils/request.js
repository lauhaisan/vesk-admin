import { getToken } from "../utils/token";
// import handleRefreshToken from "../utils/refreshToken";

const BASE_URL_AUTH = process.env.REACT_APP_BASE_URL_AUTH;
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
const request = async (url, isAuth, method = "GET", payload) => {
  const BASE_URL = !isAuth ? BASE_URL_AUTH : BASE_URL_API;
  const urlAPI = `${BASE_URL}${url}`;
  const payloadRequestRefreshToken = { urlAPI, method, payload };
  const { token } = await getToken();
  const body = payload ? JSON.stringify({ ...payload }) : undefined;
  let headers = { "Content-Type": "application/json" };
  if (isAuth) {
    headers = {
      ...headers,
      Authorization: token
    };
  }
  const requestOptions = {
    method,
    headers,
    body
  };

  const response = await callAPI(
    urlAPI,
    requestOptions,
    isAuth,
    payloadRequestRefreshToken
  );
  return response;
};

const callAPI = async (urlAPI, requestOptions, notAuth, payloadCallBack) => {
  // const { urlAPI: url, method, payload } = payloadCallBack;
  const response = await fetch(urlAPI, requestOptions);
  let data = await response.json();
  // if (data.statusCode === 401 && !notAuth) {
  //   const newDataToken = await handleRefreshToken();
  //   if (newDataToken.statusCode === 200) {
  //     const body = payload ? JSON.stringify({ ...payload }) : undefined;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${newDataToken.accessToken}`
  //     };
  //     const requestOptions = {
  //       method,
  //       headers,
  //       body
  //     };
  //     const response = await fetch(url, requestOptions);
  //     data = await response.json();
  //   } else {
  //     data = {
  //       statusCode: 401,
  //       message: "Token Expried"
  //     };
  //   }
  // }
  return data;
};

export default request;
