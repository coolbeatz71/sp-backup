import React, { useState, useRef, useEffect } from "react";
import styles from "./accessCode.module.scss";
import { Modal, Input, Typography } from "antd";
import { IUnknownObject } from "interfaces/unknownObject";
import getSingle from "redux/actions/cause/getSingle";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export interface AccessCodeProps {
  slug: string | string[];
  error?: any;
}

const { Text } = Typography;

const AccessCode: React.FC<AccessCodeProps> = ({ slug, error }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const digitsToFill = Array.from({ length: 4 }, (_, index) => index);
  const inputRefs = digitsToFill.map((_) => useRef({ focus: (): any => null }));
  const [values, setValues] = useState<IUnknownObject>({});

  const submit = (value: IUnknownObject) => {
    const accessCode = Object.keys(value)
      .reduce((code, digit) => code + value[digit], "")
      .slice(0, 4);
    getSingle(slug, { access_code: accessCode })(dispatch);
  };

  const handleValueChange = ({ target: { name, value } }: IUnknownObject) => {
    if (/[a-zA-Z]/.test(value) || /[*|":<>[\]{}\-`\\()'.,;@&$]/.test(value)) {
      return setValues({ ...values, [name]: "" });
    }
    if (value) {
      const newValue: IUnknownObject = {
        ...values,
        [name]: value[value.length - 1],
      };
      const digitsFilled = Object.keys(newValue).length;
      const nextEmptyInput = Object.keys(newValue).find(
        (key) => !newValue[key]
      );
      const nextDigitToFill = nextEmptyInput
        ? Number(nextEmptyInput)
        : digitsFilled;
      setValues(newValue);
      if (!nextEmptyInput && digitsFilled === digitsToFill.length) {
        return submit(newValue);
      }
      inputRefs[nextDigitToFill].current.focus();
    } else {
      setValues({ ...values, [name]: "" });
    }
  };

  const handlePaste = async ({ target: { name } }: IUnknownObject) => {
    const pastedContent = await navigator.clipboard.readText();
    if (!Number(pastedContent)) return;
    const newValues = { ...values };
    [...pastedContent].reduce((digit, content) => {
      newValues[digit] = content;
      return digit + 1;
    }, Number(name));
    setValues(newValues);
    const inputToFocus =
      Object.keys(newValues).length > 4 ? 3 : Object.keys(newValues).length - 1;
    inputRefs[inputToFocus].current.focus();
    if (Object.keys(newValues).length >= 4) {
      setTimeout(() => {
        submit(newValues);
      }, 1000);
    }
  };

  const prevValues: IUnknownObject = useRef();
  useEffect(() => {
    prevValues.current = values;
  });

  const prevCount = prevValues.current;

  const handleDelete = ({ keyCode, target }: IUnknownObject) => {
    setValues({ ...values });
    if (keyCode === 8 && !prevCount[target.name] && Number(target.name) !== 0)
      inputRefs[target.name - 1].current.focus();
  };

  return (
    <div className={styles.accessCode}>
      <Modal
        className="access-code-modal"
        title="ACCESS CODE"
        footer={false}
        visible={true}
        onCancel={() => push("/")}
      >
        <div className="access-code-modal__form d-flex">
          {digitsToFill.map((digitNo) => (
            <Input
              key={digitNo}
              autoFocus={digitNo === 0}
              className="access-code-modal__form__input"
              onChange={handleValueChange}
              name={`${digitNo}`}
              value={values[`${digitNo}`]}
              onPaste={handlePaste}
              onKeyUp={handleDelete}
               // @ts-ignore: a type mismatch
              ref={inputRefs[digitNo]}
            />
          ))}
        </div>
        <Text className="text-center d-block my-3" type="danger">
          {error?.status === 400 && error?.message}
        </Text>
      </Modal>
    </div>
  );
};

export default AccessCode;
