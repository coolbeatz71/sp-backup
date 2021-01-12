import { cloneElement, FC, useRef, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import numeral from "numeral";
import { telco } from "dev-rw-phone";

import styles from "./StackedLabel.module.scss";

interface Props {
  label: string;
  id?: string;
  value?: any;
  datePicker?: boolean;
  select?: boolean;
  formatNumber?: boolean;
  phone?: string;
  onChange?: () => void;
  loading?: boolean;
  required?: boolean;
  charCount?: number | [number, number];
  children: Element | any;
}

const StackedLabel: FC<Props> = ({
  label,
  id = "StackedLabel",
  value = "",
  datePicker = false,
  select = false,
  formatNumber = false,
  phone = null,
  onChange = () => null,
  loading = false,
  required = false,
  charCount,
  children,
}) => {
  const [status, setStatus] = useState(
    [null, undefined, ""].includes(value) ? "" : "__stacked",
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  const onFocus = () => setStatus("__stacked");
  const onBlur = () => {
    setStatus([null, undefined, ""].includes(value) ? "" : "__stacked");
  };

  const ref = useRef({
    click: (): any => null,
    focus: (): any => null,
  });

  const datePickerProps = {
    open: datePickerOpen,
    onOpenChange: (o: boolean) => {
      setDatePickerOpen(o);
    },
  };

  const selectProps = {
    open: selectOpen,
    onDropdownVisibleChange: (o: boolean) => {
      setSelectOpen(o);
    },
  };

  const numberProps = {
    formatter: (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
  };

  return (
    <div
      className={!phone ? styles.input : styles.input__phone}
      data-char-count={charCount ? true : false}
    >
      {cloneElement(children, {
        ref,
        value,
        onChange,
        onFocus,
        onBlur,
        ...(datePicker ? datePickerProps : {}),
        ...(select ? selectProps : {}),
        ...(formatNumber ? numberProps : {}),
        ...(loading ? { disabled: true } : {}),
        placeholder: "",
        "data-char-count-input": charCount ? true : false,
      })}
      {phone && (
        <>
          <span className={styles.input__phone__code_prefix}>{phone}</span>
          <span className={styles.input__phone__code_suffix}>
            {["Airtel", "Tigo"].includes(telco(value)) && (
              <img src="/images/airtel.png" alt="airtel icon" />
            )}
            {["MTN"].includes(telco(value)) && (
              <img src="/images/mtn.png" alt="mtn icon" />
            )}
          </span>
        </>
      )}
      {loading && (
        <div className={styles.input__loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
        </div>
      )}
      {charCount && (
        <div
          className={styles.input__word_count}
          data-over-limit={
            (typeof value === "string" ? value.length : 0) <
              (typeof charCount !== "number" ? charCount[0] : charCount) ||
            (typeof value === "string" ? value.length : 0) >
              (typeof charCount === "number" ? charCount : charCount[1])
          }
        >
          {`${
            typeof value === "string" ? numeral(value.length).format() : 0
          }/${numeral(
            typeof charCount === "number" ? charCount : charCount[1],
          ).format()}`}
        </div>
      )}
      <label
        key={`label-for-${id}`}
        htmlFor={id}
        className={styles[`input__label${status}`]}
        onClick={() => {
          ref.current.focus();
          if (datePicker) setDatePickerOpen(!datePickerOpen);
          if (select) setSelectOpen(!selectOpen);
        }}
      >
        {label}
        {required && (
          <span className={styles[`input__label${status}__required`]}>*</span>
        )}
      </label>
    </div>
  );
};

export default StackedLabel;
