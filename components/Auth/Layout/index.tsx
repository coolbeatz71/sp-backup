import React from "react";
import styles from "./authLayout.module.scss";
import AuthForm, { AuthFormProps } from "components/Auth/Form";
import SignupSuccess from "../SignupSuccess";

export interface AuthLayoutProps {}

const AuthLayout: React.SFC<AuthLayoutProps & AuthFormProps> = ({
  context,
  handleSubmit,
  formState,
}) => {
  const Title =
    context === "signup" || context === "verify-phone"
      ? "Create a save account"
      : context === "pin-reset" || context === "pin-reset-update"
      ? "Reset PIN"
      : context === "signup-success"
      ? ""
      : "Welcome Back!";

  return (
    <div className={styles.authLayout}>
      <h3>{Title}</h3>
      {context !== "signup-success" ? (
        <div className={styles.form}>
          <AuthForm
            context={context}
            handleSubmit={handleSubmit}
            formState={formState}
          />
        </div>
      ) : (
        <SignupSuccess />
      )}
    </div>
  );
};

export default AuthLayout;
