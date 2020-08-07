import splApi from "helpers/axios";
import {
  CANCEL_CAUSE_START,
  CANCEL_CAUSE_SUCCESS,
  CANCEL_CAUSE_ERROR,
} from "redux/action-types/cause/cancelCause";
import { IUnknownObject } from "interfaces/unknownObject";
import errorFormatter from "helpers/errorFormatter";

export default (slug: string | string[], data: IUnknownObject) => (
  setActionSuccessful: any,
  dispatch: any,
) => {
  dispatch({
    type: CANCEL_CAUSE_START,
  });
  splApi
    .put(`/causes/${slug}/cancel`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: CANCEL_CAUSE_SUCCESS,
      });
      setActionSuccessful(true);
    })
    .catch((error: any) => {
      let payload;
      if (error.message) payload = errorFormatter(error.message);
      dispatch({
        payload,
        type: CANCEL_CAUSE_ERROR,
      });
    });
};
