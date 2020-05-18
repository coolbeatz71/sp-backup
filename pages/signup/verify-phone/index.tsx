import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./verify-phone.module.scss";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";
import signup from "redux/actions/Auth/signup";

export interface VerifyPhoneProps {}

const VerifyPhone: React.FC<VerifyPhoneProps> = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    ({ auth: { sendConfirmationCode } }: IRootState) => sendConfirmationCode,
  );

  const { loading, error } = useSelector(
    ({ auth: { signup } }: IRootState) => signup,
  );

  const handleSubmit = (form: {}) => {
    signup({ ...currentUser, ...form })(push, dispatch);
  };

  return (
    <div className={styles.verifyPhone}>
      <AuthLayout
        context="verify-phone"
        formState={{ loading, error: error.message, data: currentUser }}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default VerifyPhone;
