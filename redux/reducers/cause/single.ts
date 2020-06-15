import { ICause } from "redux/initialStates/cause";
import {
  GET_SINGLE_CAUSE_START,
  GET_SINGLE_CAUSE_SUCCESS,
  GET_SINGLE_CAUSE_ERROR,
} from "redux/action-types/cause/getSingle";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case GET_SINGLE_CAUSE_START:
      return {
        ...state,
        single: {
          ...state.single,
          loading: true,
          error: null,
        },
      };
    case GET_SINGLE_CAUSE_SUCCESS:
      return {
        ...state,
        single: {
          ...state.single,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_SINGLE_CAUSE_ERROR:
      return {
        ...state,
        single: {
          ...state.single,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
