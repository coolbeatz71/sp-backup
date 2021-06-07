import splApi, { saveApi } from "helpers/axios";
import { destroyAuthCookies } from "helpers/cookies";
import {
  LOGOUT_START,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from "redux/action-types/auth/logout";
import { SET_CURRENT_USER_SUCCESS } from "redux/action-types/user/currentUser";

export default (push: any, dispatch: any) => {
  dispatch({
    type: LOGOUT_START,
  });

  saveApi
    .post("/auth/logout")
    .then(() => {
      localStorage.removeItem("save-token");
      destroyAuthCookies("saveToken");
      splApi.defaults.headers.Authorization = "";
      saveApi.defaults.headers.Authorization = "";
      const payload = {};
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: "User was logged out!",
      });
      dispatch({
        payload,
        type: SET_CURRENT_USER_SUCCESS,
      });
      push("/");
    })
    .catch((error) => {
      dispatch({
        type: LOGOUT_ERROR,
        payload: error,
      });
    });
};
