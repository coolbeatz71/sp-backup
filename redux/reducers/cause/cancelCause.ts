import { ICause } from "redux/initialStates/cause";
import {
  CANCEL_CAUSE_START,
  CANCEL_CAUSE_SUCCESS,
  CANCEL_CAUSE_ERROR,
  RESET_CANCEL_ERROR,
} from "redux/action-types/cause/cancelCause";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case CANCEL_CAUSE_START:
      return {
        ...state,
        cancel: {
          ...state.cancel,
          loading: true,
          error: null,
        },
      };
    case CANCEL_CAUSE_SUCCESS:
      return {
        ...state,
        cancel: {
          ...state.cancel,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case CANCEL_CAUSE_ERROR:
      return {
        ...state,
        cancel: {
          ...state.cancel,
          loading: false,
          error: payload,
        },
      };
    case RESET_CANCEL_ERROR:
      return {
        ...state,
        cancel: {
          ...state.cancel,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
