import request from "../utils/request";
import URL from "../utils/url";

const getAllProduct = async () => {
  return request(URL.PRODUCT);
};

export { getAllProduct };
