import { IAllCategories } from "redux/initialStates/categories";
import {
  GET_ALL_CATEGORIES_START,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_ERROR,
} from "redux/action-types/categories/getAll";

interface IAction {
  type: string;
  payload: any;
}

export default (state: IAllCategories, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_CATEGORIES_START:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          data: payload,
          error: null,
          fetched: true,
        },
      };
    case GET_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          error: payload,
          fetched: true,
        },
      };
    default:
      return null;
  }
};
