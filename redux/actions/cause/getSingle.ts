import splApi from "helpers/axios";
import {
  GET_SINGLE_CAUSE_START,
  GET_SINGLE_CAUSE_SUCCESS,
  GET_SINGLE_CAUSE_ERROR,
} from "redux/action-types/cause/getSingle";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], params?: IUnknownObject) => (dispatch: any) => {
  dispatch({
    type: GET_SINGLE_CAUSE_START,
  });
  splApi
    .get(`/causes/${slug}`, {
      params,
    })
    .then((response: any) => {
      dispatch({
        payload: response.data,
        type: GET_SINGLE_CAUSE_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_SINGLE_CAUSE_ERROR,
        payload: error,
      });
    });
};
