import splApi from "helpers/axios";
import {
  GET_SINGLE_CAUSE_START,
  GET_SINGLE_CAUSE_SUCCESS,
  GET_SINGLE_CAUSE_ERROR,
  TRANSFER_SINGLE_CAUSE_START,
  TRANSFER_SINGLE_CAUSE_SUCCESS,
  TRANSFER_SINGLE_CAUSE_ERROR,
} from "redux/action-types/cause/getSingle";
import { IUnknownObject } from "interfaces/unknownObject";
import {
  STORE_ACCESS_CODE,
  STORE_TRANSFER_ACCESS_CODE,
} from "redux/action-types/cause/storeAccessCode";

export default (
  slug: string | string[],
  params?: IUnknownObject,
  source = "all",
) => (dispatch: any) => {
  dispatch({
    type:
      source === "transfer"
        ? TRANSFER_SINGLE_CAUSE_START
        : GET_SINGLE_CAUSE_START,
  });
  splApi
    .get(`/causes/${slug}`, {
      params,
    })
    .then((response: any) => {
      dispatch({
        payload: response.data,
        type:
          source === "transfer"
            ? TRANSFER_SINGLE_CAUSE_SUCCESS
            : GET_SINGLE_CAUSE_SUCCESS,
      });
      dispatch({
        type:
          source === "transfer"
            ? STORE_TRANSFER_ACCESS_CODE
            : STORE_ACCESS_CODE,
        payload: params?.access_code,
      });
    })
    .catch((error: any) => {
      dispatch({
        type:
          source === "transfer"
            ? TRANSFER_SINGLE_CAUSE_ERROR
            : GET_SINGLE_CAUSE_ERROR,
        payload: error,
      });
    });
};
