import { ISearchKeyword } from "redux/initialStates/search";
import { GET_KEYWORD } from "../../action-types/search/getKeyword";

export default (
  state: ISearchKeyword,
  { type, payload }: { type: string; payload: string },
) => {
  switch (type) {
    case GET_KEYWORD:
      return {
        ...state,
        keyword: payload,
      };
    default:
      return null;
  }
};
