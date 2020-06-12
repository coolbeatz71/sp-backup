import { ICause } from "redux/initialStates/cause";
import {
  STOP_CAUSE_START,
  STOP_CAUSE_SUCCESS,
  STOP_CAUSE_ERROR,
} from "redux/action-types/cause/stopCause";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case STOP_CAUSE_START:
      return {
        ...state,
        stop: {
          ...state.stop,
          loading: true,
          error: null,
        },
      };
    case STOP_CAUSE_SUCCESS:
      return {
        ...state,
        stop: {
          ...state.stop,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case STOP_CAUSE_ERROR:
      return {
        ...state,
        stop: {
          ...state.stop,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
