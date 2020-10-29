import { ICause } from "redux/initialStates/cause";
import {
  TRANSFER_START,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  RESET_TRANSFER_ERROR,
} from "redux/action-types/cause/transfer";

interface IAction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: IAction) => {
  switch (type) {
    case TRANSFER_START:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: true,
          error: null,
        },
      };
    case TRANSFER_SUCCESS:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case TRANSFER_ERROR:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: payload,
        },
      };
    case RESET_TRANSFER_ERROR:
      return {
        ...state,
        transfer: {
          ...state.transfer,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
