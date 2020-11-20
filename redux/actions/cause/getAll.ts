import splApi from "helpers/axios";
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
  dispatch({
    type:
      source === "transfer" ? TRANSFER_ALL_CAUSES_START : GET_ALL_CAUSES_START,
  });
  splApi
    .get(url, { params })
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
