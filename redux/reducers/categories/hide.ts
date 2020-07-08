import { IAllCategories } from "redux/initialStates/categories";
import { HIDE_CATEGORY_BAR } from "redux/action-types/categories/hide";

interface IAction {
  type: string;
  payload: any;
}

export default (state: IAllCategories, { type, payload }: IAction) => {
  switch (type) {
    case HIDE_CATEGORY_BAR:
      return {
        ...state,
        hide: payload,
      };
    default:
      return null;
  }
};
