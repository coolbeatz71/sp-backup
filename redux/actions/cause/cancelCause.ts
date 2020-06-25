import splApi from "helpers/axios";
import {
  CANCEL_CAUSE_START,
  CANCEL_CAUSE_SUCCESS,
  CANCEL_CAUSE_ERROR,
} from "redux/action-types/cause/cancelCause";
import notification from "utils/notification";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

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
      if (error.message) notification(errorFormatter(error.message), "error");
      dispatch({
        type: CANCEL_CAUSE_ERROR,
        payload: error,
      });
    });
};
