import { ICause } from "redux/initialStates/cause";
import {
  RESUME_CAUSE_START,
  RESUME_CAUSE_SUCCESS,
  RESUME_CAUSE_ERROR,
  RESET_RESUME_ERROR,
} from "redux/action-types/cause/resumeCause";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case RESUME_CAUSE_START:
      return {
        ...state,
        resume: {
          ...state.resume,
          loading: true,
          error: null,
        },
      };
    case RESUME_CAUSE_SUCCESS:
      return {
        ...state,
        resume: {
          ...state.resume,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case RESUME_CAUSE_ERROR:
      return {
        ...state,
        resume: {
          ...state.resume,
          loading: false,
          error: payload,
        },
      };
    case RESET_RESUME_ERROR:
      return {
        ...state,
        resume: {
          ...state.resume,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
