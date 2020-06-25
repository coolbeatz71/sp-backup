import splApi from "helpers/axios";
import {
  EDIT_CAUSE_START,
  EDIT_CAUSE_ERROR,
  EDIT_CAUSE_SUCCESS,
} from "redux/action-types/cause/edit";
import notification from "utils/notification";

export default (data: any, slug: string | string[]) => (push: any, dispatch: any) => {
  dispatch({
    type: EDIT_CAUSE_START,
  });

  splApi
    .put(`/causes/${slug}`, data)
    .then((response: any) => {
      const payload = response.data;
      dispatch({
        payload,
        type: EDIT_CAUSE_SUCCESS,
      });
      notification("Cause updated successfully", "success");
      push("/user/causes");
    })
    .catch((error) => {
      console.error("here", error);
      dispatch({
        type: EDIT_CAUSE_ERROR,
        payload: error.message || "We couldnt edit your cause 😥, something went wrong!",
      });
    });
};
