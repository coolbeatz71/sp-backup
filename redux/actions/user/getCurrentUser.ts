import { saveApi } from "helpers/axios";
import {
  SET_CURRENT_USER_START,
  SET_CURRENT_USER_ERROR,
  SET_CURRENT_USER_SUCCESS,
} from "redux/action-types/user/currentUser";
import getToken from "helpers/getToken";

export default (dispatch: any) => {
  const saveToken = getToken();
  if (saveToken) {
    dispatch({
      type: SET_CURRENT_USER_START,
    });

    saveApi
      .get("/user")
      .then((response: any) => {
        const payload = response.data;
        dispatch({
          payload,
          type: SET_CURRENT_USER_SUCCESS,
        });
      })
      .catch((error) => {
        console.log("here", error);
        dispatch({
          type: SET_CURRENT_USER_ERROR,
          payload: error,
        });
      });
  }
};
