import getToken from "helpers/getToken";
import { isEmpty } from "lodash";
import {
  SET_CURRENT_USER_START,
  SET_CURRENT_USER_ERROR,
  SET_CURRENT_USER_SUCCESS,
  CLEAR_CURRENT_USER,
} from "redux/action-types/user/currentUser";

import { Iuser } from "redux/initialStates/user";

export default (
  state: Iuser,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case SET_CURRENT_USER_START:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          fetched: false,
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
          fetched: true,
        },
      };
    case SET_CURRENT_USER_SUCCESS:
      localStorage.setItem(
        "USER_LANG",
        isEmpty(payload) ? state.currentUser.data.language : payload.language,
      );
      return {
        ...state,
        currentUser: {
          isLoggedin: !!getToken(),
          data: payload,
          loading: false,
          fetched: true,
          error: {},
        },
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoggedin: false,
          data: {},
          loading: false,
          fetched: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
