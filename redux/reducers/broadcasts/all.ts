import { IAllBroadcasts } from "redux/initialStates/broadcasts";
import {
  GET_ALL_BROADCASTS_START,
  GET_ALL_BROADCASTS_SUCCESS,
  GET_ALL_BROADCASTS_ERROR,
  CLEAR_ALL_BROADCASTS,
} from "redux/action-types/broadcasts/getAll";

interface IAction {
  type: string;
  payload: any;
}

export default (state: IAllBroadcasts, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_BROADCASTS_START:
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          data: [],
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case GET_ALL_BROADCASTS_SUCCESS:
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          data: payload.data,
          loading: false,
          error: null,
          fetched: true,
        },
      };
    case GET_ALL_BROADCASTS_ERROR:
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    case CLEAR_ALL_BROADCASTS:
      return {
        ...state,
        broadcasts: {
          ...state.broadcasts,
          data: [],
        },
      };
    default:
      return null;
  }
};
