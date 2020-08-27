import splApi from "helpers/axios";
import {
  CREATE_CAUSE_START,
  CREATE_CAUSE_ERROR,
  CREATE_CAUSE_SUCCESS,
  SET_CROPPED_IMAGE,
  CLEAR_CREATE_CAUSE,
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
      dispatch({
        type: CREATE_CAUSE_ERROR,
        payload:
          error.message ||
          "We couldn't create your cause 😥, something went wrong!",
      });
    });
};

export const clear = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_CREATE_CAUSE,
  });
};

export const setCroppedImage = (image: UploadFile[]) => (dispatch: any) => {
  dispatch({
    type: SET_CROPPED_IMAGE,
    payload: image,
  });
};
