import splApi from "helpers/axios";
import {
  MORE_SEARCH_DONORS_START,
  MORE_SEARCH_DONORS_SUCCESS,
  GET_DONORS_ERROR,
} from "redux/action-types/cause/donors";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], params?: IUnknownObject) => (
  dispatch: any,
) => {
  dispatch({
    type: MORE_SEARCH_DONORS_START,
  });
  splApi
    .get(`/causes/${slug}/donations`, {
      params,
    })
    .then((response: any) => {
      dispatch({
        payload: response,
        type: MORE_SEARCH_DONORS_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_DONORS_ERROR,
        payload: error,
      });
    });
};
