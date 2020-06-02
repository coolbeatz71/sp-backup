import React, { useState, useEffect, useRef } from "react";
import { Input as SemanticInput } from "antd";
import { InputProps, PasswordProps, TextAreaProps } from "antd/es/input";
import styles from "./input.module.scss";

const { Password, TextArea: SemanticTextArea } = SemanticInput;

export interface InputInterface {
  canHaveError?: boolean;
  ref?: any;
}

const Input: React.FC<InputInterface & InputProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);
  useEffect(() => {
    if (props.value || props.defaultValue) setOnFocus(true);
  }, [props.value]);
  const inputRef = useRef({ focus: (): any => null });
  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  const focusOnClick = () => inputRef.current.focus();

  return (
    <div
      className={`${styles.input} ${props.className} ${
        props.canHaveError ? styles.canHaveError : ""
      }`}
    >
      <SemanticInput
        id={props.name}
        onFocus={handleFocus}
        onBlur={handleFocus}
        ref={inputRef}
        {...defaultProps}
      />
      <label
        className={`${styles.input__label} ${
          onFocus ? styles.focused__mode : ""
        }`}
        htmlFor={props.name}
        onClick={focusOnClick}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

const InputPassword: React.FC<InputInterface & PasswordProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);
  useEffect(() => {
    if (props.value || props.defaultValue) setOnFocus(true);
  }, [props.value]);
  const inputRef = useRef({ focus: (): any => null });

  const focusOnClick = () => inputRef.current.focus();

  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  return (
    <div
      className={`${styles.input} ${props.className} ${
        props.canHaveError ? styles.canHaveError : ""
      }`}
    >
      <Password
        id={props.name}
        onFocus={handleFocus}
        onBlur={handleFocus}
        ref={inputRef}
        {...defaultProps}
      />
      <label
        className={`${styles.input__label} ${
          onFocus ? styles.focused__mode : ""
        }`}
        htmlFor={props.name}
        onClick={focusOnClick}
      >
        {placeholder}
      </label>
    </div>
  );
};
const TextArea: React.FC<TextAreaProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);

  const rows = props.rows || 5;
  useEffect(() => {
    if (props.value || props.defaultValue) setOnFocus(true);
  }, [props.value]);
  const inputRef = useRef({ focus: (): any => null });

  const focusOnClick = () => inputRef.current.focus();

  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  return (
    <div className={`${styles.input} ${props.className}`}>
      <SemanticTextArea
        id={props.name}
        onFocus={handleFocus}
        onBlur={handleFocus}
        autoSize={{ minRows: rows, maxRows: rows }}
        {...defaultProps}
      />
      <label
        className={`${styles.input__label} ${
          onFocus ? styles.focused__mode : ""
        }`}
        htmlFor={props.name}
        onClick={focusOnClick}
      >
        {placeholder}
      </label>
      <span className={`${styles.input__wordsCount}`}>
        {`${(props.maxLength || 0) - `${props.value}`.length} Words`}
      </span>
    </div>
  );
};

Input.defaultProps = {
  canHaveError: true,
};

InputPassword.defaultProps = {
  canHaveError: true,
};

export { Input, InputPassword, TextArea };
