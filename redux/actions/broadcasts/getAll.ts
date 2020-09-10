import splApi from "helpers/axios";
import {
  GET_ALL_BROADCASTS_ERROR,
  GET_ALL_BROADCASTS_SUCCESS,
  GET_ALL_BROADCASTS_START,
} from "redux/action-types/broadcasts/getAll";

export const getAllBroadcasts = () => (dispatch: any) => {
  dispatch({
    type: GET_ALL_BROADCASTS_START,
  });
  splApi
    .get("/broadcasts")
    .then((response: any) => {
      dispatch({
        payload: response,
        type: GET_ALL_BROADCASTS_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_ALL_BROADCASTS_ERROR,
        payload: error,
      });
    });
};
