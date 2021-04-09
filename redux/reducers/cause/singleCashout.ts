import { ICause } from "../../initialStates/cause";
import {
  CASHOUT_SINGLE_CAUSE_START,
  CASHOUT_SINGLE_CAUSE_SUCCESS,
  CASHOUT_SINGLE_CAUSE_ERROR,
} from "./../../action-types/cause/getSingle";
import { STORE_CASHOUT_ACCESS_CODE } from "./../../action-types/cause/storeAccessCode";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case CASHOUT_SINGLE_CAUSE_START:
      return {
        ...state,
        single_cashout: {
          ...state.single_cashout,
          data: {},
          loading: true,
          error: null,
        },
      };
    case CASHOUT_SINGLE_CAUSE_SUCCESS:
      return {
        ...state,
        single_cashout: {
          ...state.single_cashout,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case STORE_CASHOUT_ACCESS_CODE:
      return {
        ...state,
        single_cashout: {
          ...state.single_cashout,
          accessCode: payload,
        },
      };
    case CASHOUT_SINGLE_CAUSE_ERROR:
      return {
        ...state,
        single_cashout: {
          ...state.single_cashout,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
