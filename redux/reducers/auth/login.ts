import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR_CLEAR,
} from "redux/action-types/auth/login";

import { Iauth } from "redux/initialStates/auth";

export default (
  state: Iauth,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: {},
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: payload,
          loading: false,
        },
      };
    case LOGIN_ERROR_CLEAR:
      return {
        ...state,
        login: {
          ...state.login,
          error: {},
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
