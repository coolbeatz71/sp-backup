import { ICause } from "redux/initialStates/cause";
import {
  TRANSFER_ALL_CAUSES_START,
  TRANSFER_ALL_CAUSES_SUCCESS,
  TRANSFER_ALL_CAUSES_ERROR,
} from "redux/action-types/cause/all";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case TRANSFER_ALL_CAUSES_START:
      return {
        ...state,
        all_transfer: {
          ...state.all_transfer,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case TRANSFER_ALL_CAUSES_SUCCESS:
      return {
        ...state,
        all_transfer: {
          ...state.all_transfer,
          loading: false,
          data: payload,
          error: null,
          fetched: true,
        },
      };
    case TRANSFER_ALL_CAUSES_ERROR:
      return {
        ...state,
        all_transfer: {
          ...state.all_transfer,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    default:
      return null;
  }
};
