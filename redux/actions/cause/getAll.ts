import splApi from "helpers/axios";
import {
  GET_ALL_CAUSES_ERROR,
  GET_ALL_CAUSES_SUCCESS,
  GET_ALL_CAUSES_START,
} from "redux/action-types/cause/all";

export const getAllCauses = () => (dispatch: any) => {
  dispatch({
    type: GET_ALL_CAUSES_START,
  });
  splApi
    .get("/causes")
    .then((response: any) => {
      dispatch({
        payload: response,
        type: GET_ALL_CAUSES_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_ALL_CAUSES_ERROR,
        payload: error,
      });
    });
};
