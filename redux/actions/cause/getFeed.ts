import splApi from "helpers/axios";
import {
  GET_FEED_ERROR,
  GET_FEED_SUCCESS,
  GET_FEED_START,
} from "redux/action-types/cause/feed";

export const getFeed = () => (dispatch: any) => {
  dispatch({
    type: GET_FEED_START,
  });
  splApi
    .get("/causes/feed")
    .then((response: any) => {
      dispatch({
        payload: response,
        type: GET_FEED_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_FEED_ERROR,
        payload: error,
      });
    });
};
