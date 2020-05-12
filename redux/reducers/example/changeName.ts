import {
  CHANGE_NAME_START,
  CHANGE_NAME_ERROR,
  CHANGE_NAME_SUCCESS,
} from "redux/action-types/example/changeName";

import { Iexample } from "redux/initialStates/example";

export default (
  state: Iexample,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case CHANGE_NAME_START:
      return {
        ...state,
        changeName: {
          ...state.changeName,
          loading: true,
          error: null,
        },
      };
    case CHANGE_NAME_ERROR:
      return {
        ...state,
        changeName: {
          ...state.changeName,
          error: payload,
          loading: false,
        },
      };
    case CHANGE_NAME_SUCCESS:
      return {
        ...state,
        changeName: {
          currentName: payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
