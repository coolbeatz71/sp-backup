import React, { FunctionComponent } from "react";
import style from "./button.module.scss";

export interface SocialButtonProps {
  type?: "facebook" | "google";
  onClick?: () => void;
}

const SocialButton: FunctionComponent<SocialButtonProps> = (props) => {
  const getContent = (context?: string): { icon: string; label: string } => {
    if (context === "facebook") {
      return {
        icon: "icons/social-facebook.svg",
        label: "Sign Up With Facebook",
      };
    }
    return {
      icon: "icons/social-google.svg",
      label: "Sign Up With Google",
    };
  };

  return (
    <button onClick={props.onClick} className={style.socialLogin}>
      <img src={getContent(props.type).icon} alt="kks" />
      <span>{getContent(props.type).label}</span>
    </button>
  );
};

SocialButton.defaultProps = {
  type: "google",
};

export { SocialButton };
