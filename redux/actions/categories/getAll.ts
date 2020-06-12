import splApi from "helpers/axios";
import {
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_START,
} from "redux/action-types/categories/getAll";

export const getAllCategories = () => (dispatch: any) => {
  dispatch({
    type: GET_ALL_CATEGORIES_START,
  });
  splApi
    .get("/categories")
    .then((response: any) => {
      dispatch({
        payload: response,
        type: GET_ALL_CATEGORIES_SUCCESS,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: GET_ALL_CATEGORIES_ERROR,
        payload: error,
      });
    });
};
