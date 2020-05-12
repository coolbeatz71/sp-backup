import { CHANGE_NAME_SUCCESS } from "redux/action-types/example/changeName";

export default (name: string) => (dispatch: any) => {
  dispatch({
    type: CHANGE_NAME_SUCCESS,
    payload: name,
  });
};
