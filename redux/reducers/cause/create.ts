import { ICause } from "redux/initialStates/cause";
import {
  CREATE_CAUSE_START,
  CREATE_CAUSE_SUCCESS,
  CREATE_CAUSE_ERROR,
  SET_CROPPED_IMAGE,
  CLEAR_CROPPED_IMAGE,
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
    case SET_CROPPED_IMAGE:
      return {
        ...state,
        create: {
          ...state.create,
          croppedImage: payload,
        },
      };
    case CLEAR_CROPPED_IMAGE:
      return {
        ...state,
        create: {
          ...state.create,
          croppedImage: null,
        },
      };
    default:
      return null;
  }
};
