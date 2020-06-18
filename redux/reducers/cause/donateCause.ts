import { ICause } from "redux/initialStates/cause";
import {
  DONATE_CAUSE_START,
  DONATE_CAUSE_SUCCESS,
  DONATE_CAUSE_ERROR,
} from "redux/action-types/cause/donateCause";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case DONATE_CAUSE_START:
      return {
        ...state,
        donate: {
          ...state.donate,
          loading: true,
          error: null,
        },
      };
    case DONATE_CAUSE_SUCCESS:
      return {
        ...state,
        donate: {
          ...state.donate,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case DONATE_CAUSE_ERROR:
      return {
        ...state,
        donate: {
          ...state.donate,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
