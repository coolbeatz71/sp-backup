import { ICause } from "redux/initialStates/cause";
import {
  CREATE_CAUSE_START,
  CREATE_CAUSE_SUCCESS,
  CREATE_CAUSE_ERROR,
} from "redux/action-types/cause/create";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case CREATE_CAUSE_START:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case CREATE_CAUSE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case CREATE_CAUSE_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
