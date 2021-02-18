import { authContextType } from "interfaces/authContext";

import {
  SHOW_AUTH_DIALOG,
  CHANGE_AUTH_CONTEXT,
} from "redux/action-types/auth/showAuthDialog";

export default (state: boolean, context: authContextType = "login") => (
  dispatch: any,
) =>
  dispatch({
    type: SHOW_AUTH_DIALOG,
    payload: {
      state,
      context,
    },
  });

export const changeAuthContext = (context: authContextType) => (
  dispatch: any,
) =>
  dispatch({
    type: CHANGE_AUTH_CONTEXT,
    payload: context,
  });
