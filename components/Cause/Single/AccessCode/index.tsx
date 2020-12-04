import React, { useState, useRef, useEffect } from "react";
import { Input, Typography, Row, Col } from "antd";
import { IUnknownObject } from "interfaces/unknownObject";
import getSingle from "redux/actions/cause/getSingle";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Modal from "components/common/Modal";
import styles from "./accessCode.module.scss";

export interface AccessCodeProps {
  slug: string | string[];
  error?: any;
  length: number;
}

const AccessCode: React.FC<AccessCodeProps> = ({ slug, error, length }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const digitsToFill = Array.from({ length }, (_, index) => index);
  const inputRefs = digitsToFill.map((_) => useRef({ focus: (): any => null }));
  const [values, setValues] = useState<IUnknownObject>({});

  const submit = (value: IUnknownObject) => {
    const accessCode = Object.keys(value)
      .reduce((code, digit) => code + value[digit], "")
      .slice(0, length);
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
      const nextEmptyInput = Object.keys(newValue).findIndex(
        (key, index) => Number(index) !== Number(key)
      );
      const nextDigitToFill =
        nextEmptyInput >= 0 ? Number(nextEmptyInput) : digitsFilled;
      setValues(newValue);
      if (digitsFilled === digitsToFill.length) {
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
      Object.keys(newValues).length > length
        ? length - 1
        : Object.keys(newValues).length - 1;
    inputRefs[inputToFocus].current.focus();
    if (Object.keys(newValues).length >= length) {
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
    <Modal title="Access Code" visible={true} onCancel={() => push("/")}>
      <>
        <Row gutter={[24, 24]} justify="center">
          {digitsToFill.map((digitNo) => (
            <Col key={`item-${digitNo}`}>
              <Input
                size="large"
                key={digitNo}
                autoFocus={digitNo === 0}
                className={styles.accessCode__input}
                onChange={handleValueChange}
                name={`${digitNo}`}
                value={values[`${digitNo}`]}
                onPaste={handlePaste}
                onKeyUp={handleDelete}
                type="number"
                pattern="\d*"
                inputmode="numeric"
                // @ts-ignore: a type mismatch
                ref={inputRefs[digitNo]}
              />
            </Col>
          ))}
        </Row>
        {error?.status === 400 && (
          <Row justify="space-around">
            <Col>
              <Typography.Paragraph type="danger">
                {error?.message}
              </Typography.Paragraph>
            </Col>
          </Row>
        )}
      </>
    </Modal>
  );
};

export default AccessCode;
