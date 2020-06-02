import axios from "axios";
import getToken from "helpers/getToken";

const token = getToken();

const responseHandler = (response: any) => response.data;
const errorHandler = (error: any) => {
  const errorResponse: any = error.response
    ? error.response.data
    : error.message;
  return Promise.reject(errorResponse);
};

const splApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPL_API_URL,
  headers: {
    Authorization: token,
  },
});

export default splApi;

export const saveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SAVE_API_URL,
  headers: {
    Authorization: token,
  },
});

saveApi.interceptors.response.use(responseHandler, errorHandler);

splApi.interceptors.response.use(responseHandler, errorHandler);
