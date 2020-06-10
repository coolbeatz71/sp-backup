import { ICauses } from "redux/initialStates/causes";
import {
  GET_USER_CAUSES_START,
  GET_USER_CAUSES_SUCCESS,
  GET_USER_CAUSES_ERROR,
} from "redux/action-types/causes/userCauses";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICauses, { type, payload }: IAction) => {
  switch (type) {
    case GET_USER_CAUSES_START:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case GET_USER_CAUSES_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          data: payload,
          error: null,
          fetched: true,
        },
      };
    case GET_USER_CAUSES_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    default:
      return null;
  }
};
