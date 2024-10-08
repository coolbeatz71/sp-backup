import splApi, { saveApi } from "helpers/axios";
import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SEND_CONFIRMATION_CODE_START,
  SEND_CONFIRMATION_CODE_SUCCESS,
  SEND_CONFIRMATION_CODE_ERROR,
} from "redux/action-types/auth/signup";
import { pick } from "lodash";
import showAuthDialog, { changeAuthContext } from "./showAuthDialog";
import { SET_CURRENT_USER_SUCCESS } from "redux/action-types/user/currentUser";
import setAuthCookies from "helpers/cookies";

export default (data: {}) => (dispatch: any) => {
  dispatch({
    type: SIGNUP_START,
  });

  saveApi
    .post("/auth/signup", data)
    .then((response: any) => {
      let { token } = response.data;
      token = `JWT ${token}`;
      setAuthCookies(token);
      localStorage.setItem("save-token", token);
      splApi.defaults.headers.Authorization = token;
      saveApi.defaults.headers.Authorization = token;
      const payload = response.data;
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response,
      });
      dispatch({
        payload,
        type: SET_CURRENT_USER_SUCCESS,
      });

      showAuthDialog(false)(dispatch);
    })
    .catch((error) => {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error,
      });
    });
};

export const sendVerificationCode = (data: {}) => (dispatch: any) => {
  dispatch({
    type: SEND_CONFIRMATION_CODE_START,
  });

  saveApi
    .post("/auth/signup/send_short_code", pick(data, "phone_number"))
    .then(() => {
      changeAuthContext("verify-phone")(dispatch);
      dispatch({
        type: SEND_CONFIRMATION_CODE_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SEND_CONFIRMATION_CODE_ERROR,
        payload: error,
      });
    });
};
