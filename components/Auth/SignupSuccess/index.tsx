import React from "react";
import styles from "./singupSuccess.module.scss";

export interface SignupSuccessProps {}

const SignupSuccess: React.SFC<SignupSuccessProps> = () => {
  return (
    <div className={styles.signupSuccess}>
      <h4>Your account has been created successfully</h4>
      <img src="/icons/checked-round.svg" alt="check"/>
    </div>
  );
};

export default SignupSuccess;
