import splApi from "helpers/axios";
import {
  GET_USER_CAUSES_ERROR,
  GET_USER_CAUSES_SUCCESS,
  GET_USER_CAUSES_START,
} from "redux/action-types/causes/userCauses";

export const getUserCauses = () => (dispatch: any) => {
  dispatch({
    type: GET_USER_CAUSES_START,
  });
  splApi
    .get("user/causes")
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
