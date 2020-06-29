import { saveApi } from "helpers/axios";
import {
  PIN_RESET_UPDATE_START,
  PIN_RESET_UPDATE_ERROR,
  PIN_RESET_UPDATE_SUCCESS,
} from "redux/action-types/pin/reset-update";
import notification from "utils/notification";
import { LOGIN_PATH } from "./../../../helpers/paths";

export default (data: {}) => (replace: any, dispatch: any) => {
  dispatch({
    type: PIN_RESET_UPDATE_START,
  });

  saveApi
    .post("/auth/reset_password", data)
    .then((response: any) => {
      const payload = response;
      dispatch({
        payload,
        type: PIN_RESET_UPDATE_SUCCESS,
      });
      notification("PIN updated, you can now use it to login");
      replace(LOGIN_PATH);
    })
    .catch((error) => {
      dispatch({
        type: PIN_RESET_UPDATE_ERROR,
        payload: error,
      });
    });
};
