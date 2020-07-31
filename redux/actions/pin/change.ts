import { saveApi } from "helpers/axios";
import {
  PIN_CHANGE_START,
  PIN_CHANGE_ERROR,
  PIN_CHANGE_SUCCESS,
} from "redux/action-types/pin/change";
import notification from "utils/notification";

export default (data: { [key: string]: any }) => (dispatch: any) => {
  dispatch({
    type: PIN_CHANGE_START,
  });

  saveApi
    .post("/auth/change_password", data)
    .then((response: any) => {
      const payload = response;
      dispatch({
        payload,
        type: PIN_CHANGE_SUCCESS,
      });
      notification("PIN succesfully updated");
    })
    .catch((error) => {
      dispatch({
        type: PIN_CHANGE_ERROR,
        payload: error,
      });
    });
};
