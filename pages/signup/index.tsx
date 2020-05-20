import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./signup.module.scss";
import AuthLayout from "components/Auth/Layout";
import { sendVerificationCode } from "redux/actions/Auth/signup";
import { IRootState } from "redux/initialStates";

export interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  useEffect(() => {
    if (isLoggedin) push("/");
  }, []);

  const { loading, error } = useSelector(
    ({ auth: { sendConfirmationCode } }: IRootState) => sendConfirmationCode,
  );

  const handleSubmit = (form: {}) => {
    sendVerificationCode(form)(push, dispatch);
  };

  return (
    <div className={styles.signup}>
      <AuthLayout
        context="signup"
        handleSubmit={handleSubmit}
        formState={{ loading, error: error.message }}
      />
    </div>
  );
};

export default Signup;
