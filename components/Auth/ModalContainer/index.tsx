import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";
import login from "redux/actions/Auth/login";
import { Modal } from "antd";
import signup, { sendVerificationCode } from "redux/actions/Auth/signup";
import { IUnknownObject } from "interfaces/unknownObject";
import reset from "redux/actions/pin/reset";
import resetUpdate from "redux/actions/pin/reset-update";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import { omitBy } from "lodash";

export interface IAuthModalContainer {}

const AuthModalContainer: React.FC<IAuthModalContainer> = ({}) => {
  const dispatch = useDispatch();

  const { state: isDialogVisible, context } = useSelector(
    ({ auth: { showAuthDialog } }: IRootState) => showAuthDialog,
  );

  const { phone_number } = useSelector(
    ({
      pin: {
        reset: { data },
      },
    }: IRootState) => data,
  );

  const { currentUser } = useSelector(
    ({ auth: { sendConfirmationCode } }: IRootState) => sendConfirmationCode,
  );

  const {
    loading: loadingLogin,
    error: { message: errorLogin },
  } = useSelector(({ auth: { login } }: IRootState) => login);

  const {
    loading: loadingConfirmSignup,
    error: { message: errorConfirmSignup },
  } = useSelector(({ auth: { signup } }: IRootState) => signup);

  const {
    loading: loadingSignup,
    error: { message: errorSignup },
  } = useSelector(
    ({ auth: { sendConfirmationCode } }: IRootState) => sendConfirmationCode,
  );

  const {
    loading: loadingReset,
    error: { message: errorReset },
  } = useSelector(({ pin: { reset } }: IRootState) => reset);

  const {
    loading: loadingResetUpdate,
    error: { message: errorResetUpdate },
  } = useSelector(({ pin: { reset_update } }: IRootState) => reset_update);

  const getFormState = () => {
    switch (context) {
      case "login":
        return {
          loading: loadingLogin,
          error: errorLogin,
        };
      case "signup":
        return {
          loading: loadingSignup,
          error: errorSignup,
        };
      case "verify-phone":
        return {
          loading: loadingConfirmSignup,
          error: errorConfirmSignup,
          data: currentUser,
        };
      case "pin-reset":
        return {
          loading: loadingReset,
          error: errorReset,
        };
      case "pin-reset-update":
        return {
          loading: loadingResetUpdate,
          error: errorResetUpdate,
        };
      default:
        return {};
    }
  };

  const handleSubmit = (form: IUnknownObject) => {
    switch (context) {
      case "login":
        login(form)(dispatch);
        break;
      case "signup":
        const compactForm = omitBy(form, (input) => input === "");
        sendVerificationCode(compactForm)(dispatch);
        break;
      case "verify-phone":
        signup({ ...currentUser, ...form })(dispatch);
        break;
      case "pin-reset":
        reset(form)(dispatch);
        break;
      case "pin-reset-update":
        const data = { ...form, phone_number };
        resetUpdate(data)(dispatch);
        break;
      default:
        break;
    }
  };

  return isDialogVisible ? (
    <Modal
      visible={isDialogVisible}
      className="auth__modal__container"
      width={592}
      onCancel={() => showAuthDialog(false)(dispatch)}
      footer={false}
    >
      <AuthLayout
        context={context}
        handleSubmit={handleSubmit}
        formState={getFormState()}
      />
    </Modal>
  ) : (
    <></>
  );
};

export default AuthModalContainer;
