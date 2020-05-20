import React from "react";
import { useSelector } from "react-redux";
import styles from "./login.module.scss";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  const { loading, error } = useSelector(
    ({ auth: { signup } }: IRootState) => signup
  );
  const handleSubmit = (form: {}) => {
    console.log("here ", form);
  };

  return (
    <div className={styles.login}>
      <AuthLayout
        context="login"
        handleSubmit={handleSubmit}
        formState={{ loading, error: error.message }}
      />
    </div>
  );
};

export default Login;
