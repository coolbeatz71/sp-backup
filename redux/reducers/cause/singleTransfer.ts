import { ICause } from "redux/initialStates/cause";
import {
  TRANSFER_SINGLE_CAUSE_START,
  TRANSFER_SINGLE_CAUSE_SUCCESS,
  TRANSFER_SINGLE_CAUSE_ERROR,
} from "redux/action-types/cause/getSingle";
import { STORE_TRANSFER_ACCESS_CODE } from "redux/action-types/cause/storeAccessCode";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case TRANSFER_SINGLE_CAUSE_START:
      return {
        ...state,
        single_transfer: {
          ...state.single_transfer,
          data: {},
          loading: true,
          error: null,
        },
      };
    case TRANSFER_SINGLE_CAUSE_SUCCESS:
      return {
        ...state,
        single_transfer: {
          ...state.single_transfer,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case STORE_TRANSFER_ACCESS_CODE:
      return {
        ...state,
        single_transfer: {
          ...state.single_transfer,
          accessCode: payload,
        },
      };
    case TRANSFER_SINGLE_CAUSE_ERROR:
      return {
        ...state,
        single_transfer: {
          ...state.single_transfer,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
