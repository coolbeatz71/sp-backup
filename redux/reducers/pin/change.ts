import {
  PIN_CHANGE_START,
  PIN_CHANGE_ERROR,
  PIN_CHANGE_SUCCESS,
} from "redux/action-types/pin/change";

import { IPinReset } from "redux/initialStates/pin";

export default (
  state: IPinReset,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case PIN_CHANGE_START:
      return {
        ...state,
        change: {
          ...state.change,
          loading: true,
          error: {},
        },
      };
    case PIN_CHANGE_ERROR:
      return {
        ...state,
        change: {
          ...state.change,
          error: payload,
          loading: false,
        },
      };
    case PIN_CHANGE_SUCCESS:
      return {
        ...state,
        change: {
          message: payload,
          loading: false,
          error: {},
        },
      };
    default:
      return null;
  }
};
