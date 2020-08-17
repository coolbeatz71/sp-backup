import splApi from "helpers/axios";
import {
  RESUME_CAUSE_START,
  RESUME_CAUSE_SUCCESS,
  RESUME_CAUSE_ERROR,
} from "redux/action-types/cause/resumeCause";
import errorFormatter from "helpers/errorFormatter";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  setActionToSuccess: any,
  dispatch: any,
) => {
  dispatch({
    type: RESUME_CAUSE_START,
  });
  splApi
    .put(`/causes/${slug}/activate`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: RESUME_CAUSE_SUCCESS,
      });
      setActionToSuccess(true);
    })
    .catch((error: any) => {
      let payload;
      if (error.message) payload = errorFormatter(error.message);
      dispatch({
        payload,
        type: RESUME_CAUSE_ERROR,
      });
    });
};
