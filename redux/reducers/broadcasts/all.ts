import { IAllBroadcasts } from "redux/initialStates/broadcasts";
import {
  GET_ALL_BROADCASTS_START,
  GET_ALL_BROADCASTS_SUCCESS,
  GET_ALL_BROADCASTS_ERROR,
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
          data: {},
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
          loading: false,
          data: payload,
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
    default:
      return null;
  }
};
