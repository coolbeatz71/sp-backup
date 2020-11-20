import splApi from "helpers/axios";
import { IUnknownObject } from "interfaces/unknownObject";
import {
  GET_USER_CAUSES_ERROR,
  GET_USER_CAUSES_SUCCESS,
  GET_USER_CAUSES_START,
} from "redux/action-types/cause/userCauses";

export const getUserCauses = (url: string) => (
  dispatch: any,
  params?: IUnknownObject,
) => {
  dispatch({
    type: GET_USER_CAUSES_START,
  });
  splApi
    .get(url, { params })
    .then((response: any) => {
      dispatch({
        payload: response,
        type: GET_USER_CAUSES_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_USER_CAUSES_ERROR,
        payload: error,
      });
    });
};
