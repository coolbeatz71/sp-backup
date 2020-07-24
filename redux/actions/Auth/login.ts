import splApi, { saveApi } from "helpers/axios";
import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "redux/action-types/Auth/login";
import { SET_CURRENT_USER_SUCCESS } from "redux/action-types/user/currentUser";
import showAuthDialog from "./showAuthDialog";

export default (data: {}) => (dispatch: any) => {
  dispatch({
    type: LOGIN_START,
  });

  saveApi
    .post("/auth/login", data)
    .then((response: any) => {
      let { token } = response.data;
      token = `JWT ${token}`;
      localStorage.setItem("save-token", token);
      splApi.defaults.headers.Authorization = token;
      saveApi.defaults.headers.Authorization = token;
      const payload = response.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: "User was sucessfully registered!",
      });
      dispatch({
        payload,
        type: SET_CURRENT_USER_SUCCESS,
      });
      showAuthDialog(false)(dispatch);
    })
    .catch((error) => {
      console.log("here", error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    });
};
