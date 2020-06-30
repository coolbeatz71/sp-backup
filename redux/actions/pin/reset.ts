import { saveApi } from "helpers/axios";
import { AES } from "crypto-js";
import {
  PIN_RESET_START,
  PIN_RESET_ERROR,
  PIN_RESET_SUCCESS,
} from "redux/action-types/pin/reset";
import { PIN_RESET_UPDATE_PATH } from "../../../helpers/paths";

export default (data: { [key: string]: any }) => (push: any, dispatch: any) => {
  dispatch({
    type: PIN_RESET_START,
  });

  saveApi
    .post("/auth/reset_password/token", data)
    .then((response: any) => {
      const payload = response;
      const cipherPhone = AES.encrypt(data.phone_number, "");

      dispatch({
        payload,
        type: PIN_RESET_SUCCESS,
      });
      push({
        pathname: PIN_RESET_UPDATE_PATH,
        query: {
          id: cipherPhone.toString(),
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: PIN_RESET_ERROR,
        payload: error,
      });
    });
};
