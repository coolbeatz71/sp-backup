import splApi from "helpers/axios";
import {
  PAUSE_CAUSE_START,
  PAUSE_CAUSE_SUCCESS,
  PAUSE_CAUSE_ERROR,
} from "redux/action-types/cause/pauseCause";
import notification from "utils/notification";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  setPausingToSuccess: any,
  dispatch: any,
) => {
  dispatch({
    type: PAUSE_CAUSE_START,
  });
  splApi
    .put(`/causes/${slug}/pause`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: PAUSE_CAUSE_SUCCESS,
      });
      setPausingToSuccess(true);
    })
    .catch((error: any) => {
      if (error.message) notification(errorFormatter(error.message), "error");
      dispatch({
        type: PAUSE_CAUSE_ERROR,
        payload: error,
      });
    });
};
