import { ICause } from "redux/initialStates/cause";
import {
  GET_DONORS_START,
  GET_DONORS_SUCCESS,
  GET_DONORS_ERROR,
} from "redux/action-types/cause/donors";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case GET_DONORS_START:
      return {
        ...state,
        donors: {
          ...state.donors,
          data: {
            ...state.donors.data,
            get: [],
          },
          loading: {
            ...state.donors.loading,
            get: true,
          },
          error: {
            ...state.donors.error,
            get: null,
          },
        },
      };
    case GET_DONORS_SUCCESS:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: {
            ...state.donors.loading,
            get: false,
          },
          data: {
            ...state.donors.data,
            get: payload.data,
          },
          error: {
            ...state.donors.error,
            get: null,
          },
          meta: {
            ...state.donors.meta,
            get: payload.meta,
          },
        },
      };
    case GET_DONORS_ERROR:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: {
            ...state.donors.loading,
            get: false,
          },
          error: {
            ...state.donors.error,
            get: payload,
          },
        },
      };
    default:
      return null;
  }
};
