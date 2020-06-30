import {
  PIN_RESET_START,
  PIN_RESET_ERROR,
  PIN_RESET_SUCCESS,
} from "redux/action-types/pin/reset";

import { IPinReset } from "redux/initialStates/pin";

export default (
  state: IPinReset,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case PIN_RESET_START:
      return {
        ...state,
        reset: {
          ...state.reset,
          loading: true,
          error: {},
        },
      };
    case PIN_RESET_ERROR:
      return {
        ...state,
        reset: {
          ...state.reset,
          error: payload,
          loading: false,
        },
      };
    case PIN_RESET_SUCCESS:
      return {
        ...state,
        reset: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
