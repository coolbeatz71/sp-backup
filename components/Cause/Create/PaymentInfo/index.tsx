import React, { useState, useRef, useEffect } from "react";
import { Form, Select, Switch } from "antd";
import { Input } from "components/common/Input";
import { mobileMoney } from "constants/paymentMethods";
import { IUnknownObject } from "interfaces/unknownObject";
import isLocation from "helpers/isLocation";

export interface PaymentInfoProps {}

const PaymentInfo: React.FC<PaymentInfoProps> = () => {
  const [isPrivate, setPrivate] = useState<boolean>(false);
  const handleAccess = (isChecked: boolean) => setPrivate(isChecked);
  const selectRef = useRef<IUnknownObject>({ props: {} });
  const [selectedTelco, setSelectedTelco] = useState<string>("default");
  const handleSelect = (option: any) => setSelectedTelco(option);
  const isEditing = isLocation(["causes", "edit"]);
  const phoneNumberValidation: {
    [key: string]: { regex: RegExp; message: string };
  } = {
    default: {
      regex: /$^/,
      message: "You should first select payment method",
    },
    MTN_Rwanda: {
      regex: /^78/,
      message: "Phone number should be a valid Mtn number",
    },
    Airtel_Rwanda: {
      regex: /^7[23]/,
      message: "Phone number should be a valid Airtel number",
    },
  };

  useEffect(() => {
    if (selectRef.current.props.value)
      setSelectedTelco(selectRef.current.props.value);
  }, [selectRef.current.props.value]);

  return (
    <div>
      <Form.Item
        name="payment_method"
        validateTrigger={["onSubmit", "onBlur", "onChange"]}
        rules={[{ required: true }]}
      >
        <Select
          // @ts-ignore
          ref={selectRef}
          placeholder="Select Payment Method"
          onSelect={handleSelect}
          disabled={isEditing}
        >
          {mobileMoney.map(({ name, text }) => (
            <Select.Option key={name} value={name}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form-group phone-code"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          { len: 9, required: true },
          {
            pattern: phoneNumberValidation[selectedTelco].regex,
            message: phoneNumberValidation[selectedTelco].message,
          },
        ]}
        name="payment_account_number"
      >
        <Input
          placeholder="Enter Phone Number"
          disabled={isEditing}
          addonBefore="+250"
          maxLength={9}
        />
      </Form.Item>
      <Form.Item
        name="payment_account_name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder="Account Name" disabled={isEditing} />
      </Form.Item>
      <div className="d-flex">
        <span className="font-weight-bold">Private Cause</span>
        <Form.Item
          className="form-group ml-3 mb-1"
          validateTrigger={["onSubmit", "onBlur"]}
          name="access"
        >
          <Switch onChange={handleAccess} disabled={isEditing} />
        </Form.Item>
      </div>
      {isPrivate && (
        <p className="note">
          Note: This cause will not be published on our website.
        </p>
      )}
      <style jsx>{`
        .note {
          font-size: 0.87em;
          color: rgba(51, 51, 51, 0.6);
        }
      `}</style>
    </div>
  );
};

export default PaymentInfo;
