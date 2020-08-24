import React, { useState, useEffect, useRef } from "react";
import { Input as SemanticInput } from "antd";
import { InputProps, PasswordProps, TextAreaProps } from "antd/es/input";
import styles from "./input.module.scss";
import { IUnknownObject } from "interfaces/unknownObject";

const { Password, TextArea: SemanticTextArea } = SemanticInput;

export interface InputInterface {
  canHaveError?: boolean;
  ref?: any;
  hasWordCount?: boolean;
  handleChange?: () => void;
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
      {props.hasWordCount && (
        <span className={`${styles.input__wordsCount}`}>
          {`${(props.maxLength || 0) - `${props.value}`.length} Characters`}
        </span>
      )}
    </div>
  );
};

const InputPhoneNumber: React.FC<InputInterface & InputProps> = (props) => {
  const { placeholder, ...defaultProps } = props;
  const [onFocus, setOnFocus] = useState(false);
  const [phoneTelcoIcon, setPhoneTelco] = useState("default");

  const setTelcoIcon = (value: any) => {
    if (value.match(/^7[23]/)) return setPhoneTelco("/icons/airtel-logo.png");
    if (value.startsWith("78")) return setPhoneTelco("/icons/mtn.png");
    setPhoneTelco("default");
  };

  useEffect(() => {
    if (props.value || props.defaultValue) {
      setOnFocus(true);
      setTelcoIcon(props.value || props.defaultValue);
    }
  }, [props.value]);
  const inputRef = useRef({ focus: (): any => null, state: { value: "" } });
  const handleFocus = ({ target }: any) => {
    if (target.value.length > 0) return setOnFocus(true);
    setOnFocus(!onFocus);
  };

  const handleChange = ({ target: { value } }: IUnknownObject) => {
    setTelcoIcon(value);
    if (props.handleChange) props?.handleChange();
  };

  const focusOnClick = () => inputRef.current.focus();

  return (
    <div
      className={`${styles.input} phone-code ${props.className} ${
        props.canHaveError ? styles.canHaveError : ""
      }`}
    >
      <SemanticInput
        id={props.name}
        onFocus={handleFocus}
        onBlur={handleFocus}
        ref={inputRef}
        addonBefore="+250"
        onChange={handleChange}
        addonAfter={
          phoneTelcoIcon !== "default" && (
            <img className="telco-icon" src={phoneTelcoIcon} alt="telco icon" />
          )
        }
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
      {props.hasWordCount && (
        <span className={`${styles.input__wordsCount}`}>
          {`${(props.maxLength || 0) - `${props.value}`.length} Characters`}
        </span>
      )}
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
        {`${(props.maxLength || 0) - `${props.value}`.length} Characters`}
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

export { Input, InputPassword, TextArea, InputPhoneNumber };
