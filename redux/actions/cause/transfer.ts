import splApi from "helpers/axios";
import {
  TRANSFER_START,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
} from "redux/action-types/cause/transfer";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  setActionToSuccess: any,
  dispatch: any,
) => {
  dispatch({
    type: TRANSFER_START,
  });
  splApi
    .post(`/causes/${slug}/transfer`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: TRANSFER_SUCCESS,
      });
      setActionToSuccess(true);
    })
    .catch((error: any) => {
      let payload;
      if (error.message) payload = errorFormatter(error.message);
      dispatch({
        payload,
        type: TRANSFER_ERROR,
      });
    });
};
