import { CLEAR_CURRENT_USER } from "redux/action-types/user/currentUser";

const clearCurrentUser = (dispatch: any) => {
  dispatch({
    type: CLEAR_CURRENT_USER,
  });
};

export default clearCurrentUser;
