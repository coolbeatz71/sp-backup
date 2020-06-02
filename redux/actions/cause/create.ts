import splApi from "helpers/axios";
import {
  CREATE_CAUSE_START,
  CREATE_CAUSE_ERROR,
  CREATE_CAUSE_SUCCESS,
} from "redux/action-types/cause/create";

export default (data: any) => (dispatch: any, setSuccessStep: any) => {
  dispatch({
    type: CREATE_CAUSE_START,
  });

  splApi
    .post("/causes", data)
    .then((response: any) => {
      const payload = response.data;
      dispatch({
        payload,
        type: CREATE_CAUSE_SUCCESS,
      });
      setSuccessStep(true);
    })
    .catch((error) => {
      console.error("here", error);
      dispatch({
        type: CREATE_CAUSE_ERROR,
        payload: "We couldnt create your cause 😥, something went wrong!",
      });
    });
};
