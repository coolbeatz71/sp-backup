import { HIDE_CATEGORY_BAR } from "../../action-types/categories/hide";

export const toggleCategoryBar = (payload: boolean) => (dispatch: any) => {
  dispatch({
    payload,
    type: HIDE_CATEGORY_BAR,
  });
};
