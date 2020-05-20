import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SEND_CONFIRMATION_CODE_START,
  SEND_CONFIRMATION_CODE_ERROR,
  SEND_CONFIRMATION_CODE_SUCCESS,
} from "redux/action-types/Auth/signup";

import { Iauth } from "redux/initialStates/auth";

export default (
  state: Iauth,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case SEND_CONFIRMATION_CODE_START:
      return {
        ...state,
        sendConfirmationCode: {
          ...state.sendConfirmationCode,
          loading: true,
          error: {},
        },
      };
    case SEND_CONFIRMATION_CODE_ERROR:
      return {
        ...state,
        sendConfirmationCode: {
          ...state.sendConfirmationCode,
          error: payload,
          loading: false,
        },
      };
    case SEND_CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        sendConfirmationCode: {
          currentUser: payload,
          loading: false,
          error: {},
        },
      };
    case SIGNUP_START:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: true,
          error: {},
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          ...state.signup,
          error: payload,
          loading: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
