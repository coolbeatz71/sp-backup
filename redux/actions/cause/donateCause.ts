import splApi from "helpers/axios";
import {
  DONATE_CAUSE_START,
  DONATE_CAUSE_SUCCESS,
  DONATE_CAUSE_ERROR,
} from "redux/action-types/cause/donateCause";
import { IUnknownObject } from "interfaces/unknownObject";

export default (slug: string | string[], data: IUnknownObject) => (
  showConfirmationModal: any,
  setDonationToSuccess: any,
  dispatch: any
) => {
  dispatch({
    type: DONATE_CAUSE_START,
  });
  showConfirmationModal(true);
  splApi
    .post(`/causes/${slug}/donations`, data)
    .then((response: any) => {
      dispatch({
        payload: response,
        type: DONATE_CAUSE_SUCCESS,
      });
      showConfirmationModal(false);
      setDonationToSuccess(true);
    })
    .catch((error: any) => {
      console.error("here", error);
      dispatch({
        type: DONATE_CAUSE_ERROR,
        payload: error,
      });
    });
};
