import axios from "axios";
import getToken from "helpers/getToken";
import { INVALID_TOKEN } from "constants/errorCodes";
import { getLanguage } from "helpers/getLanguage";
import { destroyAuthCookies } from "./cookies";

const token = getToken();

const responseHandler = (response: any) => response.data;
const errorHandler = (error: any) => {
  if (error?.response?.data?.code === INVALID_TOKEN) {
    if (process.browser) {
      localStorage.removeItem("save-token");
      window.location.href = "/";
    } else destroyAuthCookies("saveToken");
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
    language: getLanguage(),
  },
});

export default splApi;

export const saveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SAVE_API_URL,
  headers: {
    Authorization: token,
    platform: "save_plus_web",
    lang: getLanguage(),
  },
});

saveApi.interceptors.response.use(responseHandler, errorHandler);

splApi.interceptors.response.use(responseHandler, errorHandler);
