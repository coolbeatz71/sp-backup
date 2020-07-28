import splApi, { saveApi } from "helpers/axios";
import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SEND_CONFIRMATION_CODE_START,
  SEND_CONFIRMATION_CODE_SUCCESS,
  SEND_CONFIRMATION_CODE_ERROR,
} from "redux/action-types/Auth/signup";
import lodash from "lodash";
import { changeAuthContext } from "./showAuthDialog";

export default (data: {}) => (dispatch: any) => {
  dispatch({
    type: SIGNUP_START,
  });

  saveApi
    .post("/auth/signup", data)
    .then((response: any) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response,
      });
      changeAuthContext("signup-success")(dispatch);
    })
    .catch((error) => {
      console.log("here", error);
      dispatch({
        type: SIGNUP_ERROR,
        payload: error,
      });
    });
};

export const sendVerificationCode = (data: {}) => (
  dispatch: any
) => {
  dispatch({
    type: SEND_CONFIRMATION_CODE_START,
  });

  saveApi
    .post("/auth/signup/send_short_code", lodash.pick(data, "phone_number"))
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
