import React, { useState } from "react";
import { Input as SemanticInput } from "antd";
import { InputProps, PasswordProps } from "antd/es/input";
import styles from "./input.module.scss";

const { Password } = SemanticInput;

export interface InputInterface {
  canHaveError?: boolean;
}

const Input: React.FC<InputInterface & InputProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);
  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  return (
    <div className={`${styles.input} ${props.canHaveError ? styles.canHaveError : ""}`}>
      <SemanticInput
        id={props.name}
        {...defaultProps}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <label
        className={`${styles.input__label} ${onFocus ? styles.focused__mode : ""}`}
        htmlFor={props.name}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

const InputPassword: React.FC<InputInterface & PasswordProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);
  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  return (
    <div className={`${styles.input} ${props.canHaveError ? styles.canHaveError : ""}`}>
      <Password
        id={props.name}
        {...defaultProps}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <label
        className={`${styles.input__label} ${onFocus ? styles.focused__mode : ""}`}
        htmlFor={props.name}
      >
        {placeholder}
      </label>
    </div>
  );
};

Input.defaultProps = {
  canHaveError: true
};

InputPassword.defaultProps = {
  canHaveError: true
};

export { Input, InputPassword };
