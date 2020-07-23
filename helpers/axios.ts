import axios from "axios";
import getToken from "helpers/getToken";

const token = getToken();

const responseHandler = (response: any) => response.data;
const errorHandler = (error: any) => {
  if (error?.response?.status === 401) {
    console.log("here error", error.response.status);
    if (process.browser) {
      localStorage.removeItem("save-token");
      window.location.href = "/login";
    }
  }
  const errorResponse: any = error.response
    ? error.response.data
    : error.message;
  return Promise.reject(errorResponse);
};

const splApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPL_API_URL,
  headers: {
    Authorization: token,
    platform: "save_plus_web",
  },
});

export default splApi;

export const saveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SAVE_API_URL,
  headers: {
    Authorization: token,
    platform: "save_plus_web",
  },
});

saveApi.interceptors.response.use(responseHandler, errorHandler);

splApi.interceptors.response.use(responseHandler, errorHandler);
