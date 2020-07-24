import { Iauth } from "redux/initialStates/auth";
import { SHOW_AUTH_DIALOG, CHANGE_AUTH_CONTEXT } from "redux/action-types/Auth/showAuthDialog";

interface Iaction {
  type: string;
  payload: any;
}

export default (state: Iauth, { type, payload }: Iaction) => {
  switch (type) {
    case SHOW_AUTH_DIALOG:
      return {
        ...state,
        showAuthDialog: {
          ...state.showAuthDialog,
          ...payload,
        },
      };
    case CHANGE_AUTH_CONTEXT:
      return {
        ...state,
        showAuthDialog: {
          ...state.showAuthDialog,
          context: payload,
        },
      };
    default:
      return null;
  }
};
