import { ICause } from "redux/initialStates/cause";
import {
  GET_FEED_START,
  GET_FEED_SUCCESS,
  GET_FEED_ERROR,
} from "redux/action-types/cause/feed";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case GET_FEED_START:
      console.log("here starts reducer", state)
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
      return null;
  }
};
