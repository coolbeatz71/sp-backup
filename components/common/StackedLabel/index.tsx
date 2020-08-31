import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./StackedLabel.module.scss";

interface Props {
  label: string;
  id?: string;
  value?: any;
  datePicker?: boolean;
  select?: boolean;
  phone?: string;
  onChange?: () => void;
  loading?: boolean;
  required?: boolean;
  wordCount?: any;
  children: Element | any;
}

const StackedLabel: React.FC<Props> = ({
  label,
  id = "StackedLabel",
  value = "",
  datePicker = false,
  select = false,
  phone = null,
  onChange = () => null,
  loading = false,
  required = false,
  wordCount,
  children,
}) => {
  const [status, setStatus] = React.useState(
    [null, undefined, ""].includes(value) ? "" : "__stacked",
  );
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);

  const onFocus = () => setStatus("__stacked");
  const onBlur = () => {
    setStatus([null, undefined, ""].includes(value) ? "" : "__stacked");
  };

  const ref = React.useRef({
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

  if (select) console.log(ref.current);

  return (
    <div className={!phone ? styles.input : styles.input__phone}>
      {React.cloneElement(children, {
        ref,
        value,
        onChange,
        onFocus,
        onBlur,
        ...(datePicker ? datePickerProps : {}),
        ...(select ? selectProps : {}),
        ...(loading ? { disabled: true } : {}),
        placeholder: "",
      })}
      {phone && (
        <span className={styles.input__phone__code_prefix}>{phone}</span>
      )}
      {loading && (
        <div className={styles.input__loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />
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
      {wordCount && <div className={styles.input__word_count}>{wordCount}</div>}
    </div>
  );
};

export default StackedLabel;
