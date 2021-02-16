import {
  LOGOUT_START,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from "redux/action-types/auth/logout";

import { Iauth } from "redux/initialStates/auth";

export default (
  state: Iauth,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case LOGOUT_START:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
          error: {},
        },
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        logout: {
          ...state.logout,
          error: payload,
          loading: false,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
