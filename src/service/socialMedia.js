import request from "../utils/request";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListSocialMediaAPI = async payload => {
  return request(URL.GET_LIST_SOCIAL_MEDIA, true);
};

const getByIdAPI = async payload => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_SOCIAL_MEDIA}/Id/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editSocialMediaAPI = async payload => {
  const URL_WITH_PARAMS = `${URL.ADMIN_CRUD_SOCIAL_MEDIA}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

// const deleteAdsByIdAPI = async payload => {
//   const URL_WITH_PARAMS = `${URL.ADMIN_CRUD_ADVERTISING}/${payload.id}`;
//   return request(URL_WITH_PARAMS, true, "DELETE");
// };

// const addNewAdsAPI = async payload => {
//   return request(URL.ADMIN_CRUD_ADVERTISING, true, "POST", payload);
// };

export {
  getListSocialMediaAPI,
  getByIdAPI,
  editSocialMediaAPI
  // deleteAdsByIdAPI,
  // addNewAdsAPI
};
