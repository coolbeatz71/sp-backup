import splApi from "helpers/axios";
import {
  CASHOUT_START,
  CASHOUT_SUCCESS,
  CASHOUT_ERROR,
} from "redux/action-types/cause/cashout";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  setActionToSuccess: any,
  dispatch: any,
) => {
  dispatch({
    type: CASHOUT_START,
  });
  splApi
    .post(`/causes/${slug}/cashout`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: CASHOUT_SUCCESS,
      });
      setActionToSuccess(true);
    })
    .catch((error: any) => {
      let payload;
      if (error.message) payload = errorFormatter(error.message);
      dispatch({
        payload,
        type: CASHOUT_ERROR,
      });
    });
};
