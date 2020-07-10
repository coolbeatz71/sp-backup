import { saveApi } from "helpers/axios";
import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
} from "redux/action-types/user/updateProfile";

export default (data: { [key: string]: any}, uploadAvatar?: boolean) => (dispatch: any, setSuccessModal: any) => {
  dispatch({
    type: UPDATE_PROFILE_START,
  });

  saveApi
    .put("/profiles", data)
    .then((response: any) => {
      const payload = response.data;
      dispatch({
        payload,
        type: UPDATE_PROFILE_SUCCESS,
      });
      setSuccessModal(!uploadAvatar);
    })
    .catch((error) => {
      console.error("here update profile error", error);
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: error.message,
      });
    });
};
