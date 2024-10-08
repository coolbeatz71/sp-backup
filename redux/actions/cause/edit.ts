import splApi from "helpers/axios";
import {
  EDIT_CAUSE_START,
  EDIT_CAUSE_ERROR,
  EDIT_CAUSE_SUCCESS,
} from "redux/action-types/cause/edit";
import notification from "utils/notification";

export default (data: any, slug: string | string[], isBankDetails = false) => (
  push: any,
  dispatch: any,
) => {
  dispatch({
    type: EDIT_CAUSE_START,
  });

  splApi
    .put(
      isBankDetails
        ? `/causes/${slug}?purpose=bank_details`
        : `/causes/${slug}`,
      data,
    )
    .then((response: any) => {
      const payload = response.data;
      dispatch({
        payload,
        type: EDIT_CAUSE_SUCCESS,
      });
      notification("Cause updated successfully", "success");
      if (push) push(`/causes/${slug}`);
    })
    .catch((error) => {
      dispatch({
        type: EDIT_CAUSE_ERROR,
        payload:
          error.message ||
          "We couldn't edit your cause 😥, something went wrong!",
      });
    });
};
