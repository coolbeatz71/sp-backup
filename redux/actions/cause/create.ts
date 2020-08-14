import splApi from "helpers/axios";
import {
  CREATE_CAUSE_START,
  CREATE_CAUSE_ERROR,
  CREATE_CAUSE_SUCCESS,
  SET_CROPPED_IMAGE,
} from "redux/action-types/cause/create";
import { UploadFile } from "antd/es/upload/interface";

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
        payload:  error.message || "We couldnt create your cause 😥, something went wrong!",
      });
    });
};

export const setCroppedImage =  (image: UploadFile[]) => (dispatch: any) => {
  dispatch({
    type: SET_CROPPED_IMAGE,
    payload: image,
  });
};
