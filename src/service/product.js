import request from "../utils/request";
import URL from "../constant/url";

const getAllProduct = async () => {
  return request(URL.PRODUCT);
};

export { getAllProduct };
