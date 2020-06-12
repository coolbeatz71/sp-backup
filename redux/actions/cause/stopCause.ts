import splApi from "helpers/axios";
import {
  STOP_CAUSE_START,
  STOP_CAUSE_SUCCESS,
  STOP_CAUSE_ERROR,
} from "redux/action-types/cause/stopCause";
import notification from "utils/notification";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  setStoppingToSuccess: any,
  dispatch: any,
) => {
  dispatch({
    type: STOP_CAUSE_START,
  });
  splApi
    .put(`/causes/${slug}/stop`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: STOP_CAUSE_SUCCESS,
      });
      setStoppingToSuccess(true);
    })
    .catch((error: any) => {
      if (error.message) notification(errorFormatter(error.message), "error");
      dispatch({
        type: STOP_CAUSE_ERROR,
        payload: error,
      });
    });
};
