import getToken from "helpers/getToken";
import {
  SET_CURRENT_USER_START,
  SET_CURRENT_USER_ERROR,
  SET_CURRENT_USER_SUCCESS,
} from "redux/action-types/user/currentUser";

import { Iuser } from "redux/initialStates/user";

export default (
  state: Iuser,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case SET_CURRENT_USER_START:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: {},
        },
      };
    case SET_CURRENT_USER_ERROR:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          error: payload,
          loading: false,
        },
      };
    case SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          isLoggedin: !!getToken(),
          data: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
