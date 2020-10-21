import splApi from "helpers/axios";
import {
  GET_DONORS_START,
  GET_DONORS_SUCCESS,
  GET_DONORS_ERROR,
  SEARCH_DONORS_START,
  SEARCH_DONORS_SUCCESS,
  SEARCH_DONORS_ERROR,
} from "redux/action-types/cause/donors";
import { IUnknownObject } from "interfaces/unknownObject";

export default (
  slug: string | string[],
  isSearch: boolean,
  params?: IUnknownObject,
) => (dispatch: any) => {
  dispatch({
    type: !isSearch ? GET_DONORS_START : SEARCH_DONORS_START,
  });
  splApi
    .get(`/causes/${slug}/donations`, {
      params,
    })
    .then((response: any) => {
      dispatch({
        payload: response,
        type: !isSearch ? GET_DONORS_SUCCESS : SEARCH_DONORS_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: !isSearch ? GET_DONORS_ERROR : SEARCH_DONORS_ERROR,
        payload: error,
      });
    });
};
