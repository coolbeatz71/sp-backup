import { ICauses } from "redux/initialStates/causes";
import {
  GET_FEED_START,
  GET_FEED_SUCCESS,
  GET_FEED_ERROR,
} from "redux/action-types/causes/feed";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICauses, { type, payload }: Iaction) => {
  switch (type) {
    case GET_FEED_START:
      return {
        ...state,
        feed: {
          ...state.feed,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        feed: {
          ...state.feed,
          loading: false,
          data: payload,
          error: null,
          fetched: true,
        },
      };
    case GET_FEED_ERROR:
      return {
        ...state,
        feed: {
          ...state.feed,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    default:
      return state;
  }
};
