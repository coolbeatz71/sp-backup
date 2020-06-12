import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
} from "redux/action-types/user/updateProfile";

import { Iuser } from "redux/initialStates/user";

export default (
  state: Iuser,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case UPDATE_PROFILE_START:
      return {
        ...state,
        updateProfile: {
          ...state.updateProfile,
          loading: true,
          error: null,
        },
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateProfile: {
          ...state.updateProfile,
          error: payload,
          loading: false,
        },
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfile: {
          ...state.updateProfile,
          loading: false,
          error: null,
        },
        currentUser: {
          ...state.currentUser,
          data: payload,
        },
      };
    default:
      return null;
  }
};
