import {
  PIN_RESET_UPDATE_START,
  PIN_RESET_UPDATE_ERROR,
  PIN_RESET_UPDATE_SUCCESS,
  PIN_RESET_UPDATE_ERROR_CLEAR,
} from "redux/action-types/pin/reset-update";

import { IPinReset } from "redux/initialStates/pin";

export default (
  state: IPinReset,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case PIN_RESET_UPDATE_START:
      return {
        ...state,
        reset_update: {
          ...state.reset_update,
          loading: true,
          error: {},
        },
      };
    case PIN_RESET_UPDATE_ERROR:
      return {
        ...state,
        reset_update: {
          ...state.reset_update,
          error: payload,
          loading: false,
        },
      };
    case PIN_RESET_UPDATE_ERROR_CLEAR:
      return {
        ...state,
        reset_update: {
          ...state.reset_update,
          error: {},
        },
      };
    case PIN_RESET_UPDATE_SUCCESS:
      return {
        ...state,
        reset_update: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
