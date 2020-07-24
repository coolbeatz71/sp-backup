import React from "react";
import styles from "./authLayout.module.scss";
import AuthForm, { AuthFormProps } from "components/Auth/Form";

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
      : "Welcome Back!";

  return (
    <div className={styles.authLayout}>
      <h3>{Title}</h3>
      <div className={styles.form}>
        <AuthForm
          context={context}
          handleSubmit={handleSubmit}
          formState={formState}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
