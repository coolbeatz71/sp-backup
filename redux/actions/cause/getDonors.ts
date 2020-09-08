import splApi from "helpers/axios";
import {
  GET_CAUSE_DONORS_START,
  GET_CAUSE_DONORS_SUCCESS,
  GET_CAUSE_DONORS_ERROR,
} from "redux/action-types/cause/getDonors";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], params?: IUnknownObject) => (
  dispatch: any,
) => {
  dispatch({
    type: GET_CAUSE_DONORS_START,
  });
  splApi
    .get(`/causes/${slug}/donations`, {
      params,
    })
    .then((response: any) => {
      dispatch({
        payload: response.data,
        type: GET_CAUSE_DONORS_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_CAUSE_DONORS_ERROR,
        payload: error,
      });
    });
};
