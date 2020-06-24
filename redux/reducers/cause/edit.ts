import { ICause } from "redux/initialStates/cause";
import {
  EDIT_CAUSE_START,
  EDIT_CAUSE_SUCCESS,
  EDIT_CAUSE_ERROR,
} from "redux/action-types/cause/edit";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case EDIT_CAUSE_START:
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: true,
          error: null,
        },
      };
    case EDIT_CAUSE_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case EDIT_CAUSE_ERROR:
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
