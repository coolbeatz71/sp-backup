import { GET_KEYWORD } from "../../action-types/search/getKeyword";

export const getKeyword = (payload: string) => (dispatch: any) => {
  dispatch({
    payload,
    type: GET_KEYWORD,
  });
};
