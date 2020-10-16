const URL = {
  SIGNUP: "/v1/auth/register",
  SIGNIN: "/v1/auth/admin/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refresh-token",
  GET_MY_INFO: "/user/get-my-info",
  GET_USER_INFO: "/v1/vesk/users/my-info",
  PRODUCT: "/products",

  GET_LIST_USER: "/v1/vesk/public/users/search",
  GET_USER_BY_ID: "/v1/vesk/public/users/userId",
  EDIT_USER: "/v1/vesk/admin/users",

  GET_LIST_ADVERTISING: "/v1/vesk/public/ads",
  ADMIN_CRUD_ADVERTISING: "/v1/vesk/admin/ads",

  GET_LIST_SOCIAL_MEDIA: "/v1/vesk/public/e-social-media",
  ADMIN_CRUD_SOCIAL_MEDIA: "/v1/vesk/admin/e-social-media",
  SOCIAL_MEDIA_SEARCH: "/v1/vesk/public/e-social-media/search",

  CREATE_EXCHANGE: "/v1/vesk/admin/exchange",
  GET_HISTORY_EXCHANGE: "/v1/vesk/admin/exchanges",
  GET_EXCHANGE_RATE: "/v1/vesk/rate-setting/search",
  UPDATE_EXCHANGE_RATE: "/v1/vesk/admin/rate-setting",
  APPROVE_EXCHANGE: "/v1/vesk/admin/exchange/approve",
  GET_LIST_CREATE_WEB: "/v1/vesk/admin/website/search",
};

export default URL;
