import { ICause } from "redux/initialStates/cause";
import {
  GET_ALL_CAUSES_START,
  GET_ALL_CAUSES_SUCCESS,
  GET_ALL_CAUSES_ERROR,
} from "redux/action-types/cause/all";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case GET_ALL_CAUSES_START:
      return {
        ...state,
        all: {
          ...state.all,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case GET_ALL_CAUSES_SUCCESS:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          data: payload,
          error: null,
          fetched: true,
        },
      };
    case GET_ALL_CAUSES_ERROR:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    default:
      return null;
  }
};
