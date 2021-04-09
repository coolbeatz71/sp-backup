import { ICause } from "redux/initialStates/cause";
import {
  CASHOUT_START,
  CASHOUT_SUCCESS,
  CASHOUT_ERROR,
  RESET_CASHOUT_ERROR,
} from "redux/action-types/cause/cashout";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case CASHOUT_START:
      return {
        ...state,
        cashout: {
          ...state.cashout,
          loading: true,
          error: null,
        },
      };
    case CASHOUT_SUCCESS:
      return {
        ...state,
        cashout: {
          ...state.cashout,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case CASHOUT_ERROR:
      return {
        ...state,
        cashout: {
          ...state.cashout,
          loading: false,
          error: payload,
        },
      };
    case RESET_CASHOUT_ERROR:
      return {
        ...state,
        cashout: {
          ...state.cashout,
          loading: false,
          error: null,
        },
        edit: {
          ...state.edit,
          loading: false,
          error: null,
        },
        single_cashout: {
          ...state.single_cashout,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
