import { ICause } from "redux/initialStates/cause";
import {
  PAUSE_CAUSE_START,
  PAUSE_CAUSE_SUCCESS,
  PAUSE_CAUSE_ERROR,
  RESET_PAUSE_ERROR,
} from "redux/action-types/cause/pauseCause";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case PAUSE_CAUSE_START:
      return {
        ...state,
        pause: {
          ...state.pause,
          loading: true,
          error: null,
        },
      };
    case PAUSE_CAUSE_SUCCESS:
      return {
        ...state,
        pause: {
          ...state.pause,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case PAUSE_CAUSE_ERROR:
      return {
        ...state,
        pause: {
          ...state.pause,
          loading: false,
          error: payload,
        },
      };
    case RESET_PAUSE_ERROR:
      return {
        ...state,
        pause: {
          ...state.pause,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
