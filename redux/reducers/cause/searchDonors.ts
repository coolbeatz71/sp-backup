import { ICause } from "redux/initialStates/cause";
import {
  SEARCH_DONORS_START,
  SEARCH_DONORS_SUCCESS,
  SEARCH_DONORS_ERROR,
  MORE_SEARCH_DONORS_START,
  MORE_SEARCH_DONORS_SUCCESS,
  CLEAR_SEARCH_DONORS,
} from "redux/action-types/cause/donors";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: ICause, { type, payload }: Iaction) => {
  switch (type) {
    case SEARCH_DONORS_START:
      return {
        ...state,
        donors: {
          ...state.donors,
          data: {
            ...state.donors.data,
            search: [],
          },
          loading: {
            ...state.donors.loading,
            search: true,
          },
          error: {
            ...state.donors.error,
            search: null,
          },
        },
      };
    case SEARCH_DONORS_SUCCESS:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: {
            ...state.donors.loading,
            search: false,
          },
          data: {
            ...state.donors.data,
            search: payload.data,
          },
          error: {
            ...state.donors.error,
            search: null,
          },
          meta: {
            ...state.donors.meta,
            search: payload.meta,
          },
        },
      };
    case SEARCH_DONORS_ERROR:
      return {
        ...state,
        donors: {
          ...state.donors,
          loading: {
            ...state.donors.loading,
            search: false,
          },
          error: {
            ...state.donors.error,
            search: payload,
          },
        },
      };
    case MORE_SEARCH_DONORS_START:
      return {
        ...state,
        moreDonors: {
          ...state.moreDonors,
          loading: true,
        },
      };
    case MORE_SEARCH_DONORS_SUCCESS:
      return {
        ...state,
        moreDonors: {
          ...state.moreDonors,
          data: [...state.moreDonors.data, ...payload.data],
          loading: false,
        },
      };
    case CLEAR_SEARCH_DONORS:
      return {
        ...state,
        donors: {
          ...state.donors,
          data: {
            ...state.donors.data,
            search: [],
          },
          loading: {
            ...state.donors.loading,
            search: false,
          },
          error: {
            ...state.donors.error,
            search: null,
          },
        },
        moreDonors: {
          ...state.moreDonors,
          data: [],
          loading: false,
        },
      };
    default:
      return null;
  }
};
