import { getToken } from "../utils/token";

const uploadApi = async (payload) => {
  const { token } = await getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Headers": "Content-Type, authorization",
      Authorization: token,
    },
    body: payload,
  };
  const response = await fetch(
    "https://upload.veskhub.co/vesk/upload",
    requestOptions
  );
  const data = await response.json();
  return data;
};

export { uploadApi };
