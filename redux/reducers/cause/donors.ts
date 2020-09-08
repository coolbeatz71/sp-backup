import { ICause } from "redux/initialStates/cause";
import {
  GET_CAUSE_DONORS_START,
  GET_CAUSE_DONORS_SUCCESS,
  GET_CAUSE_DONORS_ERROR,
} from "redux/action-types/cause/getDonors";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case GET_CAUSE_DONORS_START:
      return {
        ...state,
        donors: {
          ...state.donors,
          data: [],
          loading: true,
          error: null,
        },
      };
    case GET_CAUSE_DONORS_SUCCESS:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_CAUSE_DONORS_ERROR:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: false,
          error: payload,
        },
      };
    default:
      return null;
  }
};
