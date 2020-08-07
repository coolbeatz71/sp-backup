import splApi from "helpers/axios";
import {
  PAUSE_CAUSE_START,
  PAUSE_CAUSE_SUCCESS,
  PAUSE_CAUSE_ERROR,
} from "redux/action-types/cause/pauseCause";
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
      let payload;
      if (error.message) payload = errorFormatter(error.message);
      dispatch({
        payload,
        type: PAUSE_CAUSE_ERROR,
      });
    });
};
