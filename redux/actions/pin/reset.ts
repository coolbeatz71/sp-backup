import { saveApi } from "helpers/axios";
import {
  PIN_RESET_START,
  PIN_RESET_ERROR,
  PIN_RESET_SUCCESS,
} from "redux/action-types/pin/reset";
import { changeAuthContext } from "../Auth/showAuthDialog";

export default (data: { [key: string]: any }) => (dispatch: any) => {
  dispatch({
    type: PIN_RESET_START,
  });

  saveApi
    .post("/auth/reset_password/token", data)
    .then((response: any) => {
      const payload = { ...response, ...data };
      dispatch({
        payload,
        type: PIN_RESET_SUCCESS,
      });
      changeAuthContext("pin-reset-update")(dispatch);
    })
    .catch((error) => {
      dispatch({
        type: PIN_RESET_ERROR,
        payload: error,
      });
    });
};
