import splApi from "helpers/axios";
import removeUrlLang from "helpers/removeUrlLang";
import { IUnknownObject } from "interfaces/unknownObject";
import {
  GET_ALL_CAUSES_ERROR,
  GET_ALL_CAUSES_SUCCESS,
  GET_ALL_CAUSES_START,
  TRANSFER_ALL_CAUSES_ERROR,
  TRANSFER_ALL_CAUSES_SUCCESS,
  TRANSFER_ALL_CAUSES_START,
} from "redux/action-types/cause/all";

export const getAllCauses = (url: string, source = "all") => (
  dispatch: any,
  params?: IUnknownObject,
) => {
  const parsedUrl = removeUrlLang(url);
  dispatch({
    type:
      source === "transfer" ? TRANSFER_ALL_CAUSES_START : GET_ALL_CAUSES_START,
  });
  splApi
    .get(parsedUrl, { params })
    .then((response: any) => {
      dispatch({
        payload: response,
        type:
          source === "transfer"
            ? TRANSFER_ALL_CAUSES_SUCCESS
            : GET_ALL_CAUSES_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type:
          source === "transfer"
            ? TRANSFER_ALL_CAUSES_ERROR
            : GET_ALL_CAUSES_ERROR,
        payload: error,
      });
    });
};
