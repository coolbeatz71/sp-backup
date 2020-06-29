import React from "react";
import styles from "./authLayout.module.scss";
import AuthForm, { AuthFormProps } from "components/Auth/Form";

export interface AuthLayoutProps {}

type Imessage = { upMessage: string; downMessage: string };

const AuthLayout: React.SFC<AuthLayoutProps & AuthFormProps> = ({
  context,
  handleSubmit,
  formState,
}) => {
  const getMessage = (context?: string): Imessage => {
    let message: Imessage = {
      upMessage: "Hello there,",
      downMessage: "",
    };
    switch (context) {
      case "verify-phone":
        message = {
          upMessage: "Enter the Validation Code",
          downMessage: "Sent to your Phone",
        };
        break;
      case "signup":
        message.downMessage = "Create a new account";
        break;
      case "login":
        message.downMessage = "Sign into your account";
        break;
      case "pin-reset":
        message.upMessage = "Reset PIN";
        break;
      case "pin-reset-update":
        message.upMessage = "Use the short code";
        message.downMessage = "Sent to your Phone to set a new PIN";
        break;
      default:
        break;
    }
    return message;
  };

  return (
    <div className={styles.authLayout}>
      <div className={styles.message}>
        {getMessage(context).upMessage} <br /> {getMessage(context).downMessage}
      </div>
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
